exports.validarSesion = (req, res, next) => {
    const token = req.cookies.access_token; // <--- LEER DE COOKIES

    if (!token) return res.redirect('/auth/login');

    try {
        const verificado = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verificado;
        next();
    } catch (error) {
        res.clearCookie('access_token');
        res.redirect('/auth/login');
    }
};