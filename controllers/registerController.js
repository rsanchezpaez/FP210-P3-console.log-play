const users = require('../models/UserRegisters').usersDB;
const Player = require('../models/Player');

function register(rel,res,next){
  res.render('register', {title: 'hi', name: 'register.css'});
  res.end();
}

function validatedRegister(rel,res,next){
  
  const newUser = new Player(rel.body.name, rel.body.username, rel.body.password);
  users.push(newUser);
  console.log(newUser)
  res.end()
}


exports.register = register;
exports.validatedRegister = validatedRegister;