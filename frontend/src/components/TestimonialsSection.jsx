import React from 'react';
import { Star, Quote, CheckCircle2, ShieldCheck, MapPin, Sparkles } from 'lucide-react';

export default function TestimonialsSection({ settings, onOpenConsultation }) {
  const defaultTestimonials = [
    {
      id: "t1",
      name: "Dr. K. Senthil Kumar",
      location: "Kovilpatti",
      project: "Full 3 BHK Turnkey Interior",
      rating: 5,
      text: "Modshine transformed our home in Kovilpatti beyond expectations. The acrylic kitchen finish and living room fluted partition look straight out of an architectural magazine.",
      date: "October 2026",
      avatar: "https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878454/modshine/page_5.jpg"
    },
    {
      id: "t2",
      name: "Ananya & Rajesh",
      location: "Tirunelveli",
      project: "Modular Kitchen & Master Wardrobe",
      rating: 5,
      text: "The Action TESA HDHMR quality is fantastic. 100% water resistant and the German Hettich drawers are so silent and smooth. Timely delivery as promised!",
      date: "September 2026",
      avatar: "https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878434/modshine/kitchen_island.jpg"
    },
    {
      id: "t3",
      name: "M. Vignesh",
      location: "Madurai",
      project: "Acoustic TV Unit & Pooja Mandir",
      rating: 5,
      text: "The backlit temple pooja mandir and marble-veined TV unit have become the highlight of our living room. Every guest asks who did our interiors.",
      date: "August 2026",
      avatar: "https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878468/modshine/tv_unit_fluted_marble.jpg"
    }
  ];

  const testimonials = (settings?.testimonials && settings.testimonials.length > 0)
    ? settings.testimonials
    : defaultTestimonials;

  return (
    <section id="reviews" className="py-20 lg:py-28 bg-[#fbf9f4] relative overflow-hidden border-t border-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-semibold tracking-wider uppercase border border-brand-primary/20">
            <Sparkles className="w-3.5 h-3.5 text-gold-rich" />
            <span>Client Stories & Satisfaction</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkest tracking-tight">
            Loved by 450+ Families Across Tamil Nadu
          </h2>
          <p className="text-ink-muted text-base sm:text-lg leading-relaxed">
            Real feedback from discerning homeowners who experienced our factory-direct precision joinery, zero site dust, and punctual 45-day turnkey delivery.
          </p>
        </div>

        {/* Testimonials Responsive Grid with Uniform Height Alignment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {testimonials.map((t, idx) => (
            <div
              key={t.id || idx}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-warm-border hover:border-gold-champagne/80 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between h-full group"
            >
              <div className="space-y-4">
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-gold-primary">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-gold-primary text-gold-primary" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Verified Client
                  </span>
                </div>

                {/* Review Quote Body */}
                <div className="relative pt-1">
                  <Quote className="w-8 h-8 text-gold-champagne/30 absolute -top-3 -left-2 -z-0 pointer-events-none" />
                  <p className="text-sm text-ink-body leading-relaxed italic relative z-10">
                    "{t.text}"
                  </p>
                </div>
              </div>

              {/* Client Profile Footer */}
              <div className="pt-6 mt-6 border-t border-warm-border/70 flex items-center gap-3.5">
                <img
                  src={t.avatar || 'https://res.cloudinary.com/pgn8z8k7/image/upload/v1793878454/modshine/page_5.jpg'}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gold-champagne/40 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-serif text-base font-bold text-brand-darkest truncate group-hover:text-brand-primary transition-colors">
                    {t.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-ink-muted">
                    <span className="flex items-center gap-0.5 truncate">
                      <MapPin className="w-3 h-3 text-brand-primary shrink-0" />
                      {t.location || 'Tamil Nadu'}
                    </span>
                    <span>•</span>
                    <span className="text-gold-dark font-medium truncate">{t.project}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-12 text-center">
          <p className="text-xs text-ink-muted">
            100% Genuine Client Testimonials from Kovilpatti, Madurai, Tirunelveli, Chennai, and Tuticorin site executions.
          </p>
        </div>

      </div>
    </section>
  );
}

