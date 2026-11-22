import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { X, Check, ShieldCheck, Gift, HeartHandshake, Truck, ShoppingBag } from 'lucide-react';

const SMARTSTORE_URL =
  'https://smartstore.naver.com/hennstore?NaPm=ct%3Dmwn3wdf1%7Cci%3Dcheckout%7Ctr%3Dds%7Ctrx%3Dnull%7Chk%3Deadf11d1bc52272d26d4938e35febced76d69fc7';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
}) => {
  if (!product) return null;

  const [selectedDimension, setSelectedDimension] = useState<string>(product.dimensions[0]);
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(product.colors[0]);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'care'>('details');

  // Sync state when product changes
  useEffect(() => {
    setSelectedDimension(product.dimensions[0]);
    setSelectedColor(product.colors[0]);
    setActiveImage(product.image);
  }, [product]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Dimension extra price calculation (e.g. +12,000원)
  const extractExtraPrice = (dimText: string): number => {
    const match = dimText.match(/\+(\d{1,3}(,\d{3})*)원/);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
  };

  const extraDimPrice = extractExtraPrice(selectedDimension);
  const unitPrice = product.price + extraDimPrice;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-6 md:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#FFD6D6] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="닫기"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-10 h-10 flex items-center justify-center text-[#240C14] hover:text-black bg-white/90 hover:bg-white rounded-full transition-colors cursor-pointer border border-[#FFD6D6] shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[90vh] sm:max-h-[88vh] overflow-y-auto">
          {/* Left Column: Gallery & Story with #FFD6D6 stage */}
          <div className="md:col-span-6 bg-[#FFD6D6] p-4 sm:p-6 lg:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#FFD6D6]">
            <div>
              <div className="relative aspect-square rounded-xl overflow-hidden border border-[#FFD6D6] bg-white mb-4 shadow-xs">
                <img
                  src={activeImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                {product.tag && (
                  <div className="absolute top-3 left-3 bg-[#240C14]/90 text-white text-[11px] font-semibold px-2.5 py-1 rounded">
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {product.secondaryImage && (
                <div className="flex gap-2.5 mb-5 sm:mb-6">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === product.image ? 'border-[#240C14] scale-100' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={product.image} alt="전면 컷" className="w-full h-full object-cover object-center" />
                  </button>
                  <button
                    onClick={() => setActiveImage(product.secondaryImage!)}
                    className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === product.secondaryImage ? 'border-[#240C14] scale-100' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="아틀리에 디테일 컷" className="w-full h-full object-cover object-center" />
                  </button>
                </div>
              )}

              {/* Craft Certification Badges */}
              <div className="space-y-2.5 text-xs text-[#240C14] pt-4 border-t border-[#FFD6D6]">
                <div className="flex items-start gap-2.5 leading-snug break-keep">
                  <Gift className="w-4 h-4 text-[#C2255C] shrink-0 mt-0.5" />
                  <span className="font-medium">단체주문·기업답례품·행사기념품·선물세트 가능 제품</span>
                </div>
                <div className="flex items-start gap-2.5 leading-snug break-keep">
                  <HeartHandshake className="w-4 h-4 text-[#8C7A65] shrink-0 mt-0.5" />
                  <span>100% 국내제작 / 전 공정 핸드메이드</span>
                </div>
                <div className="flex items-start gap-2.5 leading-snug break-keep">
                  <Truck className="w-4 h-4 text-[#8C7A65] shrink-0 mt-0.5" />
                  <span>작업실 &gt; 소비자 직배송 (공장X)</span>
                </div>
                <div className="flex items-start gap-2.5 leading-snug break-keep">
                  <ShieldCheck className="w-4 h-4 text-[#C2255C] shrink-0 mt-0.5" />
                  <span>전 제품 꼼꼼한 전수 2중검수 후 출고</span>
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-4 border-t border-[#E8E0D4] text-[11px] text-[#938576]">
              {product.leadTime}
            </div>
          </div>

          {/* Right Column: Product Specifications */}
          <div className="md:col-span-6 p-4 sm:p-6 lg:p-8 flex flex-col justify-start bg-white">
            <div>
              {/* English Subtitle */}
              <div className="text-[11px] tracking-wider uppercase text-[#8D8073] font-medium mb-1 pr-10 md:pr-8">
                {product.englishName}
              </div>

              {/* Product Title */}
              <h2 className="text-[clamp(1.15rem,4.5vw,1.5rem)] font-serif-kr font-bold text-[#241F1B] mb-2 leading-snug break-keep pr-8">
                {product.name}
              </h2>

              {/* Stock status */}
              <div className="flex items-center gap-2 text-xs text-[#96897C] mb-4">
                <span>잔여 수량: {product.stockCount}점</span>
              </div>

              {/* Price display & Purchase button */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-[#F0EAE1]">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-[clamp(1.25rem,5vw,1.5rem)] font-bold text-[#221C18] tabular-nums font-serif-kr">
                    ₩{unitPrice.toLocaleString('ko-KR')}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#A09384] line-through tabular-nums">
                      ₩{product.originalPrice.toLocaleString('ko-KR')}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-semibold text-[#B35227]">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                {product.stockCount === 0 ? (
                  <button
                    type="button"
                    disabled
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 py-2 rounded-lg bg-[#EAE4E6] border border-[#EAE4E6] text-[#8E8285] cursor-not-allowed text-xs sm:text-sm font-bold shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>품절</span>
                  </button>
                ) : (
                  <a
                    href={SMARTSTORE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center justify-center gap-1.5 min-h-[42px] px-4 py-2 rounded-lg bg-[#FFD6D6] hover:bg-[#FFC2C2] border border-[#F2B8B8] text-[#240C14] text-xs sm:text-sm font-bold transition-colors shadow-xs cursor-pointer active:scale-[0.98]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>상품구매</span>
                  </a>
                )}
              </div>

              {/* Option 1: Dimensions / Size */}
              <div className="mb-4">
                <label className="block text-xs font-medium text-[#533940] mb-2">
                  사이즈 / 규격 선택
                </label>
                <div className="space-y-1.5">
                  {product.dimensions.map((dim) => (
                    <button
                      key={dim}
                      type="button"
                      onClick={() => setSelectedDimension(dim)}
                      className={`w-full min-h-[44px] text-left px-3.5 py-2.5 rounded-lg text-xs font-medium border transition-colors flex items-center justify-between gap-2 cursor-pointer ${
                        selectedDimension === dim
                          ? 'border-[#4D1B28] bg-[#FDF0F4] text-[#34141D]'
                          : 'border-[#F1CCD5] text-[#6B3241] hover:border-[#E2A6B7]'
                      }`}
                    >
                      <span className="break-keep">{dim}</span>
                      {selectedDimension === dim && <Check className="w-3.5 h-3.5 text-[#4D1B28] shrink-0" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Color Palette */}
              <div className="mb-6">
                <label className="block text-xs font-medium text-[#533940] mb-2">
                  색상 선택: <span className="text-[#34141D] font-semibold">{selectedColor.name}</span>
                </label>
                <div className="flex items-center gap-2.5 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`w-9 h-9 sm:w-8 sm:h-8 rounded-full border-2 transition-all p-0.5 cursor-pointer ${
                        selectedColor.name === color.name ? 'border-[#4D1B28] scale-110 shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'
                      }`}
                    >
                      <span
                        className="block w-full h-full rounded-full border border-black/10"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Tabbed Specs: Story, Materials, Care */}
              <div className="pt-4 border-t border-[#F2ECE4]">
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-medium border-b border-[#EFE9DF] pb-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('details')}
                    className={`min-h-[36px] pb-1 cursor-pointer transition-colors ${
                      activeTab === 'details' ? 'border-b-2 border-[#372E27] text-[#201A16] font-semibold' : 'text-[#8E8172]'
                    }`}
                  >
                    작품 이야기
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('materials')}
                    className={`min-h-[36px] pb-1 cursor-pointer transition-colors ${
                      activeTab === 'materials' ? 'border-b-2 border-[#372E27] text-[#201A16] font-semibold' : 'text-[#8E8172]'
                    }`}
                  >
                    소재 &amp; 염색
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('care')}
                    className={`min-h-[36px] pb-1 cursor-pointer transition-colors ${
                      activeTab === 'care' ? 'border-b-2 border-[#372E27] text-[#201A16] font-semibold' : 'text-[#8E8172]'
                    }`}
                  >
                    세탁 및 보관
                  </button>
                </div>

                <div className="text-xs text-[#62564A] leading-relaxed">
                  {activeTab === 'details' && (
                    <p>{product.fullDesc}</p>
                  )}
                  {activeTab === 'materials' && (
                    <div className="space-y-1.5">
                      <p><strong className="text-[#342D26]">혼용률:</strong> {product.materials}</p>
                      <p><strong className="text-[#342D26]">염색 공법:</strong> {product.dyeingMethod}</p>
                    </div>
                  )}
                  {activeTab === 'care' && (
                    <ul className="list-disc pl-4 space-y-1">
                      {product.careInstructions.map((tip, idx) => (
                        <li key={idx}>{tip}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
