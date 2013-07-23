$(document).ready(function() {
	var player1 = new Player("first_player");
	var player2 = new Player("second_player");

	var game = new Game(player1, player2);
	game.start();

	$(document).on('keyup', function(event) {
    game.onKeyUp(event.which);
  });
});