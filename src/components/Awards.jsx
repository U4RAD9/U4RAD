// Awards.jsx
import React from 'react';
import './Awards.css';  // Import the CSS file

import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';


const Award = ({ src, title }) => (
  <div className="relative group overflow-hidden rounded-lg shadow-md">
    <img className="w-full transition-transform transform scale-100 group-hover:scale-110" src={src} alt={title} />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-red-100 bg-opacity-20">
      <p className="text-white text-center">{title}</p>
    </div>
  </div>
);


  

const Awards = () => {
  const awards = [
    { src: image2, title: ''},
    { src: image3, title: '' },
    { src: image6, title: '' },
    { src: image5, title: '' },
    { src: image4, title: '' },
    { src: image1, title: '' },
  ];

  return (
    <>
      <div className="w-full py-[6rem] bg-white mx-auto">
        <div className="w-full py-20 bg-black text-white px-6 mb-20">
          <div className="lg:col-span-2 my-4">
            <h1 className=" md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center">
              <span className="text-[hsl(357,100%,59%)]">RECOGNITION &nbsp;</span>&
              <span className="text-[hsl(357,100%,59%)]">&nbsp;&nbsp;</span>CERTIFICATION
            </h1>
          </div>
        </div>

        <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full shadow-xl flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
          {awards.map((award, index) => (
            <Award key={index} src={award.src} title={award.title} />
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Awards;
