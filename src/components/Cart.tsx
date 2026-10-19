import { Product } from '../data/products';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onCheckout: () => void;
}

export default function Cart({ items, isOpen, onClose, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Cart Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl transition-transform duration-300 ease-out flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={22} className="text-amber-800" />
            <h2 className="text-lg font-bold text-stone-800">Your Cart</h2>
            {itemCount > 0 && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                {itemCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors"
          >
            <X size={20} className="text-stone-600" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag size={32} className="text-stone-300" />
              </div>
              <p className="text-stone-500 font-medium">Your cart is empty</p>
              <p className="text-stone-400 text-sm mt-1">Add some specialty coffee to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-stone-50 rounded-xl">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-stone-800 truncate">{item.product.name}</h4>
                    <p className="text-xs text-stone-500">{item.product.weight}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white rounded-lg border border-stone-200 hover:border-amber-300 transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white rounded-lg border border-stone-200 hover:border-amber-300 transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-amber-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="self-start p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-100 bg-stone-50/50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-stone-500">Subtotal</span>
              <span className="text-sm font-medium text-stone-700">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-stone-500">Shipping</span>
              <span className="text-sm font-medium text-green-600">Free</span>
            </div>
            <div className="flex items-center justify-between mb-4 pt-2 border-t border-stone-200">
              <span className="text-base font-bold text-stone-800">Total</span>
              <span className="text-xl font-bold text-amber-900">${total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3.5 bg-amber-800 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-800/20"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
