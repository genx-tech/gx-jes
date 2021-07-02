import JES from '../index';

describe('jes:processor', function () {
 
    it('array', function () {
        let array = [{
            'id': 1,
            'user': 100,
            'agency': 1,
            ':user': { email: 'email1', other: 'any' },
            ':agency': { name: 'agency1', other: 'any' },
        }];
        
        let transformed = JES.evaluate(array, {'$addItem' : 5  });
        //console.log(transformed)
        transformed.should.be.eql(
            [
                {
                  id: 1,
                  user: 100,
                  agency: 1,
                  ':user': { email: 'email1', other: 'any' },
                  ':agency': { name: 'agency1', other: 'any' }
                },
                5
              ]
        );
    });


    it('array', function () {
        let array = [1,2,3];
        
        let transformed = JES.evaluate(array, {'$addItem' : 4 });
        //console.log(transformed)
        transformed.should.be.eql(
           [1,2,3,4]
        );
    });





});
