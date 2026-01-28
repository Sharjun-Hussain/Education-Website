"use client";
import React, { useState, useRef, useLayoutEffect } from "react";
import {
  Menu,
  X,
  ChevronRight,
  ArrowUpRight,
  GraduationCap,
  UserPlus,
  Globe,
  Code2,
  BookOpenCheck,
} from "lucide-react";
import gsap from "gsap";
import Link from "next/link";

// --- Configuration Data for Mega Menu ---
const NAV_DATA = {
  About: {
    featured: {
      title: "Our Heritage",
      desc: "Empowering Sri Lankan youth with technical skills since 2010.",
      href: "/about",
      icon: <Globe className="w-8 h-8 text-emerald-600" />,
      image: "bg-emerald-50",
    },
    columns: [
      {
        head: "Institute",
        links: [
          { label: "Our Story", href: "/about/story" },
          { label: "Director Board", href: "/about/board" },
          { label: "Lecturer Panel", href: "/about/lecturers" },
        ],
      },
      {
        head: "Locations",
        links: [
          { label: "Colombo Main", href: "/contact/colombo" },
          { label: "Kandy Branch", href: "/contact/kandy" },
          { label: "Kurunegala", href: "/contact/kurunegala" },
        ],
      },
    ],
  },
  Academics: {
    featured: {
      title: "Higher National Diploma",
      desc: "Complete your HND in Computing and top-up to a UK Degree in 1 year.",
      href: "/academics/hnd",
      icon: <GraduationCap className="w-8 h-8 text-indigo-600" />,
      image: "bg-indigo-50",
    },
    columns: [
      {
        head: "After A/Levels",
        links: [
          { label: "BIT (UCSC) Degree", href: "/academics/bit" },
          { label: "HND in Computing", href: "/academics/hnd" },
          { label: "Diploma in IT (DIT)", href: "/academics/dit" },
          { label: "Foundation for IT", href: "/academics/foundation" },
        ],
      },
      {
        head: "Short Courses",
        links: [
          { label: "Python Programming", href: "/courses/python" },
          { label: "Web Development", href: "/courses/web-dev" },
          { label: "Graphic Design", href: "/courses/design" },
          { label: "Cert. in English", href: "/courses/english" },
        ],
      },
    ],
  },
  Registration: {
    featured: {
      title: "2026 Intake Open",
      desc: "Secure your spot for the upcoming semester. Limited seats available.",
      href: "/register/intake",
      icon: <UserPlus className="w-8 h-8 text-orange-600" />,
      image: "bg-orange-50",
    },
    columns: [
      {
        head: "Academic Reg",
        links: [
          { label: "BIT Registration", href: "/register/bit" },
          { label: "A/L ICT Class Reg", href: "/register/al-ict" },
          { label: "New Student Enrollment", href: "/register/new" },
        ],
      },
      {
        head: "Members & Portals",
        links: [
          { label: "Member Registration", href: "/register/member" },
          { label: "LMS Login Request", href: "/portal/access" },
          { label: "Exam Payment", href: "/payments/exam" },
        ],
      },
    ],
  },
};

const MegaMenuNavbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
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

  // Helper to get data safely
  const currentMenu = activeMenu ? NAV_DATA[activeMenu] : null;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-white text-slate-900 font-sans group/nav"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* Main Navbar Height Container */}
      <div className="relative w-full h-20 bg-white z-50">
        {/* Bottom Border */}
        <div className="nav-border-bot absolute bottom-0 left-0 w-full h-[1px] bg-slate-200 z-20"></div>

        <div className="w-full h-full flex relative">
          {/* --- LEFT SECTOR (Logo) --- */}
          <div className="w-full lg:w-1/3 xl:w-1/2 h-full flex items-center justify-between border-r border-slate-200 nav-divider relative pr-6 bg-white">
            <Link
              href="/"
              className="h-full flex items-center px-6 lg:px-12 hover:bg-slate-50 transition-colors group"
            >
              <div className="nav-content flex flex-col justify-center">
                <span className="font-bold text-xl tracking-tighter leading-none group-hover:translate-x-1 transition-transform">
                  IVTC.
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 mt-1">
                  Education
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

          {/* --- RIGHT SECTOR (Links & Button) --- */}
          <div className="hidden lg:flex w-2/3 xl:w-1/2 h-full bg-white">
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
                  <ChevronRight
                    size={14}
                    className={`transition-transform duration-300 ${activeMenu === key ? "rotate-90 opacity-100" : "opacity-0"}`}
                  />
                </div>
              </div>
            ))}

            {/* CTA Button */}
            <div className="w-40 xl:w-48 h-full">
              <button className="w-full h-full bg-slate-900 text-white hover:bg-indigo-600 transition-colors duration-300 flex items-center justify-center gap-2 group">
                <span className="nav-content text-xs font-bold uppercase tracking-widest">
                  LMS Login
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
      <div
        className={`absolute top-full left-0 w-full bg-white border-b border-slate-200 overflow-hidden transition-all duration-500 ease-in-out origin-top shadow-xl
          ${activeMenu ? "max-h-[400px] opacity-100 visible" : "max-h-0 opacity-0 invisible"}
        `}
      >
        {currentMenu && (
          <div className="w-full flex h-[350px]">
            {/* Left Half: Featured Highlight */}
            <div
              className={`w-1/2 h-full border-r border-slate-200 p-12 flex flex-col justify-end relative ${currentMenu.featured.image}`}
            >
              <div className="absolute top-12 left-12 p-4 bg-white rounded-xl shadow-sm">
                {currentMenu.featured.icon}
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                {currentMenu.featured.title}
              </h3>
              <p className="text-slate-600 max-w-sm mb-6">
                {currentMenu.featured.desc}
              </p>
              <Link
                href={currentMenu.featured.href}
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-indigo-600 transition-colors"
              >
                View Details <ArrowUpRight size={14} />
              </Link>
            </div>

            {/* Right Half: Link Grid */}
            <div className="w-1/2 h-full p-12 bg-white flex gap-12">
              {currentMenu.columns.map((col, idx) => (
                <div key={idx} className="flex-1">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 pb-2 border-b border-slate-100">
                    {col.head}
                  </h4>
                  <ul className="space-y-4">
                    {col.links.map((linkObj, i) => (
                      <li key={i}>
                        <Link
                          href={linkObj.href}
                          className="group flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                        >
                          <span className="w-1 h-1 bg-slate-300 rounded-full group-hover:bg-indigo-500 group-hover:scale-150 transition-all"></span>
                          {linkObj.label}
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

      {/* --- MOBILE DRAWER --- */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-40 pt-24 px-6 transition-transform duration-300 overflow-y-auto ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col gap-8 pb-12">
          {Object.keys(NAV_DATA).map((key) => {
            const item = NAV_DATA[key];
            return (
              <div key={key}>
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  {key}
                </h2>
                {item.columns.map((col, idx) => (
                  <div key={idx} className="mb-4">
                    <h3 className="text-xs font-bold uppercase text-slate-400 mb-2 mt-2">
                      {col.head}
                    </h3>
                    <div className="pl-4 border-l-2 border-slate-100 space-y-3">
                      {col.links.map((linkObj) => (
                        <Link
                          key={linkObj.label}
                          href={linkObj.href}
                          className="block text-slate-600 hover:text-slate-900 py-1"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {linkObj.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MegaMenuNavbar;
