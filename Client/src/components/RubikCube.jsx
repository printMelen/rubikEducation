// En esta parte se importan los archivos necesarios para el correcto funcionamiento del componente.
// Los import que tienen como carpeta madre ../store son los estados globales de Zustand
// OrbitControls se utiliza para que el objeto en 3D pueda rotar pero como un bloque alrededor de la matriz global (no las rotaciones del cubo de rubik)
// RoundedBoxGeometry es un elemento geometrico como un cubo pero con los bordes redondeados
// Tween es una biblioteca que sirve para animar en el tiempo los movimientos de un objeto de THREE.js
// useRef sirve para no recargar de manera innecesaria todo el componente al actualizar variables
// useEffect sirve para ejecutar determinado codigo cuando una variable en concreto cambia
// useState sirve para gestionar el estado a lo largo del componente (de manera global se usa Zustand)

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import * as TWEEN from "https://unpkg.com/@tweenjs/tween.js@20.0.3/dist/tween.esm.js";
import React, { useRef, useEffect, useState} from "react";
import useMoves from '../store/useMoves.js';
import useCubes from '../store/useCubes.js';
import useRandom from '../store/useRandom.js';
import useSolve from '../store/useSolve.js';
import useClue from '../store/useClue.js';
import useAnimate from "../store/useAnimate.js";

// Se inicializa el componente react.
const RubikCube = () => {
  // Se declaran los estados generales de Zustand
  const { movimientos, setMovimientos } = useMoves();
  const { random, setRandom } = useRandom();
  const { animate, setAnimate } = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);
  const { cubes, setCubes } = useCubes();
  const { clue, setClue } = useClue();
  const { solve, setSolve } = useSolve();
  // Contenedor donde se va a montar la escena 3D
  const containerRef = useRef(null);
  let container;

  useEffect(() => {
    container = document.getElementById("cube");
    // Inicializo la escena de THREE.js
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe0e5e7);
    // Inicializo la camara de THREE.js con los valores recomendados
    let camera = new THREE.PerspectiveCamera(30, container.clientWidth / container.clientHeight);
    // Cambio la posicion de esta y hacia donde mira
    camera.position.set(3, 5, 8);
    camera.lookAt(scene.position);

    // Inicializo el render de THREE.js
    let renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    // Le asigno el animationLoop de tween
    renderer.setAnimationLoop(animationLoop);
    // Añado al contenedor el renderer
    containerRef.current.appendChild(renderer.domElement);
    // Evento por si la venatana cambia de tamaño durante la ejecucion 
    // se le asignan nuevos valores a las funciones en relacion al cambio de dimensiones
    window.addEventListener("resize", () => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    });

    // Inizializo el OrbitControls y especifico las opciones
    let controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.6;

    // Añado luz de ambiente a la escena
    let ambientLight = new THREE.AmbientLight('white', 0.5);
    scene.add(ambientLight);
    
    // Añado luz a la escena
    let light = new THREE.DirectionalLight('white', 0.5);
    light.position.set(1, 1, 1);
    scene.add(light);

    // Creo un array de mallas de material con los colores de cada cara del cubo
    const cubeMaterials = [
      new THREE.MeshBasicMaterial({ color: 0xdf2935 }), // Right Rojo
      new THREE.MeshBasicMaterial({ color: 0xff8800 }), // Left Naranja
      new THREE.MeshBasicMaterial({ color: 0xffffff }), // Top  Blanco
      new THREE.MeshBasicMaterial({ color: 0xffcf00 }), // Bottom Amarillo
      new THREE.MeshBasicMaterial({ color: 0x00b700 }), // Front Verde
      new THREE.MeshBasicMaterial({ color: 0x00b4d8 }), // Back Azul
    ];
    // Creo un array donde se almacenaran los 27(3^3) mini cubos que componen el cubo de rubik
    let cubies = [];
    // Anido 3 bucles for para crear los 27 mini cubos
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          // Creo la malla del cubo con el objeto RoundedBoxGeometry() y le asigno los materiales de cada cara 
          let cube = new THREE.Mesh(new RoundedBoxGeometry(), cubeMaterials);
          // Coloco el cubo en el espacio
          cube.center = new THREE.Vector3(x, y, z);
          cube.geometry.translate(x, y, z);
          // Lo añado al array de cubos
          cubies.push(cube);
        }
    setCubes(cubies);
    // Añado los 27 mini cubos a la escena
    scene.add(...cubies);
    // Vacio el localStorage
    localStorage.removeItem("cadenaRubik");

    function animationLoop(t) {
      // Actualizo el estado de todas las animaciones en curso en funcion del tiempo (t)
      TWEEN.update(t);
      // Actualizo las diferentes variables
      controls.update();
      light.position.copy(camera.position);
      // Y renderizo otra vez la escena para que se reflejen los cambios
      renderer.render(scene, camera);
    }
    //Al desmontar el componente elimino todos los objetos de este
    return () => {
      if (renderer) {
        containerRef.current.removeChild(renderer.domElement);
        renderer.dispose();
      }
      if (controls) {
        controls.dispose();
      }
    };
  }, []);

  useEffect(() => {
    // Declaro todos los movimientos que puede hacer el cubo de rubik segun su notacion
    let rotations = [
      function R() { rotate('XYZ', 'x', 1, -1) },
      function Rprima() { rotate('XYZ', 'x', 1, 1) },
      function L() { rotate('XYZ', 'x', -1, 1) },
      function Lprima() { rotate('XYZ', 'x', -1, -1) },
      function U() { rotate('YZX', 'y', 1, -1) },
      function Uprima() { rotate('YZX', 'y', 1, 1) },
      function D() { rotate('YZX', 'y', -1, 1) },
      function Dprima() { rotate('YZX', 'y', -1, -1) },
      function F() { rotate('ZXY', 'z', 1, -1) },
      function Fprima() { rotate('ZXY', 'z', 1, 1) },
      function B() { rotate('ZXY', 'z', -1, 1) },
      function Bprima() { rotate('ZXY', 'z', -1, -1) },
    ];

    // Declaro un objeto (rot) en el que almaceno el estado de la rotacion actual (k)
    // y el estado de rotacion atiguo (oldK)
    // Ademas declaro e que es una instancia de la clase Euler. 
    // Para utilizar su representacion angular (ver glosario)
    let rot = { k: 0, oldK: 0 },
      e = new THREE.Euler();
    // La funcion rotate tiene 4 parametros:
    // order (El orden en el que se aplican las rotaciones)
    // axis (El eje de rotacion)
    // sign (Los cubos que se deben rotar dependiendo de su posicion en el eje especificado)
    // horario (Direccion de la rotacion: 1 = horario, -1 = antihorario)
    function rotate(order, axis, sign, horario) {
      // Actualizo el estado para no permitir varias rotaciones al mismo tiempo
      setIsAnimating(true);
      // Recorro los cubos que cumplen las condiciones
      for (let cube of cubes) if (sign * cube.center[axis] > 0.5) {
        // Cambio el orden de rotaciones del cubo
        cube.rotation.reorder(order);
        // Roto el cubo en el eje concreto
        // Math.PI / 2 = 90º
        cube.rotation[axis] += horario * Math.PI / 2 * (rot.k - rot.oldK);
        
        // Reseteo la posicion de las rotaciones y el orden
        e.set(0, 0, 0, order);
        // Aplico las rotaciones
        e[axis] += horario * Math.PI / 2 * (rot.k - rot.oldK);
        // Le asigno al centro del cubo la rotacion de Euler
        cube.center.applyEuler(e);
      }
      // Actualizo el valor de rot
      rot.oldK = rot.k;
    }

    function restart(movimiento) {
      // Solo ejecuto la funcion si no hay una animacion en curso
      if (!isAnimating) {
        // Reinicio los valores de rotacion
        rot.k = 0;
        rot.oldK = 0;
        // Inicio la animacion
        setAnimate(true);
        // Instancio una rotacion de tween sobre el valor de la rotacion
        new TWEEN.Tween(rot)
        // Estableciendo k en 1 en el transcurso de 700 milisegundos
          .to({ k: 1 }, 700)
          // Establezco una funcion de easing que suaviza la transicion
          .easing(TWEEN.Easing.Quartic.InOut)
          // Llamo a la funcion de rotacion en la actualizacion de cada frame de la animacion
          .onUpdate(rotations[movimiento])
          // Cuando se completa la animacion pongo a false ambos estados indicando que ha terminado de realizarse
          .onComplete(() => {
            setAnimate(false);
            setIsAnimating(false);
          })
          .start();
      }
    }

    function automaticMove(result) {
      // La posicion de la letra en el string es la misma que en el array de movimientos
      // R es R y r es R prima
      let moves = "RrLlUuDdFfBb";
      // Separo la cadena creando un array con las letras de esta
      let movesArray = result.split("");
      // Declaro una promesa y recorro el array de movimientos
      let promises = movesArray.map((move, index) => new Promise(resolve => {
        // Ejecuto las rotaciones con un delay de 1s * el indice del array
        setTimeout(() => {
          let valorExistente = localStorage.getItem("cadenaRubik");
          // Actualizo el localStorage con el movimiento que se esta realizando
          if (valorExistente != null) {
            localStorage.setItem("cadenaRubik", valorExistente + move);
          } else {
            localStorage.setItem("cadenaRubik", move);
          }
          // Llamo a la funcion restart() que realiza la animacion del movimiento y 
          // como parametro paso la posicion del movimiento en la cadena de movimientos
          let mover = moves.indexOf(move);
          restart(mover);
          // Cuando se termina de hacer la animacion resuelvo la promesa
          resolve();
        }, 1000 * index);
      }));
      // Cuando se terminan todos los movimientos resuelvo todas las promesas
      return Promise.all(promises);
    }

    async function solveFun() {
      // Obtengo los movimientos realizados al cubo
      let valorExistente = localStorage.getItem("cadenaRubik");
      const bodyData = { moves: valorExistente };

      // Hago un fetch al backend que me devuelve la cadena de movimientos necesaria para resolver el cubo
      const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      };
      const response = await fetch("http://localhost:5000/rubik/solve", fetchOptions);

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const data = await response.json();

      // Si lo que quieren es una pista solo ejecuto el primer movimiento de la cadena
      if (clue) {
        const result = data.result;
        await automaticMove(result[0]);
        setClue(false);
      } else {
        // Y si quieren la resolucion total del cubo ejecuto todos los movimientos
        const result = data.result;
        await automaticMove(result);
        localStorage.removeItem("cadenaRubik");
      }
      setSolve(false);
    }

    async function shuffle() {
      const bodyData = { numMoves: 20 };
      // Hago un fetch al backend con el numero de movimientos que quiero 
      // y me devuelve la cadena de movimientos aleatorios del tamaño solicitado.
      const fetchOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      };
      const response = await fetch("http://localhost:5000/rubik/random", fetchOptions);

      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      }

      const data = await response.json();
      // Realizo los movimientos
      const result = data.result;
      await automaticMove(result);
      setRandom(false);
    }
    // Llamo a las funciones si el estado global de las variables es true
    if (random) {
      shuffle();
    }
    if (solve) {
      solveFun();
    }

    // Si no se esta resolviendo el cubo, ni desordenando, ni ejecutando un movimiento
    if (!solve && !random && !isAnimating) {
      let moves = "RrLlUuDdFfBb";
      let mover = moves.indexOf(movimientos[0]);
      // Ejecuto el movimiento del localStorage
      restart(mover);
      setMovimientos("");
    }
    // Si cualquiera de estos estados globales cambia, se vuelve a ejecutar el codigo
  }, [movimientos, random, solve]);
  // Devuelvo el div donde se montara el componente 3D
  return <div ref={containerRef} />;
};

export default RubikCube;
