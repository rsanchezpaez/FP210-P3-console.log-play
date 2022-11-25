var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { Server } = require('ws');
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var gameAppRouter = require('./routes/game-app');
var gameRouter = require('./routes/game');
//const { socket } = require('../FP210-P3-console.log-playx/controllers/roomController');
const { randomUUID } = require('crypto');
const { join } = require('path');

var app = express();
// Socket server
const sockserver = new Server({ port: 443 });
const clients = new Map();
sockserver.on('connection', function  connection (ws)  {
  joine(ws);

  ws.on('message', (messageAsString) => {
    const message = JSON.parse(messageAsString);
    const metadata = clients.get(ws);
    message.sender = metadata.id;
    message.color = metadata.color;
    const outbound = JSON.stringify(message);

    [...clients.keys()].forEach((client) => {
      client.send(outbound);
    });
  });
  ws.onmessage = (webSocketMessage) => {
    const messageBody = JSON.parse(webSocketMessage.data);
    console.log(messageBody.position);
    console.log(messageBody);
    const data = JSON.stringify({'type': 'movement', 'position': messageBody.position});
    [...clients.keys()].forEach((client) => {
      client.send(JSON.stringify(data));
    });
};
   ws.on('close', () => {
    console.log('Client has disconnected!');
    clients.delete(ws);
   });
   ws.on("make.move", function(data) {
    sockserver.clients.forEach((client) => {
      console.log(data);
      client.send(data);
  });
});
});
function joine(ws){
  if (typeof unmatched !== 'undefined') {
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const room = "room1"
    const metadata = { id, color, room };
    clients.set(ws, metadata);
    console.log('Player 2 has connected! ID: '+id);
    sockserver.clients.forEach((client) => {
      const data = JSON.stringify({'type': 'message', 'message': 'Start the game'});
      client.send(data);
  });
    //const data = JSON.stringify({'type': 'time', 'time': new Date().toTimeString()});
    //ws.send(data);
  } else {
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const room = "room1"
    const metadata = { id, color, room };
    clients.set(ws, metadata);
    unmatched=id;
    console.log('Player 1 has connected! ID: '+id);
    const data = JSON.stringify({'type': 'message', 'message': 'Wait for an opponent'});
    ws.send(data);
  }
 
 
}
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
setInterval(() => {
  sockserver.clients.forEach((client) => {
      const data = JSON.stringify({'type': 'time', 'time': new Date().toTimeString()});
      //client.send(data);
  });
}, 1000);

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

module.exports = app;
