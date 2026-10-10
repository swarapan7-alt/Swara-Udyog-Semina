import { EventSettings, Participant, AdminStats } from '../types';
import { INITIAL_EVENT_SETTINGS } from '../data/initialData';
import { db } from './firebase';
import { doc, getDoc, setDoc, collection, getDocs, deleteDoc } from 'firebase/firestore';

const SETTINGS_KEY = 'swara_event_settings_v3';
const REGISTRATIONS_KEY = 'swara_registrations_v3';
const ADMIN_AUTH_KEY = 'swara_admin_auth_v3';
const ADMIN_CRED_KEY = 'swara_admin_cred_v3';

// Crypto helper to hash credentials without storing plaintext passwords in code
async function computeSha256(str: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(str + ':' + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Initial sample participants for Sangli region
const INITIAL_PARTICIPANTS: Participant[] = [
  {
    id: 'reg-001',
    registrationId: 'SWARA-2026-1042',
    fullName: 'अमोल विठ्ठल पाटील',
    phone: '9822104523',
    district: 'सांगली',
    city: 'विश्रामबाग, सांगली',
    businessName: 'पाटील महा ई-सेवा केंद्र',
    centerType: 'महा ई-सेवा व CSC केंद्र',
    paymentStatus: 'verified',
    transactionRef: 'RZP-PAY-892401',
    adminNotes: '₹४९९ सीट बुकिंग व्हेरिफाय झाले. उर्वरित ₹३,००० १७ तारखेला देतील.',
    createdAt: '2026-10-08T10:30:00.000Z'
  },
  {
    id: 'reg-002',
    registrationId: 'SWARA-2026-1043',
    fullName: 'प्रियांका सचिन कुलकर्णी',
    phone: '9421258901',
    district: 'सांगली',
    city: 'मिरज',
    businessName: 'साई कॉम्प्युटर्स & सेतू केंद्र',
    centerType: 'सेतू केंद्र',
    paymentStatus: 'verified',
    transactionRef: 'RZP-PAY-893110',
    adminNotes: 'लॅपटॉप सोबत आणणार आहेत.',
    createdAt: '2026-10-08T14:15:00.000Z'
  },
  {
    id: 'reg-003',
    registrationId: 'SWARA-2026-1044',
    fullName: 'योगेश चंद्रकांत जाधव',
    phone: '9158742309',
    district: 'कोल्हापूर',
    city: 'जयसिंगपूर',
    businessName: 'जाधव डिजिटल सर्व्हिसेस',
    centerType: 'सायबर कॅफे व CSC',
    paymentStatus: 'pending',
    transactionRef: '',
    adminNotes: 'व्हॉट्सअ‍ॅपवर पेमेंट लिंक पुन्हा पाठवली आहे.',
    createdAt: '2026-10-09T09:20:00.000Z'
  },
  {
    id: 'reg-004',
    registrationId: 'SWARA-2026-1045',
    fullName: 'संतोष रामदास माने',
    phone: '9764512390',
    district: 'सांगली',
    city: 'इस्लामपूर',
    businessName: 'माने ई-सेवा पॉईंट',
    centerType: 'महा ई-सेवा केंद्र',
    paymentStatus: 'verified',
    transactionRef: 'RZP-PAY-894721',
    adminNotes: 'सीट कन्फर्म झाली आहे.',
    createdAt: '2026-10-09T16:40:00.000Z'
  },
  {
    id: 'reg-005',
    registrationId: 'SWARA-2026-1046',
    fullName: 'रोहन सुनील कदम',
    phone: '9923412087',
    district: 'सातारा',
    city: 'कराड',
    businessName: 'नवीन केंद्र सुरू करणार',
    centerType: 'नवीन उद्योजक (New Beginner)',
    paymentStatus: 'initiated',
    transactionRef: '',
    adminNotes: 'नोंदणी नुकतीच केली आहे, पेमेंट फॉलोअप आवश्यक.',
    createdAt: '2026-10-10T07:10:00.000Z'
  }
];

class StoreService {
  private memorySettings: EventSettings | null = null;
  private memoryRegistrations: Participant[] | null = null;

  // Retrieve event settings
  public async getEventSettings(): Promise<EventSettings> {
    if (this.memorySettings) {
      return this.memorySettings;
    }

    // Try Firestore if available
    if (db) {
      try {
        const snap = await getDoc(doc(db, 'settings', 'event'));
        if (snap.exists()) {
          const data = snap.data() as EventSettings;
          const merged: EventSettings = { ...INITIAL_EVENT_SETTINGS, ...data };
          this.memorySettings = merged;
          return merged;
        }
      } catch (err) {
        console.warn('Firestore settings fetch fallback:', err);
      }
    }

    // Try LocalStorage
    try {
      const local = localStorage.getItem(SETTINGS_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        const merged: EventSettings = { ...INITIAL_EVENT_SETTINGS, ...parsed };
        // Cleanse legacy earnings claims if cached locally
        if (
          !merged.marathiHeadline ||
          merged.marathiHeadline.includes('कमाई') ||
          merged.marathiHeadline.includes('तिप्पट') ||
          merged.marathiHeadline.includes('दुप्पट')
        ) {
          merged.marathiHeadline = 'ई-सेवा व्यवसायाला द्या एक नवी दिशा!';
          merged.marathiSubheadline = 'व्यवसायवृद्धीचे मार्ग शिका. डिजिटल मार्केटिंग समजून घ्या. AI टूल्सचा वापर जाणून घ्या.';
          localStorage.setItem(SETTINGS_KEY, JSON.stringify(merged));
        }
        this.memorySettings = merged;
        return merged;
      }
    } catch {
      // Fallback
    }

    const fallback: EventSettings = { ...INITIAL_EVENT_SETTINGS };
    this.memorySettings = fallback;
    return fallback;
  }

  // Save event settings
  public async saveEventSettings(settings: EventSettings): Promise<boolean> {
    const updated = { ...settings, updatedAt: new Date().toISOString() };
    this.memorySettings = updated;

    // Save to LocalStorage
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }

    // Save to Firestore if available
    if (db) {
      try {
        await setDoc(doc(db, 'settings', 'event'), updated);
      } catch (err) {
        console.warn('Firestore settings save error:', err);
      }
    }

    // Trigger local listeners
    window.dispatchEvent(new CustomEvent('swara_settings_updated', { detail: updated }));
    return true;
  }

  // Reset event settings to initial defaults
  public async resetEventSettings(): Promise<EventSettings> {
    const initial = { ...INITIAL_EVENT_SETTINGS, updatedAt: new Date().toISOString() };
    await this.saveEventSettings(initial);
    return initial;
  }

  // Get all registrations
  public async getRegistrations(): Promise<Participant[]> {
    if (this.memoryRegistrations) {
      return this.memoryRegistrations;
    }

    // Try Firestore if available
    if (db) {
      try {
        const querySnap = await getDocs(collection(db, 'registrations'));
        if (!querySnap.empty) {
          const list: Participant[] = [];
          querySnap.forEach((docItem) => {
            list.push(docItem.data() as Participant);
          });
          this.memoryRegistrations = list;
          return list;
        }
      } catch (err) {
        console.warn('Firestore registrations fetch fallback:', err);
      }
    }

    // Try LocalStorage
    try {
      const local = localStorage.getItem(REGISTRATIONS_KEY);
      if (local) {
        const parsed = JSON.parse(local);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.memoryRegistrations = parsed;
          return parsed;
        }
      }
    } catch {
      // Fallback
    }

    // Initialize with default sample participants
    this.memoryRegistrations = [...INITIAL_PARTICIPANTS];
    this.persistRegistrations(this.memoryRegistrations);
    return this.memoryRegistrations;
  }

  private persistRegistrations(list: Participant[]) {
    try {
      localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(list));
    } catch (e) {
      console.warn('Error saving registrations to localStorage', e);
    }
  }

  // Add new participant registration
  public async addRegistration(
    data: Omit<Participant, 'id' | 'createdAt' | 'updatedAt' | 'registrationId'>
  ): Promise<{ registrationId: string; success: boolean }> {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const regId = `SWARA-2026-${randomSuffix}`;
    const newId = `reg-${Date.now()}-${randomSuffix}`;
    const now = new Date().toISOString();

    const newRecord: Participant = {
      ...data,
      id: newId,
      registrationId: regId,
      createdAt: now,
      updatedAt: now
    };

    const currentList = await this.getRegistrations();
    const updatedList = [newRecord, ...currentList];
    this.memoryRegistrations = updatedList;
    this.persistRegistrations(updatedList);

    // Save to Firestore if available
    if (db) {
      try {
        await setDoc(doc(db, 'registrations', regId), newRecord);
      } catch (err) {
        console.warn('Firestore registration write error:', err);
      }
    }

    window.dispatchEvent(new CustomEvent('swara_registrations_updated', { detail: updatedList }));
    return { registrationId: regId, success: true };
  }

  // Update participant
  public async updateParticipant(id: string, updates: Partial<Participant>): Promise<boolean> {
    const list = await this.getRegistrations();
    const index = list.findIndex((p) => p.id === id || p.registrationId === id);
    if (index === -1) return false;

    const updatedParticipant = {
      ...list[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    list[index] = updatedParticipant;
    this.memoryRegistrations = [...list];
    this.persistRegistrations(this.memoryRegistrations);

    if (db) {
      try {
        await setDoc(doc(db, 'registrations', updatedParticipant.registrationId), updatedParticipant, { merge: true });
      } catch (err) {
        console.warn('Firestore participant update error:', err);
      }
    }

    window.dispatchEvent(new CustomEvent('swara_registrations_updated', { detail: this.memoryRegistrations }));
    return true;
  }

  // Delete participant
  public async deleteParticipant(id: string): Promise<boolean> {
    const list = await this.getRegistrations();
    const target = list.find((p) => p.id === id || p.registrationId === id);
    if (!target) return false;

    const filtered = list.filter((p) => p.id !== id && p.registrationId !== id);
    this.memoryRegistrations = filtered;
    this.persistRegistrations(filtered);

    if (db) {
      try {
        await deleteDoc(doc(db, 'registrations', target.registrationId));
      } catch (err) {
        console.warn('Firestore participant delete error:', err);
      }
    }

    window.dispatchEvent(new CustomEvent('swara_registrations_updated', { detail: filtered }));
    return true;
  }

  // Calculate statistics
  public async getStats(): Promise<AdminStats> {
    const [settings, list] = await Promise.all([this.getEventSettings(), this.getRegistrations()]);
    
    const totalRegistrations = list.length;
    const verifiedCount = list.filter((p) => p.paymentStatus === 'verified').length;
    const pendingCount = list.filter((p) => p.paymentStatus === 'pending' || p.paymentStatus === 'initiated').length;
    
    // ₹499 per verified booking
    const totalCollected = verifiedCount * settings.bookingFee;
    
    // Remaining balance for verified participants is ₹3,000 each
    const pendingBalance = verifiedCount * settings.remainingFee;
    
    const seatsLeft = Math.max(0, settings.maxSeats - verifiedCount);

    return {
      totalRegistrations,
      verifiedCount,
      pendingCount,
      totalCollected,
      pendingBalance,
      seatsLeft
    };
  }

  // Export registrations as CSV
  public async exportRegistrationsCSV(): Promise<void> {
    const list = await this.getRegistrations();
    if (list.length === 0) {
      alert('डाउनलोड करण्यासाठी कोणतीही नोंदणी उपलब्ध नाही.');
      return;
    }

    const headers = [
      'Registration ID',
      'Full Name (नाव)',
      'Phone Number (मोबाईल)',
      'District (जिल्हा)',
      'City (शहर)',
      'Business / Center Name (केंद्र)',
      'Center Type (प्रकार)',
      'Payment Status (पेमेंट स्थिती)',
      'Transaction Ref (UTR / Trans ID)',
      'Admin Notes (टिप्पणी)',
      'Registered Date (दिनांक)'
    ];

    const rows = list.map((item) => [
      `"${item.registrationId}"`,
      `"${item.fullName.replace(/"/g, '""')}"`,
      `"${item.phone}"`,
      `"${item.district.replace(/"/g, '""')}"`,
      `"${item.city.replace(/"/g, '""')}"`,
      `"${(item.businessName || '').replace(/"/g, '""')}"`,
      `"${(item.centerType || '').replace(/"/g, '""')}"`,
      `"${item.paymentStatus}"`,
      `"${(item.transactionRef || '').replace(/"/g, '""')}"`,
      `"${(item.adminNotes || '').replace(/"/g, '""')}"`,
      `"${new Date(item.createdAt).toLocaleString('en-IN')}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `swara_e_seva_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  // Admin Auth Helpers
  public isAdminLoggedIn(): boolean {
    try {
      const authData = localStorage.getItem(ADMIN_AUTH_KEY);
      if (!authData) return false;
      const parsed = JSON.parse(authData);
      return Boolean(parsed && parsed.email);
    } catch {
      return false;
    }
  }

  public getAdminEmail(): string | null {
    try {
      const authData = localStorage.getItem(ADMIN_AUTH_KEY);
      if (!authData) return null;
      const parsed = JSON.parse(authData);
      return parsed.email || null;
    } catch {
      return null;
    }
  }

  public async isFirstTimeSetup(): Promise<boolean> {
    const cred = localStorage.getItem(ADMIN_CRED_KEY);
    return !cred;
  }

  public async verifyAdminLogin(
    identifier: string,
    pass: string
  ): Promise<{ success: boolean; requiresPasswordChange: boolean; message: string }> {
    const cleanUser = identifier.trim().toLowerCase();
    const isAllowedUser = cleanUser === 'admin' || cleanUser === 'swarapan7@gmail.com';
    if (!isAllowedUser) {
      return { success: false, requiresPasswordChange: false, message: 'अवैध वापरकर्ता नाव (Invalid Username).' };
    }

    const storedCredStr = localStorage.getItem(ADMIN_CRED_KEY);
    if (!storedCredStr) {
      // First-time administrator: allows setting initial password and requires password setup
      // We do not have any plaintext password hardcoded.
      if (pass.length < 6) {
        return { success: false, requiresPasswordChange: true, message: 'किमान ६ अक्षरांचा पासवर्ड आवश्यक आहे.' };
      }
      const salt = Math.random().toString(36).substring(2, 10);
      const hash = await computeSha256(pass, salt);
      localStorage.setItem(
        ADMIN_CRED_KEY,
        JSON.stringify({
          username: 'admin',
          salt,
          hash,
          passwordChanged: false,
          createdAt: new Date().toISOString()
        })
      );
      this.loginAdmin(cleanUser, true);
      return { success: true, requiresPasswordChange: true, message: 'प्रथम लॉगिन यशस्वी. कृपया पासवर्ड बदला.' };
    }

    try {
      const stored = JSON.parse(storedCredStr);
      const computed = await computeSha256(pass, stored.salt);
      if (computed !== stored.hash) {
        return { success: false, requiresPasswordChange: false, message: 'अवैध पासवर्ड. कृपया योग्य पासवर्ड प्रविष्ट करा.' };
      }

      const requiresChange = !stored.passwordChanged;
      this.loginAdmin(cleanUser, requiresChange);
      return {
        success: true,
        requiresPasswordChange: requiresChange,
        message: requiresChange ? 'कृपया प्रथम लॉगिनवर नवीन पासवर्ड सेट करा.' : 'लॉगिन यशस्वी.'
      };
    } catch {
      return { success: false, requiresPasswordChange: false, message: 'प्रमाणीकरण त्रुटी.' };
    }
  }

  public async changeAdminPassword(
    newPass: string
  ): Promise<{ success: boolean; message: string }> {
    if (!newPass || newPass.length < 6) {
      return { success: false, message: 'नवीन पासवर्ड किमान ६ अक्षरांचा असावा.' };
    }
    const salt = Math.random().toString(36).substring(2, 10);
    const hash = await computeSha256(newPass, salt);
    localStorage.setItem(
      ADMIN_CRED_KEY,
      JSON.stringify({
        username: 'admin',
        salt,
        hash,
        passwordChanged: true,
        updatedAt: new Date().toISOString()
      })
    );

    const authData = localStorage.getItem(ADMIN_AUTH_KEY);
    if (authData) {
      const parsed = JSON.parse(authData);
      parsed.requiresPasswordChange = false;
      localStorage.setItem(ADMIN_AUTH_KEY, JSON.stringify(parsed));
    }

    window.dispatchEvent(new CustomEvent('swara_auth_changed'));
    return { success: true, message: 'पासवर्ड यशस्वीरित्या बदलला!' };
  }

  public isPasswordChangeRequired(): boolean {
    try {
      const authData = localStorage.getItem(ADMIN_AUTH_KEY);
      if (!authData) return false;
      const parsed = JSON.parse(authData);
      return Boolean(parsed.requiresPasswordChange);
    } catch {
      return false;
    }
  }

  public loginAdmin(email: string, requiresPasswordChange = false): void {
    localStorage.setItem(
      ADMIN_AUTH_KEY,
      JSON.stringify({ email, requiresPasswordChange, loggedAt: new Date().toISOString() })
    );
    window.dispatchEvent(new CustomEvent('swara_auth_changed'));
  }

  public logoutAdmin(): void {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    window.dispatchEvent(new CustomEvent('swara_auth_changed'));
  }
}

export const store = new StoreService();
