import { useState, useMemo } from 'react';
import { products, categories, roastLevels, Product } from './data/products';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import Cart, { CartItem } from './components/Cart';
import Checkout from './components/Checkout';
import { Search, ShoppingCart, Coffee, Filter, X } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRoast, setSelectedRoast] = useState('All');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.notes.some(note => note.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const matchesRoast = selectedRoast === 'All' || product.roast === selectedRoast;
      return matchesSearch && matchesCategory && matchesRoast;
    });
  }, [searchQuery, selectedCategory, selectedRoast]);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setIsCheckoutOpen(false);
    setCartItems([]);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedRoast('All');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || selectedRoast !== 'All';

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-lg border-b border-stone-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-700 to-amber-900 rounded-xl flex items-center justify-center shadow-lg shadow-amber-800/20">
                <Coffee size={18} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-stone-800 leading-tight">Artisan</h1>
                <p className="text-[10px] text-stone-400 -mt-0.5 tracking-wider uppercase">Specialty Coffee</p>
              </div>
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search coffee, origin, tasting notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-4 py-2.5 bg-stone-50 hover:bg-stone-100 rounded-xl transition-colors border border-stone-200"
            >
              <ShoppingCart size={18} className="text-stone-700" />
              <span className="hidden sm:inline text-sm font-medium text-stone-700">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-800 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Search coffee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-amber-900 via-amber-800 to-stone-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16 relative">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-amber-100 text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              Freshly Roasted Weekly
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Discover the Art of
              <span className="block text-amber-300">Specialty Coffee</span>
            </h2>
            <p className="text-amber-100/80 text-sm md:text-base max-w-lg mb-6">
              Curated selection of the world's finest single-origin and artisan blend coffees, 
              roasted to perfection for an exceptional cup every time.
            </p>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <span className="text-amber-300 text-lg">☕</span>
                <span className="text-white text-xs font-medium">Ethically Sourced</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <span className="text-amber-300 text-lg">🌍</span>
                <span className="text-white text-xs font-medium">Single Origin</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg">
                <span className="text-amber-300 text-lg">✨</span>
                <span className="text-white text-xs font-medium">Small Batch Roasted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-stone-800">Our Collection</h3>
              <span className="text-sm text-stone-400">({filteredProducts.length} coffees)</span>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden flex items-center gap-2 px-3 py-2 bg-white border border-stone-200 rounded-xl text-sm text-stone-600 hover:bg-stone-50 transition-colors"
            >
              <Filter size={14} />
              Filters
            </button>
          </div>

          {/* Filter Controls */}
          <div className={`${showFilters ? 'block' : 'hidden'} md:block space-y-4`}>
            {/* Categories */}
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 block">Category</label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-amber-800 text-white shadow-md shadow-amber-800/20'
                        : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:text-amber-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Roast Level */}
            <div>
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-2 block">Roast Level</label>
              <div className="flex flex-wrap gap-2">
                {roastLevels.map((roast) => (
                  <button
                    key={roast}
                    onClick={() => setSelectedRoast(roast)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      selectedRoast === roast
                        ? 'bg-amber-800 text-white shadow-md shadow-amber-800/20'
                        : 'bg-white text-stone-600 border border-stone-200 hover:border-amber-300 hover:text-amber-800'
                    }`}
                  >
                    {roast}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm text-amber-700 hover:text-amber-900 font-medium transition-colors"
              >
                <X size={14} />
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                onViewDetails={setSelectedProduct}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Coffee size={32} className="text-stone-300" />
            </div>
            <h3 className="text-lg font-semibold text-stone-700 mb-2">No coffees found</h3>
            <p className="text-stone-500 text-sm mb-4">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-5 py-2.5 bg-amber-800 text-white rounded-xl text-sm font-medium hover:bg-amber-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-300 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-amber-600 to-amber-800 rounded-xl flex items-center justify-center">
                  <Coffee size={18} className="text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold">Artisan Coffee</h4>
                  <p className="text-[10px] text-stone-500 tracking-wider uppercase">Specialty Coffee</p>
                </div>
              </div>
              <p className="text-sm text-stone-400 leading-relaxed">
                Dedicated to bringing you the world's finest specialty coffees, 
                ethically sourced and expertly roasted.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li className="hover:text-amber-400 cursor-pointer transition-colors">Our Story</li>
                <li className="hover:text-amber-400 cursor-pointer transition-colors">Brewing Guides</li>
                <li className="hover:text-amber-400 cursor-pointer transition-colors">Subscription</li>
                <li className="hover:text-amber-400 cursor-pointer transition-colors">Wholesale</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-stone-400">
                <li>hello@artisancoffee.com</li>
                <li>+1 (555) 234-5678</li>
                <li>Mon - Fri: 7am - 6pm</li>
                <li>Sat - Sun: 8am - 4pm</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-8 pt-8 text-center text-xs text-stone-500">
            © 2026 Artisan Coffee. All rights reserved. Crafted with passion for specialty coffee.
          </div>
        </div>
      </footer>

      {/* Modals */}
      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(product) => {
            addToCart(product);
            setSelectedProduct(null);
          }}
        />
      )}

      <Cart
        items={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      {isCheckoutOpen && (
        <Checkout
          items={cartItems}
          onClose={() => setIsCheckoutOpen(false)}
          onComplete={handleOrderComplete}
        />
      )}
    </div>
  );
}

export default App;
