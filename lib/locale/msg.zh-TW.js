"use strict";

var _config = _interopRequireDefault(require("../config"));

var _validateOperators = _interopRequireDefault(require("../validateOperators"));

var _validationErrors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatName = _config["default"].messages.formatName;
var messages = {
  nameOfValue: function nameOfValue() {
    return '目標值';
  },
  validationErrors: (_validationErrors = {}, _defineProperty(_validationErrors, _validateOperators["default"].EQUAL, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u7684\u503C\u5FC5\u9808\u70BA ").concat(JSON.stringify(right), "\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].NOT_EQUAL, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u7684\u503C\u4E0D\u80FD\u70BA ").concat(JSON.stringify(right), "\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].NOT, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u7684\u503C\u4E0D\u80FD\u70BA ").concat(JSON.stringify(right), "\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].GREATER_THAN, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u7684\u9577\u5EA6\u5FC5\u9808\u5927\u65BC ").concat(right, "\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].GREATER_THAN_OR_EQUAL, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u7684\u9577\u5EA6\u4E0D\u80FD\u5C0F\u65BC ").concat(right, ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].LESS_THAN, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u7684\u9577\u5EA6\u5FC5\u9808\u5C0F\u65BC ").concat(right, "\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].LESS_THAN_OR_EQUAL, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u7684\u9577\u5EA6\u4E0D\u80FD\u8D85\u904E ").concat(right, "\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].IN, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u5FC5\u9808\u70BA ").concat(JSON.stringify(right), " \u5176\u4E2D\u4E4B\u4E00\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].NOT_IN, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u4E0D\u80FD\u70BA ").concat(JSON.stringify(right), " \u5176\u4E2D\u4E4B\u4E00\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].EXISTS, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " ").concat(right ? '不能為空' : '必須為空', "\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].REQUIRED, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u662F\u5FC5\u586B\u9805\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].TYPE, function (name, left, right, context) {
    return "The value of ".concat(formatName(name, left, context), " \u5FC5\u9808\u662F \"").concat(right, "\" \u985E\u578B.");
  }), _defineProperty(_validationErrors, _validateOperators["default"].MATCH, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u5FC5\u9808\u6EFF\u8DB3 ").concat(JSON.stringify(right), "\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].MATCH_ANY, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u4E0D\u80FD\u70BA ").concat(JSON.stringify(right), "\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].ALL_MATCH, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u7684\u6240\u6709\u9805\u4E2D\u81F3\u5C11\u4E00\u500B\u4E0D\u7B26\u5408\u8981\u6C42\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].ANY_ONE_MATCH, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u7684\u6240\u6709\u9805\u4E2D\u6CA1\u6709\u4EFB\u4F55\u4E00\u500B\u7B26\u5408\u8981\u6C42\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].HAS_KEYS, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u5FC5\u9808\u5305\u542B\u9019\u4E9B\u9375 [").concat(Array.isArray(right) ? right.join(', ') : [right], "]\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].START_WITH, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u5FC5\u9808\u4EE5 \"").concat(right, "\" \u958B\u982D\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].END_WITH, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u5FC5\u9808\u4EE5 \"").concat(right, "\" \u7D50\u5C3E\u3002");
  }), _defineProperty(_validationErrors, _validateOperators["default"].SAME_AS, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " \u8207 ").concat(formatName(right), " \u4E0D\u4E00\u6A23\u3002");
  }), _validationErrors)
};

_config["default"].loadMessages(messages);
//# sourceMappingURL=msg.zh-TW.js.map