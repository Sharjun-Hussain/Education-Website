"use client";
import React, { useRef, useLayoutEffect } from "react";
import {
  ArrowDown,
  FileText,
  UserCheck,
  CreditCard,
  School,
  ArrowRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: "01",
    title: "Choose Program",
    desc: "Browse our 50+ industry-aligned programs and find the perfect fit for your career goals.",
    icon: <UserCheck className="w-5 h-5" />,
    status: "Explore Catalog",
  },
  {
    id: "02",
    title: "Submit Application",
    desc: "Complete the online profile. Upload your O/L or A/L results and identification documents via the portal.",
    icon: <FileText className="w-5 h-5" />,
    status: "Pending Review",
  },
  {
    id: "03",
    title: "Admission Decision",
    desc: "Receive your official status update. Successful candidates get an offer letter via the student portal.",
    icon: <School className="w-5 h-5" />,
    status: "Awaiting Offer",
  },
  {
    id: "04",
    title: "Enrollment",
    desc: "Accept your offer and pay the registration fee to secure your seat for the upcoming intake.",
    icon: <CreditCard className="w-5 h-5" />,
    status: "Confirmed",
  },
];

const AdmissionsRoadmap = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal Steps (Staggered Entrance)
      gsap.utils.toArray(".step-card").forEach((step) => {
        gsap.from(step, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // 2. Connector Line (Scrub Animation)
      gsap.to(".progress-line-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".steps-container",
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full bg-white text-slate-900 font-sans border-b border-slate-200"
    >
      <div className="flex flex-col lg:flex-row w-full relative">
        {/* --- LEFT COLUMN: Sticky Context (The Spine) --- */}
        <div className="w-full lg:w-1/2 border-r border-slate-200 hidden lg:block">
          <div className="sticky top-20 h-[calc(100vh-5rem)] flex flex-col justify-between p-20">
            <div>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-indigo-600 mb-6">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                Admissions Protocol
              </span>

              {/* Theme Update: Mixed Typography */}
              <h2 className="text-6xl lg:text-7xl font-medium tracking-tighter leading-[0.95] mb-8">
                Your <br />
                <span className="font-serif italic text-slate-400">
                  Journey
                </span>{" "}
                <br />
                Starts Here.
              </h2>

              <p className="text-slate-600 text-lg max-w-sm leading-relaxed">
                Our standardized 4-step intake process is designed to identify
                candidates with the aptitude for technical excellence.
              </p>
            </div>

            {/* Industrial "Status" Widget */}
            <div className="w-full bg-slate-50 border border-slate-200 p-8 rounded-sm">
              <div className="flex justify-between items-end mb-4">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Current Intake
                </span>
                <span className="text-2xl font-bold text-slate-900 leading-none">
                  Oct '24
                </span>
              </div>
              <div className="w-full h-1 bg-slate-200 overflow-hidden">
                <div className="w-[85%] h-full bg-indigo-600"></div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Capacity: 85% Full
                </span>
                <span className="text-[10px] font-bold uppercase text-indigo-600">
                  Closing Soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: The Roadmap (Scrollable) --- */}
        <div className="w-full lg:w-1/2 bg-white relative">
          {/* Mobile Header (Visible only on small screens) */}
          <div className="px-8 pt-20 lg:hidden">
            <h3 className="text-4xl font-medium tracking-tight mb-2">
              How to Apply
            </h3>
            <p className="text-slate-500">
              Follow these steps to secure your enrollment.
            </p>
          </div>

          {/* Steps Container */}
          <div className="steps-container relative px-8 lg:px-20 py-20 lg:py-32">
            {/* The Vertical Rail */}
            <div className="absolute left-12 lg:left-24 top-0 bottom-0 w-[1px] bg-slate-100"></div>
            {/* The Animated Fill Line */}
            <div className="progress-line-fill absolute left-12 lg:left-24 top-0 w-[1px] bg-indigo-600 h-0 z-10"></div>

            {STEPS.map((step) => (
              <div
                key={step.id}
                className="step-card relative pl-16 lg:pl-24 py-10 group"
              >
                {/* Step Node (The Circle on the Line) */}
                <div className="absolute left-[2.9rem] lg:left-[5.9rem] top-14 w-8 h-8 -ml-4 bg-white border-2 border-slate-200 group-hover:border-indigo-600 rounded-full flex items-center justify-center z-20 transition-all duration-300 group-hover:scale-110">
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600 transition-colors">
                    {step.id}
                  </span>
                </div>

                {/* Card Content */}
                <div className="relative p-8 border border-slate-100 bg-slate-50/50 rounded-sm hover:bg-white hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-100 transition-all duration-300">
                  {/* Icon & Label Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-white border border-slate-200 text-slate-600 rounded-md group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors duration-300">
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-indigo-400 transition-colors">
                      {step.status}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-900 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Final CTA Node */}
            <div className="relative pl-16 lg:pl-24 pt-8">
              <div className="absolute left-[2.9rem] lg:left-[5.9rem] top-1/2 -translate-y-1/2 w-3 h-3 -ml-[6px] bg-indigo-600 rounded-full z-20 shadow-[0_0_0_4px_rgba(79,70,229,0.2)]"></div>
              <button className="flex items-center gap-3 px-8 py-4 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors duration-300 shadow-xl shadow-slate-900/10">
                Start Application <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsRoadmap;
