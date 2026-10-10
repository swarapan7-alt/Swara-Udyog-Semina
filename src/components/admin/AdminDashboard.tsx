import React, { useState, useEffect } from 'react';
import { EventSettings, Participant, AdminStats, FaqItem, TrainingTopic } from '../../types';
import { store } from '../../services/store';
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Calendar,
  Image as ImageIcon,
  FileEdit,
  Settings,
  LogOut,
  ExternalLink,
  Download,
  Search,
  CheckCircle2,
  Clock,
  Trash2,
  Edit,
  Save,
  Plus,
  RefreshCw,
  Phone,
  MessageCircle,
  Upload,
  Check,
  ChevronRight,
  Key,
  Building2,
  AlertCircle,
  UserCheck,
  User,
  Camera,
  Sliders
} from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
  onViewLandingPage: () => void;
}

type TabType = 'overview' | 'registrations' | 'payments' | 'event-details' | 'founder' | 'images' | 'content' | 'settings';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, onViewLandingPage }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [settings, setSettings] = useState<EventSettings | null>(null);
  const [registrations, setRegistrations] = useState<Participant[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'verified' | 'pending' | 'initiated'>('all');

  // Edit Participant Modal State
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [editStatus, setEditStatus] = useState<Participant['paymentStatus']>('initiated');
  const [editNotes, setEditNotes] = useState('');
  const [editTransRef, setEditTransRef] = useState('');

  // Password change in settings
  const [newPasswordSetting, setNewPasswordSetting] = useState('');
  const [pwdMessage, setPwdMessage] = useState('');

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form states for Event Details
  const [eventForm, setEventForm] = useState<EventSettings | null>(null);

  // Form states for Content Editor
  const [faqsList, setFaqsList] = useState<FaqItem[]>([]);
  const [newFaqQ, setNewFaqQ] = useState('');
  const [newFaqA, setNewFaqA] = useState('');

  const adminEmail = store.getAdminEmail() || 'admin';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [s, r, st] = await Promise.all([
        store.getEventSettings(),
        store.getRegistrations(),
        store.getStats()
      ]);
      setSettings(s);
      setEventForm(s);
      setFaqsList(s.faqs || []);
      setRegistrations(r);
      setStats(st);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    const handleSettingsUpdate = () => loadData();
    const handleRegUpdate = () => loadData();

    window.addEventListener('swara_settings_updated', handleSettingsUpdate);
    window.addEventListener('swara_registrations_updated', handleRegUpdate);

    return () => {
      window.removeEventListener('swara_settings_updated', handleSettingsUpdate);
      window.removeEventListener('swara_registrations_updated', handleRegUpdate);
    };
  }, []);

  // Save Event Settings
  const handleSaveSettings = async () => {
    if (!eventForm) return;
    setIsSaving(true);
    try {
      const updated = {
        ...eventForm,
        faqs: faqsList
      };
      await store.saveEventSettings(updated);
      setSettings(updated);
      showToast('सर्व बदल यशस्वीरित्या जतन झाले आणि वेबसाईटवर त्वरित पब्लिश झाले!');
    } catch {
      showToast('बदल सेव्ह करताना त्रुटी आली.');
    } finally {
      setIsSaving(false);
    }
  };

  // Participant Actions
  const handleOpenEditParticipant = (p: Participant) => {
    setSelectedParticipant(p);
    setEditStatus(p.paymentStatus);
    setEditNotes(p.adminNotes || '');
    setEditTransRef(p.transactionRef || '');
  };

  const handleSaveParticipantEdit = async () => {
    if (!selectedParticipant) return;
    try {
      await store.updateParticipant(selectedParticipant.id, {
        paymentStatus: editStatus,
        adminNotes: editNotes,
        transactionRef: editTransRef
      });
      setSelectedParticipant(null);
      showToast(`सहभागी ${selectedParticipant.fullName} यांचे तपशील अपडेट झाले.`);
      loadData();
    } catch {
      showToast('सहभागी तपशील अपडेट करताना त्रुटी आली.');
    }
  };

  const handleDeleteParticipant = async (id: string, name: string) => {
    if (confirm(`तुम्हाला खात्री आहे का की सहभागी "${name}" ची नोंदणी हटवायची आहे? ही क्रिया पूर्ववत करता येणार नाही.`)) {
      try {
        await store.deleteParticipant(id);
        showToast(`सहभागी नोंदणी हटवली गेली.`);
        loadData();
      } catch {
        showToast('हटवताना त्रुटी आली.');
      }
    }
  };

  const handleTogglePaymentVerify = async (p: Participant) => {
    const newStatus: Participant['paymentStatus'] = p.paymentStatus === 'verified' ? 'pending' : 'verified';
    await store.updateParticipant(p.id, {
      paymentStatus: newStatus,
      transactionRef: p.transactionRef || (newStatus === 'verified' ? `VERIFIED-${Date.now().toString().slice(-4)}` : '')
    });
    showToast(`पेमेंट स्थिती बदलली: ${newStatus === 'verified' ? 'व्हेरिफाय झाले' : 'प्रलंबित'}`);
    loadData();
  };

  // Handle Image Upload with client-side compression for high performance & reliability
  const handleImageUpload = (field: 'heroImageUrl' | 'logoUrl' | 'trainerImageUrl' | 'founderImageUrl', file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) return;

      // Use HTML5 Canvas to resize & compress high-res mobile/camera photos
      const img = new Image();
      img.onload = () => {
        const maxDim = field === 'logoUrl' ? 400 : 1200;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.85);

          if (eventForm) {
            const updated = { ...eventForm, [field]: compressedDataUrl };
            setEventForm(updated);
            store.saveEventSettings(updated);
            showToast('छायाचित्र यशस्वीरित्या अपलोड झाले आणि जतन झाले!');
          }
        } else {
          // Fallback to raw if canvas context unavailable
          if (eventForm) {
            const updated = { ...eventForm, [field]: rawDataUrl };
            setEventForm(updated);
            store.saveEventSettings(updated);
            showToast('छायाचित्र जतन झाले!');
          }
        }
      };
      img.onerror = () => {
        showToast('छायाचित्र वाचताना त्रुटी आली. कृपया दुसरी फाईल निवडा.');
      };
      img.src = rawDataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Add FAQ
  const handleAddFaq = () => {
    if (!newFaqQ.trim() || !newFaqA.trim()) {
      alert('कृपया प्रश्न आणि उत्तर दोन्ही भरा.');
      return;
    }
    const updated = [
      ...faqsList,
      { id: `faq-${Date.now()}`, question: newFaqQ.trim(), answer: newFaqA.trim() }
    ];
    setFaqsList(updated);
    setNewFaqQ('');
    setNewFaqA('');
    if (eventForm) {
      setEventForm({ ...eventForm, faqs: updated });
    }
    showToast('नवीन FAQ जोडला गेला. सेव्ह करण्यासाठी खालील बटनावर क्लिक करा.');
  };

  // Remove FAQ
  const handleRemoveFaq = (index: number) => {
    const updated = faqsList.filter((_, i) => i !== index);
    setFaqsList(updated);
    if (eventForm) {
      setEventForm({ ...eventForm, faqs: updated });
    }
  };

  // Reset all to default
  const handleResetDefaults = async () => {
    if (confirm('सर्व सेटिंग्स मूळ स्थितीत (Default) आणायच्या आहेत का? याने तुम्ही केलेले बदल रीसेट होतील.')) {
      const res = await store.resetEventSettings();
      setSettings(res);
      setEventForm(res);
      setFaqsList(res.faqs);
      showToast('सर्व सेटिंग्स यशस्वीरित्या रीसेट झाल्या.');
    }
  };

  // Update password in settings
  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage('');
    if (newPasswordSetting.length < 6) {
      setPwdMessage('पासवर्ड किमान ६ अक्षरांचा असावा.');
      return;
    }
    const res = await store.changeAdminPassword(newPasswordSetting);
    setPwdMessage(res.message);
    setNewPasswordSetting('');
  };

  // Filtered registrations
  const filteredRegistrations = registrations.filter((p) => {
    const matchesSearch =
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery) ||
      p.registrationId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.district.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ? true : p.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (isLoading || !settings || !eventForm || !stats) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center font-marathi">
          <RefreshCw className="w-8 h-8 text-teal-700 animate-spin mx-auto mb-2" />
          <p className="text-sm text-slate-600">अ‍ॅडमिन डेटा लोड होत आहे...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2FBF9] flex flex-col">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-teal-950 text-white px-5 py-3 rounded-2xl shadow-2xl border border-teal-500 flex items-center gap-3 text-sm font-marathi animate-slide-in">
          <CheckCircle2 className="w-5 h-5 text-amber-300 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navbar */}
      <header className="bg-white border-b border-teal-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-800 text-white flex items-center justify-center font-bold text-sm shadow-xs">
              स्व
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold text-teal-950 font-marathi leading-tight">
                स्वरा उद्योग समूह • अ‍ॅडमिन पॅनेल
              </h1>
              <p className="text-[11px] text-slate-500 font-poppins">
                Logged in: <span className="font-semibold text-teal-700">{adminEmail}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onViewLandingPage}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-950 text-xs font-bold border border-teal-200 transition-colors font-marathi"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden sm:inline">वेबसाईट पहा</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 transition-colors font-marathi"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">लॉगआऊट</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col md:flex-row gap-6">
        {/* Desktop Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl p-3 border border-teal-100 shadow-xs space-y-1">
            {[
              { id: 'overview', label: 'डॅशबोर्ड सारांश', icon: LayoutDashboard },
              { id: 'registrations', label: 'सहभागी यादी', icon: Users, badge: registrations.length },
              { id: 'payments', label: 'पेमेंट व्यवस्थापन', icon: CreditCard },
              { id: 'event-details', label: 'कार्यक्रमाचे तपशील', icon: Calendar },
              { id: 'founder', label: 'संस्थापक प्रोफाईल', icon: UserCheck },
              { id: 'images', label: 'इमेज मॅनेजर', icon: ImageIcon },
              { id: 'content', label: 'वेबसाईट मजकूर', icon: FileEdit },
              { id: 'settings', label: 'पेमेंट व सिस्टीम', icon: Settings }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as TabType)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold font-marathi transition-all text-left ${
                    isActive
                      ? 'bg-teal-800 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-teal-50 hover:text-teal-950'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-poppins ${
                        isActive ? 'bg-white/20 text-white' : 'bg-teal-100 text-teal-900'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick status summary box */}
          <div className="mt-4 bg-gradient-to-br from-teal-950 to-emerald-950 text-white p-4 rounded-2xl shadow-xs">
            <div className="text-[11px] uppercase tracking-wider text-amber-300 font-poppins mb-1">
              Live Razorpay Link
            </div>
            <p className="text-xs text-teal-200 truncate font-poppins mb-2">
              {settings.razorpayUrl}
            </p>
            <a
              href={settings.razorpayUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-300 hover:underline font-marathi"
            >
              <span>पेमेंट लिंक तपासा</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white rounded-3xl p-5 sm:p-7 border border-teal-100 shadow-sm overflow-hidden">
          {/* TAB 1: OVERVIEW / DASHBOARD STATS */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-marathi">
                    डॅशबोर्ड सारांश (Dashboard Overview)
                  </h2>
                  <p className="text-xs text-slate-500 font-marathi">
                    ई-सेवा बिझनेस ग्रोथ ट्रेनिंग - सांगली कार्यशाळा मुख्य आकडेवारी
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => store.exportRegistrationsCSV()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-950 text-xs font-bold border border-teal-200 transition-colors font-marathi"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV डाऊनलोड</span>
                  </button>
                </div>
              </div>

              {/* Statistics Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-teal-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-marathi mb-1">
                    <span>एकूण नोंदणी (Registrations)</span>
                    <Users className="w-4 h-4 text-teal-700" />
                  </div>
                  <div className="text-2xl font-black text-teal-950 font-poppins">
                    {stats.totalRegistrations}
                  </div>
                  <div className="text-[11px] text-slate-500 font-marathi mt-1">
                    क्षमता: {settings.maxSeats} जागा (उर्वरित: {stats.seatsLeft})
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                  <div className="flex items-center justify-between text-xs text-emerald-800 font-marathi mb-1">
                    <span>व्हेरिफाय सीट बुकिंग</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-emerald-900 font-poppins">
                    {stats.verifiedCount}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-marathi mt-1">
                    प्रत्येकी ₹{settings.bookingFee} जमा
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-center justify-between text-xs text-amber-800 font-marathi mb-1">
                    <span>प्रलंबित पेमेंट (Pending)</span>
                    <Clock className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black text-amber-900 font-poppins">
                    {stats.pendingCount}
                  </div>
                  <div className="text-[11px] text-amber-700 font-marathi mt-1">
                    फॉलोअप आवश्यक
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200">
                  <div className="flex items-center justify-between text-xs text-teal-800 font-marathi mb-1">
                    <span>एकूण जमा रक्कम (Verified Collections)</span>
                    <CreditCard className="w-4 h-4 text-teal-700" />
                  </div>
                  <div className="text-2xl font-black text-teal-950 font-poppins">
                    ₹{stats.totalCollected.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-teal-700 font-marathi mt-1">
                    {stats.verifiedCount} x ₹{settings.bookingFee}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                  <div className="flex items-center justify-between text-xs text-blue-800 font-marathi mb-1">
                    <span>वेन्यूवर देय रक्कम (Remaining Balance)</span>
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-black text-blue-950 font-poppins">
                    ₹{stats.pendingBalance.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-blue-700 font-marathi mt-1">
                    १७ ऑक्टोबर रोजी देय (₹{settings.remainingFee} x {stats.verifiedCount})
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200">
                  <div className="flex items-center justify-between text-xs text-orange-900 font-marathi mb-1">
                    <span>शिल्लक जागा (Seats Available)</span>
                    <Users className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="text-2xl font-black text-orange-950 font-poppins">
                    {stats.seatsLeft}
                  </div>
                  <div className="text-[11px] text-orange-800 font-marathi mt-1">
                    {stats.seatsLeft <= 10 ? 'लवकरच संपत आहेत!' : 'नोंदणी सुरू आहे'}
                  </div>
                </div>
              </div>

              {/* Recent Registrations Table snippet */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-slate-900 font-marathi">
                    अलिकडील नोंदणी (Recent Registrations)
                  </h3>
                  <button
                    onClick={() => setActiveTab('registrations')}
                    className="text-xs font-bold text-teal-800 hover:text-teal-950 font-marathi flex items-center gap-1"
                  >
                    <span>सर्व पहा ({registrations.length})</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="border border-teal-100 rounded-2xl overflow-x-auto">
                  <table className="w-full text-left text-xs font-marathi">
                    <thead className="bg-[#FAF9F6] text-slate-600 border-b border-teal-100 font-bold">
                      <tr>
                        <th className="p-3">ID</th>
                        <th className="p-3">नाव</th>
                        <th className="p-3">मोबाईल</th>
                        <th className="p-3">गाव/शहर</th>
                        <th className="p-3">पेमेंट स्थिती</th>
                        <th className="p-3">कृती</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {registrations.slice(0, 5).map((p) => (
                        <tr key={p.id} className="hover:bg-teal-50/20">
                          <td className="p-3 font-poppins font-semibold text-teal-900">{p.registrationId}</td>
                          <td className="p-3 font-bold text-slate-900">{p.fullName}</td>
                          <td className="p-3 font-poppins">{p.phone}</td>
                          <td className="p-3 text-slate-600">{p.city}, {p.district}</td>
                          <td className="p-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                p.paymentStatus === 'verified'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : p.paymentStatus === 'pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-slate-100 text-slate-700'
                              }`}
                            >
                              {p.paymentStatus === 'verified' ? 'व्हेरिफाय' : 'प्रलंबित'}
                            </span>
                          </td>
                          <td className="p-3">
                            <button
                              onClick={() => handleOpenEditParticipant(p)}
                              className="text-teal-700 hover:text-teal-900 font-bold"
                            >
                              संपादित करा
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PARTICIPANTS MANAGEMENT */}
          {activeTab === 'registrations' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-marathi">
                    सहभागी व्यवस्थापन (Participant Management)
                  </h2>
                  <p className="text-xs text-slate-500 font-marathi">
                    नोंदणी केलेल्या सर्व व्यक्तींची यादी, संपर्क, स्थिती व नोट्स
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => store.exportRegistrationsCSV()}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-xs transition-colors font-marathi"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>CSV फाईल डाऊनलोड करा</span>
                  </button>
                </div>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="नाव, मोबाईल, नोंदणी क्रमांक किंवा शहरानुसार शोधा..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as any)}
                    className="px-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 font-marathi bg-white"
                  >
                    <option value="all">सर्व स्थिती (All)</option>
                    <option value="verified">व्हेरिफाय (Verified)</option>
                    <option value="pending">प्रलंबित (Pending)</option>
                    <option value="initiated">नोंदणी सुरू (Initiated)</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="border border-teal-100 rounded-2xl overflow-x-auto">
                <table className="w-full text-left text-xs font-marathi min-w-[650px]">
                  <thead className="bg-[#FAF9F6] text-slate-600 border-b border-teal-100 font-bold">
                    <tr>
                      <th className="p-3">Reg ID</th>
                      <th className="p-3">पूर्ण नाव</th>
                      <th className="p-3">मोबाईल</th>
                      <th className="p-3">जिल्हा व शहर</th>
                      <th className="p-3">केंद्राचा प्रकार</th>
                      <th className="p-3">पेमेंट स्थिती</th>
                      <th className="p-3">टिप्पणी / UTR</th>
                      <th className="p-3 text-right">कृती</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRegistrations.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-8 text-center text-slate-500 font-marathi">
                          कोणतीही नोंदणी आढळली नाही.
                        </td>
                      </tr>
                    ) : (
                      filteredRegistrations.map((p) => (
                        <tr key={p.id} className="hover:bg-teal-50/20">
                          <td className="p-3 font-poppins font-bold text-teal-900">{p.registrationId}</td>
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{p.fullName}</div>
                            <div className="text-[11px] text-slate-500">{p.businessName || '-'}</div>
                          </td>
                          <td className="p-3 font-poppins">
                            <div className="font-medium text-slate-800">{p.phone}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <a
                                href={`tel:${p.phone}`}
                                className="text-teal-600 hover:text-teal-800"
                                title="कॉल करा"
                              >
                                <Phone className="w-3 h-3" />
                              </a>
                              <a
                                href={`https://wa.me/91${p.phone}?text=${encodeURIComponent(`नमस्कार ${p.fullName}, Swara Udyog Samuh कडून आपल्या E-Seva Training बाबत संपर्क करत आहोत.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-800"
                                title="WhatsApp"
                              >
                                <MessageCircle className="w-3 h-3" />
                              </a>
                            </div>
                          </td>
                          <td className="p-3 text-slate-700">
                            {p.city}, {p.district}
                          </td>
                          <td className="p-3 text-slate-600 text-[11px]">{p.centerType}</td>
                          <td className="p-3">
                            <button
                              onClick={() => handleTogglePaymentVerify(p)}
                              title="स्थिती बदलण्यासाठी क्लिक करा"
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                                p.paymentStatus === 'verified'
                                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                  : p.paymentStatus === 'pending'
                                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                              }`}
                            >
                              {p.paymentStatus === 'verified' ? (
                                <>
                                  <Check className="w-3 h-3" />
                                  <span>व्हेरिफाय</span>
                                </>
                              ) : (
                                <span>प्रलंबित</span>
                              )}
                            </button>
                          </td>
                          <td className="p-3 text-[11px] text-slate-600 max-w-[150px] truncate">
                            {p.transactionRef ? (
                              <span className="font-mono text-teal-800 block truncate">{p.transactionRef}</span>
                            ) : null}
                            <span>{p.adminNotes || '-'}</span>
                          </td>
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenEditParticipant(p)}
                                className="p-1 rounded-lg text-slate-600 hover:text-teal-700 hover:bg-teal-50"
                                title="संपादित करा"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteParticipant(p.id, p.fullName)}
                                className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                                title="हटवा"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENTS MANAGEMENT */}
          {activeTab === 'payments' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900 font-marathi">
                  पेमेंट व्यवस्थापन आणि पडताळणी (Payment Management)
                </h2>
                <p className="text-xs text-slate-500 font-marathi">
                  सीट बुकिंग रक्कम (₹४९९), एकूण फी (₹३,४९९) आणि उर्वरित शिल्लक (₹३,०००) पडताळणी
                </p>
              </div>

              {/* Summary Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                  <div className="text-xs font-medium text-teal-800 font-marathi">जमा सीट बुकिंग रक्कम</div>
                  <div className="text-2xl font-black text-teal-950 font-poppins">
                    ₹{stats.totalCollected.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-teal-700 font-marathi">
                    {stats.verifiedCount} सहभागींकडून प्राप्त
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                  <div className="text-xs font-medium text-amber-800 font-marathi">वेन्यूवर येणारी शिल्लक</div>
                  <div className="text-2xl font-black text-amber-950 font-poppins">
                    ₹{stats.pendingBalance.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-amber-700 font-marathi">
                    १७ ऑक्टोबर रोजी वेन्यूवर गोळा करायची रक्कम
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs font-medium text-emerald-800 font-marathi">अपेक्षित एकूण महसूल</div>
                  <div className="text-2xl font-black text-emerald-950 font-poppins">
                    ₹{(stats.verifiedCount * settings.totalFee).toLocaleString('en-IN')}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-marathi">
                    {stats.verifiedCount} x ₹{settings.totalFee}
                  </div>
                </div>
              </div>

              {/* Transactions List */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-marathi mb-3">
                  सहभागी पेमेंट पडताळणी यादी
                </h3>

                <div className="border border-teal-100 rounded-2xl overflow-x-auto">
                  <table className="w-full text-left text-xs font-marathi">
                    <thead className="bg-[#FAF9F6] text-slate-600 border-b border-teal-100 font-bold">
                      <tr>
                        <th className="p-3">नाव व संपर्क</th>
                        <th className="p-3">सीट बुकिंग (₹४९९)</th>
                        <th className="p-3">उर्वरित शिल्लक (₹३,०००)</th>
                        <th className="p-3">ट्रान्झॅक्शन / UTR क्र.</th>
                        <th className="p-3">स्थिती</th>
                        <th className="p-3 text-right">कृती</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {registrations.map((p) => (
                        <tr key={p.id} className="hover:bg-teal-50/20">
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{p.fullName}</div>
                            <div className="text-[11px] text-slate-500 font-poppins">{p.phone}</div>
                          </td>
                          <td className="p-3">
                            <span className="font-poppins font-bold text-slate-800">₹{settings.bookingFee}</span>
                          </td>
                          <td className="p-3">
                            <span className="font-poppins font-semibold text-orange-900">₹{settings.remainingFee}</span>
                          </td>
                          <td className="p-3 font-mono text-teal-800">
                            {p.transactionRef || <span className="text-slate-400 font-sans">उपलब्ध नाही</span>}
                          </td>
                          <td className="p-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                p.paymentStatus === 'verified'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {p.paymentStatus === 'verified' ? 'व्हेरिफाय झाले' : 'प्रलंबित'}
                            </span>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleTogglePaymentVerify(p)}
                              className="px-2.5 py-1 rounded-lg text-xs font-bold text-teal-800 hover:bg-teal-100 transition-colors"
                            >
                              {p.paymentStatus === 'verified' ? 'रद्द करा' : 'व्हेरिफाय करा'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: EVENT DETAILS */}
          {activeTab === 'event-details' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-marathi">
                    कार्यक्रमाचे तपशील संपादन (Event Details)
                  </h2>
                  <p className="text-xs text-slate-500 font-marathi">
                    तारीख, वेळ, ठिकाण, कार्यालयीन पत्ता, फी आणि जागा क्षमता
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-xs transition-colors font-marathi cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'जतन होत आहे...' : 'बदल सेव्ह करा'}</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    कार्यक्रमाचे शीर्षक (Event Title)
                  </label>
                  <input
                    type="text"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    आयोजक संस्था (Organizer)
                  </label>
                  <input
                    type="text"
                    value={eventForm.organizer}
                    onChange={(e) => setEventForm({ ...eventForm, organizer: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    दिनांक (Dates)
                  </label>
                  <input
                    type="text"
                    value={eventForm.dates}
                    onChange={(e) => setEventForm({ ...eventForm, dates: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    वार (Days)
                  </label>
                  <input
                    type="text"
                    value={eventForm.days}
                    onChange={(e) => setEventForm({ ...eventForm, days: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    वेळ (Time)
                  </label>
                  <input
                    type="text"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    ठिकाण / वेन्यू (Venue Name)
                  </label>
                  <input
                    type="text"
                    value={eventForm.venue}
                    onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    वेन्यूचा पत्ता (Venue Address)
                  </label>
                  <input
                    type="text"
                    value={eventForm.address}
                    onChange={(e) => setEventForm({ ...eventForm, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    अधिकृत कार्यालयीन पत्ता (Office Address) *
                  </label>
                  <input
                    type="text"
                    value={eventForm.officeAddress || ''}
                    onChange={(e) => setEventForm({ ...eventForm, officeAddress: e.target.value })}
                    placeholder="Swara Communication, BJP Office Basement, Near Indian Bank, Sangli-Miraj Road, Vishrambag, Sangli, Maharashtra, India."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    Google Maps URL
                  </label>
                  <input
                    type="text"
                    value={eventForm.mapUrl}
                    onChange={(e) => setEventForm({ ...eventForm, mapUrl: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  />
                </div>

                {/* Fees */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    सीट बुकिंग रक्कम (Booking Amount ₹)
                  </label>
                  <input
                    type="number"
                    value={eventForm.bookingFee}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEventForm({
                        ...eventForm,
                        bookingFee: val,
                        remainingFee: eventForm.totalFee - val
                      });
                    }}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    एकूण प्रशिक्षण फी (Total Training Fee ₹)
                  </label>
                  <input
                    type="number"
                    value={eventForm.totalFee}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setEventForm({
                        ...eventForm,
                        totalFee: val,
                        remainingFee: val - eventForm.bookingFee
                      });
                    }}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    उर्वरित शिल्लक (Remaining Balance ₹)
                  </label>
                  <input
                    type="number"
                    value={eventForm.remainingFee}
                    readOnly
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-200 bg-slate-50 font-poppins text-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    मर्यादित जागा क्षमता (Max Seat Capacity)
                  </label>
                  <input
                    type="number"
                    value={eventForm.maxSeats}
                    onChange={(e) => setEventForm({ ...eventForm, maxSeats: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="text-xs text-rose-600 hover:text-rose-800 font-marathi"
                >
                  डिफॉल्ट डेटावर रीसेट करा
                </button>

                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-md transition-colors font-marathi"
                >
                  {isSaving ? 'जतन होत आहे...' : 'बदल सेव्ह आणि पब्लिश करा'}
                </button>
              </div>
            </div>
          )}

          {/* TAB: FOUNDER PROFILE SETTINGS */}
          {activeTab === 'founder' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-marathi">
                    संस्थापक प्रोफाईल व्यवस्थापन (Founder & CEO Profile)
                  </h2>
                  <p className="text-xs text-slate-500 font-marathi">
                    श्री. पंकज वाघमारे यांचे मूळ छायाचित्र, पद, अनुभव आणि परिचय संपादित करा
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-xs transition-colors font-marathi cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSaving ? 'जतन होत आहे...' : 'बदल सेव्ह करा'}</span>
                </button>
              </div>

              {/* Photo Management Section */}
              <div className="p-5 rounded-2xl bg-[#FAF9F6] border border-teal-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-teal-950 font-marathi">
                      संस्थापक छायाचित्र (Founder Photograph)
                    </h3>
                    <p className="text-[11px] text-slate-500 font-marathi">
                      आपले मूळ व अस्सल छायाचित्र येथे अपलोड करा (कोणतेही एआय किंवा स्टॉक छायाचित्र वापरू नका).
                    </p>
                  </div>
                  {eventForm.founderImageUrl && (
                    <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-200 font-marathi">
                      फोटो जोडला आहे
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
                  {/* Photo Preview Box */}
                  <div className="sm:col-span-4 flex flex-col items-center">
                    <div className="relative w-44 aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border-2 border-teal-200 bg-teal-950 flex flex-col items-center justify-center">
                      {eventForm.founderImageUrl ? (
                        <img
                          src={eventForm.founderImageUrl}
                          alt="Founder preview"
                          className={`w-full h-full object-cover transition-transform duration-200 ${
                            eventForm.founderImagePosition === 'top'
                              ? 'object-top'
                              : eventForm.founderImagePosition === 'bottom'
                              ? 'object-bottom'
                              : 'object-center'
                          }`}
                          style={{
                            transform: `scale(${eventForm.founderImageScale || 1})`
                          }}
                        />
                      ) : (
                        <div className="text-center p-4 text-teal-200">
                          <User className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <div className="text-[11px] font-marathi font-bold text-amber-300">फोटो उपलब्ध नाही</div>
                          <p className="text-[10px] text-teal-300/80 font-marathi mt-1">
                            कृपया खालील बटनावरून आपला खरा फोटो अपलोड करा.
                          </p>
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-poppins mt-2">Portrait Ratio 3:4</span>
                  </div>

                  {/* Upload and Positioning Controls */}
                  <div className="sm:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <label className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold cursor-pointer font-marathi shadow-xs transition-colors">
                        <Upload className="w-4 h-4" />
                        <span>{eventForm.founderImageUrl ? 'छायाचित्र बदला (Replace)' : 'नवीन छायाचित्र अपलोड करा'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleImageUpload('founderImageUrl', e.target.files[0]);
                            }
                          }}
                        />
                      </label>

                      {eventForm.founderImageUrl && (
                        <button
                          type="button"
                          onClick={() => {
                            if (confirm('संस्थापकांचे छायाचित्र काढून टाकायचे आहे का? काढून टाकल्यास लँडिंग पेजवर क्लीन प्लेसहोल्डर दिसेल.')) {
                              const updated = { ...eventForm, founderImageUrl: '' };
                              setEventForm(updated);
                              store.saveEventSettings(updated);
                              showToast('छायाचित्र काढून टाकले गेले.');
                            }
                          }}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold border border-rose-200 transition-colors font-marathi"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>छायाचित्र काढा (Remove)</span>
                        </button>
                      )}
                    </div>

                    {/* Image URL input if hosting externally */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-600 mb-1 font-poppins">
                        Direct Image URL (किंवा क्लाऊड लिंक)
                      </label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={eventForm.founderImageUrl || ''}
                        onChange={(e) => setEventForm({ ...eventForm, founderImageUrl: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 font-poppins bg-white"
                      />
                    </div>

                    {/* Positioning & Zoom Scale Controls */}
                    <div className="p-3.5 rounded-xl bg-white border border-teal-100 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-teal-950 font-marathi">
                        <Sliders className="w-3.5 h-3.5 text-teal-700" />
                        <span>छायाचित्र पोझिशन व क्रॉप ऍडजस्टमेंट</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1 font-marathi">
                            उभे अलाइनमेंट (Vertical Alignment)
                          </label>
                          <select
                            value={eventForm.founderImagePosition || 'center'}
                            onChange={(e) => setEventForm({ ...eventForm, founderImagePosition: e.target.value })}
                            className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-marathi bg-white"
                          >
                            <option value="center">मध्यभागी (Center)</option>
                            <option value="top">वरच्या बाजूस (Top - चेहऱ्यावर फोकस)</option>
                            <option value="bottom">खालील बाजूस (Bottom)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-slate-600 mb-1 font-marathi">
                            झूम / क्रॉप लेव्हल (Zoom: {((eventForm.founderImageScale || 1) * 100).toFixed(0)}%)
                          </label>
                          <input
                            type="range"
                            min="1"
                            max="1.8"
                            step="0.05"
                            value={eventForm.founderImageScale || 1}
                            onChange={(e) => setEventForm({ ...eventForm, founderImageScale: parseFloat(e.target.value) })}
                            className="w-full accent-teal-700"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Information Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                      संस्थापकांचे नाव (मराठी सादरीकरण) *
                    </label>
                    <input
                      type="text"
                      value={eventForm.founderNameMr || ''}
                      onChange={(e) => setEventForm({ ...eventForm, founderNameMr: e.target.value })}
                      placeholder="श्री. पंकज वाघमारे"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">
                      Founder Name (English) *
                    </label>
                    <input
                      type="text"
                      value={eventForm.founderName || ''}
                      onChange={(e) => setEventForm({ ...eventForm, founderName: e.target.value })}
                      placeholder="Mr. Pankaj Waghmare"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">
                      Designation (पद) *
                    </label>
                    <input
                      type="text"
                      value={eventForm.founderDesignation || ''}
                      onChange={(e) => setEventForm({ ...eventForm, founderDesignation: e.target.value })}
                      placeholder="Founder & CEO"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                      संस्था / समूह (Organization) *
                    </label>
                    <input
                      type="text"
                      value={eventForm.founderOrganization || ''}
                      onChange={(e) => setEventForm({ ...eventForm, founderOrganization: e.target.value })}
                      placeholder="स्वरा उद्योग समूह"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                      अनुभवाची वर्षे (Experience Years - ऐच्छिक)
                    </label>
                    <input
                      type="text"
                      value={eventForm.founderExperienceYears || ''}
                      onChange={(e) => setEventForm({ ...eventForm, founderExperienceYears: e.target.value })}
                      placeholder="उदा. १०+ (किंवा अंदाजे टाकू नका, हवे असल्यास रिक्त ठेवा)"
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                    />
                    <span className="text-[11px] text-slate-500 font-marathi">
                      सूचना: येथे कोणताही अंदाजे किंवा खोटा आकडा टाकू नका. नंबर टाकल्यास बॅज दिसेल, रिक्त ठेवल्यास बॅज लपवला जाईल.
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    संस्थापकांचा संक्षिप्त परिचय (Short Biography)
                  </label>
                  <textarea
                    rows={4}
                    value={eventForm.founderBio || ''}
                    onChange={(e) => setEventForm({ ...eventForm, founderBio: e.target.value })}
                    placeholder="स्वरा उद्योग समूहाचे संस्थापक व मुख्य मार्गदर्शक..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('संस्थापक प्रोफाईल माहिती मूळ स्थितीवर रीसेट करायची आहे का?')) {
                      setEventForm({
                        ...eventForm,
                        founderName: 'Mr. Pankaj Waghmare',
                        founderNameMr: 'श्री. पंकज वाघमारे',
                        founderDesignation: 'Founder & CEO',
                        founderOrganization: 'स्वरा उद्योग समूह',
                        founderExperienceYears: '',
                        founderImageUrl: '',
                        founderImagePosition: 'center',
                        founderImageScale: 1
                      });
                    }
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 font-marathi"
                >
                  डिफॉल्ट माहिती भरा
                </button>

                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-md transition-colors font-marathi"
                >
                  {isSaving ? 'जतन होत आहे...' : 'संस्थापक प्रोफाईल सेव्ह करा'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: IMAGES / MEDIA MANAGER */}
          {activeTab === 'images' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900 font-marathi">
                  इमेज मॅनेजर (Media & Image Manager)
                </h2>
                <p className="text-xs text-slate-500 font-marathi">
                  हिरो बॅनर इमेज, ब्रँड लोगो आणि मार्गदर्शक फोटो अपलोड किंवा बदला
                </p>
              </div>

              <div className="space-y-6">
                {/* Hero Image */}
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-teal-100 space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-marathi">
                      हिरो बॅनर इमेज (Hero Section Image)
                    </h4>
                    <p className="text-[11px] text-slate-500 font-marathi">
                      मुख्य लँडिंग पानावर दिसणारा मोठा बॅनर फोटो
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-full sm:w-48 h-28 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={eventForm.heroImageUrl}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={eventForm.heroImageUrl}
                        onChange={(e) => setEventForm({ ...eventForm, heroImageUrl: e.target.value })}
                        placeholder="Image URL..."
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 font-poppins"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-950 text-xs font-bold border border-teal-200 cursor-pointer font-marathi">
                        <Upload className="w-3.5 h-3.5" />
                        <span>संगणकावरून फोटो अपलोड करा</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleImageUpload('heroImageUrl', e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Organizer Logo */}
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-teal-100 space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-marathi">
                      आयोजक लोगो (Organizer Logo)
                    </h4>
                    <p className="text-[11px] text-slate-500 font-marathi">
                      स्वरा उद्योग समूह आणि हेडरमधील लोगो
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center">
                      <img
                        src={eventForm.logoUrl}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={eventForm.logoUrl}
                        onChange={(e) => setEventForm({ ...eventForm, logoUrl: e.target.value })}
                        placeholder="Logo URL..."
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 font-poppins"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-950 text-xs font-bold border border-teal-200 cursor-pointer font-marathi">
                        <Upload className="w-3.5 h-3.5" />
                        <span>लोगो अपलोड करा</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleImageUpload('logoUrl', e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Trainer Photo */}
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-teal-100 space-y-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-marathi">
                      मार्गदर्शक फोटो (Trainer Photo)
                    </h4>
                    <p className="text-[11px] text-slate-500 font-marathi">
                      आयोजक व प्रशिक्षक परिचय विभागात दिसणारा फोटो
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                      <img
                        src={eventForm.trainerImageUrl}
                        alt="Trainer preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <input
                        type="text"
                        value={eventForm.trainerImageUrl}
                        onChange={(e) => setEventForm({ ...eventForm, trainerImageUrl: e.target.value })}
                        placeholder="Trainer Image URL..."
                        className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 font-poppins"
                      />
                      <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 text-teal-950 text-xs font-bold border border-teal-200 cursor-pointer font-marathi">
                        <Upload className="w-3.5 h-3.5" />
                        <span>फोटो अपलोड करा</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleImageUpload('trainerImageUrl', e.target.files[0]);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-right">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-md transition-colors font-marathi"
                >
                  बदल सेव्ह करा
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: WEBSITE CONTENT & FAQS */}
          {activeTab === 'content' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 font-marathi">
                    वेबसाईट मजकूर संपादक (Marathi Content Editor)
                  </h2>
                  <p className="text-xs text-slate-500 font-marathi">
                    मराठी मथळे, वर्णन, फोन नंबर, व्हॉट्सअ‍ॅप आणि प्रश्नोत्तरे बदला
                  </p>
                </div>
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-xs transition-colors font-marathi"
                >
                  <Save className="w-4 h-4" />
                  <span>बदल सेव्ह करा</span>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    मुख्य मराठी मथळा (Headline)
                  </label>
                  <input
                    type="text"
                    value={eventForm.marathiHeadline}
                    onChange={(e) => setEventForm({ ...eventForm, marathiHeadline: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    उप-मथळा व लहान वर्णन (Subheadline)
                  </label>
                  <textarea
                    rows={2}
                    value={eventForm.marathiSubheadline}
                    onChange={(e) => setEventForm({ ...eventForm, marathiSubheadline: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    उर्वरित शिल्लक फी स्पष्टीकरण टीप
                  </label>
                  <input
                    type="text"
                    value={eventForm.remainingBalanceNote}
                    onChange={(e) => setEventForm({ ...eventForm, remainingBalanceNote: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                      संपर्क फोन नंबर (Contact Phone)
                    </label>
                    <input
                      type="text"
                      placeholder="उदा. +91 94238 65432 (किंवा रिक्त ठेवा)"
                      value={eventForm.contactPhone}
                      onChange={(e) => setEventForm({ ...eventForm, contactPhone: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-poppins"
                    />
                    <span className="text-[10px] text-slate-500 font-marathi">
                      येथे तुमचा प्रत्यक्ष फोन नंबर टाका.
                    </span>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                      WhatsApp नंबर (WhatsApp Support)
                    </label>
                    <input
                      type="text"
                      placeholder="उदा. +91 94238 65432"
                      value={eventForm.whatsappNumber}
                      onChange={(e) => setEventForm({ ...eventForm, whatsappNumber: e.target.value })}
                      className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-poppins"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                    मार्गदर्शक परिचय (Trainer Bio)
                  </label>
                  <textarea
                    rows={3}
                    value={eventForm.trainerBio}
                    onChange={(e) => setEventForm({ ...eventForm, trainerBio: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-marathi"
                  />
                </div>

                {/* FAQ Management */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-base font-bold text-slate-900 font-marathi mb-3">
                    वारंवार विचारले जाणारे प्रश्न (FAQ व्यवस्थापन)
                  </h3>

                  <div className="space-y-3 mb-4">
                    {faqsList.map((faq, idx) => (
                      <div key={faq.id || idx} className="p-3 rounded-xl bg-teal-50/50 border border-teal-100 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-teal-900 font-marathi">प्रश्न #{idx + 1}</span>
                          <button
                            onClick={() => handleRemoveFaq(idx)}
                            className="text-xs text-rose-600 hover:text-rose-800 font-marathi"
                          >
                            हटवा
                          </button>
                        </div>
                        <input
                          type="text"
                          value={faq.question}
                          onChange={(e) => {
                            const updated = [...faqsList];
                            updated[idx].question = e.target.value;
                            setFaqsList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-marathi"
                        />
                        <textarea
                          rows={2}
                          value={faq.answer}
                          onChange={(e) => {
                            const updated = [...faqsList];
                            updated[idx].answer = e.target.value;
                            setFaqsList(updated);
                          }}
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 font-marathi"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Add new FAQ */}
                  <div className="p-4 rounded-xl border border-dashed border-teal-300 bg-white space-y-2">
                    <div className="text-xs font-bold text-teal-900 font-marathi">नवीन FAQ जोडा</div>
                    <input
                      type="text"
                      placeholder="नवीन प्रश्न..."
                      value={newFaqQ}
                      onChange={(e) => setNewFaqQ(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 font-marathi"
                    />
                    <textarea
                      rows={2}
                      placeholder="उत्तर..."
                      value={newFaqA}
                      onChange={(e) => setNewFaqA(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 font-marathi"
                    />
                    <button
                      type="button"
                      onClick={handleAddFaq}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-100 hover:bg-teal-200 text-teal-900 text-xs font-bold font-marathi"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>FAQ जोडा</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 text-right">
                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-md transition-colors font-marathi"
                >
                  बदल सेव्ह करा
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: SETTINGS & RAZORPAY URL */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-black text-slate-900 font-marathi">
                  पेमेंट आणि सिस्टीम सेटिंग्स (System & Payment Settings)
                </h2>
                <p className="text-xs text-slate-500 font-marathi">
                  Razorpay पेमेंट लिंक, नोंदणी उपलब्धता, पासवर्ड बदल व सुरक्षा पर्याय
                </p>
              </div>

              <div className="space-y-5">
                {/* Razorpay Payment URL */}
                <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-amber-800" />
                    <h3 className="text-sm font-bold text-amber-950 font-marathi">
                      Razorpay पेमेंट URL (Payment Link Setting)
                    </h3>
                  </div>
                  <p className="text-xs text-amber-900 font-marathi leading-relaxed">
                    सर्व सार्वजनिक “सीट बुक करा (₹४९९)” बटनांवर हीच लिंक उघडली जाते.
                  </p>
                  <input
                    type="url"
                    value={eventForm.razorpayUrl}
                    onChange={(e) => setEventForm({ ...eventForm, razorpayUrl: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border border-amber-300 font-poppins bg-white"
                  />
                  <div className="text-[11px] text-slate-500 font-poppins">
                    सध्याची लिंक: <span className="font-semibold text-teal-900">{eventForm.razorpayUrl}</span>
                  </div>
                </div>

                {/* Registration Availability Toggle */}
                <div className="p-4 rounded-2xl bg-[#FAF9F6] border border-teal-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 font-marathi">
                      ऑनलाईन नाव नोंदणी उपलब्धता (Registration Open/Closed)
                    </h4>
                    <p className="text-xs text-slate-500 font-marathi">
                      जागा भरल्यास नोंदणी फॉर्म तात्पुरता बंद करा
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventForm.registrationOpen}
                      onChange={(e) => setEventForm({ ...eventForm, registrationOpen: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-700"></div>
                  </label>
                </div>

                {/* Password Change Module */}
                <div className="p-5 rounded-2xl bg-white border border-teal-200 space-y-3">
                  <div className="flex items-center gap-2">
                    <Key className="w-5 h-5 text-teal-700" />
                    <h4 className="text-sm font-bold text-teal-950 font-marathi">
                      अ‍ॅडमिन पासवर्ड बदला (Change Admin Password)
                    </h4>
                  </div>
                  <form onSubmit={handleUpdatePassword} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="password"
                      placeholder="नवीन पासवर्ड (किमान ६ अक्षरे)..."
                      value={newPasswordSetting}
                      onChange={(e) => setNewPasswordSetting(e.target.value)}
                      className="flex-1 px-3 py-2 text-sm rounded-xl border border-slate-300 font-poppins"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-xl transition-colors font-marathi"
                    >
                      पासवर्ड अपडेट करा
                    </button>
                  </form>
                  {pwdMessage && (
                    <div className="text-xs font-marathi text-teal-800">{pwdMessage}</div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleResetDefaults}
                  className="text-xs text-rose-600 hover:text-rose-800 font-marathi"
                >
                  सर्व पूर्ववत करा (Reset to Default)
                </button>

                <button
                  onClick={handleSaveSettings}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold shadow-md transition-colors font-marathi"
                >
                  {isSaving ? 'जतन होत आहे...' : 'सर्व बदल सेव्ह करा'}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Edit Participant Modal */}
      {selectedParticipant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl border border-teal-100 overflow-hidden">
            <div className="bg-teal-900 text-white p-4 flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-amber-300 font-poppins">
                  {selectedParticipant.registrationId}
                </span>
                <h3 className="text-base font-bold font-marathi">
                  सहभागी तपशील संपादन
                </h3>
              </div>
              <button
                onClick={() => setSelectedParticipant(null)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <div className="text-xs text-slate-500 font-marathi">सहभागीचे नाव:</div>
                <div className="text-base font-bold text-slate-900 font-marathi">{selectedParticipant.fullName}</div>
                <div className="text-xs text-slate-600 font-poppins">{selectedParticipant.phone} • {selectedParticipant.city}</div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                  पेमेंट पडताळणी स्थिती
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-marathi bg-white"
                >
                  <option value="verified">व्हेरिफाय झाले (Verified - ₹499 Received)</option>
                  <option value="pending">प्रलंबित (Pending Followup)</option>
                  <option value="initiated">नोंदणी सुरू (Initiated)</option>
                  <option value="cancelled">रद्द केले (Cancelled)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                  ट्रान्झॅक्शन / UTR क्रमांक (Razorpay ID / UTR)
                </label>
                <input
                  type="text"
                  placeholder="उदा. RZP-PAY-12345 किंवा UPI UTR"
                  value={editTransRef}
                  onChange={(e) => setEditTransRef(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-poppins"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                  अंतर्गत प्रशासकीय टीप (Internal Admin Notes)
                </label>
                <textarea
                  rows={3}
                  placeholder="उदा. ₹४९९ जमा, उर्वरित ₹३,००० १७ ऑक्टोबरला देणार..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-slate-300 font-marathi"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setSelectedParticipant(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:text-slate-800 font-marathi"
                >
                  रद्द करा
                </button>
                <button
                  onClick={handleSaveParticipantEdit}
                  className="px-5 py-2 text-xs font-bold bg-teal-800 hover:bg-teal-900 text-white rounded-xl shadow-xs font-marathi"
                >
                  अपडेट जतन करा
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
