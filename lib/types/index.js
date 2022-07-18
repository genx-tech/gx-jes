"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _each2 = _interopRequireDefault(require("lodash/each"));

var _array = _interopRequireDefault(require("./array"));

var _boolean = _interopRequireDefault(require("./boolean"));

var _datetime = _interopRequireDefault(require("./datetime"));

var _integer = _interopRequireDefault(require("./integer"));

var _number = _interopRequireDefault(require("./number"));

var _object = _interopRequireDefault(require("./object"));

var _text = _interopRequireDefault(require("./text"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var types = {
  ARRAY: _array["default"],
  BOOLEAN: _boolean["default"],
  DATETIME: _datetime["default"],
  INTEGER: _integer["default"],
  NUMBER: _number["default"],
  OBJECT: _object["default"],
  TEXT: _text["default"]
};

var Types = _objectSpread(_objectSpread({}, types), {}, {
  Builtin: new Set()
});

var addType = function addType(name, type) {
  if (Types.Builtin.has(type)) {
    throw new Error("Type name or alias \"".concat(name, "\" has been used."));
  }

  Types[name] = type;
  Types.Builtin.add(name);
};

(0, _each2["default"])(types, function (type) {
  addType(type.name, type);
  type.alias && type.alias.forEach(function (a) {
    return addType(a, type);
  });
});
var _default = Types;
exports["default"] = _default;
//# sourceMappingURL=index.js.map