import { useState } from 'react';
import { CartItem } from './Cart';
import { X, CheckCircle, CreditCard, Truck, Shield } from 'lucide-react';

interface CheckoutProps {
  items: CartItem[];
  onClose: () => void;
  onComplete: () => void;
}

export default function Checkout({ items, onClose, onComplete }: CheckoutProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    card: '',
    expiry: '',
    cvv: '',
  });

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (step === 'success') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <CheckCircle size={40} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">Order Confirmed!</h2>
          <p className="text-stone-500 mb-2">Thank you for your purchase.</p>
          <p className="text-sm text-stone-400 mb-6">
            Order #AC-{Math.random().toString(36).substr(2, 8).toUpperCase()} has been placed successfully.
            We'll send you a confirmation email shortly.
          </p>
          <div className="bg-stone-50 rounded-xl p-4 mb-6">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-stone-500">Items</span>
              <span className="font-medium">{items.reduce((s, i) => s + i.quantity, 0)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-500">Total</span>
              <span className="font-bold text-amber-900">${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="w-full py-3.5 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative bg-white rounded-3xl max-w-sm w-full p-8 text-center shadow-2xl">
          <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-800 rounded-full animate-spin mx-auto mb-5" />
          <h2 className="text-xl font-bold text-stone-800 mb-2">Processing Order</h2>
          <p className="text-stone-500 text-sm">Please wait while we process your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white rounded-t-3xl border-b border-stone-100 p-5 flex items-center justify-between z-10">
          <h2 className="text-lg font-bold text-stone-800">Checkout</h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
          >
            <X size={20} className="text-stone-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Order Summary */}
          <div className="bg-stone-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-stone-700 mb-3">Order Summary</h3>
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span className="text-stone-600">{item.product.name} × {item.quantity}</span>
                  <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-stone-200 mt-3 pt-3 flex justify-between">
              <span className="font-bold text-stone-800">Total</span>
              <span className="font-bold text-amber-900 text-lg">${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping Info */}
          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <Truck size={16} className="text-amber-700" />
              Shipping Information
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={formData.zip}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h3 className="text-sm font-semibold text-stone-700 mb-3 flex items-center gap-2">
              <CreditCard size={16} className="text-amber-700" />
              Payment Details
            </h3>
            <div className="space-y-3">
              <input
                type="text"
                name="card"
                placeholder="Card Number"
                value={formData.card}
                onChange={handleChange}
                required
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Security Badge */}
          <div className="flex items-center gap-2 text-xs text-stone-400">
            <Shield size={14} />
            <span>Your payment information is secure and encrypted</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3.5 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-800/20"
          >
            Place Order — ${total.toFixed(2)}
          </button>
        </form>
      </div>
    </div>
  );
}
