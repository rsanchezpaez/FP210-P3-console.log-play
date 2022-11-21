function gameApp(rel, res, next){
  res.render('game-app', {name: 'game-app.css'});
  console.log("estoy aqui");
  res.end();
}

exports.gameApp = gameApp;