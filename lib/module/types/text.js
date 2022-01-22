import validate, { invalidType } from '../validate';
export default {
  name: 'text',
  alias: ['string', 'char'],
  validate: function (value, schema) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      useFieldPath: true,
      abortEarly: true,
      throwError: true
    };
    let context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    if (value != null && typeof value !== 'string') {
      return invalidType(value, 'text', options, context);
    }

    if (schema) {
      return validate(value, schema, options, context);
    }

    return true;
  }
};
//# sourceMappingURL=text.js.map