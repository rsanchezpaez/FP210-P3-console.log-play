var express = require('express');
var router = express.Router();
var {gameApp} = require("../controllers/gameAppController");


router.get('/game-app', gameApp);

module.exports = router;