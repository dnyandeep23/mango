import React, { useState } from 'react';
import { Context } from '../../utils/context';
import { useContext } from 'react';

const WishlistCom = () => {

  const {wishlistComItems,setWishlistComItems} = useContext(Context)
  const addToWishlist = (item) => {
    setWishlistComItems((prevItems) => [...prevItems, item]);
  };

  const removeFromWishlist = (itemId) => {
    setWishlistComItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
      {wishlistComItems.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <ul className="space-y-4">
          {wishlistComItems.map((item) => (
            <li key={item.id} className="flex items-center space-x-4">
              <span className="text-lg">{item.name}</span>
              <button
                className="px-3 py-1 text-sm text-red-500 bg-transparent border border-red-500 rounded hover:bg-red-500 hover:text-white"
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="mt-4 space-x-2">
        <button
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => addToWishlist({ id: 1, name: 'Item 1' })}
        >
          Add Item 1
        </button>
        <button
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => addToWishlist({ id: 2, name: 'Item 2' })}
        >
          Add Item 2
        </button>
        <button
          className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => addToWishlist({ id: 3, name: 'Item 3' })}
        >
          Add Item 3
        </button>
      </div>
    </div>
  );
};

export default WishlistCom;
