const jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    // let authorization= req.get('authorization');
    // console.log("Hola");
    const authHeader = req.headers.authorization || req.headers.Authorization;
    let token;
    let secret;
    // console.log(authHeader);
    if (authHeader==undefined) {
        // console.log("No hay token");
        token=req.cookies.jwt;
        secret=process.env.REFRESH_TOKEN_SECRET;
    }else{
        token = authHeader.split(' ')[1];
        secret=process.env.ACCESS_TOKEN_SECRET;
    }
    // if (!authHeader?.startsWith('Bearer')) {
    //     return res.status(401).json({message: 'No autorizado'});
    // }
    // if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    //     token = authorization.substring(7);
    // }
    // const token = authHeader.split(' ')[1];
    // const token = req.cookies.jwt;
    // console.log(token);
    jwt.verify(token,
    secret,
    (err,decoded)=>{
        if (err) {
            return res.status(403).json({message: 'Prohibido'})
        }
        req.id=decoded.id;  
        req.user=decoded.username;
        req.rol=decoded.rol;
        next();
    }
    )
}
module.exports=verifyToken;