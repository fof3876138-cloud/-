import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Gift, Layers, PackageCheck, ShieldCheck, ArrowDownRight } from 'lucide-react';

interface GiftOrderShowcaseProps {
  onConsultClick: () => void;
}

const GIFT_GALLERY_IMAGES = [
  {
    src: '/assets/aistudio/14ee32e0-9259-4944-8c1c-de84641a4517_1feea0b8.webp',
    alt: '올리브 그린 밍크퍼 블랭킷·쁘띠스카프 크라프트 기프트백 세트',
  },
  {
    src: '/assets/aistudio/3a1e8525-56c2-4738-a51f-3b9fe40341ca_38a67b5d.webp',
    alt: '파스텔 블루·핑크 리본 선물박스 2종 스카프·블랭킷 세트',
  },
  {
    src: '/assets/aistudio/581fccd9-4eeb-4da5-9072-bd099489c751_b1d283fe.webp',
    alt: '로즈 핑크 골지 밍크퍼 블랭킷·스카프 아이보리 리본 선물박스 세트',
  },
  {
    src: '/assets/aistudio/661fcf73-ff91-4894-8574-1b38276fe7d4_143aac09.webp',
    alt: '아이보리·파스텔 블루 리본 선물박스 거즈 블랭킷·스카프 세트',
  },
  {
    src: '/assets/aistudio/a0fdf695-2e4f-4bfb-baef-58facf6a7a4f_48cc2bec.webp',
    alt: '아이보리·파스텔 핑크 리본 선물박스 2종 세트',
  },
  {
    src: '/assets/aistudio/39156079-e32c-4413-9175-1afba50073fa_576222bf.webp',
    alt: '크라프트 핸들 리본 창문 기프트백 2종 세트',
  },
  {
    src: '/assets/aistudio/aeebb356-0e45-4889-b6c6-0a7cf914e7e8_fc3c8c52.webp',
    alt: '리본 자수 앞치마·키친패드 크라프트 리본 기프트백 세트',
  },
  {
    src: '/assets/aistudio/a5694d20-3581-4c17-8fa3-007815f06318_cafa5729.webp',
    alt: '리본 자수 앞치마·키친패드 핑크·블루 리본 선물박스 세트',
  },
  {
    src: '/assets/aistudio/c576ff39-1c01-489d-bb45-94c60371900e_aef3cc14.webp',
    alt: '크라프트 창문형 리본 기프트백 스카프·블랭킷 세트',
  },
  {
    src: '/assets/aistudio/af386de2-62f7-4181-b106-a32d4c55aa41_0e2732fb.webp',
    alt: '플라워 거즈 블랭킷·스카프 크라프트 기프트백 2종 세트',
  },
  {
    src: '/assets/aistudio/cab84936-c495-40db-871c-72c1f482b00c_a33e0b57.webp',
    alt: '딸기 앞치마 및 하트 주방장갑 아이보리 리본 선물박스 세트',
  },
  {
    src: '/assets/aistudio/0a9a1d63-3745-4ff2-8d45-812d63f9d114_6e9a26c0.webp',
    alt: '딸기 앞치마 및 하트 주방장갑 크라프트 리본 기프트백 세트',
  },
];

export const GiftOrderShowcase: React.FC<GiftOrderShowcaseProps> = ({ onConsultClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? GIFT_GALLERY_IMAGES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === GIFT_GALLERY_IMAGES.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="rounded-2xl border border-[#FFD6D6] bg-[#FFD6D6] shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Left Column: #FFD6D6 Coral-Pink Photo Showcase & 12-Image Gallery */}
        <div className="lg:col-span-7 p-4 sm:p-7 lg:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#F2BDBD]">
          {/* Featured Main Image */}
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-white border border-[#FFD6D6] shadow-xs group">
            <img
              src={GIFT_GALLERY_IMAGES[activeIndex].src}
              alt={GIFT_GALLERY_IMAGES[activeIndex].alt}
              className="w-full h-full object-cover object-center transition-all duration-300"
            />

            {/* Subtle Navigation Arrows */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="이전 선물세트 사진"
              className="absolute left-2.5 sm:left-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-[#FFD6D6] border border-[#FFD6D6] text-[#240C14] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="다음 선물세트 사진"
              className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-[#FFD6D6] border border-[#FFD6D6] text-[#240C14] shadow-sm flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 px-2.5 py-1 rounded-md bg-[#240C14]/80 text-white text-[11px] font-semibold tabular-nums">
              {activeIndex + 1} / {GIFT_GALLERY_IMAGES.length}
            </div>
          </div>

          {/* All 12 Gift Packaging Thumbnails Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-2.5 mt-3.5 sm:mt-4">
            {GIFT_GALLERY_IMAGES.map((item, idx) => (
              <button
                key={item.src}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`${idx + 1}번 선물세트 사진 보기`}
                className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                  activeIndex === idx
                    ? 'border-[#240C14] shadow-sm scale-[1.02]'
                    : 'border-white/80 opacity-80 hover:opacity-100 hover:border-[#7A283C]/40'
                }`}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Matching Coral-Pink & Soft Cream Specification Panel */}
        <div className="lg:col-span-5 bg-[#FFD6D6] p-5 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Section Eyebrow & Lead Description */}
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#7A283C] font-bold mb-2">
              Custom Gift &amp; Group Order
            </div>
            <h3 className="text-[clamp(1.2rem,4.5vw,1.5rem)] font-serif-kr font-bold text-[#240C14] tracking-tight mb-3">
              선물세트 · 단체주문 안내
            </h3>
            <p className="text-xs sm:text-sm text-[#240C14] leading-relaxed break-keep pb-5 border-b border-[#E8BABA]">
              기업 행사 기념품, 관공서 홍보물, 동호회 굿즈 및 각종 답례품 등 단체 주문 시 목적과 예산에 최적화된 맞춤형 기프트 솔루션을 제공합니다.
            </p>

            {/* Structured Solution Items (matching left product spec rhythm) */}
            <div className="space-y-5 pt-5 text-xs sm:text-[13px] text-[#240C14]">
              <div className="flex items-start gap-3 leading-relaxed break-keep">
                <div className="p-2 rounded-lg bg-white/80 border border-[#F2BDBD] text-[#C2255C] shrink-0 mt-0.5">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#240C14] mb-1">
                    맞춤형 상품 구성 (Customizing Set)
                  </div>
                  <p className="text-[#4A1C28] leading-relaxed">
                    스카프, 담요, 블랭킷, 앞치마, 키친크로스, 손수건
                    <br />
                    전 품목 300가지 이상의 원단이 준비되어있습니다
                    <br />
                    원하는 조합의 세트로 구성할 수 있습니다
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 leading-relaxed break-keep">
                <div className="p-2 rounded-lg bg-white/80 border border-[#F2BDBD] text-[#C2255C] shrink-0 mt-0.5">
                  <Gift className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#240C14] mb-1">
                    맞춤 선물 패키징 서비스
                  </div>
                  <p className="text-[#4A1C28] leading-relaxed">
                    단독 선물포장 및 패키징이 가능하며, 브랜드 이미지와 수령자 취향을 반영하여 다양한 선물포장지 옵션을 선택 적용할 수 있습니다.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 leading-relaxed break-keep">
                <div className="p-2 rounded-lg bg-white/80 border border-[#F2BDBD] text-[#C2255C] shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-[#240C14] mb-1">
                    사전 샘플 검증 지원
                  </div>
                  <p className="text-[#4A1C28] leading-relaxed">
                    본 발주 전 제품 퀄리티와 패키징 사양을 미리 검토하실 수 있도록 샘플 확인 절차를 지원합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-7 pt-5 border-t border-[#E8BABA]">
            <button
              type="button"
              onClick={onConsultClick}
              className="w-full min-h-[46px] py-3 px-4 rounded-xl bg-white hover:bg-[#FFF5F5] border border-[#F2B8B8] text-[#240C14] text-xs sm:text-sm font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
            >
              <PackageCheck className="w-4 h-4 text-[#C2255C] shrink-0" />
              <span>단체주문 · 맞춤 제작 상담 문의하기</span>
              <ArrowDownRight className="w-4 h-4 shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
