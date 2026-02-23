const pg = require('../../database/db.middleware');


exports.Register = async (req, res) => {
    const { codigoIngresado, uidDispositivo, usuarioClave } = req.body;

    console.log("Validando " + usuarioClave + "/" + codigoIngresado)

    try {
        // Buscamos el código, el usuario y el UID en un solo paso
        // Filtramos por fecha actual para que códigos viejos no sirvan
        const query = 'select public.reloj_checador_exec($1, $2, $3) as resultado';
        const result = await pg.query(query, [codigoIngresado, usuarioClave, uidDispositivo]);

        if (result.rows[0].resultado) {
            // AQUÍ: Podrías insertar en otra tabla de "asistencias_log" el éxito
            // console.log(`✅ Acceso concedido a: ${email}`);

            res.status(200).json({
                success: true,
                message: "¡Registro exitoso!"
            });
        } else {
            // Si no encuentra coincidencia exacta
            res.status(401).json({
                success: false,
                message: "Validación fallida. Revisa el código o el equipo donde estás checando."
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


exports.Status = async (req, res) => {
    const { uidDispositivo } = req.body;

    try {
        // Buscamos el código, el usuario y el UID en un solo paso
        // Filtramos por fecha actual para que códigos viejos no sirvan
        const query = 'select public.reloj_checador_status_sps($1) as resultado';
        const result = await pg.query(query, [uidDispositivo]);

        res.status(200).json({
            result: result.rows[0].resultado
        })
    } catch (err) {
        console.error("❌ Error en BD:", err); // Esto se queda en tu servidor (PM2 logs)
        res.status(500).json({
            success: false,
            message: "Ocurrió un error al procesar la solicitud. Por favor, intente más tarde."
        });
    }
}


exports.HW_Validate = async (req, res) => {
    const { uidDispositivo } = req.body;
    console.log("Equipo a validar: " + uidDispositivo)

    try {
        // Buscamos el código, el usuario y el UID en un solo paso
        // Filtramos por fecha actual para que códigos viejos no sirvan
        const query = 'select count(idx) as resultado from reloj_checador_dispositivos where trim(hwid) = trim($1)';
        const result = await pg.query(query, [uidDispositivo]);

        if (result.rows[0].resultado > 0) {
            // AQUÍ: Podrías insertar en otra tabla de "asistencias_log" el éxito
            // console.log(`✅ Acceso concedido a: ${email}`);            
            res.status(200).json({
                success: true,
                message: ""
            })
        } else {
            // Si no encuentra coincidencia exacta
            res.status(401).json({
                success: false,
                message: ""
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


