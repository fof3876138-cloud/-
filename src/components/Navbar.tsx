import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateToAbout: () => void;
  onNavigateToProduct: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateToAbout,
  onNavigateToProduct,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/25 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark in single text element */}
        <a
          href="#"
          className="text-2xl lg:text-3xl font-brand-serif font-bold tracking-[0.2em] text-[#34141D] whitespace-nowrap shrink-0 hover:text-[#6A3241] transition-colors"
        >
          BONBON
        </a>

        {/* Zone 2: 2 concise single-line text navigation links: About & Product */}
        <nav className="hidden md:flex items-center gap-9 text-xs sm:text-sm font-medium tracking-[0.2em] text-[#6A3241]">
          <button
            onClick={onNavigateToAbout}
            className="hover:text-[#34141D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            About
          </button>
          <button
            onClick={onNavigateToProduct}
            className="hover:text-[#34141D] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Product
          </button>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenCart}
            aria-label="장바구니 열기"
            className="relative flex items-center gap-2.5 px-4 py-2.5 text-xs lg:text-sm font-medium text-white bg-[#4D1B28] hover:bg-[#38111C] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm active:scale-[0.98]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>장바구니 & 주문</span>
            {cartCount > 0 && (
              <span className="tabular-nums font-semibold ml-0.5 px-1.5 py-0.2 bg-[#D45B7A] text-white rounded text-[11px] leading-tight">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
