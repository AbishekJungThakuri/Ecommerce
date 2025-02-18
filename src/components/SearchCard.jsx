import React from 'react';
import { MdClose } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearSearch } from '../Redux/SearchSlice';

export const SearchCard = ({filteredResults,searchCard}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div ref={searchCard}  className="absolute top-[5.3rem] left-3 sm:left-[5.3rem] bg-white shadow-lg z-20 p-2">
         <ul>
             {
             filteredResults.map((item, index) => (
                   <div key={index} className='flex items-center justify-between gap-5  '>
                    
                      <div onClick={()=>{navigate(`/itemDetail/${item.id}`),dispatch(clearSearch())}} className='flex items-center gap-2 px-2 hover:bg-gray-100 cursor-pointer '>
                         <img className='w-[2rem] h-auto' src={item.front_img} alt="" />
                         <li className="text-sm">
                         {item.name}
                        </li>
                      </div>
                     <MdClose className='cursor-pointer text-slate-400 text-[20px] p-1 rounded-full hover:bg-slate-400 hover:text-white'/>
                   </div>
                ))
              }
           </ul>
    </div>
  );
};