import React from 'react';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGithub } from 'react-icons/fa';
import { IoIosArrowRoundForward } from 'react-icons/io';

export const Footer = () => {
  return (
    <div className="bg-[#1a1a1a] text-white px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-[7rem] pt-12">
      {/* Subscribe Section */}
      <div className="text-center sm:text-left">
        <h1 className="text-xl font-medium tracking-wide">
          Subscribe to our emails
        </h1>

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-6">
          {/* Email Input */}
          <div className="relative w-full sm:w-auto">
            <input
              className="bg-[#1a1a1a] border border-[#e11f2c] px-5 py-2 w-full sm:w-[25vw] md:w-[22vw] rounded-sm outline-none placeholder-slate-400 focus:border-[#e11f2c] transition"
              type="email"
              placeholder="Email"
            />
            <IoIosArrowRoundForward className="text-2xl absolute right-3 top-1/2 -translate-y-1/2 text-[#e11f2c]" />
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-4">
            <a href="https://www.facebook.com/abishek.shahi.5454">
              <FaFacebook className="text-xl cursor-pointer hover:text-[#e11f2c] transition-all" />
            </a>
            <a href="https://www.instagram.com/st__abishek/">
              <FaInstagram className="text-xl cursor-pointer hover:text-[#e11f2c] transition-all" />
            </a>
            <FaYoutube className="text-xl cursor-pointer hover:text-[#e11f2c] transition-all" />
            <FaTiktok className="text-xl cursor-pointer hover:text-[#e11f2c] transition-all" />
            <a href="https://github.com/AbishekJungThakuri">
              <FaGithub className="text-xl cursor-pointer hover:text-[#e11f2c] transition-all" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="mt-10 border-white/10" />

      {/* Payment Methods + Copyright */}
      <div className="pt-10">
        <div className="flex justify-center items-center gap-6">
          <img
            className="w-10 h-auto bg-white rounded-sm p-1 shadow-sm"
            src="https://logos-world.net/wp-content/uploads/2020/09/MasterCard-Logo-1979-1990.png"
            alt="MasterCard"
          />
          <img
            className="w-10 h-auto bg-white rounded-sm p-1 shadow-sm"
            src="https://th.bing.com/th/id/R.c55444b1b127c6917062c825e2134eed?rik=80qgGZDvWFzBQQ&pid=ImgRaw&r=0"
            alt="Visa"
          />
        </div>

        <p className="text-xs text-center mt-6 opacity-70 tracking-wide">
          © 2024, Brocade Official · Powered by Shopify
        </p>
      </div>
    </div>
  );
};
