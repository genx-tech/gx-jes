import JES from '../index';

describe('jes:processor', function () {


    it('json', function () {
        let json = '{"one": 1}';

        
        let transformed = JES.evaluate(json, '$object');
        //console.log(transformed)
        transformed.should.be.eql(
            {one :1}
        );
    });



});
