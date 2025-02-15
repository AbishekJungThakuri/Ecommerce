import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGithub } from 'react-icons/fa';
import { IoIosArrowRoundForward } from 'react-icons/io';

export const Footer = () => {
  return (
    <div className="bg-[#E11F2C] text-white text-lg px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-[7rem] pt-8 sm:pt-12 md:pt-16 lg:pt-20 xl:pt-[2rem]">
      {/* Subscribe Section */}
      <div className="text-center sm:text-left">
        <h1 className="text-lg sm:text-lg md:text-xl">
          Subscribe to our emails
        </h1>
        <div className="mt-5 flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-0">
          {/* Email Input */}
          <div className="flex justify-center items-center relative w-full sm:w-auto">
            <input
              className="bg-[#E11F2C] border px-5 py-2 w-full sm:w-[25vw] md:w-[25vw] hover:border-2 outline-none placeholder-slate-400"
              type="email"
              placeholder="Email"
            />
            <IoIosArrowRoundForward className="text-2xl absolute right-3" />
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-3 sm:gap-5">
            <a href="https://www.facebook.com/abishek.shahi.5454"> <FaFacebook className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" /></a>
            <a href="https://www.instagram.com/st__abishek/"><FaInstagram className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" /></a>
            <FaYoutube className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" />
            <FaTiktok className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" />
            <a href="https://github.com/AbishekJungThakuri"><FaGithub className="text-lg sm:text-xl cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" /></a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="mt-8 sm:mt-12 opacity-15" />

      {/* Payment Methods and Copyright */}
      <div className="pt-8 sm:pt-10">
        <div className="flex justify-center items-center gap-3 sm:gap-5">
          <img
            className="w-8 sm:w-10 md:w-12 h-auto bg-white rounded-sm cursor-pointer"
            src="https://logos-world.net/wp-content/uploads/2020/09/MasterCard-Logo-1979-1990.png"
            alt="MasterCard"
          />
          <img
            className="w-8 sm:w-10 md:w-12 h-auto bg-white rounded-sm cursor-pointer"
            src="https://th.bing.com/th/id/R.c55444b1b127c6917062c825e2134eed?rik=80qgGZDvWFzBQQ&pid=ImgRaw&r=0"
            alt="Visa"
          />
        </div>
        <p className="text-xs sm:text-sm md:text-[13px] p-4 sm:p-6 md:p-8 text-center">
          © 2024, Brocade Official Powered by Shopify
        </p>
      </div>
    </div>
  );
};