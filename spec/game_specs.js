describe('Game', function() {  
  var game;

  beforeEach(function() {
    game = Object.create(Game);
    game.initialize();
  });

  it('starts with 0 turns completed', function() {
    game.turnsCompleted.should.equal(0);
  });

  describe("initialize", function() {
    it("it starts the game with no played combinations", function() {
      game.playedCombinations.should.eql([]);
    });
  });

  it('has players', function() {
    game.createPlayers(2);
    game.players.length.should.equal(2);
  });

  it('has a current player', function() {
    game.createPlayers(2);
    game.currentPlayer.id.should.equal(1);
  });

  it('has a winner', function() {
    game.createPlayers(2);
    game.players[0].addPoints(50);
    game.determineWinner();
    game.winners.should.eql([game.players[0]]);
  });

  it('is not over if each player has played less than 13 turns', function() {
    game.createPlayers(2);
    game.isOver().should.be.false;
  });

  it('is over if each player has played 13 turns', function() {
    game.createPlayers(2);
    game.turnsCompleted = 26;
    game.isOver().should.be.true;
  });

  describe('nextPlayer', function() {
    it('sets the next player in the player array as the current player', function() {

      game.createPlayers(2);
      game.nextPlayer();
      game.currentPlayer.id.should.equal(2);
    });
  });

  describe('addPlayedCombination', function() {
    it('adds a combination to the played combinations array', function() {
      game.addPlayedCombination([1, 1, 1]);
      game.playedCombinations.should.eql([[1, 1, 1]]);
    });
  });
  
  describe("combinationHasBeenPlayed", function() {
    it('returns true it the combination has been played', function() {
      game.addPlayedCombination([1, 1, 1]);
      game.combinationHasBeenPlayed([1, 1, 1]).should.equal.true;
    });

    it('returns false if the combination has not been played', function() {
      game.combinationHasBeenPlayed([1, 1, 1]).should.be.false;
    });
  });
});
