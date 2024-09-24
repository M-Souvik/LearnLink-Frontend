"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from 'react';

export default function Home() {
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //     // Fetch data from Express backend
  //     fetch('http://localhost:5000/hello') // The URL of your backend API
  //         .then((response) => response.json())
  //         .then((data) => setData(data))
  //         .catch((error) => console.error('Error fetching data:', error));
  // }, []);

  return (
    <>
    <div className="min-h-screen bg-[url(/assets/background.jpeg)] bg-cover opacity-55 w-full"></div>
      <div className="absolute inset-0 bg-gradient from-slate-950 via-slate-500 to-slate-950 bg-opacity-90">
      <div className="flex flex-col justify-center items-center px-20 h-full z-100">
          {/* <Image src="/assets/BrainWave-logo.png" width={500} height={500} alt="BrainWave Logo" className=""/> */}
        <div className="flex flex-col gap-2 items-center justify-center">
          <h1 className="sm:text-5xl font-bold text-center text-white flex justify-center items-center mt-20">BrainWave Academy</h1>
          <p className="text-center text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit incidunt deleniti ratione saepe cupiditate dolores, vitae consequuntur nihil ut recusandae tempora sunt ab id laudantium similique sequi facere? Veritatis, quo officiis. Suscipit, repudiandae quasi.</p>
        </div>
        <Button className="bg-orange-400 m-5 px-12 hover:bg-orange-500 font-bold">
          <Link href="/sign-in" className="">Get Started</Link>
          
          </Button>
      </div>
     
    </div>
    </>
  );
}
