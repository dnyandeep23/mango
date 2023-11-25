import React from 'react'
import Products from '../Home/Products'

const Categories = ()=> {
  return (
    <div className='category-main-content m-[30px] md:m-[75px]'>
        <div className="layout max-w-full m-auto">
            <div className="category-title text-2xl md:text-4xl">Category</div>
            <Products  innerPage={true}/>
            
        </div>
    </div>
  )
}

export default Categories