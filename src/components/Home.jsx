import { FaWhatsapp } from 'react-icons/fa';
import one from '../assets/one.jpg';
import three from '../assets/three.jpg';
import two from '../assets/two.jpg';

const Home = () => {
  return (
    <div className='w-full bg-white py-16 px-4 relative'>
      {/* --- WhatsApp Floating Button --- */}
      <a
        href='https://wa.me/9211726688' // Replace with your actual WhatsApp number
        target='_blank'
        rel='noopener noreferrer'
        className='fixed bottom-6 right-6 z-50 flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300'
      >
        <FaWhatsapp className='text-2xl mr-2' />
        Connect with us
      </a>

      {/* --- Content Sections --- */}
      <div className='max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
        <img className='w-[400px] mx-auto my-4' src={one} alt='/' />
        <div className='flex flex-col justify-center'>
          <h1 className='text-[hsl(357,100%,59%)] md:text-4xl sm:text-3xl text-2xl font-bold py-2'>ABOUT US</h1>
          <p>
            We are a new-age radiology-health tech startup...
          </p>
        </div>
      </div>

      {/* AIM Section */}
      <div className='max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
        <img className='w-[400px] mx-auto my-12' src={two} alt='/' />
        <div className='flex flex-col justify-center'>
          <h1 className='text-[hsl(357,100%,59%)] md:text-4xl sm:text-3xl text-2xl font-bold py-2'>OUR AIM</h1>
          <ul className='list-disc ml-6 text-gray-600'>
            <li className='font-bold uppercase'>Reducing common reporting errors</li>
            <li className='font-bold uppercase'>Enhancing image quality through PACS</li>
            <li className='font-bold uppercase'>Increasing productivity for radiologists</li>
            <li className='font-bold uppercase'>Enhancing patient safety</li>
          </ul>
        </div>
      </div>

      {/* Offerings Section */}
      <div className='max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
        <img className='w-[400px] mx-auto my-12' src={three} alt='/' />
        <div className='flex flex-col justify-center'>
          <h1 className='text-[hsl(357,100%,59%)] md:text-4xl sm:text-3xl text-2xl font-bold py-2'>OUR OFFERINGS</h1>
          <ul className='list-disc ml-6 text-gray-600'>
            <li className='font-bold uppercase'>AI-enabled Radiology Platform</li>
            <li className='font-bold uppercase'>E-reporting as a Service (ERAAS)</li>
            <li className='font-bold uppercase'>Second Opinion as a Service (SOAS)</li>
            <li className='font-bold uppercase'>Radiology Dept. Management Services</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;