"use client";
import React, { useRef, useLayoutEffect } from "react";
import {
  ArrowUpRight,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Instagram,
  Twitter,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const IndustrialFooter = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Footer Curtain Effect (Parallax Reveal)
      // The content inside moves slightly slower than the scroll
      gsap.from(".footer-content", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 90%",
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={container}
      className="relative w-full bg-slate-950 text-white font-sans overflow-hidden"
    >
      {/* Massive Background Watermark (Fixed) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden pointer-events-none opacity-5">
        <h1 className="text-[20vw] font-bold leading-none tracking-tighter text-white select-none whitespace-nowrap">
          IVTC CAMPUS
        </h1>
      </div>

      <div className="footer-content relative z-10 flex flex-col w-full h-full">
        {/* --- TOP SECTION: Big CTA --- */}
        <div className="w-full border-b border-white/10 p-8 lg:p-20 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2 block">
              Intake 2024 Closing Soon
            </span>
            <h2 className="text-5xl lg:text-7xl font-medium tracking-tighter leading-none">
              Ready to <br />{" "}
              <span className="text-slate-500 font-serif italic">Build</span>{" "}
              the Future?
            </h2>
          </div>

          <button className="group relative px-10 py-6 bg-white text-slate-950 rounded-full font-bold uppercase tracking-widest overflow-hidden hover:scale-105 transition-transform duration-300">
            <span className="relative z-10 flex items-center gap-2">
              Start Application <ArrowUpRight size={20} />
            </span>
            <div className="absolute inset-0 bg-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out"></div>
          </button>
        </div>

        {/* --- BOTTOM SECTION: The 50/50 Grid --- */}
        <div className="flex flex-col lg:flex-row w-full border-b border-white/10">
          {/* LEFT COLUMN: Identity & Contact */}
          <div className="w-full lg:w-1/2 border-r border-white/10 p-12 flex flex-col justify-between min-h-[400px]">
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 flex items-center justify-center font-bold text-xl">
                  I
                </div>
                <span className="text-2xl font-bold tracking-tight">IVTC.</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed text-sm">
                The Institute of Vocational Technology & Coding. Reimagining
                higher education through practical application and industry
                integration.
              </p>
            </div>

            <div className="space-y-4 mt-12 lg:mt-0">
              <div className="flex items-center gap-4 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer group">
                <MapPin
                  size={18}
                  className="text-indigo-500 group-hover:scale-110 transition-transform"
                />
                <span>45/2 Park Street, Colombo 07, Sri Lanka</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer group">
                <Mail
                  size={18}
                  className="text-indigo-500 group-hover:scale-110 transition-transform"
                />
                <span>admissions@ivtc.edu.lk</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300 hover:text-white transition-colors cursor-pointer group">
                <Phone
                  size={18}
                  className="text-indigo-500 group-hover:scale-110 transition-transform"
                />
                <span>+94 11 255 6677</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Links Grid */}
          <div className="w-full lg:w-1/2 flex">
            {/* Column 1 */}
            <div className="flex-1 border-r border-white/10 p-12">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
                Menu
              </h4>
              <ul className="space-y-4">
                {[
                  "Programs",
                  "Admissions",
                  "Campus Life",
                  "Research",
                  "Alumni",
                ].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-lg font-medium text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2 */}
            <div className="flex-1 p-12">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8">
                Socials
              </h4>
              <ul className="space-y-4">
                {[
                  { name: "LinkedIn", icon: <Linkedin size={18} /> },
                  { name: "Instagram", icon: <Instagram size={18} /> },
                  { name: "Twitter", icon: <Twitter size={18} /> },
                ].map((item) => (
                  <li key={item.name}>
                    <a
                      href="#"
                      className="text-lg font-medium text-slate-300 hover:text-white hover:pl-2 transition-all duration-300 flex items-center gap-3"
                    >
                      {item.icon} {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* --- SYSTEM BAR: Legal & Meta --- */}
        <div className="w-full p-6 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-slate-500">
          <span>© 2024 IVTC Education Group. All Rights Reserved.</span>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default IndustrialFooter;
