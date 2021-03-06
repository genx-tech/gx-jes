import { InvalidArgument } from '@genx/error';

const validatorHandlers = {};
const mapOfValidators = {};

const processorHandlers = {};
const mapOfProcessors = {};

//JSON Expression Syntax Runtime Configuration
const config = {
    addValidatorToMap: (tokens, tag, handler) => {
        tokens.forEach((op) => {
            if (op in mapOfValidators) {
                throw new InvalidArgument(
                    `Duplicate validator operator: ${op}`,
                    {
                        op,
                        tag,
                    }
                );
            }
            mapOfValidators[op] = tag;
        });

        if (tag in validatorHandlers) {
            throw new InvalidArgument(
                `Duplicate handler for validation: ${tag}`
            );
        }

        validatorHandlers[tag] = handler;
    },
    addProcessorToMap: (tokens, tag, isUnary, handler) => {
        if (typeof isUnary === 'function' && handler == null) {
            handler = isUnary;
            isUnary = false;
        }

        tokens.forEach((op) => {
            if (op in mapOfProcessors) {
                throw new InvalidArgument(
                    `Duplicate processor operator: ${op}`,
                    {
                        op,
                        tag,
                        unary: isUnary,
                    }
                );
            }
            mapOfProcessors[op] = [tag, isUnary];
        });

        if (tag in processorHandlers) {
            throw new InvalidArgument(
                `Duplicate handler for processing: ${tag}`
            );
        }

        processorHandlers[tag] = handler;
    },
    overrideProcessor: (tag, handler) => {
        processorHandlers[tag] = handler;
    },
    overrideValidator: (tag, handler) => {
        validatorHandlers[tag] = handler;
    },

    getValidatorTag: (op) => mapOfValidators[op],
    getValidator: (tag) => validatorHandlers[tag],

    getProcessorTagAndType: (op) => mapOfProcessors[op],
    getProcessor: (tag) => processorHandlers[tag],
    loadMessages: (messages) => (config.messages = messages),
};

export default config;
