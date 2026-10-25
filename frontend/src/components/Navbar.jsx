import React, { useState } from 'react';
import { Phone, MapPin, Menu, X, ArrowRight, MessageCircle } from 'lucide-react';

export default function Navbar({ currentView, setCurrentView, settings, onOpenConsultation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Catalog', href: '#catalog' },
    { label: 'Materials', href: '#materials' },
    { label: 'Process', href: '#process' },
    { label: 'Estimator', href: '#estimator' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLogoClick = () => {
    if (currentView !== 'site' && setCurrentView) {
      setCurrentView('site');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Announcement Bar */}
      <div className="bg-brand-darkest text-gold-champagne text-xs py-2 px-3 sm:px-4 border-b border-brand-medium/30">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-2">
          <div className="flex items-center space-x-2 sm:space-x-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1 font-medium text-emerald-200 truncate max-w-[170px] sm:max-w-none">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-primary shrink-0" />
              <span>{settings?.address?.split(',')[1] || 'Pasuvandhanai Road'}, Kovilpatti</span>
            </span>
            <span className="text-brand-medium hidden xs:inline">|</span>
            <a
              href={`tel:${settings?.phone || '+919994412345'}`}
              className="hidden xs:flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-gold-primary shrink-0" />
              <span className="font-semibold tracking-wide">{settings?.phone || '+91 99944 12345'}</span>
            </a>
          </div>

          <div className="flex items-center space-x-2 text-[11px]">
            <span className="text-neutral-300 hidden md:inline">
              {settings?.announcement ? settings.announcement.replace('✨', '').trim() : '10-Year Warranty on HDHMR Boilo Modular Kitchens'}
            </span>
            <a
              href={`tel:${settings?.phone || '+919994412345'}`}
              className="xs:hidden flex items-center gap-1 text-[11px] font-bold text-gold-champagne bg-brand-primary/60 px-2 py-0.5 rounded border border-gold-champagne/30"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Bar */}
      <nav className="glass-panel border-b border-warm-border/60 shadow-sm transition-all relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 gap-4 xl:gap-8">

            {/* Logo */}
            <div
              onClick={handleLogoClick}
              className="cursor-pointer flex items-center space-x-2.5 sm:space-x-3 group shrink-0"
            >
              <img
                src="/assets/Logo.jpg"
                alt="Modshine Interior Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-contain bg-white p-1 border border-warm-border/80 shadow-sm group-hover:scale-105 transition-transform shrink-0"
              />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-serif text-lg sm:text-2xl font-bold tracking-tight text-brand-darkest uppercase leading-none">
                    Modshine
                  </span>
                  <span className="font-sans text-[9px] sm:text-[10px] tracking-widest font-bold px-1.5 py-0.5 rounded bg-brand-light text-brand-primary border border-brand-primary/20">
                    INTERIOR
                  </span>
                </div>
                <span className="text-[8px] sm:text-[9px] tracking-wider text-ink-muted uppercase font-semibold mt-0.5 sm:mt-1 truncate max-w-[180px] sm:max-w-none">
                  {settings?.tagline || 'DECORATE YOUR HOME THE EASY WAY'}
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center justify-center flex-1 gap-4 xl:gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs xl:text-sm font-semibold text-ink-body hover:text-brand-primary transition-colors tracking-wide relative group py-1 whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Right Action CTA (Desktop) */}
            <div className="hidden sm:flex items-center shrink-0">
              <button
                onClick={onOpenConsultation}
                className="px-4 xl:px-5 py-2.5 rounded-full bg-brand-primary hover:bg-brand-dark text-white font-semibold text-xs xl:text-sm tracking-wide shadow-luxury hover:shadow-luxury-lg transition-all flex items-center gap-2 group border border-gold-champagne/30 whitespace-nowrap"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-gold-champagne" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-ink-body hover:text-brand-primary hover:bg-warm-cream focus:outline-none transition-colors"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-brand-primary" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Backdrop */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-warm-border bg-white/98 backdrop-blur-xl shadow-2xl px-4 pt-3 pb-6 space-y-4 animate-fadeIn max-h-[85vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-warm-border">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-brand-darkest hover:bg-brand-light hover:text-brand-primary transition-colors flex items-center justify-between border border-warm-border/50"
                >
                  <span>{link.label}</span>
                  <span className="text-[10px] text-gold-rich font-bold">→</span>
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-luxury"
              >
                <span>Book Free Design Consultation</span>
                <ArrowRight className="w-4 h-4 text-gold-champagne" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${settings?.phone || '+919994412345'}`}
                  className="py-2.5 px-3 rounded-xl border border-warm-border bg-warm-cream/70 text-brand-darkest font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Call Us</span>
                </a>
                <a
                  href={`https://wa.me/91${(settings?.phone || '9994412345').replace(/[^0-9]/g, '').slice(-10)}?text=Hello%20Modshine%20Interior%2C%20I%20would%20like%20to%20discuss%20my%20interior%20design%20requirements.`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-2.5 px-3 rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
