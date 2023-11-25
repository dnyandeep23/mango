import React from 'react';

const Failure = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-red-500 mx-auto mb-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM5.172 5.172a1 1 0 011.414-1.414L10 8.586l3.414-3.414a1 1 0 011.414 1.414L11.414 10l3.414 3.414a1 1 0 01-1.414 1.414L10 11.414l-3.414 3.414a1 1 0 01-1.414-1.414L8.586 10 5.172 6.586a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Payment Failed</h2>
        <p className="text-gray-600 text-center">Sorry, your payment was not successful.</p>
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => {
              // Redirect to the payment page or any other page
              window.location.href = '/confirmorder';
            }}
          >
            Retry Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Failure;
