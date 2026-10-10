import React from 'react';
import { EventSettings } from '../types';
import { Award, CheckCircle, ShieldCheck, Phone, MessageCircle } from 'lucide-react';

interface TrainerSectionProps {
  settings: EventSettings;
}

export const TrainerSection: React.FC<TrainerSectionProps> = ({ settings }) => {
  return (
    <section className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full mb-2 font-poppins">
            Organizer & Trainer Profile
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-marathi">
            आयोजक आणि मार्गदर्शक परिचय
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-marathi mt-2">
            अनुभवी मार्गदर्शकांच्या प्रत्यक्ष सल्ल्याने आपल्या व्यवसायाला द्या एक मजबूत गती
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Trainer Image */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl overflow-hidden shadow-xl border-4 border-teal-100 bg-teal-900">
                <img
                  src={settings.trainerImageUrl}
                  alt={settings.trainerName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-teal-950 to-transparent p-3 text-center">
                  <span className="text-[11px] font-bold text-amber-300 font-marathi">
                    {settings.brand}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-900 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200 font-marathi">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>१०+ वर्षे ई-गव्हर्नन्स अनुभव</span>
                </span>
              </div>
            </div>

            {/* Trainer Info */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-teal-700 font-poppins">
                  {settings.organizer}
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-marathi mt-1">
                  {settings.trainerName}
                </h3>
                <div className="text-sm font-semibold text-emerald-800 font-marathi">
                  {settings.trainerRole}
                </div>
              </div>

              <p className="text-sm text-slate-700 font-marathi leading-relaxed">
                {settings.trainerBio}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2 text-xs text-slate-700 font-marathi">
                  <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <span>विश्वासू आणि अधिकृत मार्गदर्शन</span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-700 font-marathi">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>शेकडो केंद्र चालकांचा विश्वास</span>
                </div>
              </div>

              {/* Contact actions if configured */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                {settings.contactPhone ? (
                  <a
                    href={`tel:${settings.contactPhone}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-950 text-xs font-bold border border-teal-200 transition-colors font-poppins"
                  >
                    <Phone className="w-3.5 h-3.5 text-teal-700" />
                    <span>{settings.contactPhone}</span>
                  </a>
                ) : null}

                {settings.whatsappNumber ? (
                  <a
                    href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('नमस्कार, मला E-Seva Business Growth Training बद्दल माहिती हवी आहे.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-200 transition-colors font-marathi"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>व्हॉट्सअ‍ॅपवर संपर्क</span>
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
