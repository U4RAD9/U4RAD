import React ,{ useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="sticky top-0 left-0 w-full z-50 flex justify-between items-center bg-white h-24 px-6 lg:px-8 text-black shadow-md">
      {/* Logo */}
      <img
        className="w-36 md:w-48 my-4 cursor-pointer"
        src={Logo}
        alt="/"
        onClick={() => navigate("/")}
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center">
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => navigate("/About")}
        >
          About Us
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => navigate("/Services")}
        >
          Services
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => navigate("/Technology")}
        >
          Technology
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => navigate("/Vision")}
        >
          Vision
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => navigate("/Awards")}
        >
          Awards
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => navigate("/Contact")}
        >
          Contact
        </li>
        <li className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Career
          </a>
        </li>

        {/* ✅ POCT Button with Tooltip Below */}
        <li className="relative group">
          <a
            href="https://www.xraidigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-[hsl(357,77%,51%)] text-white px-5 py-2 rounded-full font-bold hover:bg-red-600 transition duration-300 shadow-lg animate-pulse"
          >
            🚀 XraiDigital
          </a>
          {/* Tooltip */}
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-base font-semibold px-4 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Point of Care Testing
          </span>

        </li>
        <li className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer">
            <Link
            to="/onboarding"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Registration
          </Link>
          {/* Tooltip */}
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white text-blue-600 text-base font-semibold px-4 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            Point of Care Testing
          </span>

        </li>
      </ul>

      {/* Mobile Menu Icon */}
      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu */}
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-white ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <img
          className="w-48 mx-auto my-4"
          src={Logo}
          alt="/"
          onClick={() => {
            handleNav();
            navigate("/");
          }}
        />
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/");
          }}
        >
          Home
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/About");
          }}
        >
          About Us
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Services");
          }}
        >
          Services
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Technology");
          }}
        >
          Technology
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Vision");
          }}
        >
          Vision
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Awards");
          }}
        >
          Awards
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Contact");
          }}
        >
          Contact
        </li>
        <li className="p-4 font-bold hover:text-[hsl(357,100%,59%)] cursor-pointer">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Career
          </a>
        </li>
        {/* ✅ No POCT button on mobile */}
        {/*POCT Button for Mobile */}
        <li className="p-4">
          <a
            href="https://www.xraidigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[hsl(357,77%,51%)] text-white px-5 py-2 rounded-full font-bold hover:bg-red-600 transition duration-300 shadow-lg block text-center"
          >
            🚀 Explore POCT
          </a>
          <p className="text-blue-600 text-sm text-center mt-1 font-semibold">
            Point of Care Testing
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;