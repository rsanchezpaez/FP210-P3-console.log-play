const Room = require('./Room')

const rooms = new Array();
let room1 = new Room("room1", "Room 1", "", "");
let room2 = new Room("room2", "Room 2", "", "");
let room3 = new Room("room3", "Room 3", "", "");
rooms.push(room1);
rooms.push(room2);
rooms.push(room3);


module.exports = { rooms };