import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const Order = () => {
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const cartItems = useSelector(state => state.cart.cart);

  console.log(cartItems)

  const handleChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    console.log('Order Placed:', { shippingInfo, cartItems });
    alert('Order Placed Successfully!');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = 50; // flat shipping
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4  py-6 sm:py-8 md:py-20">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Shipping Info Form */}
        <div className="flex-1 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Shipping Information</h2>
          <form className="flex flex-col gap-3">
            {['name','email','phone','address','city','state','zip'].map((field) => (
              <input
                key={field}
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={shippingInfo[field]}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            ))}
          </form>
        </div>

        {/* Order Summary */}
        <div className="flex-1 bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-3">Order Summary</h2>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div>
                    <p>{item.name}</p>
                    <div className='flex gap-2'>
                      <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                      <p className="text-sm text-gray-500">Size: {item.size.toUpperCase()} </p>
                    </div>
                  </div>
                </div>
                <p>${item.price * item.qty}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4 space-y-2">
            <p className="flex justify-between">Subtotal: <span>${subtotal}</span></p>
            <p className="flex justify-between">Shipping: <span>${shipping}</span></p>
            <p className="flex justify-between font-bold text-lg">Total: <span>${total}</span></p>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-4 w-full bg-green-600 text-white p-3 rounded hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default Order;

