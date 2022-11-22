var express = require('express');
var router = express.Router();
var {login, logOut} = require("../controllers/loginController")

router.post('/login', login);
router.get('/logOut', logOut);

module.exports = router;