$(function() {
  var game;
  var die = Object.create(Die);
  var diceNames = {1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six'};
  var turn;
  
  function displayDice(turn) {
    for (var i = 0; i < 5; i++) {
      $('span#die' + i).removeClass().addClass('die ' + diceNames[turn.rolls[i]]).attr('value', i);
    }
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

  function displayScore(players) {
    $('div#scoreboard-border').empty().append("<div id='scoreboard' class='small-" + players.length * 3 + " columns'></div>");
    var columnsPerPlayer = 12 /players.length;
    if (players.length > 4) {
      columnsPerPlayer = 3;
    }
    players.forEach(function(player) {
      $('div#scoreboard').append(
        '<div class="small-' + columnsPerPlayer + ' columns">' +
          '<p>Player <span class="insert-player-id">' + player.id + '</span>: <span class="insert-player-score">' + player.score + '</span></p>' +
        '</div>'
      );
    });
  }


  $('button#see-instructions').click(function() {
    $(this).fadeOut();
    $('div#instructions').toggle();
  });

  $('#hide-instructions').click(function() {
    $('div#instructions').fadeOut();
    $('button#see-instructions').fadeIn();
  });

  $('button#play').click(function() {
    game = Object.create(Game);
    var numberOfPlayers = prompt('How many players?');
    game.createPlayers(numberOfPlayers);
    displayScore(game.players);
    $('button#play').hide();
    $('button#see-instructions').hide();
    $('div#lead-paragraph').hide();
    $('div#instructions').fadeIn();
    $('span#current-player-number').empty().append(game.currentPlayer.id);
    $('#left-side-of-page').fadeIn();
  });

  $('button#end-turn').click(function() {
    var playedCombination = turn.getPlayedCombination();
    console.log(playedCombination);
    if (game.combinationHasBeenPlayed(playedCombination)) {
      alert("That combination has already been played in the game! You score 0 points.");
    } else {
      var points = turn.evaluateRolls();
      game.currentPlayer.addPoints(points);
      game.addPlayedCombination(playedCombination);
      alert("You scored: " + points);
      displayScore(game.players);
      game.turnsCompleted ++;
      $("#reroll-instructions").hide();
      $("#reroll-dice").hide();
      console.log(game.playedCombinations);
    }
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
  });

  $('.die').click(function() {
    $(this).toggleClass('selected');
  });

  $('button#roll-dice').click(function() {
    turn = Object.create(Turn);
    turn.rollDice(die);
    displayDice(turn);
    $(this).hide();
    $("#reroll-dice").show();
    $("#reroll-instructions").fadeIn();
  });

  $('button#reroll-dice').click(function() {
    var diceToReroll = [];
    $('.selected').each(function() {
      var dieNumber = $(this).attr('value');
      diceToReroll.push(dieNumber);
    });
    turn.rerollDice(die, diceToReroll);
    displayDice(turn);
  });
});


















