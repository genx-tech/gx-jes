import validate, { invalidType } from '../validate';

let isDate = obj => Object.prototype.toString.call(obj) === '[object Date]';

export default {
  name: 'datetime',
  alias: ['date', 'time', 'timestamp'],
  validate: function (value, schema) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      useFieldPath: true,
      abortEarly: true,
      throwError: true
    };
    let context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (value != null && (!isDate(value) || isNaN(value.getTime()))) {
      return invalidType(value, 'datetime', options, context);
    }

    if (schema) {
      return validate(value, schema, options, context);
    }

    return true;
  }
};
//# sourceMappingURL=datetime.js.map