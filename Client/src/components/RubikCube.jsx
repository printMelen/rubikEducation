import React, { useRef, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";

const RubikCube = () => {
    let container;
    const containerRef = useRef(null);
  const renderer = useRef(null);
  const camera = useRef(null);
  const scene = useRef(null);
  const controls = useRef(null);

  useEffect(() => {
    // Scene
    container = document.getElementById('cube');
    scene.current = new THREE.Scene();
    // scene.current.background = new THREE.Color( 0xF2FDFF );
    scene.current.background = new THREE.Color( 0xE0E5E7 );
    // Camera
    // camera.current = new THREE.PerspectiveCamera(
    //   75,
    //   window.innerWidth / window.innerHeight,
    //   0.1,
    //   1000
    // );
    // camera.current = new THREE.PerspectiveCamera(
    //   75,
    //   containerRef.current.clientWidth / containerRef.current.clientHeight,
    //   0.1,
    //   1000
    // );
    camera.current = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.current.position.z = 5;

    // Renderer
    renderer.current = new THREE.WebGLRenderer();
    // renderer.current.setClearColor( 0xF0CE06, 0);
    // renderer.current.setSize(window.innerWidth, window.innerHeight);
    // renderer.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.current.setSize(container.clientWidth, container.clientHeight);
    containerRef.current.appendChild(renderer.current.domElement);

    // Controls
    controls.current = new OrbitControls(
      camera.current,
      renderer.current.domElement
    );

    // Cubes
    const cubeSize = 1;
    const separation = 0.01;
    const totalCubes = 3;
    let rubiksCube = [
      // Cara frontal
      [['green', 'green', 'green'], ['green', 'green', 'green'], ['green', 'green', 'green']],
      // Cara trasera
      [['blue', 'blue', 'blue'], ['blue', 'blue', 'blue'], ['blue', 'blue', 'blue']],
      // Cara izquierda
      [['orange', 'orange', 'orange'], ['orange', 'orange', 'orange'], ['orange', 'orange', 'orange']],
      // Cara derecha
      [['red', 'red', 'red'], ['red', 'red', 'red'], ['red', 'red', 'red']],
      // Cara superior 
      [['white', 'white', 'white'], ['white', 'white', 'white'], ['white', 'white', 'white']],
      // Cara inferior
      [['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow'], ['yellow', 'yellow', 'yellow']]
  ];
    const cubeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xdf2935 }), // Right
      new THREE.MeshBasicMaterial({ color: 0xff8800 }), // Left
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // Top
      new THREE.MeshBasicMaterial({ color: 0xffcf00 }), // Bottom
      new THREE.MeshBasicMaterial({ color: 0x00b700 }), // Front
      new THREE.MeshBasicMaterial({ color: 0x00b4d8 }), // Back
    ];
    const sentidoHorario = {
      0: 2,
      1: 5,
      2: 8,
      5: 7,
      8: 6,
      7: 3,
      6: 0,
      3: 1
    };
    const sentidoHorarioArray =[
      2,
      5,
      8,
      1,
      4,
      7,
      0,
      3,
      6,
    ];
    // Crear un grupo para cada cara del cubo
let faces = {
    front: new THREE.Group(),
    back: new THREE.Group(),
    left: new THREE.Group(),
    right: new THREE.Group(),
    top: new THREE.Group(),
    bottom: new THREE.Group()
};
let moveQueue =[];
for (let x = 0; x < totalCubes; x++) {
  for (let y = 0; y < totalCubes; y++) {
    for (let z = 0; z < totalCubes; z++) {
      const cubeGeometry = new THREE.BoxGeometry(
        cubeSize,
        cubeSize,
        cubeSize
      );
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
      cube.position.set(
        (cubeSize + separation) * (x - (totalCubes - 1) / 2),
        (cubeSize + separation) * (y - (totalCubes - 1) / 2),
        (cubeSize + separation) * (z - (totalCubes - 1) / 2)
      );
      scene.current.add(cube);
    }
  }
}


let pushMove = function(cube, clickVector, axis, direction) {
  moveQueue.push({ cube: cube, vector: clickVector, axis: axis, direction: direction });
}

// Añadir los cubos a las caras correspondientes
// for (let x = 0; x < totalCubes; x++) {
//     for (let y = 0; y < totalCubes; y++) {
//         for (let z = 0; z < totalCubes; z++) {
//             const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
//             const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
//             cube.position.set(
//                 (cubeSize + separation) * (x - (totalCubes - 1) / 2),
//                 (cubeSize + separation) * (y - (totalCubes - 1) / 2),
//                 (cubeSize + separation) * (z - (totalCubes - 1) / 2)
//             );
//             // Añadir el cubo a la cara correspondiente
//             if (x === 0) faces.left.add(cube);
//             if (x === totalCubes - 1) faces.right.add(cube);
//             if (y === 0) faces.bottom.add(cube);
//             if (y === totalCubes - 1) faces.top.add(cube);
//             if (z === 0) faces.front.add(cube);
//             if (z === totalCubes - 1) faces.back.add(cube);
//         }
//     }
// }

// Añadir los grupos de caras a la escena
// Object.values(faces).forEach(face => scene.current.add(face));

// Función para rotar una cara


// Función para mover una cara


// Ejemplo de uso
// Renderizar la escena
// renderer.current.render(scene.current, camera.current);


  //   function rotamosLaX(posicion, horario,divisiones) {
  //     const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
  //     const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle);
      
  //     let grupoAuxiliar = new THREE.Group();
  //     grupoAuxiliar.clear();
  //     let objetosEscena = scene.current.children.slice(); // Creamos una copia del arreglo para evitar problemas al modificarlo
      
  //     objetosEscena.forEach(cuboEscena => {
  //         if (cuboEscena.position.x === posicion) {
  //           grupoAuxiliar.add(cuboEscena);
  //         }
  //       });
  //       grupoAuxiliar.setRotationFromQuaternion(quaternion);
      
  //     scene.current.add(grupoAuxiliar); // Agregamos el grupo a la escena una vez que todos los objetos estén rotados
  // }
  //   function rotamosLaX(posicion, horario,divisiones) {
  //     const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
  //     const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle);
      
  //     let grupoAuxiliar = new THREE.Group();
  //     grupoAuxiliar.clear();
  //     let objetosEscena = scene.current.children.slice(); // Creamos una copia del arreglo para evitar problemas al modificarlo
      
  //     objetosEscena.forEach(cuboEscena => {
  //         if (cuboEscena.position.x === posicion) {
  //           grupoAuxiliar.add(cuboEscena);
  //         }
  //       });
  //       grupoAuxiliar.setRotationFromQuaternion(quaternion);
      
  //     scene.current.add(grupoAuxiliar); // Agregamos el grupo a la escena una vez que todos los objetos estén rotados
  // }
  
    
  
  
  
  
//     function rotamosLaX(posicion, horario,divisiones) {
//       const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
//       const quaternion= new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle);
      
//       // let grupoAuxiliar = new THREE.Group();
//       // grupoAuxiliar.clear();
//       let cubosATrasladar = [];

//       // Rotar los cubos y agregarlos a la lista de cubos a trasladar
//       scene.current.children.forEach(cuboEscena => {
//         if (cuboEscena.position.x === posicion) {
//           // cuboEscena.rotateOnAxis(axis, angle);
//           cuboEscena.applyQuaternion(quaternion);
//           cuboEscena.updateMatrix();
//           // const cuaternionFinal = cuboEscena.quaternion.clone();
//           // cuaternionFinal.multiply(nuevaRotacionEjeX);
//           // cuboEscena.setRotationFromQuaternion(cuaternionFinal);
//           // cuboEscena.setRotationFromQuaternion(quaternion);
//           cubosATrasladar.push(cuboEscena);
//         }
//       });
    
//       // let arrayCopiaProfunda = [];
//       // cubosATrasladar.forEach(function(objeto) {
//       //   let objetoCopia = objeto.clone(); // Esto asume que tus objetos tienen un método `clone()` para crear copias profundas
//       //   arrayCopiaProfunda.push(objetoCopia);
//       // });
//       // // Trasladar los cubos en la lista según el patrón especificado
//       // cubosATrasladar.forEach((cubo, index) => {
//       //   const siguienteCuboIndex = sentidoHorarioArray[index];
//       //   const siguienteCubo = arrayCopiaProfunda[siguienteCuboIndex];
//       //   cubo.position.set(1.01,siguienteCubo.position.y,siguienteCubo.position.z);
        
//       //   // cubo.position.z = siguienteCubo.position.z;
//       //   // cubo.position.y = siguienteCubo.position.y;
//       // });
//       // renderer.current.render(scene.current,camera.current);

//   }
//     function rotamosLaZ(posicion, horario,divisiones) {
//       const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
//       const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
      
//       // let grupoAuxiliar = new THREE.Group();
//       // grupoAuxiliar.clear();
//       let cubosATrasladar = [];

//       // Rotar los cubos y agregarlos a la lista de cubos a trasladar
//       scene.current.children.forEach(cuboEscena => {
//         if (cuboEscena.position.z === posicion) {
//           // cuboEscena.rotateOnAxis(axis, angle);
//           cuboEscena.applyQuaternion(quaternion);
//           // const cuaternionFinal = cuboEscena.quaternion.clone();
//           // cuaternionFinal.multiply(nuevaRotacionEjeZ);
//           // cuboEscena.setRotationFromQuaternion(cuaternionFinal);
//           // cuboEscena.setRotationFromQuaternion(quaternion);
//           cubosATrasladar.push(cuboEscena);
//         }
//       });
    
//       let arrayCopiaProfunda = [];
//       cubosATrasladar.forEach(function(objeto) {
//         let objetoCopia = objeto.clone(); // Esto asume que tus objetos tienen un método `clone()` para crear copias profundas
//         arrayCopiaProfunda.push(objetoCopia);
//       });
//       // Trasladar los cubos en la lista según el patrón especificado
//       cubosATrasladar.forEach((cubo, index) => {
//         const siguienteCuboIndex = sentidoHorarioArray[index];
//         const siguienteCubo = arrayCopiaProfunda[siguienteCuboIndex];
//         // let vectorPosicion = new THREE.Vector3(siguienteCubo.position.x, siguienteCubo.position.y, 1.01);
// // vectorPosicion.applyQuaternion(quaternion);
// // cubo.position.set(vectorPosicion.x, vectorPosicion.y, vectorPosicion.z);
//         cubo.position.set(siguienteCubo.position.x,siguienteCubo.position.y,1.01);
        
//         // cubo.position.x = siguienteCubo.position.x;
//         // cubo.position.y = siguienteCubo.position.y;
//       });
//       renderer.current.render(scene.current,camera.current);
//   }
    // scene.current.children[26].scale.set(0.5,0.5,0.5);
    console.log(scene.current.children[26]);
    scene.current.children[26].rotation.x=(Math.PI / 2);
    // scene.current.children[19].scale.set(0.5,0.5,0.5);
    // console.log(scene.current.children[24]);
    // console.log("Antes de la rotacion: ");
    // console.log(scene.current.children);
    // console.log(scene.current.children[26]);
    setTimeout(()=>{
      // console.log("Antes: ");
      // console.log(scene.current.children[24]);
    //   rotamosLaZ(1.01,false,2);
      // console.log("Despues: ");
      // console.log(scene.current.children[24]);
      // rotamosLaX(1.01,false,2);
      // console.log("Hijos después de la z: ");
      // console.log(scene.current.children);
      
      // scene.current.children[26].position.x+=3;
      // rotamosLaX(1.01,false,2);
      // console.log("Después de la rotacion: ");
      // console.log(scene.current.children[26]);
    },2000);
    setTimeout(()=>{
      // console.log("Antes 2 🥶: ");
      // console.log(scene.current.children[24]);
      // scene.current.children[24].position.x=3;
      // rotamosLaZ(1.01,false,2);
    //   rotamosLaX(1.01,false,2);
      // console.log("Despues 2 🥵: ");
      // console.log(scene.current.children[24]);
      // console.log(scene.current.children[24]);
      // console.log("Hijos después de la x: ");
      // console.log(scene.current.children);
      // rotamosLaZ(1.01,true);
      // scene.current.children.forEach(cuboEscena => {
      //   if (cuboEscena.position.x=1.01&&) {
          
      //   }
      //   console.log(cuboEscena);
      // });
    },4000);
    // rotamosLaZ(1.01,true);
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      controls.current.update();
      renderer.current.render(scene.current, camera.current);
    };
    animate();

    // Cleanup
    return () => {
      containerRef.current.removeChild(renderer.current.domElement);
      renderer.current.dispose();
      controls.current.dispose();
    };
  }, []);
  return <div ref={containerRef} />;
};

export default RubikCube;
