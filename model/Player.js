const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
    ID: {
        type: String,
        required: true,
        unique: true
    },
    idTorneo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tournament',
        required: true
    },
    idUsuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    }
});

const Player = mongoose.model('Player', playerSchema);

module.exports = Player;
