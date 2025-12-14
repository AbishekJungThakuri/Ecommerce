import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartCard } from '../components/CartCard';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cart);
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-[7rem] py-12 md:py-14 bg-[#1a1a1a] text-white ">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6 pt-[30px] sm:pt-[50px] md:pt-[118px]">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#e11f2c]">
              Your Cart
            </h2>
            <button 
              onClick={() => navigate('/shop')}
              className="text-[#e11f2c] hover:text-red-600 underline text-base sm:text-lg transition-colors duration-200 cursor-pointer"
            >
              Continue shopping
            </button>
          </div>

          {/* Column Headers - Hidden on mobile */}
          <div className="hidden sm:flex justify-between text-sm text-gray-400 mt-4 sm:mt-6 mb-3">
            <span className="flex-1">PRODUCT</span>
            <span className="flex-1 text-right">TOTAL</span>
          </div>

          {/* Cart Items */}
          {cartItems.map(item => (
            <CartCard key={item.id} item={item} />
          ))}

          {/* Total Price */}
          <div className="flex justify-end mt-8 sm:mt-10 border-t border-gray-700 pt-4 sm:pt-6">
            <div className="text-right">
              <span className="text-xl sm:text-2xl font-semibold text-[#e11f2c]">
                Total: Rs {totalPrice}.00
              </span>
            </div>
          </div>

          {/* Order Now Button */}
          <div className="flex justify-end mt-4 sm:mt-6">
            <button 
              onClick={() => navigate('/order')}
              className="w-full sm:w-auto border border-[#e11f2c] py-3 px-6 bg-[#e11f2c] text-white font-medium transform hover:-translate-y-1 hover:bg-black hover:text-[#e11f2c] transition duration-300 cursor-pointer rounded-md"
            >
              Order Now
            </button>
          </div>
        </div>
      ) : (
        // Empty Cart State
        <div className="flex flex-col items-center justify-center h-[50vh] sm:h-[57.3vh] px-4 bg-[#1a1a1a] text-white rounded-lg shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center text-[#e11f2c]">
            Your cart is empty
          </h1>
          <button
            onClick={() => navigate('/shop')}
            className="border border-[#e11f2c] mt-6 sm:mt-10 py-3 px-6 bg-[#e11f2c] text-white font-medium transform hover:-translate-y-1 hover:bg-black hover:text-[#e11f2c] transition duration-300 cursor-pointer rounded-md text-sm sm:text-base"
          >
            Continue shopping
          </button>
        </div>
      )}
    </>
  );
};

export default Cart
