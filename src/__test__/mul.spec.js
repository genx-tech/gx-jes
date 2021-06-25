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
         
         let transformed = JES.evaluate(obj, {'|>$mul': 2 });
         //console.log(transformed)
         transformed.should.be.eql(
             { id: 2, user: 200, agency: 2, ':user': NaN, ':agency': NaN }
   
         );
     });
 
 
 
     it('array', function () {
         let array = [1,2,3];
         
         let transformed = JES.evaluate(array, {'|>$mul': 2 });
         //console.log(transformed)
         transformed.should.be.eql(
             [ 2, 4, 6 ]
   
         );
     });
 
 
     it('num', function () {
         let num = 1;
         
         let transformed = JES.evaluate(num, {'$mul': 2 });
         //console.log(transformed)
         transformed.should.be.eql(
             2
   
         );
     });
 
 


});
