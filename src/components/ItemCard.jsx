import React, { useState } from 'react'
import { Link } from 'react-router-dom';

export const ItemCard = ({item}) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='mt-8' onMouseOver={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)}>
        <Link to={`/itemDetail/${item.id}`}>
        <img className={`max-w-[13rem] h-auto border rounded-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out ${isHovered ? 'hidden' : ''}`} src={item.front_img} alt="satinBomber" />
        <img className={`max-w-[13rem] h-auto border rounded-2xl transform hover:-translate-y-2 transition duration-300 ease-in-out ${isHovered ? '' : 'hidden'}`} src={item.back_img} alt="satinBomber" />
        <p className={`text-sm font-normal mt-3 ${isHovered ? 'underline':''}`}>{item.name}</p>
        </Link>
        <p className='text-sm font-normal mt-3'>Rs{item.price}.00</p>
    </div>
  )
}
