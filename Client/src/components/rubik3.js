<!doctype html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Sean Bradley" />
        <title>Rubiks' Cibe</title>
        <meta name="description" content="React Three Fiber Tutorials by Sean Bradley : https://sbcode.net/react-three-fiber" />
        <style>
            html,
            body,
            #root {
                height: 100%;
                margin: 0;
                background: #000000;
                color: white;
            }
            #leva__root > * {
                width: 140px !important;
            }
        </style>
        <script type="importmap">
            {
                "imports": {
                    "react": "/react@18.2.0/react.mjs",
                    "react-dom/client": "/react-dom@18.2.0/client.mjs",
                    "three": "/three@0.160.0/three.mjs",
                    "three/addons/": "/jsm/",
                    "@react-three/fiber": "/@react-three/fiber@8.15.13/fiber.mjs",
                    "@react-three/drei": "/@react-three/drei@9.93.0/drei-bundle.mjs",
                    "leva": "/leva@0.9.35/leva-bundle.mjs",                    
                    "@tweenjs/tween.js": "/@tweenjs/tween.js@21.0.0/tween.mjs"
                }
            }
        </script>
        <script src="/@babel/standalone@7.24.0/babel.min.js"></script>
    </head>
    <body>
        <div id="root"></div>
        <script type="text/babel" data-type="module" data-presets="react">
            import React, { StrictMode, useMemo, useRef, useState, Suspense } from 'react'
            import { createRoot } from 'react-dom/client'
            import { Canvas, useFrame } from '@react-three/fiber'
            import * as THREE from 'three'
            import { Stats, OrbitControls, Environment } from '@react-three/drei'
            import { useControls, button } from 'leva'
            import TWEEN from '@tweenjs/tween.js'
            import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'

            function Buttons({ cubeGroup }) {
                const rotationGroup = useRef()

                useControls('Cube', {
                    'Left CW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, 1)
                    }),
                    'Left CCW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'x', -0.5, -1)
                    }),
                    'Right CW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, -1)
                    }),
                    'Right CCW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'x', 0.5, 1)
                    }),
                    'Back CW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, 1)
                    }),
                    'Back CCW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'z', -0.5, -1)
                    }),
                    'Front CW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, -1)
                    }),
                    'Front CCW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'z', 0.5, 1)
                    }),
                    'Top CW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, -1)
                    }),
                    'Top CCW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'y', 0.5, 1)
                    }),
                    'Bottom CW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, 1)
                    }),
                    'Bottom CCW': button(() => {
                        rotate(cubeGroup.current, rotationGroup.current, 'y', -0.5, -1)
                    })
                })

                return (
                    <>
                        <group ref={rotationGroup} />
                    </>
                )
            }

            function Cube() {
                const ref = useRef()

                const roundedBoxGeometry = useMemo(() => {
                    return new RoundedBoxGeometry(1, 1, 1, 3, 0.1)
                }, [])

                useFrame(() => {
                    TWEEN.update()
                })

                return (
                    <>
                        <group ref={ref}>
                            {[...Array(3).keys()].map((x) =>
                                [...Array(3).keys()].map((y) =>
                                    [...Array(3).keys()].map((z) => (
                                        <Cubelet key={x + y * 3 + z * 9} position={[x - 1, y - 1, z - 1]} geometry={roundedBoxGeometry} />
                                    ))
                                )
                            )}
                        </group>
                        <Buttons cubeGroup={ref} />
                    </>
                )
            }

            const colorSides = [
                [0, 1, 'darkorange'],
                [0, -1, 'red'],
                [1, 1, 'white'],
                [1, -1, 'yellow'],
                [2, 1, 'green'],
                [2, -1, 'blue']
            ]

            function Cubelet({ position, geometry }) {
                return (
                    <>
                        <mesh position={position} geometry={geometry}>
                            {[...Array(6).keys()].map((i) => (
                                <meshStandardMaterial
                                    key={i}
                                    attach={`material-${i}`}
                                    color={position[colorSides[i][0]] === colorSides[i][1] ? colorSides[i][2] : `black`}
                                />
                            ))}
                        </mesh>
                    </>
                )
            }

            function resetCubeGroup(cubeGroup, rotationGroup) {
                rotationGroup.children
                    .slice()
                    .reverse()
                    .forEach(function (c) {
                        cubeGroup.attach(c)
                    })
                rotationGroup.quaternion.set(0, 0, 0, 1)
            }

            function attachToRotationGroup(cubeGroup, rotationGroup, axis, limit) {
                cubeGroup.children
                    .slice()
                    .reverse()
                    .filter(function (c) {
                        return limit < 0 ? c.position[axis] < limit : c.position[axis] > limit
                    })
                    .forEach(function (c) {
                        rotationGroup.attach(c)
                    })
            }

            function animateRotationGroup(rotationGroup, axis, multiplier) {
                new TWEEN.Tween(rotationGroup.rotation)
                    .to(
                        {
                            [axis]: rotationGroup.rotation[axis] + (Math.PI / 2) * multiplier
                        },
                        250
                    )
                    .easing(TWEEN.Easing.Cubic.InOut)
                    .start()
            }

            function rotate(cubeGroup, rotationGroup, axis, limit, multiplier) {
                if (!TWEEN.getAll().length) {
                    resetCubeGroup(cubeGroup, rotationGroup)
                    attachToRotationGroup(cubeGroup, rotationGroup, axis, limit)
                    animateRotationGroup(rotationGroup, axis, multiplier)
                }
            }

            function App() {
                return (
                    <Canvas camera={{ position: [3, 3, 3] }}>
                        <Suspense>
                            <Environment preset="forest" />
                        </Suspense>
                        <Cube />
                        <OrbitControls target={[0, 0, 0]} />
                        <Stats />
                    </Canvas>
                )
            }

            createRoot(document.getElementById('root')).render(
                <StrictMode>
                    <App />
                </StrictMode>
            )
        </script>
    </body>
</html>
