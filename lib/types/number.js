"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("source-map-support/register");
var _validate = _interopRequireWildcard(require("../validate"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _default = {
  name: 'number',
  alias: ['float'],
  validate: (value, schema, options = {
    useFieldPath: true,
    abortEarly: true,
    throwError: true
  }, context = {}) => {
    if (value instanceof Number) {
      value = value.valueOf();
    }
    if (value != null && (typeof value !== 'number' || isNaN(value))) {
      return (0, _validate.invalidType)(value, 'number', options, context);
    }
    if (schema) {
      return (0, _validate.default)(value, schema, options, context);
    }
    return true;
  }
};
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=number.js.map