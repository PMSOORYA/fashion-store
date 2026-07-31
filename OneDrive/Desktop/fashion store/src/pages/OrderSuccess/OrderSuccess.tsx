import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Package, Calendar, MapPin, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../../components/Button/Button';

export const OrderSuccess: React.FC = () => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('leonie_last_order');
    if (saved) {
      setOrder(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="pt-28 pb-24 bg-[#FFFFFF]">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* Animated Success Checkmark */}
          <div className="w-20 h-20 bg-[#EADBC8] text-[#111111] rounded-full flex items-center justify-center mb-6 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <span className="text-xs uppercase font-sans tracking-[0.3em] text-[#777777] font-semibold block mb-2">
            Confirmation Verified
          </span>

          <h1 className="font-serif text-3xl md:text-5xl text-[#111111] font-normal mb-4">
            Thank You For Your Order
          </h1>

          <p className="text-sm font-sans text-[#555555] max-w-md mx-auto mb-10 font-light leading-relaxed">
            Your purchase has been received by our atelier. A confirmation email and tracking itinerary have been dispatched to your inbox.
          </p>

          {/* Order Details Card */}
          {order && (
            <div className="w-full bg-[#F8F8F8] border border-[#E5E5E5] p-8 text-left mb-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between pb-6 border-b border-[#E5E5E5] gap-4">
                <div>
                  <span className="text-xs font-sans uppercase tracking-widest text-[#777777] block">
                    Order Reference
                  </span>
                  <span className="font-serif text-xl font-bold text-[#111111]">{order.orderId}</span>
                </div>
                <div>
                  <span className="text-xs font-sans uppercase tracking-widest text-[#777777] block">
                    Order Date
                  </span>
                  <span className="text-sm font-sans text-[#111111] font-medium">{order.date}</span>
                </div>
                <div>
                  <span className="text-xs font-sans uppercase tracking-widest text-[#777777] block">
                    Estimated Delivery
                  </span>
                  <span className="text-sm font-sans text-[#111111] font-medium">3-5 Business Days</span>
                </div>
              </div>

              {/* Items Purchased */}
              <div>
                <h4 className="text-xs font-sans uppercase tracking-widest font-semibold text-[#111111] mb-4">
                  Purchased Items ({order.items.length})
                </h4>
                <div className="space-y-3">
                  {order.items.map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between py-2 border-b border-[#E5E5E5]/60">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.thumbnail}
                          alt=""
                          className="w-10 h-14 object-cover bg-white"
                        />
                        <div>
                          <p className="font-serif text-sm text-[#111111]">{item.product.title}</p>
                          <p className="text-[11px] font-sans text-[#777777]">
                            Size {item.selectedSize} • {item.selectedColor.name} • Qty {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-sans text-xs font-semibold text-[#111111]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address & Payment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#E5E5E5] text-xs font-sans text-[#555555]">
                <div className="flex gap-2">
                  <MapPin className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#111111] uppercase tracking-wider mb-1">
                      Shipping Address
                    </strong>
                    <p>{order.shippingDetails.fullName}</p>
                    <p>{order.shippingDetails.address}</p>
                    <p>
                      {order.shippingDetails.city}, {order.shippingDetails.zipCode}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <CreditCard className="w-4 h-4 text-[#111111] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-[#111111] uppercase tracking-wider mb-1">
                      Payment Method
                    </strong>
                    <p>{order.paymentMethod}</p>
                    <p className="font-semibold text-[#111111] mt-2">
                      Total Paid: ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Continue Shopping CTA */}
          <Link to="/">
            <Button size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Continue Shopping
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
