var Combination = {
  
  addDice: function(dice) {
    this.dice = dice.sort();
  },

  scoreDice: function() {
    if (!this.dice || this.dice.length < 3) {
      this.score = 0;
    } else if (this.dice.length == 5) {
      this._scoreFiveDice();
    } else if (this.dice.length == 4) {
      this._scoreFourDice();
    } else if (this.dice.length == 3) {
      this._scoreThreeDice();
    }
    return this.score;
  },

  _scoreFiveDice: function() {
    if (this._allMatching()) {
      this.score = 50;
    } else if (this._isStraight()) {
      this.score = 40;
    } else if (this._isFullHouse()) {
      this.score = 25;
    } else {
      this.score = 0;
    }
  },

  _scoreFourDice: function() {
    if (this._isStraight()) {
      this.score = 30;
    } else if (this._allMatching()) {
      this.score = this.dice[0] * 4;
    } else {
      this.score = 0;
    }
  },

  _scoreThreeDice: function() {
    if (this._allMatching()) {
      this.score = this.dice[0] * 3;
    } else {
      this.score = 0;
    }
  },

  _allMatching: function() {
    return (this.dice[0] ===  this.dice[this.dice.length - 1]);
  },

  _isFullHouse: function() {
    return ((this.dice[0] === this.dice[2] && this.dice[3] === this.dice[4] && this.dice[1] !== this.dice[3]) || (this.dice[0] === this.dice[1] && this.dice[2] === this.dice[4] && this.dice[1] !== this.dice[3]));
  },

  _isStraight: function() {
    var straight = true;
    this.dice.reduce(function(previousRoll, currentRoll) {
      if (previousRoll !== currentRoll - 1) {
        straight = false;
      }
      return currentRoll;
    });
    return straight;
  },
}