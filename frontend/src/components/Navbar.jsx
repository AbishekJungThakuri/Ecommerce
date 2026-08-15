import React, { useEffect, useRef, useState } from 'react';
import { CiMenuBurger, CiSearch } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import logo from '../assets/brocade-logo.avif';
import { VscAccount } from "react-icons/vsc";
import { GiShoppingBag } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MenuBar } from './MenuBar';

import { clearSearch, setSearchTerm } from '../Redux/SearchSlice';
import { SearchCard } from './shopComponent/SearchCard';

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

  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const bar = useRef(null);

  // Scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      navbar.current.style.top = prevScrollPos > currentScrollPos ? '0px' : '-130px';
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  const handleClickOutside = (e) => {
    if (bar.current && !bar.current.contains(e.target)) setBarShow(false);
    if (searchRef.current && !searchRef.current.contains(e.target)) handleCloseSearch();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchShow && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 100);
    }
  }, [searchShow]);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', barShow);
  }, [barShow]);

  const handleSearchToggle = () => {
    setSearchShow(!searchShow);
    if (!searchShow) dispatch(clearSearch());
    else searchInputRef.current?.blur();
  };

  const handleCloseSearch = () => {
    setSearchShow(false);
    dispatch(clearSearch());
    searchInputRef.current?.blur();
    window.dispatchEvent(new Event('resize'));
  };

  const handleSearchChange = (e) => dispatch(setSearchTerm(e.target.value));
  const handleKeyPress = (e) => { if (e.key === 'Escape') handleCloseSearch(); };

  return (
    <div className='relative'>
      <nav
        ref={navbar}
        className='flex justify-between items-center py-3 px-4 sm:py-5 sm:px-6 md:py-11 md:px-10 bg-[#1a1a1a] fixed w-full top-0 z-20 shadow-md transition-all duration-500'
      >
        {/* Left Section: Menu & Search */}
        <div  ref={bar} className='flex items-center gap-3 sm:gap-4 md:gap-5'>
          {barShow ? (
            <MdClose 
              onClick={() => setBarShow(false)} 
              className='text-xl sm:text-3xl text-[#e11f2c] cursor-pointer hover:scale-110 transition-transform duration-200' 
            />
          ) : (
            <CiMenuBurger 
              onClick={() => setBarShow(true)} 
              className='text-xl sm:text-3xl text-white cursor-pointer hover:text-[#e11f2c] transition-colors duration-200' 
            />
          )}

          {/* Search */}
          {searchShow ? (
            <div ref={searchRef} className='flex items-center gap-2 sm:gap-3'>
              <div className='relative'>
                <input 
                  ref={searchInputRef}
                  value={searchTerm} 
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyPress}
                  type="text" 
                  placeholder='Search...' 
                  className='border border-[#e11f2c] bg-[#1a1a1a] text-white w-[12rem] sm:[13rem] md:w-[15rem]  px-3 py-2 outline-none placeholder:text-white/70 rounded-md transition'
                  style={{ fontSize: '16px' }}
                />
                <CiSearch className='absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 text-[#e11f2c] text-lg sm:text-xl' />
              </div>
            </div>
          ) : (
            <CiSearch 
              onClick={handleSearchToggle}
              className='text-2xl sm:text-3xl text-white cursor-pointer hover:text-[#e11f2c] transition-colors duration-200' 
            />
          )}
        </div>

        {/* Center Logo */}
        <div className='hidden sm:block absolute left-1/2 -translate-x-1/2 w-[3.5rem] sm:w-[4rem] md:w-[5rem] h-auto'>
          <img
            onClick={() => navigate('/')}
            className='w-full h-full cursor-pointer text-[#e11f2c]'
            src={logo}
            style={{ filter: "brightness(0) saturate(100%) invert(17%) sepia(94%) saturate(7463%) hue-rotate(0deg) brightness(100%) contrast(101%)" }}
            alt="Brocade Logo"
          />
        </div>

        {/* Right Section: Account & Cart */}
        <div className='flex items-center gap-3 sm:gap-4 md:gap-5'>
          <VscAccount className='text-xl sm:text-3xl text-white cursor-pointer hover:text-[#e11f2c] transition-colors duration-200' />
          <div className='relative flex items-center'>
            <GiShoppingBag
              onClick={() => navigate('/cart')}
              className='text-xl sm:text-3xl text-white cursor-pointer hover:text-[#e11f2c] transition-colors duration-200'
            />
            {cartItems.length > 0 && (
              <span className='absolute -top-2 -right-2 bg-[#e11f2c] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>
                {totalQty}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Menu Bar */}
      <div className='absolute z-50' ref={bar}>
        {barShow && <MenuBar setBarShow={setBarShow} />}
      </div>

      {/* Search Results */}
      <div ref={searchRef}>
        {searchShow && filteredResults.length > 0 && (
          <SearchCard searchRef={searchRef} setSearchShow={setSearchShow} filteredResults={filteredResults} />
        )}
      </div>
    </div>
  );
};
