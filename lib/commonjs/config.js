"use strict";

var _require = require('@genx/error'),
    InvalidArgument = _require.InvalidArgument;

var validatorHandlers = {};
var mapOfValidators = {};
var processorHandlers = {};
var mapOfProcessors = {};
var config = {
  addValidatorToMap: function addValidatorToMap(tokens, tag, handler) {
    tokens.forEach(function (op) {
      if (op in mapOfValidators) {
        throw new InvalidArgument("Duplicate validator operator: ".concat(op), {
          op: op,
          tag: tag
        });
      }

      mapOfValidators[op] = tag;
    });

    if (tag in validatorHandlers) {
      throw new InvalidArgument("Duplicate handler for validation: ".concat(tag));
    }

    validatorHandlers[tag] = handler;
  },
  addProcessorToMap: function addProcessorToMap(tokens, tag, isUnary, handler) {
    if (typeof isUnary === 'function' && handler == null) {
      handler = isUnary;
      isUnary = false;
    }

    tokens.forEach(function (op) {
      if (op in mapOfProcessors) {
        throw new InvalidArgument("Duplicate processor operator: ".concat(op), {
          op: op,
          tag: tag,
          unary: isUnary
        });
      }

      mapOfProcessors[op] = [tag, isUnary];
    });

    if (tag in processorHandlers) {
      throw new InvalidArgument("Duplicate handler for processing: ".concat(tag));
    }

    processorHandlers[tag] = handler;
  },
  overrideProcessor: function overrideProcessor(tag, handler) {
    processorHandlers[tag] = handler;
  },
  overrideValidator: function overrideValidator(tag, handler) {
    validatorHandlers[tag] = handler;
  },
  getValidatorTag: function getValidatorTag(op) {
    return mapOfValidators[op];
  },
  getValidator: function getValidator(tag) {
    return validatorHandlers[tag];
  },
  getProcessorTagAndType: function getProcessorTagAndType(op) {
    return mapOfProcessors[op];
  },
  getProcessor: function getProcessor(tag) {
    return processorHandlers[tag];
  },
  loadMessages: function loadMessages(messages) {
    return config.messages = messages;
  }
};
module.exports = config;
//# sourceMappingURL=config.js.map