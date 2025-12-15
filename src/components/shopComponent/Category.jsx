import React from 'react'
import { catergory_list } from '../../assets/Data'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../Redux/CategorySlice'

export const Category = () => {
  const dispatch = useDispatch()
  const selectedCategory = useSelector(state => state.category.category)

  return (
    <div className="
      grid 
      grid-cols-3 
      md:grid-cols-6 
      lg:grid-cols-8 
      gap-3 md:gap-8 
      mb-12 sm:mb-16 md:mb-20 
      px-4 sm:px-0
      justify-items-center
    ">
      {catergory_list.map((list, index) => (
        <div
          key={index}
          onClick={() => dispatch(setCategory(list.category_name))}
          className="flex flex-col items-center gap-3 sm:gap-4 md:gap-6 cursor-pointer"
        >
          <img
            src={list.categogy_img}
            alt={list.category_name}
            className={`
              w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24
              transform hover:-translate-y-1 sm:hover:-translate-y-2
              transition duration-300 ease-in-out
              ${
                selectedCategory === list.category_name
                  ? 'border border-white p-1 sm:p-2 rounded-md'
                  : ''
              }
            `}
          />
          <p className="text-white text-xs sm:text-sm md:text-base lg:text-xl font-semibold text-center">
            {list.category_name.toUpperCase()}
          </p>
        </div>
      ))}
    </div>
  )
}
