'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { CustomEase } from 'gsap/CustomEase';

const navLinks = [
  { id: '01', title: 'About us', href: '#' },
  { id: '02', title: 'Our work', href: '#' },
  { id: '03', title: 'Services', href: '#' },
  { id: '04', title: 'Blog', href: '#' },
  { id: '05', title: 'Contact us', href: '#' },
];

const socialLinks = [
  { title: 'Instagram', href: '#' },
  { title: 'LinkedIn', href: '#' },
  { title: 'X/Twitter', href: '#' },
  { title: 'Awwwards', href: '#' },
];

export default function NavbarGSAP() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setMenuOpen] = useState(false);
  type MenuTimelines = { open: gsap.core.Timeline; close: gsap.core.Timeline };
  const tl = useRef<MenuTimelines | null>(null);
  
  useGSAP(() => {
    // Register the plugin and create the ease
    gsap.registerPlugin(CustomEase);
    CustomEase.create('main', '0.65, 0.01, 0.05, 0.99');
    gsap.defaults({
      ease: 'main',
      duration: 0.7,
    });
    
    // Create separate timelines for open and close
    const openTimeline = gsap.timeline({ paused: true })
      .set('.nav-container', { display: 'block' })
      .set('.menu', { xPercent: 0 }, '<')
      .fromTo('.menu-button-text p', { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
      .fromTo('.menu-button-icon', { rotate: 0 }, { rotate: 315 }, '<')
      .fromTo('.overlay', { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
      .fromTo('.bg-panel', { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, '<')
      .fromTo('.menu-link-item', { yPercent: 10, rotate: 10 }, { yPercent: 0, rotate: 0, stagger: 0.05 }, '<+=0.35')
      .fromTo('.menu-fade-item', { autoAlpha: 0, yPercent: 50 }, { autoAlpha: 1, yPercent: 0, stagger: 0.04 }, '<+=0.2');

    const closeTimeline = gsap.timeline({ paused: true })
      .to('.overlay', { autoAlpha: 0 })
      .to('.menu', { xPercent: 120 }, '<')
      .to('.menu-button-text p', { yPercent: 0 }, '<')
      .to('.menu-button-icon', { rotate: 0 }, '<')
      .set('.nav-container', { display: 'none' });

    // Store the timelines in a ref
    tl.current = { open: openTimeline, close: closeTimeline };
    
  }, { scope: containerRef });

  // Handle menu open/close based on state
  useEffect(() => {
    const { open, close } = tl.current || {};
    if (isMenuOpen) {
      close?.reverse(0); // Ensure close timeline is at start
      open?.play();
 // Clear close timeline to reset
    } else {
      open?.reverse(0); // Ensure open timeline is at start
      close?.play();
      tl.current?.open.clear();
    }
  }, [isMenuOpen]);
  
  // Close menu with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div ref={containerRef}>
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[110] p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-full">
          <nav className="flex items-center justify-between w-full">
            <Link href="/" aria-label="home" className="pointer-events-auto">
              <div className='text-3xl'>Devynix</div>
            </Link>
            <div className="flex items-center justify-end pointer-events-auto">
              <button
                onClick={() => setMenuOpen(!isMenuOpen)}
                className="menu-button-container flex items-center gap-2.5 -m-4 p-4"
              >
                <div className="menu-button-text relative overflow-hidden">
                  <p className="text-lg">Menu</p>
                  <p className="text-lg absolute top-full">Close</p>
                </div>
                <div className="menu-button-icon icon-wrap transition-transform duration-main ease-main group-hover:rotate-90">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="w-4 h-4" // Replaces width/height: 1em
                  >
                    <path d="M7.33333 16L7.33333 0L8.66667 0L8.66667 16L7.33333 16Z" fill="currentColor"></path>
                    <path d="M16 8.66667L0 8.66667L0 7.33333L16 7.33333L16 8.66667Z" fill="currentColor"></path>
                    <path d="M6 7.33333L7.33333 7.33333L7.33333 6C7.33333 6.73637 6.73638 7.33333 6 7.33333Z" fill="currentColor"></path>
                    <path d="M10 7.33333L8.66667 7.33333L8.66667 6C8.66667 6.73638 9.26362 7.33333 10 7.33333Z" fill="currentColor"></path>
                    <path d="M6 8.66667L7.33333 8.66667L7.33333 10C7.33333 9.26362 6.73638 8.66667 6 8.66667Z" fill="currentColor"></path>
                    <path d="M10 8.66667L8.66667 8.66667L8.66667 10C8.66667 9.26362 9.26362 8.66667 10 8.66667Z" fill="currentColor"></path>
                  </svg>
                </div>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* NAVIGATION MENU (Initially Hidden) */}
      <div className="nav-container hidden fixed inset-0 z-[100] w-full h-screen">
        <div className="overlay absolute inset-0 bg-[#13131366] opacity-0 cursor-pointer" onClick={() => setMenuOpen(false)}></div>
        
        {/* Menu Structure */}
        <nav className="menu relative h-full w-full md:w-[35em] ml-auto flex flex-col justify-between pt-24 pb-8 sm:pt-36 sm:pb-12">
          {/* Background Panels for Animation */}
          <div className="menu-bg absolute inset-0 z-0">
            <div className="bg-panel second absolute inset-0 bg-neutral-100 rounded-l-2xl"></div>
            <div className="bg-panel first absolute inset-0 bg-primary rounded-l-2xl"></div>
            <div className="bg-panel absolute inset-0 bg-neutral-300 rounded-l-2xl"></div>
          </div>

          {/* Menu Content */}
          <div className="menu-inner relative z-10 h-full flex flex-col justify-between overflow-auto px-4 md:px-8">
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.id} className="menu-link-item relative overflow-hidden">
                  <Link href={link.href} className="group flex w-full gap-3 py-3 text-dark no-underline">
                    <div className="menu-link-bg absolute inset-0 bg-neutral-800 origin-bottom scale-y-0 transition-transform duration-500 ease-main group-hover:scale-y-100 -z-[1]"></div>
                    <p className="menu-link-heading relative z-10 text-5xl md:text-7xl font-bold uppercase leading-[0.75] text-shadow-custom transition-transform duration-500 ease-main group-hover:-translate-y-full group-hover:delay-100">{link.title}</p>
                    <p className="relative z-10 text-primary uppercase font-mono">{link.id}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="menu-details flex flex-col items-start gap-5">
              <p className="menu-fade-item text-sm">Socials</p>
              <div className="flex flex-row gap-6">
                {socialLinks.map((link) => (
                  <a key={link.title} href={link.href} className="menu-fade-item p-large text-lg text-dark no-underline relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-px after:bg-primary after:origin-right after:scale-x-0 after:transition-transform after:duration-400 after:ease-main hover:after:origin-left hover:after:scale-x-100">
                    {link.title}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}