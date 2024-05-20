// console.log("Hola Buenas 🤑🥶🤯");
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require("./routes/user-routes");
const rubikRouter = require("./routes/rubik-routes");
const cookieParser = require('cookie-parser');
// const Cube = require('cubejs');

require('dotenv').config();

const app = express();


// const cube = new Cube();

// console.log(Cube.scramble());

// cube.randomize();
// console.log(cube.sequence);

// const cubeRandom = Cube.random();
// const randomCube = Cube.random();

// console.log(randomCube);
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true // Si estás enviando cookies con la solicitud
  }));
  
app.use(cookieParser());
app.use(express.json());
app.use('/auth',require('./routes/auth-routes'));
app.use('/api',router);
app.use('/rubik',rubikRouter);
// console.log(process.env.DATABASE_URL);
// mongoose
// .connect(process.env.DATABASE_URL)
// .then(()=>{
//     app.listen(5000);
//     console.log("Database conectada 😎");
// }).catch((err)=>{
//     console.log(err);
// });

app.use('/',(req, res, next)=>{
    res.send("Wenas");
});

app.listen(5000,()=>{
    console.log("Escuchando en el 5k");
})
// f6Y0W8GzNyiQXxiG