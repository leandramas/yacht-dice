var Turn = {
  numberOfRolls: 0,

  rollDice: function(die) {
    this.rolls = [die.roll(), die.roll(), die.roll(), die.roll(), die.roll()];
    this.numberOfRolls = 1;
  },

  rerollDice: function(die, diceToReroll) {
    var diceRolls = this.rolls;
    diceToReroll.forEach(function(dieIndex) {
      diceRolls[dieIndex] = die.roll();
    });  
    this.numberOfRolls++; 
  },

  evaluateRolls: function() {
    this.sortRolls();
    if (this.isFiveOfKind()) {
      return 50;
    } else if (this.isFourOfKind()) {
      return this.sortedRolls[2] * 4;
    } else if (this.isStraight()) {
      return 40;
    } else if (this.isFullHouse()) {
      return 25;
    } else if (this.isThreeOfKind()) {
      return this.sortedRolls[2] * 3;
    } else if (this.isSmallStraight()) {
      return 30;
    } else {
      return 0;
    }
  },

  getPlayedCombination: function() {
    this.sortRolls();
    this.playedCombination = [];
    if (this.isFiveOfKind()) {
      this.playedCombination = this.sortedRolls;
    } else if (this.isFourOfKind()) {
      var scoringDieValue = this.sortedRolls[2];
      this.playedCombination = [scoringDieValue, scoringDieValue, scoringDieValue, scoringDieValue];
    } else if (this.isStraight()) {
      this.playedCombination = this.sortedRolls;
     } else if (this.isFullHouse()) {
      this.playedCombination = this.sortedRolls;
    } else if (this.isThreeOfKind()) {
      var scoringDieValue = this.sortedRolls[2];
      this.playedCombination = [scoringDieValue, scoringDieValue, scoringDieValue];
    } else if (this.isSmallStraight()) {
      this.sortedRolls.reduce(function(previousRoll, currentRoll) {
        if (previousRoll === currentRoll + 1){
          this.playedCombination.push(currentRoll);
        }
        return currentRoll;
      });
    } else {
      this.playedCombination.push(0);
    }
    return this.playedCombination;
  },

  isFiveOfKind: function() {
    return (this.sortedRolls[0] === this.sortedRolls[4]);
  },

  isFourOfKind: function() {
    return (this.sortedRolls[0] === this.sortedRolls[3] || this.sortedRolls[1] === this.sortedRolls[4]);
  },

  isStraight: function() {
    return compareArrays(this.sortedRolls, [1, 2, 3, 4, 5]) || compareArrays(this.sortedRolls, [2, 3, 4, 5, 6]);
  },

  isFullHouse: function() {
    return ((this.sortedRolls[0] === this.sortedRolls[2] && this.sortedRolls[3] === this.sortedRolls[4] && this.sortedRolls[1] !== this.sortedRolls[3]) || (this.sortedRolls[0] === this.sortedRolls[1] && this.sortedRolls[2] === this.sortedRolls[4] && this.sortedRolls[1] !== this.sortedRolls[3]));
  },

  isThreeOfKind: function() {
    if (this.isFiveOfKind() || this.isFourOfKind() || this.isFullHouse()) {
      return false;
    } else {
      return((this.sortedRolls[1] === this.sortedRolls[3]) || (this.sortedRolls[0] === this.sortedRolls[2]) || (this.sortedRolls[2] === this.sortedRolls[4]));
    }
  }, 

  isSmallStraight: function() {
    var straightLength = 1;
    this.sortedRolls.reduce(function(previousRoll, currentRoll) {
      if (currentRoll === previousRoll + 1) {
        straightLength++;
      } else if (straightLength !== 4 && currentRoll !== previousRoll + 1 && currentRoll !== previousRoll) {
        straightLength--;
      }
      return currentRoll;
    });
    return straightLength === 4;
  },

  sortRolls: function() {
    this.sortedRolls = this.rolls.sort();
  }
};
