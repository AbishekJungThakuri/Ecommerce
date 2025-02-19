import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dropIV } from '../assets/Data';
import { FiShare } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';


export const ItemDetails = () => {

    const { id } = useParams();
    const item = dropIV.find(item => item.id === parseInt(id) );

    const name = item.name;
    const price = item.price;
    const img = item.front_img;

    const [active, setActive] = useState('m');

    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <div className='py-10'>
        <div className='flex gap-[13rem]'>
          <div className='w-[50%]'>
            <img className='max-w-[27rem] border-2 rounded-3xl relative left-[45%]' src={item.front_img} alt="" />
            <img className='max-w-[27rem] mt-3 border-2 rounded-3xl relative left-[20%] ' src={item.back_img} alt="" />    
          </div>
         <div className=' w-[26rem]'>
            <p className='text-[12px] font-thin'>BROCADE OFFICIAL</p>
            <h1 className='text-[40px] font-normal '>{name}</h1>
            <p className='text-xl mt-2 font-normal'>Rs{price}.00</p>
            <p className='text-[13px] leading-[19.5px] text-[rgba(18,18,18,0.75)] mt-3 font-normal'>Size</p>
            <div className='mt-3'>
                <button onClick={()=>setActive('m')} className={`px-5 py-2 rounded-3xl mr-2 ${active === 'm' ? 'bg-black text-white': ''} cursor-pointer border border-gray-500 hover:border-gray-800`}>M</button>
                <button onClick={()=>setActive('l')} className={`px-5 py-2 rounded-3xl mr-2 ${active === 'l' ? 'bg-black text-white': ''} cursor-pointer border border-gray-500 hover:border-gray-800`}>L</button>
                <button onClick={()=>setActive('xl')} className={`px-5 py-2 rounded-3xl mr-2 ${active === 'xl' ? 'bg-black text-white': ''} cursor-pointer border border-gray-500 hover:border-gray-800`}>XL</button>
            </div>
            <p className='text-[13px] leading-[19.5px] text-[rgba(18,18,18,0.75)] mt-4 font-normal'>Qunatity</p>

            <div className='flex flex-col mt-7'>
              <button onClick={()=>{dispatch(addToCart({id,name,price,img,qty:1})),navigate('/cart')}} className='text-center py-3 cursor-pointer border border-gray-800 transform hover:-translate-y-1 transition duration-300 hover:border-gray-950 hover:border-2'>Add to cart</button>
              <button className='text-center py-3 border bg-black cursor-pointer text-white border-gray-800 mt-3 transform hover:-translate-y-1 transition duration-300'>Buy it now</button>
            </div>
      
            <p className='text-[17px] font-normal mt-8 leading-[28.8px] text-[rgba(18,18,18,0.75)] '>{item.desc}</p>
            <div className="text-gray-800 mt-6">
             <h2 className="font-semibold text-lg mb-3">Product Description</h2>
             <ul className="list-disc pl-9 space-y-2 ">
                <li><span className="font-bold">Size and Fit:</span> Regular</li>
                <li><span className="font-bold">Sleeve Length:</span> Long Sleeve</li>
                <li><span className="font-bold">Gender:</span> Unisex</li>
                <li><span className="font-bold">Material:</span> Satin</li>
                <li><span className="font-bold">Pattern Type:</span> Striped Detailing</li>
                <li><span className="font-bold">Neckline:</span> Ribbed Collar</li>
              </ul>
            </div>
            <div className='flex items-center gap-3 mt-10 cursor-pointer hover:underline'>
                <FiShare className='text-sm font-thin' />
                <p className='font-semibold'>Share</p>
            </div>
         </div>
        </div>
    </div>
  )
}
