"use client"

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import Nav from "@/components/nav";
import SideNavbar from "@/components/sideNav";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/footer";
import { useRouter } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Set sidebar to closed by default
  const router = useRouter();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    // Close sidebar when navigating to the root route
    if (!router.pathname === '/') {
      setSidebarOpen(true);
    }
  }, [router.pathname]);
  
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        
        <div className="flex flex-1">
        <Nav toggleSidebar={toggleSidebar} />
          <SideNavbar isOpen={sidebarOpen}/>
          <main className={`flex-grow p-0 transition-all duration-300 ${sidebarOpen ? 'ml-72' : 'ml-0'} mt-20 dark:bg-gray-900`}>
            {children}
          </main>
        <Footer/>
        </div>
        </ThemeProvider>
      </body>
    </html>
  );
}