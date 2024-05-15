import React, { useRef, useEffect } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as THREE from "three";
import * as SceneUtils from "three/addons/utils/SceneUtils.js";
import TWEEN from "@tweenjs/tween.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

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
  let cubes = [];
  let rot = { k: 0, oldK: 0 },
    e = new THREE.Euler();
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
    let rotations = [
      function rotateRightCW() {
        rotate("XYZ", "x", 1, -1);
      },
      function rotateRightCCW() {
        rotate("XYZ", "x", 1, 1);
      },

      function rotateLeftCW() {
        rotate("XYZ", "x", -1, 1);
      },
      function rotateLeftCCW() {
        rotate("XYZ", "x", -1, -1);
      },

      function rotateTopCW() {
        rotate("YZX", "y", 1, -1);
      },
      function rotateTopCCW() {
        rotate("YZX", "y", 1, 1);
      },

      function rotateBottomCW() {
        rotate("YZX", "y", -1, 1);
      },
      function rotateBottomCCW() {
        rotate("YZX", "y", -1, -1);
      },

      function rotateFrontCW() {
        rotate("ZXY", "z", 1, -1);
      },
      function rotateFrontCCW() {
        rotate("ZXY", "z", 1, 1);
      },

      function rotateBackCW() {
        rotate("ZXY", "z", -1, 1);
      },
      function rotateBackCCW() {
        rotate("ZXY", "z", -1, -1);
      },
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
    let cubes = [];
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          let cube = new THREE.Mesh(new RoundedBoxGeometry(), cubeMaterials);
          cube.center = new THREE.Vector3(x, y, z);
          cube.geometry.translate(x, y, z);
          cubes.push(cube);
        }
    scene.current.add(...cubes);
    // for (let x = 0; x < totalCubes; x++) {
    //   for (let y = 0; y < totalCubes; y++) {
    //     for (let z = 0; z < totalCubes; z++) {
    //       const cubeGeometry = new THREE.BoxGeometry(
    //         cubeSize,
    //         cubeSize,
    //         cubeSize
    //       );
    //       const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
    //       cube.position.set(
    //         (cubeSize + separation) * (x - (totalCubes - 1) / 2),
    //         (cubeSize + separation) * (y - (totalCubes - 1) / 2),
    //         (cubeSize + separation) * (z - (totalCubes - 1) / 2)
    //       );
    //       scene.current.add(cube);
    //       cubes.push(cube);
    //       cube.rubikPosition = cube.position.clone();
    //     }
    //   }
    // }
    let pivot = new THREE.Object3D();
    let activeGroup = [];
    function rotar(orden, eje, sign, direcc) {
      for (let cube of cubes)
        if (sign * cube.center[eje] > 0.5) {
          cube.rotation.reorder(orden);
          cube.rotation[eje] += ((direcc * Math.PI) / 2) * (rot.k - rot.oldK);

          e.set(0, 0, 0, orden);
          e[axis] += ((direcc * Math.PI) / 2) * (rot.k - rot.oldK);
          cube.center.applyEuler(e);
        }
      rot.oldK = rot.k;
    }
    function restart() {
      rot.k = 0;
      rot.oldK = 0;
      new TWEEN.Tween(rot)
        .to({ k: 1 }, 700)
        .easing(TWEEN.Easing.Quartic.InOut)
        .onUpdate(rotations[Math.floor(rotations.length * Math.random())])
        .onComplete(restart)
        .start();
    }

    restart();

    function animationLoop(t) {
      TWEEN.update(t);
      controls.current.update();
      // light.position.copy(camera.position);
      renderer.current.render(scene.current, camera.current);
    }

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
