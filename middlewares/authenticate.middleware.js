const { sign, verify } = require('jsonwebtoken');
const { redis } = require('../config/redis');

require('dotenv').config();

const authenticate = async (req,res,next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).send({ msg: 'not authorized' })
        const isblacklist = await redis.sismember('blacklists', token);
        if (isblacklist) return res.status(403).send({ msg: 'please login' })
    
        const istokenvalid= verify(token, process.env.jwtsecret);
        if(!istokenvalid) return res.status(403).send({ msg: 'please login' });
        req.body.id=istokenvalid.id;
        next();
        
    } catch (error) {
        res.status(403).send({ error});
    }
}

module.exports = { authenticate };