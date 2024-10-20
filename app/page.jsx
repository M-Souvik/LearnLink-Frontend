"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiGearFineBold } from "react-icons/pi";
import { MdStart } from "react-icons/md";
import "@/styles/globals.css"; // Import the CSS file

export default function Home() {
  const router = useRouter();
  
  return (
    <>
      <div className="background-image"></div>
      <div className="overlay">
        <div className="content-container">
          {/* <Image src="/assets/BrainWave-logo.png" width={500} height={500} alt="BrainWave Logo" /> */}

          <div className="text-container">
            <h1 className="heading">
              Learn
              <PiGearFineBold size={100} className="spin-icon" />
              Link
            </h1>

            <p className="description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
              incidunt deleniti ratione saepe cupiditate dolores, vitae
              consequuntur nihil ut recusandae tempora sunt ab id laudantium
              similique sequi facere? Veritatis, quo officiis. Suscipit,
              repudiandae quasi.
            </p>
          </div>

          <Button
            className="start-button"
            onClick={() => {
              router.push("/sign-in");
            }}
          >
            <span>Start Learning</span> <MdStart size={20} />
          </Button>
        </div>
      </div>
    </>
  );
}
