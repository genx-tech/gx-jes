"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("source-map-support/register");
var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));
var _reduce2 = _interopRequireDefault(require("lodash/reduce"));
var _map2 = _interopRequireDefault(require("lodash/map"));
var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));
var _july = require("@genx/july");
var _config = _interopRequireWildcard(require("./config"));
var _transformerOperators = _interopRequireDefault(require("./transformerOperators"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MSG = _config.default.messages;
const PFX_MAP = '|>';
const PFX_REDUCE = '|+';
function applyBinaryOperator(value, op, opValue, context) {
  const handler = _config.default.getTransformer(op);
  if (!handler) {
    throw new Error(MSG.INVALID_TRANSFORMER_HANDLER(op));
  }
  return handler(value, opValue, context);
}
function applyUnaryOperator(value, tag, context) {
  const handler = _config.default.getTransformer(tag);
  if (!handler) {
    throw new Error(MSG.INVALID_TRANSFORMER_HANDLER(tag));
  }
  return handler(value, context);
}
function applyOperator(currentValue, rightValue, [op, isUnary], context) {
  if (isUnary) {
    if (_config.default.dev && !(0, _isEmpty2.default)(rightValue)) {
      throw new Error(MSG.RIGHT_OPERAND_NOT_EMPTY(op));
    }
    return applyUnaryOperator(currentValue, op, context);
  }
  return applyBinaryOperator(currentValue, op, rightValue, context);
}
function transformCollection(currentValue, collectionOp, opMeta, expectedFieldValue, context) {
  const isUnary = opMeta[1];
  switch (collectionOp) {
    case PFX_MAP:
      return (Array.isArray(currentValue) ? _map2.default : _mapValues2.default)(currentValue, (item, key) => applyOperator(item, expectedFieldValue, opMeta, (0, _config.getChildContext)(context, currentValue, key, item)));
    case PFX_REDUCE:
      if (!Array.isArray(expectedFieldValue) || isUnary && expectedFieldValue.length !== 1 || !isUnary && expectedFieldValue.length !== 2) {
        throw new Error(MSG.INVALID_COLLECTION_OP_EXPR(_transformerOperators.default.REDUCE, opMeta[0], expectedFieldValue));
      }
      return (0, _reduce2.default)(currentValue, (result, item, key) => applyOperator(result, expectedFieldValue[1], opMeta, (0, _config.getChildContext)(context, currentValue, key, item)), expectedFieldValue[0]);
    default:
      throw new Error(MSG.INVALID_COLLECTION_OP(collectionOp));
  }
}
function transform(currentValue, expr, context, replaceLeft) {
  if (expr == null) {
    return replaceLeft ? expr : currentValue;
  }
  if (context == null) {
    context = {
      path: null,
      $$ROOT: currentValue,
      $$PARENT: null,
      $$CURRENT: currentValue,
      $$KEY: null
    };
  }
  if (Array.isArray(expr)) {
    if (replaceLeft) {
      return expr.map(item => transform(undefined, item, {
        ...context
      }, true));
    }
    return expr.reduce((result, exprItem) => transform(result, exprItem, {
      ...context
    }), currentValue);
  }
  const typeExpr = typeof expr;
  if (typeExpr === 'boolean') {
    if (replaceLeft) {
      return expr;
    }
    return expr ? currentValue : undefined;
  }
  if (typeExpr === 'number' || typeExpr === 'bigint') {
    if (replaceLeft) {
      return expr;
    }
    throw new Error(MSG.SYNTAX_NUMBER_AS_EXPR);
  }
  if (typeExpr === 'string') {
    if (expr.startsWith('$$')) {
      const pos = expr.indexOf('.');
      if (pos === -1) {
        return context[expr];
      }
      return (0, _july.get)(context[expr.substr(0, pos)], expr.substr(pos + 1));
    }
    if (replaceLeft) {
      return expr;
    }
    const opMeta = _config.default.getTransformerTagAndType(expr);
    if (!opMeta) {
      throw new Error(MSG.INVALID_TRANSFORMER_OP(expr));
    }
    if (!opMeta[1]) {
      throw new Error(MSG.REQUIRE_RIGHT_OPERAND(expr));
    }
    return applyUnaryOperator(currentValue, opMeta[0], context);
  }
  if (typeExpr !== 'object') {
    throw new Error(MSG.SYNTAX_INVALID_EXPR(expr));
  }
  if (replaceLeft) {
    return (0, _mapValues2.default)(expr, item => transform(undefined, item, context, true));
  }
  let result,
    hasOperator = false;
  for (let fieldName in expr) {
    let expectedFieldValue = expr[fieldName];
    const l = fieldName.length;
    if (l > 1) {
      if (fieldName[0] === '$') {
        if (result) {
          throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
        }
        const opMeta = _config.default.getTransformerTagAndType(fieldName);
        if (!opMeta) {
          throw new Error(MSG.INVALID_TRANSFORMER_OP(fieldName));
        }
        if (hasOperator) {
          throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
        }
        result = applyOperator(currentValue, expectedFieldValue, opMeta, context);
        hasOperator = true;
        continue;
      }
      if (l > 3 && fieldName[0] === '|' && fieldName[2] === '$') {
        if (result) {
          throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
        }
        const collectionOp = fieldName.substring(0, 2);
        fieldName = fieldName.substring(2);
        const opMeta = _config.default.getTransformerTagAndType(fieldName);
        if (!opMeta) {
          throw new Error(MSG.INVALID_TRANSFORMER_OP(fieldName));
        }
        if (hasOperator) {
          throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
        }
        result = transformCollection(currentValue, collectionOp, opMeta, expectedFieldValue, context);
        hasOperator = true;
        continue;
      }
    }
    if (hasOperator) {
      throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
    }
    let complexKey = fieldName.indexOf('.') !== -1;
    let actualFieldValue = currentValue != null ? complexKey ? (0, _july.get)(currentValue, fieldName) : currentValue[fieldName] : undefined;
    const childFieldValue = transform(actualFieldValue, expectedFieldValue, (0, _config.getChildContext)(context, currentValue, fieldName, actualFieldValue));
    if (typeof childFieldValue !== 'undefined') {
      result == null && (result = {});
      if (complexKey) {
        (0, _july.set)(result, fieldName, childFieldValue);
      } else {
        result[fieldName] = childFieldValue;
      }
    }
  }
  return result;
}
var _default = transform;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=transform.js.map