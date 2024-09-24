import Image from 'next/image'
import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Image src="/assets/404-icon.png" width={300} height={300}/>
      <h1 className="text-xl uppercase font-semibold">Oops!! Got a Error</h1>
    </div>
  )
}

export default NotFound