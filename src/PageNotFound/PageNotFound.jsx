import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {

    const navigate = useNavigate()

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center bg-[#1a1a1a] gap-5'>
         <h1 className='text-white text-5xl font-bold'>Page Not Found</h1>
          <button onClick={()=>navigate('/')} className='text-white bg-[#e11f2c] px-5 py-3 rounded-xl cursor-pointer text-lg hover:bg-red-600'>Go to Home</button>
    </div>
  )
}

export default PageNotFound
