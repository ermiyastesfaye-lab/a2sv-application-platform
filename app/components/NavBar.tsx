"use client";
import React from "react";

import { useRouter } from "next/navigation";
import Image from "next/image";

interface ListProps {
  text: string;
  link?: string;
}

const List = ({ text, link }: ListProps) => {
  const router = useRouter();
  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      localStorage.clear();
      window.location.href = "/auth/login";
    }
  };
  const handleClick = () => {
    if (link?.startsWith("#")) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // <-- smooth scroll here
      }
    } else {
      router.push(link || "");
    }
  };

  if (text === "Logout") {
    return (
      <li
        className={"hover:text-indigo-700 hover:underline cursor-pointer"}
        onClick={handleLogout}
      >
        {text}
      </li>
    );
  }
  return (
    <li
      className={`${link && "hover:text-indigo-700 hover:underline"}`}
      onClick={handleClick}
    >
      {text}
    </li>
  );
};
interface NavBarProps {
  middlelists?: ListProps[];
  rightlists?: ListProps[];
  button?: React.ReactNode;
}

const NavBar = ({ middlelists, rightlists, button }: NavBarProps) => {
  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-[#fff] shadow-xs text-black">
      <div className="flex justify-around h-16 items-center ">
        <Image width={100} height={100} className="h-8" src="/a2svlogo(blue).png" alt="A2SV Logo" />
        <div className="flex gap-4 text-sm">
          <ul className="flex gap-4 text-sm">
            {middlelists?.map((list, index) => (
              <List key={index} text={list.text} link={list.link} />
            ))}
          </ul>
        </div>
        <div className="flex gap-4 text-sm">
          <ul className="flex gap-4 my-auto">
            {rightlists?.map((list, index) => (
              <List key={index} text={list.text} link={list.link} />
            ))}
          </ul>
          {button && button}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
