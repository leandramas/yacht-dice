describe('Die', function() {
  it('rolls a number between 1 and 6', function() {
    var die = Object.create(Die);
    sinon.stub(Math, 'random').returns(.98);
    die.roll();
    Math.random.restore();
    die.value.should.equal(6); 
  });
});