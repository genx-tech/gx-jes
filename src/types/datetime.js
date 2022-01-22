import validate, { invalidType } from '../validate';

let isDate = (obj) => Object.prototype.toString.call(obj) === '[object Date]';

export default {
    name: 'datetime',

    alias: ['date', 'time', 'timestamp'],

    validate: (value, schema, options = { useFieldPath: true, abortEarly: true, throwError: true }, context = {}) => {
        if (value != null && (!isDate(value) || isNaN(value.getTime()))) {
            return invalidType(value, 'datetime', options, context);
        }

        if (schema) {
            return validate(value, schema, options, context);
        }

        return true;
    },
};
