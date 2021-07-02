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
        
        let transformed = JES.evaluate(obj, '$keys');
        //console.log(transformed)
        transformed.should.be.eql(
            [ 'id', 'user', 'agency', ':user', ':agency' ]
        );
    });


    it('array', function () {
        let array = [1,2,3];
        
        let transformed = JES.evaluate(array, '$keys');
        //console.log(transformed)
        transformed.should.be.eql(
            [ '0', '1', '2' ]
        );
    });




});
