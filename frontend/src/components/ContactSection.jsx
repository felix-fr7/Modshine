import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck 
} from 'lucide-react';
import SectionHeader from './ui/SectionHeader.jsx';
import { apiUrl } from '../config/api.js';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function ContactSection({ settings, initialInquiryData, onInquirySubmitted }) {
  const head = settings?.sections?.contact || {};
  const c = settings?.contact || {};
  const serviceOptions = Array.isArray(c.serviceOptions) ? c.serviceOptions : [];
  const budgetOptions = Array.isArray(c.budgetOptions) ? c.budgetOptions : [];
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Kovilpatti',
    service: 'Modular Kitchen',
    budget: 'Standard Package',
    propertyType: 'Residential Apartment',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle pre-fills from Estimate or Product
  React.useEffect(() => {
    if (initialInquiryData) {
      setFormData(prev => ({
        ...prev,
        ...initialInquiryData
      }));
    }
  }, [initialInquiryData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!formData.name || !formData.phone) {
      setErrorMsg('Please enter your Name and Phone Number.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(apiUrl('/api/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        if (onInquirySubmitted) onInquirySubmitted(data.inquiry);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please call our studio directly.');
    } finally {
      setLoading(false);
    }
  };

  const InfoRow = ({ icon: Icon, label, children }) => (
    <div className="flex items-start gap-4 py-5 border-b border-white/10">
      <span className="w-10 h-10 rounded-full border border-gold-champagne/30 flex items-center justify-center text-gold-champagne shrink-0">
        <Icon className="w-4 h-4" strokeWidth={1.5} />
      </span>
      <div className="min-w-0">
        <strong className="block text-[10px] uppercase tracking-[0.2em] text-gold-champagne font-semibold mb-1">{label}</strong>
        {children}
      </div>
    </div>
  );

  return (
    <section id="contact" className="relative py-16 sm:py-20 bg-paper">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10">

        <SectionHeader
          index="09"
          eyebrow={head.eyebrow}
          title={head.title}
          highlight={head.titleHighlight}
          intro={head.intro}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch rounded-[4px] overflow-hidden lg:border lg:border-warm-border">

          {/* Studio card */}
          <div data-card className="lg:col-span-5 bg-brand-darkest text-warm-canvas p-7 sm:p-10 lg:p-12 relative overflow-hidden rounded-[4px] lg:rounded-none flex flex-col">
            <div className="absolute -bottom-32 -right-32 w-[380px] h-[380px] arch border border-white/[0.06] pointer-events-none" />
            <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-gold-primary/10 blur-[100px] pointer-events-none" />

            <div className="relative">
              <span className="text-[10px] uppercase tracking-[0.24em] text-gold-champagne font-semibold block mb-3">
                {c.studioLabel}
              </span>
              <h3 className="display text-4xl sm:text-5xl text-warm-canvas">
                {c.studioTitle}
              </h3>
              <p className="font-serif italic text-lg text-warm-canvas/60 mt-2">
                {c.studioSubtitle}
              </p>
            </div>

            <div className="relative mt-8 border-t border-white/10">
              <InfoRow icon={MapPin} label="Office Address">
                <p className="text-sm text-warm-canvas/80 leading-relaxed">
                  {settings?.address || '24-A26, Pasuvandhanai Road, Kovilpatti, Tamil Nadu 628501'}
                </p>
              </InfoRow>

              <InfoRow icon={Phone} label="Direct Line & WhatsApp">
                <div className="flex flex-col gap-0.5 text-sm">
                  <a href={`tel:${settings?.phone || '+919994412345'}`} className="font-serif text-xl text-warm-canvas hover:text-gold-champagne transition-colors">
                    {settings?.phone || '+91 99944 12345'}
                  </a>
                  <a href={`tel:${settings?.secondaryPhone || '08220805159'}`} className="text-warm-canvas/65 hover:text-gold-champagne transition-colors">
                    {settings?.secondaryPhone || '082208 05159'}
                  </a>
                </div>
              </InfoRow>

              <InfoRow icon={InstagramIcon} label="Instagram & Portfolio">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-sm text-gold-champagne hover:underline">
                  {settings?.instagram || '@modshine.interior'}
                </a>
              </InfoRow>

              <InfoRow icon={Clock} label="Studio Hours">
                <p className="text-sm text-warm-canvas/80 leading-relaxed">
                  {settings?.workingHours || 'Monday - Saturday: 9:00 AM - 8:30 PM'}
                </p>
              </InfoRow>
            </div>

            <div className="relative pt-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-canvas/45 block mb-1.5">Service Coverage:</span>
              <p className="text-[13px] text-warm-canvas/80 leading-relaxed">
                {settings?.serviceCoverage || 'Full Tamil Nadu (Chennai • Coimbatore • Madurai • Tirunelveli • Trichy • Salem • Kovilpatti & All 38 Districts)'}
              </p>
            </div>

            <div className="relative mt-auto pt-10">
              <div className="flex items-center justify-between gap-4 rounded-[4px] bg-white/[0.04] border border-white/10 p-5">
                <div>
                  <p className="text-sm font-semibold text-warm-canvas">{c.callTitle}</p>
                  <p className="text-xs text-warm-canvas/55">{c.callText}</p>
                </div>
                <a href={`tel:${settings?.phone || '+919994412345'}`} className="btn-brass !px-5 !py-3 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div data-card className="lg:col-span-7 bg-warm-canvas p-7 sm:p-10 lg:p-14 rounded-[4px] lg:rounded-none border border-warm-border lg:border-0">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-5 animate-fadeIn">
                <div className="w-20 h-20 rounded-full border border-gold-primary/50 text-brand-primary flex items-center justify-center">
                  <CheckCircle className="w-9 h-9" strokeWidth={1.25} />
                </div>
                <h3 className="display text-5xl text-ink-charcoal">
                  {c.successTitle}
                </h3>
                <p className="text-[15px] text-ink-body max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our Modshine interior designer will call you at <strong>{formData.phone}</strong> shortly to discuss your floor plan and arrange an on-site consultation.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        city: 'Kovilpatti',
                        service: 'Modular Kitchen',
                        budget: 'Standard Package',
                        propertyType: 'Residential Apartment',
                        message: ''
                      });
                    }}
                    className="btn-dark"
                  >
                    Send Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-medium text-ink-charcoal leading-tight">
                    {c.formTitle}
                  </h3>
                  <p className="text-sm text-ink-muted mt-2">
                    {c.formIntro}
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-4 rounded-[4px] bg-[#f6e7e2] text-[#8a3d2b] text-xs border border-[#e8cbc1]">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
                  <div>
                    <label className="field-label">
                      Full Name <span className="text-gold-rich">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suresh Ramanathan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="field"
                    />
                  </div>

                  <div>
                    <label className="field-label">
                      Phone Number <span className="text-gold-rich">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98421 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="field"
                    />
                  </div>

                  <div>
                    <label className="field-label">Email Address (Optional)</label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="field"
                    />
                  </div>

                  <div>
                    <label className="field-label">City / Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Chennai / Coimbatore / Kovilpatti / Madurai"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="field"
                    />
                  </div>

                  <div>
                    <label className="field-label">Required Service</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="field"
                    >
                      {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="field-label">Target Budget Tier</label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="field"
                    >
                      {budgetOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="field-label">Your Requirements & Floor Details</label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your space (e.g. 3BHK newly constructed villa in Chennai or Kovilpatti, looking for L-shaped kitchen and master bedroom wardrobe)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="field resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-2">
                  <button type="submit" disabled={loading} className="btn-dark group sm:min-w-[280px]">
                    <Send className="w-4 h-4 text-gold-champagne" />
                    <span>{loading ? 'Submitting...' : c.submitText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    {c.privacyNote}
                  </p>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
