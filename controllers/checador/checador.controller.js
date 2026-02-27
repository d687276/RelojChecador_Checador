

exports.Home = (req, res) => {
    const userData = { API_KEY: process.env.API_KEY };
    res.render('checador/checador', { userData, layout: false });
}

