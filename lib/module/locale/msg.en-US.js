"use strict";

var config = require('../config');

var formatName = function formatName(name, prefix) {
  var fullName = name == null ? prefix : formatPrefix(name, prefix);
  return fullName == null ? 'The value' : fullName.indexOf('(') !== -1 ? "The query \"?.".concat(fullName, "\"") : "\"".concat(fullName, "\"");
};

var formatKey = function formatKey(key, hasPrefix) {
  return Number.isInteger(key) ? "[".concat(key, "]") : hasPrefix ? '.' + key : key;
};

var formatPrefix = function formatPrefix(key, prefix) {
  return prefix != null ? "".concat(prefix).concat(formatKey(key, true)) : formatKey(key, false);
};

var messages = {
  formatName: formatName,
  formatKey: formatKey,
  formatPrefix: formatPrefix
}; //Exception messages

messages.SYNTAX_OP_NOT_ALONE = 'Processing operator can only be used alone in one pipeline stage.';
messages.SYNTAX_INVALID_EXPR = 'Invalid expression syntax.';
messages.SYNTAX_NUMBER_AS_EXPR = 'Number value cannot be used as a processor expression.';

messages.INVALID_PROCESSING_OP = function (op) {
  return "Invalid processing operator \"".concat(op, "\".");
};

messages.INVALID_VALIDATION_OP = function (op) {
  return "Invalid validation operator \"".concat(op, "\".");
};

messages.INVALID_COLLECTION_OP = function (op) {
  return "Invalid collection operator \"".concat(op, "\".");
};

messages.INVALID_PROCESSOR_HANDLER = function (tag) {
  return "Handler for processor \"".concat(tag, "\" not found.");
};

messages.INVALID_TEST_HANLDER = function (tag) {
  return "Handler for validator \"".concat(tag, "\" not found.");
};

messages.OPERAND_NOT_TUPLE = function (op) {
  return "The right operand of a collection operator ".concat(op ? '"' + op + '" ' : '', "must be a two-tuple.");
};

messages.OPERAND_NOT_TUPLE_2_OR_3 = function (op) {
  return "The right operand of a \"".concat(op, "\" operator must be either a 2-tuple or a 3-tuple.");
};

messages.OPERAND_NOT_ARRAY = function (op) {
  return "The right operand of a \"".concat(op, "\" operator must be an array.");
};

messages.OPERAND_NOT_BOOL = function (op) {
  return "The right operand of a \"".concat(op, "\" operator must be a boolean value.");
};

messages.OPERAND_NOT_STRING = function (op) {
  return "The right operand of a \"".concat(op, "\" operator must be a string.");
};

messages.OPERAND_NOT_OBJECT = function (op) {
  return "The right operand of a \"".concat(op, "\" operator must be an object.");
};

messages.VALUE_NOT_COLLECTION = function (op) {
  return "The value to take a \"".concat(op, "\" operator must be either an object or an array.");
};

messages.VALUE_NOT_OBJECT = function (op) {
  return "The value to take a \"".concat(op, "\" operator must be an object.");
};

messages.REQUIRE_RIGHT_OPERAND = function (op) {
  return "Binary query operator \"".concat(op, "\" requires the right operand.");
};

messages.validationErrors = {
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
    return "".concat(formatName(name, prefix), " should have all of these keys [").concat(Array.isArray(right) ? right.join(', ') : [right], "].");
  },
  OP_START_WITH: function OP_START_WITH(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should start with \"").concat(right, "\".");
  },
  OP_END_WITH: function OP_END_WITH(name, left, right, prefix) {
    return "".concat(formatName(name, prefix), " should end with \"").concat(right, "\".");
  }
};
config.loadMessages(messages);

module.exports = function () {};
//# sourceMappingURL=msg.en-US.js.map