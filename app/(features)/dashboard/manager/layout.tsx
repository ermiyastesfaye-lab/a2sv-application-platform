import NavBar from "@/app/components/NavBar";
import React from "react";

const Layout = ({ children }: {children:React.ReactNode}) => {
  const NavBarLinks = {
    right: [
      { text: "Your Profile", link: "/profile" },
      {
        text: "Manager",
      },
      {
        text: "Logout",
        link: "/auth/logout",
      },
    ],
    middle: [{ text: "Dashboard", link: "/dashboard/manager" }],
  };

  return (
    <div className="text-black">
      <NavBar rightlists={NavBarLinks.right} middlelists={NavBarLinks.middle} />

      {children}
    </div>
  );
};

export default Layout;
