import React from 'react';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-green-500 mx-auto mb-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.293 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 011.414-1.414L9 13.586l8.293-8.293a1 1 0 011.414 1.414l-9 9z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Payment Successful!</h2>
        <p className="text-gray-600 text-center">Thank you for your purchase.</p>
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              // Redirect to home or any other page
              window.location.href = '/';
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
