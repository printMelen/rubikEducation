import React, { useRef, useEffect} from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";

const RubikCube2 = () => {
  // const handleStorageChange = () => {
  //   // Verifica si el cambio ocurrió en el localStorage
  //   if (window.event.key === 'miLocalStorageKey') {
  //     // Aquí puedes ejecutar la lógica que deseas cuando cambia el localStorage
  //     console.log('El localStorage ha cambiado');
  //   }
  // };

  // Agrega el event listener para el evento 'storage'
  // window.addEventListener('storage', handleStorageChange);
  let container;
  const containerRef = useRef(null);
  const renderer = useRef(null);
  const camera = useRef(null);
  const scene = useRef(null);
  const controls = useRef(null);
  let moveEvents = {};
  useEffect(() => {
    // Scene
    container = document.getElementById("cube");
    scene.current = new THREE.Scene();
    
    scene.current.background = new THREE.Color(0xe0e5e7);
    
    camera.current = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.current.position.z = 5;

    // Renderer
    renderer.current = new THREE.WebGLRenderer();
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
      [
        ["green", "green", "green"],
        ["green", "green", "green"],
        ["green", "green", "green"],
      ],
      // Cara trasera
      [
        ["blue", "blue", "blue"],
        ["blue", "blue", "blue"],
        ["blue", "blue", "blue"],
      ],
      // Cara izquierda
      [
        ["orange", "orange", "orange"],
        ["orange", "orange", "orange"],
        ["orange", "orange", "orange"],
      ],
      // Cara derecha
      [
        ["red", "red", "red"],
        ["red", "red", "red"],
        ["red", "red", "red"],
      ],
      // Cara superior
      [
        ["white", "white", "white"],
        ["white", "white", "white"],
        ["white", "white", "white"],
      ],
      // Cara inferior
      [
        ["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"],
        ["yellow", "yellow", "yellow"],
      ],
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
      3: 1,
    };
    const sentidoHorarioArray = [2, 5, 8, 1, 4, 7, 0, 3, 6];
    // Crear un grupo para cada cara del cubo
    let faces = {
      front: new THREE.Group(),
      back: new THREE.Group(),
      left: new THREE.Group(),
      right: new THREE.Group(),
      top: new THREE.Group(),
      bottom: new THREE.Group(),
    };
    let moveQueue = [];
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
          cube.rubikPosition = cube.position.clone();
        }
      }
    }
    let pivot = new THREE.Object3D();
    let activeGroup = [];
    
    function rotarXConPivot(posicion, horario, divisiones) {
      const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
      pivot.rotation.set(0, 0, 0); // Reinicia la rotación del pivot
      scene.current.add(pivot); // Agrega el pivot a la escena

      // Filtra los cubos que están en la posición deseada
      const cubosATrasladar = scene.current.children.filter(
        (cubo) => cubo.position.x === posicion
      );

      // Agrega los cubos al pivot y aplica la rotación
      cubosATrasladar.forEach((cubo) => {
        pivot.attach(cubo); // Adjunta el cubo al pivot
        cubo.rotation.x += angle; // Aplica la rotación al cubo
      });

      // Actualiza la matriz del mundo del pivot y la escena
      pivot.updateMatrixWorld();
      scene.current.remove(pivot); // Remueve el pivot de la escena

      // Actualiza las posiciones de los cubos en relación con el pivot
      cubosATrasladar.forEach((cubo) => {
        cubo.updateMatrixWorld(); // Actualiza la matriz del mundo del cubo
        cubo.rubikPosition = cubo.position.clone(); // Guarda la posición actual del cubo
        cubo.rubikPosition.applyMatrix4(pivot.matrixWorld); // Aplica la matriz del mundo del pivot a la posición del cubo
        scene.current.add(cubo); // Agrega el cubo de nuevo a la escena
      });
    }
    function rotarYConPivot(posicion, horario, divisiones) {
      const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
      pivot.rotation.set(0, 0, 0); // Reinicia la rotación del pivot
      scene.current.add(pivot); // Agrega el pivot a la escena

      // Filtra los cubos que están en la posición deseada
      const cubosATrasladar = scene.current.children.filter(
        (cubo) => cubo.position.y === posicion
      );

      // Agrega los cubos al pivot y aplica la rotación
      cubosATrasladar.forEach((cubo) => {
        pivot.attach(cubo); // Adjunta el cubo al pivot
        cubo.rotation.y += angle; // Aplica la rotación al cubo
      });

      // Actualiza la matriz del mundo del pivot y la escena
      pivot.updateMatrixWorld();
      scene.current.remove(pivot); // Remueve el pivot de la escena

      // Actualiza las posiciones de los cubos en relación con el pivot
      cubosATrasladar.forEach((cubo) => {
        cubo.updateMatrixWorld(); // Actualiza la matriz del mundo del cubo
        cubo.rubikPosition = cubo.position.clone(); // Guarda la posición actual del cubo
        cubo.rubikPosition.applyMatrix4(pivot.matrixWorld); // Aplica la matriz del mundo del pivot a la posición del cubo
        scene.current.add(cubo); // Agrega el cubo de nuevo a la escena
      });
    }
    function rotarZConPivot(posicion, horario, divisiones) {
      const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
      pivot.rotation.set(0, 0, 0); // Reinicia la rotación del pivot
      scene.current.add(pivot); // Agrega el pivot a la escena

      // Filtra los cubos que están en la posición deseada
      const cubosATrasladar = scene.current.children.filter(
        (cubo) => cubo.position.z === posicion
      );

      // Agrega los cubos al pivot y aplica la rotación
      cubosATrasladar.forEach((cubo) => {
        pivot.attach(cubo); // Adjunta el cubo al pivot
        cubo.rotation.z += angle; // Aplica la rotación al cubo
      });
      // pivot.rotation.z+=angle;

      // Actualiza la matriz del mundo del pivot y la escena
      pivot.updateMatrixWorld();
      scene.current.remove(pivot); // Remueve el pivot de la escena

      // Actualiza las posiciones de los cubos en relación con el pivot
      cubosATrasladar.forEach((cubo) => {
        cubo.updateMatrixWorld(); // Actualiza la matriz del mundo del cubo
        cubo.rubikPosition = cubo.position.clone(); // Guarda la posición actual del cubo
        cubo.rubikPosition.applyMatrix4(pivot.matrixWorld); // Aplica la matriz del mundo del pivot a la posición del cubo
        scene.current.add(cubo); // Agrega el cubo de nuevo a la escena
      });
    }
    function rotamosLaX(posicion, horario, divisiones) {
      let rotWorldMatrix = new THREE.Matrix4();
      const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
      rotWorldMatrix.makeRotationAxis("x", angle);
      // const quaternion= new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle);
      const quaternion = new THREE.Quaternion().setFromAxisAngle(
        new THREE.Vector3(1, 0, 0),
        angle
      );

      // let grupoAuxiliar = new THREE.Group();
      // grupoAuxiliar.clear();
      let cubosATrasladar = [];

      // Rotar los cubos y agregarlos a la lista de cubos a trasladar
      scene.current.children.forEach((cuboEscena) => {
        if (cuboEscena.position.x === posicion) {
          cuboEscena.rotation.set(0, 0, 0); // Reinicia la rotación del cubo
          cuboEscena.rotateOnAxis(new THREE.Vector3(1, 0, 0), angle); // Aplica la rotación al cubo
          cuboEscena.updateMatrix(); // Actualiza la matriz de transformación del cubo
          cuboEscena.updateMatrixWorld(); // Actualiza la matriz de transformación global del cubo
          cubosATrasladar.push(cuboEscena);
        }
      });

      let arrayCopiaProfunda = [];
      cubosATrasladar.forEach(function (objeto) {
        let objetoCopia = objeto.clone(); // Esto asume que tus objetos tienen un método `clone()` para crear copias profundas
        arrayCopiaProfunda.push(objetoCopia);
      });
      // Trasladar los cubos en la lista según el patrón especificado
      cubosATrasladar.forEach((cubo, index) => {
        const siguienteCuboIndex = sentidoHorarioArray[index];
        const siguienteCubo = arrayCopiaProfunda[siguienteCuboIndex];
        cubo.position.set(
          1.01,
          siguienteCubo.position.y,
          siguienteCubo.position.z
        );
        cubo.updateMatrix();
        cubo.updateMatrixWorld();
        // cubo.position.z = siguienteCubo.position.z;
        // cubo.position.y = siguienteCubo.position.y;
      });
      renderer.current.render(scene.current, camera.current);
    }
    function rotamosLaZ(posicion, horario, divisiones) {
      let rotWorldMatrix = new THREE.Matrix4();
      const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
      rotWorldMatrix.makeRotationAxis("x", angle);

      // let grupoAuxiliar = new THREE.Group();
      // grupoAuxiliar.clear();
      let cubosATrasladar = [];

      // Rotar los cubos y agregarlos a la lista de cubos a trasladar
      scene.current.children.forEach((cuboEscena) => {
        if (cuboEscena.position.z === posicion) {
          cuboEscena.rotation.set(0, 0, 0); // Reinicia la rotación del cubo
          cuboEscena.rotateOnAxis(new THREE.Vector3(0, 0, 1), angle); // Aplica la rotación al cubo
          cuboEscena.updateMatrix(); // Actualiza la matriz de transformación del cubo
          cuboEscena.updateMatrixWorld(); // Actualiza la matriz de transformación global del cubo
          cubosATrasladar.push(cuboEscena);
        }
      });

      let arrayCopiaProfunda = [];
      cubosATrasladar.forEach(function (objeto) {
        let objetoCopia = objeto.clone(); // Esto asume que tus objetos tienen un método `clone()` para crear copias profundas
        arrayCopiaProfunda.push(objetoCopia);
      });
      // Trasladar los cubos en la lista según el patrón especificado
      cubosATrasladar.forEach((cubo, index) => {
        const siguienteCuboIndex = sentidoHorarioArray[index];
        const siguienteCubo = arrayCopiaProfunda[siguienteCuboIndex];
        cubo.position.set(
          siguienteCubo.position.x,
          siguienteCubo.position.y,
          1.01
        );
        cubo.updateMatrix();
        cubo.updateMatrixWorld();
        // cubo.position.x = siguienteCubo.position.x;
        // cubo.position.y = siguienteCubo.position.y;
      });
    }
    

    let pushMove = function (cube, clickVector, axis, direction) {
      moveQueue.push({
        cube: cube,
        vector: clickVector,
        axis: axis,
        direction: direction,
      });
    };

    function rotamosLaX1(posicion, horario,divisiones) {
      const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
      const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), angle);
      
      let cubosATrasladar = [];

      // Rotar los cubos y agregarlos a la lista de cubos a trasladar
      scene.current.children.forEach(cuboEscena => {
        if (cuboEscena.position.x === posicion) {
          cuboEscena.matrixAutoUpdate = false;
          cuboEscena.applyQuaternion(quaternion);
          cuboEscena.updateMatrix();
          
          cubosATrasladar.push(cuboEscena);
        }
      });
      
      let arrayCopiaProfunda = [];
      cubosATrasladar.forEach(function(objeto) {
        let objetoCopia = objeto.clone(); // Esto asume que tus objetos tienen un método `clone()` para crear copias profundas
        arrayCopiaProfunda.push(objetoCopia);
      });
      // Trasladar los cubos en la lista según el patrón especificado
      cubosATrasladar.forEach((cubo, index) => {
        cubo.matrixAutoUpdate = false;
        const siguienteCuboIndex = sentidoHorarioArray[index];
        const siguienteCubo = arrayCopiaProfunda[siguienteCuboIndex];
        cubo.position.set(1.01,siguienteCubo.position.y,siguienteCubo.position.z);
        cubo.updateMatrix();
        console.log(cubo);
        // cubo.position.x = siguienteCubo.position.x;
        // cubo.position.y = siguienteCubo.position.y;
      });
      animate();
  }
    function rotamosLaZ2(posicion, horario,divisiones) {
      const angle = (Math.PI / divisiones) * (horario ? 1 : -1);
      const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angle);
      
      let cubosATrasladar = [];

      // Rotar los cubos y agregarlos a la lista de cubos a trasladar
      scene.current.children.forEach(cuboEscena => {
        if (cuboEscena.position.z === posicion) {
          cuboEscena.matrixAutoUpdate = false;
          cuboEscena.applyQuaternion(quaternion);
          cuboEscena.updateMatrix();
          
          cubosATrasladar.push(cuboEscena);
        }
      });
      
      let arrayCopiaProfunda = [];
      cubosATrasladar.forEach(function(objeto) {
        let objetoCopia = objeto.clone(); // Esto asume que tus objetos tienen un método `clone()` para crear copias profundas
        arrayCopiaProfunda.push(objetoCopia);
      });
      // Trasladar los cubos en la lista según el patrón especificado
      cubosATrasladar.forEach((cubo, index) => {
        cubo.matrixAutoUpdate = false;
        const siguienteCuboIndex = sentidoHorarioArray[index];
        const siguienteCubo = arrayCopiaProfunda[siguienteCuboIndex];
        cubo.position.set(siguienteCubo.position.x,siguienteCubo.position.y,1.01);
        cubo.updateMatrix();
        console.log(cubo);
        // cubo.position.x = siguienteCubo.position.x;
        // cubo.position.y = siguienteCubo.position.y;
      });
      animate();
    }  
    function Rp() {
      rotamosLaX1(1.01,true,2);
    }
    function R() {
      rotamosLaX1(1.01,false,2);
    }
    function F() {
      rotamosLaZ2(1.01,false,2);
    }
    // scene.current.children[26].scale.set(0.5, 0.5, 0.5);
    // scene.current.children[17].scale.set(0.5, 0.5, 0.5);
    
    // console.log(scene.current.children[26]);

    
    setTimeout(() => {
      
      
      
      // rotamosLaX1(1.01,true,2);
      // rotamosLaZ2(1.01,false,2);
      F();
    }, 2000);
    setTimeout(() => {
      R();
      

      // rotamosLaZ2(1.01,false,2);
      setTimeout(()=>{

      },2000);
    }, 6000);
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

export default RubikCube2;
