import React, { useState } from 'react';
import { X, Send, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { apiUrl } from '../config/api.js';

export default function ConsultationModal({ isOpen, onClose, prefillData, onInquirySubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Kovilpatti',
    service: 'Modular Kitchen',
    budget: '₹2,00,000 - ₹5,00,000',
    propertyType: 'Residential Villa / Apartment',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  React.useEffect(() => {
    if (prefillData) {
      setFormData(prev => ({
        ...prev,
        ...prefillData
      }));
    }
  }, [prefillData]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMsg('Please enter your name and phone number.');
      return;
    }

    setLoading(true);
    setErrorMsg('');
    try {
      const res = await fetch(apiUrl('/api/inquiries'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        if (onInquirySubmitted) onInquirySubmitted(data.inquiry);
      } else {
        setErrorMsg(data.error || 'Failed to submit inquiry.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please call our Kovilpatti showroom directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full p-5 sm:p-8 space-y-5 sm:space-y-6 shadow-2xl border border-warm-border relative max-h-[92vh] overflow-y-auto my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-full hover:bg-neutral-100 text-neutral-500 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-brand-primary flex items-center justify-center mx-auto shadow-md">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-brand-darkest">
              Consultation Scheduled!
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our senior interior designer will call <strong>{formData.phone}</strong> to confirm your 3D floor plan review and schedule a free site visit.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold-rich bg-warm-cream px-2.5 py-1 rounded">
                Complimentary 3D Consultation
              </span>
              <h3 className="font-serif text-2xl font-bold text-brand-darkest mt-2">
                Book Your Design Session
              </h3>
              <p className="text-xs text-ink-muted">
                Visit our Kovilpatti studio or request a laser measurement at your home.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                {errorMsg}
              </div>
            )}

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-darkest block">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Ramanathan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-darkest block">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98421 XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:border-brand-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-darkest block">Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:border-brand-primary"
                  >
                    <option value="Modular Kitchen">Modular Kitchen</option>
                    <option value="Wardrobe">Wardrobe</option>
                    <option value="TV Unit & Wall">TV Unit & Wall</option>
                    <option value="Pooja Mandir">Pooja Mandir</option>
                    <option value="Partition">Partition</option>
                    <option value="Full 2 BHK / 3 BHK">Full 2 BHK / 3 BHK</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-brand-darkest block">City</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:border-brand-primary"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-brand-darkest block">Message / Preferred Time</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your home floor plan or preferred visit time..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-warm-border text-xs focus:outline-none focus:border-brand-primary"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs tracking-wide shadow-luxury flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Submitting...' : 'Confirm Consultation Booking'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-champagne" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>No fees • 100% Free 3D plan & measurement</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
