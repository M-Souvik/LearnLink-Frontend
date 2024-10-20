"use client";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Nav from "@/components/nav";
import SideNavbar from "@/components/sideNav";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import Cookies from "js-cookie"; // Import js-cookie
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/context/authContext";
// import NextNProgress from 'nextjs-progressbar';
import ProgressBar from "@/components/ProgressBar";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default sidebar to closed
  const [isSidebarVisible, setisSidebarVisible]=useState(true)
  // const { token } = useAuth() || {}; // Destructure token from useAuth or set to empty object if undefined
  const pathname = usePathname();

  // useEffect(() => {
  //   // Check if the token is in the cookies and set sidebarOpen accordingly
  //   if (token) {
  //     setSidebarOpen(true);
  //   }
  // }, [token]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Close sidebar when navigating to the root route
    if (pathname === "/"||pathname === "/sign-in"||pathname === "/sign-up"||pathname==="/my-courses/lectures/[id]") {
      setisSidebarVisible(false);
      setSidebarOpen(false);
    }else{
      setisSidebarVisible(true);
      setSidebarOpen(true);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <AuthProvider>
      <body className="min-h-screen bg-gray-100 flex flex-col">
      <ProgressBar />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="">
            
                <Nav toggleSidebar={toggleSidebar} />
                {isSidebarVisible && <SideNavbar isOpen={sidebarOpen} />}
            <main
              className={`flex-grow p-0 transition-all duration-300 ${
                sidebarOpen ? "ml-72" : "ml-0"
              } mt-20 dark:bg-gray-900`}
            >
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
      </AuthProvider>
    </html>
  );
}
