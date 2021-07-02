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
        
        let transformed = JES.evaluate(obj, {'|>$div': 2 });
        //console.log(transformed)
        transformed.should.be.eql(
            { id: 0.5, user: 50, agency: 0.5, ':user': NaN, ':agency': NaN }
  
        );
    });



    it('array', function () {
        let array = [1,2,3];
        
        let transformed = JES.evaluate(array, {'|>$div': 2 });
        //console.log(transformed)
        transformed.should.be.eql(
            [ 0.5, 1, 1.5 ]
  
        );
    });


    it('num', function () {
        let num = 1;
        
        let transformed = JES.evaluate(num, {'$div': 2 });
        //console.log(transformed)
        transformed.should.be.eql(
            0.5
  
        );
    });



});
