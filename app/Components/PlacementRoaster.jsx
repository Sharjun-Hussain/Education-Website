"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import {
  ArrowUpRight,
  Building2,
  Briefcase,
  MapPin,
  Quote,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GRADUATES = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Frontend Engineer",
    company: "Google",
    location: "Singapore",
    quote:
      "IVTC's lab-based approach meant I didn't just learn syntax, I learned how to build scalable systems.",
    image:
      "https://images.pexels.com/photos/1181682/pexels-photo-1181682.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    salary: "$85k/yr",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Cloud Architect",
    company: "AWS",
    location: "Sydney",
    quote:
      "The certification prep built into the degree gave me a massive edge during the interview process.",
    image:
      "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    salary: "$92k/yr",
  },
  {
    id: 3,
    name: "Amara Perera",
    role: "UX Researcher",
    company: "Figma",
    location: "Remote",
    quote:
      "I learned that design is about solving problems, not just making things pretty. A career-defining program.",
    image:
      "https://images.pexels.com/photos/1181428/pexels-photo-1181428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    salary: "$70k/yr",
  },
  {
    id: 4,
    name: "Marcus Cole",
    role: "Security Analyst",
    company: "Microsoft",
    location: "Colombo",
    quote:
      "The ethical hacking labs were intense. Real-world scenarios prepared me for the actual job from day one.",
    image:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    salary: "$65k/yr",
  },
  {
    id: 5,
    name: "Priya Rajan",
    role: "Data Scientist",
    company: "Uber",
    location: "Bangalore",
    quote:
      "From Python basics to Neural Networks. The learning curve was steep but the support was incredible.",
    image:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    salary: "$78k/yr",
  },
];

const PlacementRoster = () => {
  const [hoveredGrad, setHoveredGrad] = useState(null);
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Line Animation
      gsap.from(".divider-line", {
        scaleY: 0,
        duration: 1.2,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full bg-slate-50 text-slate-900 font-sans border-b border-slate-200"
    >
      <div className="flex flex-col lg:flex-row w-full relative">
        {/* --- LEFT COLUMN: The "Profile Viewer" (Sticky) --- */}
        <div className="w-full lg:w-1/2 border-r border-slate-200 divider-line hidden lg:block bg-white">
          <div className="sticky top-20 h-[calc(100vh-5rem)] flex flex-col p-12 lg:p-20 justify-center items-center text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#444cf7_1px,transparent_1px)] [background-size:16px_16px]"></div>

            {/* Dynamic Content */}
            <div className="relative z-10 w-full max-w-md">
              {/* Image Frame */}
              <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-slate-100 shadow-2xl">
                {/* Default / Fallback Image (Concept) */}
                <div
                  className={`absolute inset-0 bg-slate-900 flex items-center justify-center transition-opacity duration-500 ${hoveredGrad ? "opacity-0" : "opacity-100"}`}
                >
                  <Building2 className="text-white/20 w-20 h-20" />
                </div>

                {/* Student Image */}
                {GRADUATES.map((grad) => (
                  <img
                    key={grad.id}
                    src={grad.image}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 
                          ${hoveredGrad === grad.id ? "opacity-100 scale-100" : "opacity-0 scale-110"}`}
                  />
                ))}
              </div>

              {/* Text Details */}
              <div className="h-40">
                {" "}
                {/* Fixed height to prevent layout jump */}
                {hoveredGrad ? (
                  // SHOW STUDENT DETAILS
                  GRADUATES.map(
                    (grad) =>
                      grad.id === hoveredGrad && (
                        <div
                          key={grad.id}
                          className="animate-in fade-in slide-in-from-bottom-4 duration-300"
                        >
                          <h3 className="text-3xl font-bold mb-2">
                            {grad.name}
                          </h3>
                          <div className="flex items-center justify-center gap-2 text-indigo-600 font-bold uppercase tracking-widest text-xs mb-6">
                            <Briefcase size={12} /> {grad.role} @ {grad.company}
                          </div>
                          <div className="relative">
                            <Quote
                              size={20}
                              className="absolute -top-2 -left-4 text-slate-200 fill-current"
                            />
                            <p className="text-slate-500 italic leading-relaxed text-sm">
                              "{grad.quote}"
                            </p>
                          </div>
                        </div>
                      ),
                  )
                ) : (
                  // SHOW DEFAULT STATS
                  <div className="animate-in fade-in zoom-in duration-500">
                    <h3 className="text-5xl font-bold mb-2 text-slate-900">
                      98.5%
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-8">
                      Employment Success Rate
                    </p>
                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                      Our alumni network spans 25 countries and 500+ tech
                      companies globally.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: The "Data Log" (Scrollable) --- */}
        <div className="w-full lg:w-1/2 bg-slate-50">
          <div className="px-8 lg:px-20 pt-20 pb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
                Recent Placements
              </span>
            </div>
            <h2 className="text-4xl font-medium tracking-tight">
              The Hall of <br />
              <span className="font-serif italic text-slate-400">
                Excellence
              </span>
            </h2>
          </div>

          {/* The List */}
          <div className="flex flex-col pb-20">
            {GRADUATES.map((grad, index) => (
              <div
                key={grad.id}
                className="group relative border-t border-slate-200 hover:bg-white transition-colors duration-200 cursor-crosshair"
                onMouseEnter={() => setHoveredGrad(grad.id)}
                onMouseLeave={() => setHoveredGrad(null)}
              >
                <div className="px-8 lg:px-20 py-8 flex items-center justify-between">
                  {/* Left: Info */}
                  <div className="flex flex-col gap-1 z-10">
                    <h4 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {grad.name}
                    </h4>
                    <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
                      <span className="flex items-center gap-1">
                        <Briefcase size={12} /> {grad.role}
                      </span>
                      <span className="hidden sm:flex items-center gap-1">
                        <MapPin size={12} /> {grad.location}
                      </span>
                    </div>
                  </div>

                  {/* Right: Company & Action */}
                  <div className="flex items-center gap-6 z-10">
                    <span className="text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors">
                      {grad.company}
                    </span>
                    <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-600 group-hover:text-white transition-all duration-300">
                      <ArrowUpRight size={18} />
                    </div>
                  </div>
                </div>

                {/* Hover Progress Bar Line at bottom of cell */}
                <div className="absolute bottom-0 left-0 h-[2px] bg-indigo-600 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
              </div>
            ))}
            <div className="border-t border-slate-200"></div>
          </div>

          {/* Mobile View Only Profile (Since Sticky Left is hidden on mobile) */}
          <div className="lg:hidden px-8 pb-20">
            <div className="p-6 bg-white border border-slate-200 rounded-lg">
              <p className="text-sm text-slate-500 italic mb-4">
                "IVTC changed my career trajectory completely."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-200 rounded-full"></div>
                <div>
                  <p className="text-sm font-bold">Sarah Jenkins</p>
                  <p className="text-xs text-slate-400">Google</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementRoster;
