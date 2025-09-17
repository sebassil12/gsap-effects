'use client'
import React, { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import Image from 'next/image'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ZoomTransitionImage } from '@/app/constants/data-image'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxImage() {
    // Create a mutable ref that persist across component re-renders without triggering a re-render themselves
    const containerRef = useRef<HTMLDivElement>(null)

    /*The most common type of animation is a to() tween because it allows you to define the destination values 
    (and most people think in terms of animating to certain values): */
    useGSAP(() => {
        gsap.to(".zoom-text", {
            scale:50,
            opacity:0,
            ease:"none",
            scrollTrigger:{
                trigger:containerRef.current,
                //Syn with the scrollar
                scrub:1,
                // Static with page
                pin:true,
                //If you have another element before this, chek out this param, must be not same
                start:"top top",
                end:"+=500"
            }
        })
                
    }, {scope: containerRef})


    return (
        <section ref={containerRef} className='relative h-screen'>
            {/*The CSS inset property is a shorthand property that combines the top, right, bottom, and left
            properties into a single declaration.*/}
            <div className='absolute inset-0 overflow-hidden'>
                <Image 
                    src={ZoomTransitionImage[0].path}
                    alt={ZoomTransitionImage[0].title}
                    fill
                    sizes="100vw"
                    className="absolute top-0 left-0 -z-10 object-cover"
                />
            </div>
            {/*The mix-blend-mode CSS property sets how an element's content should blend with the content 
            of the element's parent and the element's background. */}
            <div className='h-full w-full flex items-center justify-center mix-blend-screen bg-amber-50'>
                <h1 className='absolute text-2xl sm:text-8xl text-center zoom-text'>Devynix</h1>
            </div>
        </section>
    )
}
