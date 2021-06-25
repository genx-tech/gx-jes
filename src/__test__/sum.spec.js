import JES from '../index';

describe('jes:processor', function () {
 

    it('obj', function () {
        let obj = {
            'id': 1,
            'user': 100,
            'agency': 1
        };
        
        let transformed = JES.evaluate(obj, '$sum');
        //console.log(transformed)
        transformed.should.be.eql(
           102
        );
    });


    it('array', function () {
        let array = [1,2,3];
        
        let transformed = JES.evaluate(array, '$sum');
        //console.log(transformed)
        transformed.should.be.eql(
            6
        );
    });




});
