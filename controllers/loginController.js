const users = require('../models/UserRegisters').usersDB;
const rooms = require('../models/RoomData').rooms;

function login(request, response) {
    var item = users.find(item => item.username === request.body.username);

    if (item !== undefined) {
        if (item.username === request.body.username && item.password === request.body.password) {
            response.writeHead(200, { "Content-Type": "text/html" });
            response.end();
        }


        if (item.username === request.body.username && item.password !== request.body.password) {
            //PASSWORD INCORRECT
            response.writeHead(404, { "Content-Type": "text/html" });
            response.end();
        }
    }

    if (item === undefined) {
        //USER DOESN'T EXISTS
        response.writeHead(404, { "Content-Type": "text/html" });
        response.end();
    }

    response.end()
}

function logOut(request, response) {

    console.log(request.query)
    var userNameLogOut = request.query.user

    rooms.forEach(room => {
        for (const key in room) {
            if (key === 'player1') {
                var value = room[key];
                if (value === userNameLogOut) {
                    room[key] = '';
                    console.log(rooms);
                }
            }
            if (key === 'player2') {
                var value = room[key];
                if (value === userNameLogOut) {
                    room[key] = '';
                    console.log(rooms);
                }
            }
        }

    });

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end();
}


exports.login = login;
exports.logOut = logOut;