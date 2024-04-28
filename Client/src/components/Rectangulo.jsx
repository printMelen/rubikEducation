import React from 'react'

const Rectangulo = ({ h, color, w }) => {
  // let altura = h;
  const estilo = {
    height: `${h}%`,
    width: `${w}px`,
  }
  const colorVariants = {
    blue: 'bg-[#014A97] border border-black border-2',
    red: 'bg-[#D4121A]',
    grey: 'bg-[#E0E5E7]',
    yellow: 'bg-[#F0CE06]',
    black: 'bg-[#1C2422]',
  }
    // const estilo = `h-${h} w-${w} bg-${color}`;
    // console.log(estilo);
    // const estilo = `w-[500px] h-[300px] bg-[#E0E5E7]`;
  return (
    <div className={colorVariants[color]} style={estilo}>Hola</div>
  )
}

export default Rectangulo