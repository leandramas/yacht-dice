$(function() {
  $(document).foundation();

  var game;
  var diceNames = {1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six'};
  
  $('.play').click(function() {    
    startGame();
  });

  $('button#roll-dice').click(function() {
    game.turn.rollDice();
    displayDice(game.turn);
    $(this).hide();
    $('#start-turn-instructions').hide();
    $("#reroll-dice").show();
    $("#reroll-instructions").fadeIn();
    $("#score-dice-instructions").fadeIn();
    $("#score-dice").show();
    $('#end-turn').show();
    $('#player-message').text('select dice to reroll.');
  });

  $('button#reroll-dice').click(function() {
    var diceToReroll = getSelectedDice();
    game.turn.rerollDice(diceToReroll);
    displayDice(game.turn);
  });

  $('button#score-dice').click(function() {
    scoreTurn();
  });

  $('button#end-turn').click(function() {
    if (confirmTurnEnd()) {
      scoreTurn();   
      updateScore();
      endTurn();
    }
  });

  function confirmTurnEnd() {
    var confirmation = true;
    if (game.turn.numberOfRolls < 3) {
      confirmation = confirm('You still can still reroll the dice. Are you sure you want to end your turn?');
    }

    if (confirmation && getSelectedDice().length === 0) {
      confirmation = confirm('You have not selected any dice. Are you sure you want to continue with ending your turn?');
    }

    return confirmation;
  }

  $('.die').click(function() {
    $(this).toggleClass('selected');
  });

  function displayGame(game) {
    $('span#current-player-number').text(game.currentPlayer.id);
    $('#game').fadeIn();
  }

  function displayDice(turn) {
    turn.dice.forEach(function(die, index) {
      $('span#die' + index).removeClass().addClass('die ' + diceNames[die.value]).attr('value', index);
    });
    $("#rerolls-remaining").text(3 - turn.numberOfRolls);
    if (turn.numberOfRolls === 2) {
      $("#reroll-plural").empty();
    } else if (turn.numberOfRolls === 3) {
      $("#reroll-dice").hide();
      $("#reroll-plural").text("s");
    } else {
      $("#reroll-plural").text("s");
    }
  }

  function displayPlayedCombinations() {
    $('#display-played-combinations').children('.content').append("<div class='dice'></div>");
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
    $('.play').hide();
    game = Object.create(Game);
    setPlayers();
    game.initialize();
    displayScore(game.players);
    displayGame(game);
    $('html, body').animate({scrollTop: $('#game').offset().top}, 2000);
  }

  function setPlayers() {
    var numberOfPlayers = prompt('How many players?');
    if (isNaN(numberOfPlayers) || numberOfPlayers > 5 || numberOfPlayers < 1) {
      alert('This game is for 1 - 5 players. Please enter a valid number of players.');
      setPlayers();
    } else {
      game.createPlayers(numberOfPlayers);
    } 
  }

  function getSelectedDice() {
    var selectedDice = [];
    $('.selected').each(function() {
      var dieIndex = $(this).attr('value');
      selectedDice.push(game.turn.dice[dieIndex]);
    });
    return selectedDice;
  }

  function scoreTurn() {
    var selectedDice = getSelectedDice();
    if (game.combinationHasBeenPlayed(selectedDice)) {
      alert('That combination has already been played this game. Please select a different combination.');
    } else {
      game.turn.score(selectedDice);
      alert('That combination is worth ' + game.turn.score + ' points.');
    }
  }

  function endTurn() {
    game.turnsCompleted ++;
    $("#reroll-instructions").hide();
    $("#reroll-dice").hide();
    $("#score-dice-instructions").hide();
    $("#score-dice").hide();
    $("#end-turn").hide();
    if (game.isOver()) {
      endGame();
    } else {
      game.nextPlayer();
      game.newTurn();
      $('span#current-player-number').text(game.currentPlayer.id);
      $("span#player-message").text("it's your turn!");
      $("#start-turn-instructions").show();
      $('#current-turn').text(Math.floor(game.turnsCompleted/game.players.length + 1));
      $('button#roll-dice').show();
      for (var i = 0; i < 5; i++) {
        $('span#die' + i).removeClass().addClass('die void');
      }
    }
  }

  function endGame() {
    var winners = game.getWinners();
    console.log(winners);
    if (winners.length > 1) {
      $('#winner-info').text("It's a tie!").fadeIn();
    } else {
      $('#winner-info').text("Player " + winners[0].id + " won!").fadeIn();
    }
    $('.play').text('Play Again').show();
    $('.board').hide();
    $('.player-information').hide();
  }

  function updateScore() {
    if (game.turn.score > 0) {
      game.currentPlayer.addPoints(game.turn.score);
      game.addPlayedCombination(game.turn.playedCombination);
      displayPlayedCombinations(); 
      displayScore(game.players);
    }
  }
});
