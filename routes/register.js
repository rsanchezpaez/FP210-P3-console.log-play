var express = require('express');
var router = express.Router();
var {register, validatedRegister} = require("../controllers/registerController");

router.get('/register', register);
router.post('/validated-register', validatedRegister);

module.exports = router;