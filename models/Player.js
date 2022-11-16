module.exports = class Player {
  constructor (name, username, password){
    this.name = name;
    this.username = username;
    this.password = password;
  }


  getName() {
    return this.name;
  }

  getUsername() {
    return this.number;
  }

  getPassword(){
    return this.password
  }

  setName(newName){
    this.name = newName;
  }

  setUsername(newUsername){
    this.username = newUsername;
  }

  setPassword(newPassword){
    this.password = newPassword;
  }
}