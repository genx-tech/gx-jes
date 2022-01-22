function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import config from './config';
import validate from './validators';
import transform from './transformers';
/**
 * JSON Expression Syntax Object
 * @class
 */

class JES {
  /**
   * @param {object} value
   */
  constructor(value) {
    this.value = value;
  }
  /**
   * Match the value with expected conditions in JSON expression
   * @param {object} expected - JSON match expression
   * @throws ValidationError
   * @returns {JES}
   */


  match(expected) {
    validate(this.value, expected);
    return this;
  }
  /**
   * Evaluate a JSON expression against the value
   * @param {object} - JSON operation expression
   */


  evaluate(expr) {
    return transform(this.value, expr);
  }
  /**
   * Evaluate a JSON expression against the value and update the value
   * @param {object} - JSON operation expression
   * @returns {JES}
   */


  update(expr) {
    this.value = transform(this.value, expr);
    return this;
  }

}

_defineProperty(JES, "config", config);

_defineProperty(JES, "match", (actual, expectedJES) => {
  const reason = validate(actual, expectedJES, {
    throwError: false,
    abortEarly: true,
    plainError: true
  });

  if (reason === true) {
    return [true];
  }

  return [false, reason];
});

_defineProperty(JES, "evaluate", transform);

export default JES;
//# sourceMappingURL=index.js.map