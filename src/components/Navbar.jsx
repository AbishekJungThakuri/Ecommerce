import React, { useEffect, useRef, useState } from 'react'
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import logo from '../assets/brocade-logo.avif';
import { VscAccount } from "react-icons/vsc";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';


export const Navbar = () => {

  const navbar = useRef(null);
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(()=>{
    const handleScroll = () => {
        const currentScrollPos = window.scrollY;
        if(prevScrollPos > currentScrollPos){
              navbar.current.style.top = '0px'
            }
        else{
             navbar.current.style.top = '-130px'
            }
            setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll',handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    };
  },[prevScrollPos])

  return (
    <nav ref={navbar} className='flex justify-between items-center py-6 px-10 bg-[#E11F2C] sticky z-10 transition-all duration-500 scroll-smooth '>
     <div className='flex items-center gap-5'>
        <CiMenuBurger className='text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out' />
        <CiSearch className='text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out' />
      </div>
      <div className='w-[5rem] h-auto' >
        <img onClick={()=>navigate('/')} className='w-full h-full cursor-pointer swing-animation' src={logo} alt="" />
      </div>
      <div className='flex items-center gap-5'>
        <VscAccount className='text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out' />
        <GiShoppingBag onClick={()=>navigate('/cart')}  className='text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out'/>
      </div>
    </nav>
  )
}
