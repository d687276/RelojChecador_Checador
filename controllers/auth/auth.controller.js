const pg = require('../../database/db.middleware');
const passwordHelper = require('../../helper/password.middleware')
const tokenHelper = require('../../helper/token.middleware');


exports.Login = (req, res) => {
    const userData = { API_KEY: process.env.API_KEY };
    res.render('login/login', { userData });
}


exports.Logout = (req, res) => {
    res.render('login/login', { userData });
}


exports.LoginPost = async (req, res) => {
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

            console.log("Usuario valido: " + TextUsuario);

            const token = tokenHelper.generarToken(result.rows[0]); // Tu función que usa jwt

            res.cookie('access_token', token, {
                httpOnly: true,
                secure: false, // true si usas https
                maxAge: 3600000 // 1 hora
            });

            res.redirect('/dashboard');
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

