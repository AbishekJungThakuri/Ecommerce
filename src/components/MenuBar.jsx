import React from 'react'
import { FaArrowRightLong } from "react-icons/fa6";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export const MenuBar = ({setBarShow}) => {

  const navigate = useNavigate()

  return (
    <div className='bg-white w-[20rem] h-[82vh] p-10 flex flex-col justify-between'>
        <ul className='text-lg flex flex-col gap-3 font-medium'>
            <li onClick={()=>{navigate('/'),setBarShow(false)}} className='cursor-pointer hover:bg-slate-400 p-2'>HOME</li>
            <li onClick={()=>{navigate('/shop'),setBarShow(false)}} className='cursor-pointer hover:bg-slate-400 p-2'>SHOP ALL</li>
            <li className='flex items-center justify-between hover:bg-slate-400 p-2 cursor-pointer'>
              <p>CATEGORY</p>
              <FaArrowRightLong />
            </li>
            <li className='cursor-pointer hover:bg-slate-400 p-2'>ABOUT US</li>
            <li className='flex items-center justify-between hover:bg-slate-400 p-2 cursor-pointer'>
                <p>DIRECT LINKS</p>
                <FaArrowRightLong />
            </li>
        </ul>

          <div className="flex gap-3 sm:gap-5">
                    <a href="https://www.facebook.com/abishek.shahi.5454"> <FaFacebook className="text-lg cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" /></a>
                    <a href="https://www.instagram.com/st__abishek/"><FaInstagram className="text-lg cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" /></a>
                    <FaYoutube className="text-lg cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" />
                    <FaTiktok className="text-lg cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" />
                    <a href="https://github.com/AbishekJungThakuri"><FaGithub className="text-lg cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" /></a>
         </div>
    </div>
  )
}
