import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Truck, ShieldCheck, ChevronRight, ArrowLeft, Heart, Share2 } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import { Button } from '../../components/Button/Button';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { ProductColor } from '../../types';

export const Product: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#111111' });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');
  const [copied, setCopied] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  // Related products excluding current product
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-sans text-[#777777] mb-8 uppercase tracking-widest">
          <Link to="/" className="hover:text-[#111111] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 text-[#CCCCCC]" />
          <a href="/#collection" className="hover:text-[#111111] transition-colors">
            {product.category}
          </a>
          <ChevronRight className="w-3 h-3 text-[#CCCCCC]" />
          <span className="text-[#111111] font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24">
          {/* Left Column: Image Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">
            {/* Gallery Thumbnails List */}
            <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[600px] scrollbar-none">
              {product.galleryImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-20 h-28 flex-shrink-0 border-2 transition-all ${
                    activeImageIndex === index ? 'border-[#111111]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={image} alt={`${product.title} view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Active Image Frame */}
            <div className="flex-grow aspect-[3/4] bg-[#F8F8F8] overflow-hidden relative">
              <img
                src={product.galleryImages[activeImageIndex] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
            </div>
          </div>

          {/* Right Column: Product Meta & Purchase Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category & Stock */}
              <div className="flex items-center justify-between mb-3 text-xs font-sans text-[#777777]">
                <span className="uppercase tracking-[0.2em]">{product.category}</span>
                <span className="text-[#111111] bg-[#F8F8F8] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wider">
                  In Stock ({product.stock} left)
                </span>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl md:text-4xl text-[#111111] font-normal leading-tight mb-4">
                {product.title}
              </h1>

              {/* Rating & Share */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E5E5E5] mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-[#111111]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-[#111111] text-[#111111]'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-sans text-[#111111] font-semibold">{product.rating}</span>
                  <span className="text-xs font-sans text-[#888888]">({product.reviewCount} reviews)</span>
                </div>

                <button
                  type="button"
                  onClick={handleShare}
                  className="text-xs font-sans text-[#555555] hover:text-[#111111] flex items-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-sans text-3xl font-bold text-[#111111]">${product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="font-sans text-lg text-[#999999] line-through">
                    ${product.originalPrice}
                  </span>
                )}
                <span className="text-xs font-sans uppercase tracking-widest text-[#111111] bg-[#EADBC8] px-2 py-0.5 font-semibold">
                  Complimentary Shipping
                </span>
              </div>

              {/* Description */}
              <p className="text-sm font-sans text-[#555555] leading-relaxed mb-8 font-light">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-sans uppercase tracking-widest font-semibold text-[#111111]">
                    Color: <span className="font-normal text-[#666666]">{selectedColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'border-[#111111] ring-2 ring-offset-2 ring-[#111111] scale-110'
                          : 'border-gray-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-sans uppercase tracking-widest font-semibold text-[#111111]">
                    Select Size
                  </span>
                  <button type="button" className="text-xs font-sans text-[#777777] underline">
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2.5">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs font-sans font-medium uppercase border transition-all ${
                        selectedSize === size
                          ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                          : 'bg-transparent text-[#111111] border-[#E5E5E5] hover:border-[#111111]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <span className="block text-xs font-sans uppercase tracking-widest font-semibold text-[#111111] mb-3">
                  Quantity
                </span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-3.5 mb-10">
                <Button fullWidth size="lg" onClick={handleAddToCart} icon={<ShoppingBag className="w-4 h-4" />}>
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button fullWidth size="lg" variant="secondary" onClick={handleBuyNow}>
                  Instant Checkout
                </Button>
              </div>

              {/* Accordion Tabs */}
              <div className="border-t border-[#E5E5E5]">
                <div className="flex border-b border-[#E5E5E5]">
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className={`py-3.5 px-4 text-xs font-sans uppercase tracking-wider font-medium border-b-2 transition-colors ${
                      activeTab === 'details'
                        ? 'border-[#111111] text-[#111111]'
                        : 'border-transparent text-[#888888] hover:text-[#111111]'
                    }`}
                  >
                    Fabric & Material
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('shipping')}
                    className={`py-3.5 px-4 text-xs font-sans uppercase tracking-wider font-medium border-b-2 transition-colors ${
                      activeTab === 'shipping'
                        ? 'border-[#111111] text-[#111111]'
                        : 'border-transparent text-[#888888] hover:text-[#111111]'
                    }`}
                  >
                    Shipping & Returns
                  </button>
                </div>

                <div className="py-5 text-xs text-[#555555] font-sans leading-relaxed">
                  {activeTab === 'details' && (
                    <div>
                      <p className="mb-2">
                        <strong className="text-[#111111]">Composition:</strong> {product.material}
                      </p>
                      <p>
                        <strong className="text-[#111111]">Care:</strong> {product.careInstructions || 'Dry clean recommended.'}
                      </p>
                    </div>
                  )}
                  {activeTab === 'shipping' && (
                    <p>
                      Complimentary express worldwide shipping on all orders over $300. Orders placed before 2 PM EST are dispatched same day in luxury signature gift box packaging.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like Section */}
        <div className="pt-16 border-t border-[#E5E5E5]">
          <h2 className="font-serif text-2xl md:text-3xl text-[#111111] mb-10 text-center">
            You May Also Admire
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
