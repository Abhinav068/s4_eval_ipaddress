const { Router } = require('express');
require('dotenv').config();
const { UserModel } = require('../models/user.model');
const { redis } = require('../config/redis');
const { ipvalidate } = require('../middlewares/ipvalidator');
const { cityModel } = require('../models/city.model');

const ipinfoRouter = Router();


ipinfoRouter.get('/:ip/:field', ipvalidate, async (req, res) => {
    try {
        const ip = req.params.ip;
        const field = req.params.field;

        const dataexists = await redis.exists(ip);
        if (dataexists) {
            const redisdata = await redis.hgetall(ip);
            let city = new cityModel({ city_name: redisdata.city, userid: req.body.id })
            await city.save();
            res.send({ city: redisdata.city });
        }
        else {
            let data = await fetch(`https://ipapi.co/${ip}/json/`);
            let result = await data.json();

            await redis.hmset(ip, result);
            await redis.expire(ip, 6 * 3600)
            let city = new cityModel({ city_name: redisdata.city, userid: req.body.id })
            await city.save();
            res.send({ city: result.city });

        }

    } catch (error) {
        console.log({ error });
        res.send({ error });
    }




})

module.exports = { ipinfoRouter }