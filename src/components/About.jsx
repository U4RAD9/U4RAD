import React from 'react';

import pd from '../assets/pd.jpg';
import vs from '../assets/vs.jpg';

const About = () => {
  return (
    <>
      <div className='w-full py-[6rem] bg-white mx-auto'>
        <div className='w-full py-20 bg-black text-white px-6 mb-20'>
          <div className='lg:col-span-2 my-4'>
            <h1 className=' md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center'>
              Founded in Jan 2020, U4RAD is led by a group of{' '}
              <span className='text-[hsl(357,100%,59%)]'>Enthusiastic Radiologists</span>,{' '}
              <span className='text-[hsl(357,100%,59%)]'>Technology Experts</span> & and{' '}
              <span className='text-[hsl(357,100%,59%)]'>Healthcare Management</span> leaders from
              the field of radiology and radiodiagnosis.
            </h1>
          </div>
        </div>
        <div className='max-w-[1240px] mx-auto flex flex-wrap justify-center gap-8 '>
          <div className='w-full max-w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 mb-20'>
            <img  className='w-40 mx-auto mt-[-3rem] bg-transparent rounded-full' src={pd} alt='PD' />
            <h2 className='text-2xl font-bold text-center py-8'>MR. PARTHA DEY</h2>
            <p className='text-center text-4xl font-bold'>Co-Founder, CEO</p>
            <div className='text-center font-medium'>
              <p className='py-2 mx-8 mt-8'></p>
              <p className='py-2 mx-8'></p>
              <p className='py-2 mx-8'></p>
            </div>
            <button className='bg-[hsl(357,100%,59%)] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>
              <a href='https://www.linkedin.com/in/partha-dey-8519a88/' target="_blank" rel="noopener noreferrer">
                Know More
              </a>
            </button>
          </div>
          <div className='w-full max-w-[300px] shadow-xl bg-gray-100 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 mb-20'>
            <img style={{ height: '205px' }} className='w-40 mx-auto mt-[-3rem] bg-transparent mb-2 rounded-full' src={vs} alt='VS' />
            <h2 className='text-2xl font-bold text-center py-8'>DR. VIVEK SAHI</h2>
            <p className='text-center text-4xl font-bold'>Co-Founder, MD</p>
            <div className='text-center font-medium'>
              <p className='py-2 mx-8 mt-8'></p>
              <p className='py-2 mx-8'></p>
              <p className='py-2 mx-8'></p>
            </div>
            <button className='bg-[hsl(357,100%,59%)] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3'>
              <a href='https://www.linkedin.com/in/drviveksahi/' target="_blank" rel="noopener noreferrer">Know More</a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
