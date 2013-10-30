describe('Player', function() {
  it('starts with a score of 0', function() {
    var player = Object.create(Player);
    player.score.should.equal(0);
  });

  it('adds points to score', function() {
    var player = Object.create(Player);
    player.addPoints(7);
    player.score.should.equal(7);
  });

  it('has an id', function() {
    var player = Object.create(Player);
    player.setId(1);
    player.id.should.equal(1);
  });
});
