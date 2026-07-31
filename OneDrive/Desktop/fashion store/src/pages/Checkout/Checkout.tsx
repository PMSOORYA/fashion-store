import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, CreditCard, Banknote, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/Button/Button';
import { ShippingDetails } from '../../types';

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { cart, subtotal, discount, shipping, tax, total, clearCart } = useCart();
  const { user } = useAuth();

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: user ? user.name : 'Victoria Vance',
    email: user ? user.email : 'victoria@leonie-luxe.com',
    phone: '+1 (555) 987-6543',
    address: '740 Park Avenue, Suite 12B',
    city: 'New York',
    zipCode: '10021',
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4821');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('•••');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `LX-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderSummary = {
        orderId,
        date: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        items: [...cart],
        shippingDetails,
        paymentMethod: paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery',
        subtotal,
        discount,
        shippingFee: shipping,
        tax,
        total,
      };

      localStorage.setItem('leonie_last_order', JSON.stringify(orderSummary));
      clearCart();
      setIsSubmitting(false);
      navigate('/order-success');
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-24 max-w-xl mx-auto px-6 text-center">
        <h1 className="font-serif text-3xl text-[#111111] mb-4">No Items for Checkout</h1>
        <p className="text-xs font-sans text-[#666666] mb-6">
          Your shopping bag is empty. Please select a dress before proceeding.
        </p>
        <Link to="/">
          <Button size="md">Return to Storefront</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-10 pb-6 border-b border-[#E5E5E5]">
          <span className="text-xs uppercase font-sans tracking-[0.25em] text-[#777777] font-medium block mb-2">
            Secure Checkout
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#111111] font-normal">
            Finalize Your Purchase
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Form Columns (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Shipping Information Section */}
            <div className="bg-[#F8F8F8] border border-[#E5E5E5] p-8">
              <h2 className="font-serif text-xl text-[#111111] mb-6 pb-3 border-b border-[#E5E5E5]">
                1. Delivery & Contact Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-sans tracking-widest font-medium text-[#111111] mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={shippingDetails.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E5E5] text-sm font-sans text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans tracking-widest font-medium text-[#111111] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E5E5] text-sm font-sans text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans tracking-widest font-medium text-[#111111] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E5E5] text-sm font-sans text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase font-sans tracking-widest font-medium text-[#111111] mb-2">
                    Street Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={shippingDetails.address}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E5E5] text-sm font-sans text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans tracking-widest font-medium text-[#111111] mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={shippingDetails.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E5E5] text-sm font-sans text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase font-sans tracking-widest font-medium text-[#111111] mb-2">
                    ZIP / Postal Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={shippingDetails.zipCode}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-[#FFFFFF] border border-[#E5E5E5] text-sm font-sans text-[#111111] focus:outline-none focus:border-[#111111]"
                  />
                </div>
              </div>
            </div>

            {/* Payment Options Section */}
            <div className="bg-[#F8F8F8] border border-[#E5E5E5] p-8">
              <h2 className="font-serif text-xl text-[#111111] mb-6 pb-3 border-b border-[#E5E5E5]">
                2. Payment Method
              </h2>

              <div className="space-y-4 mb-6">
                <label
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                    paymentMethod === 'card'
                      ? 'bg-[#FFFFFF] border-[#111111] ring-1 ring-[#111111]'
                      : 'bg-[#FFFFFF]/50 border-[#E5E5E5] hover:border-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className="w-5 h-5 text-[#111111]" />
                    <div>
                      <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[#111111]">
                        Credit / Debit Card
                      </p>
                      <p className="text-[11px] text-[#777777]">Visa, Mastercard, American Express</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                    className="accent-[#111111]"
                  />
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                    paymentMethod === 'cod'
                      ? 'bg-[#FFFFFF] border-[#111111] ring-1 ring-[#111111]'
                      : 'bg-[#FFFFFF]/50 border-[#E5E5E5] hover:border-[#111111]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Banknote className="w-5 h-5 text-[#111111]" />
                    <div>
                      <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[#111111]">
                        Cash on Delivery (Concierge)
                      </p>
                      <p className="text-[11px] text-[#777777]">Pay upon physical hand-delivery</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#111111]"
                  />
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="p-6 bg-[#FFFFFF] border border-[#E5E5E5] space-y-4">
                  <div>
                    <label className="block text-xs uppercase font-sans tracking-widest text-[#777777] mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F8F8] border border-[#E5E5E5] text-xs font-mono text-[#111111] focus:outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase font-sans tracking-widest text-[#777777] mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F8F8F8] border border-[#E5E5E5] text-xs font-mono text-[#111111] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase font-sans tracking-widest text-[#777777] mb-1">
                        Security CVC
                      </label>
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F8F8F8] border border-[#E5E5E5] text-xs font-mono text-[#111111] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Side Summary Column (5 cols) */}
          <div className="lg:col-span-5">
            <div className="bg-[#F8F8F8] border border-[#E5E5E5] p-8 sticky top-28">
              <h2 className="font-serif text-2xl text-[#111111] mb-6 pb-4 border-b border-[#E5E5E5]">
                Order Items ({cart.length})
              </h2>

              {/* Items List */}
              <div className="space-y-4 max-h-60 overflow-y-auto pr-2 mb-6 scrollbar-none">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-12 h-16 object-cover bg-[#FFFFFF]"
                    />
                    <div className="flex-grow">
                      <h4 className="font-serif text-xs text-[#111111] line-clamp-1">{item.product.title}</h4>
                      <p className="text-[11px] font-sans text-[#777777]">
                        Size {item.selectedSize} • Qty {item.quantity}
                      </p>
                    </div>
                    <span className="text-xs font-sans font-semibold text-[#111111]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-3 text-xs font-sans text-[#555555] py-4 border-t border-b border-[#E5E5E5]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-700">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between items-baseline py-6">
                <span className="font-serif text-lg font-bold text-[#111111]">Total Amount</span>
                <span className="font-sans text-2xl font-bold text-[#111111]">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button
                fullWidth
                size="lg"
                type="submit"
                disabled={isSubmitting}
                icon={<Lock className="w-4 h-4" />}
              >
                {isSubmitting ? 'Processing Order...' : 'Place Order Now'}
              </Button>

              <p className="text-[11px] font-sans text-center text-[#888888] mt-4">
                By placing your order, you agree to LÉONIE LUXE’s Bespoke Terms & Delivery Conditions.
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
