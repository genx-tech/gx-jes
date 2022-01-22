import validate, { invalidType } from '../validate';

export default {
    name: 'boolean',

    alias: ['bool'],

    validate: (
        value,
        schema,
        options = { useFieldPath: true, abortEarly: true, throwError: true },
        context = {}
    ) => {
        if (value instanceof Boolean) {
            value = value.valueOf();
        }

        if (value != null && typeof value !== 'boolean') {
            return invalidType(value, 'boolean', options, context);
        }

        if (schema) {
            return validate(value, schema, options, context);
        }

        return true;
    },
};
