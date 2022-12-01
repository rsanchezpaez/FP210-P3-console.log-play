//const src = require("debug");

localStorage.removeItem("mycolor");
var user = JSON.parse(localStorage.getItem('User'));
if (user == null) { window.alert("No se puede acceder directamente"); window.location.href = "http://localhost:3000/"; }
if (user.room1 == false && user.room2 == false & user.room3 == false) { window.alert("No se puede acceder sin sala"); window.location.href = "http://localhost:3000/game-app"; }
let room = "";
if (user.room1 == true) { room = "room1" };
if (user.room2 == true) { room = "room2" };
if (user.room3 == true) { room = "room3" };

const webSocket = new WebSocket('ws://localhost:443/ws/?room=' + room + '&username=' + user.username);
let el;
function fade(element) {
    var op = 1;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1) {
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 100);
}
function unfade(element) {
    var op = 0.1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op += op * 0.1;
    }, 100);
}
webSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type == 'message') {
        el = document.getElementById('time');
        el.innerHTML = data.message;
        if (typeof data.yourcolor !== 'undefined') {
            $("#team1").css('background-color', 'hsl(' + data.yourcolor + ',50%,50%)');
            if (localStorage.getItem("mycolor") == null) {
                localStorage.setItem("mycolor", data.yourcolor);
            }
        }
        if (typeof data.opponentcolor !== 'undefined') {
            $("#team2").css('background-color', 'hsl(' + data.opponentcolor + ',50%,50%)');
        }
    }
    if (data.type == 'movement') {
        $("#" + data.position).css('background-color', 'hsl(+' + data.color + ',50%,50%)');
        $("#" + data.position).addClass('' + data.color + '');
        $("#" + data.position).css("cursor", "not-allowed");
        $("#" + data.position).css("pointer-events", "none");
        if (data.color == localStorage.getItem("mycolor")) {
            if ($('.' + data.color).length > 12) {

                $(".canvas").css("cursor", "not-allowed");
                $(".canvas").css("pointer-events", "none");
                window.alert("You Won");
                const messageBody = { type: 'result', winner: user.username, result: $('.' + data.color).length };
                webSocket.send(JSON.stringify(messageBody));
            }
            document.getElementById("team1").innerHTML = $('.' + data.color).length;
        }
        else {
            if ($('.' + data.color).length > 12) {
                $(".canvas").css("cursor", "not-allowed");
                $(".canvas").css("pointer-events", "none");
                window.alert("Your Opponent Won");
            }
            document.getElementById("team2").innerHTML = $('.' + data.color).length;
        }
    }
    if (data.type == 'close') {
        window.alert(data.message)
        $(".canvas").css("cursor", "not-allowed");
        $(".canvas").css("pointer-events", "none");
    }
};

$(function () {
    $(".canvas").on("click", makeMove);
});

function makeMove(e) {
    if ($('.'+localStorage.getItem("mycolor")).length==0){
        $(".canvas").css("cursor", "not-allowed");
        $(".canvas").css("pointer-events", "none");  
      }
      casilla=Number($(this).attr('id'))+10;
      if (document.getElementById(casilla)){
        document.getElementById(casilla).style.cursor="allowed";
        document.getElementById(casilla).style.pointerEvents="all";
      }
      casilla=Number($(this).attr('id'))+11;
      if (document.getElementById(casilla)){
        document.getElementById(casilla).style.cursor="allowed";
        document.getElementById(casilla).style.pointerEvents="all";
      }
      casilla=Number($(this).attr('id'))+9;
      if (document.getElementById(casilla)){
        document.getElementById(casilla).style.cursor="allowed";
        document.getElementById(casilla).style.pointerEvents="all";
      }
      casilla=Number($(this).attr('id'))+1;
      if (document.getElementById(casilla)){
        document.getElementById(casilla).style.cursor="allowed";
        document.getElementById(casilla).style.pointerEvents="all";
      }
      casilla=Number($(this).attr('id'))-1;
      if (document.getElementById(casilla)){
        document.getElementById(casilla).style.cursor="allowed";
        document.getElementById(casilla).style.pointerEvents="all";
      }
      casilla=Number($(this).attr('id'))-10;
      if (document.getElementById(casilla)){
        document.getElementById(casilla).style.cursor="allowed";
        document.getElementById(casilla).style.pointerEvents="all";
      }
      casilla=Number($(this).attr('id'))-11;
      if (document.getElementById(casilla)){
        document.getElementById(casilla).style.cursor="allowed";
        document.getElementById(casilla).style.pointerEvents="all";
      }
      casilla=Number($(this).attr('id'))-9;
      if (document.getElementById(casilla)){
        document.getElementById(casilla).style.cursor="allowed";
        document.getElementById(casilla).style.pointerEvents="all";
      }
    const messageBody = { type: 'movement', position: $(this).attr('id'), "room": room };
    webSocket.send(JSON.stringify(messageBody));
};

$(document).ready(function(){
    document.getElementById("head").innerHTML="Welcome "+ user.name+" to "+room;
    $('img').attr('src', user.avatar);
})