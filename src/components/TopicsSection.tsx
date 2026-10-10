import React from 'react';
import { TrainingTopic } from '../types';
import { Layers, TrendingUp, Users, Megaphone, Sparkles, HeartHandshake, CheckCircle2 } from 'lucide-react';

interface TopicsSectionProps {
  topics: TrainingTopic[];
}

export const TopicsSection: React.FC<TopicsSectionProps> = ({ topics }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-teal-700" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-teal-800" />;
      case 'Megaphone':
        return <Megaphone className="w-6 h-6 text-orange-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-amber-600" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-teal-600" />;
      default:
        return <Layers className="w-6 h-6 text-teal-700" />;
    }
  };

  return (
    <section id="topics-section" className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full mb-2 font-poppins">
            Curriculum & Topics
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-marathi">
            प्रशिक्षणातील मुख्य विषय (Training Syllabus)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-marathi mt-2">
            केवळ पुस्तकी माहिती नाही, तर प्रत्यक्षात ई-सेवा केंद्राची कमाई वाढवणारे ६ महत्त्वाचे व्यावसायिक पैलू
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {topics.map((topic, index) => (
            <div
              key={topic.id || index}
              className="bg-white rounded-2xl p-6 border border-teal-100/80 shadow-xs hover:shadow-md transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center border border-teal-100">
                    {getIcon(topic.icon)}
                  </div>
                  <span className="text-xs font-black text-teal-600 font-poppins">
                    #०{index + 1}
                  </span>
                </div>

                <div className="text-[11px] font-bold text-teal-700 uppercase tracking-wider font-poppins mb-1">
                  {topic.titleEn}
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-marathi mb-2 leading-snug">
                  {topic.titleMr}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-marathi leading-relaxed">
                  {topic.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] text-emerald-800 font-marathi font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>लाईव्ह प्रात्यक्षिक आणि केस स्टडी</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
