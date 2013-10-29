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

  rerollDice: function(diceIndexes) {
    var dice = this.dice;
    diceIndexes.forEach(function(index) {
      dice[index].roll();
    });
    this.numberOfRolls++;
  },

  end: function(selectedDice) {
    var combination = Object.create(Combination);
    var diceValues = selectedDice.map(function(die) {
      die.value;
    });
    combination.addDice(diceValues);
    this.score = combination.scoreDice();
  }
};
