import React from 'react';
import OrderItem from './OrderItem';

const generateRandomOrderItems = (count) => {
  const items = [];

  for (let i = 0; i < count; i++) {
    const item = {
      id: i + 1,
      name: `Product ${i + 1}`,
      desc: `Product desc ${i + 1}`,
      price: Math.random() * 50 + 10,
      quantity: Math.floor(Math.random() * 5) + 1,
      imageUrl: `https://example.com/product${i + 1}.jpg`,
      status: 'delivered'
    };

    items.push();
  }

  return items;
};

const Order = () => {
  const orderItems = generateRandomOrderItems(5);

  return (
    <div className="container w-[95%]  p-4 flex flex-col bg-gray-400 rounded-xl mx-auto my-2 md:m-10
     ">
      <h1 className="text-2xl font-bold mb-4 border-b-2 pb-4 text-white pl-8">Order Details</h1>
      {orderItems.length === 0 ? (
        <p className="flex justify-center items-center text-center font-serif text-white font-semibold text-2xl">
          You have not placed any order yet......
        </p>
      ) : (
        <div className='space-y-4 '>
      
        {orderItems.map((item) => (
        <OrderItem key={item.id} item={item} />
      ))}
      
      </div>
      )}
      
    </div>
  );
};

export default Order;
