const Player = require('../models/Player');
const Room =require('../models/Room');


var userRegisters = new Array();
var rooms = new Array();
let room1 = new Room("room1", "Room 1", "", "");
let room2 = new Room("room2", "Room 2", "", "");
let room3 = new Room("room3", "Room 3", "", "");
rooms.push(room1);
rooms.push(room2);
rooms.push(room3);

function init(re1,res,next){
    res.render('index', {title: 'Express', name: 'login.css'});
    res.end();
  }

function register(rel,res,next){
    res.render('register', {title: 'Express', name: 'register.css'});
    res.end();
}

function validatedRegister(rel,res,next){
    
    const newUser = new Player(rel.body.name, rel.body.username, rel.body.password);
    userRegisters.push(newUser);
    console.log(newUser)
    res.end()
}
function login(rel,res,next){
    var item = userRegisters.find(item => item.username === rel.body.username);
    console.log(item);
    console.log(userRegisters)
    console.log(rel.body.username)
    if (item !== undefined) {
        if (item.username === rel.body.username && item.password === rel.body.password) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end();
        }


        if (item.username === rel.body.username && item.password !== rel.body.password) {
            //PASSWORD INCORRECT
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end();
        }
    }

    if (item === undefined) {
        //USER DOESN'T EXISTS
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end();
    }
   
    res.end()
}

function gameApp(rel, res, next){
    res.render('game-app', {name: 'game-app.css'});
    console.log("estoy aqui");
    res.end();
}

exports.init = init;
exports.login = login;
exports.register = register;
exports.validatedRegister = validatedRegister;
exports.gameApp = gameApp;