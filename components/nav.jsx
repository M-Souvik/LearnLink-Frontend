"use client"

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import ModeToggle from './theme-mode'
// import { Button } from './ui/button';
import { IoIosMenu } from 'react-icons/io';
import { FaRegUserCircle } from "react-icons/fa";
import { IoNotificationsCircleOutline } from "react-icons/io5";
const Nav = ({toggleSidebar}) => {

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-md z-50 border-b-2 border-b-purple-600 dark:bg-gray-900">
      <div className="container px-1 mx-auto md:flex md:justify-center md:items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex gap-0 sm:gap-4 items-center justify-start">
          <div className="bg-transparent active:ring hover:rounded-full active:rounded-full active:bg-gray-600 active:p-1  hover:bg-transparent" onClick={toggleSidebar}>
            <IoIosMenu size={30} color='white'/>
          </div>
            <Link href="/" className='flex items-center justify-center'>
              <Image className="" src="/assets/BrainWave-logo.png" alt="Logo" width={80} height={80}/>
              <h1 className="text-xl font-bold hidden md:block text-nowrap">BrainWave</h1>
            </Link>
            </div>
            <div className="flex justify-end items-center md:py-1 md:px-10 rounded-full gap-4">
              <div>
              <IoNotificationsCircleOutline size={30}/>
              </div>
             <ModeToggle />
            </div>
         
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;