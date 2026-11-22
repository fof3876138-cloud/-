import React, { useRef, useState, useEffect } from 'react';
import { REVIEWS } from '../data/products';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

export const ReviewSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const getStepSize = () => {
    const el = sliderRef.current;
    if (!el) return 384;
    const firstCard = el.querySelector<HTMLElement>('[data-review-card]');
    return firstCard ? firstCard.offsetWidth + 24 : 384;
  };

  const updateScrollState = () => {
    const el = sliderRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setTotalPages(1);
      setActivePage(0);
      return;
    }
    const cardStep = getStepSize();
    const pages = Math.max(1, Math.ceil(maxScroll / cardStep) + 1);
    setTotalPages(pages);
    const current = Math.min(pages - 1, Math.round(el.scrollLeft / cardStep));
    setActivePage(current);
  };

  useEffect(() => {
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => {
      window.removeEventListener('resize', updateScrollState);
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
        animFrameRef.current = null;
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

  return (
    <section id="review-section" className="py-14 sm:py-20 lg:py-24 bg-white border-t border-[#FFD6D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-xl mx-auto text-center mb-10 sm:mb-12">
          <div className="text-xs uppercase tracking-widest text-[#7A283C] font-bold mb-2">
            Warm Customer Stories
          </div>
          <h2 className="text-[clamp(1.5rem,5vw,1.875rem)] font-serif-kr font-bold text-[#240C14] tracking-tight mb-3 break-keep">
            손끝으로 느낀 다정한 후기
          </h2>
          <p className="text-[clamp(0.8125rem,3.2vw,0.875rem)] text-[#5A2332] font-normal leading-relaxed break-keep">
            봉봉의 홈메이드 패브릭을 일상과 특별한 순간에 함께해 주신 분들의 이야기입니다.
          </p>
        </div>

        {/* Interactive Left-to-Right Arrow Slider */}
        <div className="relative">
          {/* Left Arrow Icon Button */}
          <button
            type="button"
            onClick={() => handleSlide('left')}
            aria-label="이전 후기 보기"
            className="absolute left-1 sm:-left-4 lg:-left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#FFD6D6] border border-[#FFD6D6] text-[#240C14] shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Icon Button */}
          <button
            type="button"
            onClick={() => handleSlide('right')}
            aria-label="다음 후기 보기"
            className="absolute right-1 sm:-right-4 lg:-right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white/95 hover:bg-[#FFD6D6] border border-[#FFD6D6] text-[#240C14] shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Scrollable Review Cards Track */}
          <div
            ref={sliderRef}
            onScroll={updateScrollState}
            className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1"
          >
            {/* First Review Card Slot: Store Review Summary Graphic */}
            <div
              data-review-card
              className="w-[calc(100vw-2.5rem)] max-w-[330px] sm:w-[340px] sm:max-w-none lg:w-[368px] shrink-0 bg-[#FAF6F2] rounded-2xl border border-[#FFD6D6] shadow-sm overflow-hidden flex items-center justify-center"
            >
              <img
                src="/assets/aistudio/image_bd3cb987.png"
                alt="스토어 리뷰 1000건 이상 평균 별점 4.98"
                className="w-full h-full object-contain object-center"
                loading="lazy"
              />
            </div>

            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                data-review-card
                className="w-[calc(100vw-2.5rem)] max-w-[330px] sm:w-[340px] sm:max-w-none lg:w-[368px] shrink-0 bg-white p-5 sm:p-7 rounded-2xl border border-[#FFD6D6] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#E67A94]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#E67A94]" />
                      ))}
                    </div>
                  </div>

                  <div className="text-xs font-semibold text-[#240C14] mb-2 line-clamp-1">
                    {rev.productTitle}
                  </div>

                  <p className="text-[13px] sm:text-sm text-[#5A2332] leading-relaxed mb-6 break-keep">
                    "{rev.content}"
                  </p>
                </div>

                <div className="pt-4 border-t border-[#FFD6D6] flex items-center justify-between text-xs gap-2">
                  <span className="font-semibold text-[#240C14]">{rev.author}</span>
                  <span className="text-[#240C14] bg-[#FFD6D6] px-2.5 py-1 rounded text-[11px] font-semibold shrink-0">
                    {rev.feelTag}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Subtle Clickable Progress Dots */}
          {totalPages > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6 px-4">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`후기 페이지 ${idx + 1}`}
                  onClick={() => {
                    const el = sliderRef.current;
                    if (!el) return;
                    const maxScroll = el.scrollWidth - el.clientWidth;
                    smoothScrollTo(Math.min(maxScroll, idx * getStepSize()));
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === activePage ? 'w-6 bg-[#7A283C]' : 'w-2 bg-[#FFD6D6] hover:bg-[#F2B8B8]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
