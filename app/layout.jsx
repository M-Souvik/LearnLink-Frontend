"use client";

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Nav from "@/components/nav";
import SideNavbar from "@/components/sideNav";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { usePathname } from "next/navigation";
import { AuthProvider } from "@/context/authContext";
import ProgressBar from "@/components/ProgressBar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [token, setToken] = useState(null);

  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(sessionStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (
      pathname === "/" ||
      pathname === "/sign-in" ||
      pathname === "/sign-up" ||
      pathname.includes("/my-courses/lectures")
    ) {
      setIsSidebarVisible(false);
      setSidebarOpen(false);
    } else {
      setIsSidebarVisible(true);
      setSidebarOpen(true);
    }
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <AuthProvider>
          <ProgressBar />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div>
              <Nav toggleSidebar={toggleSidebar} />
              {token && isSidebarVisible && (
                <SideNavbar isOpen={sidebarOpen} />
              )}
              <main
                className={`flex-grow transition-all duration-300 ${
                  sidebarOpen ? "ml-72" : "ml-0"
                } mt-20 dark:bg-gray-900`}
              >
                {children}
              </main>
              {/* <Footer /> */}
            </div>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
