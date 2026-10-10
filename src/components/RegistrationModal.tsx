import React, { useState } from 'react';
import { EventSettings } from '../types';
import { store } from '../services/store';
import { X, CheckCircle, Copy, Check, ExternalLink, ArrowRight, AlertCircle, Phone, User, MapPin, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: EventSettings;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose, settings }) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('सांगली');
  const [city, setCity] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [centerType, setCenterType] = useState('महा ई-सेवा केंद्र (Maha e-Seva)');
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successRegId, setSuccessRegId] = useState<string | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('कृपया आपले पूर्ण नाव प्रविष्ट करा.');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length !== 10) {
      setErrorMessage('कृपया वैध १० अंकी मोबाईल नंबर टाका.');
      return;
    }

    if (!city.trim()) {
      setErrorMessage('कृपया आपले शहर किंवा गाव प्रविष्ट करा.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await store.addRegistration({
        fullName: fullName.trim(),
        phone: cleanPhone,
        district: district.trim(),
        city: city.trim(),
        businessName: businessName.trim() || 'नवीन केंद्र / चालू केंद्र',
        centerType,
        paymentStatus: 'initiated',
        adminNotes: 'ऑनलाईन फॉर्म द्वारे नोंदणी केली.',
        transactionRef: ''
      });

      if (result.success) {
        setSuccessRegId(result.registrationId);
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.6 }
          });
        } catch {
          // ignore
        }
      }
    } catch {
      setErrorMessage('नोंदणी करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = () => {
    if (!successRegId) return;
    navigator.clipboard.writeText(successRegId);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    if (!successRegId) return;
    const text = `माझी Swara Udyog Samuh E-Seva Training साठी नोंदणी झाली आहे!\nनाव: ${fullName}\nनोंदणी आयडी: ${successRegId}\nतारीख: 17 & 18 ऑक्टोबर 2026\nठिकाण: हॉटेल सीजन फोर, सांगली`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const resetAndClose = () => {
    setSuccessRegId(null);
    setFullName('');
    setPhone('');
    setCity('');
    setBusinessName('');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-teal-100 overflow-hidden my-8 relative">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-teal-900 via-emerald-900 to-teal-950 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-extrabold tracking-wider text-amber-300 uppercase font-poppins">
              Participant Registration
            </span>
            <h3 className="text-lg font-bold font-marathi">
              प्रशिक्षण नाव नोंदणी फॉर्म
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Success View */}
        {successRegId ? (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 font-marathi">
                नोंदणी यशस्वी झाली!
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 font-marathi mt-1">
                तुमचा नोंदणी तपशील यशस्वीरित्या जतन झाला आहे.
              </p>
            </div>

            {/* Registration ID Badge */}
            <div className="bg-teal-50 p-4 rounded-2xl border border-teal-200">
              <div className="text-xs font-semibold text-teal-800 font-marathi mb-1">
                तुमचा युनिक नोंदणी क्रमांक (Registration ID):
              </div>
              <div className="flex items-center justify-center gap-2">
                <span className="text-xl font-black text-teal-950 font-poppins tracking-wider">
                  {successRegId}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 rounded-lg bg-white hover:bg-teal-100 border border-teal-200 text-teal-700 transition-colors"
                  title="Copy ID"
                >
                  {hasCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Next Step - Razorpay Payment */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-left">
              <div className="text-xs font-bold text-amber-950 font-marathi mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>पुढील पायरी: सीट निश्चित करण्यासाठी ₹४९९ भरा</span>
              </div>
              <p className="text-xs text-amber-900 font-marathi">
                आपली सीट १००% कन्फर्म करण्यासाठी खालील बटनावर क्लिक करून Razorpay द्वारे ₹४९९ चे पेमेंट पूर्ण करा. उर्वरित ₹३,००० नंतर द्यायचे आहेत.
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5 pt-2">
              <a
                href={settings.razorpayUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-black text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 rounded-xl shadow-md transition-all font-marathi text-center"
              >
                <span>आताच ₹४९९ पेमेंट करा (Razorpay)</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <button
                onClick={shareOnWhatsApp}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors font-marathi"
              >
                <span>नोंदणी तपशील व्हॉट्सअ‍ॅपवर शेअर करा</span>
              </button>

              <button
                onClick={resetAndClose}
                className="text-xs text-slate-500 hover:text-slate-800 transition-colors pt-2 font-marathi"
              >
                बंद करा
              </button>
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-marathi flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                पूर्ण नाव (Full Name) *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="उदा. अमोल विठ्ठल पाटील"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                मोबाईल नंबर (WhatsApp Number) *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="१० अंकी मोबाईल नंबर (उदा. 9822104523)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                  जिल्हा (District) *
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi bg-white"
                >
                  <option value="सांगली">सांगली (Sangli)</option>
                  <option value="कोल्हापूर">कोल्हापूर (Kolhapur)</option>
                  <option value="सातारा">सातारा (Satara)</option>
                  <option value="सोलापूर">सोलापूर (Solapur)</option>
                  <option value="पुणे">पुणे (Pune)</option>
                  <option value="इतर">इतर जिल्हा (Other)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                  शहर / गाव (City/Town) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="उदा. मिरज, सांगली"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                व्यवसायाचे / केंद्राचे नाव (Business Name)
              </label>
              <div className="relative">
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="उदा. पाटील ई-सेवा केंद्र (किंवा नवीन केंद्र)"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                केंद्राचा प्रकार (Center Type) *
              </label>
              <select
                value={centerType}
                onChange={(e) => setCenterType(e.target.value)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi bg-white"
              >
                <option value="महा ई-सेवा केंद्र (Maha e-Seva)">महा ई-सेवा केंद्र (Maha e-Seva)</option>
                <option value="CSC केंद्र (Digital Seva)">CSC केंद्र (Digital Seva)</option>
                <option value="सेतू केंद्र (Setu Kendra)">सेतू केंद्र (Setu Kendra)</option>
                <option value="सायबर कॅफे (Cyber Cafe)">सायबर कॅफे (Cyber Cafe)</option>
                <option value="नवीन सुरू करणार (New Beginner)">नवीन सुरू करणार (New Beginner)</option>
              </select>
            </div>

            <div className="p-3 bg-teal-50 rounded-xl border border-teal-100 flex items-center justify-between text-xs font-marathi">
              <span className="text-slate-600">सीट बुकिंग रक्कम:</span>
              <span className="font-extrabold text-teal-950 font-poppins">₹{settings.bookingFee} (एकूण फी ₹{settings.totalFee})</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 shadow-md transition-all font-marathi flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>नोंदणी होत आहे...</span>
              ) : (
                <>
                  <span>नोंदणी पूर्ण करा</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
