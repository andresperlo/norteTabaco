const mongoose = require('mongoose')

const NorteSchema = new mongoose.Schema({

    nameClient: {
        type: String,
        trim: true,
        required: true
    },
    cellNumber:{
        type: Number,
        trim: true,
        required: true
    },
    message:{
        type: String,
        trim: true,
        required: true
    }

})

const NorteModel = mongoose.model('cigarettes', NorteSchema)

module.exports = NorteModel;