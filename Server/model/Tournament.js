const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    idCreador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        
    },
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    fechaInicio: {
        type: Date,
        required: true
    },
    fechaFin: {
        type: Date,
        required: true
    }
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
