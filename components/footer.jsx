import Link from 'next/link'
import React from 'react'
import '@/styles/footer.css'; // Import the CSS file

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} BrainWave Academy. All rights reserved.
          </p>
          <div className="links">
            <Link href="#" className="link">Privacy Policy</Link>
            <Link href="#" className="link">Terms of Service</Link>
            <Link href="#" className="link">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
