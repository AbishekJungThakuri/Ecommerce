import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dropIV } from '../assets/Data';
import { FiShare } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';

export const ItemDetails = () => {
    const { id } = useParams();
    const item = dropIV.find(item => item.id === parseInt(id));

    if (!item) {
        return <div className="py-10 text-center">Product not found</div>;
    }

    const name = item.name;
    const price = item.price;
    const img = item.front_img;

    const [active, setActive] = useState('m');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <div className='py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-[13rem]'>
                {/* Images Section */}
                <div className='w-full lg:w-[50%]'>
                    <div className='flex flex-col md:flex-row lg:flex-col gap-4'>
                        <img 
                            className='w-full max-w-full md:max-w-[20rem] lg:max-w-[27rem] border-2 rounded-3xl mx-auto lg:mx-0 lg:relative lg:left-[45%]' 
                            src={item.front_img} 
                            alt={name} 
                        />
                        <img 
                            className='w-full max-w-full md:max-w-[20rem] lg:max-w-[27rem] border-2 rounded-3xl mx-auto lg:mx-0 lg:relative lg:left-[20%] lg:mt-3' 
                            src={item.back_img} 
                            alt={`${name} back view`} 
                        />
                    </div>
                </div>

                {/* Product Info Section */}
                <div className='w-full lg:w-[26rem] mx-auto lg:mx-0'>
                    <p className='text-xs sm:text-[12px] font-thin'>BROCADE OFFICIAL</p>
                    <h1 className='text-2xl sm:text-3xl md:text-[40px] font-normal mt-2'>{name}</h1>
                    <p className='text-lg sm:text-xl md:text-xl mt-2 font-normal'>Rs{price}.00</p>
                    
                    {/* Size Selection */}
                    <p className='text-sm sm:text-[13px] leading-[19.5px] text-[rgba(18,18,18,0.75)] mt-4 font-normal'>Size</p>
                    <div className='mt-3 flex flex-wrap gap-2'>
                        <button 
                            onClick={() => setActive('m')} 
                            className={`px-4 sm:px-5 py-2 rounded-3xl ${active === 'm' ? 'bg-black text-white' : ''} cursor-pointer border border-gray-500 hover:border-gray-800 transition-colors`}
                        >
                            M
                        </button>
                        <button 
                            onClick={() => setActive('l')} 
                            className={`px-4 sm:px-5 py-2 rounded-3xl ${active === 'l' ? 'bg-black text-white' : ''} cursor-pointer border border-gray-500 hover:border-gray-800 transition-colors`}
                        >
                            L
                        </button>
                        <button 
                            onClick={() => setActive('xl')} 
                            className={`px-4 sm:px-5 py-2 rounded-3xl ${active === 'xl' ? 'bg-black text-white' : ''} cursor-pointer border border-gray-500 hover:border-gray-800 transition-colors`}
                        >
                            XL
                        </button>
                    </div>

                    {/* Quantity */}
                    <p className='text-sm sm:text-[13px] leading-[19.5px] text-[rgba(18,18,18,0.75)] mt-4 font-normal'>Quantity</p>

                    {/* Action Buttons */}
                    <div className='flex flex-col mt-6 sm:mt-7 gap-3'>
                        <button 
                            onClick={() => {
                                dispatch(addToCart({ id, name, price, img, qty: 1 }));
                                navigate('/cart');
                            }} 
                            className='text-center py-3 px-4 cursor-pointer border border-gray-800 transform hover:-translate-y-1 transition duration-300 hover:border-gray-950 hover:border-2'
                        >
                            Add to cart
                        </button>
                        <button 
                            className='text-center py-3 px-4 border bg-black cursor-pointer text-white border-gray-800 transform hover:-translate-y-1 transition duration-300'
                        >
                            Buy it now
                        </button>
                    </div>

                    {/* Description */}
                    <p className='text-base sm:text-[17px] font-normal mt-6 sm:mt-8 leading-[28.8px] text-[rgba(18,18,18,0.75)]'>
                        {item.desc}
                    </p>

                    {/* Product Details */}
                    <div className="text-gray-800 mt-6">
                        <h2 className="font-semibold text-lg mb-3">Product Description</h2>
                        <ul className="list-disc pl-5 sm:pl-9 space-y-2 text-sm sm:text-base">
                            <li><span className="font-bold">Size and Fit:</span> Regular</li>
                            <li><span className="font-bold">Sleeve Length:</span> Long Sleeve</li>
                            <li><span className="font-bold">Gender:</span> Unisex</li>
                            <li><span className="font-bold">Material:</span> Satin</li>
                            <li><span className="font-bold">Pattern Type:</span> Striped Detailing</li>
                            <li><span className="font-bold">Neckline:</span> Ribbed Collar</li>
                        </ul>
                    </div>

                    {/* Share Section */}
                    <div className='flex items-center gap-3 mt-8 sm:mt-10 cursor-pointer hover:underline'>
                        <FiShare className='text-sm font-thin' />
                        <p className='font-semibold text-sm sm:text-base'>Share</p>
                    </div>
                </div>
            </div>
        </div>
    );
};