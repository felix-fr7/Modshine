import React, { useState } from 'react';
import { X, Send, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { apiUrl } from '../config/api.js';

export default function ConsultationModal({ settings, isOpen, onClose, prefillData, onInquirySubmitted }) {
  const m = settings?.consultation || {};
  const serviceOptions = Array.isArray(m.serviceOptions) ? m.serviceOptions : [];
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'Kovilpatti',
    service: 'Modular Kitchen',
    budget: 'Standard Package',
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
      setErrorMsg('Network error. Please call our design team directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-darkest/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      <div className="bg-warm-canvas rounded-[6px] max-w-lg w-full p-6 sm:p-10 space-y-6 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.6)] border border-warm-border relative max-h-[92vh] overflow-y-auto my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full border border-warm-border hover:border-ink-charcoal text-ink-body flex items-center justify-center transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full border border-gold-primary/50 text-brand-primary flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="display text-4xl text-ink-charcoal">
              {m.successTitle}
            </h3>
            <p className="text-xs text-ink-muted leading-relaxed">
              Thank you, <strong>{formData.name}</strong>. Our senior interior designer will call <strong>{formData.phone}</strong> to confirm your requirements and schedule a design consultation.
            </p>
            <button
              onClick={() => {
                setSuccess(false);
                onClose();
              }}
              className="btn-dark"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <span className="eyebrow">
                {m.eyebrow}
              </span>
              <h3 className="display text-4xl text-ink-charcoal mt-3">
                {m.title}
              </h3>
              <p className="text-sm text-ink-muted mt-2 leading-relaxed">
                {m.intro}
              </p>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-[4px] bg-[#f6e7e2] text-[#8a3d2b] text-xs border border-[#e8cbc1]">
                {errorMsg}
              </div>
            )}

            <div className="space-y-6">
              <div className="space-y-1">
                <label className="field-label">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Ramanathan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="field"
                />
              </div>

              <div className="space-y-1">
                <label className="field-label">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98421 XXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="field"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="field-label">Service</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="field"
                  >
                    {serviceOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="field-label">City</label>
                  <input
                    type="text"
                    placeholder="e.g. Chennai, Coimbatore, Kovilpatti"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="field"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="field-label">Message / Preferred Time</label>
                <textarea
                  rows={2}
                  placeholder="Tell us about your home floor plan or preferred visit time..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="field"
                ></textarea>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-dark w-full"
            >
              <span>{loading ? 'Submitting...' : m.submitText}</span>
              <ArrowRight className="w-3.5 h-3.5 text-gold-champagne" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-ink-muted">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
              <span>{m.footnote}</span>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
