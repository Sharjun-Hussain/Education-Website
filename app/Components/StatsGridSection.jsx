"use client";
import React, { useLayoutEffect, useRef } from "react";
import { ArrowDownRight, Users, Globe, Trophy, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const StatsGridSection = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Grid Lines Animation (Draws lines when section hits view)
      gsap.from(".grid-line-anim", {
        scaleX: 0,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%",
        },
      });

      // 2. Text Reveal (Slide Up)
      gsap.from(".content-reveal", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 60%",
        },
      });

      // 3. Number Counter Animation
      gsap.utils.toArray(".stat-number").forEach((stat) => {
        gsap.from(stat, {
          textContent: 0,
          duration: 2,
          ease: "power1.out",
          snap: { textContent: 1 },
          stagger: 1,
          scrollTrigger: {
            trigger: stat,
            start: "top 85%",
          },
        });
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full bg-white text-slate-900 font-sans border-b border-slate-200"
    >
      <div className="flex flex-col lg:flex-row w-full h-full">
        {/* --- LEFT COLUMN (Mission Statement) --- */}
        {/* Keeps the 50% width to match Hero/Nav */}
        <div className="w-full lg:w-1/2 border-r border-slate-200 p-8 lg:p-20 relative flex flex-col justify-between min-h-[600px]">
          <div className="content-reveal">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-6">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              Our Impact
            </span>

            <h2 className="text-4xl lg:text-6xl font-medium tracking-tighter leading-[1.05] mb-8">
              Engineering the <br />
              <span className="text-slate-400 italic font-serif">
                Workforce
              </span>{" "}
              of <br />
              Tomorrow.
            </h2>
          </div>

          <div className="content-reveal space-y-6 max-w-md">
            <p className="text-lg text-slate-600 leading-relaxed">
              We don't just offer degrees; we offer a blueprint for your career.
              Our curriculum is reverse-engineered from industry demands,
              ensuring you graduate with skills that are immediately deployable.
            </p>

            <a
              href="#"
              className="group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest border-b border-slate-900 pb-1 hover:text-indigo-600 hover:border-indigo-600 transition-colors"
            >
              Read our Manifest{" "}
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          {/* Decorative Corner Icon */}
          <div className="absolute bottom-0 right-0 p-6 opacity-20">
            <ArrowDownRight size={64} strokeWidth={1} />
          </div>
        </div>

        {/* --- RIGHT COLUMN (The Data Grid) --- */}
        {/* Split into a 2x2 Grid */}
        <div className="w-full lg:w-1/2 flex flex-col">
          {/* Row 1 */}
          <div className="flex-1 flex flex-col sm:flex-row border-b border-slate-200 grid-line-anim origin-left">
            {/* Cell 1: Placement Rate */}
            <div className="flex-1 p-10 border-r border-slate-200 relative group overflow-hidden hover:bg-slate-50 transition-colors">
              <div className="relative z-10">
                <div className="p-3 bg-emerald-100 w-fit rounded-lg text-emerald-700 mb-6">
                  <Trophy size={24} />
                </div>
                <h3 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-2">
                  <span className="stat-number">98</span>%
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Job Placement Rate
                </p>
                <p className="text-sm text-slate-400 mt-2 leading-snug">
                  Graduates hired within 3 months of completion.
                </p>
              </div>
            </div>

            {/* Cell 2: Global Partners */}
            <div className="flex-1 p-10 relative group overflow-hidden hover:bg-slate-900 transition-colors duration-500">
              <div className="relative z-10">
                <div className="p-3 bg-indigo-100 w-fit rounded-lg text-indigo-700 mb-6 group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <Globe size={24} />
                </div>
                <h3 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-2 group-hover:text-white transition-colors">
                  <span className="stat-number">45</span>+
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-400 transition-colors">
                  Global Partners
                </p>
                <p className="text-sm text-slate-400 mt-2 leading-snug group-hover:text-slate-300">
                  Including Microsoft, AWS, and Google.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="flex-1 flex flex-col sm:flex-row">
            {/* Cell 3: Active Students */}
            <div className="flex-1 p-10 border-r border-slate-200 relative group overflow-hidden hover:bg-slate-50 transition-colors">
              <div className="relative z-10">
                <div className="p-3 bg-orange-100 w-fit rounded-lg text-orange-700 mb-6">
                  <Users size={24} />
                </div>
                <h3 className="text-5xl lg:text-7xl font-bold tracking-tighter mb-2">
                  <span className="stat-number">5</span>k
                </h3>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Active Students
                </p>
                <p className="text-sm text-slate-400 mt-2 leading-snug">
                  Across 3 major campus locations.
                </p>
              </div>
            </div>

            {/* Cell 4: The "Call to Action" Cell */}
            <div className="flex-1 p-10 bg-slate-50 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-indigo-600 transition-colors duration-500 group">
              <div className="w-16 h-16 rounded-full border-2 border-slate-300 group-hover:border-white/30 flex items-center justify-center mb-4 transition-colors">
                <ArrowDownRight
                  size={32}
                  className="text-slate-400 group-hover:text-white group-hover:-rotate-90 transition-all duration-300"
                />
              </div>
              <h4 className="text-lg font-bold text-slate-900 group-hover:text-white transition-colors">
                Download <br /> Prospectus
              </h4>
              <p className="text-xs text-slate-500 mt-2 group-hover:text-indigo-200 transition-colors">
                PDF (4.2 MB)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsGridSection;
