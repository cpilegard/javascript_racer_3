get '/' do
  p session[:errors]
  erb :index
end

post '/new' do
  player1 = Player.create({name: params[:player1]})
  player2 = Player.create({name: params[:player2]})

  if player1.errors.any? || player2.errors.any?
    session[:errors] = player1.errors.full_messages + player2.errors.full_messages
    redirect to('/')
  else

    session['player1'] = player1.id
    session['player2'] = player2.id

    session[:errors] = nil
    redirect to('/start')
  end
end

get '/start' do
  @player1 = Player.find(session['player1'])
  @player2 = Player.find(session['player2'])

  erb :start
end

post '/game/over' do
  winner = params[:winning_player]
  time_finished = params[:time].to_f / 1000
  winning_player_id = session[winner]
  winning_player = Player.find(winning_player_id)
  game = Game.create({winner_id: winning_player.id, time: time_finished.to_s})
  Player.find(session['player1']).games << game
  Player.find(session['player2']).games << game

  content_type :json
  {game_id: game.id.to_s, winner: winning_player.name}.to_json
end

get '/game/:id' do
  @game = Game.find(params[:id].to_i)
  erb :stats
end