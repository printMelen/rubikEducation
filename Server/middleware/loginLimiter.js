const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 60*1000,
    max: 5,
    message:
    {message:'Demasiados intentos tómate un descanso'},
    handler: (req,res,next,options)=>{
        res.status(options.statusCode).send(options.message);
    },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = loginLimiter;