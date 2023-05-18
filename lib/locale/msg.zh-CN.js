"use strict";

require("source-map-support/register");
var _config = _interopRequireDefault(require("../config"));
var _validateOperators = _interopRequireDefault(require("../validateOperators"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  formatName
} = _config.default.messages;
const messages = {
  nameOfValue: () => '目标值',
  validationErrors: {
    [_validateOperators.default.EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} 的值必须为 ${JSON.stringify(right)}。`,
    [_validateOperators.default.NOT_EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} 的值不能为 ${JSON.stringify(right)}。`,
    [_validateOperators.default.NOT]: (name, left, right, context) => `${formatName(name, left, context)} 的值不能为 ${JSON.stringify(right)}。`,
    [_validateOperators.default.GREATER_THAN]: (name, left, right, context) => `${formatName(name, left, context)} 的长度必须大于 ${right}。`,
    [_validateOperators.default.GREATER_THAN_OR_EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} 的长度不能小于 ${right}.`,
    [_validateOperators.default.LESS_THAN]: (name, left, right, context) => `${formatName(name, left, context)} 的长度必须小于 ${right}。`,
    [_validateOperators.default.LESS_THAN_OR_EQUAL]: (name, left, right, context) => `${formatName(name, left, context)} 的长度不能超过 ${right}。`,
    [_validateOperators.default.IN]: (name, left, right, context) => `${formatName(name, left, context)} 必须为 ${JSON.stringify(right)} 其中之一。`,
    [_validateOperators.default.NOT_IN]: (name, left, right, context) => `${formatName(name, left, context)} 不能为 ${JSON.stringify(right)} 其中之一。`,
    [_validateOperators.default.EXISTS]: (name, left, right, context) => `${formatName(name, left, context)} ${right ? '不能为空' : '必须为空'}。`,
    [_validateOperators.default.REQUIRED]: (name, left, right, context) => `${formatName(name, left, context)} 是必填项`,
    [_validateOperators.default.TYPE]: (name, left, right, context) => `The value of ${formatName(name, left, context)} 必须是 "${right}" 类型.`,
    [_validateOperators.default.MATCH]: (name, left, right, context) => `${formatName(name, left, context)} 必须满足 ${JSON.stringify(right)}。`,
    [_validateOperators.default.MATCH_ANY]: (name, left, right, context) => `${formatName(name, left, context)} 不能为 ${JSON.stringify(right)}。`,
    [_validateOperators.default.ALL_MATCH]: (name, left, right, context) => `${formatName(name, left, context)} 的所有项中至少一个不符合要求。`,
    [_validateOperators.default.ANY_ONE_MATCH]: (name, left, right, context) => `${formatName(name, left, context)} 的所有项中没有一个符合要求。`,
    [_validateOperators.default.HAS_KEYS]: (name, left, right, context) => `${formatName(name, left, context)} 必须包含这些键 [${Array.isArray(right) ? right.join(', ') : [right]}]。`,
    [_validateOperators.default.START_WITH]: (name, left, right, context) => `${formatName(name, left, context)} 必须以 "${right}" 开头。`,
    [_validateOperators.default.END_WITH]: (name, left, right, context) => `${formatName(name, left, context)} 必须以 "${right}" 结尾。`,
    [_validateOperators.default.SAME_AS]: (name, left, right, context) => `${formatName(name, left, context)} 与 ${formatName(right)} 不一样。`
  }
};
_config.default.loadMessages(messages);
//# sourceMappingURL=msg.zh-CN.js.map