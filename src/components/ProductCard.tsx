import { useState } from 'react';
import { Product } from '../data/products';
import { ShoppingCart, Star, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewDetails }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const roastColor = {
    'Light': 'bg-amber-100 text-amber-800',
    'Medium-Light': 'bg-orange-100 text-orange-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Medium-Dark': 'bg-amber-200 text-amber-900',
    'Dark': 'bg-stone-200 text-stone-800',
  }[product.roast] || 'bg-gray-100 text-gray-800';

  return (
    <div
      className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-stone-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${roastColor}`}>
            {product.roast}
          </span>
          {product.category === 'Premium' && (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              Premium
            </span>
          )}
        </div>

        <div className={`absolute bottom-3 left-3 right-3 flex gap-2 transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-white/90 backdrop-blur-sm text-stone-800 py-2.5 rounded-xl text-sm font-medium hover:bg-white transition-colors"
          >
            <Eye size={16} />
            Details
          </button>
          <button
            onClick={() => onAddToCart(product)}
            className="flex-1 flex items-center justify-center gap-1.5 bg-amber-800/90 backdrop-blur-sm text-white py-2.5 rounded-xl text-sm font-medium hover:bg-amber-800 transition-colors"
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-stone-800 text-sm leading-tight">{product.name}</h3>
          <div className="flex items-center gap-0.5 text-amber-500 shrink-0">
            <Star size={12} fill="currentColor" />
            <span className="text-xs text-stone-600">{product.rating}</span>
          </div>
        </div>
        <p className="text-xs text-stone-500 mb-2">{product.origin} · {product.weight}</p>
        <div className="flex flex-wrap gap-1 mb-3">
          {product.notes.slice(0, 3).map((note) => (
            <span key={note} className="text-[10px] px-2 py-0.5 bg-stone-50 text-stone-600 rounded-full border border-stone-100">
              {note}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-amber-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="md:hidden px-3 py-1.5 bg-amber-800 text-white text-xs rounded-lg hover:bg-amber-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
