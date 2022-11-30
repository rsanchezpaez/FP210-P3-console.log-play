const users = require('../models/UserRegisters').usersDB;
const Player = require('../models/Player');

function register(request,response){
  response.render('register', {title: 'Register', name: 'register.css'});
  response.end();
}

function validatedRegister(request,response){
  
  const newUser = new Player(request.body.name, request.body.username, request.body.password);
  users.push(newUser);
  response.end()
}

exports.register = register;
exports.validatedRegister = validatedRegister;