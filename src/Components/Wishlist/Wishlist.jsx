import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineDelete, AiFillDelete } from 'react-icons/ai';
import { Context } from '../../utils/context';
import { useContext } from 'react';
import img from '../../assets/img.png'

const Wishlist = () => {
 
  const {removeItem,
    handleMouseEnter,
    handleMouseLeave,wishlistItems,setWishList} = useContext(Context);

  const navigate = useNavigate();

  const handleDelete = (itemId) => {
    removeItem(itemId);
  };

  
  return (
    <div className="container p-4 w-[95%] my-4 mx-auto flex flex-col justify-center bg-slate-200 rounded-xl">
      <h1 className="text-2xl font-bold ml-20 mb-4 flex mx-auto md:">Wishlist</h1>
      <div className="border-b-4 border-slate-50 mb-4 "></div>
      {wishlistItems?.length === 0 ? (
        <p className="flex justify-center items-center font-serif font-semibold text-2xl">
          Your wishlist is empty
        </p>
      ) : (
        <ul className="flex flex-col gap-4 flex-grow">
          {wishlistItems.map((item) => (
            <li
              key={item.id}
              className="mx-auto w-[95%] justify-between flex rounded-xl items-center p-4 bg-white shadow cursor-pointer"
              
            >
              <div className='flex' onClick={() => navigate('/product/' + item.id)}>
                <div className="w-32 mx-4 my-auto">
                <img src={process.env.REACT_APP_DEV_URL + item.product.img.data[0].attributes.url} className="w-full h-full" alt="image" />
              </div>
              <div >
                <h3 className="text-base font-semibold text-ellipsis">{item.product.title}</h3>
                <span className="text-lg font-bold"> &#8377; {item.product.price}</span>
                <h3 className="text-base text-gray-600 font-normal text-ellipsis">{item.product.desc}</h3>
                
              </div>
              </div>
              
              <div
                className="mr-8 text-red-600"
                onClick={() => handleDelete(item.id)}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
              >
                {item.hovered ? (
                  <AiFillDelete size={30} />
                ) : (
                  <AiOutlineDelete size={30} />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
