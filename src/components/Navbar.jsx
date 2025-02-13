import React, { useEffect, useRef, useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import logo from '../assets/brocade-logo.avif';
import { VscAccount } from "react-icons/vsc";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Navbar = () => {
  const navbar = useRef(null);
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  const cartItems = useSelector(state => state.cart.cart);

  const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos > currentScrollPos) {
        navbar.current.style.top = '0px';
      } else {
        navbar.current.style.top = '-130px';
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Cleanup on unmount
    };
  }, [prevScrollPos]);

  return (
    <nav
      ref={navbar}
      className='flex justify-between items-center py-3 px-3 sm:py-6 sm:px-10 bg-[#E11F2C] sticky z-10 transition-all duration-500 scroll-smooth'
    >
      {/* Left Section: Menu and Search Icons */}
      <div className='flex items-center gap-3 sm:gap-5'>
        <CiMenuBurger className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out' />
        <CiSearch className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out' />
      </div>

      {/* Center Section: Logo */}
      <div className='w-[4rem] sm:w-[5rem] h-auto'>
        <img
          onClick={() => navigate('/')}
          className='w-full h-full cursor-pointer swing-animation'
          src={logo}
          alt="Brocade Logo"
        />
      </div>

      {/* Right Section: Account and Shopping Bag Icons */}
      <div className='flex items-center gap-3 sm:gap-5'>
        <VscAccount className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out' />
        <div className='flex '>
          <GiShoppingBag
            onClick={() => navigate('/cart')}
            className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out'/>
            {
              cartItems.length > 0 ?
              <p className='text-sm text-white font-semibold'>{totalQty}</p> : ''
            }
        </div>
      </div>
    </nav>
  );
};