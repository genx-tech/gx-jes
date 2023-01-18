"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
exports.invalidType = invalidType;
exports.test = test;

var _ValidationError = _interopRequireDefault(require("./ValidationError"));

var _config = _interopRequireWildcard(require("./config"));

var _validateOperators = _interopRequireDefault(require("./validateOperators"));

var _july = require("@genx/july");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var MSG = _config["default"].messages;

function getUnmatchedExplanation(op, leftValue, rightValue, context) {
  if (context.$$ERROR) {
    return context.$$ERROR;
  }

  if (!MSG.validationErrors) {
    throw new Error('Please import locale first before using validators.');
  }

  var getter = MSG.validationErrors[op];
  return getter(context.name, leftValue, rightValue, context);
}

function invalidType(value, type, options, context) {
  var reason = MSG.validationErrors[_validateOperators["default"].TYPE](context.name, value, type, context);

  if (options.throwError) {
    throw new _ValidationError["default"](reason, value, context.path);
  }

  return options.plainError ? reason : new _ValidationError["default"](reason, value, context.path);
}

function test(left, op, right, options, context) {
  var handler = _config["default"].getValidator(op);

  if (!handler) {
    throw new Error(MSG.INVALID_TEST_HANLDER(op));
  }

  return handler(left, right, options, context);
}
/**
 * Validate the given object with JSON Expression Syntax (JES)
 * @param {*} actual - The object to match
 * @param {*} expectedJES - Expected state in JSON Expression Syntax
 * @param {*} options - Validation options
 * @param {*} context - Validation context
 * @returns {array} - [ {boolean} matched, {string} unmatchedReason ]
 */


function validate(actual, expectedJES) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    throwError: true,
    abortEarly: true
  };
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var type = _typeof(expectedJES);

  if (type === 'string') {
    if (expectedJES.length === 0 || expectedJES[0] !== '$') {
      throw new Error(MSG.SYNTAX_INVALID_EXPR(expectedJES));
    }

    if (expectedJES.startsWith('$$')) {
      return validate(actual, {
        $equal: expectedJES
      }, options, context);
    }

    return validate(actual, _defineProperty({}, expectedJES, null), options, context);
  }

  var throwError = options.throwError,
      abortEarly = options.abortEarly,
      asPredicate = options.asPredicate,
      plainError = options.plainError;

  if (expectedJES == null) {
    return true;
  }

  if (type !== 'object') {
    throw new Error(MSG.SYNTAX_INVALID_EXPR(expectedJES));
  }

  var path = context.path;
  var errors = [];

  var _options = !abortEarly && throwError ? _objectSpread(_objectSpread({}, options), {}, {
    throwError: false
  }) : options;

  for (var operator in expectedJES) {
    var op = void 0,
        left = void 0,
        _context = void 0;

    var opValue = expectedJES[operator];

    if ( // $match
    operator.length > 1 && operator[0] === '$' || // |>$all
    operator.length > 3 && operator[0] === '|' && operator[2] === '$') {
      //validator
      op = _config["default"].getValidatorTag(operator);

      if (!op) {
        throw new Error(MSG.UNSUPPORTED_VALIDATION_OP(operator, path));
      }

      left = actual;
      _context = context;
    } else {
      var fieldName = operator;
      var complexKey = fieldName.indexOf('.') !== -1; //pick a field and then apply manipulation

      left = actual != null ? complexKey ? (0, _july.get)(actual, fieldName) : actual[fieldName] : undefined;
      _context = (0, _config.getChildContext)(context, actual, fieldName, left);

      if (opValue != null && (0, _july.isPlainObject)(opValue)) {
        op = _validateOperators["default"].MATCH;
      } else {
        op = _validateOperators["default"].EQUAL;
      }
    }

    if (!test(left, op, opValue, _options, _context)) {
      if (asPredicate) {
        return false;
      }

      var reason = getUnmatchedExplanation(op, left, opValue, _context);

      if (abortEarly && throwError) {
        throw new _ValidationError["default"](reason, left, _context.path);
      }

      errors.push(plainError ? reason : new _ValidationError["default"](reason, left, _context.path));

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
      throw new _ValidationError["default"](errors, actual, path);
    }

    return errors.length === 1 && plainError ? errors[0] : errors;
  }

  return true;
}

var _default = validate;
exports["default"] = _default;
//# sourceMappingURL=validate.js.map