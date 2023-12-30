import React from 'react';

const Newsletter = () => {
  return (
    <div className='w-full py-16 text-white px-4 mb-10'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        
        <div className='lg:col-span-2 my-4'>
          
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            To try our services, get in touch with us
          </h1>
          <p>Sign up to our newsletter and stay up to date.</p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className='p-3 flex w-full rounded-md text-black'
              type='email'
              placeholder='Enter Email'
            />
            <button className='bg-[hsl(357,100%,59%)] text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3'>
  <a href='https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link' target="_blank" rel="noopener noreferrer">
    Fill form
  </a>
</button>

          </div>
          <p>
            We care about the protection of your data. Read our{' '}
            <span className='text-[hsl(357,100%,59%)]'>Privacy Policy.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
