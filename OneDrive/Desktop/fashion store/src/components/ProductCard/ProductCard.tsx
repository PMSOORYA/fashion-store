import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Default', hex: '#111111' });
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'M', selectedColor, 1);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'M', selectedColor, 1);
    navigate('/checkout');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col bg-[#FFFFFF]"
    >
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F8F8F8]">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isNewArrival && (
            <span className="bg-[#111111] text-[#FFFFFF] text-[10px] uppercase font-sans tracking-widest px-2.5 py-1">
              New Arrival
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-[#EADBC8] text-[#111111] text-[10px] uppercase font-sans font-medium tracking-widest px-2.5 py-1">
              Bestseller
            </span>
          )}
        </div>

        {/* Product Images (Primary + Gallery preview on hover) */}
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered && product.galleryImages[1] ? product.galleryImages[1] : product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleQuickAdd}
              className="bg-[#FFFFFF] text-[#111111] hover:bg-[#111111] hover:text-[#FFFFFF] text-[11px] uppercase font-sans tracking-wider py-2.5 transition-colors flex items-center justify-center gap-1.5 font-medium"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Add to Cart
            </button>

            <button
              type="button"
              onClick={handleBuyNow}
              className="bg-[#111111] text-[#FFFFFF] hover:bg-[#EADBC8] hover:text-[#111111] text-[11px] uppercase font-sans tracking-wider py-2.5 transition-colors flex items-center justify-center font-medium"
            >
              Buy Now
            </button>
          </div>

          {onQuickView && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onQuickView(product);
              }}
              className="w-full bg-[#FFFFFF]/90 text-[#111111] hover:bg-[#FFFFFF] text-[10px] uppercase font-sans tracking-widest py-1.5 transition-colors flex items-center justify-center gap-1"
            >
              <Eye className="w-3 h-3" /> Quick View
            </button>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="pt-4 pb-2 flex flex-col flex-grow">
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-[#777777] mb-1">
          <span className="uppercase tracking-wider text-[11px] font-sans">{product.category}</span>
          <div className="flex items-center gap-1 text-[#111111]">
            <Star className="w-3 h-3 fill-[#111111] text-[#111111]" />
            <span className="text-[11px] font-medium font-sans">{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/product/${product.slug}`} className="group-hover:text-[#555555] transition-colors">
          <h3 className="font-serif text-base text-[#111111] font-normal leading-snug line-clamp-1">
            {product.title}
          </h3>
        </Link>

        {/* Swatches & Price Row */}
        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={() => setSelectedColor(color)}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  selectedColor.name === color.name ? 'ring-1 ring-offset-1 ring-[#111111] scale-110' : 'border-gray-300 hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>

          <div className="flex items-center gap-2 font-sans text-sm">
            <span className="font-semibold text-[#111111]">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#999999] line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
