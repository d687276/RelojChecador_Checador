const express = require('express');
const router = express.Router();

let controllerChecador = require("../../controllers/checador/checador.controller")

router.get('', controllerChecador.Home)

module.exports = router;