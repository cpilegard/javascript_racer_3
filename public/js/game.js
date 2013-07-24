// Game
function Game(player1, player2) {
	this.player1 = player1;
	this.player2 = player2;
	this.start_time = new Date();
	this.finished = false;
}

Game.prototype.onKeyUp = function(key) {
	if (this.finished === false) {
		if (key === 65) {
			this.player1.advance();
		}
		else if (key === 90) {
			this.player2.advance();
		}
		if (this.finished === false) {
			this.render();
		}
		this.check_finished();
	}
}

Game.prototype.render = function() {
	$('td').removeClass('active');
	$('#player1_strip td:nth-child('+this.player1.position+')').addClass('active');
	$('#player2_strip td:nth-child('+this.player2.position+')').addClass('active');
}

Game.prototype.check_finished = function() {
	if (this.player1.position === 30) {
		this.finished = true;
		this.log_game(this.player1.name, this.player2.name);
	}
	else if (this.player2.position === 30) {
		this.finished = true;
		this.log_game(this.player2.name, this.player1.name);
	} 
}

Game.prototype.log_players = function() {
	$.ajax({
		type:  'POST',
		url:   '/new',
		data: {'player1': this.player1.name,
					 'player2': this.player2.name}
	}).done(function(result) {
		console.log(result);
	});
}

Game.prototype.log_game = function(winner, loser) {
	var elapsed = new Date() - this.start_time;
	$('.status').html('GAME OVER').css('color', 'red');
	$.ajax({
		type:  'POST',
		url:   '/game/over',
		data: {'winner': winner,
					 'loser' : loser,
					 'time': elapsed}
	}).done(function(result) {
		$('a').attr('href', '/game/' + result.game_id);
		$('a').text('View game stats');
		$('a').show();
	});
}

// Player
function Player(name) {
	this.name = name;
	this.position = 1;
}

Player.prototype.advance = function() {
	this.position += 1;
}