import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const MenuBar = ({setBarShow}) => {

  const navigate = useNavigate()

  return (
    <div className='bg-white w-full sm:w-[20rem] h-screen sm:h-[82vh] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto'>
        {/* Menu Items */}
        <ul className='text-base sm:text-lg flex flex-col gap-2 sm:gap-3 font-medium'>
            <li 
              onClick={() => { navigate('/'); setBarShow(false); }} 
              className='cursor-pointer hover:bg-gray-100 p-3 sm:p-2 rounded transition-colors duration-200'
            >
              HOME
            </li>
            <li 
              onClick={() => { navigate('/shop'); setBarShow(false); }} 
              className='cursor-pointer hover:bg-gray-100 p-3 sm:p-2 rounded transition-colors duration-200'
            >
              SHOP ALL
            </li>
            <li className='flex items-center justify-between hover:bg-gray-100 p-3 sm:p-2 rounded transition-colors duration-200 cursor-pointer'>
              <p>CATEGORY</p>
              <FaArrowRightLong className="text-sm sm:text-base" />
            </li>
            <li className='cursor-pointer hover:bg-gray-100 p-3 sm:p-2 rounded transition-colors duration-200'>
              ABOUT US
            </li>
            <li className='flex items-center justify-between hover:bg-gray-100 p-3 sm:p-2 rounded transition-colors duration-200 cursor-pointer'>
              <p>DIRECT LINKS</p>
              <FaArrowRightLong className="text-sm sm:text-base" />
            </li>
        </ul>

        {/* Social Media Links */}
        <div className="flex gap-4 sm:gap-3 md:gap-5 justify-center sm:justify-start flex-wrap">
            <a href="https://www.facebook.com/abishek.shahi.5454" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out" />
            </a>
            <a href="https://www.instagram.com/st__abishek/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaTiktok className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out" />
            </a>
            <a href="https://github.com/AbishekJungThakuri" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-200 ease-in-out" />
            </a>
        </div>
    </div>
  )
}