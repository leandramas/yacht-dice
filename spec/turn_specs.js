describe('Turn', function() {

  it('starts with the dice rolled zero times', function() {
    var turn = Object.create(Turn);
    turn.numberOfRolls.should.equal(0);
  });

  it('adds one to the numberOfRolls each dice roll', function() {
    var turn = Object.create(Turn);
    var die = Object.create(Die);
    turn.rollDice(die);
    turn.numberOfRolls.should.equal(1);
  });

  it('has five rolled dice', function() {
    var turn = Object.create(Turn);
    var die = Object.create(Die);
    sinon.stub(Die, 'roll').returns(6);
    turn.rollDice(die);
    turn.rolls.should.eql([6, 6, 6, 6, 6]);
    Die.roll.restore();
  });

  describe('rerollDice', function() {
    it('rerolls the selected die', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      sinon.stub(Die, 'roll').returns(6);
      turn.rollDice(die);
      Die.roll.restore();
      sinon.stub(Die, 'roll').returns(1);
      turn.rerollDice(die, [0, 2, 4]);
      Die.roll.restore();
      turn.rolls.should.eql([1, 6, 1, 6, 1]);
    });

    it('adds one to the number of rolls', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      turn.rollDice(die);
      turn.rerollDice(die,[0]);
      turn.numberOfRolls.should.equal(2);
    });
  });
});