// JSON Expression Syntax (JES)
const _isEqual = require('lodash/isEqual');
const _isInteger = require('lodash/isInteger');
const _has = require('lodash/has');
const _size = require('lodash/size');
const _reduce = require('lodash/reduce');
const _reverse = require('lodash/reverse');
const _keys = require('lodash/keys');
const _values = require('lodash/values');
const _castArray = require('lodash/castArray');
const _pick = require('lodash/pick');
const _pickBy = require('lodash/pickBy');
const _get = require('lodash/get');
const _set = require('lodash/set');
const _nth = require('lodash/nth');
const _omit = require('lodash/omit');
const _omitBy = require('lodash/omitBy');
const _groupBy = require('lodash/groupBy');
const _sortBy = require('lodash/sortBy');
const _filter = require('lodash/filter');
const _map = require('lodash/map');
const _mapValues = require('lodash/mapValues');
const _find = require('lodash/find');
const _findIndex = require('lodash/findIndex');

const { ValidationError, InvalidArgument } = require('@genx/error');
const { remap, isPlainObject } = require('@genx/july');

const PFX_FOR_EACH = '|>'; // map each
const PFX_WITH_ANY = '|*'; // with any

const config = require('./config');

if (!config.messages) {
    const nothing = require('./locale/msg.en-US');
    nothing(); // just avoid being truncated by bundler
}

const MSG = config.messages;

//Validators
const OP_EQUAL = ['$eq', '$eql', '$equal'];
const OP_NOT_EQUAL = ['$ne', '$neq', '$notEqual'];
const OP_NOT = ['$not'];
const OP_GREATER_THAN = ['$gt', '$>', '$greaterThan'];
const OP_GREATER_THAN_OR_EQUAL = ['$gte', '$>=', '$greaterThanOrEqual'];
const OP_LESS_THAN = ['$lt', '$<', '$lessThan'];
const OP_LESS_THAN_OR_EQUAL = ['$lte', '$<=', '$lessThanOrEqual'];

const OP_IN = ['$in'];
const OP_NOT_IN = ['$nin', '$notIn'];
const OP_EXISTS = ['$exist', '$exists', '$notNull'];
const OP_MATCH = ['$has', '$match', '$all'];
const OP_MATCH_ANY = ['$any', '$or', '$either'];
const OP_TYPE = ['$is', '$typeOf'];
const OP_HAS_KEYS = ['$hasKey', '$hasKeys', '$withKey', '$withKeys'];
const OP_START_WITH = ['$startWith', '$startsWith'];
const OP_END_WITH = ['$endWith', '$endsWith'];

//OP_EVAL

//Query & aggregate processors
const OP_SIZE = ['$size', '$length', '$count'];
const OP_SUM = ['$sum', '$total'];
const OP_KEYS = ['$keys'];
const OP_VALUES = ['$values'];
const OP_GET_TYPE = ['$type'];

//Manipulate processors
const OP_ADD = ['$add', '$plus', '$inc'];
const OP_SUB = ['$sub', '$subtract', '$minus', '$dec'];
const OP_MUL = ['$mul', '$multiply', '$times'];
const OP_DIV = ['$div', '$divide'];
const OP_SET = ['$set', '$=', '$value'];
const OP_ADD_ITEM = ['$addItem', '$override'];
const OP_ASSIGN = ['$assign', '$addFields'];

const OP_PICK = ['$pick'];
const OP_GET_BY_INDEX = ['$at', '$getByIndex', '$nth'];
const OP_GET_BY_KEY = ['$of', '$getByKey'];
const OP_OMIT = ['$omit']; // filter by key
const OP_GROUP = ['$group', '$groupBy'];
const OP_SORT = ['$sort', '$orderBy', '$sortBy'];
const OP_REVERSE = ['$reverse'];
const OP_EVAL = ['$eval', '$apply'];
const OP_MERGE = ['$merge'];
const OP_FILTER = ['$filter', '$select']; // filter by value
const OP_REMAP = ['$remap', '$mapKeys'];
const OP_TO_JSON = ['$json', '$toJSON', '$stringify'];
const OP_TO_OBJ = ['$object', '$parseJSON'];

//Condition processors
const OP_IF = ['$if'];

config.addValidatorToMap(OP_EQUAL, 'OP_EQUAL', (left, right) =>
    _isEqual(left, right)
);
config.addValidatorToMap(
    OP_NOT_EQUAL,
    'OP_NOT_EQUAL',
    (left, right) => !_isEqual(left, right)
);
config.addValidatorToMap(
    OP_NOT,
    'OP_NOT',
    (left, ...args) => !test(left, 'OP_MATCH', ...args)
);
config.addValidatorToMap(
    OP_GREATER_THAN,
    'OP_GREATER_THAN',
    (left, right) => left > right
);
config.addValidatorToMap(
    OP_GREATER_THAN_OR_EQUAL,
    'OP_GREATER_THAN_OR_EQUAL',
    (left, right) => left >= right
);
config.addValidatorToMap(
    OP_LESS_THAN,
    'OP_LESS_THAN',
    (left, right) => left < right
);
config.addValidatorToMap(
    OP_LESS_THAN_OR_EQUAL,
    'OP_LESS_THAN_OR_EQUAL',
    (left, right) => left <= right
);
config.addValidatorToMap(OP_IN, 'OP_IN', (left, right) => {
    if (right == null) return false;
    if (!Array.isArray(right)) {
        throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_IN'));
    }

    const equal = config.getValidator('OP_EQUAL');
    return right.find((element) => equal(left, element));
});
config.addValidatorToMap(OP_NOT_IN, 'OP_NOT_IN', (left, right) => {
    if (right == null) return true;
    if (!Array.isArray(right)) {
        throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_NOT_IN'));
    }

    const notEqual = config.getValidator('OP_NOT_EQUAL');

    return right.every((element) => notEqual(left, element));
});
config.addValidatorToMap(OP_EXISTS, 'OP_EXISTS', (left, right) => {
    if (typeof right !== 'boolean') {
        throw new InvalidArgument(MSG.OPERAND_NOT_BOOL('OP_EXISTS'));
    }

    return right ? left != null : left == null;
});
config.addValidatorToMap(
    OP_MATCH,
    'OP_MATCH',
    (left, right, prefix, context) => {
        if (Array.isArray(right)) {
            return right.every((rule) => {
                const r = match(left, rule, prefix);
                return r[0];
            });
        }

        const r = match(left, right, prefix);
        const matched = r[0];

        if (!matched && context) {
            context.$$ERROR = r[1];
        }

        return matched;
    }
);
config.addValidatorToMap(
    OP_MATCH_ANY,
    'OP_MATCH_ANY',
    (left, right, prefix, context) => {
        if (!Array.isArray(right)) {
            throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_MATCH_ANY'));
        }

        let found = right.find((rule) => {
            const r = match(left, rule, prefix);
            const matched = r[0];

            if (!matched && context) {
                context.$$ERROR = r[1];
            }

            return matched;
        });

        return found ? true : false;
    }
);
config.addValidatorToMap(OP_TYPE, 'OP_TYPE', (left, right) => {
    if (typeof right !== 'string') {
        throw new InvalidArgument(MSG.OPERAND_NOT_STRING('OP_TYPE'));
    }

    right = right.toLowerCase();

    if (right === 'array') {
        return Array.isArray(left);
    }

    if (right === 'integer') {
        return _isInteger(left);
    }

    if (right === 'text') {
        return typeof left === 'string';
    }

    return typeof left === right;
});
config.addValidatorToMap(OP_HAS_KEYS, 'OP_HAS_KEYS', (left, right) => {
    if (typeof left !== 'object') return false;

    return Array.isArray(right)
        ? right.every((key) => _has(left, key))
        : _has(left, right);
});
config.addValidatorToMap(OP_START_WITH, 'OP_START_WITH', (left, right) => {
    if (typeof left !== 'string') return false;
    if (typeof right !== 'string') {
        throw new InvalidArgument(MSG.OPERAND_NOT_STRING('OP_START_WITH'));
    }

    return left.startsWith(right);
});
config.addValidatorToMap(OP_END_WITH, 'OP_END_WITH', (left, right) => {
    if (typeof left !== 'string') return false;
    if (typeof right !== 'string') {
        throw new InvalidArgument(MSG.OPERAND_NOT_STRING('OP_END_WITH'));
    }

    return left.endsWith(right);
});
//embedded processors in validation pipeline
config.addValidatorToMap(OP_EVAL, 'OP_EVAL', (left, right, prefix, context) => {
    if (!Array.isArray(right) || right.length !== 2) {
        throw new InvalidArgument(MSG.OPERAND_NOT_TUPLE('OP_EVAL'));
    }

    const evaluated = evaluateExpr(left, right[0], prefix);

    const r = match(evaluated, right[1], prefix);
    const matched = r[0];

    if (!matched && context) {
        context.$$ERROR = r[1];
    }

    return matched;
});

// [ <op name>, <unary> ]
config.addProcessorToMap(OP_SIZE, 'OP_SIZE', true, (left) => _size(left));
config.addProcessorToMap(OP_SUM, 'OP_SUM', true, (left) =>
    _reduce(
        left,
        (sum, item) => {
            sum += item;
            return sum;
        },
        0
    )
);
config.addProcessorToMap(OP_KEYS, 'OP_KEYS', true, (left) => _keys(left));
config.addProcessorToMap(OP_VALUES, 'OP_VALUES', true, (left) => _values(left));
config.addProcessorToMap(OP_GET_TYPE, 'OP_GET_TYPE', true, (left) =>
    Array.isArray(left) ? 'array' : _isInteger(left) ? 'integer' : typeof left
);
config.addProcessorToMap(OP_REVERSE, 'OP_REVERSE', true, (left) =>
    _reverse(left)
);

config.addProcessorToMap(
    OP_ADD,
    'OP_ADD',
    false,
    (left, right) => left + right
);
config.addProcessorToMap(
    OP_SUB,
    'OP_SUB',
    false,
    (left, right) => left - right
);
config.addProcessorToMap(
    OP_MUL,
    'OP_MUL',
    false,
    (left, right) => left * right
);
config.addProcessorToMap(
    OP_DIV,
    'OP_DIV',
    false,
    (left, right) => left / right
);
config.addProcessorToMap(
    OP_SET,
    'OP_SET',
    false,
    (left, right, prefix, context) =>
        evaluateExpr(undefined, right, prefix, context, true)
);
config.addProcessorToMap(
    OP_ADD_ITEM,
    'OP_ADD_ITEM',
    false,
    (left, right, prefix, context) => {
        if (typeof left !== 'object') {
            throw new InvalidArgument(MSG.VALUE_NOT_COLLECTION('OP_ADD_ITEM'));
        }

        if (Array.isArray(left)) {
            return left.concat(right);
        }

        if (!Array.isArray(right) || right.length !== 2) {
            throw new InvalidArgument(MSG.OPERAND_NOT_TUPLE('OP_ADD_ITEM'));
        }

        return {
            ...left,
            [right[0]]: evaluateExpr(left, right[1], prefix, {
                ...context,
                $$PARENT: context.$$CURRENT,
                $$CURRENT: left,
            }),
        };
    }
);
config.addProcessorToMap(
    OP_ASSIGN,
    'OP_ASSIGN',
    false,
    (left, right, prefix, context) => {
        if (!isPlainObject(left)) {
            if (left == null) {
                left = {};
            } else {
                throw new InvalidArgument(MSG.VALUE_NOT_OBJECT('OP_ASSIGN'));
            }
        }

        if (!isPlainObject(right)) {
            throw new InvalidArgument(MSG.OPERAND_NOT_OBJECT('OP_ASSIGN'));
        }

        const rightValue = _mapValues(right, (expr, key) =>
            evaluateExpr(left[key], expr, MSG.formatPrefix(key, prefix), {
                ...context,
                $$PARENT: left,
                $$CURRENT: left[key],
            })
        );

        return { ...left, ...rightValue };
    }
);
config.addProcessorToMap(OP_PICK, 'OP_PICK', false, (left, right, prefix) => {
    if (left == null) return null;

    if (typeof right !== 'object') {
        right = _castArray(right);
    }

    if (Array.isArray(right)) {
        return _pick(left, right);
    }

    return _pickBy(
        left,
        (x, key) => match(key, right, MSG.formatPrefix(key, prefix))[0]
    );
});
config.addProcessorToMap(
    OP_GET_BY_INDEX,
    'OP_GET_BY_INDEX',
    false,
    (left, right) => _nth(left, right)
);
config.addProcessorToMap(OP_GET_BY_KEY, 'OP_GET_BY_KEY', false, (left, right) =>
    _get(left, right)
);
config.addProcessorToMap(OP_OMIT, 'OP_OMIT', false, (left, right, prefix) => {
    if (left == null) return null;

    if (typeof right !== 'object') {
        right = _castArray(right);
    }

    if (Array.isArray(right)) {
        return _omit(left, right);
    }

    return _omitBy(
        left,
        (x, key) => match(key, right, MSG.formatPrefix(key, prefix))[0]
    );
});
config.addProcessorToMap(OP_GROUP, 'OP_GROUP', false, (left, right) =>
    _groupBy(left, right)
);
config.addProcessorToMap(OP_SORT, 'OP_SORT', false, (left, right) =>
    _sortBy(left, right)
);
config.addProcessorToMap(OP_EVAL, 'OP_EVAL', false, evaluateExpr);
config.addProcessorToMap(
    OP_MERGE,
    'OP_MERGE',
    false,
    (left, right, prefix, context) => {
        if (!Array.isArray(right)) {
            throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_MERGE'));
        }

        return right.reduce(
            (result, expr, key) =>
                Object.assign(
                    result,
                    evaluateExpr(left, expr, MSG.formatPrefix(key, prefix), {
                        ...context,
                    })
                ),
            {}
        );
    }
);
config.addProcessorToMap(OP_FILTER, 'OP_FILTER', false, (
    left,
    right,
    prefix /*, context*/
) => {
    if (left == null) return null;

    if (typeof left !== 'object') {
        throw new InvalidArgument(MSG.VALUE_NOT_COLLECTION('OP_FILTER'));
    }

    return _filter(left, (value, key) =>
        test(value, 'OP_MATCH', right, MSG.formatPrefix(key, prefix))
    );
});
config.addProcessorToMap(OP_REMAP, 'OP_REMAP', false, (
    left,
    right /*, prefix, context*/
) => {
    if (left == null) return null;

    if (typeof left !== 'object') {
        throw new InvalidArgument(MSG.VALUE_NOT_COLLECTION('OP_REMAP'));
    }

    if (Array.isArray(right)) {
        if (right.length !== 2) {
            throw new InvalidArgument(MSG.OPERAND_NOT_TUPLE('OP_REMAP'));
        }

        return remap(left, right[0], right[1]);
    }

    if (!isPlainObject(right)) {
        throw new InvalidArgument(MSG.OPERAND_NOT_OBJECT('OP_REMAP'));
    }

    return remap(left, right);
});
config.addProcessorToMap(
    OP_IF,
    'OP_IF',
    false,
    (left, right, prefix, context) => {
        if (!Array.isArray(right)) {
            throw new InvalidArgument(MSG.OPERAND_NOT_ARRAY('OP_IF'));
        }

        if (right.length < 2 || right.length > 3) {
            throw new InvalidArgument(MSG.OPERAND_NOT_TUPLE_2_OR_3('OP_IF'));
        }

        const condition = evaluateExpr(
            undefined,
            right[0],
            prefix,
            context,
            true
        );

        if (test(left, 'OP_MATCH', condition, prefix)) {
            return evaluateExpr(left, right[1], prefix, context);
        } else if (right.length > 2) {
            const ret = evaluateExpr(left, right[2], prefix, context);
            return ret;
        }

        return left;
    }
);
//embeded validators in processing pipeline
config.addProcessorToMap(OP_MATCH, 'OP_MATCH', false, (left, right, prefix) => {
    return test(left, 'OP_MATCH', right, prefix);
});

config.addProcessorToMap(OP_TO_JSON, 'OP_TO_JSON', true, (left) =>
    left == null ? left : JSON.stringify(left)
);
config.addProcessorToMap(OP_TO_OBJ, 'OP_TO_OBJ', true, (left) =>
    left == null ? left : JSON.parse(left)
);

function getUnmatchedExplanation(
    op,
    name,
    leftValue,
    rightValue,
    prefix,
    context
) {
    if (context && context.$$ERROR) return context.$$ERROR;

    const getter = MSG.validationErrors[op] || MSG.validationErrors.OP_MATCH;
    return getter(name, leftValue, rightValue, prefix);
}

function test(value, tag, opValue, prefix, context) {
    const handler = config.getValidator(tag);

    if (!handler) {
        throw new InvalidArgument(MSG.INVALID_VALIDATOR_HANDLER(tag));
    }

    return handler(value, opValue, prefix, context);
}

function evaluate(value, tag, opValue, prefix, context) {
    const handler = config.getProcessor(tag);

    if (!handler) {
        throw new InvalidArgument(MSG.INVALID_PROCESSOR_HANDLER(tag));
    }

    return handler(value, opValue, prefix, context);
}

function evaluateUnary(value, tag, prefix, context) {
    const handler = config.getProcessor(tag);

    if (!handler) {
        throw new InvalidArgument(MSG.INVALID_PROCESSOR_HANDLER(tag));
    }

    return handler(value, prefix, context);
}

function evaluateByOpMeta(currentValue, rightValue, opMeta, prefix, context) {
    if (opMeta[1]) {
        return rightValue
            ? evaluateUnary(currentValue, opMeta[0], prefix)
            : currentValue;
    }

    return evaluate(currentValue, opMeta[0], rightValue, prefix, context);
}

function validateCollection(
    actual,
    collectionOp,
    op,
    expectedFieldValue,
    prefix
) {
    const context = {};

    switch (collectionOp) {
        case PFX_FOR_EACH: {
            const unmatchedKey = _findIndex(
                actual,
                (item) => !test(item, op, expectedFieldValue, prefix, context)
            );

            if (unmatchedKey !== -1) {
                return [
                    false,
                    getUnmatchedExplanation(
                        op,
                        unmatchedKey,
                        actual[unmatchedKey],
                        expectedFieldValue,
                        prefix,
                        context
                    ),
                ];
            }
            break;
        }

        case PFX_WITH_ANY: {
            const matched = _find(actual, (item) =>
                test(item, op, expectedFieldValue, prefix, context)
            );

            if (!matched) {
                return [
                    false,
                    getUnmatchedExplanation(
                        op,
                        null,
                        actual,
                        expectedFieldValue,
                        prefix,
                        context
                    ),
                ];
            }
            break;
        }

        default:
            throw new InvalidArgument(MSG.INVALID_COLLECTION_OP(collectionOp));
    }

    return undefined;
}

function evaluateCollection(
    currentValue,
    collectionOp,
    opMeta,
    expectedFieldValue,
    prefix,
    context
) {
    switch (collectionOp) {
        case PFX_FOR_EACH:
            return (Array.isArray(currentValue)
                ? _map
                : _mapValues)(currentValue, (item, i) =>
                evaluateByOpMeta(
                    item,
                    expectedFieldValue,
                    opMeta,
                    MSG.formatPrefix(i, prefix),
                    { ...context, $$PARENT: currentValue, $$CURRENT: item }
                )
            );

        default:
            throw new InvalidArgument(MSG.INVALID_COLLECTION_OP(collectionOp));
    }
}

/**
 * Validate the given object with JSON Expression Syntax (JES)
 * @param {*} actual - The object to match
 * @param {*} expected - Expected state in JSON Expression Syntax
 * @param {*} prefix - Tracking path
 *
 * { key: { $match } }
 */
function match(actual, expected, prefix) {
    let passObjectCheck = false;

    if (!isPlainObject(expected)) {
        if (!test(actual, 'OP_EQUAL', expected, prefix)) {
            return [
                false,
                MSG.validationErrors.OP_EQUAL(null, actual, expected, prefix),
            ];
        }

        return [true];
    }

    for (let fieldName in expected) {
        let expectedFieldValue = expected[fieldName];

        const l = fieldName.length;

        if (l > 1) {
            if (l > 3 && fieldName[0] === '|' && fieldName[2] === '$') {
                //validators
                const collectionOp = fieldName.substr(0, 2);
                fieldName = fieldName.substr(2);

                const op = config.getValidatorTag(fieldName);
                if (!op) {
                    throw new InvalidArgument(
                        MSG.INVALID_VALIDATION_OP(fieldName)
                    );
                }

                const matchResult = validateCollection(
                    actual,
                    collectionOp,
                    op,
                    expectedFieldValue,
                    prefix
                );
                if (matchResult) return matchResult;
                continue;
            }

            if (fieldName[0] === '$') {
                //validator
                const op = config.getValidatorTag(fieldName);
                if (!op) {
                    throw new InvalidArgument(
                        MSG.INVALID_VALIDATION_OP(fieldName)
                    );
                }

                const context = {};

                if (!test(actual, op, expectedFieldValue, prefix, context)) {
                    return [
                        false,
                        getUnmatchedExplanation(
                            op,
                            null,
                            actual,
                            expectedFieldValue,
                            prefix,
                            context
                        ),
                    ];
                }

                continue;
            }
        }

        if (!passObjectCheck) {
            if (actual == null)
                return [
                    false,
                    MSG.validationErrors.OP_EXISTS(null, null, true, prefix),
                ];

            const actualType = typeof actual;

            if (actualType !== 'object')
                return [
                    false,
                    MSG.validationErrors.OP_TYPE(
                        null,
                        actualType,
                        'object',
                        prefix
                    ),
                ];
        }

        passObjectCheck = true;

        let actualFieldValue = _get(actual, fieldName);

        if (
            expectedFieldValue != null &&
            typeof expectedFieldValue === 'object'
        ) {
            const [ok, reason] = match(
                actualFieldValue,
                expectedFieldValue,
                MSG.formatPrefix(fieldName, prefix)
            );
            if (!ok) {
                return [false, reason];
            }
        } else {
            if (
                !test(actualFieldValue, 'OP_EQUAL', expectedFieldValue, prefix)
            ) {
                return [
                    false,
                    MSG.validationErrors.OP_EQUAL(
                        fieldName,
                        actualFieldValue,
                        expectedFieldValue,
                        prefix
                    ),
                ];
            }
        }
    }

    return [true];
}

/**
 * If $ operator used, only one a time is allowed
 * e.g.
 * {
 *    $groupBy: 'key'
 * }
 *
 *
 * @param {*} currentValue
 * @param {*} expr
 * @param {*} prefix
 * @param {*} context
 * @param {boolean} setOp - Whether the expression is a setOp
 */
function evaluateExpr(currentValue, expr, prefix, context, setOp) {
    if (Array.isArray(expr)) {
        if (setOp) {
            return expr.map((item) =>
                evaluateExpr(undefined, item, prefix, { ...context }, true)
            );
        }

        return expr.reduce(
            (result, exprItem) =>
                evaluateExpr(result, exprItem, prefix, { ...context }),
            currentValue
        );
    }

    const typeExpr = typeof expr;

    if (typeExpr === 'boolean') {
        if (setOp) return expr;
        return expr ? currentValue : undefined;
    }

    if (typeExpr === 'number' || typeExpr === 'bigint') {
        if (setOp) return expr;

        throw new InvalidArgument(MSG.SYNTAX_NUMBER_AS_EXPR);
    }

    if (typeExpr === 'string') {
        if (expr.startsWith('$$')) {
            //get from context
            const pos = expr.indexOf('.');
            if (pos === -1) {
                return context[expr];
            }

            return _get(context[expr.substr(0, pos)], expr.substr(pos + 1));
        }

        if (setOp) {
            return expr;
        }

        const opMeta = config.getProcessorTagAndType(expr);
        if (!opMeta) {
            throw new InvalidArgument(MSG.INVALID_PROCESSING_OP(expr));
        }

        if (!opMeta[1]) {
            throw new InvalidArgument(MSG.REQUIRE_RIGHT_OPERAND(expr));
        }

        return evaluateUnary(currentValue, opMeta[0], prefix);
    }

    if (typeExpr !== 'object') {
        throw new InvalidArgument(MSG.SYNTAX_INVALID_EXPR);
    }

    if (setOp) {
        return _mapValues(expr, (item) =>
            evaluateExpr(undefined, item, prefix, context, true)
        );
    }

    if (context == null) {
        context = {
            $$ROOT: currentValue,
            $$PARENT: null,
            $$CURRENT: currentValue,
        };
    }

    let result,
        hasOperator = false;

    for (let fieldName in expr) {
        let expectedFieldValue = expr[fieldName];

        const l = fieldName.length;

        if (l > 1) {
            if (fieldName[0] === '$') {
                if (result) {
                    throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
                }

                const opMeta = config.getProcessorTagAndType(fieldName);
                if (!opMeta) {
                    throw new InvalidArgument(
                        MSG.INVALID_PROCESSING_OP(fieldName)
                    );
                }

                if (hasOperator) {
                    throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
                }

                result = evaluateByOpMeta(
                    currentValue,
                    expectedFieldValue,
                    opMeta,
                    prefix,
                    context
                );
                hasOperator = true;
                continue;
            }

            if (l > 3 && fieldName[0] === '|' && fieldName[2] === '$') {
                if (result) {
                    throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
                }

                const collectionOp = fieldName.substr(0, 2);
                fieldName = fieldName.substr(2);

                const opMeta = config.getProcessorTagAndType(fieldName);
                if (!opMeta) {
                    throw new InvalidArgument(
                        MSG.INVALID_PROCESSING_OP(fieldName)
                    );
                }

                if (hasOperator) {
                    throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
                }

                result = evaluateCollection(
                    currentValue,
                    collectionOp,
                    opMeta,
                    expectedFieldValue,
                    prefix,
                    context
                );
                hasOperator = true;
                continue;
            }
        }

        if (hasOperator) {
            throw new InvalidArgument(MSG.SYNTAX_OP_NOT_ALONE);
        }

        let compleyKey = fieldName.indexOf('.') !== -1;

        //pick a field and then apply manipulation
        let actualFieldValue =
            currentValue != null
                ? compleyKey
                    ? _get(currentValue, fieldName)
                    : currentValue[fieldName]
                : undefined;

        const childFieldValue = evaluateExpr(
            actualFieldValue,
            expectedFieldValue,
            MSG.formatPrefix(fieldName, prefix),
            context
        );

        if (typeof childFieldValue !== 'undefined') {
            result == null && (result = {});
            if (compleyKey) {
                _set(result, fieldName, childFieldValue);
            } else {
                result[fieldName] = childFieldValue;
            }
        }
    }

    return result;
}

/**
 * JSON Expression Syntax Object
 * @class
 */
class JES {
    static config = config;
    static match = match;
    static evaluate = evaluateExpr;

    /**
     * @param {object} value
     */
    constructor(value) {
        this.value = value;
    }

    /**
     * Match the value with expected conditions in JSON expression
     * @param {object} expected - JSON match expression
     * @throws ValidationError
     * @returns {JES}
     */
    match(expected) {
        const result = match(this.value, expected);
        if (result[0]) return this;

        throw new ValidationError(result[1], {
            actual: this.value,
            expected,
        });
    }

    /**
     * Evaluate a JSON expression against the value
     * @param {object} - JSON operation expression
     */
    evaluate(expr) {
        return evaluateExpr(this.value, expr);
    }

    /**
     * Evaluate a JSON expression against the value and update the value
     * @param {object} - JSON operation expression
     * @returns {JES}
     */
    update(expr) {
        this.value = evaluateExpr(this.value, expr);
        return this;
    }
}

module.exports = JES;
