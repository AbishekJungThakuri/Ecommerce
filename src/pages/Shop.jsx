import React from 'react'
import { ItemCard } from '../components/ItemCard'
import { dropIV } from '../assets/Data'
import { Category } from '../components/Category'
import { useSelector } from 'react-redux'

export const Shop = () => {
  
  const selectedCategory = useSelector(state => state.category.category)
  const filteredItems = dropIV.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.catergory === selectedCategory;
  });

  return (
    <div className='bg-black px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[10rem] py-6 sm:py-8 md:py-10'>
      <h1 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 sm:mb-10 md:mb-12 lg:mb-14 mt-6 sm:mt-8 md:mt-10 text-center sm:text-left'>
        SHOP BY CATEGORY
      </h1>
      
      <Category/>
      
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white text-center sm:text-left mb-6 sm:mb-8'>
        {
          selectedCategory === "All" ? 'DROP IV' : selectedCategory.toUpperCase()
        }
      </h1>
      
      <div className='flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-5 md:gap-6'>
        {
          filteredItems.map(item => <ItemCard key={item.id} item={item}/>)
        }
      </div>
    </div>
  )
}