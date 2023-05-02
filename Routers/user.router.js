const { Router } = require('express');
const { hashSync, compareSync } = require('bcrypt');
const { sign } = require('jsonwebtoken');
require('dotenv').config();
const { UserModel } = require('../models/user.model');
const { redis } = require('../config/redis');


const userRouter = Router();

const salt = +process.env.salt;

userRouter.get('/', (req, res) => {
    res.send('userrouter');
})

userRouter.post('/signup', async (req, res) => {
    try {
        const { email, password } = req.body;
        const userexist = await UserModel.findOne({ email });

        if (userexist) return res.status(403).send({ msg: 'user already exist, please login' });

        const user = new UserModel({ email, password: hashSync(password, salt) });
        await user.save();

        res.send(`successfully registered`);

    } catch (error) {
        res.status(404).send({ error });
    }

})


userRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) return res.status(404).send({ msg: 'user not found, please signup' });

        const checkpassword = compareSync(password, user.password);
        if (!checkpassword) return res.status(401).send({ msg: 'invalid credentials' })

        const token = sign({id:user._id, email, password }, process.env.jwtsecret, { expiresIn: 60*20 })
        res.send({ token });


    } catch (error) {
        console.log(error);
        res.status(404).send({ error });
    }

})

userRouter.post('/logout', async(req, res) => {
    const token=req.headers.authorization;
    if(!token) return res.status(401).send({msg:'not authorized'})
    await redis.sadd('blacklists',token)
    res.send('logout successful');
})

module.exports = { userRouter };