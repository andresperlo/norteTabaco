const mongoose = require('mongoose')

const LoginSchema = new mongoose.Schema({
    
    username:{
        type: String,
        trim: true,
        required:true,
        lowercase:true
    },
    password:{
        type: String,
        required:true,
        trim: true,
    },
    token:[String]
})

const LoginModel = mongoose.model('Admin', LoginSchema)

module.exports = LoginModel;
