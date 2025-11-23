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
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  // Handling outsideClick
  const searchCard = useRef(null);
  const searchInputRef = useRef(null);
  const bar = useRef(null);

  const handleClickOutside = (e) => {
    // Close MenuBar if clicking outside of it
    if (bar.current && !bar.current.contains(e.target)) {
      setBarShow(false);
    }
  
    // Close search if clicking outside of search input and SearchCard
    if (searchCard.current && !searchCard.current.contains(e.target)) {
      handleCloseSearch();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Focus search input when search is opened
  useEffect(() => {
    if (searchShow && searchInputRef.current) {
      // Small timeout to ensure the input is visible before focusing
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [searchShow]);

  // Disable scrolling when the sidebar is shown
  useEffect(() => {
    if (barShow) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [barShow]);

  // Handle search toggle
  const handleSearchToggle = () => {
    setSearchShow(!searchShow);
    if (!searchShow) {
      dispatch(clearSearch());
    } else {
      // When closing search, blur the input to remove focus and prevent zoom
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
    }
  };

  // Handle close search properly
  const handleCloseSearch = () => {
    setSearchShow(false);
    dispatch(clearSearch());
    
    // Blur the input to remove focus and prevent zoom issues
    if (searchInputRef.current) {
      searchInputRef.current.blur();
    }
    
    // Force the viewport to reset by triggering a resize event
    window.dispatchEvent(new Event('resize'));
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  // Handle key press (Escape to close search)
  const handleKeyPress = (e) => {
    if (e.key === 'Escape') {
      handleCloseSearch();
    }
  };

  return (
    <div className='relative'>
      <nav
        ref={navbar}
        className='flex justify-between items-center py-3 px-4 sm:py-4 sm:px-6 md:py-6 md:px-10 bg-[#E11F2C] sticky z-10 transition-all duration-500 scroll-smooth'
      >
        {/* Left Section: Menu and Search Icons */}
        <div className='flex items-center gap-3 sm:gap-4 md:gap-5'>
          {barShow ? (
            <MdClose 
              onClick={() => setBarShow(false)} 
              className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out' 
            />
          ) : (
            <CiMenuBurger 
              onClick={() => setBarShow(true)} 
              className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out' 
            />
          )}
          
          {/* Search Input - Responsive */}
          {searchShow ? (
            <div className='flex items-center gap-2 sm:gap-3'>
              <div className='flex items-center relative'>
                <input 
                  ref={searchInputRef}
                  value={searchTerm} 
                  onChange={handleSearchChange}
                  onKeyDown={handleKeyPress}
                  type="text" 
                  placeholder='Search...' 
                  className='border border-white bg-transparent text-white w-[140px] sm:w-[180px] md:w-[15rem] px-3 py-2 sm:py-2 outline-none placeholder:text-white/80 rounded text-base sm:text-base search-input'
                  style={{ fontSize: '16px' }} // Prevents zoom on iOS
                />
                <CiSearch className='absolute right-2 sm:right-3 text-white text-lg sm:text-xl' />
              </div>
              <MdClose 
                onClick={handleCloseSearch}
                className='text-xl sm:text-2xl text-white hover:scale-110 hover:text-slate-200 cursor-pointer transition-all duration-200' 
              />
            </div>
          ) : (
            <CiSearch 
              onClick={handleSearchToggle}
              className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out' 
            />
          )}
        </div>

        {/* Center Section: Logo */}
        <div className='w-[3.5rem] sm:w-[4rem] md:w-[5rem] h-auto'>
          <img
            onClick={() => navigate('/')}
            className='w-full h-full cursor-pointer swing-animation'
            src={logo}
            alt="Brocade Logo"
          />
        </div>

        {/* Right Section: Account and Shopping Bag Icons */}
        <div className='flex items-center gap-3 sm:gap-4 md:gap-5'>
          <VscAccount className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out' />
          <div className='relative flex items-center'>
            <GiShoppingBag
              onClick={() => navigate('/cart')}
              className='text-xl sm:text-2xl text-white cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out'
            />
            {cartItems.length > 0 && (
              <span className='absolute -top-2 -right-2 bg-white text-[#E11F2C] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold'>
                {totalQty}
              </span>
            )}
          </div>
        </div>
      </nav>

      {/* Menu Bar */}
      <div className='absolute z-20' ref={bar}>
        {barShow && <MenuBar setBarShow={setBarShow} />}
      </div>

      {/* Search Results */}
      <div ref={searchCard}>
        {searchShow && filteredResults.length > 0 && (
          <SearchCard searchCard={searchCard} filteredResults={filteredResults} />
        )}
      </div>
    </div>
  );
};