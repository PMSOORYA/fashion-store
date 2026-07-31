import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Share2 } from 'lucide-react';
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

  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0] || { name: 'Default', hex: '#000000' });
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
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

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="pt-28 pb-32 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-[10px] font-sans text-[#888888] mb-10 uppercase tracking-[0.25em]">
          <Link to="/" className="hover:text-[#000000] transition-colors">
            Collection
          </Link>
          <ChevronRight className="w-3 h-3 text-[#CCCCCC]" />
          <a href="/#collection" className="hover:text-[#000000] transition-colors">
            {product.category}
          </a>
          <ChevronRight className="w-3 h-3 text-[#CCCCCC]" />
          <span className="text-[#000000] font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* Lookbook Layout Grid (7 cols gallery stack on left, 5 cols sticky purchase on right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-32">
          {/* Left Gallery Stack (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="aspect-[3/4] bg-[#F9F8F6] overflow-hidden">
              <img
                src={product.galleryImages[activeImageIndex] || product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover object-center"
              />
            </div>

            {/* Thumbnail Row */}
            <div className="grid grid-cols-4 gap-4">
              {product.galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[3/4] bg-[#F9F8F6] overflow-hidden border transition-all ${
                    activeImageIndex === idx ? 'border-[#000000]' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Sticky Purchase Panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="sticky top-28 space-y-8">
              <div>
                <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#888888] block mb-2">
                  {product.category}
                </span>
                <h1 className="font-serif text-3xl md:text-4xl text-[#000000] font-normal leading-snug mb-3">
                  {product.title}
                </h1>
                <div className="flex items-baseline gap-4 mb-4 font-sans">
                  <span className="text-2xl font-bold text-[#000000]">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-[#999999] line-through">${product.originalPrice}</span>
                  )}
                </div>
                <p className="text-xs text-[#555555] font-sans font-light leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Color Selector */}
              <div>
                <span className="block text-[10px] font-sans uppercase tracking-[0.25em] font-medium text-[#000000] mb-3">
                  Color: <span className="text-[#777777] font-normal">{selectedColor.name}</span>
                </span>
                <div className="flex items-center gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`w-7 h-7 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'border-[#000000] ring-1 ring-offset-2 ring-[#000000]'
                          : 'border-gray-200 hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <span className="block text-[10px] font-sans uppercase tracking-[0.25em] font-medium text-[#000000] mb-3">
                  Select Size
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-[11px] font-sans font-medium uppercase border transition-all ${
                        selectedSize === size
                          ? 'bg-[#000000] text-[#FFFFFF] border-[#000000]'
                          : 'bg-transparent text-[#000000] border-[#EAEAEA] hover:border-[#000000]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <span className="block text-[10px] font-sans uppercase tracking-[0.25em] font-medium text-[#000000] mb-3">
                  Quantity
                </span>
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity((q) => q + 1)}
                  onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                />
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4">
                <Button fullWidth size="lg" onClick={handleAddToCart}>
                  Add to Bag — ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button fullWidth size="lg" variant="secondary" onClick={handleBuyNow}>
                  Instant Checkout
                </Button>
              </div>

              {/* Fabric Specs */}
              <div className="pt-6 border-t border-[#EAEAEA] text-[11px] text-[#666666] font-sans leading-relaxed space-y-2">
                <p>
                  <strong className="text-[#000000]">Composition:</strong> {product.material}
                </p>
                <p>
                  <strong className="text-[#000000]">Delivery:</strong> Complimentary worldwide shipping on all orders.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Items Strip */}
        <div className="pt-20 border-t border-[#EAEAEA]">
          <h2 className="font-serif text-3xl text-[#000000] mb-12 text-center">
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
