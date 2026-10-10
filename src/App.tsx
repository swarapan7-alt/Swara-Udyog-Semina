/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { EventSettings } from './types';
import { INITIAL_EVENT_SETTINGS } from './data/initialData';
import { store } from './services/store';

import { Navbar } from './components/Navbar';
import { AnnouncementStrip } from './components/AnnouncementStrip';
import { HeroSection } from './components/HeroSection';
import { FeeSection } from './components/FeeSection';
import { TopicsSection } from './components/TopicsSection';
import { BenefitsSection } from './components/BenefitsSection';
import { FounderSection } from './components/FounderSection';
import { TrainerSection } from './components/TrainerSection';
import { FaqSection } from './components/FaqSection';
import { VenueContactSection } from './components/VenueContactSection';
import { Footer } from './components/Footer';
import { FloatingCta } from './components/FloatingCta';
import { RegistrationModal } from './components/RegistrationModal';
import { PolicyModal, PolicyType } from './components/PolicyModal';

import { AdminLogin } from './components/admin/AdminLogin';
import { AdminDashboard } from './components/admin/AdminDashboard';

export default function App() {
  const [settings, setSettings] = useState<EventSettings>(INITIAL_EVENT_SETTINGS);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [activePolicy, setActivePolicy] = useState<PolicyType>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and check path
  useEffect(() => {
    const checkPath = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path.includes('/admin') || hash === '#admin') {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
      setIsAdminLoggedIn(store.isAdminLoggedIn());
    };

    checkPath();
    window.addEventListener('popstate', checkPath);
    window.addEventListener('hashchange', checkPath);

    const handleAuthChange = () => {
      setIsAdminLoggedIn(store.isAdminLoggedIn());
    };
    window.addEventListener('swara_auth_changed', handleAuthChange);

    // Load dynamic settings
    store.getEventSettings().then((loaded) => {
      setSettings(loaded);
      setIsLoading(false);
    });

    const handleSettingsUpdate = (e: CustomEvent<EventSettings>) => {
      if (e.detail) {
        setSettings(e.detail);
      }
    };
    window.addEventListener('swara_settings_updated' as any, handleSettingsUpdate);

    return () => {
      window.removeEventListener('popstate', checkPath);
      window.removeEventListener('hashchange', checkPath);
      window.removeEventListener('swara_auth_changed', handleAuthChange);
      window.removeEventListener('swara_settings_updated' as any, handleSettingsUpdate);
    };
  }, []);

  const navigateToAdmin = () => {
    setIsAdminView(true);
    window.history.pushState({}, '', '/admin');
  };

  const navigateToHome = () => {
    setIsAdminView(false);
    window.history.pushState({}, '', '/');
  };

  const handleAdminLogout = () => {
    store.logoutAdmin();
    setIsAdminLoggedIn(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center font-marathi">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-teal-200 border-t-teal-700 animate-spin mx-auto mb-3" />
          <p className="text-sm font-bold text-teal-950">स्वरा उद्योग समूह • माहिती लोड होत आहे...</p>
        </div>
      </div>
    );
  }

  // Admin View
  if (isAdminView) {
    if (!isAdminLoggedIn) {
      return (
        <AdminLogin
          onSuccess={() => setIsAdminLoggedIn(true)}
          onBackToHome={navigateToHome}
        />
      );
    }

    return (
      <AdminDashboard
        onLogout={handleAdminLogout}
        onViewLandingPage={navigateToHome}
      />
    );
  }

  // Public Landing Page View
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F6] text-[#1E293B] font-marathi selection:bg-teal-200 selection:text-teal-950">
      {/* Header */}
      <Navbar
        settings={settings}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Continuous Event Announcement Strip directly below Header */}
      <AnnouncementStrip
        settings={settings}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <HeroSection
          settings={settings}
          onOpenRegister={() => setIsRegisterOpen(true)}
        />

        <FeeSection settings={settings} />

        <TopicsSection topics={settings.topics} />

        <BenefitsSection benefits={settings.benefits} />

        <FounderSection
          settings={settings}
          onOpenAdmin={navigateToAdmin}
        />

        <FaqSection
          faqs={settings.faqs}
          contactPhone={settings.contactPhone}
          whatsappNumber={settings.whatsappNumber}
        />

        <VenueContactSection settings={settings} />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        onOpenAdmin={navigateToAdmin}
      />

      {/* Floating CTA & Mobile Bar */}
      <FloatingCta
        settings={settings}
        onOpenRegister={() => setIsRegisterOpen(true)}
      />

      {/* Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        settings={settings}
      />

      {/* Policy Modal */}
      <PolicyModal
        type={activePolicy}
        onClose={() => setActivePolicy(null)}
      />
    </div>
  );
}
