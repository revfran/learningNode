var assert = require('chai').assert;
var expect = require('chai').expect;
describe('Array', function() {
  context('#indexOf()', function() {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });

    it('should return -1 when the value is not present expect', () => {
        assert.equal([1, 2, 3].indexOf(4), -1);
        expect([1, 2, 3].indexOf(4),'Just some values').to.be.equal(-1);
      });
  }
  
  );
});