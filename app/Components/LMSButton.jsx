import React from 'react';
import Link from 'next/link';
import { MonitorPlay } from 'lucide-react';

const LMSButton = () => {
  return (
    <Link
      href="#"
      className="fixed z-30 flex items-center justify-center gap-3 bg-slate-900 text-white hover:bg-indigo-600 transition-all duration-300 shadow-xl
        bottom-0 left-0 w-full py-5 
        md:bottom-10 md:right-10 md:left-auto md:w-auto md:px-8 md:py-4 md:rounded-full hover:scale-105 active:scale-95"
    >
      <MonitorPlay size={20} />
      <span className="font-bold uppercase tracking-widest text-sm">
        Access the LMS
      </span>
    </Link>
  );
};

export default LMSButton;
