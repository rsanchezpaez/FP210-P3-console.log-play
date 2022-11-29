let clientId=null;
let gameId = null;
let playerColor = null;


    
    //Server->Cliente message
    let ws = new WebSocket("ws://localhost:9090")
    ws.onmessage = message =>{
        //message.data
        const response = JSON.parse(message.data);
        //connect
        if(response.method==="connect"){
            clientId=response.clientId;
            console.log("cliend id set successfully " + clientId);
            gameJoin("room2")
            gameId=2;
            
        }
        if(response.method==="create"){
            gameId = response.game.id;
            console.log("Game succesfully created with id " + response.game.id+ " with "+ response.game.balls );
            

        }
         //join
         if(response.method==="join"){
            const game = response.game;
            game.clients.forEach(c => {
                if(c.clientId === clientId) playerColor=c.color;
                console.log("Color:" +  c.color);
            })
            document.getElementById("TeamColor").style.background = playerColor;

        }

        if (response.method === "update"){
  
          
          if (!response.game.state) return;
          for(const b of Object.keys(response.game.state))
          {
              const color = response.game.state[b]
              //console.log(b);
              const cellObject = document.getElementById(b).style.background = color;
              
              
          }
            

        }
      }

      function gameJoin(room) {
        let roomInt= 1;
 
         switch (room) {
 
             case "room1":
                 roomInt= 1;break;
             case "room2":
                 roomInt= 2;break;
             case "room3":
                 roomInt= 3;break;
         }
 
         const payLoad = {
         "method": "join",
         "clientId": clientId,
         "gameId": roomInt
          }
         ws.send(JSON.stringify(payLoad));
 
         
     }



 /*    document.getElementById("id-1").addEventListener("click", e => {
     document.getElementById("id-1").style.background = playerColor;
      const payLoad={
          "method": "play",
          "clientId": clientId,
          "gameId": gameId,
          "ballId": "-1",
          "color": playerColor
      }
      ws.send(JSON.stringify(payLoad));
  })*/

  const boardWrapper = document.getElementById("board-game");
  boardWrapper.addEventListener("click", (event) => {
    const isButton = event.target.nodeName === 'CANVAS';
    if (!isButton) {
      return;
    }
    const payLoad={
      "method": "play",
      "clientId": clientId,
      "gameId": gameId,
      "ballId": event.target.id,
      "color": playerColor
  }
  ws.send(JSON.stringify(payLoad));
  })


//background width
var bw = 400;

//Background height
var bh = 400;

//padding
var p = 0;

//cell width
var cw = 80;

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

function drawBoard() {
/*  for (var x = 0; x <= bw; x += cw) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= bh; x += cw) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }

  context.strokeStyle = "black";
  context.stroke();

  var context2 = canvas.getContext("2d");
  context2.beginPath();
  context2.fillStyle = "red";*/
  for (let i = 0; i < 440; i += 40) {
    context.beginPath();
    context.moveTo(i, 0);
    context.lineTo(i, 400);
    context.stroke();

}

for (let i = 0; i < 440; i += 40) {
    context.beginPath();
    context.moveTo(0, i);
    context.lineTo(400, i);
    context.stroke();

}
for (let i = 0; i < 440; i += 40) {//row
    for (let j = 0; j < 440; j += 40) {//column
        context.fillStyle = colorArray[i/4 + j/40];
        context.fillRect(j , i , 40, 40);
    }
}

let arr = [];
for (let i = 0; i < 121; i += 1) {
  arr.push(randomColor());
  while(arr[i] === arr[i -1] || arr[i] === arr[i -10]) {
  arr[i] = randomColor();
  }
}

}
function randomColor() {
  let colorOptions = ["RED", "BLUE", "GREEN"];
  let index = Math.floor(Math.random() * colorOptions.length);
  return colorOptions[index];
}

//drawBoard();
function fillArray() {
  let arr = [];
  for (let i = 0; i < 121; i += 1) {
    arr.push(randomColor());
    while(arr[i] === arr[i -1] || arr[i] === arr[i -10]) {
    arr[i] = randomColor();
    }
  }
  return arr;
}
function randomColor() {
    let colorOptions = ["RED", "BLUE", "GREEN"];
    let index = Math.floor(Math.random() * colorOptions.length);
    return colorOptions[index];
}

function getCursorPosition(canvas, event, cw, color) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let cy = (y + (cw - (y % cw))) / cw;
  let cx = (x + (cw - (x % cw))) / cw;
  let py= cy * 80 - 80;
  let px = cx * 80 - 80;
  console.log("x: " + cx + " y: " + cy, px, py);

  var context2 = canvas.getContext("2d");
  context2.beginPath();
  context2.fillStyle = color;
  
  console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  let returnX = cx;
  let returnY = cy;
  
  context2.fillRect( ((cw*cx)-(cw-1)), ((cw*cy)-(cw-1)), cw-1, cw-1);

  let cell=0;
  switch(returnY){
    case 1: cell=0;
      break;
    case 2: cell=5;
      break;
    case 4: cell=10;
      break;
    case 5: cell=15;
      break;
  }
  cell= cell + returnX;
  return(cell)
}




canvas.addEventListener("mousedown", function (e) {
  let cell =getCursorPosition(canvas, e, cw,playerColor);
  console.log("cell"+cell);

  
  const payLoad={
      "method": "play",
      "clientId": clientId,
      "gameId": gameId,
      "ballId": cell,
      "color": playerColor
  }
  ws.send(JSON.stringify(payLoad));

   
});
