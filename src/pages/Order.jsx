import React from 'react';

const Order = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-[#1a1a1a] p-6">
      
      <div className="bg-[#1a1a1a] rounded-2xl shadow-xl overflow-hidden max-w-sm w-full text-center p-6">
        
        {/* Image / GIF */}
        <div className="mb-4 rounded-xl overflow-hidden shadow-lg border border-[#e11f2c]">
          <img
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN25wMDdiYjE4Z3UyZjgxbnVnOHVjem5xaG5yb3JrNTRtNm9jbzAyZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wwg1suUiTbCY8H8vIA/giphy.gif"
            alt="Under Construction"
            className="w-full h-52 object-cover"
          />
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold text-[#e11f2c] mb-2">Page Under Construction</h2>
        <p className="text-gray-300 mb-4">
          We're working hard to bring this page to you soon!
        </p>

        {/* Button */}
        <button
          onClick={() => window.history.back()}
          className="bg-[#e11f2c] text-white cursor-pointer px-6 py-2 rounded-lg hover:bg-[#b01622] transition-colors duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Order;
