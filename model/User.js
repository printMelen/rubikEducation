const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema({
    // ID: {
    //     type: String,
    //     required: true,
    //     unique: true
    // },
    nombre: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    contrasenia: {
        type: String,
        required: true
    },
    nivel: {
        type: Number,
        required: true
    },
    rol: {
        type: String,
        required: true
    }
});

//Export the model
module.exports = mongoose.model('User', userSchema);