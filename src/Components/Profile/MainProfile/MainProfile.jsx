import React from "react";
import { FaGreaterThan } from "react-icons/fa";
import img from "../../../assets/img.png"
import { useNavigate } from "react-router-dom";

const MainProfile = () => {
  const navigate = useNavigate();
  const customer = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 123 456 7890",
    address: "123 Main St, City, Country",
    orders: 10,
    totalSpent: 500,
    rewardsPoints: 200,
  };

  return (
    <div className="m-16">
      <div className=" mx-auto bg-white shadow-lg  rounded-lg overflow-hidden">
        <div className="flex flex-col md:flex-row ">
          <div className="bg-gray-200 m-7 w-32 h-32 flex items-center  rounded-full">
            <img
              src={img}
              alt="Customer Avatar"
              className="w-full h-full rounded-full mx-auto"
            />
          </div>
          <div className=" p-4 m-auto rounded-xl">
            <h2 className="text-xl font-bold mb-2">{customer.name}</h2>
            <p className="text-gray-600">Email: {customer.email}</p>
            <p className="text-gray-600">Phone: {customer.phone}</p>
            <p className="text-gray-600">Address: {customer.address}</p>
            <p className="text-gray-600 mt-4">
              Orders Placed: {customer.orders} | Total Spent: $
              {customer.totalSpent} | Rewards Points: {customer.rewardsPoints}
            </p>
          </div>
        </div>

        <div className="space-y-2">
        <div className="bg-gray-100 py-4 px-4 flex justify-end">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">
            Edit Profile
          </button>
        </div>
        <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-between">
          <span>My Orders</span>
          <FaGreaterThan size={10} />
        </div>
        <div className="bg-gray-200 p-4 rounded-lg flex items-center justify-between" onClick={()=>{navigate('/address')}}>
          <span>My Addresses</span>
          <FaGreaterThan size={10} />
        </div>
        </div>

       
      </div>
    </div>
  );
};

export default MainProfile;
