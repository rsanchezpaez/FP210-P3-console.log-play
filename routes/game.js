var express = require('express');
var router = express.Router();
var {renderGame} = require("../controllers/gameController");


router.get('/game', renderGame);

module.exports = router;