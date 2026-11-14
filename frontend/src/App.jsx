import React, { useState, useEffect, useMemo, lazy, Suspense } from 'react';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import ServicesSection from './components/ServicesSection.jsx';
import DesignPhilosophy from './components/DesignPhilosophy.jsx';
import CategoryCatalog from './components/CategoryCatalog.jsx';
import MaterialBrandSection from './components/MaterialBrandSection.jsx';
import ProcessSection from './components/ProcessSection.jsx';
import TestimonialsSection from './components/TestimonialsSection.jsx';
import CostEstimator from './components/CostEstimator.jsx';
import ContactSection from './components/ContactSection.jsx';
import Footer from './components/Footer.jsx';
import { useSeo } from './seo/useSeo.js';

// Admin studio is downloaded only when someone opens /admin
const AdminApp = lazy(() => import('./admin/AdminApp.jsx'));
import ConsultationModal from './components/ConsultationModal.jsx';
import { Phone, MessageCircle } from 'lucide-react';
import Marquee from './components/ui/Marquee.jsx';
import { apiUrl } from './config/api.js';
import { initialProducts, initialCategories, initialSettings } from './data/defaultData.js';
import { mergeContent } from './data/siteContent.js';
import CinematicLayer from './cinematic/CinematicLayer.jsx';
import { useCinematic } from './cinematic/useCinematic.js';

// Helper to check if current browser URL matches the admin endpoint
const isAdminPath = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  return path === '/admin' || path === '/admin/';
};

export default function App() {
  const [currentView, setCurrentView] = useState(() => (isAdminPath() ? 'admin' : 'site'));
  const [products, setProducts] = useState(() => {
    try {
      const cached = localStorage.getItem('modshine_products');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return initialProducts;
  });
  const [categories, setCategories] = useState(() => {
    try {
      const cached = localStorage.getItem('modshine_categories');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return initialCategories;
  });
  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('modshine_settings');
      if (cached) return JSON.parse(cached);
    } catch (e) {}
    return initialSettings;
  });
  const [loading, setLoading] = useState(false);

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

  // Fetch initial data from backend (smooth live sync)
  const loadInitialData = async () => {
    try {
      const [resProd, resCat, resSet] = await Promise.all([
        fetch(apiUrl('/api/products')),
        fetch(apiUrl('/api/categories')),
        fetch(apiUrl('/api/settings'))
      ]);

      if (resProd.ok && resCat.ok && resSet.ok) {
        const [dataProd, dataCat, dataSet] = await Promise.all([
          resProd.json(),
          resCat.json(),
          resSet.json()
        ]);

        if (Array.isArray(dataProd) && dataProd.length > 0) {
          setProducts(dataProd);
          try { localStorage.setItem('modshine_products', JSON.stringify(dataProd)); } catch(e){}
        }
        if (Array.isArray(dataCat) && dataCat.length > 0) {
          setCategories(dataCat);
          try { localStorage.setItem('modshine_categories', JSON.stringify(dataCat)); } catch(e){}
        }
        if (dataSet && typeof dataSet === 'object') {
          setSettings(dataSet);
          try { localStorage.setItem('modshine_settings', JSON.stringify(dataSet)); } catch(e){}
        }
      }
    } catch (err) {
      console.warn('Backend API connection warning, using curated portfolio data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  // Website content = saved settings merged over defaults (see data/siteContent.js)
  const content = useMemo(() => mergeContent(settings), [settings]);
  useSeo(content, products, currentView === 'site');

  // Cinematic smooth-scroll + scroll-driven 3D animations (live website only)
  useCinematic(currentView === 'site', `${products.length}-${categories.length}-${settings?.updatedAt || ''}`);

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
      message: `Selected Configuration: ${estimateData.scope} with ${estimateData.board} and ${estimateData.hardware}. Requesting custom quote & site inspection.`
    });
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-warm-canvas text-ink-body font-sans flex flex-col">
      
      {/* Cinematic overlays: preloader, scroll progress, cursor, grain */}
      {currentView === 'site' && <CinematicLayer />}

      {/* Navigation Bar (Rendered only on live website) */}
      {currentView === 'site' && (
        <Navbar
          currentView={currentView}
          setCurrentView={navigateTo}
          settings={content}
          onOpenConsultation={handleOpenConsultation}
        />
      )}

      {/* Main Content Router */}
      {currentView === 'admin' ? (
        <Suspense fallback={<div className="min-h-screen bg-warm-canvas" />}>
        <AdminApp
          onBackToSite={() => { loadInitialData(); navigateTo('site'); }}
          onContentSaved={(saved) => {
            setSettings(saved);
            try { localStorage.setItem('modshine_settings', JSON.stringify(saved)); } catch (e) {}
          }}
        />
        </Suspense>
      ) : (
        <main className="flex-grow pb-16 sm:pb-0">
          {/* 1. Hero Section */}
          <HeroSection
            settings={content}
            onOpenConsultation={handleOpenConsultation}
          />

          {/* Category ticker */}
          <Marquee items={categories.map((c) => c.name)} />

          {/* 2. About Us */}
          <AboutSection
            settings={content}
            onOpenConsultation={handleOpenConsultation}
          />

          {/* 3. Core Services */}
          <ServicesSection
            settings={content}
            onOpenConsultation={handleOpenConsultation}
          />

          {/* 4. Design Philosophy */}
          <DesignPhilosophy settings={content} />

          {/* 5. Dynamic Furniture & Modular Catalog */}
          <CategoryCatalog
            settings={content}
            products={products}
            categories={categories}
            onSelectProductForInquiry={handleSelectProductForInquiry}
          />

          {/* 6. Materials & Brands */}
          <MaterialBrandSection settings={content} />

          {/* 7. 6-Stage Process */}
          <ProcessSection
            settings={content}
            onOpenConsultation={handleOpenConsultation}
          />

          {/* 8. Client Testimonials & Reviews */}
          <TestimonialsSection
            settings={content}
            onOpenConsultation={handleOpenConsultation}
          />

          {/* 9. Interactive Cost Estimator */}
          <CostEstimator
            settings={content}
            onOpenConsultationWithEstimate={handleOpenConsultationWithEstimate}
          />

          {/* 10. Contact & Live Lead Submission */}
          <ContactSection
            settings={content}
            initialInquiryData={contactPrefill}
            onInquirySubmitted={() => loadInitialData()}
          />

          {/* 10. Footer */}
          <Footer
            settings={content}
            onOpenConsultation={handleOpenConsultation}
          />
        </main>
      )}

      {/* Floating & Mobile Quick Action Widgets (only on live website) */}
      {currentView === 'site' && (
        <>
          {/* Desktop floating call button */}
          <div className="hidden sm:flex fixed bottom-7 right-7 z-40">
            <a
              href={`tel:${settings?.phone || '+919994412345'}`}
              className="group flex items-center gap-0 hover:gap-3 h-14 pl-[18px] pr-[18px] hover:pr-6 rounded-full bg-brand-darkest text-gold-champagne shadow-luxury-lg border border-gold-champagne/30 transition-all duration-500"
              title="Call Modshine Showroom"
            >
              <Phone className="w-5 h-5 shrink-0" strokeWidth={1.5} />
              <span className="max-w-0 overflow-hidden whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.16em] text-warm-canvas group-hover:max-w-[160px] transition-all duration-500">
                Call Designer
              </span>
            </a>
          </div>

          {/* Mobile bottom action bar */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-warm-canvas/95 backdrop-blur-xl border-t border-warm-border px-2.5 min-[380px]:px-3 py-2.5 pb-[max(0.625rem,env(safe-area-inset-bottom))] flex items-center gap-1.5 min-[380px]:gap-2">
            <a
              href={`tel:${settings?.phone || '+919994412345'}`}
              className="flex-1 min-w-0 h-11 px-2 rounded-full border border-ink-charcoal/15 text-ink-charcoal font-semibold text-[10px] min-[380px]:text-[11px] uppercase tracking-[0.06em] min-[380px]:tracking-[0.1em] whitespace-nowrap flex items-center justify-center gap-1.5"
              title="Call Designer"
            >
              <Phone className="w-3.5 h-3.5 text-brand-primary" />
              <span>Call</span>
            </a>

            <a
              href={`https://wa.me/91${(settings?.phone || '9994412345').replace(/[^0-9]/g, '').slice(-10)}?text=Hello%20Modshine%20Interior%2C%20I%20would%20like%20to%20know%20more%20about%20your%20modular%20designs.`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 min-w-0 h-11 px-2 rounded-full border border-ink-charcoal/15 text-ink-charcoal font-semibold text-[10px] min-[380px]:text-[11px] uppercase tracking-[0.06em] min-[380px]:tracking-[0.1em] whitespace-nowrap flex items-center justify-center gap-1.5"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-brand-accent" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={handleOpenConsultation}
              className="flex-[1.6] min-w-0 h-11 px-3 rounded-full bg-brand-darkest text-warm-canvas font-semibold text-[10px] min-[380px]:text-[11px] uppercase tracking-[0.06em] min-[380px]:tracking-[0.1em] whitespace-nowrap flex items-center justify-center"
            >
              <span>Book Consultation</span>
            </button>
          </div>
        </>
      )}

      {/* Consultation Booking Modal */}
      <ConsultationModal
        settings={content}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        prefillData={modalPrefill}
        onInquirySubmitted={() => loadInitialData()}
      />

    </div>
  );
}
