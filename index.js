require('dotenv').config();

const variablesObligatorias = ['DB_PASSWORD', 'API_KEY', 'EMAIL_PASS'];
variablesObligatorias.forEach(nombre => {
    if (!process.env[nombre]) {
        console.error(`❌ ERROR CRÍTICO: La variable ${nombre} no está en el .env`);
        process.exit(1); // Detiene la app si falta algo vital
    }
});

const express = require('express');
const path = require('path');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');


// ... (tus otros imports: nodemailer, cron)
const app = express();


// Middleware para entender datos JSON
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Le dice a Express que todos los archivos dentro de 'public' son accesibles
app.use(express.static(path.join(__dirname, 'public')));



// Limitamos a 10 intentos cada 15 minutos por cada dirección IP
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 20,
    // Esta función se ejecuta cuando se excede el límite
    handler: (req, res) => {
        res.status(429).render('error/limite_intentos', {
            empresa: { nombre: "Prestodin" } // O los datos que ya manejes
        });
    }
});



// 2. Endpoint de Validación
app.use("/", loginLimiter, require("./routes/index/index.routers"))
app.use("/api", require("./routes/api/api.routes"))

app.use("/auth", require("./routes/auth/auth.routes"))

// ... Aquí pegas tus rutas de /api/registrar y el código del Cron Job ...
const PORT = process.env.PORT || 4000;


app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Iniciando reloj checador ... ${PORT}`);
});