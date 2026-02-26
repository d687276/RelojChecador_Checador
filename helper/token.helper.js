
const jwt = require('jsonwebtoken');


exports.generarToken = (usuario) => {
    // Guardamos info útil pero NO sensible (no guardes el password aquí)
    const payload = {
        idx: usuario.idx,
        usuario: usuario.usuario,
        sujeto: usuario.sujeto,
        perfil: usuario.perfil,
        status: usuario.status
    };

    // El token expira en 8 horas para que no se quede abierto siempre
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '8h' });
};


exports.verificarToken = (req, res, next) => {
    // Buscamos el token en las cookies    
    const token = req.cookies.access_token;
    if (!token) {
        return res.redirect('/auth/login'); // Si no hay token, mándalo a loguearse
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.status !== true) {
            res.clearCookie('access_token');
            return res.redirect('/auth/login?error=cuenta_suspendida');
        }
        req.user = decoded;
        next();
    } catch (error) {
        res.clearCookie('access_token');
        return res.redirect('/auth/login');
    }
};
