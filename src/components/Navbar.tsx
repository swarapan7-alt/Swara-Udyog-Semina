import React from 'react';
import { EventSettings } from '../types';
import { ShieldCheck, Calendar, ArrowRight, Lock } from 'lucide-react';

interface NavbarProps {
  settings: EventSettings;
  onOpenRegister: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ settings, onOpenRegister, onOpenAdmin }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-teal-100 shadow-xs">
      {/* Top micro bar */}
      <div className="bg-gradient-to-r from-teal-950 via-emerald-950 to-teal-900 text-white text-xs py-1.5 px-4 border-b border-teal-800/40">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 px-2 py-0.5 rounded-full text-[11px] font-medium border border-amber-400/30 font-marathi">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
              सांगली प्रत्यक्ष कार्यशाळा
            </span>
            <span className="hidden sm:inline font-marathi text-emerald-100">
              {settings.dates} • {settings.venue}
            </span>
            <span className="sm:hidden font-marathi text-emerald-100">
              १७-१८ ऑक्टोबर २०२६ • सांगली
            </span>
          </div>

          <div className="flex items-center gap-4 mx-auto sm:mx-0 text-[11px] text-teal-200">
            <span className="font-poppins font-medium text-amber-300">
              सीट बुकिंग: <strong className="text-white">₹{settings.bookingFee}</strong>
            </span>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1 hover:text-white transition-colors underline decoration-dotted text-teal-300"
              title="प्रशासक लॉगिन"
            >
              <Lock className="w-3 h-3" />
              <span>अ‍ॅडमिन लॉगिन</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-3.5 flex items-center justify-between gap-3">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-teal-700 via-emerald-700 to-teal-900 flex items-center justify-center text-white shadow-sm ring-2 ring-teal-100 flex-shrink-0">
            {settings.logoUrl ? (
              <img
                src={settings.logoUrl}
                alt="Logo"
                className="w-full h-full object-cover rounded-xl"
                onError={(e) => {
                  (e.currentTarget as HTMLElement).style.display = 'none';
                }}
              />
            ) : (
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm sm:text-base text-teal-950 font-marathi tracking-tight leading-none">
                {settings.organizer}
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-emerald-700 font-poppins font-medium tracking-wide">
              {settings.brand}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenRegister}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-teal-900 bg-teal-50 hover:bg-teal-100 rounded-xl border border-teal-200 transition-all font-marathi"
          >
            नाव नोंदणी
          </button>

          <a
            href={settings.razorpayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-extrabold text-white bg-gradient-to-r from-teal-700 via-emerald-600 to-teal-800 hover:from-teal-800 hover:to-emerald-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-marathi"
          >
            <span>सीट बुक करा (₹{settings.bookingFee})</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
          </a>
        </div>
      </div>
    </header>
  );
};
