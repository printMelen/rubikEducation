const User = require('../model/User');
const Tournament = require('../model/Tournament');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const e = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const signUp = async (req, res, next) => {
    const { nombre, correo, contrasenia } = req.body;
    let userExist;
    try {
        userExist = await User.findOne({ correo: correo });
    } catch (err) {
        console.log(err);
    }
    if (userExist) {
        return res.status(400).json({ message: "El usuario ya esta registrado" });
    }
    const contraseniaHasheada = bcrypt.hashSync(contrasenia);
    const user = new User({
        nombre: nombre,
        correo: correo,
        contrasenia: contraseniaHasheada,
        nivel: 0,
        rol: "user",
    });

    try {
        await user.save();
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Error registrando al usuario" });
    }

    return res.status(201).json({ message: user });
}



// const verifyToken = async (req, res, next) => {
//     const cookies = req.headers.cookie;
//     const token = cookies.split('=')[1];
//     // const token = cookies.split('=')[1];
//     // console.log(token);
//     // let authorization= req.get('authorization');
//     // let token='';
//     // if (authorization && authorization.toLowerCase().startsWith('bearer')) {
//     //     token = authorization.substring(7);
//     // }
//     // let decodedToken = {};
//     // try {
//         // decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
//     // } catch (e) {
//     // }

//     // if (!token || !decodedToken.id) {
//     //     return res.status(400).json({message:"Token invalido"});
//     // }
//     // const headers = req.headers['authorization'];
//     // const token = headers.split(' ')[1];
//     if(!token){
//         return res.status(404).json({message:"Token no encontrado"});
//     }
//     jwt.verify(String(token),process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
//         if(err){
//             return res.status(400).json({message:"Token invalido"});
//         }
//         // console.log(user.id);
//         req.id = user.id;
//     });
//     next();
// };

const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        // user = await User.findById(userId, '-contrasenia').populate('Tournament');
        user = await User.findById(userId, '-contrasenia');
        // const userIdObject = mongoose.Types.ObjectId(userId.toString());
        // Cuenta los documentos que coincidan con el idCreador
        // const torneos = await Tournament.countDocuments({ idCreador: userIdObject });
        // console.log(torneos);
    }  catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error al obtener el usuario y los torneos" });
    }
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ user});
};

exports.signUp = signUp;
// exports.verifyToken = verifyToken;
exports.getUser = getUser;
