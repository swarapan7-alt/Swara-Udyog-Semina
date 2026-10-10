import React from 'react';
import { TrainingBenefit } from '../types';
import { Coffee, Utensils, Monitor, Award, BookOpen, ShieldCheck } from 'lucide-react';

interface BenefitsSectionProps {
  benefits: TrainingBenefit[];
}

export const BenefitsSection: React.FC<BenefitsSectionProps> = ({ benefits }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coffee':
        return <Coffee className="w-6 h-6 text-orange-600" />;
      case 'Utensils':
        return <Utensils className="w-6 h-6 text-amber-600" />;
      case 'Monitor':
        return <Monitor className="w-6 h-6 text-teal-700" />;
      case 'Award':
        return <Award className="w-6 h-6 text-emerald-600" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6 text-teal-800" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-emerald-700" />;
      default:
        return <Award className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-teal-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full mb-2 font-poppins">
            Inclusive Facilities
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-marathi">
            प्रशिक्षणात मिळणाऱ्या सर्व सोयी-सुविधा
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-marathi mt-2">
            प्रशिक्षणाचा लाभ घ्या कोणतीही काळजी न करता. चहा, नाश्ता, जेवण आणि प्रमाणपत्र फीमध्येच समाविष्ट आहेत.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((item, index) => (
            <div
              key={item.id || index}
              className="p-5 rounded-2xl bg-[#FAF9F6] border border-teal-100/70 hover:border-teal-200 transition-all flex items-start gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-xs border border-teal-100">
                {getIcon(item.icon)}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 font-marathi mb-1">
                  {item.titleMr}
                </h3>
                <p className="text-xs text-slate-600 font-marathi leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Certificate Callout Card */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-teal-900 via-emerald-900 to-teal-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-400 text-teal-950 flex items-center justify-center shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold font-marathi">
                स्वरा उद्योग समूहातर्फे अधिकृत प्रमाणपत्र (Official Certificate)
              </div>
              <div className="text-xs text-teal-200 font-marathi">
                हे प्रमाणपत्र आपल्या ई-सेवा केंद्रावर लावण्यासाठी प्रत्येक यशस्वी प्रशिक्षणार्थीस प्रदान केले जाईल.
              </div>
            </div>
          </div>
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-white/10 text-amber-300 border border-white/20 font-marathi whitespace-nowrap">
            १००% अधिकृत सर्टिफिकेशन
          </span>
        </div>
      </div>
    </section>
  );
};
