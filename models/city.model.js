const { Schema, model } = require('mongoose');

const cityModel = model('city', Schema({
    city_name: { required: true, type:String },
    userid:{required:true,type:String}
}))

module.exports={cityModel};