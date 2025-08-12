"use client";
import NavBar from "@/app/components/NavBar";
import React, { ReactNode, useEffect, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [role, setRole] = useState("");
  useEffect(() => {
    const r = localStorage.getItem("role") as string;
    setRole(r);
  }, []);
const NavBarLinks = {
  right: [
    { text: "Your Profile", link: "/profile" },
    {
      text:
        role && role.length > 0
          ? role[0].toUpperCase() + role.slice(1).toLowerCase()
          : "User",
    },
    {
      text: "Logout",
      link: "/auth/logout",
    },
  ],
  middle: [{ text: "Dashboard", link: `/dashboard/${role}` }],
};


  return (
    <div className="text-black">
      <NavBar rightlists={NavBarLinks.right} middlelists={NavBarLinks.middle} />
      {children}
    </div>
  );
}
