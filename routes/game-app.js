var express = require('express');
const url = require('url');
var router = express.Router();
var {gameApp, ocupation, ocupationcheck, disconnect} = require("../controllers/gameAppController");
const Game = require("../models/Game");
// Socket server
const { Server } = require('ws');
const sockserver = new Server({ port: 443 });
const clients = new Map();
const games = new Array();
var players = {};
var colors = {};
players["room1"]=0;
players["room2"]=0;
players["room3"]=0;
colors["room1"]="";
colors["room2"]="";
colors["room3"]="";
sockserver.on('connection', (ws,req) =>  {
  joine(ws,req);

  ws.on('message', (messageAsString) => {
    const message = JSON.parse(messageAsString);
    const metadata = clients.get(ws);
    message.sender = metadata.id;
    message.color = metadata.color;
    const outbound = JSON.stringify(message);

    [...clients.keys()].forEach((client) => {
      if (client.room==message.room){
      client.send(outbound);
      }
    });
  });
  ws.onmessage = (webSocketMessage) => {
    const messageBody = JSON.parse(webSocketMessage.data);
    console.log(messageBody.position);
    console.log(messageBody);
 

    [...clients.keys()].forEach((client) => {
      console.log("cliente "+client.room);
      console.log("mensaje "+messageBody.room);
      if (client.room==messageBody.room){
        console.log("envio");
        const metadata = clients.get(ws);
        const data = JSON.stringify({'type': 'movement', 'position': messageBody.position,'color': metadata.color});
      client.send(JSON.stringify(data));
      }
    });
};
   ws.on('close', () => {
    console.log('Client has disconnected!');
    clients.delete(ws);
   });

});
function joine(ws,req){
  console.log(url.parse(req.url, true).query);
  console.log("jugadores: "+players);
  let parameters = url.parse(req.url, true).query; 
  console.log(parameters.room);
  console.log(parameters.username);
  console.log(parameters.room);
  const room = parameters.room;
  console.log(players[room]["color1"]);
  if (players[room]===1) {
    players[room]= players[room]+1;
    // players[room]["game"].setPlayer2(parameters.username);
    const id = uuidv4();
    const username = parameters.username;
    const color = Math.floor(Math.random() * 360);
    const metadata = { id, color, room, username };
    ws.room=parameters.room;
    clients.set(ws, metadata);
    console.log('Player 2 has connected! ID: '+id);
    console.log(players);
    sockserver.clients.forEach((client) => {
      if(client==ws){
      const data = JSON.stringify({'type': 'message', 'message': 'Start the game','yourcolor':metadata.color,'opponentcolor':colors[room],'player':'second','room':metadata.room,'username':metadata.username});
      client.send(data);
      }
      else {
        if (client.room==ws.room){
        const data = JSON.stringify({'type': 'message', 'message': 'Start the game','opponentcolor':metadata.color});
        client.send(data);
      }
      }
     
  });
  } else if(players[room]===0) {
    let game = new Game(uuidv4(), room, "", "",parameters.username,"");
    games.push(game);
    const id = uuidv4();
    const color = Math.floor(Math.random() * 360);
    const username = parameters.username;
    const metadata = { id, color, room,username };
    players[room]= players[room]+1;
    colors[room]=color;
    console.log("Fijado color"+colors[room]);
    ws.room=parameters.room;
    clients.set(ws, metadata);
    unmatched=room;
    console.log("unmatch"+unmatched);
    console.log('Player 1 has connected! ID: '+id);
    const data = JSON.stringify({'type': 'message', 'message': 'Wait for an opponent','yourcolor':metadata.color,'player':'first','room':metadata.room,'username':metadata.username});
    ws.send(data);
  }
  else {
    console.log("Error");
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


router.get('/game-app', gameApp);
router.get('/ocupationcheck', ocupationcheck)
router.get('/disconnect', disconnect)
router.get('/ocupation', ocupation)

module.exports = router;