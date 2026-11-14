import React, { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Menu, X, ArrowRight, MessageCircle, ArrowUpRight } from 'lucide-react';
import { cld, cldSrcSet } from '../utils/cloudinary.js';

const LOGO = 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878437/modshine/Logo.jpg';

export default function Navbar({ currentView, setCurrentView, settings, onOpenConsultation }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navHidden, setNavHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastY = useRef(0);

  // Cinematic hide-on-scroll-down / reveal-on-scroll-up navigation
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY.current;
        setScrolled(y > 40);
        if (y < 160) setNavHidden(false);
        else if (delta > 6) setNavHidden(true);
        else if (delta < -6) setNavHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock page scroll while the full-screen mobile menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const lenis = window.__lenis;
    lenis?.stop();
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
      lenis?.start();
    };
  }, [mobileMenuOpen]);

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
    if (window.__lenis) window.__lenis.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneDisplay = settings?.phone || '+91 99944 12345';
  const phoneHref = `tel:${settings?.phone || '+919994412345'}`;
  const whatsappHref = `https://wa.me/91${(settings?.phone || '9994412345').replace(/[^0-9]/g, '').slice(-10)}?text=Hello%20Modshine%20Interior%2C%20I%20would%20like%20to%20discuss%20my%20interior%20design%20requirements.`;

  return (
    <header className={`sticky top-0 z-50 w-full nav-shell ${navHidden && !mobileMenuOpen ? 'nav-hidden' : ''}`}>
      {/* Top Announcement Bar */}
      <div className="bg-brand-darkest text-warm-canvas/80 text-[11px] py-2 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1440px] mx-auto flex justify-between items-center gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <span className="flex items-center gap-1.5 tracking-[0.08em] truncate">
              <MapPin className="w-3 h-3 text-gold-primary shrink-0" />
              <span className="truncate">Showroom: Kovilpatti • Serving All Tamil Nadu</span>
            </span>
            <span className="hidden sm:inline h-3 w-px bg-white/15" />
            <a href={phoneHref} className="hidden sm:flex items-center gap-1.5 hover:text-gold-champagne transition-colors">
              <Phone className="w-3 h-3 text-gold-primary shrink-0" />
              <span className="font-semibold tracking-[0.08em]">{phoneDisplay}</span>
            </a>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:inline text-gold-champagne/90 tracking-[0.04em] truncate max-w-[560px]">
              {settings?.announcement ? settings.announcement.replace('✨', '').trim() : '10-Year Warranty on HDHMR Boilo Modular Kitchens'}
            </span>
            <a
              href={phoneHref}
              className="sm:hidden flex items-center gap-1 font-semibold text-gold-champagne border border-gold-champagne/30 rounded-full px-2.5 py-0.5"
            >
              <Phone className="w-3 h-3" />
              <span>Call</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className={`relative transition-all duration-500 ${scrolled ? 'glass-panel shadow-[0_10px_40px_-20px_rgba(14,26,22,0.25)]' : 'bg-warm-canvas border-b border-warm-border/70'}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className={`flex items-center justify-between gap-6 transition-all duration-500 ${scrolled ? 'h-16 sm:h-[70px]' : 'h-16 sm:h-20'}`}>

            {/* Logo */}
            <button onClick={handleLogoClick} className="flex items-center gap-2.5 min-[360px]:gap-3 group min-w-0 text-left" aria-label="Modshine Interior — back to top">
              <img
                src={cld(LOGO, { w: 96 })}
                alt="Modshine Interior Logo"
                width="44"
                height="44"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-contain bg-white p-1 ring-1 ring-warm-border group-hover:ring-gold-primary transition-all shrink-0"
              />
              <div className="flex flex-col leading-none min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-[1.15rem] min-[360px]:text-[1.35rem] sm:text-[1.6rem] font-semibold tracking-[0.1em] min-[360px]:tracking-[0.14em] text-ink-charcoal uppercase">
                    Modshine
                  </span>
                  <span className="text-[8px] min-[360px]:text-[9px] tracking-[0.2em] min-[360px]:tracking-[0.3em] font-semibold text-gold-rich">
                    INTERIOR
                  </span>
                </div>
                <span className="text-[8px] sm:text-[9px] tracking-[0.22em] text-ink-muted uppercase font-medium mt-1 truncate max-w-[200px] sm:max-w-none">
                  {settings?.tagline || 'DECORATE YOUR HOME THE EASY WAY'}
                </span>
              </div>
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center justify-center flex-1 gap-6 xl:gap-9">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative text-[11px] xl:text-[12px] font-semibold uppercase tracking-[0.18em] text-ink-body hover:text-ink-charcoal transition-colors py-2 group whitespace-nowrap"
                >
                  {link.label}
                  <span className="absolute left-0 -bottom-0.5 h-px w-full bg-gold-primary origin-right scale-x-0 transition-transform duration-500 group-hover:origin-left group-hover:scale-x-100" />
                </a>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden sm:flex items-center shrink-0">
              <button onClick={onOpenConsultation} className="btn-dark !px-5 !py-3 group">
                <span>Book Free Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-champagne group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile toggle */}
            <div className="lg:hidden flex items-center shrink-0">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-11 h-11 rounded-full border border-warm-border flex items-center justify-center text-ink-charcoal hover:border-ink-charcoal transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

      </nav>

      {/* Full-screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full inset-x-0 h-[calc(100svh-96px)] z-40 bg-warm-canvas animate-fadeIn overflow-y-auto">
          <div className="px-6 pt-6 pb-10 flex flex-col min-h-full">
            <ul className="divide-y divide-warm-border border-y border-warm-border">
              {navLinks.map((link, i) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-baseline justify-between py-4 group"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-serif italic text-sm text-gold-primary">0{i + 1}</span>
                      <span className="font-serif text-3xl font-medium text-ink-charcoal group-hover:text-brand-primary transition-colors">{link.label}</span>
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-ink-muted group-hover:text-gold-rich transition-colors" />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConsultation();
                }}
                className="btn-dark w-full"
              >
                <span>Book Free Consultation</span>
                <ArrowRight className="w-4 h-4 text-gold-champagne" />
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a href={phoneHref} className="btn-line !py-3.5">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Us</span>
                </a>
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="btn-line !py-3.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            <div className="mt-auto pt-10 text-center">
              <a
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="text-[11px] text-ink-muted hover:text-brand-primary font-semibold tracking-[0.1em]"
              >
                ⚙️ Admin Control Studio
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
