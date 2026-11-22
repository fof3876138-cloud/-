import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductSliderGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  resetKey: string;
}

export const ProductSliderGrid: React.FC<ProductSliderGridProps> = ({
  products,
  onSelectProduct,
  resetKey,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const [viewportMode, setViewportMode] = useState<'mobile' | 'tablet' | 'desktop'>(() => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth < 640) return 'mobile';
    if (window.innerWidth < 1024) return 'tablet';
    return 'desktop';
  });

  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setViewportMode('mobile');
      } else if (window.innerWidth < 1024) {
        setViewportMode('tablet');
      } else {
        setViewportMode('desktop');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // PC: 1줄 4개 × 3줄 = 12개씩 슬라이드 / 태블릿: 2×2(4개) / 모바일: 가로 1장씩 간편 슬라이드
  const productChunks = useMemo(() => {
    if (viewportMode === 'mobile') return [];
    const chunkSize = viewportMode === 'desktop' ? 12 : 4;
    const chunks: Product[][] = [];
    for (let i = 0; i < products.length; i += chunkSize) {
      chunks.push(products.slice(i, i + chunkSize));
    }
    return chunks;
  }, [products, viewportMode]);

  const getStepSize = () => {
    const el = sliderRef.current;
    if (!el) return 320;
    if (viewportMode === 'mobile') {
      const firstCard = el.querySelector<HTMLElement>('[data-product-slide-card]');
      return firstCard ? firstCard.offsetWidth + 16 : el.clientWidth;
    }
    return el.clientWidth;
  };

  const updateScrollState = () => {
    const el = sliderRef.current;
    if (!el) return;

    if (viewportMode === 'mobile') {
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (maxScroll <= 4) {
        setTotalPages(1);
        setActivePage(0);
        return;
      }
      const step = getStepSize();
      const pages = Math.max(1, Math.ceil(maxScroll / step) + 1);
      setTotalPages(pages);
      const current = Math.min(pages - 1, Math.round(el.scrollLeft / step));
      setActivePage(current);
    } else {
      const pages = Math.max(1, productChunks.length);
      setTotalPages(pages);
      const step = el.clientWidth || 1;
      const current = Math.min(pages - 1, Math.round(el.scrollLeft / step));
      setActivePage(current);
    }
  };

  // Reset slider position when category, search, sort, or viewport mode changes
  useEffect(() => {
    const el = sliderRef.current;
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (el) {
      el.scrollLeft = 0;
    }
    setActivePage(0);

    const timer = requestAnimationFrame(() => {
      updateScrollState();
    });
    return () => cancelAnimationFrame(timer);
  }, [resetKey, viewportMode, productChunks.length]);

  useEffect(() => {
    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  const smoothScrollTo = (targetLeft: number) => {
    const el = sliderRef.current;
    if (!el) return;

    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }

    const startLeft = el.scrollLeft;
    const distance = targetLeft - startLeft;
    if (Math.abs(distance) < 2) {
      el.scrollLeft = targetLeft;
      updateScrollState();
      return;
    }

    el.style.scrollSnapType = 'none';
    const duration = 560;
    let startTime: number | null = null;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      el.scrollLeft = startLeft + distance * easeOutCubic(progress);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        el.style.scrollSnapType = '';
        animFrameRef.current = null;
        updateScrollState();
      }
    };

    animFrameRef.current = requestAnimationFrame(step);
  };

  const handleSlide = (direction: 'left' | 'right') => {
    const el = sliderRef.current;
    if (!el) return;

    const stepSize = getStepSize();
    const maxScroll = el.scrollWidth - el.clientWidth;

    if (direction === 'right') {
      if (el.scrollLeft >= maxScroll - 8) {
        smoothScrollTo(0);
      } else {
        smoothScrollTo(Math.min(maxScroll, el.scrollLeft + stepSize));
      }
    } else {
      if (el.scrollLeft <= 8) {
        smoothScrollTo(maxScroll);
      } else {
        smoothScrollTo(Math.max(0, el.scrollLeft - stepSize));
      }
    }
  };

  const handleGoToPage = (pageIdx: number) => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const target = Math.min(maxScroll, pageIdx * getStepSize());
    smoothScrollTo(target);
  };

  return (
    <div className="relative">
      {/* Left Arrow Icon Button */}
      {totalPages > 1 && (
        <button
          type="button"
          onClick={() => handleSlide('left')}
          aria-label="이전 상품 보기"
          className="absolute left-1.5 sm:-left-5 lg:-left-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFD6D6] hover:bg-[#FFC2C2] border-2 border-[#F2A6B8] text-[#240C14] shadow-lg ring-4 ring-white/85 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 text-[#7A283C]" strokeWidth={2.4} />
        </button>
      )}

      {/* Right Arrow Icon Button */}
      {totalPages > 1 && (
        <button
          type="button"
          onClick={() => handleSlide('right')}
          aria-label="다음 상품 보기"
          className="absolute right-1.5 sm:-right-5 lg:-right-7 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FFD6D6] hover:bg-[#FFC2C2] border-2 border-[#F2A6B8] text-[#240C14] shadow-lg ring-4 ring-white/85 flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
        >
          <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 text-[#7A283C]" strokeWidth={2.4} />
        </button>
      )}

      {/* Horizontal Slide Track */}
      <div
        ref={sliderRef}
        onScroll={updateScrollState}
        className={
          viewportMode === 'mobile'
            ? 'flex items-stretch gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory py-1 px-0.5'
            : 'flex items-start overflow-x-auto no-scrollbar snap-x snap-mandatory'
        }
      >
        {viewportMode === 'mobile'
          ? products.map((product) => (
              <div
                key={product.id}
                data-product-slide-card
                className="w-[calc(100vw-2.5rem)] max-w-[330px] shrink-0 snap-start"
              >
                <ProductCard product={product} onSelect={onSelectProduct} />
              </div>
            ))
          : productChunks.map((chunk, chunkIdx) => (
              <div
                key={`slide-page-${chunkIdx}`}
                className="w-full shrink-0 snap-start grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 px-0.5 py-0.5"
              >
                {chunk.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                  />
                ))}
              </div>
            ))}
      </div>

      {/* Bottom Slide Controls & Page Indicator */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <button
            type="button"
            onClick={() => handleSlide('left')}
            aria-label="이전 페이지"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFD6D6] hover:bg-[#FFC2C2] border-2 border-[#F2A6B8] text-[#7A283C] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.4} />
          </button>

          <div className="flex flex-wrap items-center justify-center gap-1.5">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                aria-label={`상품 ${idx + 1}페이지`}
                onClick={() => handleGoToPage(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  idx === activePage ? 'w-6 bg-[#7A283C]' : 'w-2 bg-[#FFD6D6] hover:bg-[#F2B8B8]'
                }`}
              />
            ))}
          </div>

          <span className="text-xs font-semibold text-[#7A283C] tabular-nums px-1">
            {activePage + 1} / {totalPages}
          </span>

          <button
            type="button"
            onClick={() => handleSlide('right')}
            aria-label="다음 페이지"
            className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#FFD6D6] hover:bg-[#FFC2C2] border-2 border-[#F2A6B8] text-[#7A283C] flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.4} />
          </button>
        </div>
      )}
    </div>
  );
};
