"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//Query & aggregate operators (pure)
var SIZE = 'Size Of';
var SUM = 'Sum Of';
var GET_TYPE = 'Type Of';
var MATCH = 'Validate';
var GET_BY_INDEX = 'Get Value By Index';
var GET_BY_KEY = 'Get Value By Key';
var FIND = 'Get Index Or Key Of';
var IF = 'If Else'; //Type casting operators (pure)

var CAST_ARRAY = 'Cast To Array'; //Math operators (pure)

var ADD = 'Add';
var SUB = 'Subtract';
var MUL = 'Multiply';
var DIV = 'Divide';
var MOD = 'Remainder'; //Collection operators (pure)

var KEYS = 'Keys Of';
var VALUES = 'Values Of';
var ENTRIES = 'Entries Of';
var OBJ_TO_ARRAY = 'Object To Array'; // like $objectToArray of mongodb

var PICK = 'Pick By'; // filter by key

var OMIT = 'Omit By';
var SLICE = 'Slice'; // limit offset, count

var GROUP = 'Group By';
var SORT = 'Order By';
var REVERSE = 'Reverse';
var JOIN = 'Join';
var MERGE = 'Merge';
var FILTER = 'Filter By'; // filter by value

var REMAP = 'Map Keys'; // map a key to another name

var TO_JSON = 'JSON Stringfy';
var TO_OBJ = 'JSON Parse'; //Value updater (pure, copy on write)

var SET = 'Set Value';
var ADD_ITEM = 'Add K-V Entry';
var ASSIGN = 'Assign';
var APPLY = 'Apply Transformation';
var INTERPOLATE = 'Interpolate'; //Colllection modifier

var MAP = 'Map';
var REDUCE = 'Reduce';
var _default = {
  SIZE: SIZE,
  SUM: SUM,
  GET_TYPE: GET_TYPE,
  MATCH: MATCH,
  GET_BY_INDEX: GET_BY_INDEX,
  GET_BY_KEY: GET_BY_KEY,
  FIND: FIND,
  IF: IF,
  CAST_ARRAY: CAST_ARRAY,
  ADD: ADD,
  SUB: SUB,
  MUL: MUL,
  DIV: DIV,
  MOD: MOD,
  KEYS: KEYS,
  VALUES: VALUES,
  ENTRIES: ENTRIES,
  OBJ_TO_ARRAY: OBJ_TO_ARRAY,
  PICK: PICK,
  // filter by key
  OMIT: OMIT,
  SLICE: SLICE,
  GROUP: GROUP,
  SORT: SORT,
  REVERSE: REVERSE,
  JOIN: JOIN,
  MERGE: MERGE,
  FILTER: FILTER,
  // filter by value
  REMAP: REMAP,
  // map a key to another name
  TO_JSON: TO_JSON,
  TO_OBJ: TO_OBJ,
  SET: SET,
  ADD_ITEM: ADD_ITEM,
  ASSIGN: ASSIGN,
  APPLY: APPLY,
  INTERPOLATE: INTERPOLATE,
  MAP: MAP,
  REDUCE: REDUCE
};
exports["default"] = _default;
//# sourceMappingURL=transformerOperators.js.map