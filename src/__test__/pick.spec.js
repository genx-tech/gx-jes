import JES from '..';

describe('jes:processor', function () {
    it('obj', function () {
        let obj = {
            'id': 1,
            'user': 100,
            'agency': 1,
            ':user': { email: 'email1', other: 'any' },
            ':agency': { name: 'agency1', other: 'any' },
        };

        let transformed = JES.evaluate(obj, { $pick: 'id' });
        //console.log(transformed)
        transformed.should.be.eql({ id: 1 });
    });

    it('array', function () {
        let array = [
            {
                'id': 1,
                'user': 100,
                'agency': 1,
                ':user': { email: 'email1', other: 'any' },
                ':agency': { name: 'agency1', other: 'any' },
            },
        ];

        let transformed = JES.evaluate(array, { '|>$pick': 'id' });
        //console.log(transformed)
        transformed.should.be.eql([{ id: 1 }]);
    });

    it('pickBy', function () {
        let obj = {
            'id': 1,
            'user': 100,
            'agency': 1,
            ':user': { email: 'email1', other: 'any' },
            ':agency': { name: 'agency1', other: 'any' },
        };

        let transformed = JES.evaluate(obj, { $pick: { $endsWith: 'cy' } });
        //console.log(transformed)
        transformed.should.be.eql({
            'agency': 1,
            ':agency': { name: 'agency1', other: 'any' },
        });
    });
});
