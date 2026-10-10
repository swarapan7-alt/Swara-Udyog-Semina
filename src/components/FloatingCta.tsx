import React from 'react';
import { EventSettings } from '../types';
import { ArrowRight, MessageCircle } from 'lucide-react';

interface FloatingCtaProps {
  settings: EventSettings;
  onOpenRegister: () => void;
}

export const FloatingCta: React.FC<FloatingCtaProps> = ({ settings, onOpenRegister }) => {
  return (
    <>
      {/* Floating WhatsApp button */}
      {settings.whatsappNumber ? (
        <a
          href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('नमस्कार! मला Swara E-Seva Training बद्दल माहिती हवी आहे.')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ring-4 ring-emerald-300/40"
          title="WhatsApp Support"
          aria-label="WhatsApp Support"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      ) : null}

      {/* Sticky Mobile Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-teal-100 p-3 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-slate-500 font-marathi">सीट बुकिंग रक्कम</div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-teal-950 font-poppins">
                ₹{settings.bookingFee}
              </span>
              <span className="text-[10px] text-slate-400 font-poppins">
                (एकूण ₹{settings.totalFee})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenRegister}
              className="px-3 py-2 text-xs font-bold text-teal-900 bg-teal-50 rounded-xl border border-teal-200 font-marathi"
            >
              नोंदणी
            </button>

            <a
              href={settings.razorpayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-black text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl shadow-md font-marathi"
            >
              <span>सीट बुक करा</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
