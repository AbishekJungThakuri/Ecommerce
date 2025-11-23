import React from 'react';
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { decrement, increment, removeFromCart } from '../Redux/CartSlice';

export const CartCard = ({item}) => {
    const dispatch = useDispatch();
    const quantityPrice = item.qty * item.price;

    return (  
        <div className='relative'>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-b border-gray-200 py-4 sm:py-6 gap-4 sm:gap-0">
                {/* Item details */}
                <div className="flex items-start space-x-4 sm:space-x-7 w-full sm:max-w-[300px]">
                    <img 
                        className='w-20 h-20 sm:w-28 sm:h-28 object-cover border rounded-lg flex-shrink-0' 
                        src={item.img} 
                        alt={item.name} 
                    />
                    <div className="flex-1 min-w-0">
                        <h3 className="font-light leading-7 sm:leading-10 text-base sm:text-lg truncate">{item.name}</h3>
                        <p className="text-gray-500 text-sm sm:text-base">Rs{item.price}.00</p>
                        <p className="text-gray-500 text-sm sm:text-base">Size: M</p>
                    </div>
                </div>

                {/* Item controls and price */}
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 sm:gap-10 sm:relative sm:left-[-65px]">
                    {/* Quantity controls */}
                    <div className="flex items-center gap-4 sm:gap-10">
                        <div className="w-fit flex items-center border border-gray-400 rounded px-3 sm:px-4 py-1 sm:py-2">
                            <button 
                                onClick={() => item.qty > 1 ? dispatch(decrement(item)) : dispatch(removeFromCart(item))} 
                                className="text-xl sm:text-2xl lg:text-3xl cursor-pointer text-gray-600 px-1 sm:px-2 focus:outline-none font-thin"
                            >
                                -
                            </button>
                            <span className="text-lg sm:text-xl lg:text-2xl text-gray-800 mx-4 sm:mx-7 font-thin">
                                {item.qty}
                            </span>
                            <button 
                                onClick={() => dispatch(increment(item))} 
                                className="text-xl sm:text-2xl lg:text-3xl cursor-pointer text-gray-600 px-1 sm:px-2 focus:outline-none font-thin"
                            >
                                +
                            </button>
                        </div>
                        
                        {/* Delete icon - hidden on mobile, visible on tablet+ */}
                        <RiDeleteBin6Line 
                            onClick={() => dispatch(removeFromCart(item))} 
                            className='cursor-pointer font-thin text-gray-500 text-lg sm:text-xl hidden sm:block' 
                        />
                    </div>

                    {/* Price */}
                    <div className="text-right text-base sm:text-lg font-light whitespace-nowrap">
                        Rs{quantityPrice}.00
                    </div>

                    {/* Delete icon - visible only on mobile */}
                    <RiDeleteBin6Line 
                        onClick={() => dispatch(removeFromCart(item))} 
                        className='cursor-pointer font-thin text-gray-500 text-lg sm:text-xl block sm:hidden' 
                    />
                </div>
            </div>
        </div>
    );
}