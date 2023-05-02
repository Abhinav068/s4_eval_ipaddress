const Redis=require('ioredis');
require('dotenv').config();
const redis=new Redis(process.env.redisurl);

module.exports={redis};