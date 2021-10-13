import JES from '../index';

describe('jes:join', function () {
    it('array', function () {
        let array = ['a', 'b', 'c'];

        let transformed = JES.evaluate(array, { $join: '|' });
        //console.log(transformed)
        transformed.should.be.eql('a|b|c');
    });
});
