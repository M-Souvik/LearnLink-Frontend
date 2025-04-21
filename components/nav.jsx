'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import ModeToggle from './theme-mode'
import { IoIosMenu } from 'react-icons/io'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoNotificationsCircleOutline } from 'react-icons/io5'
import { useAuth } from '@/context/authContext'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'

const Nav = ({ toggleSidebar }) => {
  const router = useRouter()
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = sessionStorage.getItem('token')
      setToken(storedToken)
    }
  }, [token , setToken])

  return (
    <nav className="fixed top-0 left-0 right-0 bg-transparent backdrop-blur-md z-50 border-b-2 border-b-purple-600 dark:bg-gray-900">
      <div className="px-10 mx-auto md:flex md:justify-center md:items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex gap-0 sm:gap-4 items-center justify-start">
            {token && (
              <div
                className="bg-transparent active:ring hover:rounded-full active:rounded-full active:bg-gray-600 active:p-1 hover:bg-transparent"
                onClick={toggleSidebar}
              >
                <IoIosMenu size={30} color="white" />
              </div>
            )}
            <Link href="/" className="flex items-center justify-center">
              <Image
                src="/assets/LearnLink.png"
                alt="Logo"
                width={80}
                height={80}
              />
              <h1 className="text-xl font-bold hidden md:block text-nowrap">
                LearnLink
              </h1>
            </Link>
          </div>

          {token ? (
            <div className="flex justify-end items-center md:py-1 md:px-10 rounded-full gap-4">
              <ModeToggle />
              <Button
                onClick={() => {
                  sessionStorage.clear()
                  setToken(null)
                  router.push('/')
                }}
                className="bg-transparent border-2 border-red-700 hover:bg-red-700 hover:rounded-full text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              className="border-2 border-green-500 bg-transparent hover:bg-green-700 text-white font-bold py-2 px-4 rounded hover:rounded-full"
              onClick={() => {
                router.push('/sign-in')
              }}
            >
              Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
