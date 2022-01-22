import _find from 'lodash/find';

import ValidationError from '../ValidationError';
import { messages } from '../config';
import validate, { invalidType } from '../validate';

export default {
    name: 'array',

    alias: ['list'],

    /**
     *
     * @param {*} value
     * @param {*} itemSchema
     * @param {*} options
     * @param {*} context
     * @returns {true|ValidationError}
     */
    validate: (
        value,
        itemSchema,
        options = { useFieldPath: true, abortEarly: true, throwError: true },
        context = {}
    ) => {
        const { abortEarly, throwError } = options;

        if (value != null && !Array.isArray(value)) {
            return invalidType(value, 'array', options, context);
        }

        if (typeof itemSchema === 'function') {
            // use deferred activation of schema to avoid circullar reference
            itemSchema = itemSchema();
        }

        if (value) {
            const errors = [];

            _find(value, (fieldValue, i) => {
                const path = messages.formatPrefix(i, context.path);
                const reason = validate(fieldValue, itemSchema, options, {
                    name: null,
                    path,
                    $$PARENT: value,
                    $$CURRENT: fieldValue,
                });

                if (reason !== true) {
                    if (abortEarly) {
                        if (throwError) {
                            throw new ValidationError(reason, fieldValue, path);
                        }

                        return reason;
                    }

                    errors.push(...reason);
                }
            });

            if (errors.length > 0) {
                if (throwError) {
                    throw new ValidationError(errors, value, context.path);
                }

                return errors;
            }
        }

        return true;
    },
};
