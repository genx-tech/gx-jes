// JSON Expression Syntax (JES)
import _size from 'lodash/size';
import _reduce from 'lodash/reduce';
import _reverse from 'lodash/reverse';
import _keys from 'lodash/keys';
import _values from 'lodash/values';
import _pick from 'lodash/pick';
import _pickBy from 'lodash/pickBy';
import _nth from 'lodash/nth';
import _omit from 'lodash/omit';
import _omitBy from 'lodash/omitBy';
import _groupBy from 'lodash/groupBy';
import _sortBy from 'lodash/sortBy';
import _filter from 'lodash/filter';
import _map from 'lodash/map';
import _mapValues from 'lodash/mapValues';

import { remap, isPlainObject, get as _get } from '@genx/july';

import config from './config';
import ops from './transformerOperators';
import validators from './validateOperators';

import { test } from './validate';
import transform, { getChildContext } from './transform';

const MSG = config.messages;

const UNARY = true;
const BINARY = false;

//Query & aggregate operators (pure)
const OP_MATCH = [ops.OP_MATCH, BINARY, '$has', '$match', '$all', '$validate'];
const OP_SIZE = [ops.OP_SIZE, UNARY, '$size', '$length', '$count'];
const OP_SUM = [ops.OP_SUM, UNARY, '$sum', '$total'];
const OP_GET_TYPE = [ops.OP_GET_TYPE, UNARY, '$type'];
const OP_GET_BY_INDEX = [
    ops.OP_GET_BY_INDEX,
    BINARY,
    '$at',
    '$getByIndex',
    '$nth',
]; // supports -1 as the last index, -2 the second last
const OP_GET_BY_KEY = [
    ops.OP_GET_BY_KEY,
    BINARY,
    '$of',
    '$valueOf',
    '$getByKey',
]; // support key path
const OP_IF = [ops.OP_IF, BINARY, '$if'];
const OP_CAST_ARRAY = [ops.OP_CAST_ARRAY, UNARY, '$castArray', '$makeArray'];

//Math operators (pure)
const OP_ADD = [ops.OP_ADD, BINARY, '$add', '$plus', '$inc'];
const OP_SUB = [ops.OP_SUB, BINARY, '$sub', '$subtract', '$minus', '$dec'];
const OP_MUL = [ops.OP_MUL, BINARY, '$mul', '$multiply', '$times'];
const OP_DIV = [ops.OP_DIV, BINARY, '$div', '$divide'];
const OP_MOD = [ops.OP_MOD, BINARY, '$mod', '$remainder'];

//Collection operators (pure)
const OP_KEYS = [ops.OP_KEYS, UNARY, '$keys'];
const OP_VALUES = [ops.OP_VALUES, UNARY, '$values'];
const OP_ENTRIES = [ops.OP_ENTRIES, UNARY, '$entries'];
const OP_OBJ_TO_ARRAY = [
    ops.OP_OBJ_TO_ARRAY,
    UNARY,
    '$toArray',
    '$objectToArray',
];
const OP_PICK = [ops.OP_PICK, BINARY, '$pick', '$pickBy', '$filterByKeys']; // filter by key
const OP_OMIT = [ops.OP_OMIT, BINARY, '$omit', '$omitBy'];
const OP_SLICE = [ops.OP_SLICE, BINARY, '$slice', '$limit'];
const OP_GROUP = [ops.OP_GROUP, BINARY, '$group', '$groupBy'];
const OP_SORT = [ops.OP_SORT, BINARY, '$sort', '$orderBy', '$sortBy'];
const OP_REVERSE = [ops.OP_REVERSE, UNARY, '$reverse'];
const OP_JOIN = [ops.OP_JOIN, BINARY, '$join'];
const OP_MERGE = [ops.OP_MERGE, BINARY, '$merge']; // merge a list of transform result over the value
const OP_FILTER = [ops.OP_FILTER, BINARY, '$filter', '$filterByValue']; // filter by value
const OP_REMAP = [ops.OP_REMAP, BINARY, '$remap', '$mapKeys']; // reverse-map, map a key to another name
const OP_TO_JSON = [ops.OP_TO_JSON, BINARY, '$json', '$toJSON', '$stringify'];
const OP_TO_OBJ = [ops.OP_TO_OBJ, BINARY, '$object', '$toObject', '$parseJSON'];

//Value updater (pure)
const OP_SET = [ops.OP_SET, BINARY, '$set', '$=', '$value'];
const OP_ADD_ITEM = [ops.OP_ADD_ITEM, BINARY, '$addItem', '$override'];
const OP_ASSIGN = [ops.OP_ASSIGN, BINARY, '$assign', '$addFields'];

// [ <op name>, <unary> ]
//embeded validators in processing pipeline
const matchOptions = { throwError: false, abortEarly: true };

config.addTransformerToMap(
    OP_MATCH,
    'OP_MATCH',
    false,
    (left, right, context) => {
        return test(left, 'OP_MATCH', right, matchOptions, context);
    }
);

config.addTransformerToMap(OP_SIZE, (left) => _size(left));

config.addTransformerToMap(OP_SUM, (left) =>
    _reduce(
        left,
        (sum, item) => {
            sum += item;
            return sum;
        },
        0
    )
);

config.addTransformerToMap(OP_GET_TYPE, (left) =>
    Array.isArray(left)
        ? 'array'
        : Number.isInteger(left)
        ? 'integer'
        : typeof left
);

config.addTransformerToMap(OP_GET_BY_INDEX, (left, right) => _nth(left, right));
config.addTransformerToMap(OP_GET_BY_KEY, (left, right) => _get(left, right));

config.addTransformerToMap(OP_IF, (left, right, context) => {
    if (!Array.isArray(right)) {
        throw new Error(MSG.OPERAND_NOT_ARRAY(ops.OP_IF));
    }

    if (right.length < 2 || right.length > 3) {
        throw new Error(MSG.OPERAND_NOT_TUPLE_2_OR_3(ops.OP_IF));
    }

    const condition = transform(undefined, right[0], context, true);

    if (test(left, validators.OP_MATCH, condition, matchOptions, context)) {
        return transform(left, right[1], context);
    } else if (right.length > 2) {
        return transform(left, right[2], context);
    }

    return left;
});

config.addTransformerToMap(OP_CAST_ARRAY, ops.OP_CAST_ARRAY, (left) =>
    left == null ? null : Array.isArray(left) ? left : [left]
);

config.addTransformerToMap(OP_ADD, ops.OP_ADD, (left, right) => left + right);
config.addTransformerToMap(OP_SUB, ops.OP_SUB, (left, right) => left - right);
config.addTransformerToMap(OP_MUL, ops.OP_MUL, (left, right) => left * right);
config.addTransformerToMap(OP_DIV, ops.OP_DIV, (left, right) => left / right);
config.addTransformerToMap(OP_MOD, ops.OP_MOD, (left, right) => left % right);

config.addTransformerToMap(OP_KEYS, ops.OP_KEYS, (left) => _keys(left));
config.addTransformerToMap(OP_VALUES, ops.OP_VALUES, (left) => _values(left));
config.addTransformerToMap(OP_ENTRIES, ops.OP_ENTRIES, (left) =>
    _map(left, (value, key) => [key, value])
);
config.addTransformerToMap(OP_OBJ_TO_ARRAY, ops.OP_OBJ_TO_ARRAY, (left) =>
    _map(left, (v, k) => ({ k, v }))
);

config.addTransformerToMap(OP_PICK, ops.OP_PICK, (left, right, context) => {
    if (left == null) {
        return null;
    }

    if (typeof right !== 'object') {
        right = [right];
    }

    if (Array.isArray(right)) {
        return _pick(left, right);
    }

    return _pickBy(left, (item, key) =>
        test(
            key,
            validators.OP_MATCH,
            right,
            matchOptions,
            getChildContext(context, left, key, item)
        )
    );
});

config.addTransformerToMap(OP_OMIT, ops.OP_OMIT, (left, right, context) => {
    if (left == null) {
        return null;
    }

    if (typeof right !== 'object') {
        right = [right];
    }

    if (Array.isArray(right)) {
        return _omit(left, right);
    }

    return _omitBy(left, (item, key) =>
        test(
            key,
            validators.OP_MATCH,
            right,
            matchOptions,
            getChildContext(context, left, key, item)
        )
    );
});

config.addTransformerToMap(OP_SLICE, ops.OP_SLICE, (left, right) => {
    if (left == null) {
        return null;
    }

    if (!Array.isArray(left)) {
        return new Error(MSG.VALUE_NOT_ARRAY(ops.OP_SLICE));
    }

    if (Number.isInteger(right)) {
        return left.slice(right);
    }

    if (Array.isArray(right)) {
        if (right.length === 0 || right.length > 2) {
            return new Error(MSG.INVALID_OP_EXPR(ops.OP_SLICE, right));
        }

        return left.slice(...right);
    }

    return new Error(MSG.INVALID_OP_EXPR(ops.OP_SLICE, right));
});

config.addTransformerToMap(OP_GROUP, ops.OP_GROUP, (left, right) =>
    _groupBy(left, right)
);
config.addTransformerToMap(OP_SORT, ops.OP_SORT, (left, right) =>
    _sortBy(left, right)
);
config.addTransformerToMap(OP_REVERSE, ops.OP_REVERSE, (left) =>
    _reverse(left)
);

config.addTransformerToMap(OP_JOIN, ops.OP_JOIN, (left, right) => {
    if (left == null) {
        return null;
    }
    if (!Array.isArray(left)) {
        return left.toString();
    }
    return left.join(right.toString());
});

const objectMerger = (left, context) => [
    (result, expr) => Object.assign(result, transform(left, expr, context)),
    {},
];

const arrayMerger = (left, context) => [
    (result, expr) => [...result, ...transform(left, expr, context)],
    [],
];

config.addTransformerToMap(OP_MERGE, ops.OP_MERGE, (left, right, context) => {
    if (!Array.isArray(right)) {
        throw new Error(MSG.OPERAND_NOT_ARRAY(ops.OP_MERGE));
    }

    return right.reduce(
        ...(Array.isArray(left)
            ? arrayMerger(left, context)
            : objectMerger(left, context))
    );
});

config.addTransformerToMap(OP_FILTER, ops.OP_FILTER, (left, right, context) => {
    if (left == null) {
        return null;
    }

    if (typeof left !== 'object') {
        throw new Error(MSG.VALUE_NOT_COLLECTION(ops.OP_FILTER));
    }

    return _filter(left, (value, key) =>
        test(
            value,
            validators.OP_MATCH,
            right,
            matchOptions,
            getChildContext(context, left, key, value)
        )
    );
});
config.addTransformerToMap(OP_REMAP, ops.OP_REMAP, (left, right) => {
    if (left == null) {
        return null;
    }

    if (typeof left !== 'object') {
        throw new Error(MSG.VALUE_NOT_COLLECTION(ops.OP_REMAP));
    }

    if (Array.isArray(right)) {
        if (right.length !== 2) {
            throw new Error(MSG.OPERAND_NOT_TUPLE(ops.OP_REMAP));
        }

        return remap(left, right[0], right[1]);
    }

    if (!isPlainObject(right)) {
        throw new Error(MSG.OPERAND_NOT_OBJECT(ops.OP_REMAP));
    }

    return remap(left, right);
});

config.addTransformerToMap(OP_TO_JSON, ops.OP_TO_JSON, (left) =>
    left == null ? left : JSON.stringify(left)
);
config.addTransformerToMap(OP_TO_OBJ, ops.OP_TO_OBJ, (left) =>
    left == null ? left : JSON.parse(left)
);

config.addTransformerToMap(OP_SET, ops.OP_SET, (left, right, context) =>
    transform(undefined, right, context, true)
);
config.addTransformerToMap(
    OP_ADD_ITEM,
    ops.OP_ADD_ITEM,
    (left, right, prefix, context) => {
        if (typeof left !== 'object') {
            throw new Error(MSG.VALUE_NOT_COLLECTION(ops.OP_ADD_ITEM));
        }

        if (Array.isArray(left)) {
            return left.concat(right);
        }

        if (!Array.isArray(right) || right.length !== 2) {
            throw new Error(MSG.OPERAND_NOT_TUPLE(ops.OP_ADD_ITEM));
        }

        return {
            ...left,
            [right[0]]: transform(left, right[1], context),
        };
    }
);
config.addTransformerToMap(OP_ASSIGN, ops.OP_ASSIGN, (left, right, context) => {
    if (!isPlainObject(left)) {
        if (left == null) {
            left = {};
        } else {
            throw new Error(MSG.VALUE_NOT_OBJECT(ops.OP_ASSIGN));
        }
    }

    if (!isPlainObject(right)) {
        throw new Error(MSG.OPERAND_NOT_OBJECT(ops.OP_ASSIGN));
    }

    const rightValue = _mapValues(right, (expr, key) =>
        transform(
            left[key],
            expr,
            getChildContext(context, left, key, left[key])
        )
    );

    return { ...left, ...rightValue };
});

export default transform;
