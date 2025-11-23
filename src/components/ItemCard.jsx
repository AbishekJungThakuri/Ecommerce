import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const ItemCard = ({item}) => {
    const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className='mt-4 sm:mt-8 w-full max-w-[13rem]' 
      onMouseOver={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)} // For mobile touch
      onTouchEnd={() => setIsHovered(false)} // For mobile touch
    >
        <Link to={`/itemDetail/${item.id}`} className='block'>
          <div className='relative'>
            <img 
              className={`w-full h-auto border rounded-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out ${
                isHovered ? 'hidden' : 'block'
              }`} 
              src={item.front_img} 
              alt={item.name} 
            />
            <img 
              className={`w-full h-auto border rounded-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out ${
                isHovered ? 'block' : 'hidden'
              }`} 
              src={item.back_img} 
              alt={item.name} 
            />
          </div>
          <p className={`text-sm text-white font-normal mt-3 ${isHovered ? 'underline' : ''}`}>
            {item.name}
          </p>
        </Link>
        <p className='text-sm text-white font-normal mt-2'>Rs{item.price}.00</p>
    </div>
  )
}