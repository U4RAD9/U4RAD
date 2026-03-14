import './Awards.css';

import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';
import image4 from '../assets/image4.png';
import image5 from '../assets/image5.png';
import image6 from '../assets/image6.png';

const Award = ({ src, title }) => (
  <div className="relative group overflow-hidden rounded-lg shadow-md">
    <img
      className="w-full transition-transform transform scale-100 group-hover:scale-110"
      src={src}
      alt={title}
    />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black bg-opacity-60">
      <p className="text-white text-center text-sm px-4">{title}</p>
    </div>
  </div>
);

const Awards = () => {
  const awards = [
    {
      src: image2,
      title: 'ISO 9001:2015 Certified – Quality Management & Service Excellence',
    },
    {
      src: image3,
      title: 'Featured in Digital Health Summit for Innovation in Radiology',
    },
    {
      src: image6,
      title: 'Certified as a Healthcare Tech Innovator by Industry Bodies',
    },
    {
      src: image5,
      title: 'Recognized for Fast Image Rendering via Cloud-first Architecture',
    },
    {
      src: image4,
      title: 'Member of NASSCOM – India’s Leading Tech Consortium',
    },
    {
      src: image1,
      title: 'Trusted by Multiple Hospitals and Diagnostic Chains Across India',
    },
  ];

  return (
    <div className="w-full py-[6rem] bg-white mx-auto">
      <div className="w-full py-20 bg-black text-white px-6 mb-20">
        <div className="lg:col-span-2 my-4">
          <h1 className="md:text-4xl sm:text-3xl text-2xl font-bold py-2 text-center">
            <span className="text-[hsl(357,100%,59%)]">RECOGNITION &nbsp;</span>&
            <span className="text-[hsl(357,100%,59%)]">&nbsp;&nbsp;</span>CERTIFICATION
          </h1>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full shadow-xl p-4 rounded-lg">
        {awards.map((award, index) => (
          <Award key={index} src={award.src} title={award.title} />
        ))}
      </div>
    </div>
  );
};

export default Awards;