import React from 'react';
import { EventSettings } from '../types';
import { MapPin, Navigation, Phone, MessageSquare, Clock, Calendar, Building2, CheckCircle2 } from 'lucide-react';

interface VenueContactSectionProps {
  settings: EventSettings;
}

export const VenueContactSection: React.FC<VenueContactSectionProps> = ({ settings }) => {
  return (
    <section id="venue" className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full mb-2 font-poppins">
            Event Venue & Office
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-marathi">
            प्रशिक्षण ठिकाण व कार्यालयीन पत्ता
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-marathi mt-2">
            सांगलीच्या मध्यवर्ती भागात वातानुकूलित (AC) कॉन्फरन्स हॉलमध्ये आयोजन
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Training Venue Card */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-teal-100 shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-900 text-xs font-bold border border-teal-200 mb-4 font-marathi">
                <MapPin className="w-3.5 h-3.5 text-teal-700" />
                <span>प्रशिक्षण वेन्यू (Training Venue)</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-marathi mb-2">
                {settings.venue}
              </h3>
              <p className="text-sm text-slate-600 font-marathi mb-6">
                {settings.address}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900 font-marathi mb-1">
                    <Calendar className="w-4 h-4 text-teal-700" />
                    <span>तारीख व वार</span>
                  </div>
                  <div className="text-xs text-slate-700 font-marathi font-medium">
                    {settings.dates} ({settings.days})
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-teal-50/60 border border-teal-100">
                  <div className="flex items-center gap-2 text-xs font-bold text-teal-900 font-marathi mb-1">
                    <Clock className="w-4 h-4 text-teal-700" />
                    <span>वेळ (Training Time)</span>
                  </div>
                  <div className="text-xs text-slate-700 font-marathi font-medium">
                    {settings.time}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-600 font-marathi mb-6">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>सांगली रेल्वे स्टेशन व बस स्थानकापासून अगदी सोयीस्कर अंतर</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>पार्किंग सुविधा व वातानुकूलित (AC) कॉन्फरन्स हॉल</span>
                </div>
              </div>
            </div>

            <a
              href={settings.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-teal-800 hover:bg-teal-900 text-white text-xs sm:text-sm font-extrabold shadow-sm transition-colors font-marathi text-center"
            >
              <Navigation className="w-4 h-4 text-amber-300" />
              <span>गुगल मॅप्सवर लोकेशन पहा (Open in Google Maps)</span>
            </a>
          </div>

          {/* Registered Office Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-teal-950 via-emerald-950 to-teal-900 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold border border-white/20 mb-4 font-marathi">
                <Building2 className="w-3.5 h-3.5" />
                <span>अधिकृत कार्यालय (Office Address)</span>
              </div>

              <h3 className="text-lg sm:text-xl font-bold font-marathi mb-2 text-white">
                {settings.organizer}
              </h3>
              <p className="text-xs text-teal-200 font-poppins mb-6">
                Brand: {settings.brand}
              </p>

              {/* Office address box */}
              <div className="p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xs mb-6">
                <div className="text-[11px] text-amber-300 font-marathi font-bold mb-1">
                  कार्यालयाचा पत्ता:
                </div>
                <p className="text-xs sm:text-sm text-slate-100 font-marathi leading-relaxed">
                  {settings.officeAddress || 'Swara Communication, BJP Office Basement, Near Indian Bank, Sangli-Miraj Road, Vishrambag, Sangli, Maharashtra, India.'}
                </p>
              </div>

              {/* Contact info if configured */}
              {(settings.contactPhone || settings.whatsappNumber) && (
                <div className="space-y-3 mb-6">
                  {settings.contactPhone && (
                    <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                      <div className="text-[11px] text-teal-300 font-marathi mb-0.5">हेल्पलाईन नंबर:</div>
                      <a
                        href={`tel:${settings.contactPhone}`}
                        className="text-base font-extrabold text-amber-300 font-poppins hover:underline block"
                      >
                        {settings.contactPhone}
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              {settings.contactPhone ? (
                <a
                  href={`tel:${settings.contactPhone}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-white text-teal-950 text-xs font-bold hover:bg-slate-100 transition-colors font-marathi"
                >
                  <Phone className="w-4 h-4 text-teal-700" />
                  <span>कॉल करा</span>
                </a>
              ) : null}

              {settings.whatsappNumber ? (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('मला Swara E-Seva Training बद्दल शंका आहे.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-colors font-marathi"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
