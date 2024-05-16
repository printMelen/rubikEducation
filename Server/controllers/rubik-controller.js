const scrambled = require('scrambled');
const Cube = require('cubejs');

function transformarCadena(cadena) {
    // Utilizar expresión regular para encontrar letras seguidas por '
    // y convertirlas a minúsculas
    cadena = cadena.replace(/(\w)'/g, function(match, p1) {
        return p1.toLowerCase();
    });

    // Reemplazar ' con la letra anterior
    cadena = cadena.replace(/'/g, function(match, offset, string) {
        // Convertir la letra anterior a código ASCII, restar 1 y volver a convertir a letra
        var letraAnterior = string.charAt(offset - 1);
        if (letraAnterior === ' ') {
            return '2'; // Si la letra anterior es un espacio, mantener '2'
        }
        return letraAnterior;
    });

    // Reemplazar '2' con la letra que tienen delante duplicada
    cadena = cadena.replace(/(\w)2/g, function(match, p1) {
        return p1 + p1;
    });

    // Eliminar espacios
    cadena = cadena.replace(/\s/g, '');

    return cadena;
}
function revertirTransformacion(cadena) {
    // Reemplazar letras minúsculas duplicadas con '2'
    cadena = cadena.replace(/([a-z])\1/g, function(match, p1) {
        return p1.toUpperCase() + '2';
    });

    // Reemplazar letras minúsculas con ' y la letra en mayúsculas
    cadena = cadena.replace(/([a-z])/g, function(match, p1) {
        return p1.toUpperCase() + "'";
    });

    // Reemplazar '2' con un espacio
    cadena = cadena.replace(/2/g, " ");

    // Añadir espacios antes de las letras mayúsculas
    cadena = cadena.replace(/([A-Z])/g, " $1");

    // Reemplazar letras mayúsculas duplicadas con la letra y '2'
    cadena = cadena.replace(/([A-Z])\1/g, function(match, p1) {
        return p1 + '2';
    });

    return cadena.trim();
}
const randomize=(req,res)=>{
    const result = scrambled.generateScrambleSync(req.body.numMoves); // Generate a scramble with 30 moves
    // console.log(result.scramble);
    
    let cadenaRandom=transformarCadena(result.scramble);
    // console.log(cadenaRandom);
    // console.log(revertirTransformacion(transformarCadena(result.scramble)));
    return res.status(200).json({
        message: "Cubo randomizado correctamente",
        result: cadenaRandom
    });
}
const solve=(req,res)=>{
    const cube = new Cube();
    cube.move(revertirTransformacion(req.body.moves));
    Cube.initSolver();
    let solucion = cube.solve();
    let solucionModif=transformarCadena(solucion);
    return res.status(200).json({
        message: "Cubo resuelto",
        result: solucionModif
    });
}

exports.randomize = randomize;
exports.solve = solve;
