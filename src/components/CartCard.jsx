import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { decrement, increment, removeFromCart } from '../Redux/CartSlice';

export const CartCard = ({item}) => {

    const dispatch = useDispatch();
    const qunatityPrice = item.qty * item.price;

  return (  
      <div className='relative'>
          <div className="flex justify-between items-center border-t border-b border-gray-200 py-6">
            {/* Items details */}
            <div className="flex items-start space-x-7 max-w-[300px]">
              <img className='w-28 h-auto object-cover border rounded-lg' src={item.img} alt={item.name} />
                 <div>
                   <h3 className="font-light leading-10 text-lg">{item.name}</h3>
                   <p className="text-gray-500">Rs{item.price}.00</p>
                   <p className="text-gray-500">Size: M</p>
            </div>
          </div>
          {/* item increment and decrement */}
          <div className='flex items-center gap-10 relative left-[-65px]'>
              <div className="w-fit flex items-center border border-gray-400 rounded px-4 py-2 mt-2">
                   <button onClick={()=> item.qty > 1 ? dispatch(decrement(item)) : dispatch(removeFromCart(item))} className="text-3xl cursor-pointer text-gray-600 px-2 focus:outline-none font-thin">-</button>
                   <span className="text-2xl text-gray-800 mx-7 font-thin">{item.qty}</span>
                   <button onClick={()=>dispatch(increment(item))} className="text-3xl cursor-pointer text-gray-600 px-2 focus:outline-none font-thin">+</button>
              </div>
            <RiDeleteBin6Line onClick={()=>dispatch(removeFromCart(item))} className='cursor-pointer font-thin text-gray-500' />
          </div>

          <div className="text-right text-lg font-light">
            Rs{qunatityPrice}.00
          </div>
        </div>
      </div>
  );
}