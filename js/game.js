var Game = {

  turnsCompleted: 0,

  initialize: function() {
    this.playedCombinations = [];
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

  determineWinner: function() {
    var highScore = this.players.reduce(function(previousPlayer, player) {
      if (player.score > previousPlayer.score) {
        return player.score;
      } else {
        return previousPlayer.score;
      }
    });
    this.winners = this.players.filter(function(player)  {
      return player.score === highScore;
    });
  },

  isOver: function() {
    return this.turnsCompleted === this.players.length * 13;
  }
};