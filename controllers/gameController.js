
function renderGame(request,response){
  response.render('game', {title: 'Game', name: 'game.css'});
  response.end();
}

exports.renderGame = renderGame;