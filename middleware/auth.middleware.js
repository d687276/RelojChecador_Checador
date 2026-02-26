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






