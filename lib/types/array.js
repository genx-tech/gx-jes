"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _find2 = _interopRequireDefault(require("lodash/find"));

var _ValidationError = _interopRequireDefault(require("../ValidationError"));

var _config = require("../config");

var _validate2 = _interopRequireWildcard(require("../validate"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var _default = {
  name: 'array',
  alias: ['list'],

  /**
   *
   * @param {*} value
   * @param {*} itemSchema
   * @param {*} options
   * @param {*} context
   * @returns {true|ValidationError}
   */
  validate: function validate(value, itemSchema) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
      useFieldPath: true,
      abortEarly: true,
      throwError: true
    };
    var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var abortEarly = options.abortEarly,
        throwError = options.throwError;

    if (value != null && !Array.isArray(value)) {
      return (0, _validate2.invalidType)(value, 'array', options, context);
    }

    if (typeof itemSchema === 'function') {
      // use deferred activation of schema to avoid circullar reference
      itemSchema = itemSchema();
    }

    if (value) {
      var errors = [];
      (0, _find2["default"])(value, function (fieldValue, i) {
        var path = _config.messages.makePath(i, context.path);

        var reason = (0, _validate2["default"])(fieldValue, itemSchema, options, {
          name: null,
          path: path,
          $$PARENT: value,
          $$CURRENT: fieldValue
        });

        if (reason !== true) {
          if (abortEarly) {
            if (throwError) {
              throw new _ValidationError["default"](reason, fieldValue, path);
            }

            return reason;
          }

          errors.push.apply(errors, _toConsumableArray(reason));
        }
      });

      if (errors.length > 0) {
        if (throwError) {
          throw new _ValidationError["default"](errors, value, context.path);
        }

        return errors;
      }
    }

    return true;
  }
};
exports["default"] = _default;
//# sourceMappingURL=array.js.map