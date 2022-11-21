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
  for (var x = 0; x <= bw; x += cw) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
  }

  for (var x = 0; x <= bh; x += cw) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
  }

  context.strokeStyle = "black";
  context.stroke();
}

drawBoard();

function getCursorPosition(canvas, event, cw) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  let cy = (y + (cw - (y % cw))) / cw;
  let cx = (x + (cw - (x % cw))) / cw;
  console.log("x: " + cx + " y: " + cy, cx * 80 - 80, cy * 80 - 80);

  var context2 = canvas.getContext("2d");
  context2.beginPath();
  //context2.fillStyle = "red";
  
  console.log(`Clicada posición x = ${cx} y y = ${cy}`);

  
  /*
  if (cx === 1 && cy === 1) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }*/

  /*if (cx === 1 && cy === 1) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 1 && cy === 2) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }

  if (cx === 1 && cy === 3) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 1 && cy === 4) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 1 && cy === 5) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }

  if (cx === 2 && cy === 1) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 2 && cy === 2) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }

  if (cx === 2 && cy === 3) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 2 && cy === 4) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 2 && cy === 5) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 3 && cy === 1) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 3 && cy === 2) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }

  if (cx === 3 && cy === 3) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 3 && cy === 4) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 3 && cy === 5) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }

  if (cx === 4 && cy === 1) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 4 && cy === 2) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }

  if (cx === 4 && cy === 3) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 4 && cy === 4) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 4 && cy === 5) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }

  if (cx === 5 && cy === 1) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 5 && cy === 2) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }

  if (cx === 5 && cy === 3) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 5 && cy === 4) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }
  if (cx === 5 && cy === 5) {
    console.log(`Clicada posición x = ${cx} y y = ${cy}`);
  }*/
}


canvas.addEventListener("mousedown", function (e) {
  getCursorPosition(canvas, e, cw);
});
