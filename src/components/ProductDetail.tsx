import { Product } from '../data/products';
import { X, Star, ShoppingCart, MapPin, Mountain, Droplets } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductDetail({ product, onClose, onAddToCart }: ProductDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors"
        >
          <X size={20} className="text-stone-600" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-square md:aspect-auto md:h-full">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover md:rounded-l-3xl"
            />
          </div>

          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                {product.category}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-stone-100 text-stone-700">
                {product.roast} Roast
              </span>
            </div>

            <h2 className="text-2xl font-bold text-stone-800 mb-1">{product.name}</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'} />
                ))}
              </div>
              <span className="text-sm text-stone-500">{product.rating} / 5.0</span>
            </div>

            <p className="text-stone-600 text-sm leading-relaxed mb-5">{product.description}</p>

            <div className="grid grid-cols-3 gap-3 mb-5">
              <div className="flex flex-col items-center p-3 bg-stone-50 rounded-xl">
                <MapPin size={16} className="text-amber-700 mb-1" />
                <span className="text-[10px] text-stone-500">Origin</span>
                <span className="text-xs font-medium text-stone-700">{product.origin}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-stone-50 rounded-xl">
                <Mountain size={16} className="text-amber-700 mb-1" />
                <span className="text-[10px] text-stone-500">Altitude</span>
                <span className="text-xs font-medium text-stone-700">{product.altitude}</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-stone-50 rounded-xl">
                <Droplets size={16} className="text-amber-700 mb-1" />
                <span className="text-[10px] text-stone-500">Process</span>
                <span className="text-xs font-medium text-stone-700 truncate w-full text-center">{product.process}</span>
              </div>
            </div>

            <div className="mb-5">
              <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2">Tasting Notes</h4>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span key={note} className="px-3 py-1.5 bg-amber-50 text-amber-800 text-xs rounded-full border border-amber-100">
                    {note}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-stone-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-amber-900">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-stone-500 ml-2">/ {product.weight}</span>
                </div>
              </div>
              <button
                onClick={() => onAddToCart(product)}
                className="w-full flex items-center justify-center gap-2 bg-amber-800 text-white py-3.5 rounded-xl font-medium hover:bg-amber-700 transition-colors shadow-lg shadow-amber-800/20"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
