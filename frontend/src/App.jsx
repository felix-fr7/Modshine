import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import DesignPhilosophy from './components/DesignPhilosophy.jsx';
import CategoryCatalog from './components/CategoryCatalog.jsx';
import MaterialBrandSection from './components/MaterialBrandSection.jsx';
import ProcessSection from './components/ProcessSection.jsx';
import CostEstimator from './components/CostEstimator.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import ConsultationModal from './components/ConsultationModal.jsx';
import { Phone } from 'lucide-react';
import { apiUrl } from './config/api.js';

// Helper to check if current browser URL matches the admin endpoint
const isAdminPath = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  return path === '/admin' || path === '/admin/';
};

export default function App() {
  const [currentView, setCurrentView] = useState(() => (isAdminPath() ? 'admin' : 'site'));
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Consultation Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPrefill, setModalPrefill] = useState(null);

  // Pre-fill for Contact section if user clicks inside estimator or product
  const [contactPrefill, setContactPrefill] = useState(null);

  // Synchronize view state with browser URL path (/admin or /)
  const navigateTo = (view) => {
    setCurrentView(view);
    if (typeof window !== 'undefined') {
      const targetPath = view === 'admin' ? '/admin' : '/';
      if (window.location.pathname.toLowerCase() !== targetPath) {
        window.history.pushState({ view }, '', targetPath);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Listen to browser navigation (back / forward buttons and direct URL changes)
  useEffect(() => {
    const handlePopState = () => {
      if (isAdminPath()) {
        setCurrentView('admin');
      } else {
        setCurrentView('site');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Fetch initial data from backend
  const loadInitialData = async () => {
    try {
      const [resProd, resCat, resSet] = await Promise.all([
        fetch(apiUrl('/api/products')),
        fetch(apiUrl('/api/categories')),
        fetch(apiUrl('/api/settings'))
      ]);

      const [dataProd, dataCat, dataSet] = await Promise.all([
        resProd.json(),
        resCat.json(),
        resSet.json()
      ]);

      setProducts(dataProd);
      setCategories(dataCat);
      setSettings(dataSet);
    } catch (err) {
      console.warn('API fetch warning, fallback available:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Handlers
  const handleOpenConsultation = () => {
    setModalPrefill(null);
    setIsModalOpen(true);
  };

  const handleSelectProductForInquiry = (product) => {
    setContactPrefill({
      service: product.categoryName || product.category,
      message: `I am interested in "${product.title}" (${product.boardType || 'HDHMR'} with ${product.hardware || 'Hettich/Ebco'}). Please share customization details and quote.`
    });
    // Scroll smoothly to contact section
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOpenConsultationWithEstimate = (estimateData) => {
    setContactPrefill({
      service: estimateData.scope,
      budget: estimateData.estimateText,
      message: `Calculated Estimate: ${estimateData.estimateText} using ${estimateData.board} and ${estimateData.hardware}. Requesting complimentary 3D site plan.`
    });
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-warm-canvas text-ink-body font-sans flex flex-col selection:bg-brand-primary selection:text-white">
      
      {/* Navigation Bar (Rendered only on live website) */}
      {currentView === 'site' && (
        <Navbar
          currentView={currentView}
          setCurrentView={navigateTo}
          settings={settings}
          onOpenConsultation={handleOpenConsultation}
        />
      )}

      {/* Main Content Router */}
      {currentView === 'admin' ? (
        <AdminDashboard
          onBackToSite={() => navigateTo('site')}
          onRefreshData={loadInitialData}
        />
      ) : (
        <main className="flex-grow pb-16 sm:pb-0">
          {/* 1. Hero Section */}
          <HeroSection
            settings={settings}
            onOpenConsultation={handleOpenConsultation}
          />

          {/* 2. About Us */}
          <AboutSection
            settings={settings}
            onOpenConsultation={handleOpenConsultation}
          />

          {/* 3. Core Services */}
          <ServicesSection
            onOpenConsultation={handleOpenConsultation}
          />

          {/* 4. Design Philosophy */}
          <DesignPhilosophy />

          {/* 5. Dynamic Furniture & Modular Catalog */}
          <CategoryCatalog
            products={products}
            categories={categories}
            onSelectProductForInquiry={handleSelectProductForInquiry}
          />

          {/* 6. Materials & Brands */}
          <MaterialBrandSection />

          {/* 7. 6-Stage Process */}
          <ProcessSection
            onOpenConsultation={handleOpenConsultation}
          />

          {/* 8. Interactive Cost Estimator */}
          <CostEstimator
            onOpenConsultationWithEstimate={handleOpenConsultationWithEstimate}
          />

          {/* 9. Contact & Live Lead Submission */}
          <ContactSection
            settings={settings}
            initialInquiryData={contactPrefill}
            onInquirySubmitted={() => loadInitialData()}
          />

          {/* 10. Footer */}
          <Footer
            settings={settings}
            onOpenConsultation={handleOpenConsultation}
          />
        </main>
      )}

      {/* Floating & Mobile Quick Action Widgets (only on live website) */}
      {currentView === 'site' && (
        <>
          {/* Desktop Floating Action Pill (sm and above) */}
          <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3">
            <a
              href={`tel:${settings?.phone || '+919994412345'}`}
              className="p-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-luxury hover:scale-110 transition-all flex items-center gap-2 group border border-white/20"
              title="Call Modshine Showroom"
            >
              <Phone className="w-5 h-5" />
              <span className="hidden group-hover:inline text-xs font-bold pr-1">
                Call Designer
              </span>
            </a>
          </div>

          {/* Mobile Bottom Sticky Action Bar (Phones under 640px) */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-lg border-t border-warm-border/80 px-3 py-2.5 flex items-center justify-between gap-2 shadow-2xl">
            <a
              href={`tel:${settings?.phone || '+919994412345'}`}
              className="flex-1 py-2.5 px-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-brand-darkest font-bold text-xs flex items-center justify-center gap-1.5 border border-warm-border"
              title="Call Designer"
            >
              <Phone className="w-3.5 h-3.5 text-brand-primary" />
              <span>Call</span>
            </a>

            <a
              href={`https://wa.me/91${(settings?.phone || '9994412345').replace(/[^0-9]/g, '').slice(-10)}?text=Hello%20Modshine%20Interior%2C%20I%20would%20like%20to%20know%20more%20about%20your%20modular%20designs.`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 px-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-300"
              title="Chat on WhatsApp"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>WhatsApp</span>
            </a>

            <button
              onClick={handleOpenConsultation}
              className="flex-[1.5] py-2.5 px-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md border border-gold-champagne/30"
            >
              <span>Free 3D Plan</span>
            </button>
          </div>
        </>
      )}

      {/* Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefillData={modalPrefill}
        onInquirySubmitted={() => loadInitialData()}
      />

    </div>
  );
}
