import { EventSettings } from '../types';

export const DEFAULT_HERO_IMAGE = 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80';
export const DEFAULT_LOGO = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=200&q=80';
export const DEFAULT_TRAINER_IMAGE = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80';

export const INITIAL_EVENT_SETTINGS: EventSettings = {
  title: 'E-Seva Business Growth Training 2026',
  organizer: 'स्वरा उद्योग समूह (Swara Udyog Samuh)',
  brand: 'Swara Communication',
  dates: '17 आणि 18 ऑक्टोबर 2026',
  days: 'शनिवार आणि रविवार (२ दिवस)',
  time: 'सकाळी 10:00 ते सायंकाळी 5:00 (दोन्ही दिवस)',
  venue: 'हॉटेल सीजन फोर (Hotel Season Four)',
  address: 'हॉटेल सीजन फोर, विश्रामबाग, सांगली, महाराष्ट्र',
  officeAddress: 'Swara Communication, BJP Office Basement, Near Indian Bank, Sangli-Miraj Road, Vishrambag, Sangli, Maharashtra, India.',
  mapUrl: 'https://maps.google.com/?q=Hotel+Season+Four+Vishrambag+Sangli',
  totalFee: 3499,
  bookingFee: 499,
  remainingFee: 3000,
  razorpayUrl: 'https://rzp.io/rzp/qd8t2V5',
  registrationOpen: true,
  maxSeats: 50,
  heroImageUrl: DEFAULT_HERO_IMAGE,
  logoUrl: DEFAULT_LOGO,
  trainerImageUrl: DEFAULT_TRAINER_IMAGE,
  trainerName: 'स्वरा कम्युनिकेशन तज्ञ टीम',
  trainerRole: 'ई-गव्हर्नन्स व बिझनेस कन्सल्टंट्स',
  trainerBio: 'गेल्या १०+ वर्षांपासून हजारो उद्योजकांना महा ई-सेवा, सीएससी व सरकारी योजनांच्या माध्यमातून यशस्वी व्यवसाय उभारण्यासाठी मार्गदर्शन करणारे अनुभवी मार्गदर्शक व प्रशिक्षक.',
  founderName: 'Mr. Pankaj Waghmare',
  founderNameMr: 'श्री. पंकज वाघमारे',
  founderDesignation: 'Founder & CEO',
  founderOrganization: 'स्वरा उद्योग समूह',
  founderExperienceYears: '',
  founderBio: 'स्वरा उद्योग समूहाचे संस्थापक व मुख्य मार्गदर्शक. महाराष्ट्रभरातील ई-सेवा केंद्र चालकांना अधिक सक्षम, स्वावलंबी आणि यशस्वी बनवण्यासाठी विशेष प्रॅक्टिकल बिझनेस मार्गदर्शन.',
  founderImageUrl: '',
  founderImagePosition: 'center',
  founderImageScale: 1,
  contactPhone: '',
  whatsappNumber: '',
  marathiHeadline: 'ई-सेवा व्यवसायाला द्या एक नवी दिशा!',
  marathiSubheadline: 'व्यवसायवृद्धीचे मार्ग शिका. डिजिटल मार्केटिंग समजून घ्या. AI टूल्सचा वापर जाणून घ्या.',
  remainingBalanceNote: 'उर्वरित ₹३,००० रक्कम प्रशिक्षणाच्या पहिल्या दिवशी किंवा संयोजकांच्या सूचनेनुसार देय आहे.',
  topics: [
    {
      id: 'topic-1',
      titleMr: 'CSC & महा ई-सेवा केंद्र कार्यपद्धती',
      titleEn: 'CSC & Maha e-Seva Center Mastery',
      desc: 'सरकारी पोर्टल्स, दाखले, सेवा वेगाने आणि बिनचूक कशा द्याव्यात याच्या सोप्या युक्त्या व अधिकृत कार्यपद्धती.',
      icon: 'Layers'
    },
    {
      id: 'topic-2',
      titleMr: 'बिझनेस ग्रोथ आणि कमाई वाढीचे सूत्र',
      titleEn: 'Business Growth Strategies',
      desc: 'फक्त फॉर्म भरणे सोडून केंद्राला मल्टी-सर्व्हिस हब कसे बनवावे व प्रत्येक ग्राहकामागे नफा कसा वाढवावा.',
      icon: 'TrendingUp'
    },
    {
      id: 'topic-3',
      titleMr: 'ग्राहक वाढीची अचूक पद्धत (Customer Acquisition)',
      titleEn: 'Customer Acquisition',
      desc: 'गावातील व शहरातील नवीन ग्राहकांना केंद्राकडे आकर्षित करण्याच्या प्रभावी आणि कमी खर्चातील पद्धती.',
      icon: 'Users'
    },
    {
      id: 'topic-4',
      titleMr: 'ई-सेवा केंद्राचे डिजिटल मार्केटिंग',
      titleEn: 'Digital Marketing for Centers',
      desc: 'व्हॉट्सअ‍ॅप बिझनेस, फेसबुक, गुगल बिझनेस प्रोफाईल द्वारे आपल्या केंद्राची स्थानिक जाहिरात आणि प्रसिद्धी.',
      icon: 'Megaphone'
    },
    {
      id: 'topic-5',
      titleMr: 'AI टूल्सचा वापर (जलद कामकाजासाठी)',
      titleEn: 'Modern AI Tools Implementation',
      desc: 'डॉक्युमेंट एडिटिंग, अर्ज, भाषांतर आणि ग्राहकांच्या प्रश्नांची उत्तरे देण्यासाठी आधुनिक AI टूल्सचा सुलभ वापर.',
      icon: 'Sparkles'
    },
    {
      id: 'topic-6',
      titleMr: 'ग्राहक व्यवस्थापन व सातत्यपूर्ण उत्पन्न',
      titleEn: 'Customer Management & Retention',
      desc: 'ग्राहकांचा डेटाबेस ठेवणे, नूतनीकरण आठवण करून देणे आणि ग्राहकांशी दीर्घकालीन विश्वासू नाते निर्माण करणे.',
      icon: 'HeartHandshake'
    }
  ],
  benefits: [
    {
      id: 'b-1',
      titleMr: 'चहा व सकाळचा नाश्ता',
      titleEn: 'Tea & Fresh Breakfast',
      desc: 'दोन्ही दिवस गरमागरम चहा आणि पौष्टिक नाश्त्याची व्यवस्था समाविष्ट.',
      icon: 'Coffee'
    },
    {
      id: 'b-2',
      titleMr: 'दर्जेदार दुपारचे जेवण (Lunch)',
      titleEn: 'Delicious Buffet Lunch',
      desc: 'दोन्ही दिवस स्वादिष्ट आणि स्वच्छ जेवणाची सोय हॉटेल सीजन फोर येथे.',
      icon: 'Utensils'
    },
    {
      id: 'b-3',
      titleMr: 'प्रॅक्टिकल हँड्स-ऑन ट्रेनिंग',
      titleEn: 'Practical Training Sessions',
      desc: 'फक्त भाषण नाही, तर प्रत्यक्ष संगणकावर कामाचा सराव आणि लाईव्ह उदाहरणे.',
      icon: 'Monitor'
    },
    {
      id: 'b-4',
      titleMr: 'अधिकृत प्रशिक्षण प्रमाणपत्र',
      titleEn: 'Official Course Certificate',
      desc: 'स्वरा उद्योग समूहातर्फे अधिकृत प्रमाणपत्र तुमच्या केंद्रावर लावण्यासाठी.',
      icon: 'Award'
    },
    {
      id: 'b-5',
      titleMr: 'स्टडी मटेरिअल व चेकलिस्ट',
      titleEn: 'Ready Checklists & Guidebook',
      desc: 'महत्त्वाच्या लिंक्स, फॉर्म फॉरमॅट आणि बिझनेस चेकलिस्टची डिजिटल फाईल.',
      icon: 'BookOpen'
    },
    {
      id: 'b-6',
      titleMr: 'लाईफटाईम सपोर्ट ग्रुप',
      titleEn: 'Exclusive Community Support',
      desc: 'प्रशिक्षणानंतरही अडचण आल्यास मार्गदर्शन मिळवण्यासाठी प्रायव्हेट कम्युनिटी.',
      icon: 'ShieldCheck'
    }
  ],
  faqs: [
    {
      id: 'faq-1',
      question: 'हे प्रशिक्षण कोणासाठी उपयुक्त आहे?',
      answer: 'हे प्रशिक्षण सध्या ई-सेवा किंवा सीएससी केंद्र चालवणाऱ्यांसाठी, सेतू केंद्र चालक, सायबर कॅफे मालक, तसेच स्वतःचे नवीन ई-सेवा केंद्र सुरू करू इच्छिणाऱ्या प्रत्येकासाठी अत्यंत फायदेशीर आहे.'
    },
    {
      id: 'faq-2',
      question: '₹४९९ भरल्यानंतर उर्वरित ₹३,००० कधी द्यायचे आहेत?',
      answer: 'तुमची सीट निश्चित करण्यासाठी आता फक्त ₹४९९ भरायचे आहेत. उर्वरित ₹३,००० रक्कम १७ ऑक्टोबर २०२६ रोजी कार्यशाळेच्या पहिल्या दिवशी वेन्यूवर (हॉटेल सीजन फोर) किंवा संयोजकांच्या सूचनेनुसार द्यायची आहे.'
    },
    {
      id: 'faq-3',
      question: 'प्रशिक्षणात स्वतःचा लॅपटॉप आणणे आवश्यक आहे का?',
      answer: 'लॅपटॉप आणल्यास अत्यंत उत्तम, कारण तुम्हाला प्रत्यक्ष सराव करता येईल. मात्र लॅपटॉप नसल्यास तुम्ही नोट्स घेऊ शकता आणि स्क्रीनवरील प्रात्यक्षिके पाहून शिकू शकता.'
    },
    {
      id: 'faq-4',
      question: 'प्रशिक्षण पूर्ण झाल्यावर प्रमाणपत्र (Certificate) मिळेल का?',
      answer: 'होय, दोन्ही दिवसांचे प्रशिक्षण पूर्ण करणाऱ्या प्रत्येक प्रशिक्षणार्थीस स्वरा उद्योग समूहाचे अधिकृत बिझनेस ग्रोथ प्रशिक्षण प्रमाणपत्र प्रदान केले जाईल.'
    },
    {
      id: 'faq-5',
      question: 'दोन्ही दिवस जेवण व नाश्ता मिळेल का?',
      answer: 'होय, १७ आणि १८ ऑक्टोबर दोन्ही दिवस सकाळचा चहा-नाश्ता, दुपारचे स्वादिष्ट जेवण व संध्याकाळचा चहा ट्रेनिंग फीमध्येच समाविष्ट आहे. कोणताही अतिरिक्त खर्च नाही.'
    },
    {
      id: 'faq-6',
      question: 'ऑनलाईन पेमेंट केल्यानंतर काय करावे?',
      answer: 'Razorpay द्वारे ₹४९९ पेमेंट केल्यानंतर तुम्हाला मिळालेला ट्रान्झॅक्शन आयडी सेव्ह करा आणि याच पानावर नाव व मोबाईल नंबर नोंदवून फॉर्म सबमिट करा. आमच्या टीमकडून २४ तासांत व्हॉट्सअ‍ॅपवर कन्फर्मेशन मेसेज येईल.'
    }
  ]
};
