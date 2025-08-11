import NavBar from "@/app/components/NavBar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
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

export default layout;
