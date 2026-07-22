// // import React ,{ useState } from "react";
// // import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// // import { useNavigate } from "react-router-dom";
// // import Logo from "../assets/Logo.png";
// // import { Link } from "react-router-dom";

// // const Navbar = () => {
// //   const [nav, setNav] = useState(false);
// //   const navigate = useNavigate();

// //   const handleNav = () => {
// //     setNav(!nav);
// //   };

// //   return (
// //     <div className="sticky top-0 left-0 w-full z-50 flex justify-between items-center bg-white h-24 px-6 lg:px-8 text-black shadow-md">
// //       {/* Logo */}
// //       <img
// //         className="w-36 md:w-48 my-4 cursor-pointer"
// //         src={Logo}
// //         alt="/"
// //         onClick={() => navigate("/")}
// //       />

// //       {/* Desktop Menu */}
// //       <ul className="hidden md:flex items-center">
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => navigate("/")}
// //         >
// //           Home
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => navigate("/About")}
// //         >
// //           About Us
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => navigate("/Services")}
// //         >
// //           Services
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => navigate("/Technology")}
// //         >
// //           Technology
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => navigate("/Vision")}
// //         >
// //           Vision
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => navigate("/Awards")}
// //         >
// //           Awards
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => navigate("/Contact")}
// //         >
// //           Contact
// //         </li>
// //         <li className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer">
// //           <Link
// //             to="/career"
// //             // className="px-4 py-2 bg-blue-600 text-white rounded"
// //           >
// //             Radiologist Registration
// //           </Link>
// //           {/* <a
// //             href="https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Career
// //           </a> */}
// //         </li>

// //         {/* ✅ POCT Button with Tooltip Below */}
// //         <li className="relative group">
// //           <a
// //             href="https://www.xraidigital.com/"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="ml-4 bg-[hsl(357,77%,51%)] text-white px-5 py-2 rounded-full font-bold hover:bg-red-600 transition duration-300 shadow-lg animate-pulse"
// //           >
// //             🚀 XraiDigital
// //           </a>
// //           {/* Tooltip */}
// //           <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-base font-semibold px-4 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
// //             Point of Care Testing
// //           </span>

// //         </li>
// //         <li className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer">
// //             <Link
// //             to="/onboarding"
// //             className="px-4 py-2 bg-blue-600 text-white rounded"
// //           >
// //             Client Registration
// //           </Link>
// //           {/* Tooltip */}
// //           <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-base font-semibold px-4 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
// //             Point of Care Testing
// //           </span>

// //         </li>
// //       </ul>

// //       {/* Mobile Menu Icon */}
// //       <div onClick={handleNav} className="block md:hidden">
// //         {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
// //       </div>

// //       {/* Mobile Menu */}
// //       <ul
// //         className={
// //           nav
// //             ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
// //             : "ease-in-out duration-500 fixed left-[-100%]"
// //         }
// //       >
// //         <img
// //           className="w-48 mx-auto my-4"
// //           src={Logo}
// //           alt="/"
// //           onClick={() => {
// //             handleNav();
// //             navigate("/");
// //           }}
// //         />
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => {
// //             handleNav();
// //             navigate("/");
// //           }}
// //         >
// //           Home
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => {
// //             handleNav();
// //             navigate("/About");
// //           }}
// //         >
// //           About Us
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => {
// //             handleNav();
// //             navigate("/Services");
// //           }}
// //         >
// //           Services
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => {
// //             handleNav();
// //             navigate("/Technology");
// //           }}
// //         >
// //           Technology
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => {
// //             handleNav();
// //             navigate("/Vision");
// //           }}
// //         >
// //           Vision
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => {
// //             handleNav();
// //             navigate("/Awards");
// //           }}
// //         >
// //           Awards
// //         </li>
// //         <li
// //           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
// //           onClick={() => {
// //             handleNav();
// //             navigate("/Contact");
// //           }}
// //         >
// //           Contact
// //         </li>
// //         <li className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer">
// //           <a
// //             href="https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Career
// //           </a>
// //         </li>
// //         {/* ✅ No POCT button on mobile */}
// //         {/*POCT Button for Mobile */}
// //         <li className="p-4">
// //           <a
// //             href="https://www.xraidigital.com/"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="bg-[hsl(357,77%,51%)] text-white px-5 py-2 rounded-full font-bold hover:bg-red-600 transition duration-300 shadow-lg block text-center"
// //           >
// //             🚀 Explore POCT
// //           </a>
// //           <p className="text-blue-600 text-sm text-center mt-1 font-semibold">
// //             Point of Care Testing
// //           </p>
// //         </li>
// //       </ul>
// //     </div>
// //   );
// // };

// // export default Navbar;




// import React, { useState } from "react";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { useNavigate, Link } from "react-router-dom";
// import Logo from "../assets/Logo.png";
// // Import your new logo here. Adjust the path if necessary.
// import XraiLogo from "../assets/xrailogo.png"; // Replace with the actual path to your XRAi Digital logo

// const Navbar = () => {
//   const [nav, setNav] = useState(false);
//   const navigate = useNavigate();

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   return (
//     <div className="sticky top-0 left-0 w-full z-50 flex justify-between items-center bg-white h-24 px-6 lg:px-8 text-black shadow-md">
//       {/* Logo */}
//       <img
//         className="w-36 md:w-48 my-4 cursor-pointer"
//         src={Logo}
//         alt="/"
//         onClick={() => navigate("/")}
//       />

//       {/* Desktop Menu */}
//       <ul className="hidden xl:flex lg:flex md:flex items-center">
//         <li
//           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => navigate("/")}
//         >
//           Home
//         </li>
//         <li
//           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => navigate("/About")}
//         >
//           About Us
//         </li>
//         <li
//           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => navigate("/Services")}
//         >
//           Services
//         </li>
//         <li
//           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => navigate("/Technology")}
//         >
//           Technology
//         </li>
//         <li
//           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => navigate("/Vision")}
//         >
//           Vision
//         </li>
//         <li
//           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => navigate("/Awards")}
//         >
//           Awards
//         </li>
//         <li
//           className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => navigate("/Contact")}
//         >
//           Contact
//         </li>

//         {/* Radiologist Registration Button */}
//         <li className="mx-1 cursor-pointer flex items-center">
//           <Link
//             to="/career"
//             className="bg-[hsl(357,100%,59%)] text-white px-4 py-2 text-sm rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-lg whitespace-nowrap"
//           >
//             Radiologist Registration
//           </Link>
//         </li>

//         {/* Client Registration Button */}
//         <li className="mx-1 cursor-pointer flex items-center">
//           <Link
//             to="/onboarding"
//             className="bg-[hsl(357,100%,59%)] text-white px-4 py-2 text-sm rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-lg whitespace-nowrap"
//           >
//             Client Registration
//           </Link>
//         </li>

//         {/* ✅ POCT / XraiDigital Image Button with Tooltip Below (Desktop) */}
//         <li className="relative group mx-1 ml-2 cursor-pointer flex items-center">
//           <a
//             href="https://xraidigital.com/Home/corporate"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="bg-white border border-gray-300 rounded shadow-md px-3 py-1 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-blue-400 hover:bg-slate-50"
//           >
//             <img src={XraiLogo} alt="XRAi Digital" className="h-8 w-auto object-contain" />
//           </a>
//           {/* Tooltip */}
//           <span className="absolute top-full mt-3 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
//             Point of care Testing and TB Xray Programme
//           </span>
//         </li>
//       </ul>

//       {/* Mobile Menu Icon */}
//       <div onClick={handleNav} className="block md:hidden cursor-pointer">
//         {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
//       </div>

//       {/* Mobile Menu */}
//       <ul
//         className={
//           nav
//             ? "fixed left-0 top-0 w-[75%] sm:w-[60%] h-full overflow-y-auto border-r border-r-gray-900 bg-white ease-in-out duration-500 z-50 pb-10"
//             : "ease-in-out duration-500 fixed left-[-100%] top-0 h-full z-50"
//         }
//       >
//         <img
//           className="w-48 mx-auto my-4 cursor-pointer"
//           src={Logo}
//           alt="/"
//           onClick={() => {
//             handleNav();
//             navigate("/");
//           }}
//         />
//         <li
//           className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => {
//             handleNav();
//             navigate("/");
//           }}
//         >
//           Home
//         </li>
//         <li
//           className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => {
//             handleNav();
//             navigate("/About");
//           }}
//         >
//           About Us
//         </li>
//         <li
//           className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => {
//             handleNav();
//             navigate("/Services");
//           }}
//         >
//           Services
//         </li>
//         <li
//           className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => {
//             handleNav();
//             navigate("/Technology");
//           }}
//         >
//           Technology
//         </li>
//         <li
//           className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => {
//             handleNav();
//             navigate("/Vision");
//           }}
//         >
//           Vision
//         </li>
//         <li
//           className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => {
//             handleNav();
//             navigate("/Awards");
//           }}
//         >
//           Awards
//         </li>
//         <li
//           className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
//           onClick={() => {
//             handleNav();
//             navigate("/Contact");
//           }}
//         >
//           Contact
//         </li>
        
//         {/* Mobile Buttons */}
//         <li className="p-4 flex flex-col gap-4 mt-2">
//           <Link
//             to="/career"
//             onClick={handleNav}
//             className="bg-[hsl(357,100%,59%)] text-white px-4 py-2 text-sm rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-lg text-center"
//           >
//             Radiologist Registration
//           </Link>
          
//           <Link
//             to="/onboarding/client"
//             onClick={handleNav}
//             className="bg-[hsl(357,100%,59%)] text-white px-4 py-2 text-sm rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-lg text-center"
//           >
//             Client Registration
//           </Link>

//           {/* ✅ POCT Image Button for Mobile */}
//           <div className="flex flex-col mt-2">
//             <a
//               href="https://xraidigital.com/Home/corporate"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-white border border-gray-300 rounded shadow-md px-4 py-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-blue-400 hover:bg-slate-50"
//             >
//               <img src={XraiLogo} alt="XRAi Digital" className="h-10 w-auto object-contain" />
//             </a>
//             <p className="text-blue-600 text-xs text-center mt-2 font-bold">
//               Point of care Testing and TB Xray Programme
//             </p>
//           </div>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Navbar;





import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import XraiLogo from "../assets/xrailogo.png"; 

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="sticky top-0 left-0 w-full z-50 flex justify-between items-center bg-white h-24 px-4 lg:px-6 xl:px-8 text-black shadow-md">
      
      {/* Main Logo */}
      <img
        className="w-32 lg:w-36 xl:w-48 my-4 cursor-pointer flex-shrink-0"
        src={Logo}
        alt="/"
        onClick={() => navigate("/")}
      />

      {/* Desktop Menu */}
      <ul className="hidden lg:flex items-center flex-1 justify-end xl:justify-center">
        <li
          className="px-2 xl:px-3 py-4 text-sm font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="px-2 xl:px-3 py-4 text-sm font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/About")}
        >
          About Us
        </li>
        <li
          className="px-2 xl:px-3 py-4 text-sm font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/Services")}
        >
          Services
        </li>
        <li
          className="px-2 xl:px-3 py-4 text-sm font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/Technology")}
        >
          Technology
        </li>
        <li
          className="px-2 xl:px-3 py-4 text-sm font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/Vision")}
        >
          Vision
        </li>
        <li
          className="px-2 xl:px-3 py-4 text-sm font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/Awards")}
        >
          Awards
        </li>
        <li
          className="px-2 xl:px-3 py-4 text-sm font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer whitespace-nowrap"
          onClick={() => navigate("/Contact")}
        >
          Contact
        </li>

        {/* ✅ Radiologist Registration Button - Size Reduced */}
        <li className="mx-0.5 xl:mx-1 cursor-pointer flex items-center">
          <Link
            to="/career"
            className="bg-[hsl(357,100%,59%)] text-white px-2.5 py-1.5 xl:px-3 xl:py-1.5 text-[10px] xl:text-xs rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-md whitespace-nowrap"
          >
            Radiologist Registration
          </Link>
        </li>

        {/* ✅ Client Registration Button - Size Reduced */}
        <li className="mx-0.5 xl:mx-1 cursor-pointer flex items-center">
          <Link
            to="/onboarding"
            className="bg-[hsl(357,100%,59%)] text-white px-2.5 py-1.5 xl:px-3 xl:py-1.5 text-[10px] xl:text-xs rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-md whitespace-nowrap"
          >
            Client Registration
          </Link>
        </li>

        {/* POCT / XraiDigital Image Button */}
        <li className="relative group mx-1 xl:ml-2 cursor-pointer flex items-center">
          <a
            href="https://xraidigital.com/Home/corporate"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-gray-300 rounded shadow-sm px-2 py-1 flex items-center justify-center transition-all duration-300 hover:shadow-md hover:border-blue-400 hover:bg-slate-50"
          >
            <img src={XraiLogo} alt="XRAi Digital" className="h-6 xl:h-7 w-auto object-contain flex-shrink-0" />
          </a>
          {/* Tooltip */}
          <span className="absolute top-full mt-3 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-50">
            Point of care Testing and TB Xray Programme
          </span>
        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <div onClick={handleNav} className="block lg:hidden cursor-pointer">
        {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </div>

      {/* Mobile Menu Dropdown */}
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[75%] sm:w-[60%] h-full overflow-y-auto border-r border-r-gray-900 bg-white ease-in-out duration-500 z-50 pb-10 shadow-2xl"
            : "ease-in-out duration-500 fixed left-[-100%] top-0 h-full z-50"
        }
      >
        <img
          className="w-40 mx-auto my-6 cursor-pointer"
          src={Logo}
          alt="/"
          onClick={() => {
            handleNav();
            navigate("/");
          }}
        />
        <li className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer" onClick={() => { handleNav(); navigate("/"); }}>Home</li>
        <li className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer" onClick={() => { handleNav(); navigate("/About"); }}>About Us</li>
        <li className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer" onClick={() => { handleNav(); navigate("/Services"); }}>Services</li>
        <li className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer" onClick={() => { handleNav(); navigate("/Technology"); }}>Technology</li>
        <li className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer" onClick={() => { handleNav(); navigate("/Vision"); }}>Vision</li>
        <li className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer" onClick={() => { handleNav(); navigate("/Awards"); }}>Awards</li>
        <li className="p-4 border-b font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer" onClick={() => { handleNav(); navigate("/Contact"); }}>Contact</li>
        
        {/* Mobile Buttons */}
        <li className="p-4 flex flex-col gap-4 mt-2">
          <Link
            to="/career"
            onClick={handleNav}
            className="bg-[hsl(357,100%,59%)] text-white px-4 py-2 text-sm rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-lg text-center"
          >
            Radiologist Registration
          </Link>
          
          <Link
            to="/onboarding/client"
            onClick={handleNav}
            className="bg-[hsl(357,100%,59%)] text-white px-4 py-2 text-sm rounded-full font-bold hover:bg-red-700 transition duration-300 shadow-lg text-center"
          >
            Client Registration
          </Link>

          {/* POCT Image Button for Mobile */}
          <div className="flex flex-col mt-2">
            <a
              href="https://xraidigital.com/Home/corporate"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-300 rounded shadow-md px-4 py-2 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:border-blue-400 hover:bg-slate-50"
            >
              <img src={XraiLogo} alt="XRAi Digital" className="h-10 w-auto object-contain" />
            </a>
            <p className="text-blue-600 text-xs text-center mt-2 font-bold">
              Point of care Testing and TB Xray Programme
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;