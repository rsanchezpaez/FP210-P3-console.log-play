var express = require('express');
var router = express.Router();
var {init} = require("../controllers/indexController")
var {renderGame} = require("../controllers/gameController");
var {login, logOut} = require("../controllers/loginController")
var {register, validatedRegister} = require("../controllers/registerController");
var { gameApp, ocupation, ocupationcheck, disconnect } = require("../controllers/gameAppController");


/* GET home page. */
router.get('/', init);
router.get('/game', renderGame);
router.post('/login', login);
router.get('/logOut', logOut);
router.get('/register', register);
router.post('/validated-register', validatedRegister);
router.get('/game-app', gameApp);
router.get('/ocupationcheck', ocupationcheck)
router.get('/disconnect', disconnect)
router.get('/ocupation', ocupation)

module.exports = router;
