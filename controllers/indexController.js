const users = require('../models/UserRegisters').usersDB;

function init(rel,res,next){
  res.render('index', {title: 'Prueba', name: 'login.css'});
  res.end();
}

function login(rel,res,next){
  var item = users.find(item => item.username === rel.body.username);
  console.log(item);
  console.log(users)
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

exports.init = init;
exports.login = login;
