import React from 'react'

const BotonGrande = (props) => {
  return (
    <button className='w-[100px] h-[100px] rounded-full font-sans bg-white flex flex-col items-center justify-center'>
        {props.img}
    </button>
  )
}

export default BotonGrande