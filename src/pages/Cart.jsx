import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartCard } from '../components/CartCard';

export const Cart = () => {
  const cartItems = useSelector(state => state.cart.cart);
  const navigate = useNavigate();

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.qty, 0);

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-[7rem] py-6 sm:py-8 md:py-10">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal">Your cart</h2>
            <button 
              onClick={() => navigate('/shop')}
              className="text-blue-600 hover:underline text-base sm:text-lg"
            >
              Continue shopping
            </button>
          </div>

          {/* Column Headers - Hidden on mobile, visible on tablet+ */}
          <div className="hidden sm:flex justify-between text-sm text-gray-500 mt-8 sm:mt-10 mb-3">
            <span className="flex-1">PRODUCT</span>
            <span className="flex-1 text-right">TOTAL</span>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}

          {/* Total Price */}
          <div className="flex justify-end mt-8 sm:mt-10 border-t pt-4 sm:pt-6">
            <div className="text-right">
              <span className="text-lg sm:text-xl font-semibold">Total: Rs{totalPrice}.00</span>
            </div>
          </div>

          {/* Order Now Button */}
          <div className="flex justify-end mt-4 sm:mt-6">
            <button 
              onClick={() => navigate('/order')}
              className="w-full sm:w-auto border py-3 px-6 bg-black text-white transform hover:-translate-y-1 transition duration-300 cursor-pointer text-center"
            >
              Order Now
            </button>
          </div>
        </div>
      ) : (
        // Empty Cart State
        <div className="flex flex-col items-center justify-center h-[50vh] sm:h-[53vh] px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-center">
            Your cart is empty
          </h1>
          <button
            onClick={() => navigate('/shop')}
            className="border mt-6 sm:mt-10 py-3 px-6 bg-black text-white transform hover:-translate-y-1 transition duration-300 cursor-pointer text-sm sm:text-base"
          >
            Continue shopping
          </button>
        </div>
      )}
    </>
  );
};