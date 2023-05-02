const express = require('express');
const cors=require('cors');
const { connection } = require('./config/db');
const { userRouter } = require('./Routers/user.router');
const { ipinfoRouter } = require('./Routers/ipinfoRouter');
const { authenticate } = require('./middlewares/authenticate.middleware');
const { logger } = require('./middlewares/logger');
require('dotenv').config(); 

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/user',userRouter);
app.use(authenticate);
app.use('/ip',ipinfoRouter);

const port = process.env.port;
app.get('/', (req, res) => {
    res.send('homepage');
})

app.listen(port, async () => {
    await connection
    console.log(`running at ${port}`);
});