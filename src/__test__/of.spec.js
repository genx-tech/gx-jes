import JES from '..';

describe('transformer:of', function () {
    it('obj', function () {
        let obj = {
            'id': 1,
            'user': 100,
            'agency': 1,
            ':user': { email: 'email1', other: 'any' },
            ':agency': { name: 'agency1', other: 'any' },
        };

        let transformed = JES.evaluate(obj, { $of: 'id' });
        //console.log(transformed)
        transformed.should.be.eql(1);
    });

    it('array', function () {
        let array = [10, 20, 30, 40];

        let transformed = JES.evaluate(array, { $of: '1' });
        //console.log(transformed)
        transformed.should.be.eql(20);
    });
});
