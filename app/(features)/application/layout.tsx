import NavBar from "@/app/components/NavBar";
import React from "react";

const layout = ({ children }: any) => {
  const NavBarLinks = {
    right: [
      { text: "Your Profile", link: "/profile" },
      {
        text: "Applicant",
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
};

export default layout;
