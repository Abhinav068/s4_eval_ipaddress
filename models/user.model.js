const { Schema, model } = require('mongoose');

const UserModel = model('user', Schema({
    email: { required: true, unique: true, type:String },
    password:{required:true,type:String}
}))

module.exports={UserModel};