function Game(player1, player2) {
	this.player1 = player1;
	this.player2 = player2;
}

Game.prototype.onKeyUp = function(key) {
	if (key === 65) {
		this.player1.advance();
	}
	else if (key === 90) {
		this.player2.advance();
	}
	this.render();
}

Game.prototype.render = function() {
	$('td').removeClass('active');
	$('#player1_strip td:nth-child('+this.player1.position+')').addClass('active');
	$('#player2_strip td:nth-child('+this.player2.position+')').addClass('active');
}

Game.prototype.start = function() {
	$.ajax({
		type:  'POST',
		url:   '/new',
		data: {'player1': this.player1,
					 'player2': this.player2}
	});
	this.start_time = new Date();
}

Game.prototype.finish = function(winner) {
	var elapsed = new Date() - this.start_time;
	$.ajax({
		type:  'POST',
		url:   '/game/over',
		data: {'winning_player': winner,
					 'time': elapsed}
	});
}


function Player(name) {
	this.name = name;
	this.position = 1;
}

Player.prototype.advance = function() {
	this.position += 1;
}