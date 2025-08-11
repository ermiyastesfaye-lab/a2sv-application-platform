"use client";
import NavBar from "@/app/components/NavBar";
import React, { useEffect, useState } from "react";

const layout = ({ children }: any) => {
  const [role, setRole] = useState("");
  useEffect(() => {
    const r = localStorage.getItem("role") || "";
    setRole(r);
  }, []);
  const NavBarLinks = {
    right: [
      { text: "Your Profile", link: "/profile" },
      {
        text: role[0]?.toUpperCase() + role?.slice(1).toLowerCase() || "Admin",
      },
      {
        text: "Logout",
        link: "/auth/logout",
      },
    ],
    middle: [
      { text: "Dashboard", link: "/dashboard/admin" },
      { text: "Users", link: "/dashboard/admin/usermanagment" },
      { text: "Cycles", link: "/dashboard/admin/applicationCycle" },
      { text: "Analytics", link: "/dashboard/admin/analytics" },
    ],
  };

  return (
    <div className="text-black">
      <NavBar rightlists={NavBarLinks.right} middlelists={NavBarLinks.middle} />

      {children}
    </div>
  );
};

export default layout;
