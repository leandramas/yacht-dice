describe('compareArrays', function() {
  it('returns false if the array lengths are not equal', function() {
    var array1 = [1, 2, 3];
    var array2 = [1];
    compareArrays(array1, array2).should.be.false;
  });

  it("returns true if the arrays are the same", function() {
    var array1 = [1, 2, 3];
    var array2 = [1, 2, 3];
    compareArrays(array1, array2).should.be.true;
  });

  it("returns false if the arrays have the same length but are not identical", function() {
    var array1 = [1, 2, 3, 4];
    var array2 = [2, 3, 4, 5];
    compareArrays(array1, array2).should.be.false;
  });
});

































