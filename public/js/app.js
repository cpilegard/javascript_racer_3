$(document).ready(function() {
	$('#submit').on('click', function(e) {
		e.preventDefault();
		var p1 = $('#p1').val();
		var p2 = $('#p2').val();

		$('#pregame').hide();
		$('.status').html('GO!').css('color', 'green');

		var player1 = new Player(p1);
		var player2 = new Player(p2);

		var game = new Game(player1, player2);
		game.render();
		game.log_players();

		$(document).on('keyup', function(event) {
	    game.onKeyUp(event.which);
	  });
	});
});