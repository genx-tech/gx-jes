import validate, { invalidType } from '../validate';

export default {
    name: 'integer',

    alias: ['int'],

    validate: (value, schema, options = { useFieldPath: true, abortEarly: true, throwError: true }, context = {}) => {
        if (value instanceof Number) {
            value = value.valueOf();
        }

        if (value != null && (typeof value !== 'number' || isNaN(value) || !Number.isInteger(value))) {
            return invalidType(value, 'integer', options, context);
        }

        if (schema) {
            return validate(value, schema, options, context);
        }

        return true;
    },
};
