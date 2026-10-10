export interface TrainingTopic {
  id: string;
  titleMr: string;
  titleEn: string;
  desc: string;
  icon: string;
}

export interface TrainingBenefit {
  id: string;
  titleMr: string;
  titleEn: string;
  desc: string;
  icon: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface EventSettings {
  title: string;
  organizer: string;
  brand: string;
  dates: string;
  days: string;
  time: string;
  venue: string;
  address: string;
  officeAddress: string;
  mapUrl: string;
  totalFee: number;
  bookingFee: number;
  remainingFee: number;
  razorpayUrl: string;
  registrationOpen: boolean;
  maxSeats: number;
  heroImageUrl: string;
  logoUrl: string;
  trainerImageUrl: string;
  trainerName: string;
  trainerRole: string;
  trainerBio: string;
  founderName: string;
  founderNameMr: string;
  founderDesignation: string;
  founderOrganization: string;
  founderExperienceYears: string;
  founderBio: string;
  founderImageUrl: string;
  founderImagePosition?: string;
  founderImageScale?: number;
  contactPhone: string;
  whatsappNumber: string;
  marathiHeadline: string;
  marathiSubheadline: string;
  remainingBalanceNote: string;
  topics: TrainingTopic[];
  benefits: TrainingBenefit[];
  faqs: FaqItem[];
  updatedAt?: string;
}

export interface Participant {
  id: string;
  registrationId: string;
  fullName: string;
  phone: string;
  district: string;
  city: string;
  businessName: string;
  centerType: string;
  paymentStatus: 'initiated' | 'verified' | 'pending' | 'cancelled';
  transactionRef?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface AdminStats {
  totalRegistrations: number;
  verifiedCount: number;
  pendingCount: number;
  totalCollected: number;
  pendingBalance: number;
  seatsLeft: number;
}
