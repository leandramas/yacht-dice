describe('Turn', function() {
  it('is initialized with five dice', function() {
    var turn = Object.create(Turn);
    turn.initialize();
    turn.dice.length.should.equal(5);
  });

  it('starts with the dice rolled zero times', function() {
    var turn = Object.create(Turn);
    turn.initialize();
    turn.numberOfRolls.should.equal(0);
  });

  describe('rollDice', function() {
    it('rolls the dice', function() {
      var turn = Object.create(Turn);
      turn.initialize();
      turn.rollDice();
      turn.dice.forEach(function(die) {
        die.value.should.exist;
      });
    });
  });

  it('adds one to the numberOfRolls each dice roll', function() {
    var turn = Object.create(Turn);
    turn.initialize();
    turn.rollDice();
    turn.numberOfRolls.should.equal(1);
  });

  describe('rerollDice', function() {
    it('rerolls the selected die', function() {
      var turn = Object.create(Turn);
      turn.initialize();
      turn.rerollDice([0]);
      turn.dice[0].value.should.exist;
    });

    it('adds one to the number of rolls', function() {
      var turn = Object.create(Turn);
      turn.initialize();
      turn.rerollDice([0]);
      turn.numberOfRolls.should.equal(1);
    });
  });

  describe('end', function() {
    it('gets the score for the selected dice', function() {
      var turn = Object.create(Turn);
      turn.initialize();
      turn.dice.forEach(function(die) {
        die.value = 5;
      });
      turn.end(turn.dice);
      turn.score.should.equal(50);
    });
  });
});










