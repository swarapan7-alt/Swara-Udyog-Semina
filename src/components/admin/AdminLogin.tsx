import React, { useState } from 'react';
import { Lock, User, Key, ShieldCheck, ArrowRight, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { store } from '../../services/store';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToHome }) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('कृपया युझरनेम (Username) प्रविष्ट करा.');
      return;
    }

    if (!password) {
      setError('कृपया पासवर्ड प्रविष्ट करा.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await store.verifyAdminLogin(username, password);
      if (res.success) {
        if (res.requiresPasswordChange) {
          setIsChangingPassword(true);
        } else {
          onSuccess();
        }
      } else {
        setError(res.message || 'अवैध युझरनेम किंवा पासवर्ड.');
      }
    } catch {
      setError('प्रमाणीकरण अयशस्वी झाले. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!newPassword || newPassword.length < 6) {
      setError('नवीन पासवर्ड किमान ६ अक्षरांचा असावा.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('दोन्ही पासवर्ड जुळत नाहीत.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await store.changeAdminPassword(newPassword);
      if (res.success) {
        onSuccess();
      } else {
        setError(res.message);
      }
    } catch {
      setError('पासवर्ड बदलताना त्रुटी आली.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-800 to-emerald-900 mx-auto flex items-center justify-center text-white shadow-xl mb-3">
            <Lock className="w-7 h-7 text-amber-300" />
          </div>
          <h2 className="text-2xl font-black text-[#064E3B] font-marathi">
            स्वरा उद्योग समूह - अ‍ॅडमिन लॉगिन
          </h2>
          <p className="text-xs text-slate-500 font-poppins mt-1">
            Swara Communication • E-Seva Training Admin Portal
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow-xl rounded-3xl border border-teal-100 sm:px-10">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-marathi flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          {isChangingPassword ? (
            /* Mandatory First-Login Password Change Form */
            <form className="space-y-4" onSubmit={handlePasswordChange}>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-marathi">
                <strong>सुरक्षा सूचना:</strong> प्रथम लॉगिनसाठी कृपया आपला नवीन सुरक्षित पासवर्ड तयार करा.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                  नवीन पासवर्ड (New Password) *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="किमान ६ अक्षरे..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-marathi">
                  नवीन पासवर्ड पुन्हा प्रविष्ट करा (Confirm Password) *
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="पुन्हा पासवर्ड टाका..."
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 shadow-md transition-all font-marathi flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>पासवर्ड सेव्ह करून सुरू करा</span>
                </button>
              </div>
            </form>
          ) : (
            /* Standard Admin Login Form */
            <form className="space-y-4" onSubmit={handleSubmitLogin}>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">
                  Username (वापरकर्ता नाव)
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1 font-poppins">
                  Password (पासवर्ड)
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-600 font-poppins"
                  />
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>SHA-256 कूटबद्ध प्रमाणीकरण</span>
                  <span className="text-teal-700 font-medium">Secured</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-teal-700 to-emerald-700 hover:from-teal-800 hover:to-emerald-800 shadow-md transition-all font-marathi flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <span>पडताळणी होत आहे...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-amber-300" />
                      <span>लॉगिन करा (Secure Admin Login)</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs text-teal-800 hover:text-teal-950 font-marathi font-bold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>मुख्य लँडिंग पानावर परत जा</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
