const User = require('../model/User');
const bcrypt = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler')
require('dotenv').config();

const login = async (req, res, next) => {
    const { contrasenia, correo  } = req.body;
    // console.log(contrasenia);
    // console.log(correo);
    
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
    // const accessToken = jwt.sign({ id: userExist._id }, process.env.ACCESS_TOKEN_SECRET, {
    //     expiresIn: '1m',
    //     // expiresIn: '1h',
    //     // expiresIn: '30s',
    // })
    const refreshToken = jwt.sign({ id: userExist._id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '1d',
        // expiresIn: '1h',
        // expiresIn: '30s',
    })

    // res.cookie('accessToken', accessToken, {
    //     maxAge: 60000
    // });
    // res.cookie('refreshToken', refreshToken, {
    //     maxAge: 300000,
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'strict',

    // });
    const userForToken={
        id: userExist._id,
        username: userExist.nombre,
        rol: userExist.rol,
    }
    const token = jwt.sign(userForToken,process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"1m"
    });

    // res.send({
    //     name:userExist.nombre,
    //     token
    // })
    // res.cookie(String(userExist._id), token, {
    //     path: '/',
    //     expires: new Date(Date.now() + 1000 * 30),
    //     httpOnly: true,
    //     sameSite: 'lax'
    // });
    res.cookie('jwt', refreshToken, {
        path: '/',
        expires: new Date(Date.now() + 1000 * 30),
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7*24*60*60*1000,
    });

    return res.status(200).json({
        message: "Inicio de sesión correcto",
        user: userExist, token
    });
}

const refresh= (req, res)=>{
    const cookies = req.cookies;

    if (!cookies?.jwt) {
        return res.status(401).json({message: 'No autorizado'});
    }
    const refreshToken=cookies.jwt;
    jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET,asyncHandler(async(err,decoded)=>{
        if (err) {
            return res.status(403).json({message:"Prohibido"});
        }
        const usuarioEncontrado = await User.findOne({username: decoded.username});
        if (!usuarioEncontrado) {
            return res.status(401).json({message: 'No autorizado'});
        }
        const accessToken = jwt.sign({
            "UserInfo":{
                "id": usuarioEncontrado.id,
                "username": usuarioEncontrado.username,
                "rol": usuarioEncontrado.rol
            }},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:'1m'}
        )
        res.json({accessToken});
    }));
}

const logout=(req,res)=>{
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        return res.status(204);
    }
    res.clearCookie('jwt',{httpOnly: true, sameSite:'None', secure: true});
    res.json({message: 'Cookie limpiada'});
}

exports.login = login;
exports.refresh = refresh;
exports.logout = logout;