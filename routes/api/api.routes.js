const express = require('express');
const router = express.Router();

const { validarApiKey } = require("../../middleware/auth.middleware");
let controllerAPI = require("../../controllers/api/api.controller")

router.post('/hw/status', validarApiKey, controllerAPI.HW_Validate)
router.post('/registrar', validarApiKey, controllerAPI.Register)
router.post('/status', validarApiKey, controllerAPI.Status)

module.exports = router;