const User = require('../model/User');
const bcrypt = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken');

const CONTRASENIA_JWT = "nfsdfsañalmvdp221o3m33";

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
    }

    return res.status(201).json({ message: user });
}
const login = async (req, res, next) => {
    const { correo, contrasenia } = req.body;
    let userExist;
    try {
        userExist = await User.findOne({ correo: correo });
    } catch (err) {
        console.log(err);
    }
    if (!userExist) {
        return res.status(400).json({ message: "El usuario no existe registrese" });
    }
    const contraseniaCorrecta = bcrypt.compareSync(contrasenia, userExist.contrasenia);
    if (!contraseniaCorrecta) {
        return res.status(400).json({ message: "Datos incorrectos vuelva a intentarlo" });
    }
    const token = jwt.sign({ id: userExist._id }, CONTRASENIA_JWT, {
        // expiresIn: '1h',
        expiresIn: '30s',
    })

    res.cookie(String(userExist._id), token, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        sameSite: 'lax'
    });

    return res.status(200).json({
        message: "Inicio de sesión correcto",
        user: userExist, token
    });
}

const verifyToken = async (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split('=')[1];
    console.log(token);
    // const headers = req.headers['authorization'];
    // const token = headers.split(' ')[1];
    if(!token){
        return res.status(404).json({message:"Token no encontrado"});
    }
    jwt.verify(String(token),CONTRASENIA_JWT,(err,user)=>{
        if(err){
            return res.status(400).json({message:"Token invalido"});
        }
        // console.log(user.id);
        req.id = user.id;
    });
    next();
};

const getUser = async (req, res, next) => {
    const userId = req.id;
    let user;
    try {
        user = await User.findById(userId, '-contrasenia');
    } catch (err) {
        return new Error(err);
    }
    if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json({ user });
};

exports.signUp = signUp;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
