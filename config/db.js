const { connect }=require('mongoose');
require('dotenv').config();
const connection=connect(process.env.mongourl)

module.exports={connection};