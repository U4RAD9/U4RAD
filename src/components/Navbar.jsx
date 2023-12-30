import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="flex justify-between items-center bg-[white] h-24  mx-auto px-6 lg:px-8 text-black">
      <img
        className="w-36 md:w-48  my-4 cursor-pointer"
        src={Logo}
        alt="/"
        onClick={() => navigate("/")}
      />
      <ul className="hidden md:flex">
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => navigate("/About")}
        >
          About Us
        </li>

        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => navigate("/Services")}
        >
          Services
        </li>

        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => navigate("/Technology")}
        >
          Technology
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => navigate("/Vision")}
        >
          Vision
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => navigate("/Awards")}
        >
          Awards
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => navigate("/Contact")}
        >
          Contact
        </li>
        <li className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
            Career
          </a>
        </li>
      </ul>


      <div onClick={handleNav} className="block md:hidden">
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul
        className={
          nav
            ? "fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900  bg-white ease-in-out duration-500"
            : "ease-in-out duration-500 fixed left-[-100%]"
        }
      >
        <img
          className="w-48 md:w-64 mx-auto my-4"
          src={Logo}
          alt="/"
          onClick={() => navigate("/")}
        />
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/");
          }}
        >
          Home
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/About");
          }}
        >
          About Us
        </li>

        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Services");
          }}
        >
          Services
        </li>
        
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Technology");
          }}
        >
          Technology
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Vision");
          }}
        >
          Vision
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Awards");
          }}
        >
          Awards
        </li>
        <li
          className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer"
          onClick={() => {
            handleNav();
            navigate("/Contact");
          }}
        >
          Contact
        </li>
        <li className="p-4 font-bold hover:text-[hsl(357,100%,59%)] hover:text-text[hsl(357,100%,59%)]-700 transition cursor-pointer">
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScTov8gEW0wq0o8LJdR275fh2muiDkhnXfzkdey3Gj1VNp9Bw/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
            Career
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
