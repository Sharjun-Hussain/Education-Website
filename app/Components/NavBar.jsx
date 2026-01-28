"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  BookOpen,
  MapPin,
  Users,
} from "lucide-react";
import gsap from "gsap";
import Link from "next/link";

// --- Configuration Data for Mega Menu ---
const NAV_DATA = {
  Programs: {
    featured: {
      title: "Software Engineering",
      desc: "Our flagship 4-year degree focusing on full-stack architecture.",
      icon: <BookOpen className="w-8 h-8 text-indigo-500" />,
      image: "bg-indigo-50", // You can use a real image url here
    },
    columns: [
      {
        head: "Degree",
        links: [
          "Computer Science",
          "Software Eng.",
          "Data Science",
          "Cyber Security",
        ],
      },
      {
        head: "Vocational",
        links: [
          "Network Admin",
          "UI/UX Design",
          "Cloud Computing",
          "IoT Systems",
        ],
      },
    ],
  },
  Campus: {
    featured: {
      title: "The Tech Park",
      desc: "Explore our state-of-the-art labs and co-working spaces.",
      icon: <MapPin className="w-8 h-8 text-emerald-500" />,
      image: "bg-emerald-50",
    },
    columns: [
      {
        head: "Locations",
        links: ["Colombo Main", "Kandy Hub", "Galle Branch"],
      },
      {
        head: "Life",
        links: ["Student Union", "Sports Complex", "Events", "Housing"],
      },
    ],
  },
  Community: {
    featured: {
      title: "Alumni Network",
      desc: "Connect with over 5,000 graduates working globally.",
      icon: <Users className="w-8 h-8 text-orange-500" />,
      image: "bg-orange-50",
    },
    columns: [
      {
        head: "Connect",
        links: ["Mentorship", "Job Portal", "Events"],
      },
      {
        head: "Research",
        links: ["Publications", "Labs", "Partnerships"],
      },
    ],
  },
};

const MegaMenuNavbar = () => {
  const [activeMenu, setActiveMenu] = useState(null); // 'Programs' | 'Campus' | 'Community' | null
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  // --- GSAP Entrance ---
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".nav-border-bot", { scaleX: 0, duration: 1, ease: "expo.out" })
        .from(
          ".nav-divider",
          { scaleY: 0, duration: 0.8, stagger: 0.1, ease: "power3.inOut" },
          "-=0.5",
        )
        .from(
          ".nav-content",
          { y: 10, opacity: 0, duration: 0.5, stagger: 0.05 },
          "-=0.3",
        );
    }, navRef);
    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-white text-slate-900 font-sans group/nav"
      onMouseLeave={() => setActiveMenu(null)} // Close menu when leaving the entire nav area
    >
      {/* Main Navbar Height Container */}
      <div className="relative w-full h-20 bg-white z-50">
        {/* Bottom Border */}
        <div className="nav-border-bot absolute bottom-0 left-0 w-full h-[1px] bg-slate-200 z-20"></div>

        <div className="w-full h-full flex relative">
          {/* --- LEFT SECTOR (50% - Matches Hero) --- */}
          <div className="w-full lg:w-1/2 h-full flex items-center justify-between border-r border-slate-200 nav-divider relative pr-6 bg-white">
            <Link
              href="/"
              className="h-full flex items-center px-8 lg:px-12 hover:bg-slate-50 transition-colors group"
            >
              <div className="nav-content flex flex-col justify-center">
                <span className="font-bold text-xl tracking-tighter leading-none group-hover:translate-x-1 transition-transform">
                  IVTC.
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
                  Vocational Tech
                </span>
              </div>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-16 h-full border-l border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* --- RIGHT SECTOR (50% - Links & Apply) --- */}
          <div className="hidden lg:flex w-1/2 h-full bg-white">
            {/* Dynamic Links from Data */}
            {Object.keys(NAV_DATA).map((key) => (
              <div
                key={key}
                onMouseEnter={() => setActiveMenu(key)}
                className={`flex-1 h-full border-r border-slate-200 nav-divider relative cursor-pointer transition-colors duration-300
                  ${activeMenu === key ? "bg-slate-900 text-white" : "hover:bg-slate-50 text-slate-500 hover:text-slate-900"}
                `}
              >
                <div className="w-full h-full flex items-center justify-center gap-2">
                  <span className="nav-content text-xs font-bold uppercase tracking-widest">
                    {key}
                  </span>
                  {/* Active Indicator Chevron */}
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-300 ${activeMenu === key ? "rotate-90 opacity-100" : "opacity-0"}`}
                  />
                </div>
              </div>
            ))}

            {/* Apply Button (Fixed Width) */}
            <div className="w-48 h-full">
              <button className="w-full h-full bg-slate-900 text-white hover:bg-indigo-600 transition-colors duration-300 flex items-center justify-center gap-2 group">
                <span className="nav-content text-xs font-bold uppercase tracking-widest">
                  Apply Now
                </span>
                <ArrowUpRight
                  size={14}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- MEGA MENU DRAWER --- */}
      {/* Absolute positioned below navbar */}
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden transition-all duration-500 ease-in-out origin-top shadow-xl
          ${activeMenu ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}
        `}
      >
        {activeMenu && NAV_DATA[activeMenu] && (
          <div className="w-full flex h-[350px]">
            {/* Left Half: The Featured Highlight (Maintains 50% split) */}
            <div
              className={`w-1/2 h-full border-r border-slate-200 p-12 flex flex-col justify-end relative ${NAV_DATA[activeMenu].featured.image}`}
            >
              {/* Icon */}
              <div className="absolute top-12 left-12 p-4 bg-white rounded-xl shadow-sm">
                {NAV_DATA[activeMenu].featured.icon}
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                {NAV_DATA[activeMenu].featured.title}
              </h3>
              <p className="text-slate-600 max-w-sm mb-6">
                {NAV_DATA[activeMenu].featured.desc}
              </p>
              <Link
                href="#"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-indigo-600 transition-colors"
              >
                Learn More <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Right Half: Link Grid */}
            <div className="w-1/2 h-full p-12 bg-white flex gap-12">
              {NAV_DATA[activeMenu].columns.map((col, idx) => (
                <div key={idx} className="flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 pb-2 border-b border-slate-100">
                    {col.head}
                  </h4>
                  <ul className="space-y-4">
                    {col.links.map((link) => (
                      <li key={link}>
                        <Link
                          href="#"
                          className="group flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                        >
                          <span className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-indigo-500 group-hover:scale-150 transition-all"></span>
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- MOBILE DRAWER (Simplified) --- */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 pt-24 px-6 transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-6">
          {Object.keys(NAV_DATA).map((key) => (
            <div key={key}>
              <h2 className="text-2xl font-bold mb-4">{key}</h2>
              <div className="pl-4 border-l-2 border-slate-100 space-y-3">
                {NAV_DATA[key].columns[0].links.map((link) => (
                  <div key={link} className="text-slate-600">
                    {link}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MegaMenuNavbar;
