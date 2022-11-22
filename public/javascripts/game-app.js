

    var mymodal = $('myModal');
        //MODAL POPUP
        $('#myModal').on('click', 'button.close', function (eventObject) {
            $('#myModal').modal('hide');
        });

        //DATA LOCALSTORAGE
        var user = JSON.parse(localStorage.getItem('User'));
        var name = "Renata"
        var avatar = document.getElementById("avatarChoose");
        var userName = document.getElementById("user-name");
        userName.innerHTML = "Hi" + ' ' + user.name.toLowerCase();
        avatar.src = user.avatar;

        //LOG OUT
        var logOut = document.getElementById("log-out");
        logOut.addEventListener("click", function () {
            fetch("/logOut?user=" + user.username).then(response => {
                if (response.ok) {
                    var userLogOut = {
                        'name': user.name,
                        'username': user.username,
                        'isLogged': false,
                        'avatar': user.avatar,
                        'room1': false,
                        'room2': false,
                        'room3': false
                    }
                    localStorage.setItem('User', JSON.stringify(userLogOut))
                    window.location.assign("/")
                }
            })
        })

        //DRAG AND DROP

        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }
        /**
        * Manage the actions triggered by dropping the avatar into a room. First checks if the room is full and alert the user, if the room has space then the room is selected.
        * @param  {Event} ev event that trigger the function
        */
        function drop(ev) {
            var data = ev.dataTransfer.getData("text");
            if (ev.target.id != "user-name") {
                fetch('/ocupation?room=' + ev.target.id + '&user=' + user.username).then(response => {
                    if (response.ok) {
                        document.getElementById("alert-text").innerHTML = 'Welcome to the room';
                        $("#myModal").modal("show");
                        var onRoom = ev.target.id;
                        user[onRoom] = true;
                        localStorage.setItem('User', JSON.stringify(user));
                        ev.preventDefault();
                        var nodeCopy = document.getElementById(data).cloneNode(true);
                        nodeCopy.id = "newId"
                        ev.target.appendChild(nodeCopy);
                        roomSelected(ev.target.id);
                        document.getElementById(ev.target.id).innerHTML = document.getElementById(ev.target.id).innerHTML + '<input class="btn btn-primary" type="button" value="Get out" onClick=getOutRoom("' + ev.target.id + '","' + user.username + '") />';
                    }
                    else {
                        document.getElementById("alert-text").innerHTML = 'Room is full. Try another one';
                        $("#myModal").modal("show");
                    }
                })
            }
            else {
                var nodeCopy = document.getElementById(data).cloneNode(true);
                nodeCopy.id = "newId"
                ev.target.appendChild(nodeCopy);
            }
        }

        /**
        * Manage the manages the exit of the user's game room . Delete the room selected by the user.
        * @param  {Room} room room selected by the user
        * @param  {User} user user logged in
        */
        function getOutRoom(room, userName) {
            fetch('/disconnect?room=' + room + '&user=' + userName).then(response => {
                if (response.ok) {
                    document.getElementById("alert-text").innerHTML = 'Correctly disconnected';
                    $("#myModal").modal("show");
                    user[room] = false;
                    localStorage.setItem('User', JSON.stringify(user));
                    document.getElementById(room).innerHTML = '<i id="o' + room + '"></i>';
                    document.getElementById(room).style.backgroundColor = 'rgb(58, 140, 255)';
                }
                else {
                    document.getElementById("alert-text").innerHTML = 'Error leaving the room';
                    $("#myModal").modal("show");
                }
            })
        }

        //CHOSE AVAVATAR

        var avatarPicker = document.getElementById("avatarChange");
        avatarPicker.addEventListener("click", function (event) {
            document.getElementById('wrapper-selector').style.display = 'flex';
            document.getElementById('wrapper-selector').style.visibility = 'visible';

                var avatar1 = document.getElementById("item-1");
                avatar1.addEventListener("click", function () {
                    avatarChoose.src = avatar1.src;
                    document.getElementById('wrapper-selector').style.display = 'none';
                    user.avatar = avatarChoose.src
                    localStorage.setItem('User', JSON.stringify(user))
                    document.getElementById('wrapper-selector').style.visibility = 'hidden';
                })

                var avatar2 = document.getElementById("item-2");
                avatar2.addEventListener("click", function () {
                    avatarChoose.src = avatar2.src;
                    document.getElementById('wrapper-selector').style.display = 'none';
                    user.avatar = avatarChoose.src
                    localStorage.setItem('User', JSON.stringify(user))
                    document.getElementById('wrapper-selector').style.visibility = 'hidden';
                })

                var avatar3 = document.getElementById("item-3");
                avatar3.addEventListener("click", function () {
                    avatarChoose.src = avatar3.src;
                    document.getElementById('wrapper-selector').style.display = 'none';
                    user.avatar = avatarChoose.src
                    localStorage.setItem('User', JSON.stringify(user));
                    document.getElementById('wrapper-selector').style.visibility = 'hidden';
                })

                var avatar4 = document.getElementById("item-4");
                avatar4.addEventListener("click", function () {
                    avatarChoose.src = avatar4.src;
                    document.getElementById('wrapper-selector').style.display = 'none';
                    user.avatar = avatarChoose.src
                    localStorage.setItem('User', JSON.stringify(user));
                    document.getElementById('wrapper-selector').style.visibility = 'hidden';
                })

                var avatar5 = document.getElementById("item-5");
                avatar5.addEventListener("click", function () {
                    avatarChoose.src = avatar5.src;
                    document.getElementById('wrapper-selector').style.display = 'none';
                    user.avatar = avatarChoose.src
                    localStorage.setItem('User', JSON.stringify(user));
                    document.getElementById('wrapper-selector').style.visibility = 'hidden';
                })

                var avatar6 = document.getElementById("item-6");
                avatar6.addEventListener("click", function () {
                    avatarChoose.src = avatar6.src;
                    document.getElementById('wrapper-selector').style.display = 'none';
                    user.avatar = avatarChoose.src
                    localStorage.setItem('User', JSON.stringify(user));
                    document.getElementById('wrapper-selector').style.visibility = 'hidden';
                })

                var avatar7 = document.getElementById("item-7");
                avatar7.addEventListener("click", function () {
                    avatarChoose.src = avatar7.src;
                    document.getElementById('wrapper-selector').style.display = 'none';
                    user.avatar = avatarChoose.src
                    localStorage.setItem('User', JSON.stringify(user));
                    document.getElementById('wrapper-selector').style.visibility = 'hidden';
                })

                var avatar8 = document.getElementById("item-8");
                avatar8.addEventListener("click", function () {
                    avatarChoose.src = avatar8.src;
                    document.getElementById('wrapper-selector').style.display = 'none';
                    user.avatar = avatarChoose.src
                    localStorage.setItem('User', JSON.stringify(user));
                    document.getElementById('wrapper-selector').style.visibility = 'hidden';
                })
        })

        /**
        * Check if a room is full or not.
        * @param  {Number} room Number of the checked room.
        */
        function checkOcupation(room) {
            fetch('/ocupationcheck?room=' + room + '&user=' + user.username).then(response => {
                //vacia
                if (response.status == 200) {
                    document.getElementById('o' + room).classList.add("fa");
                    document.getElementById('o' + room).classList.add("fa-user-times");
                    document.getElementById('o' + room).classList.remove("fa-user");
                    document.getElementById('o' + room).classList.remove("fa-users");
                    document.getElementById('o' + room).classList.add("fa-2x");

                }
                //1persona
                else if (response.status == 201) {
                    document.getElementById('o' + room).classList.add("fa");
                    document.getElementById('o' + room).classList.add("fa-user");
                    document.getElementById('o' + room).classList.remove("fa-user-times");
                    document.getElementById('o' + room).classList.remove("fa-users");
                    document.getElementById('o' + room).classList.add("fa-2x");
                }
                //los dos
                else if (response.status == 401) {
                    document.getElementById('o' + room).classList.add("fa");
                    document.getElementById('o' + room).classList.add("fa-users");
                    document.getElementById('o' + room).classList.remove("fa-user");
                    document.getElementById('o' + room).classList.remove("fa-user-times");
                    document.getElementById('o' + room).classList.add("fa-2x");

                }

            })
        }

    
        setInterval(function () { checkOcupation("room1", user.username) }, 1000);
        setInterval(function () { checkOcupation("room2", user.username) }, 1000);
        setInterval(function () { checkOcupation("room3", user.username) }, 1000);
    

        
        $(document).ready(function () {
            $("#containerRooms").hide().fadeIn(3000);
            $("#wrapper-main").hide().fadeIn(1000);
        });

        /**
        * Change the color of a selected room from blue to red, the unselected ones will be painted again in blue.
        * @param  {Number} roomNumber Number of the selected room.
        */
        function roomSelected(roomNumber) {

            $("#room1").css("background-color", "rgb(58, 140, 255)")
            $("#room2").css("background-color", "rgb(58, 140, 255)")
            $("#room3").css("background-color", "rgb(58, 140, 255)")

            switch (roomNumber) {

                case "room1":

                    $("#room1").css("background-color", "red")

                    break;
                case "room2":

                    $("#room2").css("background-color", "red")

                    break;
                case "room3":

                    $("#room3").css("background-color", "red")

                    break;
                default:
                // code block
            }
        }
