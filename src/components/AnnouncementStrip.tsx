import React from 'react';
import { EventSettings } from '../types';
import { Calendar, Clock, MapPin, Sparkles, ArrowRight, Flame } from 'lucide-react';

interface AnnouncementStripProps {
  settings: EventSettings;
  onOpenRegister: () => void;
}

export const AnnouncementStrip: React.FC<AnnouncementStripProps> = ({ settings, onOpenRegister }) => {
  const items = [
    {
      icon: <Calendar className="w-3.5 h-3.5 text-amber-300" />,
      text: `तारीख: ${settings.dates} (${settings.days})`,
    },
    {
      icon: <Clock className="w-3.5 h-3.5 text-amber-300" />,
      text: `वेळ: ${settings.time}`,
    },
    {
      icon: <MapPin className="w-3.5 h-3.5 text-amber-300" />,
      text: `ठिकाण: ${settings.venue}, सांगली`,
    },
    {
      icon: <Flame className="w-3.5 h-3.5 text-orange-400" />,
      text: `विशेष ऑफर: फक्त ₹${settings.bookingFee} मध्ये सीट बुक करा (एकूण फी ₹${settings.totalFee})`,
    },
    {
      icon: <Sparkles className="w-3.5 h-3.5 text-emerald-300" />,
      text: `१००% प्रॅक्टिकल ट्रेनिंग • चहा, नाश्ता, जेवण व प्रमाणपत्र समाविष्ट`,
    },
  ];

  return (
    <div
      className="relative z-30 bg-gradient-to-r from-teal-900 via-emerald-900 to-teal-950 text-white border-b border-teal-700/40 shadow-xs overflow-hidden"
      role="region"
      aria-label="Event Announcements"
    >
      <div className="max-w-full overflow-hidden py-2 px-2 flex items-center">
        {/* Left fixed badge for clarity */}
        <div className="shrink-0 hidden md:flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-coral-500/20 bg-orange-500/20 text-amber-300 text-xs font-bold border border-amber-400/30 mr-3 font-marathi">
          <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping" />
          <span>लाइव्ह अपडेट्स:</span>
        </div>

        {/* Looping marquee track */}
        <div className="flex overflow-hidden w-full select-none">
          <div className="animate-marquee flex items-center gap-8 text-xs font-marathi whitespace-nowrap">
            {/* Repeated twice for seamless infinite loop */}
            {[...items, ...items, ...items].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-medium text-slate-100">
                  {item.icon}
                  <span>{item.text}</span>
                </span>
                <span className="text-amber-400/60 font-black">•</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA trigger */}
        <div className="shrink-0 ml-3 hidden sm:block">
          <a
            href={settings.razorpayUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-400 hover:bg-amber-300 text-teal-950 text-[11px] font-extrabold shadow-xs transition-colors font-marathi"
          >
            <span>सीट बुक (₹{settings.bookingFee})</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};
