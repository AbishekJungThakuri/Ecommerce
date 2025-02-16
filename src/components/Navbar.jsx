import React, { useEffect, useRef, useState } from 'react';
import { CiMenuBurger } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import logo from '../assets/brocade-logo.avif';
import { VscAccount } from "react-icons/vsc";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MenuBar } from './MenuBar';
import { SearchCard } from './SearchCard';
import { clearSearch, setSearchTerm } from '../Redux/SearchSlice';

export const Navbar = () => {
  const [barShow, setBarShow] = useState(false);
  const [searchShow, setSearchShow] = useState(false);
  const navbar = useRef(null);
  const navigate = useNavigate();
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  const cartItems = useSelector(state => state.cart.cart);

  const totalQty = cartItems.reduce((total, item) => total + item.qty, 0);

  const dispatch = useDispatch();
  const { searchTerm, filteredResults } = useSelector(state => state.search);


// Handling Navbar Scroll behavior
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


  // Handling outsideClick
  const bar = useRef(null);
  const handleClickOutside = (e) => {
    if(bar.current && !bar.current.contains(e.target))
     {
      setBarShow(false)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <div className='relative'>
    <nav
      ref={navbar}
      className='flex justify-between items-center py-3 px-3 sm:py-6 sm:px-10 bg-[#E11F2C] sticky z-10 transition-all duration-500 scroll-smooth'
    >
      {/* Left Section: Menu and Search Icons */}
      <div className='flex items-center gap-3 sm:gap-5'>
        { barShow ? 
        <MdClose onClick={()=>setBarShow(false)} className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out' />
        :
        <CiMenuBurger onClick={()=>setBarShow(true)} className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out' />
        }
        {
          searchShow ? 
          <div className='flex items-center gap-2'>
            <div className='flex items-center relative'>
              <input value={searchTerm} onChange={(e)=>dispatch(setSearchTerm(e.target.value))} type="text" placeholder='Search' className='border border-white text-white w-[15rem] px-3 py-1 outline-none' />
              <CiSearch className='absolute right-2 text-white hover:scale-110 cursor-pointer'/>
            </div>
            <MdClose onClick={()=>{setSearchShow(false),dispatch(clearSearch())}} className='text-2xl text-white hover:scale-110 hover:text-slate-300 cursor-pointer'/>
           </div>
            :
           <CiSearch onClick={()=>setSearchShow(true)}  className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out' />
        }
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
    <div className='absolute z-10' ref={bar}>
      { 
        barShow &&
        <MenuBar setBarShow={setBarShow}/>
      }
    </div>
    <div>
    {    
            searchShow && filteredResults.length > 0 && (
              <SearchCard filteredResults={filteredResults} />
            )
        }
    </div>
    </div>
  );
};