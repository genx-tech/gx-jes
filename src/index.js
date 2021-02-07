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
const { ValidationError } = require('@genx/error');
const { remap, isPlainObject } = require('@genx/july');

const config = require('./config');

if (!config.messages) {
    const nothing = require('./locale/msg.en-US');
    nothing(); // just avoid being truncated by bundler
}

const MSG = config.messages;

const formatQuery = (opMeta) =>
    `${MSG.queryOperators[opMeta[0]]}(${opMeta[1] ? '' : '?'})`;

//Validation operator
const OP_EQUAL = ['$eq', '$eql', '$equal'];
const OP_NOT_EQUAL = ['$ne', '$neq', '$notEqual'];
const OP_NOT = ['$not'];
const OP_GREATER_THAN = ['$gt', '$>', '$greaterThan'];
const OP_GREATER_THAN_OR_EQUAL = ['$gte', '$<=', '$greaterThanOrEqual'];
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

//Query & aggregate operator
const OP_SIZE = ['$size', '$length', '$count'];
const OP_SUM = ['$sum', '$total'];
const OP_KEYS = ['$keys'];
const OP_VALUES = ['$values'];
const OP_GET_TYPE = ['$type'];

//Manipulate operation
const OP_ADD = ['$add', '$plus', '$inc'];
const OP_SUB = ['$sub', '$subtract', '$minus', '$dec'];
const OP_MUL = ['$mul', '$multiply', '$times'];
const OP_DIV = ['$div', '$divide'];
const OP_SET = ['$set', '$='];
const OP_ADD_ITEM = ['$addItem', '$override'];

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
const OP_REMAP = ['$remap'];

//Condition operation
const OP_IF = ['$if'];

const PFX_FOR_EACH = '|>'; // map each
const PFX_WITH_ANY = '|*'; // with any

const MapOfOps = new Map();
const addOpToMap = (tokens, tag) =>
    tokens.forEach((token) => MapOfOps.set(token, tag));
addOpToMap(OP_EQUAL, 'OP_EQUAL');
addOpToMap(OP_NOT_EQUAL, 'OP_NOT_EQUAL');
addOpToMap(OP_NOT, 'OP_NOT');
addOpToMap(OP_GREATER_THAN, 'OP_GREATER_THAN');
addOpToMap(OP_GREATER_THAN_OR_EQUAL, 'OP_GREATER_THAN_OR_EQUAL');
addOpToMap(OP_LESS_THAN, 'OP_LESS_THAN');
addOpToMap(OP_LESS_THAN_OR_EQUAL, 'OP_LESS_THAN_OR_EQUAL');
addOpToMap(OP_IN, 'OP_IN');
addOpToMap(OP_NOT_IN, 'OP_NOT_IN');
addOpToMap(OP_EXISTS, 'OP_EXISTS');
addOpToMap(OP_MATCH, 'OP_MATCH');
addOpToMap(OP_MATCH_ANY, 'OP_MATCH_ANY');
addOpToMap(OP_TYPE, 'OP_TYPE');
addOpToMap(OP_HAS_KEYS, 'OP_HAS_KEYS');
addOpToMap(OP_START_WITH, 'OP_START_WITH');
addOpToMap(OP_END_WITH, 'OP_END_WITH');

const MapOfMans = new Map();
const addManToMap = (tokens, tag) =>
    tokens.forEach((token) => MapOfMans.set(token, tag));
// [ <op name>, <unary> ]
addManToMap(OP_SIZE, ['OP_SIZE', true]);
addManToMap(OP_SUM, ['OP_SUM', true]);
addManToMap(OP_KEYS, ['OP_KEYS', true]);
addManToMap(OP_VALUES, ['OP_VALUES', true]);
addManToMap(OP_GET_TYPE, ['OP_GET_TYPE', true]);
addManToMap(OP_REVERSE, ['OP_REVERSE', true]);

addManToMap(OP_ADD, ['OP_ADD', false]);
addManToMap(OP_SUB, ['OP_SUB', false]);
addManToMap(OP_MUL, ['OP_MUL', false]);
addManToMap(OP_DIV, ['OP_DIV', false]);
addManToMap(OP_SET, ['OP_SET', false]);
addManToMap(OP_ADD_ITEM, ['OP_ADD_ITEM', false]);
addManToMap(OP_PICK, ['OP_PICK', false]);
addManToMap(OP_GET_BY_INDEX, ['OP_GET_BY_INDEX', false]);
addManToMap(OP_GET_BY_KEY, ['OP_GET_BY_KEY', false]);
addManToMap(OP_OMIT, ['OP_OMIT', false]);
addManToMap(OP_GROUP, ['OP_GROUP', false]);
addManToMap(OP_SORT, ['OP_SORT', false]);
addManToMap(OP_EVAL, ['OP_EVAL', false]);
addManToMap(OP_MERGE, ['OP_MERGE', false]);
addManToMap(OP_FILTER, ['OP_FILTER', false]);
addManToMap(OP_REMAP, ['OP_REMAP', false]);
addManToMap(OP_IF, ['OP_IF', false]);

const defaultJesHandlers = {
    OP_EQUAL: (left, right) => _isEqual(left, right),
    OP_NOT_EQUAL: (left, right) => !_isEqual(left, right),
    OP_NOT: (left, ...args) => !test(left, 'OP_MATCH', ...args),
    OP_GREATER_THAN: (left, right) => left > right,
    OP_GREATER_THAN_OR_EQUAL: (left, right) => left >= right,
    OP_LESS_THAN: (left, right) => left < right,
    OP_LESS_THAN_OR_EQUAL: (left, right) => left <= right,
    OP_IN: (left, right) => {
        if (right == null) return false;
        if (!Array.isArray(right)) {
            throw new Error(MSG.OPERAND_NOT_ARRAY('OP_IN'));
        }

        return right.find((element) =>
            defaultJesHandlers.OP_EQUAL(left, element)
        );
    },
    OP_NOT_IN: (left, right) => {
        if (right == null) return true;
        if (!Array.isArray(right)) {
            throw new Error(MSG.OPERAND_NOT_ARRAY('OP_NOT_IN'));
        }

        return right.every((element) =>
            defaultJesHandlers.OP_NOT_EQUAL(left, element)
        );
    },
    OP_EXISTS: (left, right) => {
        if (typeof right !== 'boolean') {
            throw new Error(MSG.OPERAND_NOT_BOOL('OP_EXISTS'));
        }

        return right ? left != null : left == null;
    },
    OP_TYPE: (left, right) => {
        if (typeof right !== 'string') {
            throw new Error(MSG.OPERAND_NOT_STRING('OP_TYPE'));
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
    },
    OP_MATCH: (left, right, jes, prefix) => {
        if (Array.isArray(right)) {
            return right.every((rule) => {
                const r = match(left, rule, jes, prefix);
                return r[0];
            });
        }

        const r = match(left, right, jes, prefix);
        return r[0];
    },
    OP_MATCH_ANY: (left, right, jes, prefix) => {
        if (!Array.isArray(right)) {
            throw new Error(MSG.OPERAND_NOT_ARRAY('OP_MATCH_ANY'));
        }

        let found = right.find((rule) => {
            const r = match(left, rule, jes, prefix);
            return r[0];
        });

        return found ? true : false;
    },
    OP_HAS_KEYS: (left, right) => {
        if (typeof left !== 'object') return false;

        return Array.isArray(right)
            ? right.every((key) => _has(left, key))
            : _has(left, right);
    },
    OP_START_WITH: (left, right) => {
        if (typeof left !== 'string') return false;
        if (typeof right !== 'string') {
            throw new Error(MSG.OPERAND_NOT_STRING('OP_START_WITH'));
        }

        return left.startsWith(right);
    },
    OP_END_WITH: (left, right) => {
        if (typeof left !== 'string') return false;
        if (typeof right !== 'string') {
            throw new Error(MSG.OPERAND_NOT_STRING('OP_END_WITH'));
        }

        return left.endsWith(right);
    },
};

const defaultManipulations = {
    //unary
    OP_SIZE: (left) => _size(left),
    OP_SUM: (left) =>
        _reduce(
            left,
            (sum, item) => {
                sum += item;
                return sum;
            },
            0
        ),

    OP_KEYS: (left) => _keys(left),
    OP_VALUES: (left) => _values(left),
    OP_GET_TYPE: (left) =>
        Array.isArray(left)
            ? 'array'
            : _isInteger(left)
            ? 'integer'
            : typeof left,
    OP_REVERSE: (left) => _reverse(left),

    //binary
    OP_ADD: (left, right) => left + right,
    OP_SUB: (left, right) => left - right,
    OP_MUL: (left, right) => left * right,
    OP_DIV: (left, right) => left / right,
    OP_SET: (left, right, jes, prefix, context) =>
        evaluateExpr(undefined, right, jes, prefix, context, true),
    OP_ADD_ITEM: (left, right, jes, prefix, context) => {
        if (typeof left !== 'object') {
            throw new ValidationError(MSG.VALUE_NOT_COLLECTION('OP_ADD_ITEM'));
        }

        if (Array.isArray(left)) {
            return left.concat(right);
        }

        if (!Array.isArray(right) || right.length !== 2) {
            throw new Error(MSG.OPERAND_NOT_TUPLE('OP_ADD_ITEM'));
        }

        return {
            ...left,
            [right[0]]: evaluateExpr(left, right[1], jes, prefix, {
                ...context,
                $$PARENT: context.$$CURRENT,
                $$CURRENT: left,
            }),
        };
    },
    OP_PICK: (left, right, jes, prefix) => {
        if (left == null) return null;

        if (typeof right !== 'object') {
            right = _castArray(right);
        }

        if (Array.isArray(right)) {
            return _pick(left, right);
        }

        return _pickBy(
            left,
            (x, key) => match(key, right, jes, MSG.formatPrefix(key, prefix))[0]
        );
    },
    OP_GET_BY_INDEX: (left, right) => _nth(left, right),
    OP_GET_BY_KEY: (left, right) => _get(left, right),
    OP_OMIT: (left, right, jes, prefix) => {
        if (left == null) return null;

        if (typeof right !== 'object') {
            right = _castArray(right);
        }

        if (Array.isArray(right)) {
            return _omit(left, right);
        }

        return _omitBy(
            left,
            (x, key) => match(key, right, jes, MSG.formatPrefix(key, prefix))[0]
        );
    },
    OP_GROUP: (left, right) => _groupBy(left, right),
    OP_SORT: (left, right) => _sortBy(left, right),
    OP_EVAL: evaluateExpr,
    OP_MERGE: (left, right, jes, prefix, context) => {
        if (!Array.isArray(right)) {
            throw new Error(MSG.OPERAND_NOT_ARRAY('OP_MERGE'));
        }

        return right.reduce(
            (result, expr, key) =>
                Object.assign(
                    result,
                    evaluateExpr(left, expr, jes, MSG.formatPrefix(key, prefix), {
                        ...context,
                    })
                ),
            {}
        );
    },
    OP_FILTER: (left, right, jes, prefix/*, context*/) => {
        if (left == null) return null;

        if (typeof left !== 'object') {
            throw new ValidationError(MSG.VALUE_NOT_COLLECTION('OP_FILTER'));
        }

        return _filter(left, (value, key) =>
            test(value, 'OP_MATCH', right, jes, MSG.formatPrefix(key, prefix))
        );
    },
    OP_REMAP: (left, right/*, jes, prefix, context*/) => {
        if (left == null) return null;

        if (typeof left !== 'object') {
            throw new ValidationError(MSG.VALUE_NOT_COLLECTION('OP_REMAP'));
        }

        return remap(left, right);
    },
    OP_IF: (left, right, jes, prefix, context) => {
        if (!Array.isArray(right)) {
            throw new Error(MSG.OPERAND_NOT_ARRAY('OP_IF'));
        }

        if (right.length < 2 || right.length > 3) {
            throw new Error(MSG.OPERAND_NOT_TUPLE_2_OR_3('OP_IF'));
        }

        const condition = evaluateExpr(
            undefined,
            right[0],
            jes,
            prefix,
            context,
            true
        );

        if (test(left, 'OP_MATCH', condition, jes, prefix)) {
            return evaluateExpr(left, right[1], jes, prefix, context);
        } else if (right.length > 2) {
            const ret = evaluateExpr(left, right[2], jes, prefix, context);
            return ret;
        }

        return left;
    },
};

function getUnmatchedExplanation(jes, op, name, leftValue, rightValue, prefix) {
    const getter =
        jes.operatorExplanations[op] || jes.operatorExplanations.OP_MATCH;
    return getter(name, leftValue, rightValue, prefix);
}

function test(value, op, opValue, jes, prefix) {
    const handler = jes.operatorHandlers[op];

    if (!handler) {
        throw new Error(MSG.INVALID_TEST_HANLDER(op));
    }

    return handler(value, opValue, jes, prefix);
}

function evaluate(value, op, opValue, jes, prefix, context) {
    const handler = jes.queryHanlders[op];

    if (!handler) {
        throw new Error(MSG.INVALID_QUERY_HANDLER(op));
    }

    return handler(value, opValue, jes, prefix, context);
}

function evaluateUnary(value, op, jes, prefix) {
    const handler = jes.queryHanlders[op];

    if (!handler) {
        throw new Error(MSG.INVALID_QUERY_HANDLER(op));
    }

    return handler(value, jes, prefix);
}

function evaluateByOpMeta(
    currentValue,
    rightValue,
    opMeta,
    jes,
    prefix,
    context
) {
    if (opMeta[1]) {
        return rightValue
            ? evaluateUnary(currentValue, opMeta[0], jes, prefix)
            : currentValue;
    }

    return evaluate(currentValue, opMeta[0], rightValue, jes, prefix, context);
}

const defaultCustomizer = {
    mapOfOperators: MapOfOps,
    mapOfManipulators: MapOfMans,
    operatorHandlers: defaultJesHandlers,
    operatorExplanations: MSG.validationErrors,
    queryHanlders: defaultManipulations,
};

function matchCollection(actual, collectionOp, opMeta, operands, jes, prefix) {
    let matchResult, nextPrefix;

    switch (collectionOp) {
        case PFX_FOR_EACH: {
            const mapResult = isPlainObject(actual)
                ? _mapValues(actual, (item, key) =>
                      evaluateByOpMeta(
                          item,
                          operands[0],
                          opMeta,
                          jes,
                          MSG.formatPrefix(key, prefix)
                      )
                  )
                : actual.map((item, i) =>
                      evaluateByOpMeta(
                          item,
                          operands[0],
                          opMeta,
                          jes,
                          MSG.formatPrefix(i, prefix)
                      )
                  );
            nextPrefix = MSG.formatPrefix(
                MSG.formatMap(formatQuery(opMeta)),
                prefix
            );
            matchResult = match(mapResult, operands[1], jes, nextPrefix);
            break;
        }

        case PFX_WITH_ANY: {
            nextPrefix = MSG.formatPrefix(
                MSG.formatAny(formatQuery(opMeta)),
                prefix
            );
            matchResult = _find(actual, (item, key) =>
                match(
                    evaluateByOpMeta(
                        item,
                        operands[0],
                        opMeta,
                        jes,
                        MSG.formatPrefix(key, prefix)
                    ),
                    operands[1],
                    jes,
                    nextPrefix
                )
            );
            break;
        }

        default:
            throw new Error(MSG.INVALID_COLLECTION_OP(collectionOp));
    }

    if (!matchResult[0]) {
        return matchResult;
    }

    return undefined;
}

function validateCollection(
    actual,
    collectionOp,
    op,
    expectedFieldValue,
    jes,
    prefix
) {
    switch (collectionOp) {
        case PFX_FOR_EACH: {
            const unmatchedKey = _findIndex(
                actual,
                (item) => !test(item, op, expectedFieldValue, jes, prefix)
            );
            if (unmatchedKey) {
                return [
                    false,
                    getUnmatchedExplanation(
                        jes,
                        op,
                        unmatchedKey,
                        actual[unmatchedKey],
                        expectedFieldValue,
                        prefix
                    ),
                ];
            }
            break;
        }

        case PFX_WITH_ANY: {
            const matched = _find(actual, (item) =>
                test(item, op, expectedFieldValue, jes, prefix)
            );

            if (!matched) {
                return [
                    false,
                    getUnmatchedExplanation(
                        jes,
                        op,
                        null,
                        actual,
                        expectedFieldValue,
                        prefix
                    ),
                ];
            }
            break;
        }

        default:
            throw new Error(MSG.INVALID_COLLECTION_OP(collectionOp));
    }

    return undefined;
}

function evaluateCollection(
    currentValue,
    collectionOp,
    opMeta,
    expectedFieldValue,
    jes,
    prefix,
    context
) {
    switch (collectionOp) {
        case PFX_FOR_EACH:
            return _map(currentValue, (item, i) =>
                evaluateByOpMeta(
                    item,
                    expectedFieldValue,
                    opMeta,
                    jes,
                    MSG.formatPrefix(i, prefix),
                    { ...context, $$PARENT: currentValue, $$CURRENT: item }
                )
            );

        case PFX_WITH_ANY:
            throw new Error(MSG.PRX_OP_NOT_FOR_EVAL(collectionOp));

        default:
            throw new Error(MSG.INVALID_COLLECTION_OP(collectionOp));
    }
}

/**
 *
 * @param {*} actual
 * @param {*} expected
 * @param {*} jes
 * @param {*} prefix
 *
 * { key: { $match } }
 */
function match(actual, expected, jes, prefix) {
    jes != null || (jes = defaultCustomizer);
    let passObjectCheck = false;

    if (!isPlainObject(expected)) {
        if (!test(actual, 'OP_EQUAL', expected, jes, prefix)) {
            return [
                false,
                jes.operatorExplanations.OP_EQUAL(
                    null,
                    actual,
                    expected,
                    prefix
                ),
            ];
        }

        return [true];
    }

    for (let fieldName in expected) {
        let expectedFieldValue = expected[fieldName];

        const l = fieldName.length;

        if (l > 1) {
            if (l > 4 && fieldName[0] === '|' && fieldName[2] === '$') {
                if (fieldName[3] === '$') {
                    if (
                        !Array.isArray(expectedFieldValue) &&
                        expectedFieldValue.length !== 2
                    ) {
                        throw new Error(MSG.OPERAND_NOT_TUPLE());
                    }

                    //processors
                    const collectionOp = fieldName.substr(0, 2);
                    fieldName = fieldName.substr(3);

                    const opMeta = jes.mapOfManipulators.get(fieldName);
                    if (!opMeta) {
                        throw new Error(MSG.INVALID_QUERY_OPERATOR(fieldName));
                    }

                    const matchResult = matchCollection(
                        actual,
                        collectionOp,
                        opMeta,
                        expectedFieldValue,
                        jes,
                        prefix
                    );
                    if (matchResult) return matchResult;
                    continue;
                } else {
                    //validators
                    const collectionOp = fieldName.substr(0, 2);
                    fieldName = fieldName.substr(2);

                    const op = jes.mapOfOperators.get(fieldName);
                    if (!op) {
                        throw new Error(MSG.INVALID_TEST_OPERATOR(fieldName));
                    }

                    const matchResult = validateCollection(
                        actual,
                        collectionOp,
                        op,
                        expectedFieldValue,
                        jes,
                        prefix
                    );
                    if (matchResult) return matchResult;
                    continue;
                }
            }

            if (fieldName[0] === '$') {
                if (l > 2 && fieldName[1] === '$') {
                    fieldName = fieldName.substr(1);

                    //processors
                    const opMeta = jes.mapOfManipulators.get(fieldName);
                    if (!opMeta) {
                        throw new Error(MSG.INVALID_QUERY_OPERATOR(fieldName));
                    }

                    if (!opMeta[1]) {
                        throw new Error(MSG.NOT_A_UNARY_QUERY);
                    }

                    const queryResult = evaluateUnary(
                        actual,
                        opMeta[0],
                        jes,
                        prefix
                    );
                    const matchResult = match(
                        queryResult,
                        expectedFieldValue,
                        jes,
                        MSG.formatPrefix(formatQuery(opMeta), prefix)
                    );

                    if (!matchResult[0]) {
                        return matchResult;
                    }

                    continue;
                }

                //validator
                const op = jes.mapOfOperators.get(fieldName);
                if (!op) {
                    throw new Error(MSG.INVALID_TEST_OPERATOR(fieldName));
                }

                if (!test(actual, op, expectedFieldValue, jes, prefix)) {
                    return [
                        false,
                        getUnmatchedExplanation(
                            jes,
                            op,
                            null,
                            actual,
                            expectedFieldValue,
                            prefix
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
                    jes.operatorExplanations.OP_EXISTS(
                        null,
                        null,
                        true,
                        prefix
                    ),
                ];

            const actualType = typeof actual;

            if (actualType !== 'object')
                return [
                    false,
                    jes.operatorExplanations.OP_TYPE(
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
                jes,
                MSG.formatPrefix(fieldName, prefix)
            );
            if (!ok) {
                return [false, reason];
            }
        } else {
            if (
                !test(
                    actualFieldValue,
                    'OP_EQUAL',
                    expectedFieldValue,
                    jes,
                    prefix
                )
            ) {
                return [
                    false,
                    jes.operatorExplanations.OP_EQUAL(
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
 * @param {*} jes
 * @param {*} context
 */
function evaluateExpr(currentValue, expr, jes, prefix, context, setOp) {
    jes != null || (jes = defaultCustomizer);
    if (Array.isArray(expr)) {
        if (setOp) {
            return expr.map((item) =>
                evaluateExpr(undefined, item, jes, prefix, { ...context }, true)
            );
        }

        return expr.reduce(
            (result, exprItem) =>
                evaluateExpr(result, exprItem, jes, prefix, { ...context }),
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

        throw new Error(MSG.INVALID_EXPR_SYNTAX);
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

        const opMeta = jes.mapOfManipulators.get(expr);
        if (!opMeta) {
            throw new Error(MSG.INVALID_QUERY_OPERATOR(expr));
        }

        if (!opMeta[1]) {
            throw new Error(MSG.REQUIRE_RIGHT_OPERAND(expr));
        }

        return evaluateUnary(currentValue, opMeta[0], jes, prefix);
    }

    if (typeExpr !== 'object') {
        throw new Error(MSG.INVALID_EXPR_SYNTAX);
    }

    if (setOp) {
        return _mapValues(expr, (item) =>
            evaluateExpr(undefined, item, jes, prefix, context, true)
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
                    throw new Error(MSG.OPERATOR_NOT_ALONE);
                }

                const opMeta = jes.mapOfManipulators.get(fieldName);
                if (!opMeta) {
                    throw new Error(MSG.INVALID_QUERY_OPERATOR(fieldName));
                }

                result = evaluateByOpMeta(
                    currentValue,
                    expectedFieldValue,
                    opMeta,
                    jes,
                    prefix,
                    context
                );
                hasOperator = true;
                continue;
            }

            if (l > 3 && fieldName[0] === '|' && fieldName[2] === '$') {
                if (result) {
                    throw new Error(MSG.OPERATOR_NOT_ALONE);
                }

                const collectionOp = fieldName.substr(0, 2);
                fieldName = fieldName.substr(2);

                const opMeta = jes.mapOfManipulators.get(fieldName);
                if (!opMeta) {
                    throw new Error(MSG.INVALID_QUERY_OPERATOR(fieldName));
                }

                result = evaluateCollection(
                    currentValue,
                    collectionOp,
                    opMeta,
                    expectedFieldValue,
                    jes,
                    prefix,
                    context
                );
                hasOperator = true;
                continue;
            }
        }

        if (hasOperator) {
            throw new Error(MSG.OPERATOR_NOT_ALONE);
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
            jes,
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
    static match = match;
    static evaluate = evaluateExpr;
    static defaultCustomizer = defaultCustomizer;

    /**
     * @param {object} value
     * @param {object} customizer
     */
    constructor(value, customizer) {
        this.value = value;
        this.customizer = customizer;
    }

    /**
     * Match the value with expected conditions in JSON expression
     * @param {object} expected - JSON match expression
     * @throws ValidationError
     * @returns {JES}
     */
    match(expected) {
        const result = match(this.value, expected, this.customizer);
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
        return evaluateExpr(this.value, expr, this.customizer);
    }

    /**
     * Evaluate a JSON expression against the value and update the value
     * @param {object} - JSON operation expression
     * @returns {JES}
     */
    update(expr) {
        const value = evaluateExpr(this.value, expr, this.customizer);
        this.value = value;
        return this;
    }
}

module.exports = JES;
