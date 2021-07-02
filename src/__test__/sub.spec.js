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
         
         let transformed = JES.evaluate(obj, {'|>$sub': 2 });
         //console.log(transformed)
         transformed.should.be.eql(
             { id: -1, user: 98, agency: -1, ':user': NaN, ':agency': NaN }
   
         );
     });
 
 
 
     it('array', function () {
         let array = [1,2,3];
         
         let transformed = JES.evaluate(array, {'|>$sub': 2 });
         //console.log(transformed)
         transformed.should.be.eql(
             [ -1, 0, 1 ]
   
         );
     });
 
 
     it('num', function () {
         let num = 1;
         
         let transformed = JES.evaluate(num, {'$sub': 2 });
         //console.log(transformed)
         transformed.should.be.eql(
             -1
   
         );
     });
 
 




});
