const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'sa',
    host: process.env.DB_HOST || '10.88.1.6',
    database: process.env.DB_NAME || 'RecHumanos',
    password: process.env.DB_PASSWORD || 'shecsid',
    port: process.env.DB_PORT || 5432,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('❌ Error de conexión al VPS (10.88.1.6):', err.stack);
    }
    console.log('🚀 Conexión exitosa a la DB "RecHumanos" en el VPS.');
    release(); // Suelta el cliente de vuelta al pool
});


module.exports = pool