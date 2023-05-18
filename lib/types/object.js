"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.validateBySchema = validateBySchema;
require("source-map-support/register");
var _find2 = _interopRequireDefault(require("lodash/find"));
var _july = require("@genx/july");
var _ValidationError = _interopRequireDefault(require("../ValidationError"));
var _config = require("../config");
var _validate = _interopRequireWildcard(require("../validate"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function validateBySchema(value, schema, options = {
  useFieldPath: true,
  abortEarly: true,
  throwError: true
}, context = {}) {
  const {
    useFieldPath,
    abortEarly,
    throwError,
    mapOfNames
  } = options;
  if (value != null && typeof value !== 'object') {
    return (0, _validate.invalidType)(value, 'object', options, context);
  }
  if (typeof schema === 'function') {
    schema = schema();
  }
  const errors = [];
  const _options = !abortEarly && throwError ? {
    ...options,
    throwError: false
  } : options;
  (0, _find2.default)(schema, (validationObject, fieldName) => {
    const fieldValue = useFieldPath ? (0, _july.get)(value, fieldName) : value === null || value === void 0 ? void 0 : value[fieldName];
    const reason = (0, _validate.default)(fieldValue, validationObject, _options, {
      path: _config.messages.makePath((mapOfNames === null || mapOfNames === void 0 ? void 0 : mapOfNames[fieldName]) ?? fieldName, context.path),
      $$PARENT: value,
      $$CURRENT: fieldValue
    });
    if (reason !== true) {
      if (abortEarly && throwError) {
        throw new _ValidationError.default(reason, fieldValue, fieldName);
      }
      errors.push(...reason);
      return abortEarly;
    }
    return false;
  });
  if (errors.length > 0) {
    if (throwError) {
      throw new _ValidationError.default(errors, value, context.path);
    }
    return errors;
  }
  return true;
}
var _default = {
  name: 'object',
  alias: ['json'],
  validate: validateBySchema
};
exports.default = _default;
//# sourceMappingURL=object.js.map