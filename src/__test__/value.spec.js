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
        
        let transformed = JES.evaluate(obj, '$values');
        //console.log(transformed)
        transformed.should.be.eql(
            [
                1,
                100,
                1,
                { email: 'email1', other: 'any' },
                { name: 'agency1', other: 'any' }
              ]
        );
    });


    it('array', function () {
        let array = [1,2,3];
        
        let transformed = JES.evaluate(array, '$values');
        //console.log(transformed)
        transformed.should.be.eql(
            [ 1, 2, 3 ]
        );
    });




});
