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
};
