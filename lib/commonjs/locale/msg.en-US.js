"use strict";

require("source-map-support/register");

var _config = _interopRequireDefault(require("../config"));

var _validateOperators = _interopRequireDefault(require("../validateOperators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  formatName
} = _config.default.messages;
const messages = {
  nameOfValue: custom => custom !== null && custom !== void 0 && custom.lowerCase ? 'the value' : 'The value',
  validationErrors: {
    [_validateOperators.default.EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} must be ${JSON.stringify(right)}.`,
    [_validateOperators.default.NOT_EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} must not be ${JSON.stringify(right)}.`,
    [_validateOperators.default.NOT]: (name, left, right, context) => `${formatName(name, left, context)} must not match ${JSON.stringify(right)}.`,
    [_validateOperators.default.GREATER_THAN]: (name, left, right, context) => `${formatName(name, left, context)} must be greater than ${right}.`,
    [_validateOperators.default.GREATER_THAN_OR_EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} must be greater than or equal to ${right}.`,
    [_validateOperators.default.LESS_THAN]: (name, left, right, context) => `${formatName(name, left, context)} must be less than ${right}.`,
    [_validateOperators.default.LESS_THAN_OR_EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} must not exceed ${right}.`,
    [_validateOperators.default.IN]: (name, left, right, context) => `${formatName(name, left, context)} must be one of ${JSON.stringify(right)}.`,
    [_validateOperators.default.NOT_IN]: (name, left, right, context) => `${formatName(name, left, context)} must not be any one of ${JSON.stringify(right)}.`,
    [_validateOperators.default.EXISTS]: (name, left, right, context) => `${formatName(name, left, context)} ${right ? 'must not be null' : 'must be null'}.`,
    [_validateOperators.default.TYPE]: (name, left, right, context) => `The value of ${formatName(name, left, context)} must be a(n) "${right}".`,
    [_validateOperators.default.MATCH]: (name, left, right, context) => `${formatName(name, left, context)} must match ${JSON.stringify(right)}.`,
    [_validateOperators.default.MATCH_ANY]: (name, left, right, context) => `${formatName(name, left, context)} does not match any of given criterias.`,
    [_validateOperators.default.ALL_MATCH]: (name, left, right, context) => `One of the element of ${formatName(name, left, context, {
      lowerCase: true
    })} does not match the requirement(s).`,
    [_validateOperators.default.ANY_ONE_MATCH]: (name, left, right, context) => `None of the element of ${formatName(name, left, context, {
      lowerCase: true
    })} matches the requirement(s).`,
    [_validateOperators.default.HAS_KEYS]: (name, left, right, context) => `${formatName(name, left, context)} must have all of these keys [${Array.isArray(right) ? right.join(', ') : [right]}].`,
    [_validateOperators.default.START_WITH]: (name, left, right, context) => `${formatName(name, left, context)} must start with "${right}".`,
    [_validateOperators.default.END_WITH]: (name, left, right, context) => `${formatName(name, left, context)} must end with "${right}".`,
    [_validateOperators.default.SAME_AS]: (name, left, right, context) => `${formatName(name, left, context)} does not match ${formatName(right)}.`
  }
};

_config.default.loadMessages(messages);
//# sourceMappingURL=msg.en-US.js.map