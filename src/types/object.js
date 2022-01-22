import _find from 'lodash/find';
import { get as _get } from '@genx/july';

import ValidationError from '../ValidationError';
import { messages } from '../config';
import validate, { invalidType } from '../validate';

export function validateBySchema(
    value,
    schema,
    options = { useFieldPath: true, abortEarly: true, throwError: true },
    context = {}
) {
    const { useFieldPath, abortEarly, throwError, mapOfNames } = options;

    if (value != null && typeof value !== 'object') {
        return invalidType(value, 'object', options, context);
    }

    if (typeof schema === 'function') {
        // use deferred activation of schema to avoid circullar reference
        schema = schema();
    }

    const errors = [];
    const _options = !abortEarly && throwError ? { ...options, throwError: false } : options;

    _find(schema, (validationObject, fieldName) => {
        const fieldValue = useFieldPath ? _get(value, fieldName) : value?.[fieldName];
        const reason = validate(fieldValue, validationObject, _options, {
            path: messages.makePath(mapOfNames?.[fieldName] ?? fieldName, context.path),
            $$PARENT: value,
            $$CURRENT: fieldValue,
        });

        if (reason !== true) {
            if (abortEarly && throwError) {
                throw new ValidationError(reason, fieldValue, fieldName);
            }

            errors.push(...reason);
            return abortEarly;
        }

        return false;
    });

    if (errors.length > 0) {
        if (throwError) {
            throw new ValidationError(errors, value, context.path);
        }

        return errors;
    }

    return true;
}

export default {
    name: 'object',

    alias: ['json'],

    validate: validateBySchema,
};
