import React from 'react'
import {catergory_list} from '../assets/Data'
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../Redux/CategorySlice';

export const Category = () => {
   
  const dispatch = useDispatch();
  const selectedCategory = useSelector(state => state.category.category)
  
  return (
    <div className='flex gap-8 mb-20'>
        {
            catergory_list.map((list,index )=>(
                <div onClick={()=>dispatch(setCategory(list.category_name))} key={index} className='flex flex-col items-center gap-6'> 
                      <img className={`cursor-pointer  transform hover:-translate-y-2 transition duration-300 ease-in-out ${ selectedCategory === list.category_name ? 'border border-white py-2 rounded-md' :'' } `}  src={list.categogy_img} alt="" />  
                      <p className='text-white text-xl font-semibold'>{list.category_name.toUpperCase()}</p>   
                </div>
            ))
        }
    </div>
  )
}
