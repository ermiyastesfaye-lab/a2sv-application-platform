import NavBar from "@/app/components/NavBar";
import React from "react";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const NavBarLinks = {
    right: [
      { text: "Your Profile", link: "/profile" },
      {
        text: "Reviewer",
      },
      {
        text: "Logout",
        link: "/auth/logout",
      },
    ],
    middle: [{ text: "Dashboard", link: "/dashboard/reviewer" }],
  };

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <NavBar rightlists={NavBarLinks.right} middlelists={NavBarLinks.middle} />

      {children}
    </div>
  );
}
