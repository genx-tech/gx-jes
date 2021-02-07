"use strict";

//Exception messages
exports.OPERATOR_NOT_ALONE = 'Query operator can only be used alone in a stage.';
exports.NOT_A_UNARY_QUERY = 'Only unary query operator is allowed to be used directly in a matching.';
exports.INVALID_EXPR_SYNTAX = 'Invalid expression syntax.';

exports.INVALID_QUERY_OPERATOR = function (op) {
  return "Invalid JES query operator \"".concat(op, "\".");
};

exports.INVALID_TEST_OPERATOR = function (op) {
  return "Invalid JES test operator \"".concat(op, "\".");
};

exports.INVALID_QUERY_HANDLER = function (op) {
  return "JES query operator \"".concat(op, "\" handler not found.");
};

exports.INVALID_TEST_HANLDER = function (op) {
  return "JES test operator \"".concat(op, "\" handler not found.");
};

exports.INVALID_COLLECTION_OP = function (op) {
  return "Invalid collection operator \"".concat(op, "\".");
};

exports.PRX_OP_NOT_FOR_EVAL = function (op) {
  return "Operator prefix \"".concat(op, "\" cannot be used in evaluation.");
};

exports.OPERAND_NOT_TUPLE = function (op) {
  return "The operand of a collection operator ".concat(op ? '"' + op + '" ' : '', "must be a two-tuple.");
};

exports.OPERAND_NOT_TUPLE_2_OR_3 = function (op) {
  return "The operand of a \"".concat(op, "\" operator must be either a 2-tuple or a 3-tuple.");
};

exports.OPERAND_NOT_ARRAY = function (op) {
  return "The operand of a \"".concat(op, "\" operator must be an array.");
};

exports.OPERAND_NOT_BOOL = function (op) {
  return "The operand of a \"".concat(op, "\" operator must be a boolean value.");
};

exports.OPERAND_NOT_STRING = function (op) {
  return "The operand of a \"".concat(op, "\" operator must be a string.");
};

exports.VALUE_NOT_COLLECTION = function (op) {
  return "The value using a \"".concat(op, "\" operator must be either an object or an array.");
};

exports.REQUIRE_RIGHT_OPERAND = function (op) {
  return "Binary query operator \"".concat(op, "\" requires the right operand.");
};

exports.validationErrors = {
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
//# sourceMappingURL=msg.en-US.js.map