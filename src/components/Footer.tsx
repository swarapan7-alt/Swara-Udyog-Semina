import React from 'react';
import { EventSettings } from '../types';
import { PolicyType } from './PolicyModal';
import { ShieldCheck, Lock, MapPin, Building2 } from 'lucide-react';

interface FooterProps {
  settings: EventSettings;
  onOpenPolicy: (type: PolicyType) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenPolicy, onOpenAdmin }) => {
  return (
    <footer className="bg-teal-950 text-slate-300 pt-12 pb-24 sm:pb-12 border-t border-teal-800/40">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-teal-900">
          {/* Brand & Address Info */}
          <div className="md:col-span-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-800 flex items-center justify-center text-white font-bold shadow-xs">
                <ShieldCheck className="w-5 h-5 text-amber-300" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white font-marathi">
                  {settings.organizer}
                </h4>
                <p className="text-xs text-teal-300 font-poppins">{settings.brand}</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 font-marathi leading-relaxed max-w-md">
              महा ई-सेवा व सीएससी केंद्र चालकांच्या समृद्धीसाठी, कार्यक्षमतेसाठी आणि उत्पन्न वाढीसाठी वचनबद्ध. १७ आणि १८ ऑक्टोबर २०२६ रोजी सांगली प्रत्यक्ष कार्यशाळा.
            </p>

            <div className="pt-2 text-xs text-teal-200/90 font-marathi space-y-1">
              <div className="flex items-start gap-2">
                <Building2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>कार्यालय:</strong> {settings.officeAddress || 'Swara Communication, BJP Office Basement, Near Indian Bank, Sangli-Miraj Road, Vishrambag, Sangli, Maharashtra, India.'}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>वेन्यू:</strong> {settings.venue}, सांगली
                </span>
              </div>
            </div>
          </div>

          {/* Quick Legal Links */}
          <div className="md:col-span-3 space-y-2">
            <h5 className="text-xs font-bold uppercase tracking-wider text-teal-100 font-poppins mb-3">
              कायदेशीर माहिती (Legal & Policy)
            </h5>
            <ul className="space-y-2 text-xs font-marathi">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  गोपनीयता धोरण (Privacy Policy)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  नियम आणि अटी (Terms & Conditions)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('refund')}
                  className="hover:text-amber-300 transition-colors text-left"
                >
                  परतावा व रद्दीकरण (Refund & Cancellation)
                </button>
              </li>
            </ul>
          </div>

          {/* Admin Access */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-teal-100 font-poppins mb-3">
              प्रशासकीय नियंत्रण
            </h5>
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-teal-900 hover:bg-teal-800 text-teal-100 hover:text-white text-xs font-bold border border-teal-700/60 transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-amber-300" />
              <span>प्रशासक लॉगिन (/admin)</span>
            </button>
            <p className="text-[11px] text-teal-400/80 font-marathi">
              केवळ अधिकृत आयोजकांसाठी सुरक्षित नियंत्रण पॅनेल.
            </p>
          </div>
        </div>

        {/* Copyright strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-400/80 font-marathi text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {settings.organizer}. सर्व हक्क सुरक्षित.
          </div>
          <div className="text-[11px] text-teal-300 font-poppins">
            Swara Communication • Hotel Season Four, Vishrambag, Sangli
          </div>
        </div>
      </div>
    </footer>
  );
};
