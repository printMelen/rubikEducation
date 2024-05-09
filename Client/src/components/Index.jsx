import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Playground = () => {
  const [showIcon, setShowIcon] = useState(false); // Estado para controlar si se muestra el icono
  const [showText1, setShowText1] = useState(false); // Estado para controlar si se muestra el icono
  const [showText2, setShowText2] = useState(false); // Estado para controlar si se muestra el icono
  const [showCuadrado, setShowCuadrado] = useState(false); // Estado para controlar si se muestra el icono
//   const [isSmallScreen, setIsSmallScreen] = useState(false);
const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 954);
//   const [showCuadradoRojo, setShowCuadradoRojo] = useState(false); // Estado para controlar si se muestra el icono

  useEffect(() => {


    const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 954); // Cambiar aquí el punto de quiebre
      };
    window.addEventListener('resize', handleResize);
    // Activa la animación después de que el componente se haya montado
    setTimeout(() => {
      setShowIcon(true);
    }, 1000); // Tiempo en milisegundos para esperar antes de mostrar el icono
    setTimeout(() => {
        setShowText1(true);
    }, 3000);
    setTimeout(() => {
          setShowCuadrado(true);
    
        }, 4000);
    setTimeout(() => {
        setShowText2(true);
      }, 5000);
    // setTimeout(() => {
    //     setShowCuadrado2(true);
    //   }, 7000);
      return () => {
        window.removeEventListener('resize', handleResize);
      };
  }, []);
//   <div className="col-span-2 row-span-3 border-b-4 border-black bg-blue-400 flex items-center justify-center">
//       {showIcon && (
//         <a href="/">
//             <img src="/icon.svg" alt="" srcset="" className='w-[150px]' />
//         </a>
//       )}
//         {/* <Logo></Logo> */}
//       </div>
  return (
    <div className="grid grid-cols-5 grid-rows-7 h-screen font-sans">
      <motion.div 
      className="col-span-2 row-span-3 border-b-4 border-black flex items-center justify-center"
      initial={{ width: 0 }}
        animate={{ width: "auto",backgroundColor: "#E0E5E7" }}
        transition={{ duration: 2 }}
      >
      {showIcon && (
        <a href="/">
            <img src="/icon.svg" alt="" srcset="" className='w-[150px]' />
        </a>
      )}
        {/* <Logo></Logo> */}
      </motion.div>
      
      <motion.div className="col-span-3 row-span-4 col-start-3 border-black border-l-4 flex items-center justify-center"
      initial={{ height: 0 }}
      animate={{ height: "auto",backgroundColor: "#F0CE06" }}
      transition={{ duration: 2, delay:2}}
      >
        {showText1 && (
        isSmallScreen ? (
            <a href="/playground">
                <img src="./src/assets/playground.svg" alt="Usuario" />
            </a>
        ) : (
            <a href="/playground">
            <h2 className='text-7xl font-black uppercase text-white'>Playground</h2>
        </a>
        )
    )}
      </motion.div>
      {/* {showCuadrado2 && ( */}
      <motion.div className="col-span-2 row-span-4 row-start-4 flex items-center justify-center "
      initial={{ width: 0 }}
      animate={{ width: "auto",backgroundColor: "#D4121A" }}
      transition={{ duration: 2, delay:6}}
      >
        {isSmallScreen ? (
            <a href="/ranking">
                <img src="./src/assets/ranking.svg" alt="Ranking" />
            </a>
      ) : (
        <a href="/ranking">
            <h2 className='text-7xl font-black uppercase text-white'>Ranking</h2>
        </a>
      )}
      </motion.div>
      {/* )} */}
      {showCuadrado && (
      <motion.div  className="col-span-3 row-span-3 col-start-3 row-start-5 border-t-4 border-l-4 border-black flex items-center justify-center"
      initial={{ height: 0 ,width:0}}
    //   ,borderWidth: 0
      animate={{ height: "auto",width:"auto", backgroundColor: "#E0E5E7" }}
    //   ,borderWidth: 4
      transition={{ duration: 2, delay:0}}>
        {showText2 && (
        isSmallScreen ? (
            <a href="/profile">
                <img src="./src/assets/usuario.svg" alt="Usuario" />
            </a>
        ) : (
            <a href="/profile">
                <h2 className='text-7xl font-black uppercase text-black'>Account</h2>
            </a>
        )
    )}
    </motion.div>
     )}
    </div>
  );
};

export default Playground;
