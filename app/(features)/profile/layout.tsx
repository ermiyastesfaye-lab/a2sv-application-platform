import NavBar from "@/app/components/NavBar";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const NavBarLinks = {
    right: [
      { text: "Your Profile", link: "/profile" },
      {
        text: "User",
      },
      {
        text: "Logout",
        link: "/auth/logout",
      },
    ],
    middle: [{ text: "Dashboard", link: "/dashboard/applicant" }],
  };

  return (
    <div className="text-black">
      <NavBar rightlists={NavBarLinks.right} middlelists={NavBarLinks.middle} />
      {children}
    </div>
  );
}
