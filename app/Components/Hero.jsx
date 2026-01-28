"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { ArrowUpRight, Play, Pause } from "lucide-react";
import gsap from "gsap";

const EditorialHero = () => {
  const container = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) videoRef.current.pause();
      else videoRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Grid Lines Expand
      tl.from(".grid-line", {
        scaleX: 0,
        duration: 1.2,
        ease: "power3.inOut",
        transformOrigin: "left center",
        stagger: 0.1,
      })

        // 2. Text "Curtain" Reveal (Sliding up from mask)
        .from(
          ".text-reveal",
          {
            y: "110%",
            duration: 1,
            ease: "power3.out",
            stagger: 0.1,
          },
          "-=0.5",
        )

        // 3. Video Reveal (Unmasking)
        .from(
          ".video-mask",
          {
            clipPath: "inset(100% 0 0 0)", // Reveals from bottom up
            duration: 1.2,
            ease: "expo.inOut",
          },
          "-=1.0",
        )

        // 4. Button Fade in
        .from(
          ".hero-btn",
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.5",
        );
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full min-h-screen bg-white text-slate-900 overflow-hidden flex flex-col font-sans"
    >
      {/* Top Border Line */}
      <div className="grid-line w-full h-[1px] bg-slate-200 mt-20 lg:mt-0"></div>

      <div className="flex-1 flex flex-col lg:flex-row h-full">
        {/* --- LEFT: Typography (Grid Cell) --- */}
        <div className="w-full lg:w-1/2 relative p-8 lg:p-20 flex flex-col justify-between border-r border-slate-200 grid-line-v">
          {/* Header */}
          <div className="flex justify-between items-start mb-20 lg:mb-0">
            <div className="overflow-hidden">
              <span className="text-reveal block text-xs font-bold tracking-[0.2em] uppercase text-slate-400">
                EST. 2008 — Colombo
              </span>
            </div>
          </div>

          {/* Main Title */}
          <div className="z-10 mt-10 lg:mt-0">
            <h1 className="text-6xl lg:text-8xl font-medium tracking-tighter leading-[0.95] mb-8">
              <div className="overflow-hidden">
                <span className="text-reveal block">Future</span>
              </div>
              <div className="overflow-hidden">
                <span className="text-reveal block text-slate-400 italic font-serif">
                  Proof
                </span>
              </div>
              <div className="overflow-hidden">
                <span className="text-reveal block">Education.</span>
              </div>
            </h1>

            <div className="overflow-hidden mb-10">
              <p className="text-reveal text-lg text-slate-600 max-w-sm leading-relaxed">
                IVTC bridges the gap between academic theory and industry
                reality. We build careers that last.
              </p>
            </div>

            {/* Buttons: Sharp & Minimal */}
            <div className="hero-btn flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white text-sm font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors flex items-center gap-2">
                Get Started <ArrowUpRight size={18} />
              </button>
              <button className="px-8 py-4 border border-slate-200 text-slate-900 text-sm font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors">
                View Syllabus
              </button>
            </div>
          </div>

          {/* Bottom aligned small text */}
          <div className="mt-20 lg:mt-auto pt-10 overflow-hidden">
            <p className="text-reveal text-xs text-slate-400">
              *Applications for the 2024 intake are currently being processed.
            </p>
          </div>
        </div>

        {/* --- RIGHT: Video (Grid Cell) --- */}
        <div className="w-full lg:w-1/2 relative h-[50vh] lg:h-auto bg-slate-50 overflow-hidden">
          {/* The Video Mask Container */}
          <div className="video-mask absolute inset-0 w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              {/* Clean, professional footage */}
              <source
                src="https://www.pexels.com/download/video/8419348/"
                type="video/mp4"
              />
            </video>

            {/* Video Overlay Tint */}
            <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply pointer-events-none"></div>

            {/* Custom Simple Controls */}
            <button
              onClick={toggleVideo}
              className="hero-btn absolute bottom-10 left-10 w-12 h-12 bg-white flex items-center justify-center hover:scale-110 transition-transform duration-300"
            >
              {isPlaying ? (
                <Pause size={16} className="text-slate-900" />
              ) : (
                <Play size={16} className="text-slate-900 ml-1" />
              )}
            </button>

            {/* Floating Statistic (Minimal) */}
            <div className="hero-btn absolute top-10 right-10 bg-white/90 backdrop-blur px-6 py-4 border-l-2 border-slate-900">
              <span className="block text-2xl font-bold text-slate-900">
                98%
              </span>
              <span className="text-xs uppercase tracking-wider text-slate-500">
                Employment Rate
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM: Infinite Marquee / Ticker --- */}
      <div className="grid-line w-full border-t border-slate-200 py-4 overflow-hidden flex bg-white z-20">
        <div className="whitespace-nowrap flex animate-marquee">
          {/* Repeated text for the loop */}
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="mx-8 text-sm font-bold uppercase tracking-widest text-slate-300"
            >
              • Accredited by UGC • Industry Partners • Global Certification
            </span>
          ))}
        </div>
      </div>

      {/* Tailwind Custom Styles for Marquee */}
      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default EditorialHero;
