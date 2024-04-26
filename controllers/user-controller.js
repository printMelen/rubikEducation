const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CONTRASENIA_JWT = "nfsdfsañalmvdp221o3m33";
const signUp = async(req,res,next)=>{
    const {nombre,correo,contrasenia} = req.body;
    let userExist;
    try {
        userExist = await User.findOne({correo:correo});
    } catch (err) {
      console.log(err);  
    }
    if(userExist){
        return res.status(400).json({message: "El usuario ya esta registrado"});
    }
    const contraseniaHasheada = bcrypt.hashSync(contrasenia);
    const user = new User({
        nombre: nombre,
        correo: correo,
        contrasenia: contraseniaHasheada,
        nivel: 0,
        rol: "user",
    });

    try{    
        await user.save();
    }catch(err){
        console.log(err);
    }

    return res.status(201).json({message:user});
}
const login = async(req,res,next)=>{
    const {correo,contrasenia} = req.body;
    let userExist;
    try {
        userExist = await User.findOne({correo:correo});
    } catch (err) {
      console.log(err);  
    }
    if(!userExist){
        return res.status(400).json({message: "El usuario no existe registrese"});
    }
    const contraseniaCorrecta = bcrypt.compareSync(contrasenia,userExist.contrasenia);
    if (!contraseniaCorrecta) {
        return res.status(400).json({message: "Datos incorrectos vuelva a intentarlo"});
    }
    const token = jwt.sign({id: userExist._id},CONTRASENIA_JWT,{
        expiresIn: '1h',
    })
    return res.status(200).json({message:"Inicio de sesión correcto",
    user: userExist , token
    });
}
exports.signUp= signUp;
exports.login= login;