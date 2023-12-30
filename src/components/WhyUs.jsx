import React from 'react';

const WhyUs = () => {
  return (
    <div className='text-black bg-white '>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>

        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Why <span className='text-[hsl(357,100%,59%)]'>Choose</span> U4RAD?
        </h1>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Card title='24/7 Reporting Services' color='rgba(247,68,77,0.69)' />
          <Card title='SLA Based Turnaround Times' color='gray-500' />
          <Card title='Born on the Cloud - Fast Image Rendering' color='rgba(247,68,77,0.69)' />
          <Card title='AI-Based Orchestrated Workflow with PACS Interface' color='gray-500' />
          <Card title='Highly Experienced Team of Radiologists' color='rgba(247,68,77,0.69)' />
          <Card title='Analyzing Radiology Images with Image Analytics' color='gray-500' />
        </div>

      </div>
    </div>
  );
};

const Card = ({ title, color }) => {
  return (
    <div className={`bg-white p-4 rounded-lg shadow-md border border-${color} my-4 mb-2`}>
      <p className={`text-${color} font-bold`}>{title}</p>
    </div>
  );
};

export default WhyUs;
