const bcrypt = require('bcryptjs');

// Para cuando crees un usuario nuevo
exports.encriptarPassword = async (passwordClaro) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(passwordClaro, salt);
};

// Para el Login (comparación)
exports.compararPassword = async (passwordIngresado, passwordGuardado) => {
    return await bcrypt.compare(passwordIngresado, passwordGuardado);
};