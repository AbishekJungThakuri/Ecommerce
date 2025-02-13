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
        <div className="mx-auto px-[7rem] py-10">
          <div className="flex justify-between items-center">
            <h2 className="text-5xl font-normal mb-4">Your cart</h2>
            <a href="#" className="text-blue-600 hover:underline" onClick={() => navigate('/shop')}>
              Continue shopping
            </a>
          </div>

          <div className="flex justify-between text-sm text-gray-500 mt-10 mb-3">
            <span>PRODUCT</span>
            <span>QUANTITY</span>
            <span>TOTAL</span>
          </div>

          {cartItems.map((item) => (
            <CartCard key={item.id} item={item} />
          ))}

          {/* Display the total price */}
          <div className="flex justify-end mt-10 border-t pt-6">
            <div className="text-right">
              <span className="text-xl font-semibold">Total: Rs{totalPrice}.00</span>
            </div>
          </div>

          {/* Order Now Button */}
          <div className="flex justify-end mt-6">
            <button
              className="border py-3 px-6 bg-black text-white transform hover:-translate-y-1 transition duration-300"
            >
              Order Now
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[35.5vh]">
          <h1 className="text-5xl font-semibold">Your cart is empty</h1>
          <button
            onClick={() => navigate('/shop')}
            className="border mt-10 py-3 px-4 bg-black text-white transform hover:-translate-y-1 transition duration-300"
          >
            Continue shopping
          </button>
        </div>
      )}
    </>
  );
};