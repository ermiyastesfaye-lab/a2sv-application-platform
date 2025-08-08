import NavBar from "@/app/components/NavBar";
import React from "react";

const layout = ({ children }: any) => {
  const NavBarLinks = {
    right: [
      { text: "Your Profile", link: "/profile" },
      {
        text: "Admin",
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
      { text: "Analytics", link: "" },
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
