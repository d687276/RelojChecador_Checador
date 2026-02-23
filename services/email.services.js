const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 465,
    secure: true, // true para puerto 465
    auth: {
        user: process.env.EMAIL_USER || 'prestodin.sistemas@gmail.com',
        pass: process.env.EMAIL_PASS || 'jrjh pxah mzec clif',
    },
});


exports.enviarCodigo = async (emailDestino, nombreEmpleado, codigo) => {
    const urlReloj = process.env.URL_RELOJ || 'https://prestodin-checador.dyndns.org?u=${emailDestino}&c=${codigo}';

    try {

        const info = await transporter.sendMail({
            from: `"Reloj Checador Prestodin" <${process.env.EMAIL_USER}>`,
            to: emailDestino,
            subject: `Acceso Hoy: ${new Date().toLocaleDateString()}`,
            html: `
                <div style="font-family: sans-serif; background-color: #0f172a; color: #f8fafc; padding: 40px; text-align: center;">
                    <div style="max-width: 500px; margin: 0 auto; background-color: #1e293b; padding: 30px; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5);">
                        <h2 style="color: #818cf8; margin-bottom: 8px;">¡Buen día, ${nombreEmpleado}!</h2>
                        <p style="color: #94a3b8; font-size: 14px;">Aquí tienes tu llave de acceso para hoy:</p>
                        
                        <div style="margin: 25px 0; background-color: #0f172a; padding: 20px; border-radius: 12px; font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #fbbf24; border: 1px dashed #475569;">
                            ${codigo}
                        </div>

                        <p style="margin-top: 30px;">
                            <a href="${urlReloj}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2);">
                                Abrir Reloj Checador 🕒
                            </a>
                        </p>

                        <p style="font-size: 11px; color: #64748b; margin-top: 25px; line-height: 1.5;">
                            Este enlace te llevará directamente al módulo de registro.<br>
                            Recuerda que el código expira hoy a las 23:59.
                        </p>
                    </div>
                </div>
            `,
        });
        console.log(`✅ Correo enviado a ${emailDestino}`);
        return true;
    } catch (error) {
        console.error(`❌ Error:`, error);
        return false;
    }
};