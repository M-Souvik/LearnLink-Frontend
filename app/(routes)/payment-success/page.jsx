"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Confetti from 'react-confetti'
import { CheckCircle } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'

export default function PaymentSuccessPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const router = useRouter()

  useEffect(() => {
    // Set window size for confetti effect
    const updateWindowSize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    }
    updateWindowSize()
    window.addEventListener('resize', updateWindowSize)
    return () => window.removeEventListener('resize', updateWindowSize)
  }, [])

  // Animation variants for the success message
  const successVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 20,
        delay: 0.5
      }
    }
  }

  // Animation variants for the check icon
  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10,
        delay: 0.2
      }
    }
  }

  // Animation variants for the button
  const buttonVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { delay: 1 }
    },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        recycle={false}
        numberOfPieces={200}
      />
      
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg text-center"
        initial="hidden"
        animate="visible"
        variants={successVariants}
      >
        <motion.div
          variants={iconVariants}
          className="inline-block"
        >
          <CheckCircle size={80} className="text-green-500 mb-4" />
        </motion.div>
        
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        <p className="text-xl text-gray-600 mb-8">Thank you for your purchase. Your order has been processed successfully.</p>
        
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
        >
          <Button 
            onClick={() => router.push('/dashboard')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Go to Dashboard
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}