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
import { apiUrl } from '../config/api.js';

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function ContactSection({ settings, initialInquiryData, onInquirySubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Kovilpatti',
    service: 'Modular Kitchen',
    budget: '₹2,00,000 - ₹5,00,000',
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

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-semibold tracking-wider uppercase border border-brand-primary/20">
            <Mail className="w-3.5 h-3.5 text-gold-rich" />
            <span>Connect With Us</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkest tracking-tight">
            Let's Build Your Dream Space
          </h2>
          <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
            From concept to completion, we create elegant interiors tailored to your lifestyle. Get in touch and let's bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Kovilpatti Showroom & Contact Cards (from Page 12 of PDF) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom Address Card */}
            <div className="bg-brand-darkest text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gold-champagne/30 shadow-2xl relative overflow-hidden space-y-5 sm:space-y-6">
              
              <div>
                <span className="text-[11px] uppercase tracking-widest text-gold-champagne font-semibold block mb-1">
                  Design Studio & Showroom
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">
                  Modshine Interior
                </h3>
                <p className="text-xs text-emerald-100/70 mt-1 italic">
                  Decorate Your Home The Easy Way
                </p>
              </div>

              <div className="space-y-4 pt-2 border-t border-brand-medium/40 text-sm">
                
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/80 border border-gold-champagne/20 flex items-center justify-center text-gold-champagne shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-gold-champagne font-semibold mb-0.5">Office Address</strong>
                    <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                      {settings?.address || '24-A26, Pasuvandhanai Road, Kovilpatti, Tamil Nadu 628501'}
                    </p>
                  </div>
                </div>

                {/* Primary & Secondary Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/80 border border-gold-champagne/20 flex items-center justify-center text-gold-champagne shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-gold-champagne font-semibold mb-0.5">Direct Line & WhatsApp</strong>
                    <div className="flex flex-col gap-1 text-xs">
                      <a href={`tel:${settings?.phone || '+919994412345'}`} className="hover:text-gold-champagne font-bold text-white transition-colors">
                        {settings?.phone || '+91 99944 12345'}
                      </a>
                      <a href={`tel:${settings?.secondaryPhone || '08220805159'}`} className="hover:text-gold-champagne text-emerald-100 transition-colors">
                        {settings?.secondaryPhone || '082208 05159'}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Instagram & Social */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/80 border border-gold-champagne/20 flex items-center justify-center text-gold-champagne shrink-0 mt-0.5">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-gold-champagne font-semibold mb-0.5">Instagram & Portfolio</strong>
                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-xs text-gold-champagne hover:underline"
                    >
                      {settings?.instagram || '@modshine.interior'}
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-brand-primary/80 border border-gold-champagne/20 flex items-center justify-center text-gold-champagne shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-xs uppercase tracking-wider text-gold-champagne font-semibold mb-0.5">Studio Hours</strong>
                    <p className="text-xs text-emerald-100/90 leading-relaxed font-normal">
                      {settings?.workingHours || 'Monday - Saturday: 9:00 AM - 8:30 PM'}
                    </p>
                  </div>
                </div>

              </div>

              {/* Service Areas */}
              <div className="pt-4 border-t border-brand-medium/40">
                <span className="text-[11px] text-neutral-400 block mb-1">Serving Districts:</span>
                <p className="text-xs font-semibold text-emerald-200">
                  Kovilpatti • Thoothukudi • Tirunelveli • Virudhunagar • Madurai
                </p>
              </div>

            </div>

            {/* Quick Call Box */}
            <div className="p-5 rounded-2xl bg-warm-canvas border border-warm-border flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-brand-darkest">Prefer an immediate call?</p>
                <p className="text-xs text-ink-muted">Speak with our principal designer right away.</p>
              </div>
              <a
                href={`tel:${settings?.phone || '+919994412345'}`}
                className="px-4 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-semibold tracking-wide flex items-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Now</span>
              </a>
            </div>

          </div>

          {/* Right Column: Lead Capture Form */}
          <div className="lg:col-span-7 bg-warm-canvas rounded-2xl sm:rounded-3xl p-4 sm:p-10 border border-warm-border shadow-sm">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-primary flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-brand-darkest">
                  Inquiry Received!
                </h3>
                <p className="text-sm text-ink-body max-w-md mx-auto leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our Modshine interior designer will call you at <strong>{formData.phone}</strong> shortly to discuss your floor plan and arrange a complimentary 3D site visit.
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
                        budget: '₹2,00,000 - ₹5,00,000',
                        propertyType: 'Residential Apartment',
                        message: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-semibold"
                  >
                    Send Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                <div className="border-b border-warm-border pb-4">
                  <h3 className="font-serif text-2xl font-bold text-brand-darkest">
                    Request a Free 3D Design & Consultation
                  </h3>
                  <p className="text-xs text-ink-muted mt-1">
                    Fill in your details and our team will get in touch with layout plans within 2 hours.
                  </p>
                </div>

                {errorMsg && (
                  <div className="p-3.5 rounded-xl bg-red-50 text-red-800 text-xs border border-red-200">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-darkest block">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Suresh Ramanathan"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-ink-body focus:outline-none focus:border-brand-primary shadow-sm"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-darkest block">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98421 XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-ink-body focus:outline-none focus:border-brand-primary shadow-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-darkest block">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-ink-body focus:outline-none focus:border-brand-primary shadow-sm"
                    />
                  </div>

                  {/* City */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-darkest block">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Kovilpatti / Tirunelveli"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-ink-body focus:outline-none focus:border-brand-primary shadow-sm"
                    />
                  </div>

                  {/* Service Needed */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-darkest block">
                      Required Service
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-ink-body focus:outline-none focus:border-brand-primary shadow-sm"
                    >
                      <option value="Modular Kitchen">Modular Kitchen</option>
                      <option value="Full Height Wardrobe">Full Height Wardrobe</option>
                      <option value="TV Unit & Fluted Wall">TV Unit & Fluted Wall</option>
                      <option value="Partition & Room Divider">Partition & Room Divider</option>
                      <option value="Traditional Pooja Mandir">Traditional Pooja Mandir</option>
                      <option value="Complete 2 BHK Interior">Complete 2 BHK Interior</option>
                      <option value="Complete 3 BHK Turnkey">Complete 3 BHK Turnkey</option>
                      <option value="Commercial Office / Store">Commercial Office / Store</option>
                    </select>
                  </div>

                  {/* Budget Preference */}
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-brand-darkest block">
                      Target Budget
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-ink-body focus:outline-none focus:border-brand-primary shadow-sm"
                    >
                      <option value="Under ₹1,50,000">Under ₹1,50,000</option>
                      <option value="₹1,50,000 - ₹3,00,000">₹1,50,000 - ₹3,00,000</option>
                      <option value="₹3,00,000 - ₹5,00,000">₹3,00,000 - ₹5,00,000</option>
                      <option value="₹5,00,000 - ₹8,00,000">₹5,00,000 - ₹8,00,000</option>
                      <option value="₹8,00,000+ Luxury Turnkey">₹8,00,000+ Luxury Turnkey</option>
                    </select>
                  </div>

                </div>

                {/* Message */}
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-darkest block">
                    Your Requirements & Floor Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your space (e.g. 3BHK newly constructed villa in Kovilpatti, looking for L-shaped kitchen and master bedroom wardrobe)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-ink-body focus:outline-none focus:border-brand-primary shadow-sm"
                  ></textarea>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-sm tracking-wide shadow-luxury hover:shadow-luxury-lg transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-gold-champagne" />
                  <span>{loading ? 'Submitting...' : 'Submit Design Inquiry'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-ink-muted text-center">
                  🔒 We respect your privacy. Your details are strictly used to schedule your interior consultation.
                </p>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
