const Joi = require('joi');

// 1. Definimos tu esquema de seguridad (El Escudo)
const loginSchema = Joi.object({
    TextUsuario: Joi.string().min(3).max(30).required(),
    TextPassword: Joi.string().min(4).max(50).required()
});

// 2. Simulamos diferentes ataques o errores
const casosDePrueba = [
    {
        nombre: "Ataque de Desbordamiento (Usuario Gigante)",
        datos: { TextUsuario: "A".repeat(10000), TextPassword: "123" }
    },
    {
        nombre: "Ataque de Campo Vacío",
        datos: { TextUsuario: "", TextPassword: "123" }
    },
    {
        nombre: "Usuario Válido",
        datos: { TextUsuario: "admin_prestodin", TextPassword: "PasswordSeguro123" }
    }
];

// 3. Ejecutamos la prueba
console.log("=== INICIANDO PRUEBA DE ESTRÉS DE SEGURIDAD ===\n");

casosDePrueba.forEach((prueba) => {
    const { error } = loginSchema.validate(prueba.datos);

    if (error) {
        console.log(`❌ [RECHAZADO] - ${prueba.nombre}`);
        console.log(`   Razón: ${error.details[0].message}\n`);
    } else {
        console.log(`✅ [APROBADO] - ${prueba.nombre}\n`);
    }
});