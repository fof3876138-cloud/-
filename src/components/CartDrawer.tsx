import React from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  // Extract extra dimension price
  const extractExtraPrice = (dimText: string): number => {
    const match = dimText.match(/\+(\d{1,3}(,\d{3})*)원/);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
  };

  const calculateItemPrice = (item: CartItem): number => {
    const extraDim = extractExtraPrice(item.selectedDimension);
    const bojagi = item.withBojagiWrap && item.product.category !== 'gift' ? 4000 : 0;
    const embroidery = item.customEmbroideryText ? 3000 : 0;
    return (item.product.price + extraDim + bojagi + embroidery) * item.quantity;
  };

  const subtotal = items.reduce((sum, item) => sum + calculateItemPrice(item), 0);
  const freeShippingThreshold = 50000;
  const isFreeShipping = subtotal >= freeShippingThreshold || items.length === 0;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 3500;
  const total = subtotal + shippingFee;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l-2 border-[#FFD6D6]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#FFD6D6] flex items-center justify-between bg-[#FFD6D6]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#240C14]" />
            <h2 className="text-base font-serif-kr font-bold text-[#240C14]">
              장바구니 ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="장바구니 닫기"
            className="p-1.5 text-[#240C14] hover:text-black rounded-full hover:bg-white/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        {items.length > 0 && (
          <div className="px-6 py-3 bg-white border-b border-[#FFD6D6] text-xs text-[#5A2332]">
            {isFreeShipping ? (
              <span className="font-semibold text-[#2E6B44]">
                ✓ 50,000원 이상 구매로 무료배송 혜택이 적용되었습니다.
              </span>
            ) : (
              <span>
                <strong className="text-[#240C14] tabular-nums font-semibold">
                  ₩{remainingForFreeShipping.toLocaleString('ko-KR')}
                </strong>
                원 더 담으시면 무료배송입니다!
              </span>
            )}
            <div className="w-full h-1.5 bg-[#FFD6D6] rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-[#240C14] rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#8C4658] py-16">
              <ShoppingBag className="w-12 h-12 text-[#FFD6D6] mb-3 stroke-1" />
              <p className="text-sm font-semibold text-[#240C14] mb-1">장바구니가 비어 있습니다.</p>
              <p className="text-xs text-[#5A2332]">정성 가득한 봉봉의 패브릭 작품을 담아보세요.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.cartItemId}
                className="flex gap-4 p-4 rounded-xl border border-[#FFD6D6] bg-white shadow-2xs"
              >
                <div className="w-20 h-20 p-1 bg-[#FFD6D6] rounded-lg shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded object-cover bg-white"
                  />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-xs font-serif-kr font-semibold text-[#291B1F] line-clamp-1">
                        {item.product.name}
                      </h3>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-[#A48890] hover:text-[#C8405C] p-1 cursor-pointer transition-colors"
                        title="삭제"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] text-[#785E65] space-y-0.5 mt-1">
                      <div>규격: {item.selectedDimension.split('(')[0]}</div>
                      <div className="flex items-center gap-1.5">
                        <span>색상:</span>
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/15 inline-block"
                          style={{ backgroundColor: item.selectedColor.hex }}
                        />
                        <span>{item.selectedColor.name}</span>
                      </div>
                      {item.customEmbroideryText && (
                        <div className="text-[#B84E65] font-medium">
                          이니셜 각인: "{item.customEmbroideryText}" (+3,000원)
                        </div>
                      )}
                      {item.withBojagiWrap && item.product.category !== 'gift' && (
                        <div className="text-[#3E654C]">전통 보자기 포장 포함 (+4,000원)</div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#F2E0E5]">
                    <div className="flex items-center border border-[#E0C7CE] rounded-md overflow-hidden bg-white">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-[#5D4249] hover:bg-[#FDF4F6] cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-7 text-center text-xs tabular-nums font-semibold text-[#291B1F]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-[#5D4249] hover:bg-[#FDF4F6] cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#2B1B20] tabular-nums font-serif-kr">
                      ₩{calculateItemPrice(item).toLocaleString('ko-KR')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="p-6 bg-[#FBE6EB] border-t border-[#F1CCD5] space-y-3">
            <div className="space-y-1.5 text-xs text-[#6B3241]">
              <div className="flex justify-between">
                <span>작품 금액</span>
                <span className="tabular-nums font-medium text-[#34141D]">₩{subtotal.toLocaleString('ko-KR')}</span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span className="tabular-nums font-medium text-[#34141D]">
                  {shippingFee === 0 ? '무료' : `₩${shippingFee.toLocaleString('ko-KR')}`}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#F1CCD5] flex items-baseline justify-between">
              <span className="text-sm font-semibold text-[#34141D]">총 주문 금액</span>
              <span className="text-xl font-bold text-[#34141D] tabular-nums font-serif-kr">
                ₩{total.toLocaleString('ko-KR')}
              </span>
            </div>

            <button
              onClick={onProceedToCheckout}
              className="w-full py-3.5 px-4 bg-[#4D1B28] hover:bg-[#38111C] text-white text-xs sm:text-sm font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <span>주문서 작성 & 결제하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
