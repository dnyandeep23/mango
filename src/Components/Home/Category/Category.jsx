import React from 'react';
import "./Category.css"
import { useNavigate } from 'react-router-dom';

const Category = ({categories})=> {
    const navigate = useNavigate(); 
  return (
    <div className='shop-by-category m-[25px] md:m-[50px]'>
        <div className="categories flex  justify-center flex-row gap-5" >
           
        {categories && categories.data ? categories.data.map((category) => (
            <div key={category.id} className="category bg-black cursor-pointer overflow-hidden md:block " onClick={()=>{navigate('/category/1')}}>
                <img src={ process.env.REACT_APP_DEV_URL + category.attributes.img.data.attributes.url} alt="" className='w-full block hover:scale-110' />
            </div>
        )) : null }
            
        </div>
    </div>
  )
}

export default Category