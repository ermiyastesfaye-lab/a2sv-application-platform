import React from "react";
import Button from "./Butt";

const NavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#ffffffc5] shadow-xs text-black">
      <div className="flex justify-around h-16 items-center ">
        <img className="h-8" src="/a2svlogo(blue).png" alt="A2SV Logo" />
        <div className="flex gap-4 text-sm">
          <ul className="flex gap-4 my-auto">
            <li>Home</li>
            <li>About</li>
            <li>Success Stories</li>
          </ul>
          <Button text="Apply Now" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
