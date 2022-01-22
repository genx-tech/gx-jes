"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("source-map-support/register");

var _config = _interopRequireDefault(require("./config"));

var _validators = _interopRequireDefault(require("./validators"));

var _transformers = _interopRequireDefault(require("./transformers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class JES {
  constructor(value) {
    this.value = value;
  }

  match(expected) {
    (0, _validators.default)(this.value, expected);
    return this;
  }

  evaluate(expr) {
    return (0, _transformers.default)(this.value, expr);
  }

  update(expr) {
    this.value = (0, _transformers.default)(this.value, expr);
    return this;
  }

}

_defineProperty(JES, "config", _config.default);

_defineProperty(JES, "match", (actual, expectedJES) => {
  const reason = (0, _validators.default)(actual, expectedJES, {
    throwError: false,
    abortEarly: true,
    plainError: true
  });

  if (reason === true) {
    return [true];
  }

  return [false, reason];
});

_defineProperty(JES, "evaluate", _transformers.default);

var _default = JES;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=index.js.map