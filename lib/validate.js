"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.invalidType = invalidType;
exports.test = test;
require("source-map-support/register");
var _ValidationError = _interopRequireDefault(require("./ValidationError"));
var _config = _interopRequireWildcard(require("./config"));
var _validateOperators = _interopRequireDefault(require("./validateOperators"));
var _july = require("@genx/july");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MSG = _config.default.messages;
function getUnmatchedExplanation(op, leftValue, rightValue, context) {
  if (context.$$ERROR) {
    return context.$$ERROR;
  }
  if (!MSG.validationErrors) {
    throw new Error('Please import locale first before using validators.');
  }
  const getter = MSG.validationErrors[op];
  return getter(context.name, leftValue, rightValue, context);
}
function invalidType(value, type, options, context) {
  const reason = MSG.validationErrors[_validateOperators.default.TYPE](context.name, value, type, context);
  if (options.throwError) {
    throw new _ValidationError.default(reason, value, context.path);
  }
  return options.plainError ? reason : new _ValidationError.default(reason, value, context.path);
}
function test(left, op, right, options, context) {
  const handler = _config.default.getValidator(op);
  if (!handler) {
    throw new Error(MSG.INVALID_TEST_HANLDER(op));
  }
  return handler(left, right, options, context);
}
function validate(actual, expectedJES, options = {
  throwError: true,
  abortEarly: true
}, context = {}) {
  const type = typeof expectedJES;
  if (type === 'string') {
    if (expectedJES.length === 0 || expectedJES[0] !== '$') {
      throw new Error(MSG.SYNTAX_INVALID_EXPR(expectedJES));
    }
    if (expectedJES.startsWith('$$')) {
      return validate(actual, {
        $equal: expectedJES
      }, options, context);
    }
    return validate(actual, {
      [expectedJES]: null
    }, options, context);
  }
  const {
    throwError,
    abortEarly,
    asPredicate,
    plainError
  } = options;
  if (expectedJES == null) {
    return true;
  }
  if (type !== 'object') {
    throw new Error(MSG.SYNTAX_INVALID_EXPR(expectedJES));
  }
  let {
    path
  } = context;
  const errors = [];
  const _options = !abortEarly && throwError ? {
    ...options,
    throwError: false
  } : options;
  for (let operator in expectedJES) {
    let op, left, _context;
    const opValue = expectedJES[operator];
    if (operator.length > 1 && operator[0] === '$' || operator.length > 3 && operator[0] === '|' && operator[2] === '$') {
      op = _config.default.getValidatorTag(operator);
      if (!op) {
        throw new Error(MSG.UNSUPPORTED_VALIDATION_OP(operator, path));
      }
      left = actual;
      _context = context;
    } else {
      const fieldName = operator;
      let complexKey = fieldName.indexOf('.') !== -1;
      left = actual != null ? complexKey ? (0, _july.get)(actual, fieldName) : actual[fieldName] : undefined;
      _context = (0, _config.getChildContext)(context, actual, fieldName, left);
      if (opValue != null && (0, _july.isPlainObject)(opValue)) {
        op = _validateOperators.default.MATCH;
      } else {
        op = _validateOperators.default.EQUAL;
      }
    }
    if (!test(left, op, opValue, _options, _context)) {
      if (asPredicate) {
        return false;
      }
      const reason = getUnmatchedExplanation(op, left, opValue, _context);
      if (abortEarly && throwError) {
        throw new _ValidationError.default(reason, left, _context.path);
      }
      errors.push(plainError ? reason : new _ValidationError.default(reason, left, _context.path));
      if (abortEarly) {
        break;
      }
    }
  }
  if (errors.length > 0) {
    if (asPredicate) {
      return false;
    }
    if (throwError) {
      throw new _ValidationError.default(errors, actual, path);
    }
    return errors.length === 1 && plainError ? errors[0] : errors;
  }
  return true;
}
var _default = validate;
exports.default = _default;
//# sourceMappingURL=validate.js.map