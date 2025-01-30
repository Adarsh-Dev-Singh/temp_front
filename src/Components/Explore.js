import React from 'react'
import product1 from '../Assets/product1.jpg'
import product2 from '../Assets/product2.png'
import product3 from '../Assets/product3.jpg'
import product4 from '../Assets/product4.jpg'
import { Link } from 'react-router-dom'

const Explore = () => {

  return (
    
    <div className=" mx-10 mt-10 pt-10 h-[1000px]">
      
      {/* Heading  */}
      <div className="w-[500px] h-10 items-center gap-4 flex">
        
        <div className="w-5 h-10">
          <div className="w-5 h-10 bg-blue-500 rounded" />
        </div>
        <div className="text-blue-500 text-[24px] font-bold font-mono">
        Uncover the Truth Behind Reviews!
        </div>
      </div>
      <div className="text-black text-6xl font-bold font-[Quicksand] mt-4">
      Enter a product or service now to verify reviews!
      </div>

      {/* Cards  */}


        {/* ---------------- */}
      
    </div>
  );
}

export default Explore
