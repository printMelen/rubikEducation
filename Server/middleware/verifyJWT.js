const jwt = require('jsonwebtoken');

const verifyToken=(req,res,next)=>{
    // let authorization= req.get('authorization');
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader?.startsWith('Bearer')) {
        return res.status(401).json({message: 'Unauthorized'});
    }
    // if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    //     token = authorization.substring(7);
    // }
    const token = authHeader.split(' ')[1];
    jwt.verify(token,
    process.env.ACCESS_TOKEN_SECRET,
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