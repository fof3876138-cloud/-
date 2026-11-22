import React from 'react';
import { ChevronDown } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onNavigateToAbout: () => void;
  onNavigateToProduct: () => void;
  onNavigateToReview: () => void;
  onNavigateToGroupOrder: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onNavigateToAbout,
  onNavigateToProduct,
  onNavigateToReview,
  onNavigateToGroupOrder,
}) => {
  return (
    <div className="relative">
      {/* =========================================================================
          1. Brand Cover Stage (참고 사진 image_661d594f.png 기반 메인 포털 화면)
          모바일과 PC 모두에서 첫 화면에 100% 꽉 차게 이 화면만 단독으로 표시
          ========================================================================= */}
      <section 
        className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center px-4 sm:px-6 py-10 sm:py-12 text-center select-none"
      >
        <div className="w-full max-w-xl mx-auto flex flex-col items-center my-auto">
          {/* Main Brand Logo (사용자 업로드 로고: image_594527d1.png) */}
          <button
            onClick={onExploreClick}
            aria-label="봉봉 아틀리에 컬렉션 탐색하기"
            className="group relative cursor-pointer focus:outline-none transition-transform duration-500 hover:scale-[1.02] active:scale-[0.99] mb-4 max-w-full"
          >
            {/* Medallion Logo Image */}
            <div className="relative w-[min(76vw,280px)] sm:w-[380px] md:w-[440px] max-w-full flex items-center justify-center">
              <img
                src="/assets/aistudio/bonbon_main_logo.png"
                alt="BONBON Fabric & Living"
                className="w-full h-auto object-contain drop-shadow-[0_4px_16px_rgba(255,214,214,0.6)] transition-all duration-300 group-hover:drop-shadow-[0_6px_22px_rgba(255,214,214,0.85)]"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = "/assets/aistudio/image_594527d1.png";
                }}
              />
            </div>
          </button>

          {/* CLICK LOGO TO EXPLORE text */}
          <button
            onClick={onExploreClick}
            className="group inline-flex items-center justify-center gap-1.5 min-h-[44px] text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.22em] text-[#5A2332] hover:text-[#240C14] transition-colors cursor-pointer py-2 px-4 rounded-full mb-5 sm:mb-6"
          >
            <span>CLICK LOGO TO EXPLORE</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#5A2332] transition-transform group-hover:translate-y-0.5" />
          </button>

          {/* Category Navigation Links (About / Review / Product / Group order - 모바일 2x2 균등 그리드, 태블릿·PC 4열 대칭 그리드) */}
          <div className="w-full max-w-[320px] sm:max-w-[460px] md:max-w-[520px] mx-auto grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-1 sm:gap-0 items-center my-2 text-center">
            <div className="flex justify-center">
              <button
                onClick={onNavigateToAbout}
                className="group min-h-[44px] px-3 py-2 text-[clamp(0.8125rem,3.2vw,0.875rem)] font-semibold tracking-[0.14em] sm:tracking-[0.2em] text-[#240C14] hover:text-[#80243B] transition-colors cursor-pointer relative inline-flex flex-col items-center justify-center"
              >
                <span>About</span>
                <span className="absolute bottom-1.5 left-3 right-3 h-[1.5px] bg-[#240C14] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onNavigateToReview}
                className="group min-h-[44px] px-3 py-2 text-[clamp(0.8125rem,3.2vw,0.875rem)] font-semibold tracking-[0.14em] sm:tracking-[0.2em] text-[#240C14] hover:text-[#80243B] transition-colors cursor-pointer relative inline-flex flex-col items-center justify-center"
              >
                <span>Review</span>
                <span className="absolute bottom-1.5 left-3 right-3 h-[1.5px] bg-[#240C14] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onNavigateToProduct}
                className="group min-h-[44px] px-3 py-2 text-[clamp(0.8125rem,3.2vw,0.875rem)] font-semibold tracking-[0.14em] sm:tracking-[0.2em] text-[#240C14] hover:text-[#80243B] transition-colors cursor-pointer relative inline-flex flex-col items-center justify-center"
              >
                <span>Product</span>
                <span className="absolute bottom-1.5 left-3 right-3 h-[1.5px] bg-[#240C14] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            </div>

            <div className="flex justify-center">
              <button
                onClick={onNavigateToGroupOrder}
                className="group min-h-[44px] px-2.5 sm:px-3 py-2 text-[clamp(0.8125rem,3.2vw,0.875rem)] font-semibold tracking-[0.1em] sm:tracking-[0.2em] text-[#240C14] hover:text-[#80243B] transition-colors cursor-pointer relative inline-flex flex-col items-center justify-center"
              >
                <span className="whitespace-nowrap">Group order</span>
                <span className="absolute bottom-1.5 left-2.5 right-2.5 h-[1.5px] bg-[#240C14] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
              </button>
            </div>
          </div>

          {/* Thin Divider Line */}
          <div className="w-12 h-[1.5px] bg-[#FFD6D6] mx-auto my-5" />

          {/* Subtitle Tagline */}
          <div className="text-[clamp(0.625rem,2.5vw,0.6875rem)] font-semibold tracking-[0.2em] sm:tracking-[0.26em] text-[#5A2332] uppercase px-2">
            WARMTH &amp; ELEGANCE FOR HOME
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. Atelier Showcase Story & Trust Bar (장인 정신 및 작업실 소개)
          첫 화면과 아래 사진/본문 사이의 넉넉하고 자연스러운 여백 확보
          ========================================================================= */}
      <section id="about-section" className="relative overflow-hidden pt-16 pb-12 sm:pt-28 sm:pb-20 lg:pt-40 lg:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-14 items-center">
            {/* Left Column: Brand Story & Headline */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h1 
                aria-label="손끝에서 피어나는 선물, 사계절을 품은 패브릭."
                className="text-[clamp(1.375rem,5.2vw,2.85rem)] leading-[1.3] sm:leading-[1.25] font-serif-kr font-extrabold text-black tracking-tight mb-5 sm:mb-6 break-keep"
              >
                <span className="block sm:whitespace-nowrap text-black font-extrabold">
                  {'손끝에서 피어나는 선물,'.split('').map((char, i) => (
                    <span
                      key={`line1-${i}`}
                      className="inline-block fabric-wave-char text-black font-extrabold"
                      style={{ animationDelay: `${i * 0.11}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
                <span className="block sm:whitespace-nowrap mt-1.5 sm:mt-2 text-black font-extrabold">
                  {'사계절을 품은 패브릭.'.split('').map((char, i) => (
                    <span
                      key={`line2-${i}`}
                      className="inline-block fabric-wave-char text-black font-extrabold"
                      style={{ animationDelay: `${(i + 4) * 0.11}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>
              </h1>

              <div className="space-y-1.5">
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.18em] text-[#7A283C] font-bold">
                  100% hand made
                </div>
                <div className="text-[11px] sm:text-xs uppercase tracking-[0.08em] sm:tracking-[0.14em] text-[#7A283C] font-bold leading-relaxed break-keep">
                  100% made in korea (Fabric, Cutting, Finishing &amp; Packaging)
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Studio Shot with half-thickness #FFD6D6 frame */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden p-1 sm:p-1.5 bg-[#FFD6D6] shadow-md group">
                <div className="rounded-xl overflow-hidden aspect-[16/10] lg:aspect-[4/3] bg-white">
                  <img
                    src="/assets/aistudio/hero_workshop_cropped.png"
                    alt="봉봉 작업대 위의 핸드메이드 담요, 천연염색 스카프, 자수 손수건"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                    referrerPolicy="no-referrer"
                    loading="eager"
                    onError={(e) => {
                      e.currentTarget.src = "/assets/aistudio/image_9c7da4d3.png";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
