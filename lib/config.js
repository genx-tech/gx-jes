"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messages = exports.getChildContext = exports["default"] = void 0;

var _process;

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var validatorHandlers = {};
var mapOfValidators = {};
var transformerHandlers = {};
var mapOfTransformers = {};

var formatName = function formatName(name, left, context, custom) {
  var fullName = name == null ? context.path : makePath(name, context === null || context === void 0 ? void 0 : context.path);
  return fullName == null ? messages.nameOfValue(custom) : context !== null && context !== void 0 && context.mapOfNames ? context.mapOfNames[fullName] : fullName;
};

var formatKey = function formatKey(key, hasPrefix) {
  return Number.isInteger(key) ? "[".concat(key, "]") : hasPrefix ? '.' + key : key;
};

var makePath = function makePath(key, prefix) {
  return prefix != null ? "".concat(prefix).concat(formatKey(key, true)) : formatKey(key, false);
};

var formatPath = function formatPath(prefix) {
  return prefix ? '[' + prefix + ']' : '<ROOT>';
};

var getChildContext = function getChildContext(context, currentValue, childKey, childValue) {
  return _objectSpread(_objectSpread({}, context), {}, {
    path: makePath(childKey, context.path),
    $$PARENT: currentValue,
    $$CURRENT: childValue,
    $$KEY: childKey
  });
};

exports.getChildContext = getChildContext;
var messages = {
  formatName: formatName,
  formatKey: formatKey,
  makePath: makePath,
  //Exception messages
  SYNTAX_OP_NOT_ALONE: 'Transformer operator can only be used alone in one pipeline stage.',
  SYNTAX_INVALID_EXPR: function SYNTAX_INVALID_EXPR(expr) {
    return "Invalid expression syntax: ".concat(JSON.stringify(expr));
  },
  // complext expr, not split out operator yet
  SYNTAX_INVALID_OP: function SYNTAX_INVALID_OP(op, prefix) {
    return "Invalid operator \"".concat(op, "\" at ").concat(formatPath(prefix), ".");
  },
  SYNTAX_NUMBER_AS_EXPR: 'Number value cannot be used as a transformer expression.',
  INVALID_TRANSFORMER_OP: function INVALID_TRANSFORMER_OP(op) {
    return "Invalid transformer operator \"".concat(op, "\".");
  },
  UNSUPPORTED_VALIDATION_OP: function UNSUPPORTED_VALIDATION_OP(op, prefix) {
    return "Unsupported validation operator \"".concat(op, "\" at ").concat(formatPath(prefix), ".");
  },
  INVALID_COLLECTION_OP: function INVALID_COLLECTION_OP(op) {
    return "Invalid collection operator \"".concat(op, "\".");
  },
  INVALID_TRANSFORMER_HANDLER: function INVALID_TRANSFORMER_HANDLER(tag) {
    return "Handler for transformer \"".concat(tag, "\" not found.");
  },
  INVALID_TEST_HANLDER: function INVALID_TEST_HANLDER(tag) {
    return "Handler for validator \"".concat(tag, "\" not found.");
  },
  INVALID_OP_EXPR: function INVALID_OP_EXPR(op, right) {
    return "Invalid \"".concat(op, "\" expression: ").concat(JSON.stringify(right), ".");
  },
  INVALID_COLLECTION_OP_EXPR: function INVALID_COLLECTION_OP_EXPR(collectionOp, op, right) {
    return "Invalid \"".concat(op, "\" expression for collection \"").concat(collectionOp, "\" traversing: ").concat(JSON.stringify(right), ".");
  },
  UNSUPPORTED_TYPE: function UNSUPPORTED_TYPE(type) {
    return "Supported type \"".concat(type, "\".");
  },
  OPERAND_NOT_TUPLE: function OPERAND_NOT_TUPLE(op) {
    return "The right operand of a collection operator ".concat(op ? '"' + op + '" ' : '', "must be a two-tuple.");
  },
  OPERAND_NOT_TUPLE_2_OR_3: function OPERAND_NOT_TUPLE_2_OR_3(op) {
    return "The right operand of a \"".concat(op, "\" operator must be either a 2-tuple or a 3-tuple.");
  },
  OPERAND_NOT_ARRAY: function OPERAND_NOT_ARRAY(op) {
    return "The right operand of a \"".concat(op, "\" operator must be an array.");
  },
  OPERAND_NOT_BOOL: function OPERAND_NOT_BOOL(op) {
    return "The right operand of a \"".concat(op, "\" operator must be a boolean value.");
  },
  OPERAND_NOT_STRING: function OPERAND_NOT_STRING(op) {
    return "The right operand of a \"".concat(op, "\" operator must be a string.");
  },
  OPERAND_NOT_OBJECT: function OPERAND_NOT_OBJECT(op) {
    return "The right operand of a \"".concat(op, "\" operator must be an object.");
  },
  VALUE_NOT_ARRAY: function VALUE_NOT_ARRAY(op) {
    return "The value to take a \"".concat(op, "\" operator must be an array.");
  },
  VALUE_NOT_COLLECTION: function VALUE_NOT_COLLECTION(op) {
    return "The value to take a \"".concat(op, "\" operator must be either an object or an array.");
  },
  VALUE_NOT_PRIMITIVE: function VALUE_NOT_PRIMITIVE(op) {
    return "The value to take a \"".concat(op, "\" operator must be a primitive value, e.g. string, number.");
  },
  VALUE_NOT_STRING: function VALUE_NOT_STRING(op) {
    return "The value to take a \"".concat(op, "\" operator must be a string.");
  },
  VALUE_NOT_OBJECT: function VALUE_NOT_OBJECT(op) {
    return "The value to take a \"".concat(op, "\" operator must be an object.");
  },
  REQUIRE_RIGHT_OPERAND: function REQUIRE_RIGHT_OPERAND(op) {
    return "Binary operator \"".concat(op, "\" requires a right operand.");
  },
  RIGHT_OPERAND_NOT_EMPTY: function RIGHT_OPERAND_NOT_EMPTY(op) {
    return "Unary operator \"".concat(op, "\" does not require a right operand.");
  },
  MULTI_ERRORS: function MULTI_ERRORS(numErrors) {
    return "".concat(numErrors, " errors occurred.");
  }
}; //JSON Expression Syntax Runtime Configuration

exports.messages = messages;
var config = {
  dump: function dump() {
    console.log(Object.keys(validatorHandlers));
  },
  // eslint-disable-next-line no-undef
  dev: ((_process = process) === null || _process === void 0 ? void 0 : _process.env.NODE_ENV) === 'development',
  messages: messages,
  addValidatorToMap: function addValidatorToMap(tokens, handler) {
    var _tokens = _toArray(tokens),
        tag = _tokens[0],
        alias = _tokens.slice(1);

    alias.forEach(function (op) {
      if (op in mapOfValidators) {
        throw new Error("Duplicate validator alias \"".concat(op, "\" for operator \"").concat(tag, "\"."));
      }

      mapOfValidators[op] = tag;
    });

    if (tag in validatorHandlers) {
      throw new Error("Duplicate operator name \"".concat(tag, "\"."));
    }

    validatorHandlers[tag] = handler;
  },
  addTransformerToMap: function addTransformerToMap(tokens, handler) {
    var _tokens2 = _toArray(tokens),
        tag = _tokens2[0],
        isUnary = _tokens2[1],
        alias = _tokens2.slice(2);

    if (typeof isUnary !== 'boolean') {
      throw new Error('The second param should be a boolean value.');
    }

    alias.forEach(function (op) {
      if (op in mapOfTransformers) {
        throw new Error("Duplicate transformer alias: \"".concat(op, "\" for operator \"").concat(tag, "\"."));
      }

      mapOfTransformers[op] = [tag, isUnary];
    });

    if (tag in transformerHandlers) {
      throw new Error("Duplicate operator name: \"".concat(tag, "\"."));
    }

    transformerHandlers[tag] = handler;
  },
  overrideTransformer: function overrideTransformer(tag, handler) {
    transformerHandlers[tag] = handler;
  },
  overrideValidator: function overrideValidator(tag, handler) {
    validatorHandlers[tag] = handler;
  },
  getValidatorTag: function getValidatorTag(op) {
    return mapOfValidators[op];
  },
  getValidator: function getValidator(tag) {
    return validatorHandlers[tag];
  },
  getTransformerTagAndType: function getTransformerTagAndType(op) {
    return mapOfTransformers[op];
  },
  getTransformer: function getTransformer(tag) {
    return transformerHandlers[tag];
  },
  loadMessages: function loadMessages(moreMessages) {
    return Object.assign(config.messages, moreMessages);
  }
};
var _default = config;
exports["default"] = _default;
//# sourceMappingURL=config.js.map