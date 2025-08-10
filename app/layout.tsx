"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ReduxProvider from "@/lib/providers/ReduxProvider";
import { usePathname, useRouter } from "next/navigation";
import Button from "./components/Butt";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const NavBarLists = {
  middle: [
    { text: "Home", link: "/" },
    { text: "About", link: "/" },
    { text: "Success Stories", link: "/" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const hideNavBar =
    pathname.startsWith("/dashboard/admin") ||
    pathname.startsWith("/dashboard/manager") ||
    pathname.startsWith("/dashboard/reviewer") ||
    pathname.startsWith("/dashboard/applicant");
  const router = useRouter();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        {!hideNavBar && (
          <NavBar
            rightlists={NavBarLists.middle}
            button={
              <Button
                text="Apply Now"
                onclick={() => router.push("/auth/login")}
              />
            }
          />
        )}

        <main className="flex-grow bg-gray-100 mt-16">
          <MantineProvider>
            <ReduxProvider>{children}</ReduxProvider>
          </MantineProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
