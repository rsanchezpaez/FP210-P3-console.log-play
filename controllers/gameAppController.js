const {rooms} = require('../models/RoomData')

function gameApp(request, response){
  response.render('game-app', {name: 'game-app.css'});
  response.end();
}


function disconnect(request, response) {
 
  
  var chosen_room = rooms.find(room => room.number === request.query.room);
  console.log(chosen_room);
  console.log(request.query)
  if(chosen_room !== undefined){
      if (chosen_room.player1 === request.query.user){
          console.log(chosen_room.player1);
          chosen_room.player1 =''; 
          response.writeHead(200, { "Content-Type": "text/html" });
      }
      else if (chosen_room.player2 === request.query.user){
          console.log(chosen_room.player2);
          chosen_room.player2 =''; 
          response.writeHead(200, { "Content-Type": "text/html" });
      }
      else {
          console.log("no encontrado");
          response.writeHead(404, { "Content-Type": "text/html" });
      }
     
  }else{
      response.writeHead(404, { "Content-Type": "text/html" });
  }
  response.end();
}

function ocupationcheck(request, response) {
  
  var chosen_room = rooms.find(room => room.number === request.query.room);
  if( chosen_room != undefined){
      if (chosen_room.player1 != '' && chosen_room.player2 != '') {
          response.writeHead(401, { "Content-Type": "text/html" });
      }
      else if (chosen_room.player1 == '' && chosen_room.player2 == '') {
          response.writeHead(200, { "Content-Type": "text/html" });
      }
      else {
          response.writeHead(201, { "Content-Type": "text/html" });
      }
  }else{
      response.writeHead(404, { "Content-Type": "text/html" });
  }

  response.end();

}
function ocupation(request, response) {
  console.log(request.query.user)
  console.log(typeof(request.query.user))
  
  var chosen_room = rooms.find(room => room.number === request.query.room);
  var user_in_room = rooms.find(room => room.player1 === request.query.user);
  var user2_in_room = rooms.find(room => room.player2 === request.query.user);
  console.log(chosen_room);
  console.log(rooms);
  console.log(user2_in_room);
  console.log(user_in_room);
  if( chosen_room != undefined){
      if (chosen_room.player1 != '' && chosen_room.player2 != '') {
        console.log("sala ocupada")
        response.writeHead(404, { "Content-Type": "text/html" });
      }
      else {
          if(chosen_room.player1 === '') {
            console.log("jugador 1 y 2 disponible")
              chosen_room.player1 = request.query.user
          }else{
            console.log("jugado 2 disponible")
              chosen_room.player2 = request.query.user
          }
          response.writeHead(200, { "Content-Type": "text/html" });
      }
  }else{
    response.writeHead(404, { "Content-Type": "text/html" });
  }


  response.end();
}

exports.gameApp = gameApp;
exports.ocupation = ocupation;
exports.ocupationcheck = ocupationcheck;
exports.disconnect = disconnect;