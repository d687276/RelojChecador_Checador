const express = require('express');
const router = express.Router();


const { verificarToken } = require("../../helper/token.helper");
let controllerDashboard = require("../../controllers/dashboard/dashboard.controller")


router.get('', verificarToken, controllerDashboard.GetDashboard)


module.exports = router;