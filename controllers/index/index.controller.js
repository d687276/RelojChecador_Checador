exports.Home = (req, res) => {
    ///res.sendFile(path.join(__dirname, 'public', 'index.html'));    
    const userData = { API_KEY: process.env.API_KEY };
    res.render('checador/index', { userData });
}

