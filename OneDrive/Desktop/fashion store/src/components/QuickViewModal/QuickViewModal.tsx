import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product, ProductColor } from '../../types';
import { useCart } from '../../context/CartContext';
import { QuantitySelector } from '../QuantitySelector/QuantitySelector';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];
  const currentSize = selectedSize || product.sizes[0];

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, quantity);
    onClose();
  };

  const handleBuyNow = () => {
    addToCart(product, currentSize, currentColor, quantity);
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-[#FFFFFF] overflow-hidden z-10 shadow-2xl border border-[#E5E5E5] max-h-[90vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-[#111111] hover:bg-[#F8F8F8] transition-colors rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery Column */}
            <div className="bg-[#F8F8F8] p-6 flex flex-col justify-between">
              <div className="aspect-[3/4] w-full overflow-hidden mb-4">
                <img
                  src={product.galleryImages[activeImageIndex] || product.thumbnail}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-20 flex-shrink-0 border-2 overflow-hidden ${
                      activeImageIndex === idx ? 'border-[#111111]' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Meta & Actions Column */}
            <div className="p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-[#777777] mb-2 font-sans">
                  <span className="uppercase tracking-widest">{product.category}</span>
                  <div className="flex items-center gap-1 text-[#111111]">
                    <Star className="w-3.5 h-3.5 fill-[#111111] text-[#111111]" />
                    <span className="font-semibold">{product.rating}</span>
                    <span className="text-[#999999]">({product.reviewCount})</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl md:text-3xl text-[#111111] font-normal mb-3">
                  {product.title}
                </h2>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-xl font-bold font-sans text-[#111111]">${product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-[#999999] line-through font-sans">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>

                <p className="text-sm text-[#555555] font-sans leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Color Selector */}
                <div className="mb-6">
                  <span className="block text-xs uppercase tracking-widest text-[#111111] font-medium mb-3">
                    Color: <span className="text-[#777777] font-normal">{currentColor.name}</span>
                  </span>
                  <div className="flex items-center gap-2.5">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          currentColor.name === color.name ? 'border-[#111111] scale-110' : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                  <span className="block text-xs uppercase tracking-widest text-[#111111] font-medium mb-3">
                    Select Size
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`w-11 h-11 text-xs font-sans font-medium uppercase border transition-all ${
                          currentSize === size
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
                  <span className="block text-xs uppercase tracking-widest text-[#111111] font-medium mb-3">
                    Quantity
                  </span>
                  <QuantitySelector
                    quantity={quantity}
                    onIncrease={() => setQuantity((q) => q + 1)}
                    onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                  />
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-4 border-t border-[#E5E5E5]">
                <Button fullWidth onClick={handleAddToCart} icon={<ShoppingBag className="w-4 h-4" />}>
                  Add to Cart — ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button fullWidth variant="secondary" onClick={handleBuyNow}>
                  Instant Checkout
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
