"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _isEqual2 = _interopRequireDefault(require("lodash/isEqual"));

var _has2 = _interopRequireDefault(require("lodash/has"));

var _size2 = _interopRequireDefault(require("lodash/size"));

var _castArray2 = _interopRequireDefault(require("lodash/castArray"));

var _ValidationError = _interopRequireDefault(require("./ValidationError"));

var _validate = _interopRequireWildcard(require("./validate"));

var _config = _interopRequireDefault(require("./config"));

var _types = _interopRequireDefault(require("./types"));

var _validateOperators = _interopRequireDefault(require("./validateOperators"));

var _july = require("@genx/july");

var _transform = _interopRequireDefault(require("./transform"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MSG = _config.default.messages;
const OP_EQUAL = [_validateOperators.default.EQUAL, '$eq', '$eql', '$equal', '$being'];
const OP_NOT_EQUAL = [_validateOperators.default.NOT_EQUAL, '$ne', '$neq', '$notEqual'];
const OP_NOT = [_validateOperators.default.NOT, '$not'];
const OP_GREATER_THAN = [_validateOperators.default.GREATER_THAN, '$gt', '$>', '$greaterThan'];
const OP_GREATER_THAN_OR_EQUAL = [_validateOperators.default.GREATER_THAN_OR_EQUAL, '$gte', '$>=', '$greaterThanOrEqual', '$min'];
const OP_LESS_THAN = [_validateOperators.default.LESS_THAN, '$lt', '$<', '$lessThan'];
const OP_LESS_THAN_OR_EQUAL = [_validateOperators.default.LESS_THAN_OR_EQUAL, '$lte', '$<=', '$lessThanOrEqual', '$max'];
const OP_LENGTH = [_validateOperators.default.LENGTH, '$length', '$size', '$capacity'];
const OP_IN = [_validateOperators.default.IN, '$in'];
const OP_NOT_IN = [_validateOperators.default.NOT_IN, '$nin', '$notIn'];
const OP_EXISTS = [_validateOperators.default.EXISTS, '$exist', '$exists', '$notNull', '$required'];
const OP_MATCH = [_validateOperators.default.MATCH, '$has', '$match', '$all'];
const OP_MATCH_ANY = [_validateOperators.default.MATCH_ANY, '$any', '$or', '$either'];
const OP_ALL_MATCH = [_validateOperators.default.ALL_MATCH, '$allMatch', '|>$all', '|>$match'];
const OP_ANY_ONE_MATCH = [_validateOperators.default.ANY_ONE_MATCH, '$anyOneMatch', '|*$any', '|*$match', '|*$either'];
const OP_TYPE = [_validateOperators.default.TYPE, '$is', '$typeOf'];
const OP_HAS_KEYS = [_validateOperators.default.HAS_KEYS, '$hasKey', '$hasKeys', '$withKey', '$withKeys'];
const OP_START_WITH = [_validateOperators.default.START_WITH, '$startWith', '$startsWith'];
const OP_END_WITH = [_validateOperators.default.END_WITH, '$endWith', '$endsWith'];
const OP_SAME_AS = [_validateOperators.default.SAME_AS, '$sameAs'];

_config.default.addValidatorToMap(OP_EQUAL, (left, right) => (0, _isEqual2.default)(left, right));

_config.default.addValidatorToMap(OP_NOT_EQUAL, (left, right) => !(0, _isEqual2.default)(left, right));

_config.default.addValidatorToMap(OP_NOT, (left, ...args) => !(0, _validate.test)(left, _validateOperators.default.MATCH, ...args));

_config.default.addValidatorToMap(OP_GREATER_THAN, (left, right) => left > right);

_config.default.addValidatorToMap(OP_GREATER_THAN_OR_EQUAL, (left, right) => left >= right);

_config.default.addValidatorToMap(OP_LESS_THAN, (left, right) => left < right);

_config.default.addValidatorToMap(OP_LESS_THAN_OR_EQUAL, (left, right) => left <= right);

_config.default.addValidatorToMap(OP_LENGTH, (left, right, options, context) => (0, _validate.test)((0, _size2.default)(left), _validateOperators.default.MATCH, right, options, context));

_config.default.addValidatorToMap(OP_IN, (left, right, options, context) => {
  if (right == null) {
    return false;
  }

  if (typeof right === 'string' || (0, _july.isPlainObject)(right)) {
    right = (0, _transform.default)(undefined, right, context, true);
  }

  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_validateOperators.default.IN));
  }

  const equal = _config.default.getValidator(_validateOperators.default.EQUAL);

  return right.find(element => equal(left, element));
});

_config.default.addValidatorToMap(OP_NOT_IN, (left, right) => {
  if (right == null) {
    return true;
  }

  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_validateOperators.default.NOT_IN));
  }

  const notEqual = _config.default.getValidator(_validateOperators.default.NOT_EQUAL);

  return right.every(element => notEqual(left, element));
});

_config.default.addValidatorToMap(OP_EXISTS, (left, right) => {
  if (typeof right !== 'boolean') {
    throw new Error(MSG.OPERAND_NOT_BOOL(_validateOperators.default.EXISTS));
  }

  return right ? left != null : left == null;
});

_config.default.addValidatorToMap(OP_MATCH, (left, right, options, context) => {
  if (Array.isArray(right)) {
    const errors = [];
    right.every(rule => {
      const reason = (0, _validate.default)(left, rule, { ...options,
        asPredicate: false
      }, context);

      if (reason !== true) {
        errors.push(...(0, _castArray2.default)(reason));

        if (options.abortEarly) {
          return false;
        }
      }

      return true;
    });

    if (errors.length > 0) {
      if (options.throwError) {
        throw new _ValidationError.default(errors, left, context.path);
      }

      if (!options.asPredicate) {
        context.$$ERROR = errors.length === 1 && options.plainError ? errors[0] : errors;
      }

      return false;
    }

    return true;
  }

  const reason2 = (0, _validate.default)(left, right, options, context);

  if (reason2 !== true) {
    if (!options.asPredicate) {
      context.$$ERROR = reason2;
    }

    return false;
  }

  return true;
});

_config.default.addValidatorToMap(OP_MATCH_ANY, (left, right, options, context) => {
  if (!Array.isArray(right)) {
    throw new Error(MSG.OPERAND_NOT_ARRAY(_validateOperators.default.MATCH_ANY));
  }

  let found = right.find(rule => {
    const reason = (0, _validate.default)(left, rule, { ...options,
      abortEarly: false,
      throwError: false
    }, context);
    return reason === true;
  });

  if (!found) {
    context.$$ERROR = MSG.validationErrors[_validateOperators.default.MATCH_ANY](context.name, left, right, context);
  }

  return found ? true : false;
});

_config.default.addValidatorToMap(OP_ALL_MATCH, (left, right, options, context) => {
  if (!Array.isArray(left)) {
    throw new Error(MSG.VALUE_NOT_ARRAY(_validateOperators.default.ALL_MATCH));
  }

  const errors = [];
  left.every(leftItem => {
    const reason = (0, _validate.default)(leftItem, right, { ...options,
      asPredicate: false
    }, context);

    if (reason !== true) {
      errors.push(MSG.validationErrors[_validateOperators.default.ALL_MATCH](context.name, left, right, context), ...(0, _castArray2.default)(reason));

      if (options.abortEarly) {
        return false;
      }
    }

    return true;
  });

  if (errors.length > 0) {
    if (options.throwError) {
      throw new _ValidationError.default(errors, left, context.path);
    }

    if (!options.asPredicate) {
      context.$$ERROR = errors.length === 1 && options.plainError ? errors[0] : errors;
    }

    return false;
  }

  return true;
});

_config.default.addValidatorToMap(OP_ANY_ONE_MATCH, (left, right, options, context) => {
  if (!Array.isArray(left)) {
    throw new Error(MSG.VALUE_NOT_ARRAY(_validateOperators.default.ANY_ONE_MATCH));
  }

  let found = left.find(leftItem => {
    const reason = (0, _validate.default)(leftItem, right, { ...options,
      abortEarly: false,
      throwError: false
    }, context);
    return reason === true;
  });

  if (!found) {
    context.$$ERROR = MSG.validationErrors[_validateOperators.default.ANY_ONE_MATCH](context.name, left, right, context);
  }

  return found ? true : false;
});

_config.default.addValidatorToMap(OP_TYPE, (left, right, options, context) => {
  let type;
  let schema;

  if (Array.isArray(right)) {
    if (right.length === 0) {
      throw new Error(MSG.INVALID_OP_EXPR(OP_TYPE[0], right));
    }

    type = right[0];

    if (right.length > 1) {
      schema = right[1];
    }
  } else if (typeof right === 'string') {
    type = right;
  } else if (typeof right === 'object') {
    type = right.type;
    schema = right.schema;
  }

  if (!_types.default.Builtin.has(type)) {
    throw new Error(MSG.UNSUPPORTED_TYPE(type));
  }

  const reason = _types.default[type].validate(left, schema, options, context);

  if (reason !== true) {
    context.$$ERROR = reason;
    return false;
  }

  return true;
});

_config.default.addValidatorToMap(OP_HAS_KEYS, (left, right) => {
  if (typeof left !== 'object') {
    return false;
  }

  return Array.isArray(right) ? right.every(key => (0, _has2.default)(left, key)) : (0, _has2.default)(left, right);
});

_config.default.addValidatorToMap(OP_START_WITH, (left, right) => {
  if (typeof left !== 'string') {
    return false;
  }

  if (typeof right !== 'string') {
    throw new Error(MSG.OPERAND_NOT_STRING(_validateOperators.default.START_WITH));
  }

  return left.startsWith(right);
});

_config.default.addValidatorToMap(OP_END_WITH, (left, right) => {
  if (typeof left !== 'string') {
    return false;
  }

  if (typeof right !== 'string') {
    throw new Error(MSG.OPERAND_NOT_STRING(_validateOperators.default.END_WITH));
  }

  return left.endsWith(right);
});

_config.default.addValidatorToMap(OP_SAME_AS, (left, right, options, context) => {
  if (typeof left === 'object') {
    throw new Error(MSG.VALUE_NOT_PRIMITIVE(_validateOperators.default.OP_SAME_AS));
  }

  if (typeof right !== 'string') {
    throw new Error(MSG.OPERAND_NOT_STRING(_validateOperators.default.OP_SAME_AS));
  }

  return left === context.$$PARENT[right];
});

var _default = _validate.default;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=validators.js.map