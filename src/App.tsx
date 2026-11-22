import React, { useState, useMemo } from 'react';
import { FabricBackground } from './components/FabricBackground';
import { HeroSection } from './components/HeroSection';
import { ProductSliderGrid } from './components/ProductSliderGrid';
import { ProductModal } from './components/ProductModal';
import { CraftStory } from './components/CraftStory';
import { ReviewSection } from './components/ReviewSection';
import { ContactSection } from './components/ContactSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { GiftOrderShowcase } from './components/GiftOrderShowcase';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, ProductCategory, CartItem, OrderData } from './types';
import { Search, SlidersHorizontal, ShoppingBag, Menu, X } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc'>('popular');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Shopping Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show temporary toast message
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Add to cart handler
  const handleAddToCart = (itemData: Omit<CartItem, 'cartItemId'>) => {
    const cartItemId = `${itemData.product.id}-${itemData.selectedDimension}-${itemData.selectedColor.name}-${itemData.withBojagiWrap}-${itemData.customEmbroideryText || 'none'}`;
    
    setCartItems((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + itemData.quantity }
            : item
        );
      }
      return [...prev, { ...itemData, cartItemId }];
    });

    triggerToast(`"${itemData.product.name}"을(를) 장바구니에 담았습니다.`);
    setIsCartOpen(true);
  };

  // Update quantity in cart
  const handleUpdateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item from cart
  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  // Order Complete
  const handleOrderComplete = (_order: OrderData) => {
    setCartItems([]);
  };

  // Category filter tabs
  const categories: { id: ProductCategory; label: string; count: number }[] = [
    { id: 'all', label: '전체 작품', count: PRODUCTS.length },
    { id: 'scarf', label: '스카프 · 머플러', count: PRODUCTS.filter((p) => p.category === 'scarf').length },
    { id: 'blanket', label: '담요·블랭킷', count: PRODUCTS.filter((p) => p.category === 'blanket').length },
    { id: 'apron', label: '앞치마·키친크로스', count: PRODUCTS.filter((p) => p.category === 'apron').length },
    { id: 'eco-handkerchief', label: '친환경손수건', count: PRODUCTS.filter((p) => p.category === 'eco-handkerchief').length },
    { id: 'gift', label: '선물세트·단체주문', count: PRODUCTS.filter((p) => p.category === 'gift').length },
  ];

  // Filtered & sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.materials.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.shortDesc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // default 'popular': preserve curated store order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  // Total items in cart
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Smooth scroll helpers
  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full flex flex-col bg-white text-[#240C14] relative selection:bg-[#FFD6D6] selection:text-[#240C14] overflow-x-hidden">
      {/* Mobile Quick Navigation Toggle (md 미만 모바일·태블릿 전용 플로팅 메뉴) */}
      <div className="md:hidden fixed top-3.5 right-3.5 z-40">
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={isMobileMenuOpen ? '메뉴 닫기' : '모바일 메뉴 열기'}
          aria-expanded={isMobileMenuOpen}
          className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-xs border border-[#FFD6D6] text-[#240C14] shadow-md flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {isMobileMenuOpen && (
          <nav
            aria-label="모바일 섹션 메뉴"
            className="mt-2 w-48 rounded-2xl bg-white/95 backdrop-blur-xs border border-[#FFD6D6] shadow-xl p-2 flex flex-col gap-1"
          >
            <button
              type="button"
              onClick={() => scrollTo('about-section')}
              className="w-full min-h-[44px] px-3.5 py-2 text-left text-sm font-semibold text-[#240C14] hover:bg-[#FFF5F7] rounded-xl transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => scrollTo('review-section')}
              className="w-full min-h-[44px] px-3.5 py-2 text-left text-sm font-semibold text-[#240C14] hover:bg-[#FFF5F7] rounded-xl transition-colors cursor-pointer"
            >
              Review
            </button>
            <button
              type="button"
              onClick={() => scrollTo('collection-grid')}
              className="w-full min-h-[44px] px-3.5 py-2 text-left text-sm font-semibold text-[#240C14] hover:bg-[#FFF5F7] rounded-xl transition-colors cursor-pointer"
            >
              Product
            </button>
            <button
              type="button"
              onClick={() => scrollTo('contact-section')}
              className="w-full min-h-[44px] px-3.5 py-2 text-left text-sm font-semibold text-[#240C14] hover:bg-[#FFF5F7] rounded-xl transition-colors cursor-pointer"
            >
              Group order
            </button>
          </nav>
        )}
      </div>

      {/* Visual Depth: Silky Undulating Wave & Atmospheric Ambient Background */}
      <FabricBackground />

      <main className="flex-1 relative z-10 w-full max-w-full">
        {/* Main Cover & Hero Section */}
        <HeroSection
          onExploreClick={() => scrollTo('collection-grid')}
          onNavigateToAbout={() => scrollTo('about-section')}
          onNavigateToProduct={() => scrollTo('collection-grid')}
          onNavigateToReview={() => scrollTo('review-section')}
          onNavigateToGroupOrder={() => scrollTo('contact-section')}
        />

        {/* Artisan Story (CraftStory: 느림을 견딘 패브릭만이 가장 다정한 결을 품습니다.) */}
        <div id="craft-story-section">
          <CraftStory />
        </div>

        {/* Customer Reviews Section */}
        <ReviewSection />

        {/* Featured Collection Section - 봉봉 카테고리 전체 작품 */}
        <section id="collection-grid" className="py-14 sm:py-16 lg:py-24 border-t border-[#FFD6D6] bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-8 sm:mb-10 pb-2">
              <div>
                <div className="text-xs uppercase tracking-widest text-[#7A283C] font-bold mb-2">
                  Handcrafted Collection · Category
                </div>
                <h2 className="text-[clamp(1.375rem,4.8vw,1.875rem)] font-serif-kr font-bold text-[#240C14] break-keep">
                  봉봉 카테고리 전체 작품
                </h2>
              </div>

              {/* Search and Sort controls */}
              <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A283C]" />
                  <input
                    type="text"
                    placeholder="작품명, 소재 (순면, 이중거즈...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-60 min-h-[44px] pl-8 pr-3 py-2 text-sm sm:text-xs bg-white border border-[#FFD6D6] rounded-lg focus:outline-none focus:border-[#4D1B28] shadow-2xs text-[#240C14]"
                  />
                </div>

                <div className="flex items-center justify-between sm:justify-start gap-1.5 min-h-[44px] bg-white border border-[#FFD6D6] rounded-lg px-3 py-2 text-sm sm:text-xs text-[#240C14] font-medium shadow-2xs">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#7A283C] shrink-0" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent focus:outline-none cursor-pointer w-full sm:w-auto"
                  >
                    <option value="popular">추천 순</option>
                    <option value="price-asc">낮은 가격 순</option>
                    <option value="price-desc">높은 가격 순</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Interactive Category Filter Tabs (카테고리 전체 배열) */}
            <div className="flex flex-wrap lg:flex-nowrap items-center gap-1.5 sm:gap-2 p-1.5 bg-white rounded-2xl mb-8 sm:mb-10 w-full lg:w-fit max-w-full border border-[#FFD6D6] shadow-xs">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`min-h-[42px] px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 ${
                    selectedCategory === cat.id
                      ? 'bg-[#FFD6D6] text-[#240C14] font-bold shadow-xs'
                      : 'text-[#5A2332] hover:text-[#240C14] hover:bg-[#FFF5F7]'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.count > 0 && (
                    <span className={`text-[11px] tabular-nums font-normal ${selectedCategory === cat.id ? 'text-[#5A2332] font-semibold' : 'text-[#8C4658]'}`}>
                      ({cat.count})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Products Grid or Gift Showcase */}
            {selectedCategory === 'gift' ? (
              <GiftOrderShowcase onConsultClick={() => scrollTo('contact-section')} />
            ) : filteredProducts.length === 0 ? (
              <div className="py-20 text-center text-[#8C4658] bg-white rounded-2xl border border-[#F1CCD5] shadow-sm">
                <p className="text-sm font-medium mb-1">
                  검색 조건에 맞는 작품이 없습니다.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-[#4D1B28] font-semibold underline underline-offset-4 cursor-pointer"
                >
                  필터 초기화
                </button>
              </div>
            ) : (
              <ProductSliderGrid
                products={filteredProducts}
                onSelectProduct={(p) => setActiveProduct(p)}
                resetKey={`${selectedCategory}-${searchQuery}-${sortBy}`}
              />
            )}
          </div>
        </section>

        {/* Contact & Custom Gift Consultation Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Product Detail Modal */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />

      {/* Shopping Bag Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout & Inquiry Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={handleOrderComplete}
      />

      {/* Floating Cart Button (shows only when cart has items) */}
      {totalCartCount > 0 && !isCartOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label="장바구니 열기"
          className="fixed bottom-6 left-6 z-40 flex items-center gap-2.5 px-4 py-3 bg-[#4D1B28] hover:bg-[#38111C] text-white text-xs sm:text-sm font-medium rounded-full shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer border border-[#6B283A]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>장바구니 & 주문 ({totalCartCount})</span>
        </button>
      )}
    </div>
  );
}
