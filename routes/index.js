var express = require('express');
var router = express.Router();
var {init} = require("../controllers/indexController")


/* GET home page. */
router.get('/', init);



module.exports = router;
