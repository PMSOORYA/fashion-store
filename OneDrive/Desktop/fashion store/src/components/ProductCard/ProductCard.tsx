import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0] || 'M', product.colors[0], 1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex flex-col bg-[#FFFFFF]"
    >
      {/* Large Editorial Image Frame */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#F9F8F6]">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered && product.galleryImages[1] ? product.galleryImages[1] : product.thumbnail}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Minimal Hover Overlay - Quick Add */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 bg-gradient-to-t from-black/40 to-transparent">
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-[#000000] text-[#FFFFFF] hover:bg-[#222222] text-[10px] uppercase font-sans tracking-[0.25em] py-3 transition-colors font-medium cursor-pointer"
          >
            Quick Add — ${product.price}
          </button>
        </div>
      </div>

      {/* Product Details - Clean Editorial Typography */}
      <div className="pt-4 flex flex-col">
        <div className="flex items-baseline justify-between gap-2">
          <Link to={`/product/${product.slug}`} className="group-hover:opacity-70 transition-opacity">
            <h3 className="font-serif text-base text-[#000000] font-normal leading-snug">
              {product.title}
            </h3>
          </Link>
          <span className="font-sans text-xs font-semibold text-[#000000] flex-shrink-0">
            ${product.price}
          </span>
        </div>

        <div className="flex items-center justify-between mt-1 text-[11px] font-sans text-[#888888] tracking-widest uppercase">
          <span>{product.category}</span>
          <span>{product.material.split(' ')[1] || 'Silk'}</span>
        </div>
      </div>
    </motion.div>
  );
};
