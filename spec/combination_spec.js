describe('Combination', function() {
  var combination;

  beforeEach(function() {
    combination = Object.create(Combination);
  });

  it('has dice values that are sorted in accending value', function() {
    combination.addDice([3, 2, 1]);
    combination.dice.should.eql([1, 2, 3]);
  });

  describe('scoreDice', function() {
    it('assigns a score of 50 points if the dice are five of a kind', function() {
      combination.addDice([4, 4, 4, 4, 4]);
      combination.scoreDice().should.equal(50);;
    });

    it('assigns a score of 40 points if there are five sequential dice', function() {
      combination.addDice([2, 3, 1, 5, 4]);
      combination.scoreDice().should.equal(40);
    });

    it('assigns a score of 25 points if the dice are three of a kind and a pair', function() {
      combination.addDice([1, 5, 1, 5, 1]);
      combination.scoreDice().should.equal(25);
    });

    it('assigns a score of 30 points if there are four sequential dice', function() {
      combination.addDice([5, 3, 4, 2]);
      combination.scoreDice().should.equal(30);
    });

    it('assigns the a score equal to the sum of the dice if there are four of a kind', function() {
      combination.addDice([5, 5, 5, 5]);
      combination.scoreDice().should.equal(20);
    });

    it('assigns the score equal to the sum of the dice if there are three of a kind', function() {
      combination.addDice([1, 1, 1]);
      combination.scoreDice().should.equal(3);
    });

    it('assigns a score of 0 if no winning combination is found', function() {
      combination.addDice([1, 6, 4, 3, 1]);
      combination.scoreDice().should.equal(0);
    });

    it('assigns a score of 0 if there are less than 3 dice', function() {
      combination.addDice([1, 1]);
      combination.scoreDice().should.equal(0);
    });

    it('assigns a score of 0 if there are no dice', function() {
      combination.scoreDice().should.equal(0);
    });
  });
});
