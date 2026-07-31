import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, Sparkles, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { PRODUCTS, REVIEWS, HERO_IMAGE } from '../../data/products';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ReviewCard } from '../../components/ReviewCard/ReviewCard';
import { QuickViewModal } from '../../components/QuickViewModal/QuickViewModal';
import { Button } from '../../components/Button/Button';
import { Product } from '../../types';

export const Home: React.FC = () => {
  const [searchParams] = useSearchParams();
  const searchFilter = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const categories = [
    'All',
    'Maxi Dress',
    'Midi Dress',
    'Mini Dress',
    'Floral Dress',
    'Evening Dress',
    'Satin Dress',
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesSearch =
        !searchFilter ||
        product.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
        product.category.toLowerCase().includes(searchFilter.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchFilter]);

  const scrollToCollection = () => {
    const el = document.getElementById('collection');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF]">
      {/* 1. HERO SECTION (Full Viewport Height) */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#111111] text-[#FFFFFF]">
        {/* Background Editorial Image */}
        <img
          src={HERO_IMAGE}
          alt="LÉONIE Luxe Fashion Hero"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#FFFFFF]/10 backdrop-blur-md border border-[#FFFFFF]/20 text-[#EADBC8] text-[11px] font-sans uppercase tracking-[0.3em] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Haute Couture Collection 2026</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#FFFFFF] leading-[1.05] mb-6">
              THE ART OF SILK & SILHOUETTE
            </h1>

            <p className="max-w-2xl font-sans text-sm sm:text-base md:text-lg text-[#EEEEEE] font-light leading-relaxed mb-10">
              Discover ten masterfully crafted dresses made from Grade 6A Mulberry silk, Italian velvet, and architectural crepes. Created for moments that require quiet luxury.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button size="lg" onClick={scrollToCollection}>
                Shop Collection
              </Button>
              <Button size="lg" variant="secondary" onClick={scrollToCollection} className="!text-[#FFFFFF] !border-[#FFFFFF] hover:!bg-[#FFFFFF] hover:!text-[#111111]">
                Explore Atelier
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          onClick={scrollToCollection}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-[#FFFFFF]/70 hover:text-[#FFFFFF] flex flex-col items-center gap-1 cursor-pointer"
          aria-label="Scroll to collection"
        >
          <span className="text-[10px] font-sans uppercase tracking-[0.25em]">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.button>
      </section>

      {/* Trust Highlights Strip */}
      <section className="bg-[#F8F8F8] border-b border-[#E5E5E5] py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex items-center justify-center gap-3">
            <Truck className="w-5 h-5 text-[#111111]" />
            <span className="text-xs uppercase font-sans tracking-widest font-medium text-[#111111]">
              Complimentary Global Delivery
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#111111]" />
            <span className="text-xs uppercase font-sans tracking-widest font-medium text-[#111111]">
              100% Certified Mulberry Silk
            </span>
          </div>
          <div className="flex items-center justify-center gap-3">
            <RefreshCw className="w-5 h-5 text-[#111111]" />
            <span className="text-xs uppercase font-sans tracking-widest font-medium text-[#111111]">
              30-Day Bespoke Returns
            </span>
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION SECTION */}
      <section id="collection" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#E5E5E5] gap-6">
          <div>
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#777777] font-medium block mb-2">
              Curated Selection
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#111111] font-normal">
              Featured 10 Dresses
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-sans uppercase tracking-widest px-4 py-2.5 whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#111111] text-[#FFFFFF]'
                    : 'bg-[#F8F8F8] text-[#555555] hover:bg-[#EADBC8] hover:text-[#111111]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Active Notification */}
        {searchFilter && (
          <div className="mb-8 p-4 bg-[#F8F8F8] border border-[#EADBC8] flex items-center justify-between">
            <p className="text-xs text-[#111111] font-sans">
              Showing results for "<span className="font-semibold">{searchFilter}</span>"
            </p>
            <a href="/#collection" className="text-xs font-semibold text-[#111111] underline">
              Clear Search
            </a>
          </div>
        )}

        {/* 10 Products Grid (4 cols desktop, 2 cols tablet, 1 col mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 3. ABOUT BOUTIQUE SECTION */}
      <section id="about" className="py-24 bg-[#111111] text-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Column Text */}
          <div>
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#EADBC8] font-medium block mb-3">
              Atelier Philosophy
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-[#FFFFFF] font-normal leading-tight mb-6">
              Crafted with intention. Designed for eternity.
            </h2>
            <p className="text-sm text-[#CCCCCC] font-sans leading-relaxed mb-6 font-light">
              LÉONIE was founded with a singular purpose: to replace fast fashion noise with ten meticulously engineered dress archetypes. Every piece in our boutique is tailored using heritage French draping techniques and sustainably harvested raw silks.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-[#333333]">
              <div>
                <span className="font-serif text-3xl text-[#EADBC8] block font-bold mb-1">10</span>
                <span className="text-xs font-sans uppercase tracking-widest text-[#999999]">
                  Master Creations
                </span>
              </div>
              <div>
                <span className="font-serif text-3xl text-[#EADBC8] block font-bold mb-1">100%</span>
                <span className="text-xs font-sans uppercase tracking-widest text-[#999999]">
                  Natural Fibers
                </span>
              </div>
            </div>
          </div>

          {/* Right Column Editorial Image */}
          <div className="relative aspect-[4/5] bg-[#222222] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
              alt="Atelier Craftsmanship"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </section>

      {/* 4. CUSTOMER REVIEWS SECTION */}
      <section id="reviews" className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#777777] font-medium block mb-2">
            Clientele Voice
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#111111] font-normal">
            Reflections of Elegance
          </h2>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* 5. NEWSLETTER SECTION */}
      <section className="py-20 bg-[#F8F8F8] border-t border-[#E5E5E5]">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#777777] font-medium block mb-3">
            Privileged Access
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#111111] font-normal mb-4">
            Join The LÉONIE Circle
          </h2>
          <p className="text-sm font-sans text-[#666666] max-w-md mx-auto mb-8">
            Receive private invitations to seasonal trunk shows and early access to limited edition dress releases.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-5 py-3.5 bg-[#FFFFFF] border border-[#E5E5E5] text-sm font-sans text-[#111111] placeholder-[#999999] focus:outline-none focus:border-[#111111]"
            />
            <Button type="button" className="w-full sm:w-auto whitespace-nowrap">
              Subscribe
            </Button>
          </form>
        </div>
      </section>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </div>
  );
};
