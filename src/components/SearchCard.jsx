import React from 'react';
import { MdClose } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSearch } from '../Redux/SearchSlice';

export const SearchCard = ({filteredResults, searchCard}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div 
      ref={searchCard}  
      className="absolute top-[4.5rem] sm:top-[5.3rem] left-2 sm:left-4 md:left-[5.3rem] bg-white shadow-lg z-20 p-2 sm:p-3 md:p-4 w-[90vw] sm:w-[400px] md:w-[500px] max-h-[60vh] overflow-y-auto"
    >
      <ul className="space-y-1 sm:space-y-2">
        {filteredResults.map((item, index) => (
          <div key={index} className='flex items-center justify-between gap-3 sm:gap-4 md:gap-5 hover:bg-gray-50 rounded-lg p-1 sm:p-2'>
            <div 
              onClick={() => {
                navigate(`/itemDetail/${item.id}`);
                dispatch(clearSearch());
              }} 
              className='flex items-center gap-2 sm:gap-3 flex-1 min-w-0 cursor-pointer'
            >
              <img 
                className='w-8 h-8 sm:w-[2rem] sm:h-[2rem] object-cover rounded flex-shrink-0' 
                src={item.front_img} 
                alt={item.name} 
              />
              <span className="text-xs sm:text-sm md:text-base truncate">
                {item.name}
              </span>
            </div>
            <MdClose 
              className='cursor-pointer text-slate-400 text-lg sm:text-xl md:text-[20px] p-1 rounded-full hover:bg-slate-400 hover:text-white flex-shrink-0' 
            />
          </div>
        ))}
      </ul>
      
      {/* Empty state */}
      {filteredResults.length === 0 && (
        <div className="text-center py-4 sm:py-6">
          <p className="text-gray-500 text-sm sm:text-base">No results found</p>
        </div>
      )}
    </div>
  );
};