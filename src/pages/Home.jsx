import React from "react";
import { useNavigate } from "react-router-dom";

import bro_hero1 from "../assets/images/bro_hero1.webp";
import bro_hero2 from "../assets/images/bro_hero2.webp";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1a1a1a] w-full min-h-[82vh] flex justify-center items-center relative overflow-hidden">
      <div className="bg-[#1a1a1a] w-full min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 relative overflow-hidden pt-[30px] sm:pt-[50px] md:pt-[118px]">

        <div className="flex flex-col md:flex-row justify-between w-full gap-12">
          {/* LEFT SECTION */}
          <div className="flex flex-col justify-center md:w-1/2 text-center md:text-left gap-6 mt-10 sm:mt-16 md:mt-0">
            <h1 className="text-4xl md:text-5xl font-semibold text-white tracking-wide">
              Elevate Your Style
            </h1>

            <p className="text-white/70 text-md md:text-lg">
              Discover premium fashion pieces curated just for you.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="text-white bg-[#e11f2c] hover:bg-[#b21826] cursor-pointer border border-[#e11f2c] px-6 py-3 rounded-md font-semibold tracking-wide shadow-md transform hover:-translate-y-1 transition-all duration-300 ease-in-out w-max mx-auto md:mx-0"
            >
              SHOP NOW
            </button>
          </div>

          {/* RIGHT SECTION */}
          <div className="relative md:w-1/2 flex flex-col sm:flex-row justify-center md:justify-end mt-10 md:mt-0 gap-4 items-center">

            {/*  POSTER1 */}
            <div className="w-56 sm:w-64 md:w-72 lg:w-80 border-2 border-[#e11f2c] rounded-lg overflow-hidden transform -rotate-3 z-10 shadow-lg">
              <img
                src={bro_hero1}
                alt="Poster 1"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* POSTER2 */}
            <div className="w-56 sm:w-64 md:w-72 lg:w-80 border-2 border-[#e11f2c] rounded-lg overflow-hidden transform rotate-3 -ml-8 md:-ml-14 -translate-y-4 md:-translate-y-6 z-20 shadow-lg">
              <img
                src={bro_hero2}
                alt="Poster 2"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home
