describe('Turn', function() {
  var turn;

  beforeEach(function() {
    turn = Object.create(Turn);
    turn.initialize();
  });

  it('is initialized with five dice', function() {
    turn.dice.length.should.equal(5);
  });

  it('starts with the dice rolled zero times', function() {
    turn.numberOfRolls.should.equal(0);
  });

  describe('rollDice', function() {
    it('rolls the dice', function() {
      var spy = sinon.spy(Die, "roll");
      turn.rollDice();
      spy.callCount.should.equal(5);
      Die.roll.restore();
    });
  });

  it('adds one to the numberOfRolls each dice roll', function() {
    turn.rollDice();
    turn.numberOfRolls.should.equal(1);
  });

  describe('rerollDice', function() {
    it('rerolls the selected die', function() {
      var spy = sinon.spy(Die, "roll");
      turn.rerollDice([turn.dice[0], turn.dice[3]]);
      spy.callCount.should.equal(2);
      Die.roll.restore();
    });

    it('adds one to the number of rolls', function() {
      turn.rerollDice([turn.dice[0]]);
      turn.numberOfRolls.should.equal(1);
    });
  });

  describe('score', function() {
    it('gets the score for the selected dice', function() {
      turn.dice.forEach(function(die) {
        die.value = 5;
      });
      turn.score(turn.dice);
      turn.score.should.equal(50);
    });
  });
});










