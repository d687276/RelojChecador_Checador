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
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');


// ... (tus otros imports: nodemailer, cron)
const app = express();

// Le dice a Express que todos los archivos dentro de 'public' son accesibles
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para entender datos JSON
app.use(cookieParser());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(bodyParser.json());
app.use(expressLayouts);




app.set('layout', 'layouts/master');
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');




app.use((req, res, next) => {
    res.locals.app = { "name": "IQ" }
    next()
})


// 2. Endpoint de Validación
app.use("/api", require("./routes/api/api.routes"))

app.use("/auth", require("./routes/auth/auth.routes"))
app.use("/dashboard", require("./routes/dashboard/dashboard.routes"))
app.use("/checador", require("./routes/checador/checador.routes"))


app.use((req, res) => {
    // Si la petición es para una página web
    if (req.accepts('html')) {
        return res.status(404).render('error/404', {
            url: req.url,
            empresa: "Prestodin",
            layout: false
        });
    }

    // Si es una petición de API (JSON)
    res.status(404).json({
        success: false,
        message: "Recurso no encontrado"
    });
});


// ... Aquí pegas tus rutas de /api/registrar y el código del Cron Job ...
const PORT = process.env.PORT || 4000;


app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Iniciando reloj checador ... ${PORT}`);
});
