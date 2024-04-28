import React from 'react'
import Rectangulo from './Rectangulo';
const Login = () => {
  return (
    // <div className='text-red-300'>Login</div>
    // <div className='text-green-400'>BUENAS</div>
    <>
    
<div className="grid grid-cols-5 grid-rows-6 h-screen">
    <div className="col-span-2 row-span-1 bg-[#E0E5E7]"></div>
    <div className="col-span-2 row-span-5 col-start-1 row-start-2 bg-[#014A97]"></div>
    <div className="col-span-3 row-span-4 col-start-3 row-start-1 bg-[#F0CE06]"></div>
    <div className="col-span-3 row-span-2 col-start-3 row-start-5 bg-[#E0E5E7]"></div>
</div>
    
      {/* <Rectangulo w={624} h={230} color={"grey"}/>
      <Rectangulo w={624} h={78} color={"blue"}/> */}
    </>
  )
}

export default Login