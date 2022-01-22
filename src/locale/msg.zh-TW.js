import config from '../config';
import vops from '../validateOperators';

const { formatName } = config.messages;

const messages = {
    validationErrors: {
        [vops.EQUAL]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must be ${JSON.stringify(
                right
            )}, but ${JSON.stringify(left)} given.`,
        [vops.NOT_EQUAL]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must not be ${JSON.stringify(
                right
            )}, but ${JSON.stringify(left)} given.`,
        [vops.NOT]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must not match ${JSON.stringify(
                right
            )}, but ${JSON.stringify(left)} given.`,
        [vops.GREATER_THAN]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} 的長度必須大於 ${right}.`,
        [vops.GREATER_THAN_OR_EQUAL]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} 的長度不能小於 ${right}.`,
        [vops.LESS_THAN]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must be less than ${right}.`,
        [vops.LESS_THAN_OR_EQUAL]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must not exceed ${right}.`,
        [vops.IN]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must be one of ${JSON.stringify(
                right
            )}.`,
        [vops.NOT_IN]: (name, left, right, prefix) =>
            `${formatName(
                name,
                prefix
            )} must not be any one of ${JSON.stringify(right)}.`,
        [vops.EXISTS]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} ${right ? '不能為空' : '必須為空'}。`,
        [vops.TYPE]: (name, left, right, prefix) =>
            `The value of ${formatName(name, prefix)} must be a(n) "${right}".`,
        [vops.MATCH]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must match ${JSON.stringify(
                right
            )}, but ${JSON.stringify(left)} given.`,
        [vops.MATCH_ANY]: (name, left, right, prefix) =>
            `${formatName(
                name,
                prefix
            )} does not match any of given criterias.`,
        [vops.HAS_KEYS]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must have all of these keys [${
                Array.isArray(right) ? right.join(', ') : [right]
            }].`,
        [vops.START_WITH]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must start with "${right}".`,
        [vops.END_WITH]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} must end with "${right}".`,
        [vops.SAME_AS]: (name, left, right, prefix) =>
            `${formatName(name, prefix)} 與 ${formatName(right)} 不一樣。`,
    },
};

config.loadMessages(messages);
