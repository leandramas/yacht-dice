$(function() {
  var game;
  var diceNames = {1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six'};
  var turn;
  
  $('.play').click(function() {
    $('.play').hide();
    startGame();
  });

  $('button#roll-dice').click(function() {
    turn = Object.create(Turn);
    turn.initialize();
    turn.rollDice();
    displayDice(turn);
    $(this).hide();
    $("#reroll-dice").show();
    $("#reroll-instructions").fadeIn();
  });

  $('button#reroll-dice').click(function() {
    var diceToReroll = getSelectedDice();
    turn.rerollDice(diceToReroll);
    displayDice(turn);
  });

  $('button#end-turn').click(function() {
    scoreTurn();   
    if (turn.score > 0) {
      game.currentPlayer.addPoints(turn.score);
      game.addPlayedCombination(turn.playedCombination);
      displayPlayedCombinations();
      alert("You scored: " + turn.score);
      displayScore(game.players);
    } else {
      alert("No points for you this round. Better luck next turn!");
    }
    endTurn();
  });

  $('.die').click(function() {
    $(this).toggleClass('selected');
  });

  function displayGame(game) {
    $('span#current-player-number').empty().append(game.currentPlayer.id);
    $('#game').fadeIn();
  }

  function displayDice(turn) {
    turn.dice.forEach(function(die, index) {
      $('span#die' + index).removeClass().addClass('die ' + diceNames[die.value]).attr('value', index);
    });
    $("#rerolls-remaining").empty().append(3 - turn.numberOfRolls);
    if (turn.numberOfRolls === 2) {
      $("#reroll-plural").empty();
    } else if (turn.numberOfRolls === 3) {
      $("#reroll-dice").hide();
      $("#reroll-plural").empty().append("s");
    } else {
      $("#reroll-plural").empty().append("s");
    }
  }

  function displayPlayedCombinations() {
    $('#display-played-combinations').children('.content').first().append("<div class='dice'></div>");
    game.playedCombinations[game.playedCombinations.length - 1].dice.forEach(function(dieValue) {
      $('#display-played-combinations').children('.content').first().children('.dice').last().append("<span class='die " + diceNames[dieValue] + "'></span>");
    });
  }

  function displayScore(players) {
    $('table#scores tbody').empty();
    players.forEach(function(player) {
      $('table#scores tbody').append("<tr>" + 
                                                       "<td>" +
                                                         "Player" + 
                                                         "<span class='insert-player-id'>" + player.id + "</span>" +
                                                       "</td>" + 
                                                       "<td>" +
                                                         "<span class='insert-player-score'>" + 
                                                           player.score +
                                                         "</span>" +
                                                       "</td>" +
                                                     "</tr>");
    });
  }

  function startGame() {
    game = Object.create(Game);
    var numberOfPlayers = prompt('How many players?');
    game.createPlayers(numberOfPlayers);
    game.initialize();
    displayScore(game.players);
    displayGame(game);
  }

  function getSelectedDice() {
    var selectedDice = [];
    $('.selected').each(function() {
      var dieIndex = $(this).attr('value');
      selectedDice.push(turn.dice[dieIndex]);
    });
    return selectedDice;
  }

  function scoreTurn() {
    var selectedDice = getSelectedDice();
    if (game.combinationHasBeenPlayed(selectedDice)) {
      alert('That combination has already been played this game. Please select a different combination.');
      scoreTurn();
    } else {
      turn.end(selectedDice);
    }
  }

  function endTurn() {
    game.turnsCompleted ++;
    $("#reroll-instructions").hide();
    $("#reroll-dice").hide();
    if (game.isOver()) {
      game.determineWinner();
      if (game.winners.length > 1) {
        alert("It's a tie!");
      } else {
        alert("Player " + game.winners[0].id + " won!");
      }
      $('button#play').empty().append('Play Again').show();
    } else {
      game.nextPlayer();
      $('span#current-player-number').empty().append(game.currentPlayer.id);
      $('#current-turn').empty().append(Math.floor(game.turnsCompleted/game.players.length + 1));
      $('button#roll-dice').show();
      for (var i = 0; i < 5; i++) {
        $('span#die' + i).removeClass().addClass('die void');
      }
    }
  }
});


















