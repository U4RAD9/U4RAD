import React from 'react';
import one from '../assets/one.jpg';
import two from '../assets/two.jpg';
import three from '../assets/three.jpg';

const Home = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
        <img className='w-[400px] mx-auto my-4' src={one} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[hsl(357,100%,59%)] font-bold '></p>
          <h1 className='text-[hsl(357,100%,59%)] md:text-4xl sm:text-3xl text-2xl font-bold py-2'>ABOUT US</h1>
          <p>
            We are new age radiology- health tech start up whose augmented intelligence enabled, image tech e-reporting platform, that’s been conceived on the cloud has revolutionized the way radiology imagining and case reporting is being conducted, improving radiologist productivity, and taking image reporting into the future–Today!
          </p>
          {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
        </div>
      </div>
      <div className='max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'> 
      <img className='w-[400px] mx-auto my-12' src={two} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[hsl(357,100%,59%)] font-bold '></p>
          <h1 className='text-[hsl(357,100%,59%)] md:text-4xl sm:text-3xl text-2xl font-bold py-2'>OUR AIM</h1>
          <p>Our goal is to revolutionize and enhance the entire radiology process by thoughtfully embracing technology. We aim to support radiologists rather than replacing them with technology, with the overarching objectives of :</p>
          <p><br></br>
          <ul>
          <li className=' text-gray-500' style={{ fontWeight: 'bold', textTransform: 'uppercase'}}> Reducing common reporting errors</li><br></br>
          <li className=' text-gray-500' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}> Enhancing image quality through our integrated PACS</li><br></br>
          <li className=' text-gray-500' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}> Increasing efficiency and productivity for radiologists</li><br></br>
          <li className=' text-gray-500' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}> Enhancing patient safety and optimizing treatment plans</li><br></br>
          </ul>
          </p>
          {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know How?</button>*/}
        </div>
      </div>
      <div className='max-w-[1100px] mx-auto grid md:grid-cols-2  w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'> 
      <img className='w-[400px] mx-auto my-12' src={three} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[hsl(357,100%,59%)] font-bold '></p>
          <h1 className='text-[hsl(357,100%,59%)] md:text-4xl sm:text-3xl text-2xl font-bold py-2'>OUR OFFERINGS</h1>
          <p>
          Our mission is to revolutionize and enhance the entire radiology process by strategically incorporating technology. We aim to support radiologists rather than substituting them with technology, striving to accomplish:
          <ul><br></br>
          <li className=' text-gray-500' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>AI-ENABLED RADIOLOGY PLATFORM </li><br></br>
          <li className=' text-gray-500' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>E-REPORTING AS A SERVICE (ERAAS)</li><br></br>
          <li className=' text-gray-500' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>SECOND OPINION AS A SERVICE (SOAS)</li><br></br>
          <li className=' text-gray-500' style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>RADIOLOGY DEPARTMENT MANAGEMENT SERVICES
</li>
          </ul>
          </p>
          {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Strength</button>*/}
        </div>
      </div>
    </div>
    
  );
};

export default Home;
