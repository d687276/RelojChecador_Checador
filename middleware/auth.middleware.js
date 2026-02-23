
const validarApiKey = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    const llaveMaestra = process.env.API_KEY;

    if (apiKey && apiKey === llaveMaestra) {
        next(); // La llave coincide, permite pasar al controlador
    } else {
        console.warn(`⚠️ Intento de acceso no autorizado desde IP: ${req.ip}`);
        res.status(403).json({
            success: false,
            message: "Acceso denegado: API Key inválida o ausente."
        });
    }
};

module.exports = { validarApiKey };