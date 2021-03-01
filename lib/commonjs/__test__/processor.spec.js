"use strict";

var JES = require('../index');

describe('jes:processor', function () {
  it('eval', function () {
    var obj = {
      key1: 2000,
      key11: 2000,
      key12: 2000,
      key13: 2000
    };
    var jeso = new JES(obj);
    var pipelined = jeso.evaluate([{
      '|>$add': 100
    }, {
      '|>$subtract': 200
    }, '$sum']);
    pipelined.should.be.exactly(7600);
    jeso.value.should.be.eql(obj);
    jeso.update({
      key1: {
        $add: 100
      },
      key11: {
        $subtract: 100
      },
      key12: {
        $multiply: 100
      },
      key13: {
        $divide: 100
      }
    }).value.should.be.eql({
      key1: 2100,
      key11: 1900,
      key12: 200000,
      key13: 20
    });
    jeso.update(['$sum', {
      $add: 1
    }]).value.should.be.exactly(204021);
  });
  it('eval array', function () {
    var obj = {
      keep: 'keep',
      items: [{
        name: 'Jack',
        score: 60
      }, {
        name: 'Bob',
        score: 40
      }, {
        name: 'Jane',
        score: 80
      }, {
        name: 'Peter',
        score: 100
      }],
      ignored: 'ingored',
      exlcluded: 'exlcluded'
    };
    var jeso = new JES(obj);
    var pipelined = jeso.evaluate({
      keep: true,
      excluded: false,
      newItem: {
        $set: 'new'
      },
      highestScore: ['$$CURRENT.items', {
        $sortBy: 'score'
      }, '$reverse', {
        $nth: 0
      }, {
        $of: 'score'
      }]
    });
    should.exist(pipelined.keep);
    should.exist(pipelined.newItem);
    should.exist(pipelined.highestScore);
    should.not.exist(pipelined.exlcluded);
    should.not.exist(pipelined.items);
    should.not.exist(pipelined.ignored);
    pipelined.newItem.should.be.exactly('new');
    pipelined.highestScore.should.be.exactly(100);
  });
  it('transform collection', function () {
    var array = [{
      'user': 100,
      'agency': 1,
      ':user': {
        email: 'email1',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'user': 101,
      'agency': 1,
      ':user': {
        email: 'email2',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'user': 102,
      'agency': 1,
      ':user': {
        email: 'email3',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'user': 103,
      'agency': 2,
      ':user': {
        email: 'email4',
        other: 'any'
      },
      ':agency': {
        name: 'agency2',
        other: 'any'
      }
    }, {
      'user': 104,
      'agency': 2,
      ':user': {
        email: 'email5',
        other: 'any'
      },
      ':agency': {
        name: 'agency2',
        other: 'any'
      }
    }];
    var transformed = JES.evaluate(array, {
      '|>$apply': {
        user: ['$$CURRENT.:user', {
          $pick: ['email']
        }],
        agency: ['$$CURRENT.:agency', {
          $pick: ['name']
        }]
      }
    });
    transformed.should.be.eql([{
      user: {
        email: 'email1'
      },
      agency: {
        name: 'agency1'
      }
    }, {
      user: {
        email: 'email2'
      },
      agency: {
        name: 'agency1'
      }
    }, {
      user: {
        email: 'email3'
      },
      agency: {
        name: 'agency1'
      }
    }, {
      user: {
        email: 'email4'
      },
      agency: {
        name: 'agency2'
      }
    }, {
      user: {
        email: 'email5'
      },
      agency: {
        name: 'agency2'
      }
    }]);
  });
  it('transform collection - merge', function () {
    var array = [{
      'user': 100,
      'agency': 1,
      ':user': {
        email: 'email1',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'user': 101,
      'agency': 1,
      ':user': {
        email: 'email2',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'user': 102,
      'agency': 1,
      ':user': {
        email: 'email3',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'user': 103,
      'agency': 2,
      ':user': {
        email: 'email4',
        other: 'any'
      },
      ':agency': {
        name: 'agency2',
        other: 'any'
      }
    }, {
      'user': 104,
      'agency': 2,
      ':user': {
        email: 'email5',
        other: 'any'
      },
      ':agency': {
        name: 'agency2',
        other: 'any'
      }
    }];
    var transformed = JES.evaluate(array, {
      '|>$apply': {
        $merge: [{
          $pick: {
            $not: {
              $startWith: ':'
            }
          }
        }, {
          '@user': ['$$CURRENT.:user', {
            $pick: ['email']
          }],
          '@agency': ['$$CURRENT.:agency', {
            $pick: ['name']
          }]
        }]
      }
    });
    transformed.should.be.eql([{
      'user': 100,
      'agency': 1,
      '@user': {
        email: 'email1'
      },
      '@agency': {
        name: 'agency1'
      }
    }, {
      'user': 101,
      'agency': 1,
      '@user': {
        email: 'email2'
      },
      '@agency': {
        name: 'agency1'
      }
    }, {
      'user': 102,
      'agency': 1,
      '@user': {
        email: 'email3'
      },
      '@agency': {
        name: 'agency1'
      }
    }, {
      'user': 103,
      'agency': 2,
      '@user': {
        email: 'email4'
      },
      '@agency': {
        name: 'agency2'
      }
    }, {
      'user': 104,
      'agency': 2,
      '@user': {
        email: 'email5'
      },
      '@agency': {
        name: 'agency2'
      }
    }]);
  });
  it('pick & omit by jes', function () {
    var array = [{
      'id': 1,
      'user': 100,
      'agency': 1,
      ':user': {
        email: 'email1',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'id': 2,
      'user': 101,
      'agency': 1,
      ':user': {
        email: 'email2',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'id': 3,
      'user': 102,
      'agency': 1,
      ':user': {
        email: 'email3',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'id': 4,
      'user': 103,
      'agency': 2,
      ':user': {
        email: 'email4',
        other: 'any'
      },
      ':agency': {
        name: 'agency2',
        other: 'any'
      }
    }, {
      'id': 5,
      'user': 104,
      'agency': 2,
      ':user': {
        email: 'email5',
        other: 'any'
      },
      ':agency': {
        name: 'agency2',
        other: 'any'
      }
    }];
    var transformed = JES.evaluate(array, {
      '|>$apply': [{
        $pick: {
          $not: {
            $startWith: ':'
          }
        }
      }, {
        $addItem: ['$test', '$$CURRENT.id']
      }, {
        $omit: ['id']
      }]
    });
    transformed.should.be.eql([{
      user: 100,
      agency: 1,
      $test: 1
    }, {
      user: 101,
      agency: 1,
      $test: 2
    }, {
      user: 102,
      agency: 1,
      $test: 3
    }, {
      user: 103,
      agency: 2,
      $test: 4
    }, {
      user: 104,
      agency: 2,
      $test: 5
    }]);
  });
  it('filter', function () {
    var array = [{
      'id': 1,
      'user': 100,
      'agency': 1,
      ':user': {
        email: 'email1',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'id': 2,
      'user': 101,
      'agency': 1,
      ':user': {
        email: 'email2',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'id': 3,
      'user': 102,
      'agency': 1,
      ':user': {
        email: 'email3',
        other: 'any'
      },
      ':agency': {
        name: 'agency1',
        other: 'any'
      }
    }, {
      'id': 4,
      'user': 103,
      'agency': 2,
      ':user': {
        email: 'email4',
        other: 'any'
      },
      ':agency': {
        name: 'agency2',
        other: 'any'
      }
    }, {
      'id': 5,
      'user': 104,
      'agency': 2,
      ':user': {
        email: 'email5',
        other: 'any'
      },
      ':agency': {
        name: 'agency2',
        other: 'any'
      }
    }];
    var transformed = JES.evaluate(array, [{
      $select: {
        user: {
          $gte: 102
        }
      }
    }, {
      '|>$omit': {
        $startWith: ':'
      }
    }]);
    transformed.should.be.eql([{
      id: 3,
      user: 102,
      agency: 1
    }, {
      id: 4,
      user: 103,
      agency: 2
    }, {
      id: 5,
      user: 104,
      agency: 2
    }]);
  });
  it('if', function () {
    var obj = {
      key1: 1
    };
    var jeso = new JES(obj);
    jeso.evaluate({
      $if: [{
        key1: {
          $gt: 0
        }
      }, {
        $set: 'positive'
      }, {
        $set: 'non-positive'
      }]
    }).match('positive');
  });
});
//# sourceMappingURL=processor.spec.js.map