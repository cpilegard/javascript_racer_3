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
	if (this.player1.position === 30 || this.player2.position === 30) {
		this.finished = true;
		this.finish();
	} 
}

Game.prototype.start = function() {
	$.ajax({
		type:  'POST',
		url:   '/new',
		data: {'player1': this.player1.name,
					 'player2': this.player2.name}
	}).done(function() {
	});
}

Game.prototype.finish = function(winner) {
	var elapsed = new Date() - this.start_time;
	$('.result').html('GAME OVER');
	$.ajax({
		type:  'POST',
		url:   '/game/over',
		data: {'winning_player': winner,
					 'time': elapsed}
	});
}

// Player prototype
function Player(name) {
	this.name = name;
	this.position = 1;
}

Player.prototype.advance = function() {
	this.position += 1;
}