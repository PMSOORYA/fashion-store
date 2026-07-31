import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, Tag, Check, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { QuantitySelector } from '../../components/QuantitySelector/QuantitySelector';
import { Button } from '../../components/Button/Button';

export const Cart: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discount,
    applyPromoCode,
    promoCode,
    tax,
    shipping,
    total,
    totalCount,
  } = useCart();

  const [inputCode, setInputCode] = useState('');
  const [codeError, setCodeError] = useState(false);
  const [codeSuccess, setCodeSuccess] = useState(false);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyPromoCode(inputCode)) {
      setCodeSuccess(true);
      setCodeError(false);
    } else {
      setCodeError(true);
      setCodeSuccess(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="pt-36 pb-28 max-w-xl mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-[#F9F8F6] rounded-full flex items-center justify-center mx-auto mb-6 text-[#000000] border border-[#EAEAEA]">
          <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-3xl md:text-4xl text-[#000000] mb-3 font-normal">
          Your cart is empty.
        </h1>
        <p className="text-xs font-sans text-[#666666] max-w-md mx-auto mb-8 font-light leading-relaxed">
          Your shopping bag currently holds no items. Discover our luxury collection of ten handcrafted dresses.
        </p>
        <Link to="/">
          <Button size="lg">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10 pb-6 border-b border-[#E5E5E5] flex items-baseline justify-between">
          <div>
            <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#777777] font-medium block mb-2">
              Shopping Bag
            </span>
            <h1 className="font-serif text-3xl md:text-4xl text-[#111111] font-normal">
              Your Selections ({totalCount})
            </h1>
          </div>
          <Link to="/" className="text-xs font-sans uppercase tracking-widest text-[#111111] underline">
            Continue Shopping
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Cart Items Table (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-6 p-6 bg-[#F8F8F8] border border-[#E5E5E5] relative"
              >
                {/* Image */}
                <Link
                  to={`/product/${item.product.slug}`}
                  className="w-full sm:w-28 aspect-[3/4] bg-[#FFFFFF] flex-shrink-0 overflow-hidden"
                >
                  <img
                    src={item.product.thumbnail}
                    alt={item.product.title}
                    className="w-full h-full object-cover object-center"
                  />
                </Link>

                {/* Details */}
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <Link to={`/product/${item.product.slug}`}>
                        <h3 className="font-serif text-lg text-[#111111] font-normal hover:text-[#555555] transition-colors">
                          {item.product.title}
                        </h3>
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#999999] hover:text-[#111111] transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs font-sans text-[#777777] uppercase tracking-wider mt-1">
                      {item.product.category}
                    </p>

                    <div className="flex items-center gap-4 mt-3 text-xs font-sans text-[#555555]">
                      <span>
                        Size: <strong className="text-[#111111]">{item.selectedSize}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        Color:
                        <span
                          className="w-3 h-3 rounded-full border border-gray-300 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <strong className="text-[#111111]">{item.selectedColor.name}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#E5E5E5]">
                    <QuantitySelector
                      quantity={item.quantity}
                      onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                      onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                    />
                    <span className="font-sans font-bold text-base text-[#111111]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary & Promo Code (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#F8F8F8] border border-[#E5E5E5] p-8 sticky top-28">
              <h2 className="font-serif text-2xl text-[#111111] mb-6 pb-4 border-b border-[#E5E5E5]">
                Order Summary
              </h2>

              {/* Promo Code Form */}
              <div className="mb-6">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-grow">
                    <Tag className="w-4 h-4 text-[#999999] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. LUXE10)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-[#FFFFFF] border border-[#E5E5E5] text-xs font-sans text-[#111111] uppercase tracking-wider focus:outline-none focus:border-[#111111]"
                    />
                  </div>
                  <Button type="submit" variant="secondary" size="sm">
                    Apply
                  </Button>
                </form>

                {codeSuccess && (
                  <p className="text-[11px] font-sans text-green-700 mt-2 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> 15% VIP Luxury discount applied!
                  </p>
                )}
                {codeError && (
                  <p className="text-[11px] font-sans text-red-600 mt-2">
                    Invalid code. Try using "LUXE10" for 15% off.
                  </p>
                )}
              </div>

              {/* Breakdown */}
              <div className="space-y-3.5 text-xs font-sans text-[#555555] pb-6 border-b border-[#E5E5E5]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#111111]">${subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>VIP Privilege Discount (15%)</span>
                    <span className="font-semibold">-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline py-6">
                <span className="font-serif text-lg font-bold text-[#111111]">Total</span>
                <span className="font-sans text-2xl font-bold text-[#111111]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={() => navigate('/checkout')}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Proceed to Checkout
              </Button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[11px] font-sans text-[#777777]">
                <ShieldCheck className="w-4 h-4 text-[#111111]" />
                <span>Encrypted & Complimentary Gift Box</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
