import React from 'react'
import { motion } from 'framer-motion';
const BotonGrande = (props) => {
  return (
    <motion.button
    id={props.id}
    onClick={props.onClick}
    whileHover={{
      scale: 1.05,
      transition: { duration: 0.3 },
    }}
    whileTap={{ scale: 0.9 }}
     className='w-[100px] h-[100px] rounded-full font-sans bg-white flex flex-col items-center justify-center'>
        {props.img && props.img }
        {props.text && props.text}
    </motion.button>
  )
}

export default BotonGrande