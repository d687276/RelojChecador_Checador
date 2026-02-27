


exports.GetDashboard = async (req, res) => {

    const todosLosModulos = [
        { nombre: 'Dashboard', link: '/dashboard', icono: 'fa-table-columns', roles: ['admin', 'empleado'] },
        { nombre: 'Reloj Checador', link: '/checador', icono: 'fa-stopwatch', roles: ['admin'] },
        { nombre: 'Mis Asistencias', link: '/asistencias', icono: 'fa-list-check', roles: ['admin', 'empleado'] },
        { nombre: 'Configuración', link: '/settings', icono: 'fa-gear', roles: ['admin'] }
    ];

    // Filtramos el menú según el rol del usuario que viene en el token
    const menuFiltrado = todosLosModulos.filter(m => m.roles.includes('admin'));

    res.render('dashboard/dashboard', {
        menu: menuFiltrado,
        user: req.user,
        app: req.app
    });

};