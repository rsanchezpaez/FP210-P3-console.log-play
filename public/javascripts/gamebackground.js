const arr = [11, 12, 13, 14, 15, 21, 22, 23, 24, 25, 31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55];

for (let i of arr) {
  var canvas = document.getElementById(i.toString());
  var str = "ctx" + i.toString() + " = canvas.getContext('2d')";
  eval(str);
  var img = new Image();
  img.src = "../images/madera.png";
  var str = "ctx" + i.toString() + ".drawImage(img, 0, 0)";
  eval(str);
  img.onload = function () {
    var str = "ctx" + i.toString() + ".drawImage(img, 0, 0)";
    eval(str);
  };
}


//context its a variable from game.jade. It should be "ctx" + number of cell
function Whitecanvas(context) {
  context.clearRect(0, 0, 100, 100);
}