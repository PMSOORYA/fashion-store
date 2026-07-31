import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
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
      {/* 1. SIGNATURE HERO SECTION (Full Viewport Height, One Impactful Image) */}
      <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#000000] text-[#FFFFFF]">
        <img
          src={HERO_IMAGE}
          alt="Editorial Fashion Model"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 opacity-85"
        />

        {/* Minimal Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <span className="text-[10px] font-sans uppercase tracking-[0.4em] text-[#EADBC8] mb-6 block">
              COLLECTION 2026
            </span>

            <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-tight text-[#FFFFFF] leading-[1.02] mb-8">
              THE ART OF SILK
            </h1>

            <p className="max-w-xl font-sans text-xs sm:text-sm text-[#DDDDDD] font-light tracking-wide leading-relaxed mb-10">
              Ten masterfully draped creations crafted from pure Grade 6A Mulberry silk and Italian velvet.
            </p>

            <Button size="lg" onClick={scrollToCollection}>
              Shop Collection
            </Button>
          </motion.div>
        </div>

        {/* Subtle Scroll Indicator */}
        <motion.button
          onClick={scrollToCollection}
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[#FFFFFF]/60 hover:text-[#FFFFFF] flex flex-col items-center gap-1 cursor-pointer"
          aria-label="Scroll to collection"
        >
          <span className="text-[9px] font-sans uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown className="w-3.5 h-3.5 stroke-[1.5]" />
        </motion.button>
      </section>

      {/* 2. FEATURED COLLECTION SECTION (Generous Spacing py-32) */}
      <section id="collection" className="py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-[#EAEAEA] gap-6">
          <div>
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#888888] font-medium block mb-2">
              Curated Lookbook
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#000000] font-normal">
              Featured 10 Dresses
            </h2>
          </div>

          {/* Minimal Category Filter Pills */}
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] font-sans uppercase tracking-[0.2em] px-4 py-2 whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#000000] text-[#FFFFFF]'
                    : 'bg-[#F9F8F6] text-[#555555] hover:bg-[#000000] hover:text-[#FFFFFF]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 10 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* 3. EDITORIAL STORY BREAK (Asymmetric Composition, Whitespace py-36) */}
      <section id="about" className="py-36 bg-[#000000] text-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
          {/* Left Column Editorial Image (7 cols) */}
          <div className="md:col-span-7 aspect-[4/5] bg-[#111111] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=90"
              alt="Atelier Fashion Craftsmanship"
              className="w-full h-full object-cover object-center opacity-90"
            />
          </div>

          {/* Right Column Editorial Text (5 cols) */}
          <div className="md:col-span-5 flex flex-col justify-center">
            <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#EADBC8] font-medium block mb-4">
              Atelier Philosophy
            </span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#FFFFFF] font-normal leading-tight mb-8">
              Crafted with intention. Designed for eternity.
            </h2>
            <p className="text-xs text-[#CCCCCC] font-sans leading-relaxed mb-8 font-light tracking-wide">
              LÉONIE was founded with a singular purpose: to replace fast fashion noise with ten meticulously engineered dress archetypes. Every piece in our boutique is tailored using heritage French draping techniques and sustainably harvested raw silks.
            </p>
            <div className="pt-8 border-t border-[#333333] flex items-center gap-12">
              <div>
                <span className="font-serif text-4xl text-[#EADBC8] block font-bold mb-1">10</span>
                <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#999999]">
                  Archetype Dresses
                </span>
              </div>
              <div>
                <span className="font-serif text-4xl text-[#EADBC8] block font-bold mb-1">100%</span>
                <span className="text-[9px] font-sans uppercase tracking-[0.3em] text-[#999999]">
                  Pure Mulberry Silk
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CLIENTELE REVIEWS SECTION */}
      <section id="reviews" className="py-32 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#888888] font-medium block mb-3">
            Clientele Voice
          </span>
          <h2 className="font-serif text-4xl text-[#000000] font-normal">
            Reflections of Elegance
          </h2>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </section>

      {/* 5. MINIMAL PRIVATE GAZETTE */}
      <section className="py-28 bg-[#F9F8F6] border-t border-[#EAEAEA]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="text-[10px] uppercase font-sans tracking-[0.3em] text-[#888888] font-medium block mb-3">
            Private Gazette
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-[#000000] font-normal mb-4">
            Join The LÉONIE Circle
          </h2>
          <p className="text-xs font-sans text-[#666666] max-w-md mx-auto mb-8 font-light">
            Receive private invitations to seasonal trunk shows and early access to limited edition releases.
          </p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full px-5 py-3.5 bg-[#FFFFFF] border border-[#EAEAEA] text-xs font-sans text-[#000000] placeholder-[#999999] focus:outline-none focus:border-[#000000]"
            />
            <Button type="button" className="w-full sm:w-auto">
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
