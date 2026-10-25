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

export default function CategoryCatalog({ products, categories, onSelectProductForInquiry }) {
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
    <section id="catalog" className="py-20 lg:py-28 bg-warm-canvas relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-light text-brand-primary text-xs font-semibold tracking-wider uppercase border border-brand-primary/20">
              <Layers className="w-3.5 h-3.5 text-gold-rich" />
              <span>Curated Modular Collection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-darkest tracking-tight">
              Bespoke Furniture & Interior Showcase
            </h2>
            <p className="text-ink-muted text-sm sm:text-base leading-relaxed">
              Explore our real executed designs for modular kitchens, full-height wardrobes, TV consoles, and pooja mandirs. Every unit is engineered with high-density moisture-resistant boards.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search designs, boards, hardware..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-warm-border bg-white text-sm text-ink-body placeholder:text-neutral-400 focus:outline-none focus:border-brand-primary shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Tabs (Swipeable edge-to-edge on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-8 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all shadow-sm shrink-0 ${
              selectedCategory === 'all'
                ? 'bg-brand-primary text-white shadow-luxury'
                : 'bg-white text-ink-body hover:bg-warm-cream border border-warm-border'
            }`}
          >
            All Collections ({products.length})
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all shadow-sm shrink-0 ${
                selectedCategory === cat.slug
                  ? 'bg-brand-primary text-white shadow-luxury'
                  : 'bg-white text-ink-body hover:bg-warm-cream border border-warm-border'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-2xl border border-warm-border p-12 text-center space-y-4">
            <Info className="w-12 h-12 text-ink-muted mx-auto" />
            <h3 className="font-serif text-xl font-bold text-brand-darkest">No matching designs found</h3>
            <p className="text-sm text-ink-muted">Try clearing your search query or selecting a different category tab.</p>
            <button
              onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-medium"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="group rounded-2xl overflow-hidden bg-white border border-warm-border/80 hover:border-brand-primary/40 shadow-sm hover:shadow-luxury transition-all duration-300 flex flex-col justify-between"
              >
                {/* Image & Badges */}
                <div className="relative h-64 overflow-hidden bg-brand-dark">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Top Category Tag */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider bg-brand-darkest/85 text-gold-champagne px-2.5 py-1 rounded-md backdrop-blur-sm border border-gold-champagne/20">
                      {prod.categoryName || prod.category}
                    </span>
                  </div>

                  {/* Featured Badge */}
                  {prod.featured && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-gold-primary text-brand-darkest px-2.5 py-1 rounded-md shadow-md flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        Signature Design
                      </span>
                    </div>
                  )}

                  {/* Rating Pill */}
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-ink-body flex items-center gap-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>{prod.rating || 5.0}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-brand-darkest group-hover:text-brand-primary transition-colors line-clamp-1">
                      {prod.title}
                    </h3>
                    <p className="text-ink-muted text-xs leading-relaxed line-clamp-2">
                      {prod.description}
                    </p>

                    {/* Material & Hardware Specifications Tags */}
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {prod.boardType && (
                        <span className="text-[11px] font-medium bg-brand-light text-brand-primary px-2.5 py-0.5 rounded border border-brand-primary/10 flex items-center gap-1">
                          <Layers className="w-3 h-3 text-gold-rich" />
                          <span className="truncate max-w-[170px]">{prod.boardType}</span>
                        </span>
                      )}
                      {prod.brand && (
                        <span className="text-[11px] font-medium bg-warm-cream text-ink-body px-2.5 py-0.5 rounded border border-warm-border">
                          {prod.brand}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Footer & Action */}
                  <div className="pt-4 border-t border-warm-border flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-ink-muted font-medium">Estimated Budget</p>
                      <p className="text-sm font-bold text-brand-primary">{prod.priceRange || 'Custom Quote'}</p>
                    </div>

                    <button
                      onClick={() => setActiveModalProduct(prod)}
                      className="px-3.5 py-2 rounded-xl bg-warm-cream hover:bg-brand-primary hover:text-white text-xs font-semibold text-brand-darkest transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      <span>View Specs</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Product Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-warm-border relative max-h-[94vh] flex flex-col">
            
            {/* Modal Header Bar */}
            <div className="flex justify-between items-center px-4 py-3 sm:px-6 sm:py-4 border-b border-warm-border bg-warm-canvas">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] sm:text-[11px] font-bold uppercase tracking-wider bg-brand-primary text-white">
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
              <div className="rounded-xl sm:rounded-2xl overflow-hidden h-44 sm:h-72 bg-brand-dark relative shadow-md">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-4 sm:left-4 sm:right-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-1.5 sm:gap-2">
                  <div className="glass-dark px-3 py-1 sm:px-4 sm:py-2 rounded-xl text-white">
                    <p className="text-[10px] sm:text-xs text-gold-champagne font-semibold uppercase">Pricing Guide</p>
                    <p className="text-sm sm:text-lg font-serif font-bold">{activeModalProduct.priceRange || 'Custom Architecture'}</p>
                  </div>
                  <div className="glass-dark px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl text-[10px] sm:text-xs font-semibold text-emerald-200 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-gold-champagne" />
                    <span>10-Yr Warranty</span>
                  </div>
                </div>
              </div>

              {/* Title & Description */}
              <div className="space-y-1 sm:space-y-2">
                <h3 className="font-serif text-xl sm:text-3xl font-bold text-brand-darkest">
                  {activeModalProduct.title}
                </h3>
                <p className="text-xs sm:text-sm text-ink-body leading-relaxed">
                  {activeModalProduct.description}
                </p>
              </div>

              {/* Specifications Table */}
              <div className="bg-warm-canvas rounded-xl sm:rounded-2xl p-3.5 sm:p-5 border border-warm-border space-y-2.5 sm:space-y-3">
                <h4 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-rich" />
                  <span>Technical & Material Specifications</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs">
                  <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-warm-border">
                    <span className="text-ink-muted block text-[10px] sm:text-[11px]">Core Substrate Board:</span>
                    <strong className="text-brand-darkest font-semibold text-xs">{activeModalProduct.boardType || 'Action TESA HDHMR Boilo'}</strong>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-warm-border">
                    <span className="text-ink-muted block text-[10px] sm:text-[11px]">Board Brand:</span>
                    <strong className="text-brand-darkest font-semibold text-xs">{activeModalProduct.brand || 'Action TESA / Greenply'}</strong>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-warm-border">
                    <span className="text-ink-muted block text-[10px] sm:text-[11px]">Hardware & Hinges:</span>
                    <strong className="text-brand-darkest font-semibold text-xs">{activeModalProduct.hardware || 'German Hettich / Ebco Soft Close'}</strong>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-lg bg-white border border-warm-border">
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
                <span>Free site visit & 3D layout measurement in Kovilpatti & South TN.</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalProduct(null)}
                  className="w-1/3 sm:w-auto px-4 py-2.5 rounded-xl border border-warm-border text-xs font-semibold text-ink-body hover:bg-neutral-100"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const prod = activeModalProduct;
                    setActiveModalProduct(null);
                    onSelectProductForInquiry(prod);
                  }}
                  className="w-2/3 sm:w-auto px-5 sm:px-6 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-dark text-white text-xs font-semibold tracking-wide shadow-luxury flex items-center justify-center gap-2"
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
