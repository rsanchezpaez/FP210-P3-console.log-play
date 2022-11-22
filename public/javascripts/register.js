
        var avatarPicker = document.getElementById("avatar-picker");
        var avatarChoose = document.getElementById("avatarChoose");
        var pressed = false;
       
        

        avatarPicker.addEventListener("click", function () {
            document.getElementById('wrapper-selector').style.display = 'flex';
            pressed = true;


            //CHOSE AVAVATAR

            if (pressed == true) {
                var avatar1 = document.getElementById("item-1");
                avatar1.addEventListener("click", function () {
                    avatarChoose.src = avatar1.src;
                })

                var avatar2 = document.getElementById("item-2");
                avatar2.addEventListener("click", function () {
                    avatarChoose.src = avatar2.src;
                })

                var avatar3 = document.getElementById("item-3");
                avatar3.addEventListener("click", function () {
                    avatarChoose.src = avatar3.src;
                })

                var avatar4 = document.getElementById("item-4");
                avatar4.addEventListener("click", function () {
                    avatarChoose.src = avatar4.src;
                })

                var avatar5 = document.getElementById("item-5");
                avatar5.addEventListener("click", function () {
                    avatarChoose.src = avatar5.src;
                })

                var avatar6 = document.getElementById("item-6");
                avatar6.addEventListener("click", function () {
                    avatarChoose.src = avatar6.src;
                })

                var avatar7 = document.getElementById("item-7");
                avatar7.addEventListener("click", function () {
                    avatarChoose.src = avatar7.src;
                })

                var avatar8 = document.getElementById("item-8");
                avatar8.addEventListener("click", function () {
                    avatarChoose.src = avatar8.src;
                })

            }
        })

        var input = document.getElementsByClassName("form-control");
        for (var i = 0; i < input.length; i++) {
            input[i].addEventListener("click", function () {
                document.getElementById('wrapper-selector').style.display = 'none';
            })
        }

        //SUBMIT REGISTER

        var submitButton = document.getElementById("submit-button");

        submitButton.addEventListener("click", function () {
            var username = document.getElementById('email').value;
            var password = document.getElementById('password').value;
            var name = document.getElementById('name').value;

            fetch('/validated-register', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    username: username,
                    password: password
                })
            }).then(response => {
                if (response.ok) {
                    var newObject = {
                        'name': name,
                        'username': username,
                        'avatar': avatarChoose.src.replace('http://localhost:8888', ''),
                        'isLogged': false,
                        'room1': false,
                        'room2': false,
                        'room3': false
                    }
                    localStorage.setItem('User', JSON.stringify(newObject))
                    window.location.assign("/")
                } else {
                    document.getElementById('helper').style.visibility = "visible"
                }
            })
            
        })
