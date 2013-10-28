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

  describe('evaluateRolls', function() {
    it('returns 50 points if the rolled dice are five of a kind', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      sinon.stub(Die, 'roll').returns(5);
      turn.rollDice(die);
      Die.roll.restore();
      turn.evaluateRolls().should.equal(50);
    });

    it('returns the sum of the four dice if the rolled dice are four of a kind', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var fourOfKind = function() {
        timesRun++;
        if (timesRun < 5) {
          return 5;
        } else {
          return 3;
        }
      }
      sinon.stub(Die, 'roll', fourOfKind);
      turn.rollDice(die);
      Die.roll.restore();
      turn.evaluateRolls().should.equal(20);
    });

    it('returns 40 points if there are five sequential dice', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var straight = function() {
        timesRun++;
        return timesRun;
      }
      sinon.stub(Die, 'roll', straight);
      turn.rollDice(die);
      Die.roll.restore();
      turn.evaluateRolls().should.equal(40);
    });

    it('returns 25 points if the rolled dice are three of a kind and a pair', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var fullHouse = function() {
        timesRun++;
        if (timesRun < 4) {
          return 2;
        } else {
          return 3;
        }
      }
      sinon.stub(Die, 'roll', fullHouse);
      turn.rollDice(die);
      Die.roll.restore();
      turn.evaluateRolls().should.equal(25);
    });

    it('returns the sum of the three matching dice if the rolled dice have three of a kind', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var threeOfKind = function() {
        timesRun++;
        if (timesRun < 4) {
          return 2;
        } else {
          return timesRun;
        }
      }
      sinon.stub(Die, 'roll', threeOfKind);
      turn.rollDice(die);
      Die.roll.restore();
      turn.evaluateRolls().should.equal(6);
    });

    it('returns 30 points if the rolled dice have a small striaght', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var smallStraight = function() {
        timesRun++;
        if (timesRun <= 2) {
          return timesRun;
        } else {
          return timesRun - 1;
        }
      }
      sinon.stub(Die, 'roll', smallStraight);
      turn.rollDice(die);
      Die.roll.restore();
      turn.evaluateRolls().should.equal(30);
    });

    it('returns 0 points if the rolled dice do not fit any of the rolls listed above', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var noMatches = function() {
        timesRun++;
        if (timesRun === 1) {
          return 1;
        } else if (timesRun === 2) {
          return 3;
        } else if (timesRun === 5) {
          return 4;
        } else {
          return 6;
        }
      }
      sinon.stub(Die, 'roll', noMatches);
      turn.rollDice(die);
      Die.roll.restore();
      turn.evaluateRolls().should.equal(0);
    });
  });

  describe('getPlayedCombination', function() {
    it('sets the played combination for the turn to the five dice if the there is five of a kind', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      sinon.stub(Die, 'roll').returns(5);
      turn.rollDice(die);
      Die.roll.restore();
      turn.getPlayedCombination();
      turn.playedCombination.should.eql([5, 5, 5, 5, 5]);
    });

    it('sets the played combination for the turn to the four dice if the rolled dice are four of a kind', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var fourOfKind = function() {
        timesRun++;
        if (timesRun < 5) {
          return 5;
        } else {
          return 3;
        }
      }
      sinon.stub(Die, 'roll', fourOfKind);
      turn.rollDice(die);
      Die.roll.restore();
      turn.getPlayedCombination();
      turn.playedCombination.should.eql([5, 5, 5, 5]);  
    });

    it('sets the played combination for the turn to all five dice if there are five sequential dice', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var straight = function() {
        timesRun++;
        return timesRun;
      }
      sinon.stub(Die, 'roll', straight);
      turn.rollDice(die);
      Die.roll.restore();
      turn.getPlayedCombination();
      turn.playedCombination.should.eql([1, 2, 3, 4, 5]);
    });

    it('sets the played combination for the turn to the three matching dice if there is three of a kind', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var threeOfKind = function() {
        timesRun++;
        if (timesRun < 4) {
          return 2;
        } else {
          return timesRun;
        }
      }
      sinon.stub(Die, 'roll', threeOfKind);
      turn.rollDice(die);
      Die.roll.restore();
      turn.getPlayedCombination();
      turn.playedCombination.should.eql([2, 2, 2]);
    });

    it('sets played combination for the turn to the sorted rolls array if there is a full house', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var fullHouse = function() {
        timesRun++;
        if (timesRun < 4) {
          return 2;
        } else {
          return 3;
        }
      }
      sinon.stub(Die, 'roll', fullHouse);
      turn.rollDice(die);
      Die.roll.restore();
      turn.getPlayedCombination();
      turn.playedCombination.should.eql([2, 2, 2, 3, 3]);
    });

    it('sets the played combination for the turn to the four sequential dice if there is a small straight', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var smallStraight = function() {
        timesRun++;
        if (timesRun < 5) {
          return timesRun;
        } else {
          return 5;
        }
      }
      sinon.stub(Die, 'roll', smallStraight);
      turn.rollDice(die);
      Die.roll.restore();
      turn.getPlayedCombination();
      turn.playedCombination.should.eql[2, 3, 4, 5];
    });
  });
  
  describe('isFiveOfKind', function() {
    it('returns true if the rolled dice are five of a kind', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      sinon.stub(Die, 'roll').returns(5);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isFiveOfKind().should.be.true;
    });
  });

  describe('isFourOfKind', function() {
    it('returns true if the rolled dice are four of a kind', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var fourOfKind = function() {
        timesRun++;
        if (timesRun < 5) {
          return 5;
        } else {
          return 3;
        }
      }
      sinon.stub(Die, 'roll', fourOfKind);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isFourOfKind().should.be.true;
    });
  });

  describe('isStraight', function() {
    it('returns true if the rolled dice are a straight', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var straight = function() {
        timesRun++;
        return timesRun;
      }
      sinon.stub(Die, 'roll', straight);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isStraight().should.be.true;
    });

    it('returns false if the rolled dice are not a straight', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      sinon.stub(Die, 'roll').returns(6);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isStraight().should.be.false;
    });
  });

  describe('isFullHouse', function() {
    it('returns false if the rolled dice are not a full house', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      sinon.stub(Die, 'roll').returns(6);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isFullHouse().should.be.false;
    });

    it("returns true if the rolled dice are three of a kind and a pair", function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var fullHouse = function() {
        timesRun++;
        if (timesRun < 4) {
          return 2;
        } else {
          return 3;
        }
      }
      sinon.stub(Die, 'roll', fullHouse);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isFullHouse().should.be.true;
    });
  });

  describe('isThreeOfKind', function() {
    it('returns true if the rolled dice are three of a kind', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var threeOfKind = function() {
        timesRun++;
        if (timesRun < 4) {
          return 2;
        } else {
          return timesRun;
        }
      }
      sinon.stub(Die, 'roll', threeOfKind);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isThreeOfKind().should.be.true;
    });

    it("returns false if the rolled dice are five of a kind", function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      sinon.stub(Die, 'roll').returns(5);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isThreeOfKind().should.be.false;
    });

    it("returns false if the rolled dice are four of a kind", function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var fourOfKind = function() {
        timesRun++;
        if (timesRun < 5) {
          return 5;
        } else {
          return 3;
        }
      }
      sinon.stub(Die, 'roll', fourOfKind);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isThreeOfKind().should.be.false;
    });

    it("returns false if the rolled dice are a full house", function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var fullHouse = function() {
        timesRun++;
        if (timesRun < 4) {
          return 2;
        } else {
          return 3;
        }
      }
      sinon.stub(Die, 'roll', fullHouse);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isThreeOfKind().should.be.false;
    });

    it("returns false if the rolled dice are not three of a kind", function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var noMatches = function() {
        timesRun++;
        if (timesRun < 3) {
          return 2;
        } else if (timesRun === 3) {
          return 4;
        } else {
          return 6;
        }
      }
      sinon.stub(Die, 'roll', noMatches);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isThreeOfKind();
    });
  });

  describe('isSmallStraight', function() {
    it('returns true if the the rolled dice are a four sequential dice', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var smallStraight = function() {
        timesRun++;
        if (timesRun <= 2) {
          return timesRun;
        } else {
          return timesRun - 1;
        }
      }
      sinon.stub(Die, 'roll', smallStraight);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls(); 
      turn.isSmallStraight().should.be.true;
    });

    it('returns false if the rolled dice do not have four sequential dice', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      var timesRun = 0;
      var notSmallStraight = function() {
        timesRun++;
        if (timesRun < 3) {
          return timesRun;
        } else {
          return timesRun + 1;
        }
      }
      sinon.stub(Die, 'roll', notSmallStraight);
      turn.rollDice(die);
      Die.roll.restore();
      turn.sortRolls();
      turn.isSmallStraight().should.be.false;
    });

  });

  describe('sortRolls', function() {
    it('returns an array of dice rolls from lowest value to highest', function() {
      var turn = Object.create(Turn);
      var die = Object.create(Die);
      turn.rollDice(die);
      turn.rolls = [4, 3, 1, 6, 2];
      turn.sortRolls();
      turn.sortedRolls.should.eql([1, 2, 3, 4, 6]);
    });
  });
});