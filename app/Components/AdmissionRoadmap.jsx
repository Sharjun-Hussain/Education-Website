"use client";
import React, { useRef, useLayoutEffect } from "react";
import {
  ArrowDown,
  Check,
  FileText,
  UserCheck,
  CreditCard,
  School,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    id: "01",
    title: "Submit Application",
    desc: "Complete the online profile. Upload your O/L or A/L results and identification documents via the portal.",
    icon: <FileText className="w-6 h-6" />,
    status: "Pending",
  },
  {
    id: "02",
    title: "Aptitude Test",
    desc: "Qualified candidates will receive a link to our logic & coding potential assessment (No prior coding knowledge required).",
    icon: <UserCheck className="w-6 h-6" />,
    status: "Assessment",
  },
  {
    id: "03",
    title: "Panel Interview",
    desc: "A 20-minute discussion with our faculty to assess your career goals and cultural fit.",
    icon: <School className="w-6 h-6" />,
    status: "Review",
  },
  {
    id: "04",
    title: "Enrollment",
    desc: "Receive your offer letter. Pay the registration fee to secure your seat for the upcoming intake.",
    icon: <CreditCard className="w-6 h-6" />,
    status: "Confirmed",
  },
];

const AdmissionsRoadmap = () => {
  const container = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Reveal the Steps individually
      gsap.utils.toArray(".step-card").forEach((step, i) => {
        gsap.from(step, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%", // Triggers when top of element hits 85% of viewport height
            toggleActions: "play none none reverse",
          },
        });
      });

      // 2. Animate the "Connector Line" (The vertical bar)
      // This animates the height of the black fill line
      gsap.to(".progress-line-fill", {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: ".steps-container",
          start: "top center",
          end: "bottom center",
          scrub: 0.5, // Links animation to scroll speed
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
        {/* --- LEFT COLUMN: Sticky Instructions --- */}
        {/* Note: 'lg:top-20' handles the fixed Navbar height */}
        <div className="w-full lg:w-1/2 border-r border-slate-200 hidden lg:block">
          <div className="sticky top-20 h-[calc(100vh-5rem)] flex flex-col justify-between p-20">
            <div>
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                Admissions 2024
              </span>

              <h2 className="text-6xl font-medium tracking-tighter leading-[1.05] mb-8">
                Your <br /> Journey <br /> Starts Here.
              </h2>

              <p className="text-slate-600 text-lg max-w-sm leading-relaxed">
                Our 4-step intake process ensures we find students with the grit
                and passion to succeed in the tech industry.
              </p>
            </div>

            {/* Dynamic Status Box */}
            <div className="w-full bg-slate-50 border border-slate-200 p-8 rounded-sm">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                  Current Intake
                </span>
                <span className="text-2xl font-bold text-slate-900">
                  Oct '24
                </span>
              </div>
              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                <div className="w-[70%] h-full bg-indigo-600"></div>
              </div>
              <div className="mt-2 text-right">
                <span className="text-[10px] font-bold uppercase text-indigo-600">
                  Closing Soon
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT COLUMN: The Steps (Scrollable) --- */}
        <div className="w-full lg:w-1/2 bg-white relative">
          <div className="px-8 lg:px-20 pt-20 pb-10 lg:pt-32">
            <h3 className="lg:hidden text-4xl font-bold mb-10">How to Apply</h3>
          </div>

          {/* Steps Container */}
          <div className="steps-container relative px-8 lg:px-20 pb-32">
            {/* The Vertical "Rail" Line (Background) */}
            <div className="absolute left-12 lg:left-24 top-0 bottom-0 w-[1px] bg-slate-200"></div>

            {/* The Vertical "Fill" Line (Animated) */}
            <div className="progress-line-fill absolute left-12 lg:left-24 top-0 w-[1px] bg-indigo-600 h-0 z-10"></div>

            {/* Loop Steps */}
            {STEPS.map((step, index) => (
              <div
                key={step.id}
                className="step-card relative pl-16 lg:pl-20 py-12 group"
              >
                {/* The Node/Dot on the line */}
                {/* We use a white border to 'cut' the line visually */}
                <div className="absolute left-[0.1rem] lg:left-[0.1rem] top-16 w-8 h-8 -ml-4 bg-white border-2 border-slate-200 group-hover:border-indigo-600 rounded-full flex items-center justify-center z-20 transition-colors duration-500">
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-indigo-600">
                    {step.id}
                  </span>
                </div>

                {/* Content Card */}
                <div className="relative border border-slate-100 bg-slate-50 p-8 hover:bg-white hover:shadow-xl hover:border-indigo-100 transition-all duration-300 rounded-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-white border border-slate-200 text-slate-900 rounded-md group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-colors duration-300">
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 group-hover:text-indigo-300 transition-colors">
                      Step {step.id}
                    </span>
                  </div>

                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-900 transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Final "Complete" Node */}
            <div className="relative pl-16 lg:pl-20 pt-8">
              <div className="absolute left-[0.1rem] lg:left-[0.1rem] top-12 w-4 h-4 -ml-2 bg-indigo-600 rounded-full z-20 shadow-[0_0_0_8px_rgba(79,70,229,0.2)]"></div>
              <button className="px-8 py-4 bg-slate-900 text-white font-bold uppercase tracking-widest hover:bg-indigo-600 transition-colors duration-300 flex items-center gap-2">
                Start Application <ArrowDown size={16} className="-rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdmissionsRoadmap;
