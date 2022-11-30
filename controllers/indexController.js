const users = require('../models/UserRegisters').usersDB;

function init(request, response) {
  response.render('index', { name: 'login.css' });
  response.end();
}

function login(request, response) {
  var item = users.find(item => item.username === request.body.username);
  if (item !== undefined) {
    if (item.username === request.body.username && item.password === request.body.password) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end();
    }

    if (item.username === request.body.username && item.password !== request.body.password) {
      response.writeHead(404, { "Content-Type": "text/html" });
      response.end();
    }
  }

  if (item === undefined) {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end();
  }

  response.end()
}

exports.init = init;
exports.login = login;
