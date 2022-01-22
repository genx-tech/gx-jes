import _find from 'lodash/find';
import { get as _get } from '@genx/july';
import ValidationError from '../ValidationError';
import { messages } from '../config';
import validate, { invalidType } from '../validate';
export function validateBySchema(value, schema) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
    useFieldPath: true,
    abortEarly: true,
    throwError: true
  };
  let context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  const {
    useFieldPath,
    abortEarly,
    throwError,
    mapOfNames
  } = options;

  if (value != null && typeof value !== 'object') {
    return invalidType(value, 'object', options, context);
  }

  if (typeof schema === 'function') {
    // use deferred activation of schema to avoid circullar reference
    schema = schema();
  }

  const errors = [];

  const _options = !abortEarly && throwError ? { ...options,
    throwError: false
  } : options;

  _find(schema, (validationObject, fieldName) => {
    var _mapOfNames$fieldName;

    const fieldValue = useFieldPath ? _get(value, fieldName) : value === null || value === void 0 ? void 0 : value[fieldName];
    const reason = validate(fieldValue, validationObject, _options, {
      path: messages.makePath((_mapOfNames$fieldName = mapOfNames === null || mapOfNames === void 0 ? void 0 : mapOfNames[fieldName]) !== null && _mapOfNames$fieldName !== void 0 ? _mapOfNames$fieldName : fieldName, context.path),
      $$PARENT: value,
      $$CURRENT: fieldValue
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
  validate: validateBySchema
};
//# sourceMappingURL=object.js.map