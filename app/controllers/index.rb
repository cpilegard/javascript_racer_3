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
  erb :start
end

post '/game/over' do
  winner = Player.where(name: params[:winner]).first
  loser  = Player.where(name: params[:loser]).first
  time   = params[:time].to_f / 1000

  game = Game.create({winner_id: winner.id, loser_id: loser.id, time: time.to_s})
  
  winner.games << game
  loser.games  << game

  content_type :json
  {game_id: game.id.to_s}.to_json#, winner: winner.name, loser: loser.name}.to_json
end

get '/game/:id' do
  @game = Game.find(params[:id].to_i)
  erb :stats
end