const express = require('express');
const router = express.Router();

const { verificarToken } = require("../../helper/token.middleware");
let controllerAPI = require("../../controllers/api/api.controller")

router.post('/hw/status', verificarToken, controllerAPI.HW_Validate)
router.post('/registrar', verificarToken, controllerAPI.Register)
router.post('/status', verificarToken, controllerAPI.Status)

module.exports = router;