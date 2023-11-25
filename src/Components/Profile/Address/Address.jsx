import React, { useState } from 'react';

const Address = () => {
  const [addresses, setAddresses] = useState([]);

  const handleAddAddress = () => {
    setAddresses([...addresses, '']);
  };

  const handleRemoveAddress = (index) => {
    const updatedAddresses = [...addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };

  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index] = value;
    setAddresses(updatedAddresses);
  };

  return (
    <div className="max-w-[95%] rounded-xl mx-auto my-8 p-8 bg-slate-200">
      <h2 className="text-xl font-bold mb-4 border-b-4 border-white pl-4 pb-4 uppercase">My Address</h2>

      {addresses.length > 0 ? (
        <ul className="mb-4">
          {addresses.map((address, index) => (
            <li
              key={index}
              className="flex items-center mb-2 border-b py-2"
            >
              <input
                type="text"
                className="flex-grow mr-2 border rounded p-2"
                value={address}
                onChange={(e) => handleAddressChange(index, e.target.value)}
              />
              <button
                className="text-red-500"
                onClick={() => handleRemoveAddress(index)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4">No addresses added.</p>
      )}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleAddAddress}
      >
        Add Address
      </button>
    </div>
  );
};

export default Address;
