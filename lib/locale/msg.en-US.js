"use strict";

var _config = _interopRequireDefault(require("../config"));

var _validateOperators = _interopRequireDefault(require("../validateOperators"));

var _validationErrors;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var formatName = _config["default"].messages.formatName;
var messages = {
  nameOfValue: function nameOfValue(custom) {
    return custom !== null && custom !== void 0 && custom.lowerCase ? 'the value' : 'The value';
  },
  validationErrors: (_validationErrors = {}, _defineProperty(_validationErrors, _validateOperators["default"].EQUAL, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must be ").concat(JSON.stringify(right), ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].NOT_EQUAL, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must not be ").concat(JSON.stringify(right), ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].NOT, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must not match ").concat(JSON.stringify(right), ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].GREATER_THAN, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must be greater than ").concat(right, ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].GREATER_THAN_OR_EQUAL, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must be greater than or equal to ").concat(right, ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].LESS_THAN, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must be less than ").concat(right, ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].LESS_THAN_OR_EQUAL, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must not exceed ").concat(right, ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].IN, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must be one of ").concat(JSON.stringify(right), ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].NOT_IN, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must not be any one of ").concat(JSON.stringify(right), ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].EXISTS, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " ").concat(right ? 'must not be null' : 'must be null', ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].TYPE, function (name, left, right, context) {
    return "The value of ".concat(formatName(name, left, context), " must be a(n) \"").concat(right, "\".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].MATCH, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must match ").concat(JSON.stringify(right), ".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].MATCH_ANY, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " does not match any of given criterias.");
  }), _defineProperty(_validationErrors, _validateOperators["default"].ALL_MATCH, function (name, left, right, context) {
    return "One of the element of ".concat(formatName(name, left, context, {
      lowerCase: true
    }), " does not match the requirement(s).");
  }), _defineProperty(_validationErrors, _validateOperators["default"].ANY_ONE_MATCH, function (name, left, right, context) {
    return "None of the element of ".concat(formatName(name, left, context, {
      lowerCase: true
    }), " matches the requirement(s).");
  }), _defineProperty(_validationErrors, _validateOperators["default"].HAS_KEYS, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must have all of these keys [").concat(Array.isArray(right) ? right.join(', ') : [right], "].");
  }), _defineProperty(_validationErrors, _validateOperators["default"].START_WITH, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must start with \"").concat(right, "\".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].END_WITH, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " must end with \"").concat(right, "\".");
  }), _defineProperty(_validationErrors, _validateOperators["default"].SAME_AS, function (name, left, right, context) {
    return "".concat(formatName(name, left, context), " does not match ").concat(formatName(right), ".");
  }), _validationErrors)
};

_config["default"].loadMessages(messages);
//# sourceMappingURL=msg.en-US.js.map