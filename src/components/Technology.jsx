import React from 'react';
import tech11 from '../assets/tech11.webp'
import tech22 from '../assets/tech22.jpg'
import tech33 from '../assets/tech33.jpg'
import tech44 from '../assets/tech44.jpg'
import tech55 from '../assets/tech55.png'
import tech66 from '../assets/tech66.png'
const Technology = () => {
    return (
      <>
        <div className="w-full py-[6rem]  bg-white  mx-auto mb-8">
          <div className="w-full py-20  bg-black text-white px-6 mb-20">
            <div className="lg:col-span-2 my-4 ">
              <h1 className=" md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center">
                <span className="text-[hsl(357,100%,59%)]">TECH</span>NOLOGY
                & <span className="text-[hsl(357,100%,59%)]">U</span>S
              </h1>
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-[400px] mx-auto my-4" src={tech66} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold "></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Reporting BOT
              </h1>
              <p>
              We at U4RAD have revolutionized the radiology workflow and process using our advanced REPORTING BOT. By eliminating time-consuming dictation and transcriptions, our bot provides seamless options and ensures report generation with the click of a button, allowing radiologists to focus on critical decisions. Simultaneously, it boosts their productivity, ensuring faster turnaround times, minimal reporting errors, and increased accuracy with every click.<br></br>
                <br></br>
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-[400px] mx-auto my-4" src={tech11} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold "></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Augmented Intelligence Platform
              </h1>
              <p>
                U4RAD is among one of the fastest growing radiology tech
                companies that offers an SLA based radiology reporting service
                to clients U4RAD provides and delivers unparalleled high-quality
                radio-image reporting for both general & specialty in all
                modalities–X-ray, CT, MRI, PET, Mammography, & Dexa.<br></br>
                <br></br>
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300 ">
            <img
              className="w-[400px] mx-auto my-20 block"
              src={tech22}
              alt="/"
            />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold"></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                AI based Orchestration
              </h1>
              <p>
                We designed our collaborative platform to help clients, starting
                from image capture to reporting. Our robust orchestration
                process is based on Reinforcement Learning. A feedback-based
                Machine learning technique using which an agent learns to behave
                in an environment by performing the actions and seeing the
                results of actions. A core part of our artificial intelligence
                design to continuous improvement of the end-to-end process.
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-[400px] mx-auto my-4" src={tech33} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold "></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Image Analytics
              </h1>
              <p>
                Image analytics forms part of our U4RAD Radiology Platform,
                using very specific algorithms, combined with the AI technique
                of deep learning, we aim to facilitate radiologists to use their
                knowledge and experience in cases that are complex and more
                challenging, which will improve their productivity, reducing
                reporting errors, and improve clinical outcomes for patients.
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-[400px] mx-auto my-4" src={tech55} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold "></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                Reports & Dashboards
              </h1>
              <p>
                As part of the technology platform, we provide administrators
                with an array of different parameters on which they can measure
                the performance of various services availed. Apart from the
                service level agreements available, the system can also track
                operational, financial, and customer service metrics as required
                by clients.
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>

          <div className="max-w-[1100px] mx-auto grid md:grid-cols-2 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
            <img className="w-[400px] mx-auto my-4 p-4 " src={tech44} alt="/" />
            <div className="flex flex-col justify-center">
              <p className="text-[hsl(357,100%,59%)] font-bold "></p>
              <h1 className="text-[hsl(357,100%,59%)] smd:text-4xl sm:text-3xl text-2xl font-bold py-2">
                eRAAS (eReporting as a service)
              </h1>
              <p>
                eRAAS, is a unique offering provided to our clients. This will
                enable any hospital, radiology diagnostic unit, or radiologist
                to have radiology images reported by us, through special access
                granted to them via our web-based portal. Whether it be a
                complex/challenging case or simply a second opinion, the U4RAD
                radiologist team will report it for them. The platform also
                allows institutions (Hospitals/Diagnostic Centers) and
                radiologists to register and send or report cases online.
              </p>
              {/*<button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Know Us More</button>*/}
            </div>
          </div>
        </div>
      </>
    );
};

export default Technology;
