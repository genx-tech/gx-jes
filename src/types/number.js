import validate, { invalidType } from '../validate';

export default {
    name: 'number',

    alias: ['float'],

    validate: (
        value,
        schema,
        options = { useFieldPath: true, abortEarly: true, throwError: true },
        context = {}
    ) => {
        if (value instanceof Number) {
            value = value.valueOf();
        }

        if (value != null && (typeof value !== 'number' || isNaN(value))) {
            return invalidType(value, 'number', options, context);
        }

        if (schema) {
            return validate(value, schema, options, context);
        }

        return true;
    },
};
