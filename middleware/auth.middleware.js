const jwt = require('jsonwebtoken');

exports.validarSesion = (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) {
        // Si es una petición de API (ej. /api/registrar), devuelve 401
        if (req.accepts('json')) {
            return res.status(401).json({ success: false, message: 'No autorizado' });
        }
        // Si es una petición de página web, redirige a login
        return res.redirect('/auth/login');
    }

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verificado;
        next();
    } catch (error) {
        res.clearCookie('access_token');

        if (req.accepts('json')) {
            return res.status(403).json({ success: false, message: 'Token inválido' });
        }
        res.redirect('/auth/login');
    }
};


exports.validarApiKey = (req, res, next) => {
    const apiKeyRecibida = req.headers['x-api-key']; // Buscamos la llave en los headers
    const apiKeyMaestra = process.env.API_KEY; // La que tienes en tu .env

    if (!apiKeyRecibida || apiKeyRecibida !== apiKeyMaestra) {
        console.warn(`🚨 Intento de acceso no autorizado desde: ${req.ip}`);
        return res.status(403).json({
            success: false,
            message: "Acceso prohibido: API Key inválida o ausente."
        });
    }

    console.log(`✅ Acceso autorizado desde: ${req.ip}`);
    next(); // Si todo está bien, pasa al controlador
};






