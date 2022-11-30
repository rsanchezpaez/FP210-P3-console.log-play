const Player= require("./Player");
const Room = require("./Room");

class Game {
  
  constructor(number, room, result, winner,player1,player2) {
    this.number = number;
    this.room = room;
    this.result = result;
    this.winner = winner;
    this.player1 = player1;
    this.player2 = player2;
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
  getRoom() {
    return this.room;
  }
  setRoom(room) {
    this.room = room;
  }
  getPlayer1(){
    return player1;
  }

  getPlayer2(){
    return player2;
  }
  setPlayer1(player1){
    this.player1 = player1;
  }

  setPlayer2(player2){
    this.player2 = player2;
  }
}

module.exports = Game;
