"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _each2 = _interopRequireDefault(require("lodash/each"));

var _array = _interopRequireDefault(require("./array"));

var _boolean = _interopRequireDefault(require("./boolean"));

var _datetime = _interopRequireDefault(require("./datetime"));

var _integer = _interopRequireDefault(require("./integer"));

var _number = _interopRequireDefault(require("./number"));

var _object = _interopRequireDefault(require("./object"));

var _text = _interopRequireDefault(require("./text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = {
  ARRAY: _array.default,
  BOOLEAN: _boolean.default,
  DATETIME: _datetime.default,
  INTEGER: _integer.default,
  NUMBER: _number.default,
  OBJECT: _object.default,
  TEXT: _text.default
};
const Types = { ...types,
  Builtin: new Set()
};

const addType = (name, type) => {
  if (Types.Builtin.has(type)) {
    throw new Error(`Type name or alias "${name}" has been used.`);
  }

  Types[name] = type;
  Types.Builtin.add(name);
};

(0, _each2.default)(types, type => {
  addType(type.name, type);
  type.alias && type.alias.forEach(a => addType(a, type));
});
var _default = Types;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map