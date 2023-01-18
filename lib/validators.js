"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _castArray2 = _interopRequireDefault(require("lodash/castArray"));

var _ValidationError = _interopRequireDefault(require("./ValidationError"));

var _validate = _interopRequireWildcard(require("./validate"));

var _config = _interopRequireDefault(require("./config"));

var _types = _interopRequireDefault(require("./types"));

var _validateOperators = _interopRequireDefault(require("./validateOperators"));

var _july = require("@genx/july");

var _transform = _interopRequireDefault(require("./transform"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MSG = _config["default"].messages;

var processRightValue = function processRightValue(right, context) {
  return typeof right === 'string' || (0, _july.isPlainObject)(right) ? (0, _transform["default"])(undefined, right, context, true) : right;
}; //Validators [ name, ...operator alias ]


var OP_EQUAL = [_validateOperators["default"].EQUAL, '$eq', '$eql', '$equal', '$being'];
var OP_NOT_EQUAL = [_validateOperators["default"].NOT_EQUAL, '$ne', '$neq', '$notEqual'];
var OP_NOT = [_validateOperators["default"].NOT, '$not'];
var OP_GREATER_THAN = [_validateOperators["default"].GREATER_THAN, '$gt', '$>', '$greaterThan'];
var OP_GREATER_THAN_OR_EQUAL = [_validateOperators["default"].GREATER_THAN_OR_EQUAL, '$gte', '$>=', '$greaterThanOrEqual', '$min'];
var OP_LESS_THAN = [_validateOperators["default"].LESS_THAN, '$lt', '$<', '$lessThan'];
var OP_LESS_THAN_OR_EQUAL = [_validateOperators["default"].LESS_THAN_OR_EQUAL, '$lte', '$<=', '$lessThanOrEqual', '$max'];
var OP_LENGTH = [_validateOperators["default"].LENGTH, '$length', '$size', '$capacity'];
var OP_IN = [_validateOperators["default"].IN, '$in'];
var OP_NOT_IN = [_validateOperators["default"].NOT_IN, '$nin', '$notIn'];
var OP_EXISTS = [_validateOperators["default"].EXISTS, '$exist', '$exists', '$notNull'];
var OP_REQUIRED = [_validateOperators["default"].REQUIRED, '$required', '$mandatory'];
var OP_MATCH = [_validateOperators["default"].MATCH, '$has', '$match', '$all', '$should'];
var OP_MATCH_ANY = [_validateOperators["default"].MATCH_ANY, '$any', '$or', '$either'];
var OP_ALL_MATCH = [_validateOperators["default"].ALL_MATCH, '$allMatch', '|>$all', '|>$match'];
var OP_ANY_ONE_MATCH = [_validateOperators["default"].ANY_ONE_MATCH, '$anyOneMatch', '|*$any', '|*$match', '|*$either'];
var OP_TYPE = [_validateOperators["default"].TYPE, '$is', '$typeOf'];
var OP_HAS_KEYS = [_validateOperators["default"].HAS_KEYS, '$hasKey', '$hasKeys', '$withKey', '$withKeys'];
var OP_START_WITH = [_validateOperators["default"].START_WITH, '$startWith', '$startsWith'];
var OP_END_WITH = [_validateOperators["default"].END_WITH, '$endWith', '$endsWith'];
var OP_SAME_AS = [_validateOperators["default"].SAME_AS, '$sameAs'];

_config["default"].addValidatorToMap(OP_EQUAL, function (left, right, options, context) {
  return (0, _isEqual2["default"])(left, processRightValue(right, context));
});

_config["default"].addValidatorToMap(OP_NOT_EQUAL, function (left, right, options, context) {
  return !(0, _isEqual2["default"])(left, processRightValue(right, context));
});

_config["default"].addValidatorToMap(OP_NOT, function (left) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return !_validate.test.apply(void 0, [left, _validateOperators["default"].MATCH].concat(args));
});

_config["default"].addValidatorToMap(OP_GREATER_THAN, function (left, right, options, context) {
  return left > processRightValue(right, context);
});

_config["default"].addValidatorToMap(OP_GREATER_THAN_OR_EQUAL, function (left, right, options, context) {
  return left >= processRightValue(right, context);
});

_config["default"].addValidatorToMap(OP_LESS_THAN, function (left, right, options, context) {
  return left < processRightValue(right, context);
});

_config["default"].addValidatorToMap(OP_LESS_THAN_OR_EQUAL, function (left, right, options, context) {
  return left <= processRightValue(right, context);
});

_config["default"].addValidatorToMap(OP_LENGTH, function (left, right, options, context) {
  return (0, _validate.test)((0, _size2["default"])(left), _validateOperators["default"].MATCH, right, options, context);
});

_config["default"].addValidatorToMap(OP_IN, function (left, right, options, context) {
  if (right == null) {
    return false;
  }

  right = processRightValue(right, context);

  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_validateOperators["default"].IN));
  }

  var equal = _config["default"].getValidator(_validateOperators["default"].EQUAL);

  return right.find(function (element) {
    return equal(left, element);
  });
});

_config["default"].addValidatorToMap(OP_NOT_IN, function (left, right, options, context) {
  if (right == null) {
    return true;
  }

  right = processRightValue(right, context);

  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_validateOperators["default"].NOT_IN));
  }

  var notEqual = _config["default"].getValidator(_validateOperators["default"].NOT_EQUAL);

  return right.every(function (element) {
    return notEqual(left, element);
  });
});

_config["default"].addValidatorToMap(OP_EXISTS, function (left, right) {
  if (typeof right !== 'boolean') {
    throw new Error(MSG.OPERAND_NOT_BOOL(_validateOperators["default"].EXISTS));
  }

  return right ? left != null : left == null;
});

_config["default"].addValidatorToMap(OP_REQUIRED, function (left, right) {
  if (typeof right !== 'boolean') {
    throw new Error(MSG.OPERAND_NOT_BOOL(_validateOperators["default"].OP_REQUIRED));
  }

  return right ? left != null : true;
});

_config["default"].addValidatorToMap(OP_MATCH, function (left, right, options, context) {
  if (Array.isArray(right)) {
    var errors = [];
    right.every(function (rule) {
      var reason = (0, _validate["default"])(left, rule, _objectSpread(_objectSpread({}, options), {}, {
        asPredicate: false
      }), context);

      if (reason !== true) {
        errors.push.apply(errors, _toConsumableArray((0, _castArray2["default"])(reason)));

        if (options.abortEarly) {
          return false;
        }
      }

      return true;
    });

    if (errors.length > 0) {
      if (options.throwError) {
        throw new _ValidationError["default"](errors, left, context.path);
      }

      if (!options.asPredicate) {
        context.$$ERROR = errors.length === 1 && options.plainError ? errors[0] : errors;
      }

      return false;
    }

    return true;
  }

  var reason2 = (0, _validate["default"])(left, right, options, context);

  if (reason2 !== true) {
    if (!options.asPredicate) {
      context.$$ERROR = reason2;
    }

    return false;
  }

  return true;
});

_config["default"].addValidatorToMap(OP_MATCH_ANY, function (left, right, options, context) {
  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_validateOperators["default"].MATCH_ANY));
  }

  var found = right.find(function (rule) {
    var reason = (0, _validate["default"])(left, rule, _objectSpread(_objectSpread({}, options), {}, {
      abortEarly: false,
      throwError: false
    }), context);
    return reason === true;
  });

  if (!found) {
    context.$$ERROR = MSG.validationErrors[_validateOperators["default"].MATCH_ANY](context.name, left, right, context);
  }

  return found ? true : false;
});

_config["default"].addValidatorToMap(OP_ALL_MATCH, function (left, right, options, context) {
  if (!Array.isArray(left)) {
    throw new Error(MSG.VALUE_NOT_ARRAY(_validateOperators["default"].ALL_MATCH));
  }

  var errors = [];
  left.every(function (leftItem) {
    var reason = (0, _validate["default"])(leftItem, right, _objectSpread(_objectSpread({}, options), {}, {
      asPredicate: false
    }), context);

    if (reason !== true) {
      errors.push.apply(errors, [MSG.validationErrors[_validateOperators["default"].ALL_MATCH](context.name, left, right, context)].concat(_toConsumableArray((0, _castArray2["default"])(reason))));

      if (options.abortEarly) {
        return false;
      }
    }

    return true;
  });

  if (errors.length > 0) {
    if (options.throwError) {
      throw new _ValidationError["default"](errors, left, context.path);
    }

    if (!options.asPredicate) {
      context.$$ERROR = errors.length === 1 && options.plainError ? errors[0] : errors;
    }

    return false;
  }

  return true;
});

_config["default"].addValidatorToMap(OP_ANY_ONE_MATCH, function (left, right, options, context) {
  if (!Array.isArray(left)) {
    throw new Error(MSG.VALUE_NOT_ARRAY(_validateOperators["default"].ANY_ONE_MATCH));
  }

  var found = left.find(function (leftItem) {
    var reason = (0, _validate["default"])(leftItem, right, _objectSpread(_objectSpread({}, options), {}, {
      abortEarly: false,
      throwError: false
    }), context);
    return reason === true;
  });

  if (!found) {
    context.$$ERROR = MSG.validationErrors[_validateOperators["default"].ANY_ONE_MATCH](context.name, left, right, context);
  }

  return found ? true : false;
});

_config["default"].addValidatorToMap(OP_TYPE, function (left, right, options, context) {
  var type;
  var schema;

  if (Array.isArray(right)) {
    if (right.length === 0) {
      throw new Error(MSG.INVALID_OP_EXPR(OP_TYPE[0], right));
    }

    type = right[0];

    if (right.length > 1) {
      schema = right[1];
    }
  } else if (typeof right === 'string') {
    type = right;
  } else if (_typeof(right) === 'object') {
    type = right.type;
    schema = right.schema;
  }

  if (!_types["default"].Builtin.has(type)) {
    throw new Error(MSG.UNSUPPORTED_TYPE(type));
  }

  var reason = _types["default"][type].validate(left, schema, options, context);

  if (reason !== true) {
    context.$$ERROR = reason;
    return false;
  }

  return true;
});

_config["default"].addValidatorToMap(OP_HAS_KEYS, function (left, right) {
  if (_typeof(left) !== 'object') {
    return false;
  }

  return Array.isArray(right) ? right.every(function (key) {
    return (0, _has2["default"])(left, key);
  }) : (0, _has2["default"])(left, right);
});

_config["default"].addValidatorToMap(OP_START_WITH, function (left, right, options, context) {
  if (typeof left !== 'string') {
    return false;
  }

  right = processRightValue(right, context);

  if (typeof right !== 'string') {
    throw new Error(MSG.OPERAND_NOT_STRING(_validateOperators["default"].START_WITH));
  }

  return left.startsWith(right);
});

_config["default"].addValidatorToMap(OP_END_WITH, function (left, right, options, context) {
  if (typeof left !== 'string') {
    return false;
  }

  right = processRightValue(right, context);

  if (typeof right !== 'string') {
    throw new Error(MSG.OPERAND_NOT_STRING(_validateOperators["default"].END_WITH));
  }

  return left.endsWith(right);
});

_config["default"].addValidatorToMap(OP_SAME_AS, function (left, right, options, context) {
  if (_typeof(left) === 'object') {
    throw new Error(MSG.VALUE_NOT_PRIMITIVE(_validateOperators["default"].OP_SAME_AS));
  }

  if (typeof right !== 'string') {
    throw new Error(MSG.OPERAND_NOT_STRING(_validateOperators["default"].OP_SAME_AS));
  }

  return left === context.$$PARENT[right];
});

var _default = _validate["default"];
exports["default"] = _default;
//# sourceMappingURL=validators.js.map