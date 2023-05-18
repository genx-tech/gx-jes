"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("source-map-support/register");
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
var _each2 = _interopRequireDefault(require("lodash/each"));
var _july = require("@genx/july");
var _config = _interopRequireWildcard(require("./config"));
var _transformerOperators = _interopRequireDefault(require("./transformerOperators"));
var _validateOperators = _interopRequireDefault(require("./validateOperators"));
var _validate = require("./validate");
require("./validators");
var _transform = _interopRequireDefault(require("./transform"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const MSG = _config.default.messages;
const UNARY = true;
const BINARY = false;
const OP_MATCH = [_transformerOperators.default.MATCH, BINARY, '$has', '$match', '$all', '$validate', '$when'];
const OP_SIZE = [_transformerOperators.default.SIZE, UNARY, '$size', '$length', '$count'];
const OP_SUM = [_transformerOperators.default.SUM, UNARY, '$sum', '$total'];
const OP_GET_TYPE = [_transformerOperators.default.GET_TYPE, UNARY, '$type'];
const OP_GET_BY_INDEX = [_transformerOperators.default.GET_BY_INDEX, BINARY, '$at', '$getByIndex', '$nth'];
const OP_GET_BY_KEY = [_transformerOperators.default.GET_BY_KEY, BINARY, '$of', '$valueOf', '$getByKey'];
const OP_FIND = [_transformerOperators.default.FIND, BINARY, '$indexOf', '$keyOf'];
const OP_IF = [_transformerOperators.default.IF, BINARY, '$if'];
const OP_CAST_ARRAY = [_transformerOperators.default.CAST_ARRAY, UNARY, '$castArray', '$makeArray'];
const OP_ADD = [_transformerOperators.default.ADD, BINARY, '$add', '$plus', '$inc'];
const OP_SUB = [_transformerOperators.default.SUB, BINARY, '$sub', '$subtract', '$minus', '$dec'];
const OP_MUL = [_transformerOperators.default.MUL, BINARY, '$mul', '$multiply', '$times'];
const OP_DIV = [_transformerOperators.default.DIV, BINARY, '$div', '$divide'];
const OP_MOD = [_transformerOperators.default.MOD, BINARY, '$mod', '$remainder'];
const OP_KEYS = [_transformerOperators.default.KEYS, UNARY, '$keys'];
const OP_VALUES = [_transformerOperators.default.VALUES, UNARY, '$values'];
const OP_ENTRIES = [_transformerOperators.default.ENTRIES, UNARY, '$entries'];
const OP_OBJ_TO_ARRAY = [_transformerOperators.default.OBJ_TO_ARRAY, UNARY, '$toArray', '$objectToArray'];
const OP_FILTER_NULL = [_transformerOperators.default.FILTER_NULL, UNARY, '$filterNull', '$filterNullValues'];
const OP_PICK = [_transformerOperators.default.PICK, BINARY, '$pick', '$pickBy', '$filterByKeys'];
const OP_OMIT = [_transformerOperators.default.OMIT, BINARY, '$omit', '$omitBy'];
const OP_SLICE = [_transformerOperators.default.SLICE, BINARY, '$slice', '$limit'];
const OP_GROUP = [_transformerOperators.default.GROUP, BINARY, '$group', '$groupBy'];
const OP_SORT = [_transformerOperators.default.SORT, BINARY, '$sort', '$orderBy', '$sortBy'];
const OP_REVERSE = [_transformerOperators.default.REVERSE, UNARY, '$reverse'];
const OP_JOIN = [_transformerOperators.default.JOIN, BINARY, '$join', '$implode'];
const OP_MERGE = [_transformerOperators.default.MERGE, BINARY, '$merge'];
const OP_FILTER = [_transformerOperators.default.FILTER, BINARY, '$filter', '$select', '$filterByValue'];
const OP_REMAP = [_transformerOperators.default.REMAP, BINARY, '$remap', '$mapKeys'];
const OP_TO_JSON = [_transformerOperators.default.TO_JSON, UNARY, '$json', '$toJSON', '$stringify'];
const OP_TO_OBJ = [_transformerOperators.default.TO_OBJ, UNARY, '$object', '$toObject', '$parseJSON'];
const OP_SET = [_transformerOperators.default.SET, BINARY, '$set', '$=', '$value'];
const OP_ADD_ITEM = [_transformerOperators.default.ADD_ITEM, BINARY, '$addItem', '$addFields'];
const OP_ASSIGN = [_transformerOperators.default.ASSIGN, BINARY, '$assign', '$override', '$replace'];
const OP_APPLY = [_transformerOperators.default.APPLY, BINARY, '$apply', '$eval'];
const OP_SPLIT = [_transformerOperators.default.SPLIT, BINARY, '$split', '$explode'];
const OP_INTERPOLATE = [_transformerOperators.default.INTERPOLATE, BINARY, '$interpolate', '$template'];
const matchOptions = {
  throwError: false,
  abortEarly: true,
  asPredicate: true
};
_config.default.addTransformerToMap(OP_MATCH, (left, right, context) => (0, _validate.test)(left, _validateOperators.default.MATCH, right, matchOptions, context));
_config.default.addTransformerToMap(OP_SIZE, left => (0, _size2.default)(left));
_config.default.addTransformerToMap(OP_SUM, left => (0, _reduce2.default)(left, (sum, item) => {
  sum += item;
  return sum;
}, 0));
_config.default.addTransformerToMap(OP_GET_TYPE, left => Array.isArray(left) ? 'array' : Number.isInteger(left) ? 'integer' : typeof left);
_config.default.addTransformerToMap(OP_GET_BY_INDEX, (left, right) => (0, _nth2.default)(left, right));
_config.default.addTransformerToMap(OP_GET_BY_KEY, (left, right) => (0, _july.get)(left, right));
_config.default.addTransformerToMap(OP_FIND, (left, right, context) => {
  const targetValue = (0, _transform.default)(null, right, context);
  const predicate = value => (0, _isEqual2.default)(value, targetValue);
  return Array.isArray(left) ? (0, _findIndex2.default)(left, predicate) : (0, _findKey2.default)(left, predicate);
});
_config.default.addTransformerToMap(OP_IF, (left, right, context) => {
  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_transformerOperators.default.IF));
  }
  if (right.length < 2 || right.length > 3) {
    throw new Error(MSG.OPERAND_NOT_TUPLE_2_OR_3(_transformerOperators.default.IF));
  }
  const condition = (0, _transform.default)(left, right[0], context);
  if (condition) {
    return (0, _transform.default)(left, right[1], context);
  } else if (right.length > 2) {
    return (0, _transform.default)(left, right[2], context);
  }
  return left;
});
_config.default.addTransformerToMap(OP_CAST_ARRAY, left => left == null ? null : Array.isArray(left) ? left : [left]);
_config.default.addTransformerToMap(OP_ADD, (left, right) => left + right);
_config.default.addTransformerToMap(OP_SUB, (left, right) => left - right);
_config.default.addTransformerToMap(OP_MUL, (left, right) => left * right);
_config.default.addTransformerToMap(OP_DIV, (left, right) => left / right);
_config.default.addTransformerToMap(OP_MOD, (left, right) => left % right);
_config.default.addTransformerToMap(OP_KEYS, left => (0, _keys2.default)(left));
_config.default.addTransformerToMap(OP_VALUES, left => (0, _values2.default)(left));
_config.default.addTransformerToMap(OP_ENTRIES, left => (0, _map2.default)(left, (value, key) => [key, value]));
_config.default.addTransformerToMap(OP_OBJ_TO_ARRAY, left => (0, _map2.default)(left, (v, k) => ({
  k,
  v
})));
_config.default.addTransformerToMap(OP_FILTER_NULL, left => (0, _july.filterNull)(left));
_config.default.addTransformerToMap(OP_PICK, (left, right, context) => {
  if (left == null) {
    return null;
  }
  if (typeof right !== 'object') {
    right = [right];
  }
  if (Array.isArray(right)) {
    return (0, _pick2.default)(left, right);
  }
  return (0, _pickBy2.default)(left, (item, key) => (0, _validate.test)(key, _validateOperators.default.MATCH, right, matchOptions, (0, _config.getChildContext)(context, left, key, item)));
});
_config.default.addTransformerToMap(OP_OMIT, (left, right, context) => {
  if (left == null) {
    return null;
  }
  if (typeof right !== 'object') {
    right = [right];
  }
  if (Array.isArray(right)) {
    return (0, _omit2.default)(left, right);
  }
  return (0, _omitBy2.default)(left, (item, key) => (0, _validate.test)(key, _validateOperators.default.MATCH, right, matchOptions, (0, _config.getChildContext)(context, left, key, item)));
});
_config.default.addTransformerToMap(OP_SLICE, (left, right) => {
  if (left == null) {
    return null;
  }
  if (!Array.isArray(left)) {
    return new Error(MSG.VALUE_NOT_ARRAY(_transformerOperators.default.SLICE));
  }
  if (Number.isInteger(right)) {
    return left.slice(right);
  }
  if (Array.isArray(right)) {
    if (right.length === 0 || right.length > 2) {
      return new Error(MSG.INVALID_OP_EXPR(_transformerOperators.default.SLICE, right, ['integer', '[integer]']));
    }
    return left.slice(...right);
  }
  return new Error(MSG.INVALID_OP_EXPR(_transformerOperators.default.SLICE, right));
});
_config.default.addTransformerToMap(OP_GROUP, (left, right) => (0, _groupBy2.default)(left, right));
_config.default.addTransformerToMap(OP_SORT, (left, right) => (0, _sortBy2.default)(left, right));
_config.default.addTransformerToMap(OP_REVERSE, left => (0, _reverse2.default)(left));
_config.default.addTransformerToMap(OP_JOIN, (left, right) => {
  if (left == null) {
    return null;
  }
  if (!Array.isArray(left)) {
    throw new Error(MSG.VALUE_NOT_ARRAY(_transformerOperators.default.JOIN));
  }
  return left.join(right.toString());
});
const objectMerger = (left, context) => [(result, expr) => Object.assign(result, (0, _transform.default)(left, expr, context)), {}];
const arrayMerger = (left, context) => [(result, expr) => [...result, ...(0, _transform.default)(left, expr, context)], []];
_config.default.addTransformerToMap(OP_MERGE, (left, right, context) => {
  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_transformerOperators.default.MERGE));
  }
  return right.reduce(...(Array.isArray(left) ? arrayMerger(left, context) : objectMerger(left, context)));
});
_config.default.addTransformerToMap(OP_FILTER, (left, right, context) => {
  if (left == null) {
    return null;
  }
  if (typeof left !== 'object') {
    throw new Error(MSG.VALUE_NOT_COLLECTION(_transformerOperators.default.FILTER));
  }
  return (0, _filter2.default)(left, (value, key) => (0, _validate.test)(value, _validateOperators.default.MATCH, right, matchOptions, {
    path: MSG.makePath(key, context.path)
  }));
});
_config.default.addTransformerToMap(OP_REMAP, (left, right) => {
  if (left == null) {
    return null;
  }
  if (typeof left !== 'object') {
    throw new Error(MSG.VALUE_NOT_COLLECTION(_transformerOperators.default.REMAP));
  }
  if (Array.isArray(right)) {
    if (right.length !== 2) {
      throw new Error(MSG.OPERAND_NOT_TUPLE(_transformerOperators.default.REMAP));
    }
    if (!(0, _july.isPlainObject)(right[0]) || right[1] != null && typeof right[1] !== 'boolean') {
      throw new Error(MSG.INVALID_OP_EXPR(_transformerOperators.default.REMAP, right, ['object', 'boolean']));
    }
    return (0, _july.remap)(left, right[0], right[1]);
  }
  if (!(0, _july.isPlainObject)(right)) {
    throw new Error(MSG.OPERAND_NOT_OBJECT(_transformerOperators.default.REMAP));
  }
  return (0, _july.remap)(left, right);
});
_config.default.addTransformerToMap(OP_TO_JSON, left => left == null ? left : JSON.stringify(left));
_config.default.addTransformerToMap(OP_TO_OBJ, left => left == null ? left : JSON.parse(left));
_config.default.addTransformerToMap(OP_SET, (left, right, context) => (0, _transform.default)(undefined, right, context, true));
_config.default.addTransformerToMap(OP_ADD_ITEM, (left, right, context) => {
  if (typeof left !== 'object') {
    throw new Error(MSG.VALUE_NOT_COLLECTION(_transformerOperators.default.ADD_ITEM));
  }
  if (Array.isArray(left)) {
    return left.concat((0, _transform.default)(left, right, context));
  }
  if (!Array.isArray(right) || right.length !== 2) {
    throw new Error(MSG.OPERAND_NOT_TUPLE(_transformerOperators.default.ADD_ITEM));
  }
  if (typeof right[0] !== 'string') {
    throw new Error(MSG.INVALID_OP_EXPR(_transformerOperators.default.ADD_ITEM, right, ['string', 'any']));
  }
  return {
    ...left,
    [right[0]]: (0, _transform.default)(left, right[1], context)
  };
});
_config.default.addTransformerToMap(OP_ASSIGN, (left, right, context) => {
  if (!(0, _july.isPlainObject)(left)) {
    if (left == null) {
      left = {};
    } else {
      throw new Error(MSG.VALUE_NOT_OBJECT(_transformerOperators.default.ASSIGN));
    }
  }
  if (!(0, _july.isPlainObject)(right)) {
    throw new Error(MSG.OPERAND_NOT_OBJECT(_transformerOperators.default.ASSIGN));
  }
  const rightValue = (0, _mapValues2.default)(right, (expr, key) => (0, _transform.default)(left[key], typeof expr === 'string' && expr.startsWith('$') ? expr : typeof expr === 'object' ? expr : {
    $set: expr
  }, (0, _config.getChildContext)(context, left, key, left[key])));
  const toRemove = [];
  (0, _each2.default)(rightValue, (value, key) => {
    if (value === undefined) {
      toRemove.push(key);
    }
  });
  const merged = {
    ...left,
    ...rightValue
  };
  return toRemove.length > 0 ? (0, _omit2.default)(merged, toRemove) : merged;
});
_config.default.addTransformerToMap(OP_APPLY, _transform.default);
_config.default.addTransformerToMap(OP_SPLIT, (left, right) => {
  if (typeof left !== 'string') {
    throw new Error(MSG.VALUE_NOT_STRING(_transformerOperators.default.SPLIT));
  }
  if (Array.isArray(right)) {
    if (right.length !== 2) {
      throw new Error(MSG.OPERAND_NOT_TUPLE(_transformerOperators.default.SPLIT));
    }
    const [separator, limit] = right;
    if (typeof separator !== 'string' || limit != null && typeof limit !== 'number') {
      throw new Error(MSG.INVALID_OP_EXPR(_transformerOperators.default.SPLIT, right, ['string', 'number']));
    }
    return left.split(separator, limit);
  } else if (typeof right !== 'string') {
    throw new Error(MSG.OPERAND_NOT_STRING(_transformerOperators.default.SPLIT));
  }
  return left.split(right);
});
_config.default.addTransformerToMap(OP_INTERPOLATE, (left, right) => {
  if (typeof left !== 'string') {
    throw new Error(MSG.VALUE_NOT_STRING(_transformerOperators.default.INTERPOLATE));
  }
  if (right != null && typeof right !== 'object') {
    throw new Error(MSG.OPERAND_NOT_OBJECT(_transformerOperators.default.INTERPOLATE));
  }
  return (0, _july.template)(left, right);
});
var _default = _transform.default;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=transformers.js.map