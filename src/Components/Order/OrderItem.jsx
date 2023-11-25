import React from "react";
import img from "../../assets/img.png";
import { GoDotFill } from "react-icons/go";

const OrderItem = ({ item }) => {
  return (
    <div className="w-[95%] flex flex-col-reversed bg-slate-100 m-auto p-2 rounded-xl">
      <div className="w-[90%] m-auto flex flex-col p-2  md:justify-between space-y-4 md:p-0 md:flex-row">
        <div className="w-16 h-16 flex items-center">
          <img src={img} className="w-full" alt="" />
        </div>
        <div className="h-16 flex flex-col justify-center">
          <span className="font-medium ">{item.name}</span>
          <span className="font-normal ">Quantity : {item.quantity}</span>
          <span className="font-normal ">{item.desc}</span>
        </div>
        <div className="h-16 flex flex-col justify-center ">
          <span className="font-bold text-base">{item.price}</span>
        </div>
        <div className="h-16 flex items-center">
          <GoDotFill className="text-green-500" />
          <span>{item.status}</span>
        </div>
      </div>

      {/* <div>{item.name}</div>
      <div>{item.price}</div>
      <div>{item.quantity}</div>
      <div>{item.imageUrl}</div> */}
    </div>
  );
};

export default OrderItem;
