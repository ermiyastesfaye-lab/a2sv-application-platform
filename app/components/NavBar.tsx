"use client";
import React from "react";
import Button from "./Butt";
import { useRouter } from "next/navigation";

interface ListProps {
  text: string;
  link?: string;
}

const List = ({ text, link }: ListProps) => {
  const router = useRouter();
  return (
    <li
      className={`${link && "hover:text-indigo-700 hover:underline"}`}
      onClick={() => router.push(link || "")}
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
        <img className="h-8" src="/a2svlogo(blue).png" alt="A2SV Logo" />
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
