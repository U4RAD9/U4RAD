// import { useState } from 'react';
// import { FaLinkedin } from 'react-icons/fa';
// import pd from '../assets/pd.jpg';
// import vs from '../assets/vs.jpg';

// const About = () => {
//   const [showParthaBio, setShowParthaBio] = useState(false);
//   const [showVivekBio, setShowVivekBio] = useState(false);

//   return (
//     <>
//       <div className='w-full py-[6rem] bg-white mx-auto'>
//         <div className='w-full py-20 bg-black text-white px-6 mb-20'>
//           <div className='lg:col-span-2 my-4'>
//             <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center'>
//               Founded in Jan 2020, U4RAD is led by a group of{' '}
//               <span className='text-[hsl(357,100%,59%)]'>Enthusiastic Radiologists</span>,{' '}
//               <span className='text-[hsl(357,100%,59%)]'>Technology Experts</span>, and{' '}
//               <span className='text-[hsl(357,100%,59%)]'>Healthcare Management</span> leaders from
//               the field of radiology and radiodiagnosis.
//             </h1>
//           </div>
//         </div>

//         <div className='max-w-[1240px] mx-auto'>

//           <div className='flex flex-wrap justify-center gap-8'>
//             {/* Mr. Partha Dey */}
//             <div className='w-full max-w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 mb-20'>
//               <img className='w-40 mx-auto mt-[-3rem] bg-transparent rounded-full' src={pd} alt='PD' />
//               <h2 className='text-2xl font-bold text-center py-8'>MR. PARTHA DEY</h2>
//               <p className='text-center text-4xl font-bold'>Co-Founder, CEO</p>
//               <div className='text-center font-medium text-justify px-4'>
//                 {showParthaBio && (
//                   <>
//                     <p className='py-4 text-gray-700'>
//                       Mr. Partha Dey is an accomplished entrepreneur and technologist with over a decade of experience in AI-driven healthcare solutions. As CEO of U4RAD, he focuses on integrating automation in radiology workflows to enhance speed, accuracy, and scalability across healthcare networks.
//                     </p>
//                     <div className="text-center mt-2">
//                       <a
//                         href="https://linkedin.com/in/partha-dey-8519a88"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center text-blue-700 hover:underline"
//                       >
//                         <FaLinkedin className="mr-2" /> View LinkedIn
//                       </a>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <button
//                 onClick={() => setShowParthaBio(!showParthaBio)}
//                 className='bg-[hsl(357,100%,59%)] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'
//               >
//                 {showParthaBio ? 'Hide Info' : 'Know More'}
//               </button>
//             </div>

//             {/* Dr. Vivek Sahi */}
//             <div className='w-full max-w-[300px] shadow-xl bg-gray-100 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 mb-20'>
//               <img style={{ height: '205px' }} className='w-40 mx-auto mt-[-3rem] bg-transparent mb-2 rounded-full' src={vs} alt='VS' />
//               <h2 className='text-2xl font-bold text-center py-8'>DR. VIVEK SAHI</h2>
//               <p className='text-center text-4xl font-bold'>Co-Founder, MD</p>
//               <div className='text-center font-medium text-justify px-4'>
//                 {showVivekBio && (
//                   <>
//                     <p className='py-4 text-gray-700'>
//                       Dr. Vivek Sahi brings over 15 years of experience in radiodiagnosis and telemedicine. As the medical director and co-founder, he plays a critical role in ensuring clinical excellence while guiding the platform’s development to align with real-world radiology practices.
//                     </p>
//                     <div className="text-center mt-2">
//                       <a
//                         href="https:linkedin.com/in/drviveksahi"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="inline-flex items-center text-blue-700 hover:underline"
//                       >
//                         <FaLinkedin className="mr-2" /> View LinkedIn
//                       </a>
//                     </div>
//                   </>
//                 )}
//               </div>
//               <button
//                 onClick={() => setShowVivekBio(!showVivekBio)}
//                 className='bg-[hsl(357,100%,59%)] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'
//               >
//                 {showVivekBio ? 'Hide Info' : 'Know More'}
//               </button>
//             </div>
//           </div>
//           {/* Core Team Section */}
//         <div className='max-w-[1240px] mx-auto px-4 py-12'>
//           <h2 className='text-4xl font-bold text-center mb-8'>Core Team</h2>
//           <p className='text-xl text-gray-600 text-center mb-12'>
//             The core team at U4RAD Technologies brings a unique blend of expertise and experience,
//             driving innovation in healthcare. With a strong background in healthcare operations management,
//             product development, technician training, and pre-sales functions, the team ensures smooth and
//             efficient execution across all verticals.
//           </p>
//           <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
//             {/* Team Card 1 */}
//             <div className='bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 duration-300'>
//               <img
//                 src="https://xraidigital.com/Content/images/team/Ruchi_mam.jpg"
//                 alt="Dr Ruchi Jangra"
//                 className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
//                 onError={(e) => {
//                   console.log("Image failed");
//                 }}
//               />
//               <h4 className='text-2xl font-bold'>Dr Ruchi Jangra</h4>
//               <p className='text-gray-600'>Manager - Business Operations and Founder’s office representative</p>
//             </div>
//             {/* Team Card 2 */}
//             <div className='bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 duration-300'>
//               <img
//                 src='https://xraidigital.com/Content/images/team/ManagerPreSales.png'
//                 alt='Pooja Singh'
//                 className='w-32 h-32 mx-auto rounded-full mb-4'
//               />
//               <h4 className='text-2xl font-bold'>Pooja Singh</h4>
//               <p className='text-gray-600'>Manager - Product and Pre-Sales</p>
//             </div>
//             {/* Team Card 3 */}
//             <div className='bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 duration-300'>
//               <img
//                 src='https://xraidigital.com/Content/images/team/Captain.png'
//                 alt='Aradhana Dutt'
//                 className='w-32 h-32 mx-auto rounded-full mb-4'
//               />
//               <h4 className='text-2xl font-bold'>Aradhana Dutt</h4>
//               <p className='text-gray-600'>Captain - New Initiatives</p>
//             </div>
//             {/* Team Card 4 */}
//             <div className='bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 duration-300'>
//               <img
//                 src='https://xraidigital.com/Content/images/team/BD.png'
//                 alt='Mr Dipanjan Paul'
//                 className='w-32 h-32 mx-auto rounded-full mb-4'
//               />
//               <h4 className='text-2xl font-bold'>Mr Dipanjan Paul</h4>
//               <p className='text-gray-600'>Strategy & BD</p>
//             </div>
//           </div>
//         </div>
//        </div>
//       </div>
//     </>
//   );
// };

// export default About;



import { useState } from 'react';
import { FaLinkedin } from 'react-icons/fa';

const About = () => {
  const [showParthaBio, setShowParthaBio] = useState(false);
  const [showVivekBio, setShowVivekBio] = useState(false);

  return (
    <>
      <div className='w-full py-[6rem] bg-white mx-auto'>
        <div className='w-full py-20 bg-black text-white px-6 mb-20'>
          <div className='lg:col-span-2 my-4'>
            <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center'>
              Founded in Jan 2020, U4RAD is led by a group of{' '}
              <span className='text-[hsl(357,100%,59%)]'>Enthusiastic Radiologists</span>,{' '}
              <span className='text-[hsl(357,100%,59%)]'>Technology Experts</span>, and{' '}
              <span className='text-[hsl(357,100%,59%)]'>Healthcare Management</span> leaders from
              the field of radiology and radiodiagnosis.
            </h1>
          </div>
        </div>

        <div className='max-w-[1240px] mx-auto'>

          <div className='flex flex-wrap justify-center gap-8'>
            {/* Mr. Partha Dey */}
            <div className='w-full max-w-[300px] shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 mb-20'>
              <img className='w-40 mx-auto mt-[-3rem] bg-transparent rounded-full' src='/images/parthadey.jpg' alt='PD' />
              <h2 className='text-2xl font-bold text-center py-8'>MR. PARTHA DEY</h2>
              <p className='text-center text-4xl font-bold'>Co-Founder, CEO</p>
              <div className='text-center font-medium text-justify px-4'>
                {showParthaBio && (
                  <>
                    <p className='py-4 text-gray-700'>
                      Mr. Partha Dey is an accomplished entrepreneur and technologist with over a decade of experience in AI-driven healthcare solutions. As CEO of U4RAD, he focuses on integrating automation in radiology workflows to enhance speed, accuracy, and scalability across healthcare networks.
                    </p>
                    <div className="text-center mt-2">
                      <a
                        href="https://linkedin.com/in/partha-dey-8519a88"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-700 hover:underline"
                      >
                        <FaLinkedin className="mr-2" /> View LinkedIn
                      </a>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowParthaBio(!showParthaBio)}
                className='bg-[hsl(357,100%,59%)] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'
              >
                {showParthaBio ? 'Hide Info' : 'Know More'}
              </button>
            </div>

            {/* Dr. Vivek Sahi */}
            <div className='w-full max-w-[300px] shadow-xl bg-gray-100 flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 mb-20'>
              <img style={{ height: '205px' }} className='w-40 mx-auto mt-[-3rem] bg-transparent mb-2 rounded-full' src='/images/viveksahi.jpg' alt='VS' />
              <h2 className='text-2xl font-bold text-center py-8'>DR. VIVEK SAHI</h2>
              <p className='text-center text-4xl font-bold'>Co-Founder, MD</p>
              <div className='text-center font-medium text-justify px-4'>
                {showVivekBio && (
                  <>
                    <p className='py-4 text-gray-700'>
                      Dr. Vivek Sahi brings over 15 years of experience in radiodiagnosis and telemedicine. As the medical director and co-founder, he plays a critical role in ensuring clinical excellence while guiding the platform’s development to align with real-world radiology practices.
                    </p>
                    <div className="text-center mt-2">
                      <a
                        href="https:linkedin.com/in/drviveksahi"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-700 hover:underline"
                      >
                        <FaLinkedin className="mr-2" /> View LinkedIn
                      </a>
                    </div>
                  </>
                )}
              </div>
              <button
                onClick={() => setShowVivekBio(!showVivekBio)}
                className='bg-[hsl(357,100%,59%)] w-[200px] rounded-md font-medium my-6 mx-auto px-6 py-3 text-white'
              >
                {showVivekBio ? 'Hide Info' : 'Know More'}
              </button>
            </div>
          </div>
          {/* Core Team Section */}
        <div className='max-w-[1240px] mx-auto px-4 py-12'>
          <h2 className='text-4xl font-bold text-center mb-8'>Core Team</h2>
          <p className='text-xl text-gray-600 text-center mb-12'>
            The core team at U4RAD Technologies brings a unique blend of expertise and experience,
            driving innovation in healthcare. With a strong background in healthcare operations management,
            product development, technician training, and pre-sales functions, the team ensures smooth and
            efficient execution across all verticals.
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Team Card 1 */}
            <div className='bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 duration-300'>
              <img
                src='/images/pooja.png'
                alt='Pooja Singh'
                className='w-32 h-32 mx-auto rounded-full mb-4'
              />
              <h4 className='text-2xl font-bold'>Pooja Singh</h4>
              <p className='text-gray-600'>Manager - Product and Pre-Sales</p>
            </div>
            {/* Team Card 2 */}
            <div className='bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 duration-300'>
              <img
                src='/images/aradhna.png'
                alt='Aradhana Dutt'
                className='w-32 h-32 mx-auto rounded-full mb-4'
              />
              <h4 className='text-2xl font-bold'>Aradhana Dutt</h4>
              <p className='text-gray-600'>Captain - New Initiatives</p>
            </div>
            {/* Team Card 3 */}
            <div className='bg-white shadow-lg rounded-lg p-6 text-center hover:scale-105 duration-300'>
              <img
                src='/images/dipanjan.png'
                alt='Mr Dipanjan Paul'
                className='w-32 h-32 mx-auto rounded-full mb-4'
              />
              <h4 className='text-2xl font-bold'>Mr Dipanjan Paul</h4>
              <p className='text-gray-600'>Strategy & BD</p>
            </div>
          </div>
        </div>
       </div>
      </div>
    </>
  );
};

export default About;