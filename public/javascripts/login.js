console.log("hola")
var boton = document.querySelector("#login");
console.log(boton)
boton.addEventListener('click', function () {
    console.log("login")
    var username = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => {
        if (response.ok) {
            var user =JSON.parse(localStorage.getItem("User"));
            user.isLogged= true;
            localStorage.setItem('User', JSON.stringify(user))
            
            fetch('/game-app').then(response => {
                window.location.assign(response.url)
            })
            
        } else {
            document.getElementById('helper').style.visibility = "visible"
        }
    })
});

