"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _size2 = _interopRequireDefault(require("lodash/size"));

var _reduce2 = _interopRequireDefault(require("lodash/reduce"));

var _reverse2 = _interopRequireDefault(require("lodash/reverse"));

var _keys2 = _interopRequireDefault(require("lodash/keys"));

var _values2 = _interopRequireDefault(require("lodash/values"));

var _pick2 = _interopRequireDefault(require("lodash/pick"));

var _pickBy2 = _interopRequireDefault(require("lodash/pickBy"));

var _nth2 = _interopRequireDefault(require("lodash/nth"));

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _omitBy2 = _interopRequireDefault(require("lodash/omitBy"));

var _groupBy2 = _interopRequireDefault(require("lodash/groupBy"));

var _sortBy2 = _interopRequireDefault(require("lodash/sortBy"));

var _filter2 = _interopRequireDefault(require("lodash/filter"));

var _map2 = _interopRequireDefault(require("lodash/map"));

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _findIndex2 = _interopRequireDefault(require("lodash/findIndex"));

var _findKey2 = _interopRequireDefault(require("lodash/findKey"));

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _july = require("@genx/july");

var _config = _interopRequireWildcard(require("./config"));

var _transformerOperators = _interopRequireDefault(require("./transformerOperators"));

var _validateOperators = _interopRequireDefault(require("./validateOperators"));

var _validate = require("./validate");

require("./validators");

var _transform = _interopRequireDefault(require("./transform"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var MSG = _config["default"].messages;
var UNARY = true;
var BINARY = false; //Query & aggregate operators (pure)

var OP_MATCH = [_transformerOperators["default"].MATCH, BINARY, '$has', '$match', '$all', '$validate', '$when'];
var OP_SIZE = [_transformerOperators["default"].SIZE, UNARY, '$size', '$length', '$count'];
var OP_SUM = [_transformerOperators["default"].SUM, UNARY, '$sum', '$total'];
var OP_GET_TYPE = [_transformerOperators["default"].GET_TYPE, UNARY, '$type'];
var OP_GET_BY_INDEX = [_transformerOperators["default"].GET_BY_INDEX, BINARY, '$at', '$getByIndex', '$nth']; // supports -1 as the last index, -2 the second last

var OP_GET_BY_KEY = [_transformerOperators["default"].GET_BY_KEY, BINARY, '$of', '$valueOf', '$getByKey']; // support key path

var OP_FIND = [_transformerOperators["default"].FIND, BINARY, '$indexOf', '$keyOf'];
var OP_IF = [_transformerOperators["default"].IF, BINARY, '$if'];
var OP_CAST_ARRAY = [_transformerOperators["default"].CAST_ARRAY, UNARY, '$castArray', '$makeArray']; //Math operators (pure)

var OP_ADD = [_transformerOperators["default"].ADD, BINARY, '$add', '$plus', '$inc'];
var OP_SUB = [_transformerOperators["default"].SUB, BINARY, '$sub', '$subtract', '$minus', '$dec'];
var OP_MUL = [_transformerOperators["default"].MUL, BINARY, '$mul', '$multiply', '$times'];
var OP_DIV = [_transformerOperators["default"].DIV, BINARY, '$div', '$divide'];
var OP_MOD = [_transformerOperators["default"].MOD, BINARY, '$mod', '$remainder']; //Collection operators (pure)

var OP_KEYS = [_transformerOperators["default"].KEYS, UNARY, '$keys'];
var OP_VALUES = [_transformerOperators["default"].VALUES, UNARY, '$values'];
var OP_ENTRIES = [_transformerOperators["default"].ENTRIES, UNARY, '$entries'];
var OP_OBJ_TO_ARRAY = [_transformerOperators["default"].OBJ_TO_ARRAY, UNARY, '$toArray', '$objectToArray'];
var OP_PICK = [_transformerOperators["default"].PICK, BINARY, '$pick', '$pickBy', '$filterByKeys']; // filter by key

var OP_OMIT = [_transformerOperators["default"].OMIT, BINARY, '$omit', '$omitBy'];
var OP_SLICE = [_transformerOperators["default"].SLICE, BINARY, '$slice', '$limit'];
var OP_GROUP = [_transformerOperators["default"].GROUP, BINARY, '$group', '$groupBy'];
var OP_SORT = [_transformerOperators["default"].SORT, BINARY, '$sort', '$orderBy', '$sortBy'];
var OP_REVERSE = [_transformerOperators["default"].REVERSE, UNARY, '$reverse'];
var OP_JOIN = [_transformerOperators["default"].JOIN, BINARY, '$join'];
var OP_MERGE = [_transformerOperators["default"].MERGE, BINARY, '$merge']; // merge a list of transform result over the value

var OP_FILTER = [_transformerOperators["default"].FILTER, BINARY, '$filter', '$select', '$filterByValue']; // filter by value

var OP_REMAP = [_transformerOperators["default"].REMAP, BINARY, '$remap', '$mapKeys']; // reverse-map, map a key to another name

var OP_TO_JSON = [_transformerOperators["default"].TO_JSON, UNARY, '$json', '$toJSON', '$stringify'];
var OP_TO_OBJ = [_transformerOperators["default"].TO_OBJ, UNARY, '$object', '$toObject', '$parseJSON']; //Value updater (pure)

var OP_SET = [_transformerOperators["default"].SET, BINARY, '$set', '$=', '$value'];
var OP_ADD_ITEM = [_transformerOperators["default"].ADD_ITEM, BINARY, '$addItem', '$addFields'];
var OP_ASSIGN = [_transformerOperators["default"].ASSIGN, BINARY, '$assign', '$override'];
var OP_APPLY = [_transformerOperators["default"].APPLY, BINARY, '$apply', '$eval']; // to be used in collection
//String manipulate

var OP_INTERPOLATE = [_transformerOperators["default"].INTERPOLATE, BINARY, '$interpolate', '$template']; // [ <op name>, <unary> ]
//embeded validators in processing pipeline

var matchOptions = {
  throwError: false,
  abortEarly: true,
  asPredicate: true
};

_config["default"].addTransformerToMap(OP_MATCH, function (left, right, context) {
  return (0, _validate.test)(left, _validateOperators["default"].MATCH, right, matchOptions, context);
});

_config["default"].addTransformerToMap(OP_SIZE, function (left) {
  return (0, _size2["default"])(left);
});

_config["default"].addTransformerToMap(OP_SUM, function (left) {
  return (0, _reduce2["default"])(left, function (sum, item) {
    sum += item;
    return sum;
  }, 0);
});

_config["default"].addTransformerToMap(OP_GET_TYPE, function (left) {
  return Array.isArray(left) ? 'array' : Number.isInteger(left) ? 'integer' : _typeof(left);
});

_config["default"].addTransformerToMap(OP_GET_BY_INDEX, function (left, right) {
  return (0, _nth2["default"])(left, right);
});

_config["default"].addTransformerToMap(OP_GET_BY_KEY, function (left, right) {
  return (0, _july.get)(left, right);
});

_config["default"].addTransformerToMap(OP_FIND, function (left, right, context) {
  var targetValue = (0, _transform["default"])(null, right, context);
  console.log(left, targetValue, context);

  var predicate = function predicate(value) {
    return (0, _isEqual2["default"])(value, targetValue);
  };

  return Array.isArray(left) ? (0, _findIndex2["default"])(left, predicate) : (0, _findKey2["default"])(left, predicate);
});

_config["default"].addTransformerToMap(OP_IF, function (left, right, context) {
  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_transformerOperators["default"].IF));
  }

  if (right.length < 2 || right.length > 3) {
    throw new Error(MSG.OPERAND_NOT_TUPLE_2_OR_3(_transformerOperators["default"].IF));
  }

  var condition = (0, _transform["default"])(left, right[0], context);

  if (condition) {
    return (0, _transform["default"])(left, right[1], context);
  } else if (right.length > 2) {
    return (0, _transform["default"])(left, right[2], context);
  }

  return left;
});

_config["default"].addTransformerToMap(OP_CAST_ARRAY, function (left) {
  return left == null ? null : Array.isArray(left) ? left : [left];
});

_config["default"].addTransformerToMap(OP_ADD, function (left, right) {
  return left + right;
});

_config["default"].addTransformerToMap(OP_SUB, function (left, right) {
  return left - right;
});

_config["default"].addTransformerToMap(OP_MUL, function (left, right) {
  return left * right;
});

_config["default"].addTransformerToMap(OP_DIV, function (left, right) {
  return left / right;
});

_config["default"].addTransformerToMap(OP_MOD, function (left, right) {
  return left % right;
});

_config["default"].addTransformerToMap(OP_KEYS, function (left) {
  return (0, _keys2["default"])(left);
});

_config["default"].addTransformerToMap(OP_VALUES, function (left) {
  return (0, _values2["default"])(left);
});

_config["default"].addTransformerToMap(OP_ENTRIES, function (left) {
  return (0, _map2["default"])(left, function (value, key) {
    return [key, value];
  });
});

_config["default"].addTransformerToMap(OP_OBJ_TO_ARRAY, function (left) {
  return (0, _map2["default"])(left, function (v, k) {
    return {
      k: k,
      v: v
    };
  });
});

_config["default"].addTransformerToMap(OP_PICK, function (left, right, context) {
  if (left == null) {
    return null;
  }

  if (_typeof(right) !== 'object') {
    right = [right];
  }

  if (Array.isArray(right)) {
    return (0, _pick2["default"])(left, right);
  }

  return (0, _pickBy2["default"])(left, function (item, key) {
    return (0, _validate.test)(key, _validateOperators["default"].MATCH, right, matchOptions, (0, _config.getChildContext)(context, left, key, item));
  });
});

_config["default"].addTransformerToMap(OP_OMIT, function (left, right, context) {
  if (left == null) {
    return null;
  }

  if (_typeof(right) !== 'object') {
    right = [right];
  }

  if (Array.isArray(right)) {
    return (0, _omit2["default"])(left, right);
  }

  return (0, _omitBy2["default"])(left, function (item, key) {
    return (0, _validate.test)(key, _validateOperators["default"].MATCH, right, matchOptions, (0, _config.getChildContext)(context, left, key, item));
  });
});

_config["default"].addTransformerToMap(OP_SLICE, function (left, right) {
  if (left == null) {
    return null;
  }

  if (!Array.isArray(left)) {
    return new Error(MSG.VALUE_NOT_ARRAY(_transformerOperators["default"].SLICE));
  }

  if (Number.isInteger(right)) {
    return left.slice(right);
  }

  if (Array.isArray(right)) {
    if (right.length === 0 || right.length > 2) {
      return new Error(MSG.INVALID_OP_EXPR(_transformerOperators["default"].SLICE, right));
    }

    return left.slice.apply(left, _toConsumableArray(right));
  }

  return new Error(MSG.INVALID_OP_EXPR(_transformerOperators["default"].SLICE, right));
});

_config["default"].addTransformerToMap(OP_GROUP, function (left, right) {
  return (0, _groupBy2["default"])(left, right);
});

_config["default"].addTransformerToMap(OP_SORT, function (left, right) {
  return (0, _sortBy2["default"])(left, right);
});

_config["default"].addTransformerToMap(OP_REVERSE, function (left) {
  return (0, _reverse2["default"])(left);
});

_config["default"].addTransformerToMap(OP_JOIN, function (left, right) {
  if (left == null) {
    return null;
  }

  if (!Array.isArray(left)) {
    throw new Error(MSG.VALUE_NOT_ARRAY(_transformerOperators["default"].JOIN));
  }

  return left.join(right.toString());
});

var objectMerger = function objectMerger(left, context) {
  return [function (result, expr) {
    return Object.assign(result, (0, _transform["default"])(left, expr, context));
  }, {}];
};

var arrayMerger = function arrayMerger(left, context) {
  return [function (result, expr) {
    return [].concat(_toConsumableArray(result), _toConsumableArray((0, _transform["default"])(left, expr, context)));
  }, []];
};

_config["default"].addTransformerToMap(OP_MERGE, function (left, right, context) {
  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_transformerOperators["default"].MERGE));
  }

  return right.reduce.apply(right, _toConsumableArray(Array.isArray(left) ? arrayMerger(left, context) : objectMerger(left, context)));
});

_config["default"].addTransformerToMap(OP_FILTER, function (left, right, context) {
  if (left == null) {
    return null;
  }

  if (_typeof(left) !== 'object') {
    throw new Error(MSG.VALUE_NOT_COLLECTION(_transformerOperators["default"].FILTER));
  }

  return (0, _filter2["default"])(left, function (value, key) {
    return (0, _validate.test)(value, _validateOperators["default"].MATCH, right, matchOptions, {
      path: MSG.makePath(key, context.path)
    });
  });
});

_config["default"].addTransformerToMap(OP_REMAP, function (left, right) {
  if (left == null) {
    return null;
  }

  if (_typeof(left) !== 'object') {
    throw new Error(MSG.VALUE_NOT_COLLECTION(_transformerOperators["default"].REMAP));
  }

  if (Array.isArray(right)) {
    if (right.length !== 2) {
      throw new Error(MSG.OPERAND_NOT_TUPLE(_transformerOperators["default"].REMAP));
    }

    return (0, _july.remap)(left, right[0], right[1]);
  }

  if (!(0, _july.isPlainObject)(right)) {
    throw new Error(MSG.OPERAND_NOT_OBJECT(_transformerOperators["default"].REMAP));
  }

  return (0, _july.remap)(left, right);
});

_config["default"].addTransformerToMap(OP_TO_JSON, function (left) {
  return left == null ? left : JSON.stringify(left);
});

_config["default"].addTransformerToMap(OP_TO_OBJ, function (left) {
  return left == null ? left : JSON.parse(left);
});

_config["default"].addTransformerToMap(OP_SET, function (left, right, context) {
  return (0, _transform["default"])(undefined, right, context, true);
});

_config["default"].addTransformerToMap(OP_ADD_ITEM, function (left, right, context) {
  if (_typeof(left) !== 'object') {
    throw new Error(MSG.VALUE_NOT_COLLECTION(_transformerOperators["default"].ADD_ITEM));
  }

  if (Array.isArray(left)) {
    return left.concat((0, _transform["default"])(left, right, context));
  }

  if (!Array.isArray(right) || right.length !== 2) {
    throw new Error(MSG.OPERAND_NOT_TUPLE(_transformerOperators["default"].ADD_ITEM));
  }

  return _objectSpread(_objectSpread({}, left), {}, _defineProperty({}, right[0], (0, _transform["default"])(left, right[1], context)));
});

_config["default"].addTransformerToMap(OP_ASSIGN, function (left, right, context) {
  if (!(0, _july.isPlainObject)(left)) {
    if (left == null) {
      left = {};
    } else {
      throw new Error(MSG.VALUE_NOT_OBJECT(_transformerOperators["default"].ASSIGN));
    }
  }

  if (!(0, _july.isPlainObject)(right)) {
    throw new Error(MSG.OPERAND_NOT_OBJECT(_transformerOperators["default"].ASSIGN));
  }

  var rightValue = (0, _mapValues2["default"])(right, function (expr, key) {
    return (0, _transform["default"])(left[key], expr, (0, _config.getChildContext)(context, left, key, left[key]));
  });
  return _objectSpread(_objectSpread({}, left), rightValue);
});

_config["default"].addTransformerToMap(OP_APPLY, _transform["default"]);

_config["default"].addTransformerToMap(OP_INTERPOLATE, function (left, right) {
  if (typeof left !== 'string') {
    throw new Error(MSG.VALUE_NOT_STRING(_transformerOperators["default"].INTERPOLATE));
  }

  if (right != null && _typeof(right) !== 'object') {
    throw new Error(MSG.OPERAND_NOT_OBJECT(_transformerOperators["default"].INTERPOLATE));
  }

  return (0, _july.template)(left, right);
});

var _default = _transform["default"];
exports["default"] = _default;
//# sourceMappingURL=transformers.js.map