import React, { useEffect, useState } from 'react'
import { ItemCard } from '../components/shopComponent/ItemCard'
import { dropIV } from '../assets/Data'
import { Category } from '../components/shopComponent/Category'
import { useSelector } from 'react-redux'
import Notavailable from '../assets/not-available.gif';

const Shop = () => {
  
  const selectedCategory = useSelector(state => state.category.category);

  const initialCount = 10;
  const [visibleCount, setVisibleCount] = useState(initialCount);

  // Filter items by category
  const filteredItems = dropIV.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.catergory === selectedCategory;
  });

  const visibleItems = filteredItems.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 5);
  }

  useEffect(() => {
    setVisibleCount(initialCount);
  },[selectedCategory]);

  // console.log(visibleCount)

  return (
    <div className='bg-black px-4 sm:px-6 md:px-8 lg:px-12 xl:px-[10rem] py-6 sm:py-8 md:py-10'>
      <h1 className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl pt-[30px] sm:pt-[50px] md:pt-[118px] font-bold mb-8 sm:mb-10 md:mb-12 lg:mb-14 mt-6 sm:mt-8 md:mt-10 text-center sm:text-left'>
        SHOP BY CATEGORY
      </h1>
      
      <Category/>
      
      <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white text-center sm:text-left mb-6 sm:mb-8'>
        {
          selectedCategory === "All" ? 'DROP IV' : selectedCategory.toUpperCase()
        }
      </h1>
      
      {/* Updated grid layout for responsive columns */}
      { visibleItems.length > 0 ?
      <>
        <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 justify-items-center'>
        {
          visibleItems.map(item => <ItemCard key={item.id} item={item}/>)
        }
      </div>
      {/* load more button */}
      {
        visibleCount < filteredItems.length && (
            <div className='flex justify-center mt-10'>
              <button
                onClick={handleLoadMore}
                className='px-6 py-3 cursor-pointer border border-[#e11f2c] bg-[#e11f2c] text-white  transform hover:-translate-y-1 hover:bg-black hover:text-[#e11f2c] transition duration-300 rounded-md'
              >
                Load More
              </button>
            </div>
        )
      }
      </>
      :
      <div className='flex flex-col justify-center items-center mt-10 gap-5'>
        <img className='w-100 h-66 object-cover border-6 border-[#e11f2c] rounded-xl' src={Notavailable} alt="Image not found" />
        <p className='text-white font-medium text-lg sm:text-3xl'>Product is Not Available</p>
      </div>
      }
    </div>
  )
}

export default Shop