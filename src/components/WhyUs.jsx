import { FaBolt, FaChartLine, FaClock, FaCloud, FaRobot, FaUserMd } from 'react-icons/fa';

const WhyUs = () => {
  return (
    <div className='text-black bg-white'>
      <div className='max-w-[1000px] mt-[-96px] w-full min-h-screen mx-auto text-center flex flex-col justify-center items-center px-4'>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6 mb-8'>
          Why <span className='text-[hsl(357,100%,59%)]'>Choose</span> U4RAD?
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 w-full'>
          <Card title='24/7 Reporting Services' icon={<FaClock />} color='red-500' />
          <Card title='SLA Based Turnaround Times' icon={<FaBolt />} color='gray-600' />
          <Card title='Born on the Cloud - Fast Image Rendering' icon={<FaCloud />} color='red-500' />
          <Card title='AI-Based Orchestrated Workflow with PACS Interface' icon={<FaRobot />} color='gray-600' />
          <Card title='Highly Experienced Team of Radiologists' icon={<FaUserMd />} color='red-500' />
          <Card title='Analyzing Radiology Images with Image Analytics' icon={<FaChartLine />} color='gray-600' />
        </div>
      </div>
    </div>
  );
};

const Card = ({ title, icon, color }) => {
  return (
    <div
      className={`bg-white p-6 rounded-xl border border-${color} text-${color} font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out cursor-pointer flex items-center space-x-4`}
    >
      <div className="text-2xl">{icon}</div>
      <p className="text-left">{title}</p>
    </div>
  );
};

export default WhyUs;