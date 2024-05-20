import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import * as TWEEN from "https://unpkg.com/@tweenjs/tween.js@20.0.3/dist/tween.esm.js";
import React, { useRef, useEffect, useState,forwardRef, useImperativeHandle } from "react";
import useMoves from '../store/useMoves.js';
import useCubes from '../store/useCubes.js';
import useRandom from '../store/useRandom.js';
import useSolve from '../store/useSolve.js';

import useClue from '../store/useClue.js';

// import Cube from "./cube.js";

// general setup, boring, skip to the next comment
const RubikCube2 = () => {
  const { movimientos,setMovimientos } = useMoves();
  const { random,setRandom } = useRandom();
  const [isAnimating, setIsAnimating] = useState(false);
  const { cubes, setCubes } = useCubes();
  const { clue, setClue } = useClue();
  const { solve, setSolve } = useSolve();

// const RubikCube2 = () => {
// const RubikCube2 = forwardRef((props, ref) => {
  // useImperativeHandle(ref, () => ({
    //   log() {
      //     console.log("child function");
      //   }
      // }));
      // console.clear( );
      const containerRef = useRef(null);
      // let containerRef;
let container;
// const hacerMovimiento = () => {
// };
// useEffect(() => {
//   hacerMovimiento();
// }, [movimientos]);
useEffect(() => {

  container = document.getElementById("cube");
  
  let scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e5e7);
  let camera = new THREE.PerspectiveCamera( 30,  container.clientWidth / container.clientHeight );
      camera.position.set( 3, 5, 8 );
      camera.lookAt( scene.position );
  
  let renderer = new THREE.WebGLRenderer( {antialias: true} );
      renderer.setSize( container.clientWidth, container.clientHeight );
      renderer.setAnimationLoop( animationLoop );
      containerRef.current.appendChild(renderer.domElement);
      // document.body.appendChild( renderer.domElement );
        
  window.addEventListener( "resize", (event) => {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix( );
      renderer.setSize( container.clientWidth, container.clientHeight );
  });
  
  let controls = new OrbitControls( camera, renderer.domElement );
      controls.enableDamping = true;
      controls.autoRotate = false;
      // controls.autoRotate = true;
      controls.autoRotateSpeed = 0.6;
  
  let ambientLight = new THREE.AmbientLight( 'white', 0.5 );
      scene.add( ambientLight );
  
  let light = new THREE.DirectionalLight( 'white', 0.5 );
      light.position.set( 1, 1, 1 );
      scene.add( light );
  
  const cubeMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xdf2935 }), // Right
    new THREE.MeshBasicMaterial({ color: 0xff8800 }), // Left
    new THREE.MeshBasicMaterial({ color: 0xffffff }), // Top
    new THREE.MeshBasicMaterial({ color: 0xffcf00 }), // Bottom
    new THREE.MeshBasicMaterial({ color: 0x00b700 }), // Front
    new THREE.MeshBasicMaterial({ color: 0x00b4d8 }), // Back
  ];
  let cubies = [];
  for( let x=-1; x<=1; x++ )
  for( let y=-1; y<=1; y++ )
  for( let z=-1; z<=1; z++ )
  {
      let cube = new THREE.Mesh( new RoundedBoxGeometry( ), cubeMaterials );
      cube.center = new THREE.Vector3( x, y, z );
      cube.geometry.translate( x, y, z );
      cubies.push( cube );
  }
  setCubes(cubies);
  scene.add( ...cubies );
  localStorage.removeItem("cadenaRubik");
  
  
  function animationLoop( t )
  {
      TWEEN.update( t );
      controls.update( );
      light.position.copy( camera.position );
      renderer.render( scene, camera );
  }
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
useEffect(()=>{
  let rotations = [
    function R( )  { rotate( 'XYZ', 'x',  1, -1 ) },
    function Rprima( ) { rotate( 'XYZ', 'x',  1,  1 ) },

    function L( )   { rotate( 'XYZ', 'x', -1,  1 ) },
    function Lprima( )  { rotate( 'XYZ', 'x', -1, -1 ) },

    function U( )    { rotate( 'YZX', 'y',  1, -1 ) },
    function Uprima( )   { rotate( 'YZX', 'y',  1,  1 ) },

    function D( ) { rotate( 'YZX', 'y', -1,  1 ) },
    function Dprima( ){ rotate( 'YZX', 'y', -1, -1 ) },

    function F( )  { rotate( 'ZXY', 'z',  1, -1 ) },
    function Fprima( ) { rotate( 'ZXY', 'z',  1,  1 ) },

    function B( )   { rotate( 'ZXY', 'z', -1,  1 ) },
    function Bprima( )  { rotate( 'ZXY', 'z', -1, -1 ) },
];



let rot = {k:0, oldK:0},
  e = new THREE.Euler( );

function rotate( order, axis, sign, horario )
{
setIsAnimating(true);
  for( let cube of cubes ) if( sign*cube.center[axis] > 0.5 )
  {
      cube.rotation.reorder( order );
      cube.rotation[axis] += horario * Math.PI/2 * (rot.k-rot.oldK);
      
      e.set( 0, 0, 0, order );
      e[axis] += horario * Math.PI/2 * (rot.k-rot.oldK);
      cube.center.applyEuler( e );
  }
  rot.oldK = rot.k;
  setIsAnimating(false);
}
  function restart(movimiento)
  {
    if (!isAnimating) {
      rot.k = 0;
      rot.oldK = 0;
      new TWEEN.Tween( rot )
        .to( {k:1}, 700 )
        .easing( TWEEN.Easing.Quartic.InOut )
        .onUpdate( rotations[movimiento])
        .start();
    }
  }
  function automaticMove(result) {
    let moves="RrLlUuDdFfBb";
    // if (result.length<=1) {
      
    // }else{
      
    // }
  let movesArray = result.split("");

  // Mapea cada movimiento a una promesa que se resuelve después del setTimeout
  let promises = movesArray.map((move, index) => new Promise(resolve => {
    setTimeout(() => {
      let valorExistente = localStorage.getItem("cadenaRubik");
      if (valorExistente != null) {
        localStorage.setItem("cadenaRubik", valorExistente + move);
      } else {
        localStorage.setItem("cadenaRubik", move);
      }
      console.log(move);
      let mover=moves.indexOf(move);
      restart(mover);

      // Resuelve la promesa para este movimiento
      resolve();
    }, 1000 * index);
    
  }));
  // Devuelve una promesa que se resuelve cuando todas las promesas de movimiento se han resuelto
  return Promise.all(promises);
  }
  async function solveFun(){
    let valorExistente = localStorage.getItem("cadenaRubik");

    const bodyData = {
      moves: valorExistente,
    };
    
    // Opciones de configuración para la solicitud fetch
    const fetchOptions = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' // Tipo de contenido del cuerpo (en este caso, JSON)
      },
      body: JSON.stringify(bodyData) // Convertir los datos del cuerpo a formato JSON
    };
    const response = await fetch("http://localhost:5000/rubik/solve", fetchOptions);

    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }

    // Convertir la respuesta a JSON y retornar los datos
    const data = await response.json();

    // Acceder a la propiedad 'result' del objeto devuelto por el fetch
    if (clue) {
      const result = data.result;
      await automaticMove(result[0]);
      setClue(false);
    }else{
      const result = data.result;
      await automaticMove(result);
      localStorage.removeItem("cadenaRubik");
    }
    setSolve(false);
  }
  async function shuffle(){
    const bodyData = {
      numMoves: 20,
    };
    
    // Opciones de configuración para la solicitud fetch
    const fetchOptions = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json' // Tipo de contenido del cuerpo (en este caso, JSON)
      },
      body: JSON.stringify(bodyData) // Convertir los datos del cuerpo a formato JSON
    };
    const response = await fetch("http://localhost:5000/rubik/random", fetchOptions);

    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }

    // Convertir la respuesta a JSON y retornar los datos
    const data = await response.json();

    console.log(data);
    // Acceder a la propiedad 'result' del objeto devuelto por el fetch
    const result = data.result;
    
    
    await automaticMove(result);
    setRandom(false);
  }
  if (random) {
    console.log("Holita");
    shuffle();
  }
  if (solve) {
    solveFun();
  }
  async function mover(movimientos){
    await automaticMove(movimientos);
  }
  if (!solve&&!random) {
    // console.log(movimientos);
    // console.log("Entro😎"+movimientos);
    let moves="RrLlUuDdFfBb";
    let mover=moves.indexOf(movimientos[0]);
    // console.log(movimientos[0]);
    // mover(movimientos[0]);
    restart(mover);
    setMovimientos("");
  }
  
},[movimientos, random, solve]);
return <div ref={containerRef} />;
};
// });
export default RubikCube2;