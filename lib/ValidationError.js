"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
require("source-map-support/register");
var _castArray2 = _interopRequireDefault(require("lodash/castArray"));
var _config = require("./config");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
class ValidationError extends Error {
  constructor(errorOrErrors, value, field) {
    const errors = [];
    let inner = [];
    (0, _castArray2.default)(errorOrErrors).forEach(err => {
      if (err.name === 'ValidationError') {
        errors.push(...err.errors);
        inner = [...inner, ...(err.inner.length > 0 ? err.inner : [err])];
      } else {
        errors.push(err);
        if (err.inner && Array.isArray(err.inner)) {
          inner = [...inner, ...err.inner];
        }
      }
    });
    super(errors.length > 1 ? _config.messages.MULTI_ERRORS(errors.length) : errors[0]);
    this.name = 'ValidationError';
    this.value = value;
    this.path = field;
    this.errors = errors;
    this.inner = inner;
  }
}
exports.default = ValidationError;
module.exports = exports.default;
//# sourceMappingURL=ValidationError.js.map