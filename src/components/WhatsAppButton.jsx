import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppButton = () => {
  return (
    <a
      href='https://wa.me/9211726688'
      target='_blank'
      rel='noopener noreferrer'
      className='fixed bottom-6 right-6 flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300'
      style={{ zIndex: 999999 }}
    >
      <FaWhatsapp className='text-2xl mr-2' />
      Connect with us
    </a>
  );
};

export default WhatsAppButton;
