var express = require('express');
var router = express.Router();
var {gameApp, ocupation, ocupationcheck, disconnect} = require("../controllers/gameAppController");


router.get('/game-app', gameApp);
router.get('/ocupationcheck', ocupationcheck)
router.get('/disconnect', disconnect)
router.get('/ocupation', ocupation)

module.exports = router;