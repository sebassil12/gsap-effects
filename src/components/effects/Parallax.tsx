'use client'
import React, { useRef } from 'react'
import Image from 'next/image'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Simplified data structure
const ParallaxImage = [
    { title: "iguana", path: "/images/fade2.webp", selector: "image1" },
    { title: "turtle", path: "/images/fade3.webp", selector: "image2" },
    { title: "bird", path: "/images/fade4.webp", selector: "image3" },
    { title: "blue foots", path: "/images/fade1.webp", selector: "image4" },
    { title: "leaves", path: "/images/cover.webp", selector: "image5" },
];

export default function Parallax() {
  const containerRef = useRef<HTMLElement|null>(null)
  
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: true,
        start: "top top",
        end: "+=2000",
        pin: true,
      }
    })

    // FIX: Removed the ", 2" position parameter to let animations play in sequence
    tl.to(".image5", {
      y: innerWidth * 1,
      width: "200%",
      height: "200vh",
      opacity: 0
    })

    tl.to(".image4", {
      y: innerWidth * 1,
      width: "100%",
      height: "100vh",
      opacity: 0
    })

    tl.to(".image3", {
      y: innerWidth * 1,
      width: "100%",
      height: "100vh",
      opacity: 0
    })

    tl.to(".image2", {
      autoAlpha: 0
    })

    tl.to(".image1", {
      autoAlpha: 0
    })

    tl.to('.title', {
      autoAlpha: 1, // Change from 0 to 1
      duration: 1   // Add a duration for a nice fade-in effect
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} className='w-screen h-screen relative bg-black'>
      {ParallaxImage.map((value) => (
        // FIX: Added necessary classes to stack images correctly
        <Image
          key={value.selector}
          src={value.path}
          alt={value.title}
          fill
          sizes="100vw"
          className={`absolute inset-0 object-cover ${value.selector}`}
        />
      ))}
      {/* FIX: Cleaned up and centered the title so it's visible */}
      <div className='absolute inset-0 flex justify-center items-center'>
        <h1 className="title text-white text-8xl font-bold opacity-0">
          Have a Good Day
        </h1>
      </div>
    </section>
  )
}