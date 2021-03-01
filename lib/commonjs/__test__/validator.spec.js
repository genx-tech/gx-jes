"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var JES = require('../index');

describe('jes:validator', function () {
  it('equal', function () {
    var obj = {
      key1: 2000,
      key2: 'ok',
      key3: {
        key1: 20,
        key2: 'ok'
      },
      key4: null,
      key5: false,
      key6: true
    };
    JES.match(obj, {
      key1: 2000,
      key2: 'ok',
      key3: {
        key1: 20,
        key2: 'ok'
      },
      key4: null,
      key5: false,
      key6: true
    }).should.be.eql([true]);
    var result = JES.match(obj, {
      key1: 2001
    });
    result[0].should.not.be.ok();
    result[1].should.be.match(/ should be 2001/);
    result = JES.match(obj, {
      key2: 'ng'
    });
    result[0].should.not.be.ok();
    result[1].should.be.match(/ should be "ng"/);
  });
  it('equal2', function () {
    var obj = {
      key1: [1, 2, 3],
      key2: [1]
    };
    JES.match(obj, {
      key1: [1, 2, 3],
      key2: [1]
    })[0].should.be.ok();
    JES.match(obj, {
      key1: [1, 2],
      key2: [1, 3]
    })[0].should.be.not.ok();
    JES.match(obj, {
      key1: [1, 2],
      key2: [1]
    })[0].should.be.not.ok();
  });
  it('mixed', function () {
    var obj = {
      key1: 2000,
      key11: 2000,
      key12: 2000,
      key13: 2000,
      key2: 'ok',
      key21: 'ok',
      key22: 'ok',
      key23: 'ok',
      key3: {
        key1: 20,
        key2: 'ok'
      },
      key4: null,
      key5: false,
      key6: true
    };
    JES.match(obj, {
      key1: {
        $gt: 1000
      },
      key11: {
        $gte: 2000
      },
      key12: {
        $lt: 3000
      },
      key13: {
        $lte: 2000
      },
      key2: {
        $eq: 'ok'
      },
      key21: {
        $neq: 'ng'
      },
      key22: {
        $in: ['ok', 'ng']
      },
      key23: {
        $nin: ['ng1', 'ng2']
      },
      key4: {
        $exists: false
      }
    }).should.be.eql([true]);
  });
  it('jes', function () {
    var obj = {
      key1: 2000,
      key11: 2000,
      key12: 2000,
      key13: 2000,
      key2: 'ok',
      key21: 'ok',
      key22: 'ok',
      key23: 'ok',
      key3: {
        key1: 20,
        key2: 'ok'
      },
      key4: null,
      key5: false,
      key6: true
    };
    var jeso = new JES(obj);
    jeso.match({
      key1: {
        $gt: 1000
      },
      key11: {
        $gte: 2000
      },
      key12: {
        $lt: 3000
      },
      key13: {
        $lte: 2000
      }
    }).match(_defineProperty({
      key2: {
        $eq: 'ok'
      },
      key21: {
        $neq: 'ng'
      },
      key22: {
        $in: ['ok', 'ng']
      },
      key23: {
        $nin: ['ng1', 'ng2']
      },
      key4: {
        $exists: false
      }
    }, "key2", {
      $is: 'string'
    })).match({
      key3: {
        key1: 20,
        key2: {
          $neq: 'ng'
        }
      }
    });
    should.throws(function () {
      jeso.match({
        key1: {
          $gt: 3000
        }
      });
    }, /"key1" should be greater than 3000/);
    should.throws(function () {
      jeso.match({
        key1: {
          $lt: 1000
        }
      });
    }, /"key1" should be less than 1000/);
    should.throws(function () {
      jeso.match({
        key1: {
          $in: [100, 200]
        }
      });
    }, 'ValidationError: "key1" should be one of [100,200].');
    should.throws(function () {
      jeso.match({
        key1: {
          $nin: [1000, 2000]
        }
      });
    }, 'ValidationError: "key1" should not be any one of [1000,2000].');
    should.throws(function () {
      jeso.match({
        key99: {
          $exist: true
        }
      });
    }, 'ValidationError: "key99" should not be NULL.');
    should.throws(function () {
      jeso.match({
        key1: {
          $exist: false
        }
      });
    }, 'ValidationError: "key1" should be NULL.');
    should.throws(function () {
      jeso.match({
        key1: {
          $is: 'string'
        }
      });
    }, 'ValidationError: The type of "key1" should be "string".');
    should.throws(function () {
      jeso.match({
        key3: {
          key2: 'ng'
        }
      });
    }, 'ValidationError: "key3.key2" should be "ng".');
  });
  it('any', function () {
    var obj = {
      key1: 2000,
      key11: 2000,
      key12: 2000,
      key13: 2000
    };
    var jeso = new JES(obj);
    jeso.match({
      $any: [{
        key1: 3000
      }, {
        key11: 2000
      }]
    });
    should.throws(function () {
      jeso.match({
        $any: [{
          key1: 3000
        }, {
          key11: 3000
        }]
      });
    }, 'ValidationError: The value should match any of these rules: [{"key1":3000},{"key11":3000}].');
  });
  it('matchWithQuery', function () {
    var obj = {
      key1: 2000,
      key11: 2000,
      key12: 2000,
      key13: 2000
    };
    var jeso = new JES(obj);
    jeso.match({
      $eval: ['$size', 4],
      key1: {
        $eval: ['$type', 'integer']
      }
    });
    jeso.match({
      $eval: [{
        '|>$add': 200
      }, {
        key1: 2200,
        key11: 2200,
        key12: 2200,
        key13: 2200
      }]
    });
    should.throws(function () {
      jeso.match({
        $eval: [{
          '|>$add': 200
        }, obj]
      });
    }, 'ValidationError: The query "_.each(->add(?)).key1" should be 2000, but 2200 given.');
    var a;
    typeof a === '';
    should.throws(function () {
      jeso.match({
        $eval: [['$keys', '$size'], {
          $neq: 4
        }]
      });
    }, 'ValidationError: The query "keys().size()" should not be 4, but 4 given.');
  });
});
//# sourceMappingURL=validator.spec.js.map