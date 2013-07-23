var won = false;
var winning_player = null;
var start = new Date();

$(document).ready(function(){
  var a_pressed = 0;
  var z_pressed = 0;
  $(document).keypress(function(e){
    if (won == false) {
      if (e.keyCode == 97){
        a_pressed += 1;
        updatePlayerPosition('player1', a_pressed);
      } 
      else if (e.keyCode == 122){
        z_pressed += 1;
        updatePlayerPosition('player2', z_pressed);
      }
    }
  });
  $('#reset').on('click', function(e) {
    won = false;
    a_pressed = 0;
    z_pressed = 0;
    $('a').hide();
    $('td').removeClass('active');
    $('tr td:first-child').addClass('active');
    $('.result').html('');
    $('#reset').css('visibility', 'hidden');
  });
});

function updatePlayerPosition(player, position) {
  if (position >= 30) {
    // winner(player, position);
    won = true;
    winning_player = player;
    $('#reset').css('visibility', 'visible');
    var elapsed = new Date() - start;
    $.ajax({
      type: 'POST',
      url: '/game/over',
      data: { 'winning_player': winning_player, 'time': elapsed},
    }).done(function(result){
      console.log(result);
      winner(result.winner, position);
      $('a').attr('href', '/game/' + result.game_id);
      $('a').show();
      $('a').text('View game stats');
    });
  }
  else {
    var id = player + '_strip'
    $('#'+id+' td:nth-child('+position+')').addClass('active');
    $('#'+id+' td:nth-child('+(position - 1)+')').removeClass('active');
  }
}

function winner(player, position) {
  $('.result').html(player+' won!');
}