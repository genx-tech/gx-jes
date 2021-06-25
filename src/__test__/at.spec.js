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
        
        let transformed = JES.evaluate(array, {'$at' : 0});
        //console.log(transformed)
        transformed.should.be.eql(
            {
                id: 1,
                user: 100,
                agency: 1,
                ':user': { email: 'email1', other: 'any' },
                ':agency': { name: 'agency1', other: 'any' }
              }
        );
    });

    it.only('array', function () {
        let array = [1,2,3];
        
        let transformed = JES.evaluate(array, {'$at' : 0});
        //console.log(transformed)
        transformed.should.be.eql(
            1
        );
    });








});
