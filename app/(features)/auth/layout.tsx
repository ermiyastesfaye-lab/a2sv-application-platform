"use client";

import Button from "@/app/components/Butt";
import NavBar from "@/app/components/NavBar";
import { useRouter } from "next/navigation";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const NavBarLists = {
    right: [
      { text: "Home", link: "/" },
      { text: "About", link: "/" },
      { text: "Success Stories", link: "/" },
    ],
  };

  return (
    <div className="text-black">
      <NavBar
        rightlists={NavBarLists.right}
        button={
          <Button
            text="Apply Now"
            onclick={() => router.push("/auth/signup")}
          />
        }
      />
      {children}
    </div>
  );
};

export default Layout;
