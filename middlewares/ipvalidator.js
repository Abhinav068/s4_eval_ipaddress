ipvalidate = (req, res, next) => {
    const ip = req.params.ip;
    let result = /^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/.test(ip)
    if (result) {
        next();
        
    }
    else {
        res.send('invalid ip address');
    }
}

module.exports = { ipvalidate };