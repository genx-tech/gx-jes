const JES = require('../index');

describe('jes:validator', function () {
    it('equal', function () {
        let obj = {
            key1: 2000,
            key2: 'ok',
            key3: {
                key1: 20,
                key2: 'ok',
            },
            key4: null,
            key5: false,
            key6: true,
        };

        JES.match(obj, {
            key1: 2000,
            key2: 'ok',
            key3: {
                key1: 20,
                key2: 'ok',
            },
            key4: null,
            key5: false,
            key6: true,
        }).should.be.eql([true]);
        
        let result = JES.match(obj, {
            key1: 2001,
        });
        result[0].should.not.be.ok();
        result[1].should.be.match(/ should be 2001/);

        result = JES.match(obj, {
            key2: 'ng',
        });
        result[0].should.not.be.ok();
        result[1].should.be.match(/ should be "ng"/);
    });

    it('equal2', function () {
        let obj = {
            key1: [1, 2, 3],
            key2: [1],
        };

        JES.match(obj, {
            key1: [1, 2, 3],
            key2: [1],
        })[0].should.be.ok();

        JES.match(obj, {
            key1: [1, 2],
            key2: [1, 3],
        })[0].should.be.not.ok();

        JES.match(obj, {
            key1: [1, 2],
            key2: [1],
        })[0].should.be.not.ok();
    });
    
    it('mixed', function () {
        var c = {a:{b:10}};
        let obj = {
            key1: 2000,
            key11: 2000,
            key12: 2000,
            key13: 2000,

            key2: 'ok',
            key21: 'ok',
            key22: 'ok',
            key23: 'ok',
            key24: 'ok',
            key25: 1,

            key3: {
                key1: 20,
                key2: 'ok',
            },
            key4: null,
            key5: false,
            key6: true,
            key8: c,
        };

        JES.match(obj, {
            key1: { $gt: 1000 },
            key11: { $gte: 2000 },
            key12: { $lt: 3000 },
            key13: { $lte: 2000 },

            key2: { $eq: 'ok' },
            key21: { $neq: 'ng' },

            key22: { $in: ['ok', 'ng'] },
            key23: { $nin: ['ng1', 'ng2'] },
            key24: { $nin: null },
            key25: { $nin: null },

            key4: { $exists: false },
            
        }).should.be.eql([true]);

        JES.match(obj, {
            key1: { $hasKey: c.a.b },
            
        }).should.be.eql([ false, '"key1" should have all of these keys [10].' ]);

        JES.match(obj, {
            key1: { $in: null },
            
        }).should.be.eql([ false, '"key1" should be one of null, but 2000 given.' ]);
        JES.match(obj, {
            key8: { $hasKey: [10] },
            
        }).should.be.eql([ false, '"key8" should have all of these keys [10].' ]);
        
    });

    it('jes', function () {
        //var c = {a:{b:10}};
        let obj = {
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
                key2: 'ok',
            },
            key4: null,
            key5: false,
            key6: true,
            key7: [1,2,3],
            //key8: c,
        };

        const jeso = new JES(obj);
        jeso.match({
            key1: { $gt: 1000 },
            key11: { $gte: 2000 },
            key12: { $lt: 3000 },
            key13: { $lte: 2000 },
        })
            .match({
                key2: { $eq: 'ok' },
                key21: { $neq: 'ng' },

                key22: { $in: ['ok', 'ng'] },
                key23: { $nin: ['ng1', 'ng2'] },

                key4: { $exists: false },
                key2: { $is: 'string' },
                key7: { $is: 'array'},
                key1: { $is: 'integer'},
                
            })
            .match({
                key3: {
                    key1: 20,
                    key2: {
                        $neq: 'ng',
                    },
                },
            });
        
        const jeso_null = new JES(null);
        should.throws(() => {
            jeso_null.match({
                key1: { $is: 1 },
            });
        }, /The value should not be NULL./);
        
        const jeso_int = new JES("1213121233333312312312423412514325134253");
        should.throws(() => {
            jeso_int.match({
                key1: { $is: 1 },
            });
        }, /The type of The value should be "object", but "string" given./);



        should.throws(() => {
            jeso.match({
                key1: { $is: 1 },
            });
        }, /The operand of a "OP_TYPE" operator must be a string./);

        should.throws(() => {
            jeso.match({
                key1: { $is: 'string' },
            });
        }, /The type of "key1" should be "string", but 2000 given./);

        should.throws(() => {
            jeso.match({
                key4: { $exists: 3000 },
            });
        }, /The operand of a "OP_EXISTS" operator must be a boolean value./);

        should.throws(() => {
            jeso.match({
                key1: { $in: 3000 },
            });
        }, /The operand of a "OP_IN" operator must be an array./);

        should.throws(() => {
            jeso.match({
                key1: { $nin: 3000 },
            });
        }, /The operand of a "OP_NOT_IN" operator must be an array./);

        should.throws(() => {
            jeso.match({
                key1: { $gt: 3000 },
            });
        }, /"key1" should be greater than 3000/);

        should.throws(() => {
            jeso.match({
                key1: { $lt: 1000 },
            });
        }, /"key1" should be less than 1000/);

        should.throws(() => {
            jeso.match({
                key1: { $in: [100, 200] },
            });
        }, 'ValidationError: "key1" should be one of [100,200].');

        should.throws(() => {
            jeso.match({
                key1: { $nin: [1000, 2000] },
            });
        }, 'ValidationError: "key1" should not be any one of [1000,2000].');

        should.throws(() => {
            jeso.match({
                key99: { $exist: true },
            });
        }, 'ValidationError: "key99" should not be NULL.');

        should.throws(() => {
            jeso.match({
                key1: { $exist: false },
            });
        }, 'ValidationError: "key1" should be NULL.');

        should.throws(() => {
            jeso.match({
                key1: { $is: 'string' },
            });
        }, 'ValidationError: The type of "key1" should be "string".');

        should.throws(() => {
            jeso.match({
                key3: { key2: 'ng' },
            });
        }, 'ValidationError: "key3.key2" should be "ng".');
    });

    it('eval not array', function () {
        let obj = {
            key1: 2000,

        };

        let jeso = new JES(obj);

        should.throws(() => {
            jeso.match({
                $eval: 2000,
            });
        }, 'InvalidArgument: The operand of a "OP_MATCH_ANY" operator must be an array.');
        
    });

    it('any', function () {
        let obj = {
            key1: 2000,
            key11: 2000,
            key12: 2000,
            key13: 2000,
        };

        let jeso = new JES(obj);

        jeso.match({
            $any: [{ key1: 3000 }, { key11: 2000 }],
        });

        should.throws(() => {
            jeso.match({
                $any: [{ key1: 3000 }, { key11: 3000 }],
            });
        }, 'ValidationError: The value should match any of these rules: [{"key1":3000},{"key11":3000}].');
        
        should.throws(() => {
            jeso.match({
                $any: { key1: 3000 },
            });
        }, 'InvalidArgument: The operand of a "OP_MATCH_ANY" operator must be an array.');
        
    });

    it('matchWithQuery', function () {
        let obj = {
            key1: 2000,
            key11: 2000,
            key12: 2000,
            key13: 2000,
        };
        
        let jeso = new JES(obj);

        jeso.match({
            $eval: ['$size', 4],
            key1: {
                $eval: [ '$type', 'integer' ]
            },
        });
        should.throws(() => {
            jeso.match({
                $eval: 4,
                key1: {
                    $eval: [ '$type', 'integer' ]
                },
            });
        }, /The operand of a collection operator "OP_EVAL" must be a two-tuple./);
        

        jeso.match({
            $eval: [
                {
                    '|>$add': 200,
                },
                {
                    key1: 2200,
                    key11: 2200,
                    key12: 2200,
                    key13: 2200,
                },
            ],
        });

        should.throws(() => {
            jeso.match({
                $eval: [
                    {
                        '|>$add': 200,
                    },
                    obj,
                ],
            });
        }, 'ValidationError: The query "_.each(->add(?)).key1" should be 2000, but 2200 given.');

        let a;

        typeof a === ''

        should.throws(() => {
            jeso.match({
                $eval: [
                    ['$keys', '$size'],
                    {
                        $neq: 4,
                    },
                ],
            });
        }, 'ValidationError: The query "keys().size()" should not be 4, but 4 given.');
    });
    it('validateCollection', function () {
        let obj = {
            key1: 2000,
            key11111111111111: 2000,
            key12: 2000,
            key13: 2000,
        };
        
        let jeso = new JES(obj);
        
        should.throws(() => {
            jeso.match({
                $eval: [
                    {
                        '|>$add': 200,
                    },
                    {
                        '|>$add': 200,
                    },
                ],
            });
        }, 'InvalidArgument: Invalid validation operator "$add".');

        should.throws(() => {
            jeso.match({
                $eval: [
                    {
                        '|>$add': 200,
                    },
                    {
                        '$addd': 200,
                    },
                ],
            });
        }, 'InvalidArgument: Invalid validation operator "$add".');
        
        should.throws(() => {
            jeso.match(null);
        }, /The value should be null, but {"key1":2000,"key11111111111111":2000,"key12":2000,"key13":2000} given./);
//'|>$apply'
        
    });
    it('has', function () {
        let obj = {
            key1: 123,
            key2: 456
        };
        const jeso = new JES(obj);

        JES.match(obj, {
            key1: { $has: 123 },
            key2: { $has: 456 },
            
        }).should.be.eql([ true]);
    });
    it('match collection', function () {
        let array = [1,2,3,4,-1];
        

        let matched = JES.match(array, {
            '|*$gt': 0,
        });
        matched.should.be.eql([true]);

        let matched3 = JES.match(array, {
            '|*$gt': 10,
        });
        matched3.should.be.eql([false,'The value should be greater than 10, but [1,2,3,4,-1] given.']);
        let array2 = [11,12,13];
        
        
        let matched2 = JES.match(array2, {
            '|>$gt': 0,
        }).should.be.eql([true]);
       let matched4 = JES.match(array2, {
            '|>$gt': 20,
        }).should.be.eql([ false, '"[0]" should be greater than 20, but 11 given.' ]);
    });
});
