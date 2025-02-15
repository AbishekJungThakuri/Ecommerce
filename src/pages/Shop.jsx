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
    <div className='bg-black px-[10rem] py-10 '>
      <h1 className='text-white text-5xl font-bold mb-14 mt-10'>SHOP BY CATEGORY</h1>
      <Category/>
      <h1 className='text-4xl text-white'>DROP IV</h1>
      <div className='flex flex-wrap gap-6'>
      {
        filteredItems.map(item => <ItemCard key={item.id} item={item}/>)
      }
      </div>
  </div>
  )
}
