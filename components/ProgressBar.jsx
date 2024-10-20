"use client";

import NProgress from "nprogress";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import "../styles/nprogress.css"; // Make sure you import the CSS

const ProgressBar = () => {
  const pathname = usePathname(); // Get the current route path

  useEffect(() => {
    // Configure NProgress (e.g., show spinner)
    NProgress.configure({ trickleRate: 0.02, trickleSpeed: 800 });
    // Start NProgress on route change
    NProgress.start();

    // Stop NProgress after a slight delay
    const timeout = setTimeout(() => {
      NProgress.done();
    }, 500); // Adjust delay if necessary

    // Cleanup function to clear timeout
    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]); // Trigger the effect when the pathname changes

  return null;
};

export default ProgressBar;
