import React from 'react';
import Typed from 'react-typed';

const Hero = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[hsl(357,100%,59%)] font-bold p-2'>
        REVOLUTIONIZED RADIOLOGY IMAGING
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
        Welcome to U4RAD
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
         We provide..
          </p>
          <Typed
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['24/7 reporting', 'eRaaS', 'SOAS']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>We are AI enabled integrated Radiology Platform</p>
        {/*<button className='bg-[hsl(357,100%,59%)] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>KNOW MORE</button>*/}
      </div>
    </div>
  );
};

export default Hero;
