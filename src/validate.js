// JSON Expression Syntax (JES) for validation
import ValidationError from './ValidationError';
import config from './config';

const MSG = config.messages;
const Errors = MSG.validationErrors;

function getUnmatchedExplanation(op, leftValue, rightValue, context) {
    if (context.$$ERROR) {
        return context.$$ERROR;
    }

    const getter = MSG.validationErrors[op];
    return getter(context.name, leftValue, rightValue, context.path);
}

export function invalidType(value, type, options, context) {
    const reason = Errors.OP_TYPE(context.name, value, type, context.path);

    if (options.throwError) {
        throw new ValidationError(reason, value, context.path);
    }

    return new ValidationError(reason, value, context.path);
}

export function test(left, op, right, options, context) {
    const handler = config.getValidator(op);

    if (!handler) {
        throw new Error(MSG.INVALID_TEST_HANLDER(op));
    }

    return handler(left, right, options, context);
}

/**
 * Validate the given object with JSON Expression Syntax (JES)
 * @param {*} actual - The object to match
 * @param {*} expectedJES - Expected state in JSON Expression Syntax
 * @param {*} options - Validation options
 * @param {*} context - Validation context
 * @returns {array} - [ {boolean} matched, {string} unmatchedReason ]
 */
function validate(
    actual,
    expectedJES,
    options = { throwError: true, abortEarly: true },
    context = {}
) {
    const type = typeof expectedJES;

    if (type === 'string') {
        if (expectedJES.length === 0 || expectedJES[0] !== '$') {
            throw new Error(MSG.SYNTAX_INVALID_EXPR(expectedJES));
        }

        return validate(actual, { [expectedJES]: null }, options, context);
    }

    const { throwError, abortEarly } = options;

    if (expectedJES == null) {
        return true;
    }

    let { path } = context;
    const errors = [];
    const _options =
        !abortEarly && throwError ? { ...options, throwError: false } : options;

    for (let operator in expectedJES) {
        if (operator.length === 0 || operator[0] !== '$') {
            throw new Error(MSG.SYNTAX_INVALID_OP(operator, path));
        }

        let operatorValue = expectedJES[operator];

        //validator
        const op = config.getValidatorTag(operator);
        if (!op) {
            throw new Error(MSG.UNSUPPORTED_VALIDATION_OP(operator, path));
        }

        if (!test(actual, op, operatorValue, _options, context)) {
            const reason = getUnmatchedExplanation(
                op,
                actual,
                operatorValue,
                context
            );
            if (abortEarly && throwError) {
                throw new ValidationError(reason, actual, path);
            }

            errors.push(new ValidationError(reason, actual, path));
            if (abortEarly) {
                break;
            }
        }
    }

    if (errors.length > 0) {
        if (throwError) {
            throw new ValidationError(errors, actual, path);
        }

        return errors;
    }

    return true;
}

export default validate;
