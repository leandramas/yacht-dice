var Game = {

  turnsCompleted: 0,

  initialize: function() {
    this.playedCombinations = [];
    this.newTurn();
  },

  addPlayedCombination: function(playedCombination) {
    this.playedCombinations.push(playedCombination);
  },

  combinationHasBeenPlayed: function(combinationToCheck) {
    return this.playedCombinations.some(function(playedCombination) {
      return compareArrays(combinationToCheck, playedCombination);
    });
  },

  createPlayers: function(numberOfPlayers) {
    this.players = [];
    for (var i = 0; i < numberOfPlayers; i++){
      var player = Object.create(Player);
      player.setId(i + 1);
      this.players.push(player);
    }
    this.currentPlayer = this.players[0];
  },

  nextPlayer: function() {
    if (this.currentPlayer.id === this.players.length) {
      this.currentPlayer = this.players[0];
    } else {
      this.currentPlayer = this.players[this.players.indexOf(this.currentPlayer) + 1];
    }
  },

  getWinners: function() {
    if (this.players.length < 2) {
      return this.players;
    } else {
      var highScore = this._highScore();
      return this.players.filter(function(player)  {
        return player.score === highScore;
      });
    }
  },

  isOver: function() {
    return this.turnsCompleted === this.players.length * 13;
  },

  newTurn: function() {
    this.turn = Object.create(Turn);
    this.turn.initialize();
  },

  _highScore: function() {
    return this.players.reduce(function(previousPlayer, player) {
      if (player.score > previousPlayer.score) {
        return player.score;
      } else {
        return previousPlayer.score;
      }
    });
  }
};