"use strict";

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const formatName = (name, prefix) => {
  const fullName = name == null ? prefix : formatPrefix(name, prefix);
  return fullName == null ? 'The value' : fullName.indexOf('(') !== -1 ? `The query "?.${fullName}"` : `"${fullName}"`;
};

const formatKey = (key, hasPrefix) => Number.isInteger(key) ? `[${key}]` : hasPrefix ? '.' + key : key;

const formatPrefix = (key, prefix) => prefix != null ? `${prefix}${formatKey(key, true)}` : formatKey(key, false);

const messages = {
  formatName,
  formatKey,
  formatPrefix
}; //Exception messages

messages.SYNTAX_OP_NOT_ALONE = 'Processing operator can only be used alone in one pipeline stage.';
messages.SYNTAX_INVALID_EXPR = 'Invalid expression syntax.';
messages.SYNTAX_NUMBER_AS_EXPR = 'Number value cannot be used as a processor expression.';

messages.INVALID_PROCESSING_OP = op => `Invalid processing operator "${op}".`;

messages.INVALID_VALIDATION_OP = op => `Invalid validation operator "${op}".`;

messages.INVALID_COLLECTION_OP = op => `Invalid collection operator "${op}".`;

messages.INVALID_PROCESSOR_HANDLER = tag => `Handler for processor "${tag}" not found.`;

messages.INVALID_TEST_HANLDER = tag => `Handler for validator "${tag}" not found.`;

messages.OPERAND_NOT_TUPLE = op => `The right operand of a collection operator ${op ? '"' + op + '" ' : ''}must be a two-tuple.`;

messages.OPERAND_NOT_TUPLE_2_OR_3 = op => `The right operand of a "${op}" operator must be either a 2-tuple or a 3-tuple.`;

messages.OPERAND_NOT_ARRAY = op => `The right operand of a "${op}" operator must be an array.`;

messages.OPERAND_NOT_BOOL = op => `The right operand of a "${op}" operator must be a boolean value.`;

messages.OPERAND_NOT_STRING = op => `The right operand of a "${op}" operator must be a string.`;

messages.OPERAND_NOT_OBJECT = op => `The right operand of a "${op}" operator must be an object.`;

messages.VALUE_NOT_COLLECTION = op => `The value to take a "${op}" operator must be either an object or an array.`;

messages.VALUE_NOT_OBJECT = op => `The value to take a "${op}" operator must be an object.`;

messages.REQUIRE_RIGHT_OPERAND = op => `Binary query operator "${op}" requires the right operand.`;

messages.validationErrors = {
  OP_EQUAL: (name, left, right, prefix) => `${formatName(name, prefix)} should be ${JSON.stringify(right)}, but ${JSON.stringify(left)} given.`,
  OP_NOT_EQUAL: (name, left, right, prefix) => `${formatName(name, prefix)} should not be ${JSON.stringify(right)}, but ${JSON.stringify(left)} given.`,
  OP_NOT: (name, left, right, prefix) => `${formatName(name, prefix)} should not match ${JSON.stringify(right)}, but ${JSON.stringify(left)} given.`,
  OP_GREATER_THAN: (name, left, right, prefix) => `${formatName(name, prefix)} should be greater than ${right}, but ${JSON.stringify(left)} given.`,
  OP_GREATER_THAN_OR_EQUAL: (name, left, right, prefix) => `${formatName(name, prefix)} should be greater than or equal to ${right}, but ${JSON.stringify(left)} given.`,
  OP_LESS_THAN: (name, left, right, prefix) => `${formatName(name, prefix)} should be less than ${right}, but ${JSON.stringify(left)} given.`,
  OP_LESS_THAN_OR_EQUAL: (name, left, right, prefix) => `${formatName(name, prefix)} should be less than or equal to ${right}, but ${JSON.stringify(left)} given.`,
  OP_IN: (name, left, right, prefix) => `${formatName(name, prefix)} should be one of ${JSON.stringify(right)}, but ${JSON.stringify(left)} given.`,
  OP_NOT_IN: (name, left, right, prefix) => `${formatName(name, prefix)} should not be any one of ${JSON.stringify(right)}, but ${JSON.stringify(left)} given.`,
  OP_EXISTS: (name, left, right, prefix) => `${formatName(name, prefix)} should${right ? ' not ' : ' '}be NULL.`,
  OP_TYPE: (name, left, right, prefix) => `The type of ${formatName(name, prefix)} should be "${right}", but ${JSON.stringify(left)} given.`,
  OP_MATCH: (name, left, right, prefix) => `${formatName(name, prefix)} should match ${JSON.stringify(right)}, but ${JSON.stringify(left)} given.`,
  OP_MATCH_ANY: (name, left, right, prefix) => `${formatName(name, prefix)} should match any of ${JSON.stringify(right)}, but ${JSON.stringify(left)} given.`,
  OP_HAS_KEYS: (name, left, right, prefix) => `${formatName(name, prefix)} should have all of these keys [${Array.isArray(right) ? right.join(', ') : [right]}].`,
  OP_START_WITH: (name, left, right, prefix) => `${formatName(name, prefix)} should start with "${right}".`,
  OP_END_WITH: (name, left, right, prefix) => `${formatName(name, prefix)} should end with "${right}".`
};

_config.default.loadMessages(messages);
//# sourceMappingURL=msg.en-US.js.map