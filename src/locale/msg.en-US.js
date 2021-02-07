const config = require('../config');

const formatName = (name, prefix) => {
    const fullName = name == null ? prefix : formatPrefix(name, prefix);
    return fullName == null
        ? 'The value'
        : fullName.indexOf('(') !== -1
        ? `The query "?.${fullName}"`
        : `"${fullName}"`;
};

const formatKey = (key, hasPrefix) =>
    Number.isInteger(key) ? `[${key}]` : hasPrefix ? '.' + key : key;
const formatPrefix = (key, prefix) =>
    prefix != null ? `${prefix}${formatKey(key, true)}` : formatKey(key, false);
const formatMap = (name) => `each(->${name})`;
const formatAny = (name) => `any(->${name})`;

const messages = {
    formatName,
    formatKey,
    formatPrefix,
    formatMap,
    formatAny,
};

//Exception messages
messages.OPERATOR_NOT_ALONE =
    'Query operator can only be used alone in a stage.';
messages.NOT_A_UNARY_QUERY =
    'Only unary query operator is allowed to be used directly in a matching.';
messages.INVALID_EXPR_SYNTAX = 'Invalid expression syntax.';

messages.INVALID_QUERY_OPERATOR = (op) => `Invalid JES query operator "${op}".`;
messages.INVALID_TEST_OPERATOR = (op) => `Invalid JES test operator "${op}".`;
messages.INVALID_QUERY_HANDLER = (op) =>
    `JES query operator "${op}" handler not found.`;
messages.INVALID_TEST_HANLDER = (op) =>
    `JES test operator "${op}" handler not found.`;

messages.INVALID_COLLECTION_OP = (op) => `Invalid collection operator "${op}".`;
messages.PRX_OP_NOT_FOR_EVAL = (op) =>
    `Operator prefix "${op}" cannot be used in evaluation.`;

messages.OPERAND_NOT_TUPLE = (op) =>
    `The operand of a collection operator ${
        op ? '"' + op + '" ' : ''
    }must be a two-tuple.`;
messages.OPERAND_NOT_TUPLE_2_OR_3 = (op) =>
    `The operand of a "${op}" operator must be either a 2-tuple or a 3-tuple.`;
messages.OPERAND_NOT_ARRAY = (op) =>
    `The operand of a "${op}" operator must be an array.`;
messages.OPERAND_NOT_BOOL = (op) =>
    `The operand of a "${op}" operator must be a boolean value.`;
messages.OPERAND_NOT_STRING = (op) =>
    `The operand of a "${op}" operator must be a string.`;

messages.VALUE_NOT_COLLECTION = (op) =>
    `The value using a "${op}" operator must be either an object or an array.`;

messages.REQUIRE_RIGHT_OPERAND = (op) =>
    `Binary query operator "${op}" requires the right operand.`;

messages.queryOperators = {
    //unary
    OP_SIZE: 'size',
    OP_SUM: 'sum',
    OP_KEYS: 'keys',
    OP_VALUES: 'values',
    OP_GET_TYPE: 'get type',
    OP_REVERSE: 'reverse',

    //binary
    OP_ADD: 'add',
    OP_SUB: 'subtract',
    OP_MUL: 'multiply',
    OP_DIV: 'divide',
    OP_SET: 'assign',
    OP_ADD_ITEM: 'addItem',
    OP_PICK: 'pick',
    OP_GET_BY_INDEX: 'get element at index',
    OP_GET_BY_KEY: 'get element of key',
    OP_OMIT: 'omit',
    OP_GROUP: 'groupBy',
    OP_SORT: 'sortBy',
    OP_EVAL: 'evaluate',
    OP_MERGE: 'merge',
    OP_FILTER: 'filter',
    OP_REMAP: 'remap',
    OP_IF: 'evaluate if',
};

messages.validationErrors = {
    OP_EQUAL: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should be ${JSON.stringify(
            right
        )}, but ${JSON.stringify(left)} given.`,
    OP_NOT_EQUAL: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should not be ${JSON.stringify(
            right
        )}, but ${JSON.stringify(left)} given.`,
    OP_NOT: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should not match ${JSON.stringify(
            right
        )}, but ${JSON.stringify(left)} given.`,
    OP_GREATER_THAN: (name, left, right, prefix) =>
        `${formatName(
            name,
            prefix
        )} should be greater than ${right}, but ${JSON.stringify(left)} given.`,
    OP_GREATER_THAN_OR_EQUAL: (name, left, right, prefix) =>
        `${formatName(
            name,
            prefix
        )} should be greater than or equal to ${right}, but ${JSON.stringify(
            left
        )} given.`,
    OP_LESS_THAN: (name, left, right, prefix) =>
        `${formatName(
            name,
            prefix
        )} should be less than ${right}, but ${JSON.stringify(left)} given.`,
    OP_LESS_THAN_OR_EQUAL: (name, left, right, prefix) =>
        `${formatName(
            name,
            prefix
        )} should be less than or equal to ${right}, but ${JSON.stringify(
            left
        )} given.`,
    OP_IN: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should be one of ${JSON.stringify(
            right
        )}, but ${JSON.stringify(left)} given.`,
    OP_NOT_IN: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should not be any one of ${JSON.stringify(
            right
        )}, but ${JSON.stringify(left)} given.`,
    OP_EXISTS: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should${right ? ' not ' : ' '}be NULL.`,
    OP_TYPE: (name, left, right, prefix) =>
        `The type of ${formatName(
            name,
            prefix
        )} should be "${right}", but ${JSON.stringify(left)} given.`,
    OP_MATCH: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should match ${JSON.stringify(
            right
        )}, but ${JSON.stringify(left)} given.`,
    OP_MATCH_ANY: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should match any of ${JSON.stringify(
            right
        )}, but ${JSON.stringify(left)} given.`,
    OP_HAS_KEYS: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should have all of these keys [${
            Array.isArray(right) ? right.join(', ') : [right]
        }].`,
    OP_START_WITH: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should start with "${right}".`,
    OP_END_WITH: (name, left, right, prefix) =>
        `${formatName(name, prefix)} should end with "${right}".`,
};

config.loadMessages(messages);

module.exports = () => {};
