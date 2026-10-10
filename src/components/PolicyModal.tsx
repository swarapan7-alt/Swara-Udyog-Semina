import React from 'react';
import { X, ShieldCheck, FileText, RefreshCw } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'refund' | null;

interface PolicyModalProps {
  type: PolicyType;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const getContent = () => {
    switch (type) {
      case 'privacy':
        return {
          title: 'गोपनीयता धोरण (Privacy Policy)',
          icon: <ShieldCheck className="w-5 h-5 text-teal-700" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-marathi leading-relaxed">
              <p>
                <strong>१. माहिती गोळा करणे:</strong> स्वरा उद्योग समूह (Swara Udyog Samuh) आणि स्वरा कम्युनिकेशन यांच्या ई-सेवा प्रशिक्षण कार्यक्रमात नोंदणी करताना आम्ही तुमचे नाव, मोबाईल नंबर, पत्ता आणि व्यवसायाचे तपशील केवळ प्रशिक्षणाशी संबंधित संवाद आणि अधिकृत रेकॉर्डसाठी गोळा करतो.
              </p>
              <p>
                <strong>२. डेटा संरक्षण:</strong> आम्ही सहभागींचा कोणताही खाजगी डेटा तृतीय पक्षास (Third Parties) विकत नाही अथवा व्यावसायिक विपणनासाठी देत नाही. सर्व सहभागी डेटा सुरक्षित ठेवला जातो.
              </p>
              <p>
                <strong>३. संपर्क:</strong> प्रशिक्षणाचे अपडेट्स, हॉलची दिशा, हॉलमधील बैठकीची माहिती आणि इतर सूचना देण्यासाठी आम्ही दिलेल्या व्हॉट्सअ‍ॅप अथवा फोन नंबरचा वापर करतो.
              </p>
              <p>
                <strong>४. पेमेंट सुरक्षा:</strong> सर्व ऑनलाईन पेमेंट्स सुरक्षित व अधिकृत Razorpay पेमेंट गेटवे द्वारे प्रोसेस होतात. आम्ही कोणतेही कार्ड क्रमांक किंवा UPI पिन सेव्ह करत नाही.
              </p>
            </div>
          )
        };
      case 'terms':
        return {
          title: 'नियम आणि अटी (Terms & Conditions)',
          icon: <FileText className="w-5 h-5 text-teal-700" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-marathi leading-relaxed">
              <p>
                <strong>१. प्रशिक्षणाचा कालावधी:</strong> प्रशिक्षण १७ आणि १८ ऑक्टोबर २०२६ रोजी सकाळी १०:०० ते सायंकाळी ५:०० या वेळेत हॉटेल सीजन फोर, विश्रामबाग, सांगली येथे आयोजित करण्यात आले आहे.
              </p>
              <p>
                <strong>२. उपस्थिती:</strong> सहभागींनी दोन्ही दिवस सकाळी ९:४५ पर्यंत वेन्यूवर उपस्थित राहणे आवश्यक आहे जेणेकरून वेळेवर चहा-नाश्ता घेऊन सत्राची सुरुवात करता येईल.
              </p>
              <p>
                <strong>३. फी रचना:</strong> सीट बुकिंगसाठी ₹४९९ ऑनलाईन भरावे लागतात. उर्वरित ₹३,००० रक्कम १७ ऑक्टोबरला कार्यशाळेच्या वेळी किंवा संयोजकांच्या सूचनेनुसार देय राहील.
              </p>
              <p>
                <strong>४. प्रमाणपत्र:</strong> दोन्ही दिवसांचे पूर्ण प्रशिक्षण पूर्ण करणाऱ्या सहभागींनाच स्वरा उद्योग समूहातर्फे अधिकृत प्रमाणपत्र दिले जाईल.
              </p>
            </div>
          )
        };
      case 'refund':
        return {
          title: 'परतावा व रद्दीकरण धोरण (Refund & Cancellation)',
          icon: <RefreshCw className="w-5 h-5 text-teal-700" />,
          body: (
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-marathi leading-relaxed">
              <p>
                <strong>१. सीट बुकिंग रक्कम (₹४९९):</strong> ही रक्कम हॉटेल हॉल बुकींग, दुपारचे जेवण आणि स्टडी मटेरियलच्या पूर्वतयारीसाठी वापरली जात असल्याने साधारणतः ना-परतावा (Non-refundable) असते.
              </p>
              <p>
                <strong>२. अपरिहार्य कारणे:</strong> वैद्यकीय किंवा गंभीर अपरिहार्य कारणास्तव सहभागी उपस्थित राहू शकत नसल्यास, कार्यक्रमाच्या किमान ७२ तास आधी आयोजकांना कळवून पुढील बॅचसाठी सीट ट्रान्सफर करण्याची विनंती करता येईल.
              </p>
              <p>
                <strong>३. कार्यक्रम रद्द झाल्यास:</strong> नैसर्गिक आपत्ती किंवा आयोजकांच्या तांत्रिक अडचणींमुळे कार्यक्रम रद्द झाल्यास, भरलेली पूर्ण रक्कम सहभागींना परत केली जाईल.
              </p>
              <p>
                <strong>४. परतावा प्रक्रिया:</strong> परताव्याच्या पात्रतेनंतर ७ कामकाजाच्या दिवसांत मूळ बँक खात्यामध्ये किंवा UPI द्वारे रक्कम जमा केली जाते.
              </p>
            </div>
          )
        };
    }
  };

  const current = getContent();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl border border-teal-100 overflow-hidden my-8">
        <div className="bg-teal-50 p-5 flex items-center justify-between border-b border-teal-100">
          <div className="flex items-center gap-2">
            {current.icon}
            <h3 className="text-base font-bold text-slate-900 font-marathi">
              {current.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {current.body}
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-teal-950 bg-teal-100 hover:bg-teal-200 rounded-xl transition-colors font-marathi"
          >
            समजले (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
