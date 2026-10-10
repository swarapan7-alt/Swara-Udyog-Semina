import React from 'react';
import { EventSettings } from '../types';
import {
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  UserCheck,
  Flame,
  Laptop,
  Layers,
  ShieldCheck
} from 'lucide-react';

interface HeroSectionProps {
  settings: EventSettings;
  onOpenRegister: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ settings, onOpenRegister }) => {
  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#FAF9F6] via-[#F2FBF9] to-[#FAF9F6]">
      {/* Background radial ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-teal-100/60 via-emerald-50/40 to-transparent pointer-events-none -z-10 rounded-full blur-3xl" />
      <div className="absolute top-32 right-10 w-72 h-72 bg-orange-100/40 pointer-events-none -z-10 rounded-full blur-2xl" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-950 border border-orange-300 shadow-2xs font-marathi">
            <Flame className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
            <span>केवळ मोजक्या ५० जागा • सांगली कार्यशाळा</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-teal-100 text-teal-950 border border-teal-200 shadow-2xs font-marathi">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>२ दिवसीय प्रॅक्टिकल बिझनेस ग्रोथ प्रशिक्षण</span>
          </div>
        </div>

        {/* Main Headings */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 px-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight sm:leading-snug mb-3.5 font-marathi text-[#064E3B]">
            {settings.marathiHeadline === 'ई-सेवा व्यवसायाला द्या एक नवी दिशा!' ? (
              <>
                <span>ई-सेवा व्यवसायाला द्या </span>
                <span className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-600 bg-clip-text text-transparent inline-block">
                  एक नवी दिशा!
                </span>
              </>
            ) : (
              <span className="bg-gradient-to-r from-[#064E3B] via-teal-800 to-amber-700 bg-clip-text text-transparent">
                {settings.marathiHeadline}
              </span>
            )}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl mx-auto font-marathi font-medium">
            {settings.marathiSubheadline}
          </p>
        </div>

        {/* Grid: Event Card + Media Showcase with 3D Floating Elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          {/* Left Details Card */}
          <div className="lg:col-span-7 bg-white/90 backdrop-blur-xs rounded-3xl p-5 sm:p-7 shadow-lg border border-teal-100 flex flex-col justify-between">
            {/* Quick meta grid */}
            <div className="space-y-4 mb-6">
              {/* Highlighted Date Card */}
              <div className="flex items-start gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50/70 border border-teal-200">
                <div className="w-11 h-11 rounded-xl bg-teal-800 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Calendar className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-teal-900 font-poppins">
                    प्रशिक्षण दिनांक व वार
                  </div>
                  <div className="text-sm sm:text-base font-extrabold text-[#064E3B] font-marathi">
                    {settings.dates} • {settings.days}
                  </div>
                </div>
              </div>

              {/* Time & Venue Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF9F6] border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-poppins">
                      वेळ (Time)
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 font-marathi">
                      {settings.time}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#FAF9F6] border border-slate-200">
                  <div className="w-9 h-9 rounded-xl bg-teal-700 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-poppins">
                      ठिकाण (Venue)
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-slate-800 font-marathi">
                      {settings.venue}
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-3.5 py-2.5 text-xs text-slate-700 flex items-center gap-2 font-marathi bg-amber-50 rounded-xl border border-amber-200/80">
                <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
                <span>{settings.address}</span>
              </div>
            </div>

            {/* Price Box & Direct CTA */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-4">
                <div>
                  <div className="text-xs font-semibold text-slate-500 font-marathi">
                    सीट बुकिंग रक्कम (आत्ता देय)
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-teal-950 font-poppins">
                      ₹{settings.bookingFee}
                    </span>
                    <span className="text-xs text-slate-400 line-through font-poppins">
                      ₹{settings.totalFee}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 font-marathi">
                      सीट सुरक्षित करा
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-marathi">एकूण प्रशिक्षण फी</div>
                  <div className="text-sm font-extrabold text-slate-800 font-poppins">₹{settings.totalFee}</div>
                  <div className="text-[11px] text-amber-800 font-marathi font-bold">
                    उर्वरित ₹{settings.remainingFee} नंतर देय
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={settings.razorpayUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-black text-white bg-gradient-to-r from-orange-600 via-orange-500 to-amber-600 hover:from-orange-700 hover:to-orange-600 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-marathi text-center"
                >
                  <span>₹{settings.bookingFee} मध्ये सीट बुक करा</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </a>

                <button
                  onClick={onOpenRegister}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-bold text-teal-950 bg-teal-50 hover:bg-teal-100 border border-teal-200 rounded-2xl transition-colors font-marathi"
                >
                  <UserCheck className="w-4 h-4 text-teal-700" />
                  <span>नोंदणी तपशील भरा</span>
                </button>
              </div>

              <p className="mt-2.5 text-[11px] text-center sm:text-left text-slate-500 font-marathi">
                🔒 अधिकृत Razorpay पेमेंट गेटवे. पेमेंट होताच त्वरित ई-पावती प्राप्त होते.
              </p>
            </div>
          </div>

          {/* Right Image Showcase with Tasteful 3D-style Floating Badges */}
          <div className="lg:col-span-5 relative rounded-3xl overflow-hidden shadow-xl border border-teal-100 min-h-[300px] sm:min-h-[380px] bg-teal-950 flex flex-col justify-end">
            <img
              src={settings.heroImageUrl}
              alt="E-Seva Business Training"
              className="absolute inset-0 w-full h-full object-cover opacity-85 transition-transform duration-700 hover:scale-105"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-teal-950 via-teal-950/40 to-transparent" />

            {/* Floating 3D-Style Decorative Glass Cards */}
            {/* Top-Right Badge: Business Growth */}
            <div className="animate-float absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-white/60 flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase font-poppins">बिझनेस ग्रोथ</div>
                <div className="text-xs font-black text-slate-900 font-marathi">प्रॅक्टिकल रणनीती</div>
              </div>
            </div>

            {/* Mid-Left Badge: Practical Learning */}
            <div className="animate-float-reverse absolute top-28 left-4 z-20 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-white/60 hidden sm:flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Laptop className="w-4 h-4 text-amber-300" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase font-poppins">लाईव्ह सराव</div>
                <div className="text-xs font-black text-slate-900 font-marathi">हँड्स-ऑन प्रॅक्टिकल</div>
              </div>
            </div>

            {/* Bottom floating details */}
            <div className="relative z-10 p-5 sm:p-6 text-white">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-amber-400 text-teal-950 text-xs font-black mb-2 shadow-sm font-marathi">
                <Award className="w-3.5 h-3.5" />
                <span>अधिकृत कोर्स प्रमाणपत्र समाविष्ट</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white font-marathi leading-snug">
                {settings.organizer}
              </h3>
              <p className="text-xs text-teal-200 font-marathi mt-1">
                चहा, सकाळचा नाश्ता, रुचकर दुपारचे जेवण आणि लाईफटाईम कम्युनिटी सपोर्ट समाविष्ट.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Highlights Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'चहा व नाश्ता', sub: 'दोन्ही दिवस मोफत व्यवस्था' },
            { label: 'स्वादिष्ट जेवण', sub: 'हॉटेल सीजन फोर येथे' },
            { label: 'कोर्स सर्टिफिकेट', sub: 'अधिकृत प्रमाणपत्र' },
            { label: 'प्रॅक्टिकल ज्ञान', sub: 'संगणकावर प्रत्यक्ष सराव' }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/80 backdrop-blur-xs p-3.5 rounded-2xl border border-teal-100 text-center shadow-xs hover:border-teal-200 transition-colors"
            >
              <div className="text-xs sm:text-sm font-extrabold text-teal-950 font-marathi">{item.label}</div>
              <div className="text-[11px] text-slate-500 font-marathi">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
