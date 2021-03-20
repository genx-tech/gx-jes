"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// JSON Expression Syntax (JES)
var _isEqual = require('lodash/isEqual');

var _isInteger = require('lodash/isInteger');

var _has = require('lodash/has');

var _size = require('lodash/size');

var _reduce = require('lodash/reduce');

var _reverse = require('lodash/reverse');

var _keys = require('lodash/keys');

var _values = require('lodash/values');

var _castArray = require('lodash/castArray');

var _pick = require('lodash/pick');

var _pickBy = require('lodash/pickBy');

var _get = require('lodash/get');

var _set = require('lodash/set');

var _nth = require('lodash/nth');

var _omit = require('lodash/omit');

var _omitBy = require('lodash/omitBy');

var _groupBy = require('lodash/groupBy');

var _sortBy = require('lodash/sortBy');

var _filter = require('lodash/filter');

var _map = require('lodash/map');

var _mapValues = require('lodash/mapValues');

var _find = require('lodash/find');

var _findIndex = require('lodash/findIndex');

var _require = require('@genx/error'),
    ValidationError = _require.ValidationError,
    InvalidArgument = _require.InvalidArgument;

var _require2 = require('@genx/july'),
    remap = _require2.remap,
    isPlainObject = _require2.isPlainObject;

var PFX_FOR_EACH = '|>'; // map each

var PFX_WITH_ANY = '|*'; // with any

var config = require('./config');

if (!config.messages) {
  var nothing = require('./locale/msg.en-US');

  nothing(); // just avoid being truncated by bundler
}

var MSG = config.messages; //Validators

var OP_EQUAL = ['$eq', '$eql', '$equal'];
var OP_NOT_EQUAL = ['$ne', '$neq', '$notEqual'];
var OP_NOT = ['$not'];
var OP_GREATER_THAN = ['$gt', '$>', '$greaterThan'];
var OP_GREATER_THAN_OR_EQUAL = ['$gte', '$>=', '$greaterThanOrEqual'];
var OP_LESS_THAN = ['$lt', '$<', '$lessThan'];
var OP_LESS_THAN_OR_EQUAL = ['$lte', '$<=', '$lessThanOrEqual'];
var OP_IN = ['$in'];
var OP_NOT_IN = ['$nin', '$notIn'];
var OP_EXISTS = ['$exist', '$exists', '$notNull'];
var OP_MATCH = ['$has', '$match', '$all'];
var OP_MATCH_ANY = ['$any', '$or', '$either'];
var OP_TYPE = ['$is', '$typeOf'];
var OP_HAS_KEYS = ['$hasKey', '$hasKeys', '$withKey', '$withKeys'];
var OP_START_WITH = ['$startWith', '$startsWith'];
var OP_END_WITH = ['$endWith', '$endsWith']; //OP_EVAL
//Query & aggregate processors

var OP_SIZE = ['$size', '$length', '$count'];
var OP_SUM = ['$sum', '$total'];
var OP_KEYS = ['$keys'];
var OP_VALUES = ['$values'];
var OP_GET_TYPE = ['$type']; //Manipulate processors

var OP_ADD = ['$add', '$plus', '$inc'];
var OP_SUB = ['$sub', '$subtract', '$minus', '$dec'];
var OP_MUL = ['$mul', '$multiply', '$times'];
var OP_DIV = ['$div', '$divide'];
var OP_SET = ['$set', '$=', '$value'];
var OP_ADD_ITEM = ['$addItem', '$override'];
var OP_ASSIGN = ['$assign', '$addFields'];
var OP_PICK = ['$pick'];
var OP_GET_BY_INDEX = ['$at', '$getByIndex', '$nth'];
var OP_GET_BY_KEY = ['$of', '$getByKey'];
var OP_OMIT = ['$omit']; // filter by key

var OP_GROUP = ['$group', '$groupBy'];
var OP_SORT = ['$sort', '$orderBy', '$sortBy'];
var OP_REVERSE = ['$reverse'];
var OP_EVAL = ['$eval', '$apply'];
var OP_MERGE = ['$merge'];
var OP_FILTER = ['$filter', '$select']; // filter by value

var OP_REMAP = ['$remap', '$mapKeys'];
var OP_TO_JSON = ['$json', '$toJSON', '$stringify'];
var OP_TO_OBJ = ['$object', '$parseJSON']; //Condition processors

var OP_IF = ['$if'];
config.addValidatorToMap(OP_EQUAL, 'OP_EQUAL', function (left, right) {
  return _isEqual(left, right);
});
config.addValidatorToMap(OP_NOT_EQUAL, 'OP_NOT_EQUAL', function (left, right) {
  return !_isEqual(left, right);
});
config.addValidatorToMap(OP_NOT, 'OP_NOT', function (left) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return !test.apply(void 0, [left, 'OP_MATCH'].concat(args));
});
config.addValidatorToMap(OP_GREATER_THAN, 'OP_GREATER_THAN', function (left, right) {
  return left > right;
});
config.addValidatorToMap(OP_GREATER_THAN_OR_EQUAL, 'OP_GREATER_THAN_OR_EQUAL', function (left, right) {
  return left >= right;
});
config.addValidatorToMap(OP_LESS_THAN, 'OP_LESS_THAN', function (left, right) {
  return left < right;
});
config.addValidatorToMap(OP_LESS_THAN_OR_EQUAL, 'OP_LESS_THAN_OR_EQUAL', function (left, right) {
  return left <= right;
});
config.addValidatorToMap(OP_IN, 'OP_IN', function (left, right) {
  if (right == null) return false;

  if (!Array.isArray(right)) {
    throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_IN'));
  }

  var equal = config.getValidator('OP_EQUAL');
  return right.find(function (element) {
    return equal(left, element);
  });
});
config.addValidatorToMap(OP_NOT_IN, 'OP_NOT_IN', function (left, right) {
  if (right == null) return true;

  if (!Array.isArray(right)) {
    throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_NOT_IN'));
  }

  var notEqual = config.getValidator('OP_NOT_EQUAL');
  return right.every(function (element) {
    return notEqual(left, element);
  });
});
config.addValidatorToMap(OP_EXISTS, 'OP_EXISTS', function (left, right) {
  if (typeof right !== 'boolean') {
    throw new InvalidArgument(MSG.OPERAND_NOT_BOOL('OP_EXISTS'));
  }

  return right ? left != null : left == null;
});
config.addValidatorToMap(OP_MATCH, 'OP_MATCH', function (left, right, prefix, context) {
  if (Array.isArray(right)) {
    return right.every(function (rule) {
      var r = _match3(left, rule, prefix);

      return r[0];
    });
  }

  var r = _match3(left, right, prefix);

  var matched = r[0];

  if (!matched && context) {
    context.$$ERROR = r[1];
  }

  return matched;
});
config.addValidatorToMap(OP_MATCH_ANY, 'OP_MATCH_ANY', function (left, right, prefix, context) {
  if (!Array.isArray(right)) {
    throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_MATCH_ANY'));
  }

  var found = right.find(function (rule) {
    var r = _match3(left, rule, prefix);

    var matched = r[0];

    if (!matched && context) {
      context.$$ERROR = r[1];
    }

    return matched;
  });
  return found ? true : false;
});
config.addValidatorToMap(OP_TYPE, 'OP_TYPE', function (left, right) {
  if (typeof right !== 'string') {
    throw new InvalidArgument(MSG.OPERAND_NOT_STRING('OP_TYPE'));
  }

  right = right.toLowerCase();

  if (right === 'array') {
    return Array.isArray(left);
  }

  if (right === 'integer') {
    return _isInteger(left);
  }

  if (right === 'text') {
    return typeof left === 'string';
  }

  return _typeof(left) === right;
});
config.addValidatorToMap(OP_HAS_KEYS, 'OP_HAS_KEYS', function (left, right) {
  if (_typeof(left) !== 'object') return false;
  return Array.isArray(right) ? right.every(function (key) {
    return _has(left, key);
  }) : _has(left, right);
});
config.addValidatorToMap(OP_START_WITH, 'OP_START_WITH', function (left, right) {
  if (typeof left !== 'string') return false;

  if (typeof right !== 'string') {
    throw new InvalidArgument(MSG.OPERAND_NOT_STRING('OP_START_WITH'));
  }

  return left.startsWith(right);
});
config.addValidatorToMap(OP_END_WITH, 'OP_END_WITH', function (left, right) {
  if (typeof left !== 'string') return false;

  if (typeof right !== 'string') {
    throw new InvalidArgument(MSG.OPERAND_NOT_STRING('OP_END_WITH'));
  }

  return left.endsWith(right);
}); //embedded processors in validation pipeline

config.addValidatorToMap(OP_EVAL, 'OP_EVAL', function (left, right, prefix, context) {
  if (!Array.isArray(right) || right.length !== 2) {
    throw new InvalidArgument(MSG.OPERAND_NOT_TUPLE('OP_EVAL'));
  }

  var evaluated = evaluateExpr(left, right[0], prefix);

  var r = _match3(evaluated, right[1], prefix);

  var matched = r[0];

  if (!matched && context) {
    context.$$ERROR = r[1];
  }

  return matched;
}); // [ <op name>, <unary> ]

config.addProcessorToMap(OP_SIZE, 'OP_SIZE', true, function (left) {
  return _size(left);
});
config.addProcessorToMap(OP_SUM, 'OP_SUM', true, function (left) {
  return _reduce(left, function (sum, item) {
    sum += item;
    return sum;
  }, 0);
});
config.addProcessorToMap(OP_KEYS, 'OP_KEYS', true, function (left) {
  return _keys(left);
});
config.addProcessorToMap(OP_VALUES, 'OP_VALUES', true, function (left) {
  return _values(left);
});
config.addProcessorToMap(OP_GET_TYPE, 'OP_GET_TYPE', true, function (left) {
  return Array.isArray(left) ? 'array' : _isInteger(left) ? 'integer' : _typeof(left);
});
config.addProcessorToMap(OP_REVERSE, 'OP_REVERSE', true, function (left) {
  return _reverse(left);
});
config.addProcessorToMap(OP_ADD, 'OP_ADD', false, function (left, right) {
  return left + right;
});
config.addProcessorToMap(OP_SUB, 'OP_SUB', false, function (left, right) {
  return left - right;
});
config.addProcessorToMap(OP_MUL, 'OP_MUL', false, function (left, right) {
  return left * right;
});
config.addProcessorToMap(OP_DIV, 'OP_DIV', false, function (left, right) {
  return left / right;
});
config.addProcessorToMap(OP_SET, 'OP_SET', false, function (left, right, prefix, context) {
  return evaluateExpr(undefined, right, prefix, context, true);
});
config.addProcessorToMap(OP_ADD_ITEM, 'OP_ADD_ITEM', false, function (left, right, prefix, context) {
  if (_typeof(left) !== 'object') {
    throw new InvalidArgument(MSG.VALUE_NOT_COLLECTION('OP_ADD_ITEM'));
  }

  if (Array.isArray(left)) {
    return left.concat(right);
  }

  if (!Array.isArray(right) || right.length !== 2) {
    throw new InvalidArgument(MSG.OPERAND_NOT_TUPLE('OP_ADD_ITEM'));
  }

  return _objectSpread(_objectSpread({}, left), {}, _defineProperty({}, right[0], evaluateExpr(left, right[1], prefix, _objectSpread(_objectSpread({}, context), {}, {
    $$PARENT: context.$$CURRENT,
    $$CURRENT: left
  }))));
});
config.addProcessorToMap(OP_ASSIGN, 'OP_ASSIGN', false, function (left, right, prefix, context) {
  if (!isPlainObject(left)) {
    throw new InvalidArgument(MSG.VALUE_NOT_OBJECT('OP_ASSIGN'));
  }

  if (!isPlainObject(right)) {
    throw new InvalidArgument(MSG.OPERAND_NOT_OBJECT('OP_ASSIGN'));
  }

  var rightValue = _mapValues(right, function (expr, key) {
    return evaluateExpr(left[key], expr, MSG.formatPrefix(key, prefix), _objectSpread(_objectSpread({}, context), {}, {
      $$PARENT: left,
      $$CURRENT: left[key]
    }));
  });

  return _objectSpread(_objectSpread({}, left), rightValue);
});
config.addProcessorToMap(OP_PICK, 'OP_PICK', false, function (left, right, prefix) {
  if (left == null) return null;

  if (_typeof(right) !== 'object') {
    right = _castArray(right);
  }

  if (Array.isArray(right)) {
    return _pick(left, right);
  }

  return _pickBy(left, function (x, key) {
    return _match3(key, right, MSG.formatPrefix(key, prefix))[0];
  });
});
config.addProcessorToMap(OP_GET_BY_INDEX, 'OP_GET_BY_INDEX', false, function (left, right) {
  return _nth(left, right);
});
config.addProcessorToMap(OP_GET_BY_KEY, 'OP_GET_BY_KEY', false, function (left, right) {
  return _get(left, right);
});
config.addProcessorToMap(OP_OMIT, 'OP_OMIT', false, function (left, right, prefix) {
  if (left == null) return null;

  if (_typeof(right) !== 'object') {
    right = _castArray(right);
  }

  if (Array.isArray(right)) {
    return _omit(left, right);
  }

  return _omitBy(left, function (x, key) {
    return _match3(key, right, MSG.formatPrefix(key, prefix))[0];
  });
});
config.addProcessorToMap(OP_GROUP, 'OP_GROUP', false, function (left, right) {
  return _groupBy(left, right);
});
config.addProcessorToMap(OP_SORT, 'OP_SORT', false, function (left, right) {
  return _sortBy(left, right);
});
config.addProcessorToMap(OP_EVAL, 'OP_EVAL', false, evaluateExpr);
config.addProcessorToMap(OP_MERGE, 'OP_MERGE', false, function (left, right, prefix, context) {
  if (!Array.isArray(right)) {
    throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_MERGE'));
  }

  return right.reduce(function (result, expr, key) {
    return Object.assign(result, evaluateExpr(left, expr, MSG.formatPrefix(key, prefix), _objectSpread({}, context)));
  }, {});
});
config.addProcessorToMap(OP_FILTER, 'OP_FILTER', false, function (left, right, prefix
/*, context*/
) {
  if (left == null) return null;

  if (_typeof(left) !== 'object') {
    throw new InvalidArgument(MSG.VALUE_NOT_COLLECTION('OP_FILTER'));
  }

  return _filter(left, function (value, key) {
    return test(value, 'OP_MATCH', right, MSG.formatPrefix(key, prefix));
  });
});
config.addProcessorToMap(OP_REMAP, 'OP_REMAP', false, function (left, right
/*, prefix, context*/
) {
  if (left == null) return null;

  if (_typeof(left) !== 'object') {
    throw new InvalidArgument(MSG.VALUE_NOT_COLLECTION('OP_REMAP'));
  }

  if (Array.isArray(right)) {
    if (right.length !== 2) {
      throw new InvalidArgument(MSG.OPERAND_NOT_TUPLE('OP_REMAP'));
    }

    return remap(left, right[0], right[1]);
  }

  if (!isPlainObject(right)) {
    throw new InvalidArgument(MSG.OPERAND_NOT_OBJECT('OP_REMAP'));
  }

  return remap(left, right);
});
config.addProcessorToMap(OP_IF, 'OP_IF', false, function (left, right, prefix, context) {
  if (!Array.isArray(right)) {
    throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_IF'));
  }

  if (right.length < 2 || right.length > 3) {
    throw new InvalidArgument(MSG.OPERAND_NOT_TUPLE_2_OR_3('OP_IF'));
  }

  var condition = evaluateExpr(undefined, right[0], prefix, context, true);

  if (test(left, 'OP_MATCH', condition, prefix)) {
    return evaluateExpr(left, right[1], prefix, context);
  } else if (right.length > 2) {
    var ret = evaluateExpr(left, right[2], prefix, context);
    return ret;
  }

  return left;
}); //embeded validators in processing pipeline

config.addProcessorToMap(OP_MATCH, 'OP_MATCH', false, function (left, right, prefix) {
  return test(left, 'OP_MATCH', right, prefix);
});
config.addProcessorToMap(OP_TO_JSON, 'OP_TO_JSON', true, function (left) {
  return left == null ? left : JSON.stringify(left);
});
config.addProcessorToMap(OP_TO_OBJ, 'OP_TO_OBJ', true, function (left) {
  return left == null ? left : JSON.parse(left);
});

function getUnmatchedExplanation(op, name, leftValue, rightValue, prefix, context) {
  if (context && context.$$ERROR) return context.$$ERROR;
  var getter = MSG.validationErrors[op] || MSG.validationErrors.OP_MATCH;
  return getter(name, leftValue, rightValue, prefix);
}

function test(value, tag, opValue, prefix, context) {
  var handler = config.getValidator(tag);

  if (!handler) {
    throw new InvalidArgument(MSG.INVALID_VALIDATOR_HANDLER(tag));
  }

  return handler(value, opValue, prefix, context);
}

function evaluate(value, tag, opValue, prefix, context) {
  var handler = config.getProcessor(tag);

  if (!handler) {
    throw new InvalidArgument(MSG.INVALID_PROCESSOR_HANDLER(tag));
  }

  return handler(value, opValue, prefix, context);
}

function evaluateUnary(value, tag, prefix, context) {
  var handler = config.getProcessor(tag);

  if (!handler) {
    throw new InvalidArgument(MSG.INVALID_PROCESSOR_HANDLER(tag));
  }

  return handler(value, prefix, context);
}

function evaluateByOpMeta(currentValue, rightValue, opMeta, prefix, context) {
  if (opMeta[1]) {
    return rightValue ? evaluateUnary(currentValue, opMeta[0], prefix) : currentValue;
  }

  return evaluate(currentValue, opMeta[0], rightValue, prefix, context);
}

function validateCollection(actual, collectionOp, op, expectedFieldValue, prefix) {
  var context = {};

  switch (collectionOp) {
    case PFX_FOR_EACH:
      {
        var unmatchedKey = _findIndex(actual, function (item) {
          return !test(item, op, expectedFieldValue, prefix, context);
        });

        if (unmatchedKey !== -1) {
          return [false, getUnmatchedExplanation(op, unmatchedKey, actual[unmatchedKey], expectedFieldValue, prefix, context)];
        }

        break;
      }

    case PFX_WITH_ANY:
      {
        var matched = _find(actual, function (item) {
          return test(item, op, expectedFieldValue, prefix, context);
        });

        if (!matched) {
          return [false, getUnmatchedExplanation(op, null, actual, expectedFieldValue, prefix, context)];
        }

        break;
      }

    default:
      throw new InvalidArgument(MSG.INVALID_COLLECTION_OP(collectionOp));
  }

  return undefined;
}

function evaluateCollection(currentValue, collectionOp, opMeta, expectedFieldValue, prefix, context) {
  switch (collectionOp) {
    case PFX_FOR_EACH:
      return (Array.isArray(currentValue) ? _map : _mapValues)(currentValue, function (item, i) {
        return evaluateByOpMeta(item, expectedFieldValue, opMeta, MSG.formatPrefix(i, prefix), _objectSpread(_objectSpread({}, context), {}, {
          $$PARENT: currentValue,
          $$CURRENT: item
        }));
      });

    default:
      throw new InvalidArgument(MSG.INVALID_COLLECTION_OP(collectionOp));
  }
}
/**
 * Validate the given object with JSON Expression Syntax (JES)
 * @param {*} actual - The object to match
 * @param {*} expected - Expected state in JSON Expression Syntax
 * @param {*} prefix - Tracking path
 *
 * { key: { $match } }
 */


function _match3(actual, expected, prefix) {
  var passObjectCheck = false;

  if (!isPlainObject(expected)) {
    if (!test(actual, 'OP_EQUAL', expected, prefix)) {
      return [false, MSG.validationErrors.OP_EQUAL(null, actual, expected, prefix)];
    }

    return [true];
  }

  for (var fieldName in expected) {
    var expectedFieldValue = expected[fieldName];
    var l = fieldName.length;

    if (l > 1) {
      if (l > 3 && fieldName[0] === '|' && fieldName[2] === '$') {
        //validators
        var collectionOp = fieldName.substr(0, 2);
        fieldName = fieldName.substr(2);
        var op = config.getValidatorTag(fieldName);

        if (!op) {
          throw new InvalidArgument(MSG.INVALID_VALIDATION_OP(fieldName));
        }

        var matchResult = validateCollection(actual, collectionOp, op, expectedFieldValue, prefix);
        if (matchResult) return matchResult;
        continue;
      }

      if (fieldName[0] === '$') {
        //validator
        var _op = config.getValidatorTag(fieldName);

        if (!_op) {
          throw new InvalidArgument(MSG.INVALID_VALIDATION_OP(fieldName));
        }

        var context = {};

        if (!test(actual, _op, expectedFieldValue, prefix, context)) {
          return [false, getUnmatchedExplanation(_op, null, actual, expectedFieldValue, prefix, context)];
        }

        continue;
      }
    }

    if (!passObjectCheck) {
      if (actual == null) return [false, MSG.validationErrors.OP_EXISTS(null, null, true, prefix)];

      var actualType = _typeof(actual);

      if (actualType !== 'object') return [false, MSG.validationErrors.OP_TYPE(null, actualType, 'object', prefix)];
    }

    passObjectCheck = true;

    var actualFieldValue = _get(actual, fieldName);

    if (expectedFieldValue != null && _typeof(expectedFieldValue) === 'object') {
      var _match = _match3(actualFieldValue, expectedFieldValue, MSG.formatPrefix(fieldName, prefix)),
          _match2 = _slicedToArray(_match, 2),
          ok = _match2[0],
          reason = _match2[1];

      if (!ok) {
        return [false, reason];
      }
    } else {
      if (!test(actualFieldValue, 'OP_EQUAL', expectedFieldValue, prefix)) {
        return [false, MSG.validationErrors.OP_EQUAL(fieldName, actualFieldValue, expectedFieldValue, prefix)];
      }
    }
  }

  return [true];
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
 * @param {*} prefix
 * @param {*} context
 * @param {boolean} setOp - Whether the expression is a setOp
 */


function evaluateExpr(currentValue, expr, prefix, context, setOp) {
  if (Array.isArray(expr)) {
    if (setOp) {
      return expr.map(function (item) {
        return evaluateExpr(undefined, item, prefix, _objectSpread({}, context), true);
      });
    }

    return expr.reduce(function (result, exprItem) {
      return evaluateExpr(result, exprItem, prefix, _objectSpread({}, context));
    }, currentValue);
  }

  var typeExpr = _typeof(expr);

  if (typeExpr === 'boolean') {
    if (setOp) return expr;
    return expr ? currentValue : undefined;
  }

  if (typeExpr === 'number' || typeExpr === 'bigint') {
    if (setOp) return expr;
    throw new InvalidArgument(MSG.SYNTAX_NUMBER_AS_EXPR);
  }

  if (typeExpr === 'string') {
    if (expr.startsWith('$$')) {
      //get from context
      var pos = expr.indexOf('.');

      if (pos === -1) {
        return context[expr];
      }

      return _get(context[expr.substr(0, pos)], expr.substr(pos + 1));
    }

    if (setOp) {
      return expr;
    }

    var opMeta = config.getProcessorTagAndType(expr);

    if (!opMeta) {
      throw new InvalidArgument(MSG.INVALID_PROCESSING_OP(expr));
    }

    if (!opMeta[1]) {
      throw new InvalidArgument(MSG.REQUIRE_RIGHT_OPERAND(expr));
    }

    return evaluateUnary(currentValue, opMeta[0], prefix);
  }

  if (typeExpr !== 'object') {
    throw new InvalidArgument(MSG.SYNTAX_INVALID_EXPR);
  }

  if (setOp) {
    return _mapValues(expr, function (item) {
      return evaluateExpr(undefined, item, prefix, context, true);
    });
  }

  if (context == null) {
    context = {
      $$ROOT: currentValue,
      $$PARENT: null,
      $$CURRENT: currentValue
    };
  }

  var result,
      hasOperator = false;

  for (var fieldName in expr) {
    var expectedFieldValue = expr[fieldName];
    var l = fieldName.length;

    if (l > 1) {
      if (fieldName[0] === '$') {
        if (result) {
          throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
        }

        var _opMeta = config.getProcessorTagAndType(fieldName);

        if (!_opMeta) {
          throw new InvalidArgument(MSG.INVALID_PROCESSING_OP(fieldName));
        }

        if (hasOperator) {
          throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
        }

        result = evaluateByOpMeta(currentValue, expectedFieldValue, _opMeta, prefix, context);
        hasOperator = true;
        continue;
      }

      if (l > 3 && fieldName[0] === '|' && fieldName[2] === '$') {
        if (result) {
          throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
        }

        var collectionOp = fieldName.substr(0, 2);
        fieldName = fieldName.substr(2);

        var _opMeta2 = config.getProcessorTagAndType(fieldName);

        if (!_opMeta2) {
          throw new InvalidArgument(MSG.INVALID_PROCESSING_OP(fieldName));
        }

        if (hasOperator) {
          throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
        }

        result = evaluateCollection(currentValue, collectionOp, _opMeta2, expectedFieldValue, prefix, context);
        hasOperator = true;
        continue;
      }
    }

    if (hasOperator) {
      throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
    }

    var compleyKey = fieldName.indexOf('.') !== -1; //pick a field and then apply manipulation

    var actualFieldValue = currentValue != null ? compleyKey ? _get(currentValue, fieldName) : currentValue[fieldName] : undefined;
    var childFieldValue = evaluateExpr(actualFieldValue, expectedFieldValue, MSG.formatPrefix(fieldName, prefix), context);

    if (typeof childFieldValue !== 'undefined') {
      result == null && (result = {});

      if (compleyKey) {
        _set(result, fieldName, childFieldValue);
      } else {
        result[fieldName] = childFieldValue;
      }
    }
  }

  return result;
}
/**
 * JSON Expression Syntax Object
 * @class
 */


var JES = /*#__PURE__*/function () {
  /**
   * @param {object} value
   */
  function JES(value) {
    _classCallCheck(this, JES);

    this.value = value;
  }
  /**
   * Match the value with expected conditions in JSON expression
   * @param {object} expected - JSON match expression
   * @throws ValidationError
   * @returns {JES}
   */


  _createClass(JES, [{
    key: "match",
    value: function match(expected) {
      var result = _match3(this.value, expected);

      if (result[0]) return this;
      throw new ValidationError(result[1], {
        actual: this.value,
        expected: expected
      });
    }
    /**
     * Evaluate a JSON expression against the value
     * @param {object} - JSON operation expression
     */

  }, {
    key: "evaluate",
    value: function evaluate(expr) {
      return evaluateExpr(this.value, expr);
    }
    /**
     * Evaluate a JSON expression against the value and update the value
     * @param {object} - JSON operation expression
     * @returns {JES}
     */

  }, {
    key: "update",
    value: function update(expr) {
      this.value = evaluateExpr(this.value, expr);
      return this;
    }
  }]);

  return JES;
}();

_defineProperty(JES, "config", config);

_defineProperty(JES, "match", _match3);

_defineProperty(JES, "evaluate", evaluateExpr);

module.exports = JES;
//# sourceMappingURL=index.js.map