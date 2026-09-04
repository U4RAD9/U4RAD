// import {
//   FaEnvelope,
//   FaFacebookSquare,
//   FaLinkedin,
//   FaPhone,
//   FaTwitterSquare,
//   FaWhatsappSquare,
// } from 'react-icons/fa';
// import Logo from '../assets/Logo.png';

// const Footer = () => {
//   const googleFormUrl =
//     'https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link';

//   const phoneNumber = '+91-9811310922';
//   const emailAddress = 'contact@u4rad.com';

//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   const handlePhoneClick = () => {
//     window.location.href = `tel:${phoneNumber}`;
//   };

//   const handleEmailClick = () => {
//     window.location.href = `mailto:${emailAddress}`;
//   };

//   return (
//     <footer className="bg-white/80 backdrop-blur-md shadow-glass text-black px-6 py-16">
//       <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-12">
//         {/* Left Section */}
//         <div>
//           <img
//             src={Logo}
//             alt="U4RAD Logo"
//             className="w-36 md:w-48 mb-4 cursor-pointer rounded-lg bg-[#eeeeeecb]"
//             onClick={scrollToTop}
//           />
//           <p className="text-sm mb-2">
//             We are a new age radiology-health tech startup revolutionizing the
//             way radiology imaging and case reporting are conducted today!
//           </p>

//           <div className="text-sm text-gray-700 space-y-1 mt-2">
//   <div><strong>A Unit of:</strong> U4RAD Technologies Pvt Ltd</div>
//   <div><strong>CIN Number:</strong> U86100HR2024PTC120732</div>

//   <div>
//     Our Point Of Care Testing Brand:
//     <strong>
//       <a
//         href="https://xraidigital.com"
//         className="text-gray-600 hover:text-primary"
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ textDecoration: "none", color: "inherit" }}
//       >
//         {" "}XRAi Digital Diagnostics
//       </a>
//     </strong>
//   </div>

//   {/* Gurgaon Office */}
//   <div className="mt-3 font-semibold">Corporate Office (Gurgaon):</div>
//   <div>C 406, Nirvana Courtyard</div>
//   <div>Sector 50, Gurgaon</div>
//   <div>Haryana, India – 122018</div>
//   <div><strong>Landline:</strong> 0124 425 4012</div>

//   {/* Kolkata Office */}
//   <div className="mt-3 font-semibold">Kolkata Office:</div>
//   <div>Room No W109</div>
//   <div>IIM Calcutta Innovation Park</div>
//   <div>IIM Calcutta, Diamond Harbour Road</div>
//   <div>P.O. Joka, Kolkata – 700104</div>
// </div>


//           {/* Social Icons (All in One Row) */}
//           <div className="flex space-x-4 mt-4">
//             <a
//               href="https://www.facebook.com/yourpage"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-primary"
//             >
//               <FaFacebookSquare size={30} />
//             </a>
//             <a
//               href="https://www.twitter.com/yourpage"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-primary"
//             >
//               <FaTwitterSquare size={30} />
//             </a>
//             <a
//               href="https://www.linkedin.com/company/u4rad-technologies-llp/posts/?feedView=all"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-primary"
//             >
//               <FaLinkedin size={30} />
//             </a>
//             <a
//               href="https://wa.me/9211726688"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="text-gray-600 hover:text-primary"
//             >
//               <FaWhatsappSquare size={30} />
//             </a>
//           </div>
//         </div>

//         {/* Middle Section */}
//         <div>
//           <h3 className="text-lg font-semibold text-primary mb-4">Explore</h3>
//           <ul className="space-y-3">
//             <li>
//               <a
//                 href="/"
//                 onClick={scrollToTop}
//                 className="hover:text-primary transition font-medium"
//               >
//                 Home
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/Contact"
//                 onClick={scrollToTop}
//                 className="hover:text-primary transition font-medium"
//               >
//                 Contact
//               </a>
//             </li>
//             <li>
//               <a
//                 href="/Mission"
//                 onClick={scrollToTop}
//                 className="hover:text-primary transition font-medium"
//               >
//                 Mission
//               </a>
//             </li>
//             <li>
//               <a
//                 href={googleFormUrl}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="hover:text-primary transition font-medium"
//               >
//                 Career
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Right Section */}
//         <div>
//           <h3 className="text-lg font-semibold text-primary mb-4">Contact</h3>
//           <ul className="space-y-4">
//             <li
//               onClick={handlePhoneClick}
//               className="flex items-center cursor-pointer text-gray-700 hover:text-primary"
//             >
//               <FaPhone className="mr-2" />
//               <span className="font-medium">{phoneNumber}</span>
//             </li>
//             <li
//               onClick={handleEmailClick}
//               className="flex items-center cursor-pointer text-gray-700 hover:text-primary"
//             >
//               <FaEnvelope className="mr-2" />
//               <span className="font-medium">{emailAddress}</span>
//             </li>
//             {/* Grievance Section */}
//             <li className="text-sm text-gray-700 border-t pt-3">
//               <div className="font-semibold text-primary mb-1">
//                 Grievance Officer
//               </div>

//               <div className="font-medium">
//                 Dr Ruchi Jangra
//               </div>

//               <div className="text-gray-600">
//                 (Manager: Operations)
//               </div>

//               <div
//                 onClick={() =>
//                   (window.location.href = 'mailto:drruchi@u4rad.com')
//                 }
//                 className="flex items-center cursor-pointer hover:text-primary mt-2"
//               >
//                 <FaEnvelope className="mr-2" />
//                 <span>drruchi@u4rad.com</span>
//               </div>

//               <div
//                 onClick={() =>
//                   (window.location.href = 'tel:+911244254012')
//                 }
//                 className="flex items-center cursor-pointer hover:text-primary mt-1"
//               >
//                 <FaPhone className="mr-2" />
//                 <span>+91 124 425 4012</span>
//               </div>
//             </li>
//           </ul>
//         </div>
//       </div>

//       {/* Google Maps */}
//       <div className="mt-16">
//         <h3 className="text-lg font-semibold text-primary mb-4 text-center">Find Us</h3>
//         <div className="w-full h-[250px]">
//           <iframe
//             src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1664389048588!2d77.06294737382665!3d28.414234293963393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23463d521c01%3A0x9d86bf5abbecf45f!2sXRAi%20Digital!5e0!3m2!1sen!2sin!4v1703012283560!5m2!1sen!2sin"
//             width="100%"
//             height="100%"
//             allowFullScreen
//             loading="lazy"
//             title="U4RAD Office Location"
//             className="rounded-xl border-none shadow-md"
//           ></iframe>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from 'react';
import {
  FaEnvelope,
  FaFacebookSquare,
  FaLinkedin,
  FaPhone,
  FaTwitterSquare,
  FaWhatsappSquare,
} from 'react-icons/fa';
import Logo from '../assets/Logo.png';
import PrivacyPolicy from './PrivacyPolicy'; // ✅ IMPORT ADDED

const Footer = () => {
  const [showPrivacy, setShowPrivacy] = useState(false); // ✅ STATE

  const googleFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link';

  const phoneNumber = '+91-9811310922';
  const emailAddress = 'contact@u4rad.com';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };

  return (
    <footer className="bg-white/80 backdrop-blur-md shadow-glass text-black px-6 py-16">
      <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3 gap-12">

        {/* LEFT */}
        <div>
          <img
            src={Logo}
            alt="logo"
            className="w-36 md:w-48 mb-4 cursor-pointer rounded-lg bg-[#eeeeeecb]"
            onClick={scrollToTop}
          />

          <p className="text-sm mb-2">
            We are a new age radiology-health tech startup revolutionizing the
            way radiology imaging and case reporting are conducted today!
          </p>

          <div className="text-sm text-gray-700 space-y-1 mt-2">
            <div><strong>A Unit of:</strong> U4RAD Technologies Pvt Ltd</div>
            <div><strong>CIN Number:</strong> U86100HR2024PTC120732</div>

            <div>
              Our Point Of Care Testing Brand:
              <strong>
                <a
                  href="https://xraidigital.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}XRAi digital Diagnostics
                </a>
              </strong>
            </div>

            <div className="mt-3 font-semibold">Corporate Office (Gurgaon):</div>
            <div>C 406, Nirvana Courtyard</div>
            <div>Sector 50, Gurgaon</div>
            <div>Haryana, India – 122018</div>
            <div><strong>Landline:</strong> 0124 425 4012</div>

            <div className="mt-3 font-semibold">Kolkata Office:</div>
            <div>Room No W109</div>
            <div>IIM Calcutta Innovation Park</div>
            <div>IIM Calcutta, Diamond Harbour Road</div>
            <div>P.O. Joka, Kolkata – 700104</div>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex space-x-4 mt-4 text-gray-600">
            <a href="https://www.facebook.com/yourpage" target="_blank" rel="noopener noreferrer">
              <FaFacebookSquare size={28} />
            </a>
            <a href="https://www.twitter.com/yourpage" target="_blank" rel="noopener noreferrer">
              <FaTwitterSquare size={28} />
            </a>
            <a href="https://www.linkedin.com/company/u4rad-technologies-llp/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
              <FaLinkedin size={28} />
            </a>
            <a href="https://wa.me/9211726688" target="_blank" rel="noopener noreferrer">
              <FaWhatsappSquare size={28} />
            </a>
          </div>
        </div>

        {/* MIDDLE */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Explore</h3>
          <ul className="space-y-3">
            <li><a href="/" onClick={scrollToTop}>Home</a></li>
            <li><a href="/Contact" onClick={scrollToTop}>Contact</a></li>
            <li><a href="/Mission" onClick={scrollToTop}>Mission</a></li>
            <li><a href={googleFormUrl} target="_blank" rel="noopener noreferrer">Career</a></li>
          </ul>
        </div>

        {/* RIGHT */}
        <div>
          <h3 className="text-lg font-semibold text-primary mb-4">Contact</h3>
          <ul className="space-y-4">

            <li onClick={handlePhoneClick} className="flex cursor-pointer">
              <FaPhone className="mr-2" /> {phoneNumber}
            </li>

            <li onClick={handleEmailClick} className="flex cursor-pointer">
              <FaEnvelope className="mr-2" /> {emailAddress}
            </li>

            <li className="text-sm border-t pt-3">
              <div className="font-semibold text-primary">Grievance Officer</div>
              <div>Mr. Partha Dey</div>
              <div>(CEO, Founder)</div>

              <div
                onClick={() => (window.location.href = 'mailto:parthadey@u4rad.com')}
                className="flex cursor-pointer mt-2"
              >
                <FaEnvelope className="mr-2" />
                parthadey@u4rad.com
              </div>

              <div
                onClick={() => (window.location.href = 'tel:+911244254012')}
                className="flex cursor-pointer"
              >
                <FaPhone className="mr-2" />
                +91 124 425 4012
              </div>

              {/* ✅ PRIVACY BUTTON */}
              <div
                onClick={() => setShowPrivacy(true)}
                className="mt-3 font-semibold cursor-pointer"
              >
                Privacy Policy
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* MAP */}
      <div className="mt-16">
        <h3 className="text-lg font-semibold text-primary mb-4 text-center">Find Us</h3>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3509.1664389048588!2d77.06294737382665!3d28.414234293963393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23463d521c01%3A0x9d86bf5abbecf45f!2sXRAi%20Digital!5e0!3m2!1sen!2sin!4v1703012283560!5m2!1sen!2sin"
          className="w-full h-[250px] rounded-xl"
          loading="lazy"
        ></iframe>
      </div>

      {/* ✅ CALL COMPONENT */}
      {showPrivacy && (
        <PrivacyPolicy onClose={() => setShowPrivacy(false)} />
      )}

    </footer>
  );
};

export default Footer;