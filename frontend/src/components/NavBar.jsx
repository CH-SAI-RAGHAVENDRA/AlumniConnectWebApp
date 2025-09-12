import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import logo from "../assets/images/logo.png";
import profile from "../assets/images/Profile.png";
import Modal from "./CreatePostModal";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="navbar max-w-7xl m-auto flex justify-between items-center p-2">
        {/* Left Logo */}
        <div className="logo-content flex items-center text-xl">
          <div className="img-container relative w-20 h-20">
            <img src={logo} className="absolute rounded-full" alt="logo" />
          </div>
          <p>AlumniConnect</p>
        </div>

        {/* Search Bar */}
        <div className="search-section w-[28rem] h-10 bg-[#D9D9D9] rounded-3xl flex items-center p-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            className="w-full h-full p-3 text-[1rem] focus:outline-none"
            placeholder="Search..."
          />
        </div>

        {/* Right Section */}
        <div className="right-section flex items-center justify-between w-[10rem]">
          {/* Button to open modal */}
          <button
            className="bg-[#D9D9D9] px-4 py-2 rounded-3xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            Create
          </button>

          <div className="pfp bg-[#D9D9D9] rounded-full w-12 h-12 flex items-center justify-center">
            <img src={profile} className="w-9 h-9" alt="profile" />
          </div>
        </div>
      </div>

      {/* Show modal only when isOpen is true */}
      {isOpen && <Modal onClose={() => setIsOpen(false)} />}

      <Outlet />
    </>
  );
};

export default NavBar;
