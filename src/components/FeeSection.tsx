import React from 'react';
import { EventSettings } from '../types';
import { Check, ShieldCheck, ArrowRight, AlertCircle, Zap } from 'lucide-react';

interface FeeSectionProps {
  settings: EventSettings;
}

export const FeeSection: React.FC<FeeSectionProps> = ({ settings }) => {
  return (
    <section id="fee-section" className="py-12 sm:py-16 bg-gradient-to-b from-[#FAF9F6] via-[#F0FDF4] to-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full mb-2 font-poppins">
            Transparent Pricing
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-marathi">
            प्रशिक्षण फी आणि सुलभ पेमेंट रचना
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-marathi mt-2">
            कोणतीही छुपी फी नाही. आजच फक्त ₹४९९ भरून आपली सीट निश्चित करा.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="bg-white rounded-3xl border-2 border-teal-200 shadow-xl overflow-hidden relative">
          {/* Top Decorative Banner */}
          <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-teal-950 px-6 py-4 text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-300" />
              <span className="font-bold text-sm sm:text-base font-marathi">
                स्वरा उद्योग समूह - विशेष मर्यादित सीट ऑफर
              </span>
            </div>
            <div className="bg-amber-400 text-teal-950 text-xs font-extrabold px-3 py-1 rounded-full font-marathi">
              मर्यादित ५० जागा
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Breakdown */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-poppins mb-1">
                    Seat Booking Amount
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl sm:text-5xl font-black text-teal-950 font-poppins">
                      ₹{settings.bookingFee}
                    </span>
                    <span className="text-sm font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 font-marathi">
                      आत्ता फक्त एवढेच भरायचे
                    </span>
                  </div>
                </div>

                {/* Clear Breakdown Table */}
                <div className="space-y-3 bg-[#FAF9F6] p-4 rounded-2xl border border-teal-100">
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-200">
                    <span className="text-slate-700 font-marathi font-medium">१. एकूण प्रशिक्षण फी (Total Fee):</span>
                    <span className="font-extrabold text-slate-900 font-poppins">₹{settings.totalFee}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-200">
                    <span className="text-teal-950 font-marathi font-bold">२. सीट बुकिंग रक्कम (आज देय):</span>
                    <span className="font-extrabold text-teal-900 font-poppins">₹{settings.bookingFee}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5">
                    <span className="text-orange-950 font-marathi font-bold">३. उर्वरित शिल्लक (Remaining Balance):</span>
                    <span className="font-extrabold text-orange-900 font-poppins">₹{settings.remainingFee}</span>
                  </div>
                </div>

                {/* Explicit Explanation */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 font-marathi">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">महत्त्वाची नोंद: </span>
                    {settings.remainingBalanceNote}
                  </div>
                </div>
              </div>

              {/* Right CTA Box */}
              <div className="lg:col-span-5 bg-gradient-to-br from-teal-950 via-emerald-950 to-teal-900 text-white rounded-2xl p-6 shadow-lg flex flex-col justify-between">
                <div>
                  <div className="text-xs uppercase font-extrabold text-amber-300 font-poppins mb-1">
                    Instant Online Booking
                  </div>
                  <h3 className="text-xl font-bold text-white font-marathi mb-4">
                    आपली जागा आजच निश्चित करा
                  </h3>

                  <ul className="space-y-2.5 text-xs sm:text-sm text-teal-100 mb-6 font-marathi">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>दोन्ही दिवस चहा, नाश्ता आणि रुचकर जेवण</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>प्रॅक्टिकल ट्रेनिंग व अधिकृत सर्टिफिकेशन</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>हॉटेल सीजन फोर, सांगली येथे वातानुकूलित हॉल</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>सुरक्षित Razorpay पेमेंट व झटपट ई-पावती</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <a
                    href={settings.razorpayUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-black text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 font-marathi text-center"
                  >
                    <span>सीट बुक करा (₹{settings.bookingFee})</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>

                  <div className="mt-3 flex items-center justify-center gap-2 text-[11px] text-teal-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>SSL सुरक्षित Razorpay पेमेंट लिंक</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
