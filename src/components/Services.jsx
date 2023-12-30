import React from 'react';
import lab11 from '../assets/lab11.png'
import lab2 from '../assets/lab2.jpg'
import lab3 from '../assets/lab3.avif'
import lab4 from '../assets/lab4.png'
import lab51 from '../assets/lab51.png'


const Services = () => {
    return (
      <>
        <div className="w-full py-[6rem]  bg-white  mx-auto">
          <div className="w-full py-20  bg-black text-white px-6 mb-20">
            <div className="lg:col-span-2 my-4 ">
              <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center"> 
                {" "}
                <span className="text-[hsl(357,100%,59%)]">INNOVATIVE &nbsp;</span>
                SOLUTIONS FOR YOUR
                <span className="text-[hsl(357,100%,59%)]">&nbsp;  NEEDS</span>
              </h1>
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-[400px] mx-auto my-4" src={lab11} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold "></p>
              <h1 className=" text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Routine
              </h1>
              <p>
              U4RAD, a rapidly growing radiology tech company, provides SLA-based radiology reporting services, delivering high-quality reports across modalities—X-ray, CT, MRI, PET, Mammography, & Dexa. Using AI-enabled collaboration, U4RAD automates the entire process, reducing errors, improving reporting turnaround times, and enhancing overall productivity. The AI-based orchestration and Fast-Reporting feature significantly boost the efficiency of radiologists.
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ">
            <img className="w-[400px] mx-auto my-20 block" src={lab2} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold"></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Subspecialty
              </h1>
              <p>
                U4RAD has a separate team of subspecialist radiologists, who
                have extensive experience and unmatched abilities for providing
                consistent quality reporting. We provide specialist imaging
                reporting services in the following fields:
                <br></br>
                <br></br>
                <ul className="flex flex-wrap">
                  <li
                    className="text-gray-500 mb-2 mr-4"
                    style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        backgroundColor: "#ffe6e6", // Set your desired highlight color here
                        padding: "0.5rem", // Adjust padding for better appearance
                        borderRadius: "0.25rem", // Optional: add rounded corners
                      }}
                  >
                    Neuro
                  </li>
                  <li
                    className="text-gray-500 mb-2 mr-4 "
                    style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        backgroundColor: "#ffe6e6", // Set your desired highlight color here
                        padding: "0.5rem", // Adjust padding for better appearance
                        borderRadius: "0.25rem", // Optional: add rounded corners
                      }}
                  >
                    Cardiac
                  </li>
                  <li
                    className="text-gray-500 mb-2 mr-4"
                    style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        backgroundColor: "#ffe6e6", // Set your desired highlight color here
                        padding: "0.5rem", // Adjust padding for better appearance
                        borderRadius: "0.25rem", // Optional: add rounded corners
                      }}
                  >
                    Musculo-skeletal
                  </li>
                  <li
                    className="text-gray-500 mb-2 mr-4"
                    style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        backgroundColor: "#ffe6e6", // Set your desired highlight color here
                        padding: "0.5rem", // Adjust padding for better appearance
                        borderRadius: "0.25rem", // Optional: add rounded corners
                      }}
                  >
                    Breast
                  </li>
                  <li
                    className="text-gray-500 mb-2 mr-4"
                    style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        backgroundColor: "#ffe6e6", // Set your desired highlight color here
                        padding: "0.5rem", // Adjust padding for better appearance
                        borderRadius: "0.25rem", // Optional: add rounded corners
                      }}
                  >
                    Gastro-intestinal
                  </li>
                  <li
                    className="text-gray-500 mb-2 mr-4"
                    style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        backgroundColor: "#ffe6e6", // Set your desired highlight color here
                        padding: "0.5rem", // Adjust padding for better appearance
                        borderRadius: "0.25rem", // Optional: add rounded corners
                      }}
                  >
                    Abdominal
                  </li>
                  <li
                    className="text-gray-500 mb-2"
                    style={{
                        fontWeight: "bold",
                        textTransform: "uppercase",
                        backgroundColor: "#ffe6e6", // Set your desired highlight color here
                        padding: "0.5rem", // Adjust padding for better appearance
                        borderRadius: "0.25rem", // Optional: add rounded corners
                      }}
                  >
                    Paediatric
                  </li>
                </ul>
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-[400px] mx-auto my-4" src={lab3} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold "></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Day time{" "}
                <span className="text-[rgb(255,70,70)]">Emergency</span>
              </h1>
              <p>
                U4RAD understands that in clinical environments, more so during
                emergencies, not only is quality of reporting essential, but
                time too is of the essence, and the speed at which reports are
                provided is critical to the outcome of patient care.
                <br></br>
                <br></br>
                Our daytime emergency reporting services ensure that both
                consultant and radiologist specialists are constantly available
                at hand, providing high quality, and on-time reports, as per
                specified turnaround times.
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-[400px] mx-auto my-4" src={lab4} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold "></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Out of Hours
                <span className="text-[rgb(255,70,70)]"> Emergency</span>
              </h1>
              <p>
                U4RAD, as part of its services, also provides an out of hours or
                night time emergency reporting service between 8pm and 9am. We
                have a dedicated team for out or hours emergency reporting
                requirements, with direct access to reporting radiologist if the
                need arises.
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-[400px] mx-auto my-4" src={lab51} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold "></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                3D Reconstruction
              </h1>
              <p>
                Besides our subspecialty reporting service, and as part of our
                robust state-of-the-art software platform, we provide superior
                three-dimensional, surface rendered, multi-planar imaging. This
                enables referring physicians/surgeons to optimally plan for
                patient care through the creation and manipulation of 3D image
                models.
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
        </div>
      </>
    );
};

export default Services;
