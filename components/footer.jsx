import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
    <footer className="fixed dark:bg-gray-800 text-black dark:text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} BrainWave Academy. All rights reserved.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="#" className="text-gray-400 hover:text-gray-300">Privacy Policy</Link>
          <Link href="#" className="text-gray-400 hover:text-gray-300">Terms of Service</Link>
          <Link href="#" className="text-gray-400 hover:text-gray-300">Contact Us</Link>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default Footer