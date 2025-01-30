import React from 'react';

function Para() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6 p-6">
      {/* Paragraph Section */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-2xl font-bold w-full mb-4">Detect Fake Reviews Instantly</h1>
        <p className="text-lg text-gray-800 w-full mb-6 leading-relaxed md:leading-loose bg-gradient-to-r from-indigo-100 via-white to-indigo-100 p-6 rounded-xl shadow-lg border border-indigo-200">
  <span className="text-indigo-600 font-bold text-2xl">🌟 Elevate Your Trust!</span> <br />
  Discover the power of <span className="font-semibold text-gray-900">AI-driven technology</span> to uncover misleading reviews and ensure a seamless shopping journey. 
  <span className="font-semibold text-indigo-600"> Make smarter decisions</span>, avoid fraudulent products, and shop with confidence like never before.
</p>


      </div>
      {/* Image Section with Veil */}
      <div className="flex-1 relative">
        {/* Wrapper for the veil */}
        <div className="relative w-3/4 md:w-1/2 mx-auto">
          <img 
            src="./future.jpg" 
            alt="Art showcase" 
            className="w-full rounded-lg shadow-lg"
          />
          {/* Floating Veil */}
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white text-lg font-bold">Explore and Detect</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Para;
