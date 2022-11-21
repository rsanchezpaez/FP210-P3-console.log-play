
function renderGame(rel,res,next){
  res.render('game', {title: 'Prueba', name: 'game.css'});
  res.end();
}

exports.renderGame = renderGame;