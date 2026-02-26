const pg = require('../../database/db.middleware');
const passwordHelper = require('../../helper/password.helper')
const tokenHelper = require('../../helper/token.helper');

const Joi = require('joi');


const loginSchema = Joi.object({
    // Aquí limitamos el tamaño máximo para evitar el desbordamiento
    TextUsuario: Joi.string().min(2).max(30).required().messages({
        'string.max': 'El usuario es demasiado largo',
        'string.min': 'El usuario es demasiado corto'
    }),
    TextPassword: Joi.string().min(6).max(30).required().messages({
        'string.max': 'La contraseña es demasiado larga',
        'string.min': 'La contraseña es demasiado corta'
    })
});





exports.Login = (req, res) => {
    const userData = { API_KEY: process.env.API_KEY };
    res.render('login/login', { userData });
}


exports.Logout = (req, res) => {
    res.clearCookie('access_token');
    res.render('login/login');
}


exports.Logout = (req, res) => {
    // Borramos la cookie que creamos en el login
    res.clearCookie('access_token');

    // Redirigimos a una página de "Sesión Finalizada"
    res.render('login/logout', {
        empresa: "Prestodin"
    });
}


exports.LoginPost = async (req, res) => {
    const { error } = loginSchema.validate(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message
        });
    }

    const { TextUsuario, TextPassword } = req.body;

    try {
        // Buscamos el código, el usuario y el UID en un solo paso
        // Filtramos por fecha actual para que códigos viejos no sirvan
        const query = 'SELECT * FROM seguridad.usuarios WHERE usuario = $1';
        const result = await pg.query(query, [TextUsuario]);

        if (result.rows.length === 0) {
            return res.status(401).json({ success: false, message: "Nombre de usuario o contraseña invalido" });
        }

        const matchPassword = await passwordHelper.compararPassword(TextPassword, result.rows[0].password);

        if (matchPassword) {
            // AQUÍ: Podrías insertar en otra tabla de "asistencias_log" el éxito
            // console.log(`✅ Acceso concedido a: ${email}`);

            const token = tokenHelper.generarToken(result.rows[0]); // Tu función que usa jwt

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: false, // true si usas https
                maxAge: 3600000 // 1 hora
            });

            //res.redirect('/dashboard');

            res.status(200).json({
                success: true,
                message: "Acceso concedido"
            });
        } else {
            // Si no encuentra coincidencia exacta
            res.status(401).json({
                success: false,
                message: "Nombre de usuario o contraseña invalido"
            });
        }

    } catch (err) {
        console.error("❌ Error en BD:", err); // Esto se queda en tu servidor (PM2 logs)
        res.status(500).json({
            success: false,
            message: "Ocurrió un error al procesar la solicitud. Por favor, intente más tarde."
        });
    }
}

