import JES from '../index';

describe('jes:processor', function () {
  

    it('obj', function () {
        let obj = {
            'id': 1,
            'user': 100,
            'agency': 1,
            ':user': { email: 'email1', other: 'any' },
            ':agency': { name: 'agency1', other: 'any' },
        };
        
        let transformed = JES.evaluate(obj, '$toArray');
        //console.log(transformed)
        transformed.should.be.eql([
            { key: 'id', value: 1 },
            { key: 'user', value: 100 },
            { key: 'agency', value: 1 },
            { key: ':user', value: { email: 'email1', other: 'any' } },
            { key: ':agency', value: { name: 'agency1', other: 'any' } }]

        );
    });


    it('array', function () {
        let array = [1,2,3];
        
        let transformed = JES.evaluate(array, '$toArray');
        //console.log(transformed)
        transformed.should.be.eql(
            [ { key: 0, value: 1 }, { key: 1, value: 2 }, { key: 2, value: 3 } ]
        
        );
    });

    it('num', function () {
        let num = 1;
        
        let transformed = JES.evaluate(num, '$toArray');
        //console.log(transformed)
        transformed.should.be.eql(
            [ ]
        
        );
    });




});
