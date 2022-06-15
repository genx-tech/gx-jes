"use strict";

require("source-map-support/register");

var _config = _interopRequireDefault(require("../config"));

var _validateOperators = _interopRequireDefault(require("../validateOperators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  formatName
} = _config.default.messages;
const messages = {
  nameOfValue: () => '目標值',
  validationErrors: {
    [_validateOperators.default.EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} 的值必須為 ${JSON.stringify(right)}。`,
    [_validateOperators.default.NOT_EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} 的值不能為 ${JSON.stringify(right)}。`,
    [_validateOperators.default.NOT]: (name, left, right, context) => `${formatName(name, left, context)} 的值不能為 ${JSON.stringify(right)}。`,
    [_validateOperators.default.GREATER_THAN]: (name, left, right, context) => `${formatName(name, left, context)} 的長度必須大於 ${right}。`,
    [_validateOperators.default.GREATER_THAN_OR_EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} 的長度不能小於 ${right}.`,
    [_validateOperators.default.LESS_THAN]: (name, left, right, context) => `${formatName(name, left, context)} 的長度必須小於 ${right}。`,
    [_validateOperators.default.LESS_THAN_OR_EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} 的長度不能超過 ${right}。`,
    [_validateOperators.default.IN]: (name, left, right, context) => `${formatName(name, left, context)} 必須為 ${JSON.stringify(right)} 其中之一。`,
    [_validateOperators.default.NOT_IN]: (name, left, right, context) => `${formatName(name, left, context)} 不能為 ${JSON.stringify(right)} 其中之一。`,
    [_validateOperators.default.EXISTS]: (name, left, right, context) => `${formatName(name, left, context)} ${right ? '不能為空' : '必須為空'}。`,
    [_validateOperators.default.TYPE]: (name, left, right, context) => `The value of ${formatName(name, left, context)} 必須是 "${right}" 類型.`,
    [_validateOperators.default.MATCH]: (name, left, right, context) => `${formatName(name, left, context)} 必須滿足 ${JSON.stringify(right)}。`,
    [_validateOperators.default.MATCH_ANY]: (name, left, right, context) => `${formatName(name, left, context)} 不能為 ${JSON.stringify(right)}。`,
    [_validateOperators.default.ALL_MATCH]: (name, left, right, context) => `${formatName(name, left, context)} 的所有元素中至少一個不符合要求.`,
    [_validateOperators.default.ANY_ONE_MATCH]: (name, left, right, context) => `${formatName(name, left, context)} 的所有元素中没有任何一個符合要求.`,
    [_validateOperators.default.HAS_KEYS]: (name, left, right, context) => `${formatName(name, left, context)} 必須含有這些鍵 [${Array.isArray(right) ? right.join(', ') : [right]}]。`,
    [_validateOperators.default.START_WITH]: (name, left, right, context) => `${formatName(name, left, context)} 必須以 "${right}" 為開頭。`,
    [_validateOperators.default.END_WITH]: (name, left, right, context) => `${formatName(name, left, context)} 必須以 "${right}" 為結尾。`,
    [_validateOperators.default.SAME_AS]: (name, left, right, context) => `${formatName(name, left, context)} 與 ${formatName(right)} 不一樣。`
  }
};

_config.default.loadMessages(messages);
//# sourceMappingURL=msg.zh-TW.js.map