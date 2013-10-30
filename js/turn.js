var Turn = {
  numberOfRolls: 0,

  initialize: function() {
    this.dice = [];
    for (var i = 0; i < 5; i++) {
      this.dice.push(Object.create(Die));
    }
  },

  rollDice: function() {
    this.dice.forEach(function(die) {
      die.roll();
    });
    this.numberOfRolls++;
  },

  rerollDice: function(dice) {
    dice.forEach(function(die) {
      die.roll();
    });
    this.numberOfRolls++;
  },

  score: function(selectedDice) {
    this.playedCombination = Object.create(Combination);
    var diceValues = selectedDice.map(function(die) {
      return die.value;
    });
    this.playedCombination.addDice(diceValues);
    this.score = this.playedCombination.scoreDice();
  }
};
