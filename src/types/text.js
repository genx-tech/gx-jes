import validate, { invalidType } from '../validate';

export default {
    name: 'text',

    alias: ['string', 'char'],

    validate: (
        value,
        schema,
        options = { useFieldPath: true, abortEarly: true, throwError: true },
        context = {}
    ) => {
        if (value != null && typeof value !== 'string') {
            return invalidType(value, 'text', options, context);
        }

        if (schema) {
            return validate(value, schema, options, context);
        }

        return true;
    },
};
