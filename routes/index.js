var express = require('express');
var router = express.Router();
var requestHandler = require("../controllers/requestHandlers")

/* GET home page. */
router.get('/', requestHandler.init);
router.get('/register', requestHandler.register);
router.post('/validated-register', requestHandler.validatedRegister);
router.post('/login', requestHandler.login);
router.get('/game-app', requestHandler.gameApp);

module.exports = router;
