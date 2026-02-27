const express = require('express');
const rateLimit = require('express-rate-limit');
const router = express.Router();

let controllerAuth = require('../../controllers/auth/auth.controller')

let loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5,
    // Esta función se ejecuta cuando se excede el límite
    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Demasiados intentos. Por favor, intenta de nuevo en 15 minutos."
        });
    }
});


router.get('', controllerAuth.Login)
router.get('/login', controllerAuth.Login)
router.post('/login', loginLimiter, controllerAuth.LoginPost)
router.get('/logout', controllerAuth.Logout)

module.exports = router;