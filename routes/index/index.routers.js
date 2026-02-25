const express = require('express');
const router = express.Router();

let controllerIndex = require("../../controllers/index/index.controller")
let controllerAuth = require("../../controllers/auth/auth.controller")

router.get('', controllerIndex.Home)
router.get('/auth/login', controllerAuth.Login)
router.post('/auth/login', controllerAuth.LoginPost)

module.exports = router;