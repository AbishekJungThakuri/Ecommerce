import React from 'react';
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const MenuBar = ({ setBarShow }) => {
  const navigate = useNavigate();

  const menubarList = [
    { name: "HOME", link: "/" },
    { name: "SHOP ALL", link: "/shop" },
    { name: "CATEGORY", link: null, icon: <FaArrowRightLong className="text-sm sm:text-base" /> },
    { name: "ABOUT US", link: "/about" },
    { name: "DIRECT LINKS", link: null, icon: <FaArrowRightLong className="text-sm sm:text-base" /> },
  ];

  return (
    <div className='bg-[#1a1a1a] text-white w-full sm:w-[22rem] h-[94vh] sm:h-[90vh] p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto shadow-lg  mt-[50px] sm:mt-[75px] md:mt-[121px]'>
      
      {/* Menu Items */}
      <ul className='text-base sm:text-lg flex flex-col gap-2 sm:gap-4 font-medium'>
        {menubarList.map((item, index) => (
          <li
            key={index}
            onClick={() => {
              if (item.link) {
                navigate(item.link);
                setBarShow(false);
              }
            }}
            className={`flex items-center justify-between ${item.icon ? "" : "cursor-pointer"} hover:bg-[#e11f2c] hover:text-white p-3 sm:p-3 rounded transition-colors duration-200`}
          >
            <p>{item.name}</p>
            {item.icon && item.icon}
          </li>
        ))}
      </ul>

      {/* Divider */}
      <hr className="my-4 border-t border-[#e11f2c]/40" />

      {/* Social Media Links */}
      <div className="flex gap-4 sm:gap-5 md:gap-6 justify-center sm:justify-start flex-wrap">
        <a href="https://www.facebook.com/abishek.shahi.5454" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="text-[#e11f2c] text-xl sm:text-2xl cursor-pointer hover:text-white transition-colors duration-200" />
        </a>
        <a href="https://www.instagram.com/st__abishek/" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="text-[#e11f2c] text-xl sm:text-2xl cursor-pointer hover:text-white transition-colors duration-200" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaYoutube className="text-[#e11f2c] text-xl sm:text-2xl cursor-pointer hover:text-white transition-colors duration-200" />
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          <FaTiktok className="text-[#e11f2c] text-xl sm:text-2xl cursor-pointer hover:text-white transition-colors duration-200" />
        </a>
        <a href="https://github.com/AbishekJungThakuri" target="_blank" rel="noopener noreferrer">
          <FaGithub className="text-[#e11f2c] text-xl sm:text-2xl cursor-pointer hover:text-white transition-colors duration-200" />
        </a>
      </div>
    </div>
  );
}
