"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEmpty2 = _interopRequireDefault(require("lodash/isEmpty"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _july = require("@genx/july");

var _config = _interopRequireWildcard(require("./config"));

var _transformerOperators = _interopRequireDefault(require("./transformerOperators"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MSG = _config["default"].messages;
var PFX_MAP = '|>'; // map

var PFX_REDUCE = '|+'; // reduce 1. intermediate = result op [key, value] 2. result = result op intermediate

/**
 * Apply a bianry operator to a value
 * @param {*} value
 * @param {*} op
 * @param {*} opValue
 * @param {*} context
 * @returns {*}
 */

function applyBinaryOperator(value, op, opValue, context) {
  var handler = _config["default"].getTransformer(op);

  if (!handler) {
    throw new Error(MSG.INVALID_TRANSFORMER_HANDLER(op));
  }

  return handler(value, opValue, context);
}
/**
 * Apply an unary operator to a value
 * @param {*} value
 * @param {*} tag
 * @param {*} context
 * @returns {*}
 */


function applyUnaryOperator(value, tag, context) {
  var handler = _config["default"].getTransformer(tag);

  if (!handler) {
    throw new Error(MSG.INVALID_TRANSFORMER_HANDLER(tag));
  }

  return handler(value, context);
}
/**
 * Apply an operator to a value with operator meta
 * @param {*} currentValue
 * @param {*} rightValue
 * @param {*} opMeta
 * @param {*} context
 * @returns
 */


function applyOperator(currentValue, rightValue, _ref, context) {
  var _ref2 = _slicedToArray(_ref, 2),
      op = _ref2[0],
      isUnary = _ref2[1];

  if (isUnary) {
    if (_config["default"].dev && !(0, _isEmpty2["default"])(rightValue)) {
      throw new Error(MSG.RIGHT_OPERAND_NOT_EMPTY(op));
    }

    return applyUnaryOperator(currentValue, op, context);
  }

  return applyBinaryOperator(currentValue, op, rightValue, context);
}
/**
 * Apply an collection iteration operator with operator meta
 * @param {*} currentValue
 * @param {*} collectionOp
 * @param {*} opMeta
 * @param {*} expectedFieldValue
 * @param {*} context
 * @returns
 */


function transformCollection(currentValue, collectionOp, opMeta, expectedFieldValue, context) {
  var isUnary = opMeta[1];

  switch (collectionOp) {
    case PFX_MAP:
      return (Array.isArray(currentValue) ? _map2["default"] : _mapValues2["default"])(currentValue, function (item, key) {
        return applyOperator(item, expectedFieldValue, opMeta, (0, _config.getChildContext)(context, currentValue, key, item));
      });

    case PFX_REDUCE:
      if (!Array.isArray(expectedFieldValue) || isUnary && expectedFieldValue.length !== 1 || !isUnary && expectedFieldValue.length !== 2) {
        throw new Error(MSG.INVALID_COLLECTION_OP_EXPR(_transformerOperators["default"].REDUCE, opMeta[0], expectedFieldValue));
      }

      return (0, _reduce2["default"])(currentValue, function (result, item, key) {
        return applyOperator(result, expectedFieldValue[1], opMeta, (0, _config.getChildContext)(context, currentValue, key, item));
      }, expectedFieldValue[0]);

    default:
      throw new Error(MSG.INVALID_COLLECTION_OP(collectionOp));
  }
}
/**
 * If $ operator used, only one a time is allowed
 * e.g.
 * {
 *    $groupBy: 'key'
 * }
 *
 *
 * @param {*} currentValue
 * @param {*} expr
 * @param {*} context
 * @param {boolean} replaceLeft - Whether the expression will replace the left value chain,like a setOp
 */


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
      return expr.map(function (item) {
        return transform(undefined, item, _objectSpread({}, context), true);
      });
    }

    return expr.reduce(function (result, exprItem) {
      return transform(result, exprItem, _objectSpread({}, context));
    }, currentValue);
  }

  var typeExpr = _typeof(expr);

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
      //get from context
      var pos = expr.indexOf('.');

      if (pos === -1) {
        return context[expr];
      }

      return (0, _july.get)(context[expr.substr(0, pos)], expr.substr(pos + 1));
    }

    if (replaceLeft) {
      return expr;
    }

    var opMeta = _config["default"].getTransformerTagAndType(expr);

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
    return (0, _mapValues2["default"])(expr, function (item) {
      return transform(undefined, item, context, true);
    });
  }

  var result,
      hasOperator = false;

  for (var fieldName in expr) {
    var expectedFieldValue = expr[fieldName];
    var l = fieldName.length;

    if (l > 1) {
      if (fieldName[0] === '$') {
        if (result) {
          throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
        }

        var _opMeta = _config["default"].getTransformerTagAndType(fieldName);

        if (!_opMeta) {
          throw new Error(MSG.INVALID_TRANSFORMER_OP(fieldName));
        }

        if (hasOperator) {
          throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
        }

        result = applyOperator(currentValue, expectedFieldValue, _opMeta, context);
        hasOperator = true;
        continue;
      }

      if (l > 3 && fieldName[0] === '|' && fieldName[2] === '$') {
        if (result) {
          throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
        }

        var collectionOp = fieldName.substring(0, 2);
        fieldName = fieldName.substring(2);

        var _opMeta2 = _config["default"].getTransformerTagAndType(fieldName);

        if (!_opMeta2) {
          throw new Error(MSG.INVALID_TRANSFORMER_OP(fieldName));
        }

        if (hasOperator) {
          throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
        }

        result = transformCollection(currentValue, collectionOp, _opMeta2, expectedFieldValue, context);
        hasOperator = true;
        continue;
      }
    }

    if (hasOperator) {
      throw new Error(MSG.SYNTAX_OP_NOT_ALONE);
    }

    var complexKey = fieldName.indexOf('.') !== -1; //pick a field and then apply manipulation

    var actualFieldValue = currentValue != null ? complexKey ? (0, _july.get)(currentValue, fieldName) : currentValue[fieldName] : undefined;
    var childFieldValue = transform(actualFieldValue, expectedFieldValue, (0, _config.getChildContext)(context, currentValue, fieldName, actualFieldValue));

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
exports["default"] = _default;
//# sourceMappingURL=transform.js.map