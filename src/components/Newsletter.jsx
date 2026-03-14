import { useState } from 'react';

const Newsletter = () => {
  const [showPolicy, setShowPolicy] = useState(false);

  return (
    <div className='w-full py-16 text-white px-4 mb-10'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        
        {/* Left side heading */}
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            To try our services, get in touch with us
          </h1>
          <p className='text-gray-300'>Sign up to our newsletter and stay up to date.</p>
        </div>

        {/* Right side form and policy */}
        <div className='my-4 w-full'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full gap-4'>

            {/* Aesthetic Floating Input */}
            <div className='relative w-full'>
              <input
                id='email'
                type='email'
                placeholder='Enter your email'
                className='peer h-12 w-full rounded-xl border border-gray-300 bg-white px-4 pt-5 text-sm text-black placeholder-transparent transition-all duration-300 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-300'
              />
              <label
                htmlFor='email'
                className='absolute left-4 top-3 text-sm text-gray-500 transition-all duration-300 
                peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                peer-focus:top-1 peer-focus:text-sm peer-focus:text-red-500 bg-white px-1 rounded'
              >
                Enter your email
              </label>
            </div>

            {/* Button */}
            <button className='bg-[hsl(357,100%,59%)] hover:bg-red-600 text-white transition duration-300 rounded-xl font-medium w-[200px] px-6 py-3 shadow-lg'>
              <a 
                href='https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link' 
                target='_blank' 
                rel='noopener noreferrer'
              >
                Fill Form
              </a>
            </button>
          </div>

          {/* Privacy Policy */}
          <p className='mt-4 text-sm text-gray-300'>
            We care about the protection of your data. Read our{' '}
            <button 
              onClick={() => setShowPolicy(true)}
              className='text-red-400 underline hover:text-red-300 transition duration-300'
            >
              Privacy Policy
            </button>.
          </p>

          {/* Modal */}
          {showPolicy && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white text-black p-6 rounded-xl max-w-lg w-full relative">
                <button
                  onClick={() => setShowPolicy(false)}
                  className="absolute top-2 right-4 text-gray-600 hover:text-red-500 text-xl font-bold"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-red-500">Privacy Policy</h2>
                <div className="max-h-[400px] overflow-y-auto text-sm">
                  {/* You can paste the actual privacy policy content here or dynamically load it */}
                  <p>
                    This is our privacy policy. We are committed to protecting your data. Your
                    information is only used in accordance with applicable laws and for the purpose
                    of improving our services.
                  </p>
                  <p className="mt-2">
                    We do not share your email or personal data with third parties without your
                    consent. For more details, contact our support.
                  </p>
                  {/* Add more as needed */}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Newsletter;