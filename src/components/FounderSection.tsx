import React from 'react';
import { EventSettings } from '../types';
import { Award, Briefcase, Building2, CheckCircle2, ShieldCheck, User, Camera, Sparkles } from 'lucide-react';

interface FounderSectionProps {
  settings: EventSettings;
  onOpenAdmin?: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ settings, onOpenAdmin }) => {
  const hasPhoto = Boolean(settings.founderImageUrl && settings.founderImageUrl.trim().length > 0);
  const positionClass = settings.founderImagePosition === 'top'
    ? 'object-top'
    : settings.founderImagePosition === 'bottom'
    ? 'object-bottom'
    : 'object-center';
  const scaleStyle = settings.founderImageScale ? { transform: `scale(${settings.founderImageScale})` } : {};

  return (
    <section id="founder-profile" className="py-12 sm:py-16 bg-gradient-to-b from-[#FAF9F6] via-[#F0FDF4] to-[#FAF9F6] border-t border-teal-100/60">
      <div className="max-w-5xl mx-auto px-4">
        {/* Section Tag */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3.5 py-1 rounded-full mb-2.5 font-poppins shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-teal-700" />
            <span>Leadership & Vision</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#064E3B] font-marathi">
            संस्थापक व मुख्य मार्गदर्शक परिचय
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-marathi mt-2">
            स्वरा उद्योग समूहाचे नेतृत्व आणि ई-सेवा केंद्र चालकांसाठीचे ध्येय
          </p>
        </div>

        {/* Founder Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-teal-100 shadow-xl relative overflow-hidden">
          {/* Subtle decorative background gradient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-teal-100/40 via-emerald-50/30 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Founder Portrait Column - Photo with details directly below */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-xs bg-[#FAF9F6] p-4 rounded-3xl border border-teal-100/80 shadow-md flex flex-col items-center">
                {/* Photograph */}
                <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-white ring-2 ring-teal-200 bg-gradient-to-b from-teal-900 to-emerald-950 flex flex-col items-center justify-center">
                  {hasPhoto ? (
                    <img
                      src={settings.founderImageUrl}
                      alt={settings.founderName || 'Founder & CEO'}
                      className={`w-full h-full object-cover transition-transform duration-300 ${positionClass}`}
                      style={scaleStyle}
                    />
                  ) : (
                    /* Clean, dignified placeholder when no photo is uploaded yet (Never a fake/stock photo) */
                    <div className="p-6 text-center text-teal-100 flex flex-col items-center justify-center h-full">
                      <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-dashed border-teal-300 flex items-center justify-center mb-3 text-teal-200">
                        <User className="w-10 h-10" />
                      </div>
                      <div className="text-xs font-bold text-amber-300 font-marathi mb-1">
                        संस्थापक छायाचित्र
                      </div>
                      <p className="text-[11px] text-teal-200/80 font-marathi leading-relaxed">
                        अ‍ॅडमिन पॅनेलमध्ये जाऊन आपले मूळ छायाचित्र अपलोड करा.
                      </p>
                      {onOpenAdmin && (
                        <button
                          onClick={onOpenAdmin}
                          className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold text-teal-950 bg-amber-400 hover:bg-amber-300 px-3.5 py-1.5 rounded-full font-marathi shadow-xs transition-colors cursor-pointer"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>फोटो जोडा</span>
                        </button>
                      )}
                    </div>
                  )}

                  {/* Organization tag on image */}
                  {hasPhoto && (
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-teal-950/95 via-teal-950/40 to-transparent p-2.5 text-center">
                      <span className="text-[10px] font-extrabold text-amber-300 font-marathi tracking-wide uppercase">
                        {settings.brand || 'Swara Communication'}
                      </span>
                    </div>
                  )}
                </div>

                {/* Information Displayed Below Founder's Photograph */}
                <div className="w-full text-center mt-4 space-y-1.5">
                  {/* Marathi Presentation */}
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-marathi tracking-tight">
                    {settings.founderNameMr || 'श्री. पंकज वाघमारे'}
                  </h3>

                  {/* English Name */}
                  <div className="text-xs sm:text-sm font-bold text-teal-800 font-poppins">
                    {settings.founderName || 'Mr. Pankaj Waghmare'}
                  </div>

                  {/* Designation */}
                  <div className="pt-1">
                    <span className="inline-block px-3 py-1 rounded-full bg-teal-100 text-teal-950 text-xs font-extrabold font-poppins border border-teal-200">
                      {settings.founderDesignation || 'Founder & CEO'}
                    </span>
                  </div>

                  {/* Organization */}
                  <div className="text-xs sm:text-sm font-black text-emerald-900 font-marathi flex items-center justify-center gap-1.5 pt-1">
                    <Building2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{settings.founderOrganization || 'स्वरा उद्योग समूह'}</span>
                  </div>

                  {/* Experience (Only shown if configured by admin, never assumed or invented) */}
                  {settings.founderExperienceYears && settings.founderExperienceYears.trim().length > 0 ? (
                    <div className="pt-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-950 border border-amber-300 text-xs font-bold font-marathi">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>{settings.founderExperienceYears} अनुभव</span>
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Founder Biography & Vision Column */}
            <div className="md:col-span-7 space-y-5 text-left pt-2 md:pt-0">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-teal-50 text-teal-900 text-xs font-bold font-poppins border border-teal-100">
                  <Briefcase className="w-3.5 h-3.5 text-teal-700" />
                  <span>नेतृत्व व व्यवसाय दृष्टीकोन</span>
                </div>

                <h4 className="text-xl sm:text-2xl font-black text-[#064E3B] font-marathi">
                  “ई-सेवा केंद्र चालकांना स्वावलंबी आणि यशस्वी बनवणे हेच आमचे ध्येय”
                </h4>
              </div>

              {/* Editable Biography */}
              <div className="bg-[#FAF9F6] p-4 sm:p-5 rounded-2xl border border-teal-100">
                <p className="text-sm sm:text-base text-slate-700 font-marathi leading-relaxed">
                  {settings.founderBio || 'स्वरा उद्योग समूहाचे संस्थापक व मुख्य मार्गदर्शक. महाराष्ट्रभरातील ग्रामीण आणि शहरी भागातील हजारो ई-सेवा आणि सीएससी केंद्र चालकांना अधिक सक्षम, तांत्रिकदृष्ट्या प्रगत आणि आर्थिकदृष्ट्या स्वावलंबी बनवण्यासाठी विशेष प्रॅक्टिकल बिझनेस मार्गदर्शन.'}
                </p>
              </div>

              {/* Trust & Quality Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-teal-100 shadow-2xs text-xs font-bold text-teal-950 font-marathi">
                  <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <span>प्रत्यक्ष प्रॅक्टिकल व्यावसायिक अनुभव आणि मार्गदर्शन</span>
                </div>
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-teal-100 shadow-2xs text-xs font-bold text-teal-950 font-marathi">
                  <Award className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                  <span>ई-सेवा केंद्र व्यवसायवृद्धीची प्रभावी रणनीती</span>
                </div>
              </div>

              {/* Sangli Event Personal Invitation Note */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 text-xs sm:text-sm text-teal-950 font-marathi shadow-2xs">
                <p className="leading-relaxed">
                  <span className="font-extrabold text-teal-900">“सांगली कार्यशाळेत (१७ व १८ ऑक्टोबर २०२६ - हॉटेल सीजन फोर):</span> मी स्वतः उपस्थित राहून आपल्या केंद्राच्या दैनंदिन अडचणी, ग्राहक वाढ, शासकीय सेवांचे तंत्रज्ञान आणि नफा वाढवण्याच्या प्रत्येक मुद्द्यावर सविस्तर चर्चा व मार्गदर्शन करणार आहे.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
