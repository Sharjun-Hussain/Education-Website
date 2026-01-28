"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import {
  ArrowRight,
  Clock,
  Award,
  CheckCircle,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const COURSES = [
  {
    id: 1,
    title: "Software Engineering",
    category: "BSc (Hons)",
    duration: "4 Years",
    level: "Level 6",
    image:
      "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    desc: "Master full-stack architecture, algorithms, and system design. Built for future CTOs.",
    tags: ["React", "Node.js", "System Design"],
  },
  {
    id: 2,
    title: "Data Science & AI",
    category: "MSc",
    duration: "2 Years",
    level: "Level 7",
    image:
      "https://images.pexels.com/photos/17483874/pexels-photo-17483874/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-depicts-how-ai-could-help-understand-ecosystems-and-identify-species-it-was-created-by-nidia-dias-as-part-of-the-v.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    desc: "Harness the power of machine learning and big data analytics to solve complex problems.",
    tags: ["Python", "TensorFlow", "Statistics"],
  },
  {
    id: 3,
    title: "Cloud Computing",
    category: "Diploma",
    duration: "12 Months",
    level: "Level 5",
    image:
      "https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    desc: "Architect scalable infrastructure using AWS and Azure. Focus on DevOps and security.",
    tags: ["AWS", "Docker", "K8s"],
  },
  {
    id: 4,
    title: "Cyber Security",
    category: "BSc (Hons)",
    duration: "3 Years",
    level: "Level 6",
    image:
      "https://images.pexels.com/photos/5380642/pexels-photo-5380642.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    desc: "Defend networks and systems against evolving digital threats. Ethical hacking focus.",
    tags: ["NetSec", "Ethical Hacking"],
  },
];

const ProgramExplorer = () => {
  const [activeId, setActiveId] = useState(1);
  const containerRef = useRef(null);
  const activeCourse = COURSES.find((c) => c.id === activeId);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. The "Spine" Line Animation
      // This draws the vertical line down, connecting visually with the header
      gsap.from(".spine-line", {
        scaleY: 0,
        duration: 1.5,
        ease: "power3.inOut",
        transformOrigin: "top center",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%", // Starts when section enters view
        },
      });

      // 2. Staggered List Entrance
      gsap.from(".course-card-anim", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".course-list-trigger",
          start: "top 75%",
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white text-slate-900 font-sans border-b border-slate-200"
    >
      <div className="flex flex-col lg:flex-row w-full relative">
        {/* --- LEFT COLUMN: Sticky Preview (The "Viewscreen") --- */}
        {/* Note: 'lg:top-20' matches the h-20 header exactly */}
        {/* Note: 'h-[calc(100vh-5rem)]' ensures full height minus header */}
        <div className="w-full lg:w-1/2 border-r border-slate-200 spine-line relative hidden lg:block">
          <div className="sticky top-20 h-[calc(100vh-5rem)] w-full flex flex-col justify-center p-12 xl:p-20 overflow-hidden">
            {/* Decorative Background Number */}
            <span className="absolute top-10 right-10 text-[10rem] font-bold text-slate-50 select-none -z-10 leading-none">
              0{activeId}
            </span>

            {/* Catalog Header */}
            <div className="mb-8 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-indigo-600"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">
                Course Details
              </span>
            </div>

            {/* Image Frame */}
            <div className="relative w-full aspect-[16/9] overflow-hidden bg-slate-100 shadow-2xl mb-8 group">
              {COURSES.map((course) => (
                <img
                  key={course.id}
                  src={course.image}
                  alt={course.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out transform
                      ${activeId === course.id ? "opacity-100 scale-100" : "opacity-0 scale-110"}
                    `}
                />
              ))}
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-12">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-2">
                  Duration
                </span>
                {/* Key triggers re-animation on change */}
                <span
                  key={`d-${activeId}`}
                  className="text-3xl font-light animate-in fade-in slide-in-from-bottom-3 duration-500 block"
                >
                  {activeCourse.duration}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 block mb-2">
                  Qualification
                </span>
                <span
                  key={`l-${activeId}`}
                  className="text-3xl font-light animate-in fade-in slide-in-from-bottom-3 duration-500 delay-100 block"
                >
                  {activeCourse.level}
                </span>
              </div>
            </div>

            <p className="mt-8 text-slate-500 leading-relaxed text-sm max-w-md">
              {activeCourse.desc}
            </p>
          </div>
        </div>

        {/* --- RIGHT COLUMN: Scrollable List --- */}
        {/* Adds top padding to prevent content hitting header immediately */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white z-10">
          {/* Section Header */}
          <div className="px-8 lg:px-20 pt-20 lg:pt-32 pb-16">
            <h2 className="text-4xl lg:text-5xl font-medium tracking-tight mb-6">
              Academic <br />
              <span className="text-slate-400 font-serif italic">Pathways</span>
            </h2>
            <p className="text-slate-600 max-w-xs text-sm leading-relaxed">
              Select a program to view curriculum details. All degrees are UGC
              recognized.
            </p>
          </div>

          {/* Interactive List */}
          <div className="flex flex-col course-list-trigger pb-20">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="course-card-anim group relative border-t border-slate-200 cursor-pointer overflow-hidden"
                onMouseEnter={() => setActiveId(course.id)}
              >
                {/* Hover Background Fill */}
                <div
                  className={`absolute inset-0 bg-slate-50 transition-transform duration-500 origin-left ease-out
                     ${activeId === course.id ? "scale-x-100" : "scale-x-0"}
                  `}
                ></div>

                <div className="relative p-8 lg:p-12 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <span
                      className={`text-xs font-bold uppercase tracking-widest transition-colors duration-300
                           ${activeId === course.id ? "text-indigo-600" : "text-slate-400"}
                        `}
                    >
                      {course.category}
                    </span>
                    <ChevronRight
                      className={`transition-transform duration-300 ${activeId === course.id ? "text-indigo-600 translate-x-2" : "text-slate-300"}`}
                      size={20}
                    />
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 z-10">
                    {course.title}
                  </h3>

                  {/* Mobile Only Desc (Visible on small screens where sticky is hidden) */}
                  <p className="lg:hidden text-sm text-slate-500 mt-2">
                    {course.desc}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-2 z-10">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`text-[10px] uppercase font-bold px-2 py-1 border transition-colors duration-300
                              ${activeId === course.id ? "bg-white border-slate-300 text-slate-800" : "bg-transparent border-transparent text-slate-400"}
                           `}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div className="border-t border-slate-200"></div>
          </div>

          {/* Bottom CTA */}
          <div className="px-8 lg:px-20 pb-20">
            <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors duration-300">
              Download Prospectus <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramExplorer;
