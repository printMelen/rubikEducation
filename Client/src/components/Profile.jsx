import React, { useEffect, useState} from 'react'
import Logo from "./Logo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Profile = () => {
  let navigate = useNavigate();
  const accessToken = Cookies.get('accessToken');
  const [profileData, setProfileData] = useState(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const checkAuth = async () => {
      let accessToken = Cookies.get('accessToken');
  
      if (!accessToken) {
          try {
            const refreshResponse = await axios.get('http://localhost:5000/auth/refresh');
            const newAccessToken = refreshResponse.data.accessToken;
            console.log(refreshResponse);
            Cookies.remove('accessToken');
            Cookies.set('accessToken', newAccessToken);
            checkAuth();
          } catch (refreshError) {
            console.error('Error refreshing token:', refreshError);
            navigate('/login');
          }
        
        // navigate('/login');
        // return;
      }
      accessToken = Cookies.get('accessToken');
      console.log(accessToken);
      try {
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        if (response.status === 200) {
          console.log(response.data);
          setProfileData(response.data);
        } 
      } catch (error) {
        // if (error.response && error.response.status === 403) {
          
        // } else {
          console.error('Error verifying token:', error);
          navigate('/login');
        // }
      }
    };
  
    checkAuth();
  }, [navigate]);
  if (!profileData) {
    return <div>Loading...</div>;
  }
  // const response = axios.get("http://localhost:5000/api/profile", {
  //   headers: {
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  // });


  // useEffect(() => {
  //   const checkAuth = async () => {
  //     if (!accessToken) {
  //       navigate('/login');
  //     } else {
  //       try {
  //         const response = await axios.get('http://localhost:5000/auth/verify', {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         });

  //         if (response.status !== 200) {
  //           navigate('/login');
  //         }
  //       } catch (error) {
  //         console.error('Error verifying token:', error);
  //         navigate('/login');
  //       }
  //     }
  //   };

  //   checkAuth();
  // }, [accessToken, navigate]);
  // const jwt = Cookies.get('jwt');
  // console.log(accessToken);
  // console.log(jwt);
  async function logout() {
    // console.log("Etro");
    const respuesta = await axios
    .post("http://localhost:5000/auth/logout",{
      cookies:accessToken
    });
    if (respuesta.status === 200) {
      Cookies.remove('accessToken');
      // window.location.reload(false);
      return navigate("/login");
    }
  }
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
        <span className='text-white'>{profileData.user.nivel}</span>
      </div>
    </div>
    <div className="col-span-3 col-start-3 row-start-3 bg-[#E0E5E7] border-black border-[2px]">
      <div className='flex flex-col p-2'>
        <span className='text-black'>Name</span>
        <span className='text-black'>{profileData.user.nombre}</span>
      </div>
    </div>
    <div className="col-span-3 col-start-3 row-start-4 bg-[#014A97] border-black border-[2px]">
      <div className='flex flex-col p-2'>
        <span className='text-white'>Email</span>
        <span className='text-white'>{profileData.user.correo}</span>
      </div>
    </div>
    <div className="col-span-2 row-span-2 col-start-3 row-start-5 bg-[#E0E5E7] border-black border-[2px]">
      <div className='flex flex-col p-2'>
        <span className='text-black'>Wins</span>
        {/* <span className='text-black'>{profileData.user.victorias}</span> */}
        <span className='text-black'>0</span>
      </div>
    </div>
    <div className="row-span-2 col-start-5 row-start-5 bg-[#D4121A] border-black border-[2px]">
      <div className='flex flex-col p-2'>
        <span className='text-white'>Tournaments</span>
        <span className='text-white'>0</span>
      </div>
    </div>
    <div className="col-span-2 row-span-2 col-start-4 row-start-1 bg-[#D4121A] border-black border-[2px] flex flex-col justify-center items-center">
      <a href="">
        <img srcSet="src/assets/delete.svg" alt="" />
      </a>
    </div>
    <div className="col-span-2 row-span-2 col-start-6 row-start-1 bg-[#1C2422] border-black border-[2px] flex flex-col justify-center items-center">
      {/* <a href=""> */}
      <button type="button" id='logout' onClick={logout}>
        <h3 className='text-white font-normal text-5xl'>Logout</h3>
      </button>
      {/* </a> */}
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