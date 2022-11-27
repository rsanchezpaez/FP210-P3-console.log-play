var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var gameAppRouter = require('./routes/game-app');
var gameRouter = require('./routes/game');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/bootstrap/js', express.static(__dirname + '/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'));
app.use('/favicons', express.static(__dirname + '/node_modules/express-favicon/index.js'));

app.use(indexRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(gameAppRouter);
app.use(gameRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Game server
const http = require("http");
const websocketServer = require("websocket").server
const httpServer = http.createServer();
httpServer.listen(9090, () => console.log("listening server on 9090"))
app.listen(9091, ()=> console.log("listening clients on 9091"))

//hashmap of clients
const clients  = {};
const games= {};

const wsServer = new websocketServer({
  "httpServer": httpServer
})
wsServer.on("request", request => {
  //connect
  const connection = request.accept(null,request.origin);
  connection.on("open", () => console.log("opened"))
  connection.on("close", () => console.log("closed"))
  connection.on("message", message => {

      const result = JSON.parse(message.utf8Data)
      //received something from the client
      //user want to create a new game
      if(result.method === "create"){
          const clientId = result.clientId;
          const gameId = guid();
          games[gameId] = {
              "id": gameId,
              "balls": 20,
              "clients" : []
          }

          const payLoad = {
              "method": "create",
              "game": games[gameId]
          }
          console.log("hola")
          const con=  clients[clientId].connection;
          con.send(JSON.stringify(payLoad));

      }

      //client want to join
      if(result.method === "join"){

          const clientId = result.clientId;
          const gameId = result.gameId;
          const game = games[gameId];
          if(game.clients.length >=3){
              //fail
              return;
          }
          const color = {"0": "Red","1": "Green", "2": "Blue"}[game.clients.length];
          game.clients.push({
              "clientId":clientId,
              "color": color
          })
          //starting the game
          if(game.clients.length === 3){
              updateGameState();
          }

          const payLoad = {
              "method": "join",
              "game": game            
          }
          game.clients.forEach(c => {
              clients[c.clientId].connection.send(JSON.stringify(payLoad));
          });

      }

      if(result.method === "play"){
          const clientId = result.clientId;
          const gameId = result.gameId;
          const ballId = result.ballId;
          const color = result.color;

          let state = games[gameId].state;
          if(!state)
              state={}
          state[ballId] = color;
          games[gameId].state = state;



      }   


  })

  //generate a new client id
  const clientId = guid();
  clients[clientId] = {
      "connection": connection
  }


  const payLoad = {
      "method": "connect",
      "clientId": clientId
  }

  //send back the client connect
  connection.send(JSON.stringify(payLoad))

})

function updateGameState(){
  //update every game and every player each 500ms

  for (const g of Object.keys(games)) {
      const game = games[g]

      const payLoad={
          "method":"update",
          "game": game
      }
      games[g].clients.forEach(c=>{
          clients[c.clientId].connection.send(JSON.stringify(payLoad))
      })
  }

  setTimeout(updateGameState,500);
}


function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();



module.exports = app;
