import React, { useState } from 'react';
import { FaqItem } from '../types';
import { ChevronDown, PhoneCall, MessageSquare } from 'lucide-react';

interface FaqSectionProps {
  faqs: FaqItem[];
  contactPhone: string;
  whatsappNumber: string;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, contactPhone, whatsappNumber }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-12 sm:py-16 bg-white border-t border-teal-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-teal-800 bg-teal-100 px-3 py-1 rounded-full mb-2 font-poppins">
            Frequently Asked Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#064E3B] font-marathi">
            वारंवार विचारले जाणारे प्रश्न (FAQ)
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-marathi mt-2">
            प्रशिक्षणाबद्दल पडणाऱ्या प्रश्नांची साधी आणि स्पष्ट उत्तरे
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3 mb-10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id || index}
                className="border border-teal-100 rounded-2xl overflow-hidden transition-all bg-[#FAF9F6]"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-marathi hover:bg-teal-50/50 transition-colors"
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-teal-700 text-white rotate-180' : 'bg-teal-100 text-teal-800'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs sm:text-sm text-slate-600 font-marathi leading-relaxed border-t border-teal-100/60 pt-3 bg-white">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions card */}
        {(contactPhone || whatsappNumber) && (
          <div className="p-6 rounded-2xl bg-teal-50/70 border border-teal-100 text-center">
            <h4 className="text-base font-bold text-teal-950 font-marathi mb-1">
              अजूनही काही शंका किंवा प्रश्न आहेत का?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 font-marathi mb-4">
              आमच्या टीमशी संपर्क साधा किंवा थेट व्हॉट्सअ‍ॅपवर संदेश पाठवा.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {contactPhone && (
                <a
                  href={`tel:${contactPhone}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-teal-700 text-white text-xs font-bold hover:bg-teal-800 transition-colors shadow-xs font-poppins"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>{contactPhone}</span>
                </a>
              )}

              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('मला E-Seva Business Training बद्दल अधिक माहिती हवी आहे.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-xs font-marathi"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>व्हॉट्सअ‍ॅपवर विचारा</span>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
