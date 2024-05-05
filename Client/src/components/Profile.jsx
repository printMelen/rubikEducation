import React from 'react'
import Logo from "./Logo";

const Profile = () => {
  return (
    

<div className="grid grid-cols-7 grid-rows-6 gap-0 h-screen font-sans">
    <div className="col-span-3 row-span-2 bg-[#E0E5E7] border-black border-[2px]">
      <Logo />
    </div>
    <div className="col-span-2 row-span-3 col-start-1 row-start-3 bg-[#F0CE06] border-black border-[2px] flex flex-col justify-center items-center">
      <img srcSet="src/assets/imagenDePrueba.svg" alt="" />
    </div>
    <div className="col-span-2 row-span-1 col-start-1 row-start-6 bg-[#D4121A] border-black border-[2px]">
      <div className='flex flex-col p-2'>
        <span className='text-white'>Level</span>
        <span className='text-white'>Learner</span>
      </div>
    </div>
    <div className="col-span-3 col-start-3 row-start-3 bg-[#E0E5E7] border-black border-[2px]">4</div>
    <div className="col-span-3 col-start-3 row-start-4 bg-[#014A97] border-black border-[2px]">5</div>
    <div className="col-span-2 row-span-2 col-start-3 row-start-5 bg-[#E0E5E7] border-black border-[2px]">6</div>
    <div className="row-span-2 col-start-5 row-start-5 bg-[#D4121A] border-black border-[2px]">7</div>
    <div className="col-span-2 row-span-2 col-start-4 row-start-1 bg-[#D4121A] border-black border-[2px] flex flex-col justify-center items-center">
      <a href="">
        <img srcSet="src/assets/delete.svg" alt="" />
      </a>
    </div>
    <div className="col-span-2 row-span-2 col-start-6 row-start-1 bg-[#1C2422] border-black border-[2px] flex flex-col justify-center items-center">
      <a href="">
        <h3 className='text-white font-normal text-5xl'>Logout</h3>
      </a>
    </div>
    <div className="col-span-2 row-span-4 col-start-6 row-start-3 bg-[#F0CE06] border-black border-[2px] flex flex-col justify-center items-center">
      <a href="">
        <img srcSet="src/assets/edit.svg" alt="" />
      </a>
    </div>
</div>
    
    
  )
}

export default Profile