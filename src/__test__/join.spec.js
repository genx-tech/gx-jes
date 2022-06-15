import JES from '..';

describe('transformer:join', function () {
    it('array', function () {
        let array = ['a', 'b', 'c'];

        let transformed = JES.evaluate(array, { $join: '|' });
        //console.log(transformed)
        transformed.should.be.eql('a|b|c');
    });

    it('string', function () {
        let array = 'abc';

        should.throws(
            () => JES.evaluate(array, { $join: '|' }),
            'The value to take a "Join" operator must be an array.'
        );
    });
});
