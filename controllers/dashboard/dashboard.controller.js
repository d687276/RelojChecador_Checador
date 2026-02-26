exports.GetDashboard = async (req, res) => {

    // Imagina que estos datos vienen de tu DB después del login
    const datosEmpresa = {
        nombre: "Empresa de Prueba S.A.",
        logo: "https://cdn-icons-png.flaticon.com/512/281/281764.png" // O una ruta local
    };

    res.render('dashboard/dashboard', {
        empresa: datosEmpresa,
        user: req.user // Datos del admin logueado
    });

};