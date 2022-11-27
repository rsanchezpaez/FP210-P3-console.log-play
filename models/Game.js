const Player= require("./Player");
const Room = require("./Room");

class Game {
  
  constructor(number, room, result, winner) {
    this.number = number;
    this.room = room;
    this.result = result;
    this.winner = winner;
  }
  getNumber() {
    return this.number;
  }
  setNumber(newNumber) {
    this.number = newNumber;
  }
  getResult() {
    return this.result;
  }
  setResult(result) {
    this.result = result;
  }
  getWinner() {
    return this.winner;
  }
  setResult(winner) {
    this.winner = winner;
  }
  getRoomId() {
    return this.room.getNumber();
  }

  getUser1(){
    return this.room.getPlayer1();
  }

  getUser2(){
    return this.room.getPlayer2();
  }

}

module.exports = Game;
