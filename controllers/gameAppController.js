const { rooms } = require('../models/RoomData')

function gameApp(request, response) {
  response.render('game-app', { name: 'game-app.css' });
  response.end();
}

function disconnect(request, response) {
  var chosen_room = rooms.find(room => room.number === request.query.room);
  if (chosen_room !== undefined) {
    if (chosen_room.player1 === request.query.user) {
      chosen_room.player1 = '';
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else if (chosen_room.player2 === request.query.user) {
      chosen_room.player2 = '';
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else {
      response.writeHead(404, { "Content-Type": "text/html" });
    }

  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();
}

function ocupationcheck(request, response) {

  var chosen_room = rooms.find(room => room.number === request.query.room);
  if (chosen_room != undefined) {
    if (chosen_room.player1 != '' && chosen_room.player2 != '') {
      response.writeHead(401, { "Content-Type": "text/html" });
    }
    else if (chosen_room.player1 == '' && chosen_room.player2 == '') {
      response.writeHead(200, { "Content-Type": "text/html" });
    }
    else {
      response.writeHead(201, { "Content-Type": "text/html" });
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }

  response.end();

}
function ocupation(request, response) {
  var chosen_room = rooms.find(room => room.number === request.query.room);
  var user_in_room = rooms.find(room => room.player1 === request.query.user);
  var user2_in_room = rooms.find(room => room.player2 === request.query.user);
  if (chosen_room != undefined) {
    if (chosen_room.player1 != '' && chosen_room.player2 != '') {
      response.writeHead(404, { "Content-Type": "text/html" });
    }
    else {
      if (chosen_room.player1 === '') {
        chosen_room.player1 = request.query.user
      } else {
        chosen_room.player2 = request.query.user
      }
      response.writeHead(200, { "Content-Type": "text/html" });
    }
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();
}

exports.gameApp = gameApp;
exports.ocupation = ocupation;
exports.ocupationcheck = ocupationcheck;
exports.disconnect = disconnect;