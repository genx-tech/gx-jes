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
    ValidationError = _require.ValidationError;

var _require2 = require('@genx/july'),
    remap = _require2.remap,
    isPlainObject = _require2.isPlainObject; //Validation operator


var OP_EQUAL = ['$eq', '$eql', '$equal'];
var OP_NOT_EQUAL = ['$ne', '$neq', '$notEqual'];
var OP_NOT = ['$not'];
var OP_GREATER_THAN = ['$gt', '$>', '$greaterThan'];
var OP_GREATER_THAN_OR_EQUAL = ['$gte', '$<=', '$greaterThanOrEqual'];
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
var OP_END_WITH = ['$endWith', '$endsWith']; //Query & aggregate operator

var OP_SIZE = ['$size', '$length', '$count'];
var OP_SUM = ['$sum', '$total'];
var OP_KEYS = ['$keys'];
var OP_VALUES = ['$values'];
var OP_GET_TYPE = ['$type']; //Manipulate operation

var OP_ADD = ['$add', '$plus', '$inc'];
var OP_SUB = ['$sub', '$subtract', '$minus', '$dec'];
var OP_MUL = ['$mul', '$multiply', '$times'];
var OP_DIV = ['$div', '$divide'];
var OP_SET = ['$set', '$='];
var OP_ADD_ITEM = ['$addItem', '$override'];
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

var OP_REMAP = ['$remap']; //Condition operation

var OP_IF = ['$if'];
var PFX_FOR_EACH = '|>'; // map each

var PFX_WITH_ANY = '|*'; // with any

var MapOfOps = new Map();

var addOpToMap = function addOpToMap(tokens, tag) {
  return tokens.forEach(function (token) {
    return MapOfOps.set(token, tag);
  });
};

addOpToMap(OP_EQUAL, 'OP_EQUAL');
addOpToMap(OP_NOT_EQUAL, 'OP_NOT_EQUAL');
addOpToMap(OP_NOT, 'OP_NOT');
addOpToMap(OP_GREATER_THAN, 'OP_GREATER_THAN');
addOpToMap(OP_GREATER_THAN_OR_EQUAL, 'OP_GREATER_THAN_OR_EQUAL');
addOpToMap(OP_LESS_THAN, 'OP_LESS_THAN');
addOpToMap(OP_LESS_THAN_OR_EQUAL, 'OP_LESS_THAN_OR_EQUAL');
addOpToMap(OP_IN, 'OP_IN');
addOpToMap(OP_NOT_IN, 'OP_NOT_IN');
addOpToMap(OP_EXISTS, 'OP_EXISTS');
addOpToMap(OP_MATCH, 'OP_MATCH');
addOpToMap(OP_MATCH_ANY, 'OP_MATCH_ANY');
addOpToMap(OP_TYPE, 'OP_TYPE');
addOpToMap(OP_HAS_KEYS, 'OP_HAS_KEYS');
addOpToMap(OP_START_WITH, 'OP_START_WITH');
addOpToMap(OP_END_WITH, 'OP_END_WITH');
var MapOfMans = new Map();

var addManToMap = function addManToMap(tokens, tag) {
  return tokens.forEach(function (token) {
    return MapOfMans.set(token, tag);
  });
}; // [ <op name>, <unary> ]


addManToMap(OP_SIZE, ['OP_SIZE', true]);
addManToMap(OP_SUM, ['OP_SUM', true]);
addManToMap(OP_KEYS, ['OP_KEYS', true]);
addManToMap(OP_VALUES, ['OP_VALUES', true]);
addManToMap(OP_GET_TYPE, ['OP_GET_TYPE', true]);
addManToMap(OP_REVERSE, ['OP_REVERSE', true]);
addManToMap(OP_ADD, ['OP_ADD', false]);
addManToMap(OP_SUB, ['OP_SUB', false]);
addManToMap(OP_MUL, ['OP_MUL', false]);
addManToMap(OP_DIV, ['OP_DIV', false]);
addManToMap(OP_SET, ['OP_SET', false]);
addManToMap(OP_ADD_ITEM, ['OP_ADD_ITEM', false]);
addManToMap(OP_PICK, ['OP_PICK', false]);
addManToMap(OP_GET_BY_INDEX, ['OP_GET_BY_INDEX', false]);
addManToMap(OP_GET_BY_KEY, ['OP_GET_BY_KEY', false]);
addManToMap(OP_OMIT, ['OP_OMIT', false]);
addManToMap(OP_GROUP, ['OP_GROUP', false]);
addManToMap(OP_SORT, ['OP_SORT', false]);
addManToMap(OP_EVAL, ['OP_EVAL', false]);
addManToMap(OP_MERGE, ['OP_MERGE', false]);
addManToMap(OP_FILTER, ['OP_FILTER', false]);
addManToMap(OP_REMAP, ['OP_REMAP', false]);
addManToMap(OP_IF, ['OP_IF', false]);
var defaultJesHandlers = {
  OP_EQUAL: function OP_EQUAL(left, right) {
    return _isEqual(left, right);
  },
  OP_NOT_EQUAL: function OP_NOT_EQUAL(left, right) {
    return !_isEqual(left, right);
  },
  OP_NOT: function OP_NOT(left) {
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return !test.apply(void 0, [left, 'OP_MATCH'].concat(args));
  },
  OP_GREATER_THAN: function OP_GREATER_THAN(left, right) {
    return left > right;
  },
  OP_GREATER_THAN_OR_EQUAL: function OP_GREATER_THAN_OR_EQUAL(left, right) {
    return left >= right;
  },
  OP_LESS_THAN: function OP_LESS_THAN(left, right) {
    return left < right;
  },
  OP_LESS_THAN_OR_EQUAL: function OP_LESS_THAN_OR_EQUAL(left, right) {
    return left <= right;
  },
  OP_IN: function OP_IN(left, right) {
    if (right == null) return false;

    if (!Array.isArray(right)) {
      throw new Error(OPERAND_NOT_ARRAY('OP_IN'));
    }

    return right.find(function (element) {
      return defaultJesHandlers.OP_EQUAL(left, element);
    });
  },
  OP_NOT_IN: function OP_NOT_IN(left, right) {
    if (right == null) return true;

    if (!Array.isArray(right)) {
      throw new Error(OPERAND_NOT_ARRAY('OP_NOT_IN'));
    }

    return right.every(function (element) {
      return defaultJesHandlers.OP_NOT_EQUAL(left, element);
    });
  },
  OP_EXISTS: function OP_EXISTS(left, right) {
    if (typeof right !== 'boolean') {
      throw new Error(OPERAND_NOT_BOOL('OP_EXISTS'));
    }

    return right ? left != null : left == null;
  },
  OP_TYPE: function OP_TYPE(left, right) {
    if (typeof right !== 'string') {
      throw new Error(OPERAND_NOT_STRING('OP_TYPE'));
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
  },
  OP_MATCH: function OP_MATCH(left, right, jes, prefix) {
    if (Array.isArray(right)) {
      return right.every(function (rule) {
        var r = _match3(left, rule, jes, prefix);

        return r[0];
      });
    }

    var r = _match3(left, right, jes, prefix);

    return r[0];
  },
  OP_MATCH_ANY: function OP_MATCH_ANY(left, right, jes, prefix) {
    if (!Array.isArray(right)) {
      throw new Error(OPERAND_NOT_ARRAY('OP_MATCH_ANY'));
    }

    var found = right.find(function (rule) {
      var r = _match3(left, rule, jes, prefix);

      return r[0];
    });
    return found ? true : false;
  },
  OP_HAS_KEYS: function OP_HAS_KEYS(left, right) {
    if (_typeof(left) !== 'object') return false;
    return Array.isArray(right) ? right.every(function (key) {
      return _has(left, key);
    }) : _has(left, right);
  },
  OP_START_WITH: function OP_START_WITH(left, right) {
    if (typeof left !== 'string') return false;

    if (typeof right !== 'string') {
      throw new Error(OPERAND_NOT_STRING('OP_START_WITH'));
    }

    return left.startsWith(right);
  },
  OP_END_WITH: function OP_END_WITH(left, right) {
    if (typeof left !== 'string') return false;

    if (typeof right !== 'string') {
      throw new Error(OPERAND_NOT_STRING('OP_END_WITH'));
    }

    return left.endsWith(right);
  }
};
var defaultManipulations = {
  //unary
  OP_SIZE: function OP_SIZE(left) {
    return _size(left);
  },
  OP_SUM: function OP_SUM(left) {
    return _reduce(left, function (sum, item) {
      sum += item;
      return sum;
    }, 0);
  },
  OP_KEYS: function OP_KEYS(left) {
    return _keys(left);
  },
  OP_VALUES: function OP_VALUES(left) {
    return _values(left);
  },
  OP_GET_TYPE: function OP_GET_TYPE(left) {
    return Array.isArray(left) ? 'array' : _isInteger(left) ? 'integer' : _typeof(left);
  },
  OP_REVERSE: function OP_REVERSE(left) {
    return _reverse(left);
  },
  //binary
  OP_ADD: function OP_ADD(left, right) {
    return left + right;
  },
  OP_SUB: function OP_SUB(left, right) {
    return left - right;
  },
  OP_MUL: function OP_MUL(left, right) {
    return left * right;
  },
  OP_DIV: function OP_DIV(left, right) {
    return left / right;
  },
  OP_SET: function OP_SET(left, right, jes, prefix, context) {
    return evaluateExpr(undefined, right, jes, prefix, context, true);
  },
  OP_ADD_ITEM: function OP_ADD_ITEM(left, right, jes, prefix, context) {
    if (_typeof(left) !== 'object') {
      throw new ValidationError(VALUE_NOT_COLLECTION('OP_ADD_ITEM'));
    }

    if (Array.isArray(left)) {
      return left.concat(right);
    }

    if (!Array.isArray(right) || right.length !== 2) {
      throw new Error(OPERAND_NOT_TUPLE('OP_ADD_ITEM'));
    }

    return _objectSpread(_objectSpread({}, left), {}, _defineProperty({}, right[0], evaluateExpr(left, right[1], jes, prefix, _objectSpread(_objectSpread({}, context), {}, {
      $$PARENT: context.$$CURRENT,
      $$CURRENT: left
    }))));
  },
  OP_PICK: function OP_PICK(left, right, jes, prefix) {
    if (left == null) return null;

    if (_typeof(right) !== 'object') {
      right = _castArray(right);
    }

    if (Array.isArray(right)) {
      return _pick(left, right);
    }

    return _pickBy(left, function (x, key) {
      return _match3(key, right, jes, formatPrefix(key, prefix))[0];
    });
  },
  OP_GET_BY_INDEX: function OP_GET_BY_INDEX(left, right) {
    return _nth(left, right);
  },
  OP_GET_BY_KEY: function OP_GET_BY_KEY(left, right) {
    return _get(left, right);
  },
  OP_OMIT: function OP_OMIT(left, right, jes, prefix) {
    if (left == null) return null;

    if (_typeof(right) !== 'object') {
      right = _castArray(right);
    }

    if (Array.isArray(right)) {
      return _omit(left, right);
    }

    return _omitBy(left, function (x, key) {
      return _match3(key, right, jes, formatPrefix(key, prefix))[0];
    });
  },
  OP_GROUP: function OP_GROUP(left, right) {
    return _groupBy(left, right);
  },
  OP_SORT: function OP_SORT(left, right) {
    return _sortBy(left, right);
  },
  OP_EVAL: evaluateExpr,
  OP_MERGE: function OP_MERGE(left, right, jes, prefix, context) {
    if (!Array.isArray(right)) {
      throw new Error(OPERAND_NOT_ARRAY('OP_MERGE'));
    }

    return right.reduce(function (result, expr, key) {
      return Object.assign(result, evaluateExpr(left, expr, jes, formatPrefix(key, prefix), _objectSpread({}, context)));
    }, {});
  },
  OP_FILTER: function OP_FILTER(left, right, jes, prefix, context) {
    if (left == null) return null;

    if (_typeof(left) !== 'object') {
      throw new ValidationError(VALUE_NOT_COLLECTION('OP_FILTER'));
    }

    return _filter(left, function (value, key) {
      return test(value, 'OP_MATCH', right, jes, formatPrefix(key, prefix));
    });
  },
  OP_REMAP: function OP_REMAP(left, right, jes, prefix, context) {
    if (left == null) return null;

    if (_typeof(left) !== 'object') {
      throw new ValidationError(VALUE_NOT_COLLECTION('OP_REMAP'));
    }

    return remap(left, right);
  },
  OP_IF: function OP_IF(left, right, jes, prefix, context) {
    if (!Array.isArray(right)) {
      throw new Error(OPERAND_NOT_ARRAY('OP_IF'));
    }

    if (right.length < 2 || right.length > 3) {
      throw new Error(OPERAND_NOT_TUPLE_2_OR_3('OP_IF'));
    }

    var condition = evaluateExpr(undefined, right[0], jes, prefix, context, true);

    if (test(left, 'OP_MATCH', condition, jes, prefix)) {
      return evaluateExpr(left, right[1], jes, prefix, context);
    } else if (right.length > 2) {
      var ret = evaluateExpr(left, right[2], jes, prefix, context);
      return ret;
    }

    return left;
  }
};

var formatName = function formatName(name, prefix) {
  var fullName = name == null ? prefix : formatPrefix(name, prefix);
  return fullName == null ? 'The value' : fullName.indexOf('(') !== -1 ? "The query \"?.".concat(fullName, "\"") : "\"".concat(fullName, "\"");
};

var formatKey = function formatKey(key, hasPrefix) {
  return _isInteger(key) ? "[".concat(key, "]") : hasPrefix ? '.' + key : key;
};

var formatPrefix = function formatPrefix(key, prefix) {
  return prefix != null ? "".concat(prefix).concat(formatKey(key, true)) : formatKey(key, false);
};

var formatQuery = function formatQuery(opMeta) {
  return "".concat(defaultQueryExplanations[opMeta[0]], "(").concat(opMeta[1] ? '' : '?', ")");
};

var formatMap = function formatMap(name) {
  return "each(->".concat(name, ")");
};

var formatAny = function formatAny(name) {
  return "any(->".concat(name, ")");
};

var defaultJesExplanations = {
  OP_EQUAL: function OP_EQUAL(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should be ").concat(JSON.stringify(right), ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_NOT_EQUAL: function OP_NOT_EQUAL(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should not be ").concat(JSON.stringify(right), ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_NOT: function OP_NOT(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should not match ").concat(JSON.stringify(right), ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_GREATER_THAN: function OP_GREATER_THAN(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should be greater than ").concat(right, ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_GREATER_THAN_OR_EQUAL: function OP_GREATER_THAN_OR_EQUAL(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should be greater than or equal to ").concat(right, ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_LESS_THAN: function OP_LESS_THAN(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should be less than ").concat(right, ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_LESS_THAN_OR_EQUAL: function OP_LESS_THAN_OR_EQUAL(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should be less than or equal to ").concat(right, ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_IN: function OP_IN(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should be one of ").concat(JSON.stringify(right), ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_NOT_IN: function OP_NOT_IN(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should not be any one of ").concat(JSON.stringify(right), ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_EXISTS: function OP_EXISTS(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should").concat(right ? ' not ' : ' ', "be NULL.");
  },
  OP_TYPE: function OP_TYPE(name, left, right, prefix) {
    return "The type of ".concat(formatName(name, prefix), " should be \"").concat(right, "\", but ").concat(JSON.stringify(left), " given.");
  },
  OP_MATCH: function OP_MATCH(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should match ").concat(JSON.stringify(right), ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_MATCH_ANY: function OP_MATCH_ANY(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should match any of ").concat(JSON.stringify(right), ", but ").concat(JSON.stringify(left), " given.");
  },
  OP_HAS_KEYS: function OP_HAS_KEYS(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should have all of these keys [").concat(right.join(', '), "].");
  },
  OP_START_WITH: function OP_START_WITH(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should start with \"").concat(right, "\".");
  },
  OP_END_WITH: function OP_END_WITH(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should end with \"").concat(right, "\".");
  }
};
var defaultQueryExplanations = {
  //unary
  OP_SIZE: 'size',
  OP_SUM: 'sum',
  OP_KEYS: 'keys',
  OP_VALUES: 'values',
  OP_GET_TYPE: 'get type',
  OP_REVERSE: 'reverse',
  //binary
  OP_ADD: 'add',
  OP_SUB: 'subtract',
  OP_MUL: 'multiply',
  OP_DIV: 'divide',
  OP_SET: 'assign',
  OP_ADD_ITEM: 'addItem',
  OP_PICK: 'pick',
  OP_GET_BY_INDEX: 'get element at index',
  OP_GET_BY_KEY: 'get element of key',
  OP_OMIT: 'omit',
  OP_GROUP: 'groupBy',
  OP_SORT: 'sortBy',
  OP_EVAL: 'evaluate',
  OP_MERGE: 'merge',
  OP_FILTER: 'filter',
  OP_REMAP: 'remap',
  OP_IF: 'evaluate if'
};

function getUnmatchedExplanation(jes, op, name, leftValue, rightValue, prefix) {
  var getter = jes.operatorExplanations[op] || jes.operatorExplanations.OP_MATCH;
  return getter(name, leftValue, rightValue, prefix);
}

function test(value, op, opValue, jes, prefix) {
  var handler = jes.operatorHandlers[op];

  if (!handler) {
    throw new Error(INVALID_TEST_HANLDER(op));
  }

  return handler(value, opValue, jes, prefix);
}

function evaluate(value, op, opValue, jes, prefix, context) {
  var handler = jes.queryHanlders[op];

  if (!handler) {
    throw new Error(INVALID_QUERY_HANDLER(op));
  }

  return handler(value, opValue, jes, prefix, context);
}

function evaluateUnary(value, op, jes, prefix) {
  var handler = jes.queryHanlders[op];

  if (!handler) {
    throw new Error(INVALID_QUERY_HANDLER(op));
  }

  return handler(value, jes, prefix);
}

function evaluateByOpMeta(currentValue, rightValue, opMeta, jes, prefix, context) {
  if (opMeta[1]) {
    return rightValue ? evaluateUnary(currentValue, opMeta[0], jes, prefix) : currentValue;
  }

  return evaluate(currentValue, opMeta[0], rightValue, jes, prefix, context);
}

var defaultCustomizer = {
  mapOfOperators: MapOfOps,
  mapOfManipulators: MapOfMans,
  operatorHandlers: defaultJesHandlers,
  operatorExplanations: defaultJesExplanations,
  queryHanlders: defaultManipulations
};

function matchCollection(actual, collectionOp, opMeta, operands, jes, prefix) {
  var matchResult, nextPrefix;

  switch (collectionOp) {
    case PFX_FOR_EACH:
      var mapResult = isPlainObject(actual) ? _mapValues(actual, function (item, key) {
        return evaluateByOpMeta(item, operands[0], opMeta, jes, formatPrefix(key, prefix));
      }) : actual.map(function (item, i) {
        return evaluateByOpMeta(item, operands[0], opMeta, jes, formatPrefix(i, prefix));
      });
      nextPrefix = formatPrefix(formatMap(formatQuery(opMeta)), prefix);
      matchResult = _match3(mapResult, operands[1], jes, nextPrefix);
      break;

    case PFX_WITH_ANY:
      nextPrefix = formatPrefix(formatAny(formatQuery(opMeta)), prefix);
      matchResult = _find(actual, function (item, key) {
        return _match3(evaluateByOpMeta(item, operands[0], opMeta, jes, formatPrefix(key, prefix)), operands[1], jes, nextPrefix);
      });
      break;

    default:
      throw new Error(INVALID_COLLECTION_OP(collectionOp));
  }

  if (!matchResult[0]) {
    return matchResult;
  }

  return undefined;
}

function validateCollection(actual, collectionOp, op, expectedFieldValue, jes, prefix) {
  switch (collectionOp) {
    case PFX_FOR_EACH:
      var unmatchedKey = _findIndex(actual, function (item) {
        return !test(item, op, expectedFieldValue, jes, prefix);
      });

      if (unmatchedKey) {
        return [false, getUnmatchedExplanation(jes, op, unmatchedKey, actual[unmatchedKey], expectedFieldValue, prefix)];
      }

      break;

    case PFX_WITH_ANY:
      var matched = _find(actual, function (item, key) {
        return test(item, op, expectedFieldValue, jes, prefix);
      });

      if (!matched) {
        return [false, getUnmatchedExplanation(jes, op, null, actual, expectedFieldValue, prefix)];
      }

      break;

    default:
      throw new Error(INVALID_COLLECTION_OP(collectionOp));
  }

  return undefined;
}

function evaluateCollection(currentValue, collectionOp, opMeta, expectedFieldValue, jes, prefix, context) {
  switch (collectionOp) {
    case PFX_FOR_EACH:
      return _map(currentValue, function (item, i) {
        return evaluateByOpMeta(item, expectedFieldValue, opMeta, jes, formatPrefix(i, prefix), _objectSpread(_objectSpread({}, context), {}, {
          $$PARENT: currentValue,
          $$CURRENT: item
        }));
      });

    case PFX_WITH_ANY:
      throw new Error(PRX_OP_NOT_FOR_EVAL(collectionOp));

    default:
      throw new Error(INVALID_COLLECTION_OP(collectionOp));
  }
}
/**
 *
 * @param {*} actual
 * @param {*} expected
 * @param {*} jes
 * @param {*} prefix
 *
 * { key: { $match } }
 */


function _match3(actual, expected, jes, prefix) {
  jes != null || (jes = defaultCustomizer);
  var passObjectCheck = false;

  if (!isPlainObject(expected)) {
    if (!test(actual, 'OP_EQUAL', expected, jes, prefix)) {
      return [false, jes.operatorExplanations.OP_EQUAL(null, actual, expected, prefix)];
    }

    return [true];
  }

  for (var fieldName in expected) {
    var expectedFieldValue = expected[fieldName];
    var l = fieldName.length;

    if (l > 1) {
      if (l > 4 && fieldName[0] === '|' && fieldName[2] === '$') {
        if (fieldName[3] === '$') {
          if (!Array.isArray(expectedFieldValue) && expectedFieldValue.length !== 2) {
            throw new Error(OPERAND_NOT_TUPLE());
          } //processors


          var collectionOp = fieldName.substr(0, 2);
          fieldName = fieldName.substr(3);
          var opMeta = jes.mapOfManipulators.get(fieldName);

          if (!opMeta) {
            throw new Error(INVALID_QUERY_OPERATOR(fieldName));
          }

          var matchResult = matchCollection(actual, collectionOp, opMeta, expectedFieldValue, jes, prefix);
          if (matchResult) return matchResult;
          continue;
        } else {
          //validators
          var _collectionOp = fieldName.substr(0, 2);

          fieldName = fieldName.substr(2);
          var op = jes.mapOfOperators.get(fieldName);

          if (!op) {
            throw new Error(INVALID_TEST_OPERATOR(fieldName));
          }

          var _matchResult = validateCollection(actual, _collectionOp, op, expectedFieldValue, jes, prefix);

          if (_matchResult) return _matchResult;
          continue;
        }
      }

      if (fieldName[0] === '$') {
        if (l > 2 && fieldName[1] === '$') {
          fieldName = fieldName.substr(1); //processors

          var _opMeta = jes.mapOfManipulators.get(fieldName);

          if (!_opMeta) {
            throw new Error(INVALID_QUERY_OPERATOR(fieldName));
          }

          if (!_opMeta[1]) {
            throw new Error(NOT_A_UNARY_QUERY);
          }

          var queryResult = evaluateUnary(actual, _opMeta[0], jes, prefix);

          var _matchResult2 = _match3(queryResult, expectedFieldValue, jes, formatPrefix(formatQuery(_opMeta), prefix));

          if (!_matchResult2[0]) {
            return _matchResult2;
          }

          continue;
        } //validator


        var _op = jes.mapOfOperators.get(fieldName);

        if (!_op) {
          throw new Error(INVALID_TEST_OPERATOR(fieldName));
        }

        if (!test(actual, _op, expectedFieldValue, jes, prefix)) {
          return [false, getUnmatchedExplanation(jes, _op, null, actual, expectedFieldValue, prefix)];
        }

        continue;
      }
    }

    if (!passObjectCheck) {
      if (actual == null) return [false, jes.operatorExplanations.OP_EXISTS(null, null, true, prefix)];

      var actualType = _typeof(actual);

      if (actualType !== 'object') return [false, jes.operatorExplanations.OP_TYPE(null, actualType, 'object', prefix)];
    }

    passObjectCheck = true;

    var actualFieldValue = _get(actual, fieldName);

    if (expectedFieldValue != null && _typeof(expectedFieldValue) === 'object') {
      var _match = _match3(actualFieldValue, expectedFieldValue, jes, formatPrefix(fieldName, prefix)),
          _match2 = _slicedToArray(_match, 2),
          ok = _match2[0],
          reason = _match2[1];

      if (!ok) {
        return [false, reason];
      }
    } else {
      if (!test(actualFieldValue, 'OP_EQUAL', expectedFieldValue, jes, prefix)) {
        return [false, jes.operatorExplanations.OP_EQUAL(fieldName, actualFieldValue, expectedFieldValue, prefix)];
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
 * @param {*} jes
 * @param {*} context
 */


function evaluateExpr(currentValue, expr, jes, prefix, context, setOp) {
  jes != null || (jes = defaultCustomizer);

  if (Array.isArray(expr)) {
    if (setOp) {
      return expr.map(function (item) {
        return evaluateExpr(undefined, item, jes, prefix, _objectSpread({}, context), true);
      });
    }

    return expr.reduce(function (result, exprItem) {
      return evaluateExpr(result, exprItem, jes, prefix, _objectSpread({}, context));
    }, currentValue);
  }

  var typeExpr = _typeof(expr);

  if (typeExpr === 'boolean') {
    if (setOp) return expr;
    return expr ? currentValue : undefined;
  }

  if (typeExpr === 'number' || typeExpr === 'bigint') {
    if (setOp) return expr;
    throw new Error(INVALID_EXPR_SYNTAX);
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

    var opMeta = jes.mapOfManipulators.get(expr);

    if (!opMeta) {
      throw new Error(INVALID_QUERY_OPERATOR(expr));
    }

    if (!opMeta[1]) {
      throw new Error(REQUIRE_RIGHT_OPERAND(expr));
    }

    return evaluateUnary(currentValue, opMeta[0], jes, prefix);
  }

  if (typeExpr !== 'object') {
    throw new Error(INVALID_EXPR_SYNTAX);
  }

  if (setOp) {
    return _mapValues(expr, function (item) {
      return evaluateExpr(undefined, item, jes, prefix, context, true);
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
          throw new Error(OPERATOR_NOT_ALONE);
        }

        var _opMeta2 = jes.mapOfManipulators.get(fieldName);

        if (!_opMeta2) {
          throw new Error(INVALID_QUERY_OPERATOR(fieldName));
        }

        result = evaluateByOpMeta(currentValue, expectedFieldValue, _opMeta2, jes, prefix, context);
        hasOperator = true;
        continue;
      }

      if (l > 3 && fieldName[0] === '|' && fieldName[2] === '$') {
        if (result) {
          throw new Error(OPERATOR_NOT_ALONE);
        }

        var collectionOp = fieldName.substr(0, 2);
        fieldName = fieldName.substr(2);

        var _opMeta3 = jes.mapOfManipulators.get(fieldName);

        if (!_opMeta3) {
          throw new Error(INVALID_QUERY_OPERATOR(fieldName));
        }

        result = evaluateCollection(currentValue, collectionOp, _opMeta3, expectedFieldValue, jes, prefix, context);
        hasOperator = true;
        continue;
      }
    }

    if (hasOperator) {
      throw new Error(OPERATOR_NOT_ALONE);
    }

    var compleyKey = fieldName.indexOf('.') !== -1; //pick a field and then apply manipulation

    var actualFieldValue = currentValue != null ? compleyKey ? _get(currentValue, fieldName) : currentValue[fieldName] : undefined;
    var childFieldValue = evaluateExpr(actualFieldValue, expectedFieldValue, jes, formatPrefix(fieldName, prefix), context);

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
   * @param {object} customizer
   */
  function JES(value, customizer) {
    _classCallCheck(this, JES);

    this.value = value;
    this.customizer = customizer;
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
      var result = _match3(this.value, expected, this.customizer);

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
      return evaluateExpr(this.value, expr, this.customizer);
    }
    /**
     * Evaluate a JSON expression against the value and update the value
     * @param {object} - JSON operation expression
     * @returns {JES}
     */

  }, {
    key: "update",
    value: function update(expr) {
      var value = evaluateExpr(this.value, expr, this.customizer);
      this.value = value;
      return this;
    }
  }]);

  return JES;
}();

_defineProperty(JES, "match", _match3);

_defineProperty(JES, "evaluate", evaluateExpr);

_defineProperty(JES, "defaultCustomizer", defaultCustomizer);

module.exports = JES;
//# sourceMappingURL=index.js.map