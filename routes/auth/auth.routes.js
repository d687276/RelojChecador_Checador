const express = require('express');
const router = express.Router();

let controllerAuth = require("../../controllers/auth/auth.controller")


router.get('/auth/login', controllerAuth.Login)
router.post('/auth/login', controllerAuth.LoginPost)

module.exports = router;