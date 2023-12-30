import React  from 'react';
import { FaFacebookSquare, FaTwitterSquare, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';
import Logo from '../assets/Logo.png'
// import { useNavigate } from "react-router-dom";

const Footer = () => {
  // const navigate = useNavigate();

  
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link";

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const phoneNumber = '+91-9811310922';
  const emailAddress = 'contact@u4rad.com';

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <div className="max-w-[1240px] mx-auto py-16 px-4 lg:grid lg:grid-cols-3 gap-8 text-gray-300">
      <div className="mb-8 lg:mb-0 lg:col-span-1">
        <h1 className="text-3xl font-bold text-[hsl(357,100%,59%)]">
          {/* U<span className="text-[red]">4</span>RAD */}
        </h1>
        <img
        className="w-36 md:w-48  my-4 cursor-pointer bg-[#eeeeeecb]  rounded-lg"
        src={Logo}
        alt="/"
        // onClick={() => navigate("/")}
        onClick={() => scrollToTop()}
      />
        <p className="py-4 text-sm">
          We are a new age radiology-health tech startup revolutionizing the way
          radiology imaging and case reporting are conducted today!
        </p>
        <div className="flex space-x-4 mt-4 ">
          <a href="https://www.facebook.com/yourpage">
            <span className="p-2 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"><FaFacebookSquare size={30} /></span>
            
          </a>
          <a href="https://www.twitter.com/yourpage">
            <span className="p-2 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"><FaTwitterSquare size={30} /></span>
          </a>
          <a href="https://www.linkedin.com/company/u4rad-technologies-llp/posts/?feedView=all">
            <span className="p-2 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"><FaLinkedin size={30} /></span>
          </a>
        </div>
      </div>

      <div className="lg:col-span-2 grid grid-cols-1 gap-8 lg:grid-cols-3 -mt-10">
        <div className="lg:col-span-1 mb-2 font-medium text-[hsl(357,100%,59%)] mt-7 text-center">
          Find Us
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1664389048588!2d77.06294737382665!3d28.414234293963393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23463d521c01%3A0x9d86bf5abbecf45f!2sXRAi%20Digital!5e0!3m2!1sen!2sin!4v1703012283560!5m2!1sen!2sin"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Maps Location"
          ></iframe>
        </div>

        <div className="mx-auto mt-5 text-bottom ">
          <ul>
            <li className="p-2 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer mt-5">
              <a href="/" onClick={scrollToTop}>
                Home
              </a>
            </li>
            <li className="p-2 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer">
              <a href="/Contact" onClick={scrollToTop}>
                Contact
              </a>
            </li>
            <li className="p-2 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer">
              <a href="/Mission" onClick={scrollToTop}>
                Mission
              </a>
            </li>
            <li className="p-2 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer">
              <a href={googleFormUrl} target="_blank" rel="noopener noreferrer">
                Career
              </a>
            </li>
          </ul>
        </div>
        
        <div className="mx-auto mt-5">
          <h6 className="font-medium text-gray-500 text-center mt-10">Contact Us</h6>
          <ul className="list-disc list-inside">
            <li
              className="py-2 text-sm list-none cursor-pointer flex items-center "
              onClick={handlePhoneClick}
            >
              <FaPhone size={15} className="mr-2" />
              <span className="font-medium p-2 hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer">
                {phoneNumber}
              </span>
            </li>

            <li
              className="py-2 text-sm list-none cursor-pointer flex items-center"
              onClick={handleEmailClick}
            >
              <FaEnvelope size={15} className="mr-2" />
              <span className="font-medium p-2 hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer">
                {emailAddress}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
