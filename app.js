// console.log("Hola Buenas 🤑🥶🤯");
const express = require('express');
const mongoose = require('mongoose');
const router = require("./routes/user-routes");
const cookieParser = require('cookie-parser');

const app = express();
// app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.json());
app.use('/api',router);
mongoose
.connect("mongodb+srv://redondoalvaro:f6Y0W8GzNyiQXxiG@cluster0.bxzwdkf.mongodb.net/rubikEducation?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    app.listen(5000);
    console.log("Database conectada 😎");
}).catch((err)=>{
    console.log(err);
});

// app.use('/',(req, res, next)=>{
//     res.send("Wenas");
// });

// app.listen(5000,()=>{
//     console.log("Escuchando en el 5k");
// })
// f6Y0W8GzNyiQXxiG