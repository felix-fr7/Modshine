import React, { useState } from 'react';
import { 
  Award,
  Search, 
  ArrowRight, 
  Check, 
  X, 
  Star, 
  ShieldCheck, 
  Layers, 
  Wrench, 
  Info,
  SlidersHorizontal 
} from 'lucide-react';
import SectionHeader from './ui/SectionHeader.jsx';
import { cld, cldSrcSet } from '../utils/cloudinary.js';

export default function CategoryCatalog({ settings, products, categories, onSelectProductForInquiry }) {
  const head = settings?.sections?.catalog || {};
  const ui = settings?.catalog || {};
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  // Filter products by category & search
  const filteredProducts = products.filter((p) => {
    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.boardType && p.boardType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <section id="catalog" className="relative py-16 sm:py-20 bg-warm-cream/60">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-6 lg:px-10">

        <SectionHeader
          index="04"
          eyebrow={head.eyebrow}
          title={head.title}
          highlight={head.titleHighlight}
          intro={head.intro}
          aside={
            <div className="relative w-full">
              <Search className="w-4 h-4 text-ink-muted absolute left-0 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={ui.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="field !pl-7 !pr-8"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink-charcoal"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          }
        />

        {/* Category filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-12 scrollbar-none -mx-5 px-5 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-300 shrink-0 border ${
              selectedCategory === 'all'
                ? 'bg-ink-charcoal text-warm-canvas border-ink-charcoal'
                : 'bg-transparent text-ink-body border-ink-charcoal/15 hover:border-ink-charcoal'
            }`}
          >
            {ui.allLabel} ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-5 py-2.5 rounded-full text-[11px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap transition-all duration-300 shrink-0 border ${
                selectedCategory === cat.slug
                  ? 'bg-ink-charcoal text-warm-canvas border-ink-charcoal'
                  : 'bg-transparent text-ink-body border-ink-charcoal/15 hover:border-ink-charcoal'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="border border-warm-border rounded-[4px] p-14 text-center space-y-4 bg-warm-canvas">
            <Info className="w-10 h-10 text-ink-muted mx-auto" strokeWidth={1.25} />
            <h3 className="font-serif text-3xl font-medium text-ink-charcoal">No matching designs found</h3>
            <p className="text-sm text-ink-muted">Try clearing your search query or selecting a different category tab.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="btn-dark !py-3"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-14 lg:pb-16">
            {filteredProducts.map((prod, idx) => (
              <div key={prod.id} className={idx % 3 === 1 ? 'lg:translate-y-16' : ''}>
                <div data-card className="group flex flex-col h-full">
                  <div
                    data-tilt="6"
                    onClick={() => setActiveModalProduct(prod)}
                    className="relative aspect-[4/5] overflow-hidden rounded-[4px] bg-brand-dark cursor-pointer"
                  >
                    <img
                      data-parallax="8"
                      src={cld(prod.image, { w: 800 })}
                      srcSet={cldSrcSet(prod.image, [400, 600, 800, 1100])}
                      sizes="(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 92vw"
                      loading="lazy"
                      decoding="async"
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-[1.2s] ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-darkest/80 via-brand-darkest/0 to-brand-darkest/20 pointer-events-none" />

                    <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
                      <span className="text-[10px] font-semibold uppercase tracking-[0.16em] glass-dark text-warm-canvas px-3 py-1.5 rounded-full">
                        {prod.categoryName || prod.category}
                      </span>
                      {prod.featured && (
                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] bg-gold-primary text-brand-darkest px-3 py-1.5 rounded-full flex items-center gap-1 shrink-0">
                          <Award className="w-3 h-3" />
                          Signature Design
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-warm-canvas">
                        <Star className="w-3.5 h-3.5 text-gold-champagne fill-gold-champagne" />
                        <span>{prod.rating || 5.0}</span>
                      </span>
                    </div>
                  </div>

                  <div className="pt-6 flex-1 flex flex-col">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-[1.65rem] leading-tight font-medium text-ink-charcoal group-hover:text-brand-primary transition-colors line-clamp-1">
                        {prod.title}
                      </h3>
                      <span className="font-serif italic text-gold-primary text-sm shrink-0">{String(idx + 1).padStart(2, '0')}</span>
                    </div>
                    <p className="mt-2 text-ink-muted text-[13px] leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-[11px] text-ink-body">
                      {prod.boardType && (
                        <span className="flex items-center gap-1.5">
                          <Layers className="w-3 h-3 text-gold-rich" />
                          <span className="truncate max-w-[200px]">{prod.boardType}</span>
                        </span>
                      )}
                      {prod.brand && (
                        <span className="text-ink-muted">{prod.brand}</span>
                      )}
                    </div>

                    <div className="mt-auto pt-5">
                      <div className="pt-4 border-t border-warm-border flex items-center justify-between">
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-primary">{ui.cardTag}</span>
                        <button
                          onClick={() => setActiveModalProduct(prod)}
                          className="link-underline text-ink-charcoal !text-[11px]"
                        >
                          <span>View Specs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-brand-darkest/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-warm-canvas rounded-[6px] max-w-3xl w-full overflow-hidden shadow-2xl border border-warm-border relative max-h-[94vh] flex flex-col">
            
            {/* Modal Header Bar */}
            <div className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 border-b border-warm-border bg-warm-canvas">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-[0.16em] bg-ink-charcoal text-warm-canvas">
                  {activeModalProduct.categoryName || activeModalProduct.category}
                </span>
                <span className="text-[11px] sm:text-xs text-ink-muted font-medium">
                  Ref Code: #{activeModalProduct.id}
                </span>
              </div>
              <button
                onClick={() => setActiveModalProduct(null)}
                className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-600 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6">
              
              {/* Image banner */}
              <div className="rounded-[4px] overflow-hidden h-44 sm:h-80 bg-brand-dark relative shadow-md">
                <img
                  src={cld(activeModalProduct.image, { w: 1400 })}
                  decoding="async"
                  alt={activeModalProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1.5 sm:gap-2">
                  <div className="glass-dark px-3 py-1 sm:px-4 sm:py-2 rounded-xl text-white">
                    <p className="text-[10px] sm:text-xs text-gold-champagne font-semibold uppercase">Specification</p>
                    <p className="text-sm sm:text-lg font-serif font-bold">Custom Architecture</p>
                  </div>
                  <div className="glass-dark px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold text-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-champagne" />
                    <span>10-Yr Warranty</span>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1 sm:space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-medium text-ink-charcoal">
                  {activeModalProduct.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
                  {activeModalProduct.description}
                </p>
              </div>

              {/* Specifications Table */}
              <div className="bg-white/60 rounded-[4px] p-3.5 sm:p-5 border border-warm-border space-y-2.5 sm:space-y-3">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-rich" />
                  <span>Technical & Material Specifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                  <div className="p-2 sm:p-2.5 border-b border-warm-border">
                    <span className="text-ink-muted block text-[10px] sm:text-[11px]">Core Substrate Board:</span>
                    <strong className="text-brand-darkest font-semibold text-xs">{activeModalProduct.boardType || 'Action TESA HDHMR Boilo'}</strong>
                  </div>
                  <div className="p-2 sm:p-2.5 border-b border-warm-border">
                    <span className="text-ink-muted block text-[10px] sm:text-[11px]">Board Brand:</span>
                    <strong className="text-brand-darkest font-semibold text-xs">{activeModalProduct.brand || 'Action TESA / Greenply'}</strong>
                  </div>
                  <div className="p-2 sm:p-2.5 border-b border-warm-border">
                    <span className="text-ink-muted block text-[10px] sm:text-[11px]">Hardware & Hinges:</span>
                    <strong className="text-brand-darkest font-semibold text-xs">{activeModalProduct.hardware || 'German Hettich / Ebco Soft Close'}</strong>
                  </div>
                  <div className="p-2 sm:p-2.5 border-b border-warm-border">
                    <span className="text-ink-muted block text-[10px] sm:text-[11px]">Surface Finish:</span>
                    <strong className="text-brand-darkest font-semibold text-xs">{activeModalProduct.finish || 'Matte Cashmere / Fluted Louver'}</strong>
                  </div>
                </div>
              </div>

              {/* Key Features List */}
              {activeModalProduct.features && activeModalProduct.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-primary">
                    Execution Highlights
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
                    {activeModalProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-ink-body">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] sm:text-xs">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer CTAs */}
            <div className="p-3.5 sm:p-5 border-t border-warm-border bg-warm-canvas flex flex-col sm:flex-row justify-between items-center gap-2.5 sm:gap-3">
              <div className="text-[11px] sm:text-xs text-ink-muted text-center sm:text-left">
                <span>{ui.modalNote}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="w-1/3 sm:w-auto btn-line !py-3 !px-5"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const prod = activeModalProduct;
                    setActiveModalProduct(null);
                    onSelectProductForInquiry(prod);
                  }}
                  className="w-2/3 sm:w-auto btn-dark !py-3 !px-5"
                >
                  <ArrowRight className="w-3.5 h-3.5 text-gold-champagne" />
                  <span>Inquire for this Design</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
