import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { dropIV } from '../assets/Data';
import { FiShare } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const ItemDetails = () => {
    const { id } = useParams();
    const item = dropIV.find(item => item.id === parseInt(id));

    if (!item) {
        return <div className="py-10 text-center text-[#e11f2c] font-bold">Product not found</div>;
    }

    const name = item.name;
    const price = item.price;
    const img = item.front_img;

    const [active, setActive] = useState('m');
    const [currentSlide, setCurrentSlide] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const images = [item.front_img, item.back_img];

    const nextSlide = () => setCurrentSlide(prev => (prev === images.length - 1 ? 0 : prev + 1));
    const prevSlide = () => setCurrentSlide(prev => (prev === 0 ? images.length - 1 : prev - 1));

    return (
        <div className='py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] text-white rounded-lg shadow-lg'>
            <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-[13rem]'>

                {/* Images Section */}
                <div className='w-full lg:w-[50%]'>
                    {/* Mobile Slider */}
                    <div className='block lg:hidden relative'>
                        <div className='relative overflow-hidden rounded-3xl border-2 border-[#e11f2c]'>
                            <div 
                                className='flex transition-transform duration-300 ease-in-out'
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {images.map((image, index) => (
                                    <div key={index} className='w-full flex-shrink-0'>
                                        <img 
                                            className='w-full h-auto rounded-3xl'
                                            src={image}
                                            alt={index === 0 ? name : `${name} back view`}
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            {/* Navigation Arrows */}
                            <button 
                                onClick={prevSlide}
                                className='absolute left-2 top-1/2 transform -translate-y-1/2 bg-[#e11f2c]/20 hover:bg-[#e11f2c]/40 rounded-full p-2 transition-all duration-200 shadow-lg'
                            >
                                <ChevronLeft className='w-5 h-5 text-[#e11f2c]' />
                            </button>
                            <button 
                                onClick={nextSlide}
                                className='absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#e11f2c]/20 hover:bg-[#e11f2c]/40 rounded-full p-2 transition-all duration-200 shadow-lg'
                            >
                                <ChevronRight className='w-5 h-5 text-[#e11f2c]' />
                            </button>
                            
                            {/* Slide Indicators */}
                            <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2'>
                                {images.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                                            currentSlide === index ? 'bg-[#e11f2c]' : 'bg-white/50'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className='hidden lg:flex flex-col gap-4'>
                        <img 
                            className='w-full max-w-[27rem] border-2 border-[#e11f2c] rounded-3xl relative left-[45%]' 
                            src={item.front_img} 
                            alt={name} 
                        />
                        <img 
                            className='w-full max-w-[27rem] border-2 border-[#e11f2c] rounded-3xl relative left-[20%] mt-3' 
                            src={item.back_img} 
                            alt={`${name} back view`} 
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className='w-full lg:w-[26rem] mx-auto lg:mx-0'>
                    <p className='text-xs sm:text-[12px] font-thin text-[#e11f2c]'>BROCADE OFFICIAL</p>
                    <h1 className='text-2xl sm:text-3xl md:text-[40px] font-bold mt-2 text-white'>{name}</h1>
                    <p className='text-lg sm:text-xl md:text-xl mt-2 font-semibold text-[#e11f2c]'>Rs{price}.00</p>
                    
                    {/* Size Selection */}
                    <p className='text-sm sm:text-[13px] leading-[19.5px] mt-4 font-normal text-gray-300'>Size</p>
                    <div className='mt-3 flex flex-wrap gap-2'>
                        {['m','l','xl'].map(size => (
                            <button
                                key={size}
                                onClick={() => setActive(size)}
                                className={`px-4 sm:px-5 py-2 rounded-3xl border border-gray-500 hover:border-[#e11f2c] transition-colors ${
                                    active === size ? 'bg-[#e11f2c] text-white' : 'text-white'
                                }`}
                            >
                                {size.toUpperCase()}
                            </button>
                        ))}
                    </div>

                    {/* Quantity */}
                    <p className='text-sm sm:text-[13px] leading-[19.5px] mt-4 font-normal text-gray-300'>Quantity</p>

                    {/* Action Buttons */}
                    <div className='flex flex-col mt-6 sm:mt-7 gap-3'>
                        <button 
                            onClick={() => {
                                dispatch(addToCart({ id, name, price, img, qty: 1 }));
                                navigate('/cart');
                            }}
                            className='w-full text-center py-3 px-4 cursor-pointer border border-[#e11f2c] bg-[#e11f2c] text-white font-medium transform hover:-translate-y-1 hover:bg-black hover:text-[#e11f2c] transition duration-300 rounded-md'
                        >
                            Add to cart
                        </button>
                        <button 
                            className='w-full text-center py-3 px-4 border bg-black cursor-pointer text-white border-[#e11f2c] font-medium transform hover:-translate-y-1 transition duration-300 rounded-md'
                        >
                            Buy it now
                        </button>
                    </div>

                    {/* Description */}
                    <p className='text-base sm:text-[17px] font-normal mt-6 sm:mt-8 leading-[28.8px] text-gray-300'>
                        {item.desc}
                    </p>

                    {/* Product Details */}
                    <div className="text-gray-300 mt-6">
                        <h2 className="font-semibold text-lg mb-3 text-[#e11f2c]">Product Description</h2>
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
                    <div className='flex items-center gap-3 mt-8 sm:mt-10 cursor-pointer hover:underline text-[#e11f2c]'>
                        <FiShare className='text-sm font-thin' />
                        <p className='font-semibold text-sm sm:text-base'>Share</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
