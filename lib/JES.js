"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _config = _interopRequireDefault(require("./config"));

var _validators = _interopRequireDefault(require("./validators"));

var _transformers = _interopRequireDefault(require("./transformers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * JSON Expression Syntax Object
 * @class
 */
var JES = /*#__PURE__*/function () {
  /**
   * @param {object} value
   */
  function JES(value) {
    _classCallCheck(this, JES);

    this.value = value;
  }
  /**
   * Match the value with expected conditions in JSON expression
   * @param {object} expected - JSON match expression
   * @throws ValidationError
   * @returns {JES}
   */


  _createClass(JES, [{
    key: "match",
    value: function match(expected) {
      (0, _validators["default"])(this.value, expected);
      return this;
    }
    /**
     * Evaluate a JSON expression against the value
     * @param {object} - JSON operation expression
     */

  }, {
    key: "evaluate",
    value: function evaluate(expr) {
      return (0, _transformers["default"])(this.value, expr);
    }
    /**
     * Evaluate a JSON expression against the value and update the value
     * @param {object} - JSON operation expression
     * @returns {JES}
     */

  }, {
    key: "update",
    value: function update(expr) {
      this.value = (0, _transformers["default"])(this.value, expr);
      return this;
    }
  }]);

  return JES;
}();

_defineProperty(JES, "config", _config["default"]);

_defineProperty(JES, "match", function (actual, expectedJES) {
  var reason = (0, _validators["default"])(actual, expectedJES, {
    throwError: false,
    abortEarly: true,
    plainError: true
  });

  if (reason === true) {
    return [true];
  }

  return [false, reason];
});

_defineProperty(JES, "evaluate", _transformers["default"]);

var _default = JES;
exports["default"] = _default;
//# sourceMappingURL=JES.js.map