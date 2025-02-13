import React from 'react'
import { useNavigate } from 'react-router-dom'
import brocade from '../assets/images/brocade.jpg'

export const Home = () => {
  const navigate = useNavigate()

  return (
    <div className='bg-[#E11E2B] w-[100%] h-[50vh] flex justify-center relative border-t border-white' >
      {/* <div className='h-full w-full'>
          <img className='h-full w-full object-cover'  src={brocade} alt="" />
      </div> */}
        <button onClick={()=>navigate('/shop')} className='absolute bottom-10 text-white border px-6 py-3 transform hover:-translate-y-2 transition duration-300 ease-in-out ' >SHOP NOW</button>
    </div>
  )
}
