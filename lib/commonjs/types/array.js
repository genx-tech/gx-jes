"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _find2 = _interopRequireDefault(require("lodash/find"));

var _ValidationError = _interopRequireDefault(require("../ValidationError"));

var _config = require("../config");

var _validate = _interopRequireWildcard(require("../validate"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  name: 'array',
  alias: ['list'],
  validate: (value, itemSchema, options = {
    useFieldPath: true,
    abortEarly: true,
    throwError: true
  }, context = {}) => {
    const {
      abortEarly,
      throwError
    } = options;

    if (value != null && !Array.isArray(value)) {
      return (0, _validate.invalidType)(value, 'array', options, context);
    }

    if (typeof itemSchema === 'function') {
      itemSchema = itemSchema();
    }

    if (value) {
      const errors = [];
      (0, _find2.default)(value, (fieldValue, i) => {
        const path = _config.messages.makePath(i, context.path);

        const reason = (0, _validate.default)(fieldValue, itemSchema, options, {
          name: null,
          path,
          $$PARENT: value,
          $$CURRENT: fieldValue
        });

        if (reason !== true) {
          if (abortEarly) {
            if (throwError) {
              throw new _ValidationError.default(reason, fieldValue, path);
            }

            return reason;
          }

          errors.push(...reason);
        }
      });

      if (errors.length > 0) {
        if (throwError) {
          throw new _ValidationError.default(errors, value, context.path);
        }

        return errors;
      }
    }

    return true;
  }
};
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=array.js.map