import React from 'react'
import { ItemCard } from '../components/ItemCard'
import { dropIV } from '../assets/Data'

export const Shop = () => {
  return (
    <div className='px-[6rem] py-10'>
    <div>
      <h1 className='text-4xl'>DROP IV</h1>
      <div className='flex gap-5'>
      {
        dropIV.map(item => <ItemCard key={item.id} item={item}/>)
      }
      </div>
    </div>
  </div>
  )
}
