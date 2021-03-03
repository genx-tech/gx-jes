"use strict";

var JES = require('../index');

var _require = require('@genx/data'),
    Types = _require.Types;

describe('jes:extension', function () {
  it('sanitize', function () {
    var obj = {
      'intKey': 100,
      'strKey': 'string',
      'arrayKey': [{
        key1: 'value1',
        key2: '0'
      }, {
        key1: 'value2',
        key2: '1'
      }],
      'objKey': {
        'objKey2': {
          intKey: 1,
          boolKey: 'true'
        }
      }
    };
    var schema = {
      'intKey': {
        type: 'integer'
      },
      'intKey2': {
        type: 'integer',
        optional: true,
        'default': 200
      },
      'strKey': {
        type: 'text'
      },
      'arrayKey': {
        type: 'array',
        'elementSchema': {
          type: 'object',
          schema: {
            key1: {
              type: 'text'
            },
            key2: {
              type: 'boolean'
            }
          }
        }
      },
      'objKey': {
        type: 'object',
        schema: {
          'objKey2': {
            type: 'object',
            schema: {
              intKey: {
                type: 'integer'
              },
              boolKey: {
                type: 'boolean'
              }
            }
          }
        }
      }
    };
    JES.config.addProcessorToMap(['$sanitize'], 'OP_SANITIZE', function (left, right) {
      return Types.OBJECT.sanitize(left, {
        schema: right
      });
    });
    var sanitized = JES.evaluate(obj, {
      $sanitize: schema
    });
    var expected = {
      intKey: 100,
      intKey2: 200,
      strKey: 'string',
      arrayKey: [{
        key1: 'value1',
        key2: false
      }, {
        key1: 'value2',
        key2: true
      }],
      objKey: {
        objKey2: {
          intKey: 1,
          boolKey: true
        }
      }
    };
    sanitized.should.be.eql(expected);
  });
});
//# sourceMappingURL=extension.spec.js.map