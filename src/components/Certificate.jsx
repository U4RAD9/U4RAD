import React from 'react';
import nasscom from '../assets/nasscom.png'
import iso from '../assets/iso.png'

const Certificate = () => {
  return (
<div className='w-full py-10 text-black bg-gray-200 px-4 mb-5 flex'>
  <div className="w-1/2 max-w-[200px] mx-auto p-4 text-center mt-5 hover:scale-105 transition-transform">
    <img src={nasscom} alt="NASSCOM Certified" className="w-full rounded-md hover:shadow-md" />
    <p className="text-red-500 text-xl">Member</p>
  </div>
  <div className="w-1/2 max-w-[200px] mx-auto p-4 text-center mt-3 hover:scale-105 transition-transform">
    <img src={iso} alt="ISO Certified" className="w-full rounded-md hover:shadow-md" />
  </div>
</div>



  );
};

export default Certificate;
