import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { dropIV } from '../../assets/Data';
import { FiShare } from "react-icons/fi";
import { useDispatch } from 'react-redux';
import { addToCart } from '../../Redux/CartSlice';

import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

const ItemDetails = () => {
  const { id } = useParams();
  const item = dropIV.find(item => item.id === parseInt(id));

  if (!item) {
    return (
      <div className="py-10 text-center text-[#e11f2c] font-bold">
        Product not found
      </div>
    );
  }

  const { name, price, front_img, back_img, desc } = item;

  const [active, setActive] = useState('m');
  const [open, setOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const images = [front_img, back_img];

  const slides = images.map(img => ({ src: img }));

  return (
    <div className="py-6 sm:py-8 md:py-10 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] text-white">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-[13rem] pt-[30px] sm:pt-[50px] md:pt-[118px]">

        <div className="w-full lg:w-[50%]">
          {/* MOBILE SLIDER */}
          <div className="block lg:hidden relative">
            <Swiper
              modules={[Navigation, Pagination]}
              navigation={{
                prevEl: ".custom-prev",
                nextEl: ".custom-next",
              }}
              pagination={{ clickable: true }}
              spaceBetween={20}
              slidesPerView={1}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={name}
                    onClick={() => {
                      setPhotoIndex(index);
                      setOpen(true);
                    }}
                    className="w-full h-auto rounded-3xl cursor-zoom-in"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <button className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 bg-black text-[#e11f2c] p-2 rounded-full z-10">
              <MdArrowBackIos />
            </button>

            <button className="custom-next absolute right-2 top-1/2 -translate-y-1/2 bg-black text-[#e11f2c] p-2 rounded-full z-10">
              <MdArrowForwardIos />
            </button>
          </div>

          {/* DESKTOP IMAGES */}
          <div className="hidden lg:flex flex-col gap-4">
            <img
              src={front_img}
              alt={name}
              onClick={() => {
                setPhotoIndex(0);
                setOpen(true);
              }}
              className="w-full max-w-[27rem] border-2 border-[#e11f2c] rounded-3xl cursor-zoom-in relative left-[45%]"
            />

            <img
              src={back_img}
              alt={`${name} back`}
              onClick={() => {
                setPhotoIndex(1);
                setOpen(true);
              }}
              className="w-full max-w-[27rem] border-2 border-[#e11f2c] rounded-3xl cursor-zoom-in relative left-[20%] mt-3"
            />
          </div>
        </div>

        <div className="w-full lg:w-[26rem] mx-auto lg:mx-0">
          <p className="text-xs text-[#e11f2c]">BROCADE OFFICIAL</p>

          <h1 className="text-3xl md:text-[40px] font-bold mt-2">
            {name}
          </h1>

          <p className="text-xl mt-2 font-semibold text-[#e11f2c]">
            Rs {price}.00
          </p>

          {/* SIZE */}
          <p className="text-sm mt-4 text-gray-300">Size</p>
          <div className="mt-3 flex gap-2">
            {['m', 'l', 'xl'].map(size => (
              <button
                key={size}
                onClick={() => setActive(size)}
                className={`px-5 py-2 rounded-3xl border ${
                  active === size
                    ? 'bg-[#e11f2c] text-white'
                    : 'border-gray-500'
                }`}
              >
                {size.toUpperCase()}
              </button>
            ))}
          </div>

          {/* BUTTONS */}
          <div className="flex flex-col mt-7 gap-3">
            <button
              onClick={() => {
                dispatch(addToCart({
                  id,
                  name,
                  price,
                  size: active,
                  img: front_img,
                  qty: 1
                }));
                navigate('/cart');
              }}
              className="py-3 bg-[#e11f2c] border border-[#e11f2c] hover:bg-black hover:text-[#e11f2c] transition rounded-md"
            >
              Add to cart
            </button>

            <button className="py-3 border border-[#e11f2c] rounded-md">
              Buy it now
            </button>
          </div>

          {/* DESCRIPTION */}
          <p className="mt-6 text-gray-300 leading-7">
            {desc}
          </p>

          {/* SHARE */}
          <div className="flex items-center gap-3 mt-8 text-[#e11f2c] cursor-pointer">
            <FiShare />
            <span>Share</span>
          </div>
        </div>
      </div>

      {/* LIGHTBOX */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={photoIndex}
        slides={slides}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 1.2,
          doubleTapDelay: 300,
        }}
      />
    </div>
  );
};

export default ItemDetails;
