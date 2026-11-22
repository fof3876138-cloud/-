import React, { useState } from 'react';
import { CartItem, OrderData } from '../types';
import { X, CheckCircle, Package, Heart, Copy, ArrowLeft } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderComplete: (order: OrderData) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderComplete,
}) => {
  if (!isOpen) return null;

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [postalCode, setPostalCode] = useState('04052');
  const [address, setAddress] = useState('서울특별시 마포구 토정로 42');
  const [detailAddress, setDetailAddress] = useState('봉봉빌딩 201호');
  const [giftMessage, setGiftMessage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bank' | 'naver'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderData | null>(null);
  const [copied, setCopied] = useState(false);

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
  const shippingFee = subtotal >= 50000 ? 0 : 3500;
  const packagingFee = items.reduce((sum, item) => {
    return sum + (item.withBojagiWrap && item.product.category !== 'gift' ? 4000 * item.quantity : 0);
  }, 0);
  const total = subtotal + shippingFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert('주문자 성함, 연락처, 배송지 주소를 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder: OrderData = {
        orderNumber: `ONG-${Date.now().toString().slice(-6)}`,
        customerName,
        phone,
        address,
        detailAddress,
        giftMessage: giftMessage.trim() || undefined,
        items,
        subtotal,
        shippingFee,
        packagingFee,
        total,
        createdAt: new Date().toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      };
      setConfirmedOrder(newOrder);
      setIsSubmitting(false);
      onOrderComplete(newOrder);
    }, 600);
  };

  const handleCopyOrderNum = () => {
    if (confirmedOrder) {
      navigator.clipboard.writeText(confirmedOrder.orderNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#FFD6D6] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#FFD6D6] border-b border-[#FFD6D6] flex items-center justify-between">
          <h2 className="text-base font-serif-kr font-bold text-[#240C14]">
            {confirmedOrder ? '주문 완료 안내' : '봉봉 주문서 작성'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 text-[#240C14] hover:text-black rounded-full hover:bg-white/50 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {confirmedOrder ? (
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-[#F8D7E0] text-[#C2255C] rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-[#F1CCD5]">
              <CheckCircle className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-serif-kr font-bold text-[#34141D] mb-2">
                정성 담긴 주문이 접수되었습니다
              </h3>
              <p className="text-xs sm:text-sm text-[#6B3241] max-w-md mx-auto leading-relaxed">
                {confirmedOrder.customerName} 님을 위한 홈메이드 패브릭 제작 및 검수가 시작됩니다.
                작가가 한 땀 한 땀 정성껏 다듬어 곱게 보내드리겠습니다.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-5 bg-white rounded-xl border-2 border-[#F1CCD5] text-left text-xs space-y-3 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-[#F6D7DF]">
                <span className="text-[#9B5065] font-medium">주문 번호</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-[#34141D] font-mono tabular-nums">{confirmedOrder.orderNumber}</span>
                  <button
                    onClick={handleCopyOrderNum}
                    className="p-1 text-[#9B5065] hover:text-[#34141D] cursor-pointer"
                    title="주문번호 복사"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  {copied && <span className="text-[10px] text-[#2E6B44] font-semibold">복사됨</span>}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#8D6F77]">받는 분 / 연락처</span>
                <span className="font-medium text-[#291B1F]">{confirmedOrder.customerName} ({confirmedOrder.phone})</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[#8D6F77]">배송 주소</span>
                <span className="font-medium text-[#291B1F] text-right max-w-xs truncate">
                  {confirmedOrder.address} {confirmedOrder.detailAddress}
                </span>
              </div>

              {confirmedOrder.giftMessage && (
                <div className="pt-2 border-t border-[#F1CCD5]">
                  <span className="text-[#8D6F77] block mb-1">손글씨 엽서 메시지:</span>
                  <p className="italic text-[#5F464E] bg-white p-2.5 rounded border border-[#F1CCD5]">
                    "{confirmedOrder.giftMessage}"
                  </p>
                </div>
              )}

              <div className="pt-2 border-t border-[#F1CCD5] flex items-center justify-between font-bold text-sm text-[#34141D]">
                <span>총 결제 금액</span>
                <span className="tabular-nums font-serif-kr text-base">₩{confirmedOrder.total.toLocaleString('ko-KR')}</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3.5 px-6 bg-[#4D1B28] hover:bg-[#38111C] text-white text-xs sm:text-sm font-semibold rounded-lg transition-colors cursor-pointer"
            >
              확인 및 쇼핑 계속하기
            </button>
          </div>
        ) : (
          /* Form Entry Screen */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
            {/* Ordered Items summary list */}
            <div className="p-4 bg-[#FDF2F5] rounded-xl border border-[#F1CCD5] space-y-2">
              <div className="text-xs font-semibold text-[#9B5065] uppercase tracking-wider mb-2">
                주문 상품 내역 ({items.length}종)
              </div>
              {items.map((i) => (
                <div key={i.cartItemId} className="flex items-center justify-between gap-2 text-xs text-[#5D444B]">
                  <span className="truncate flex-1 min-w-0">
                    {i.product.name} ({i.selectedColor.name}) × {i.quantity}
                  </span>
                  <span className="tabular-nums font-medium text-[#291B1F] shrink-0">
                    ₩{calculateItemPrice(i).toLocaleString('ko-KR')}
                  </span>
                </div>
              ))}
            </div>

            {/* Recipient Information */}
            <div className="space-y-4">
              <div className="text-xs font-semibold text-[#9B5065] uppercase tracking-wider">
                01. 받는 분 정보
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-[#533B42] mb-1">받는 사람 성함 *</label>
                  <input
                    type="text"
                    required
                    placeholder="홍길동"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full min-h-[42px] px-3 py-2 text-sm sm:text-xs bg-white border border-[#F1CCD5] rounded-lg focus:outline-none focus:border-[#4D1B28]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#533B42] mb-1">연락처 *</label>
                  <input
                    type="tel"
                    required
                    placeholder="010-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full min-h-[42px] px-3 py-2 text-sm sm:text-xs bg-white border border-[#F1CCD5] rounded-lg focus:outline-none focus:border-[#4D1B28]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#533B42] mb-1">배송 주소 *</label>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="우편번호"
                    className="w-28 min-h-[42px] px-3 py-2 text-sm sm:text-xs bg-[#FDF0F4] border border-[#F1CCD5] rounded-lg focus:outline-none"
                  />
                  <span className="text-[11px] text-[#8C6F77] self-center">기본 배송지로 자동 입력되었습니다</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="기본 주소"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full min-h-[42px] px-3 py-2 text-sm sm:text-xs bg-white border border-[#F1CCD5] rounded-lg focus:outline-none focus:border-[#4D1B28] mb-2"
                />
                <input
                  type="text"
                  placeholder="상세 주소 (동/호수)"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  className="w-full min-h-[42px] px-3 py-2 text-sm sm:text-xs bg-white border border-[#F1CCD5] rounded-lg focus:outline-none focus:border-[#4D1B28]"
                />
              </div>
            </div>

            {/* Gift Message Card */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <label className="text-xs font-semibold text-[#9B5065] uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#C85D73]" />
                  <span>02. 수제 닥종이 손글씨 엽서 메시지 (선택)</span>
                </label>
                <span className="text-[10px] text-[#A68890]">무료 동봉 서비스</span>
              </div>
              <textarea
                rows={2}
                maxLength={100}
                placeholder="선물과 함께 전하실 따뜻한 한마디를 적어주시면, 작가가 정성껏 펜글씨로 적어 함께 담아드립니다."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="w-full px-3 py-2 text-sm sm:text-xs bg-white border border-[#F1CCD5] rounded-lg focus:outline-none focus:border-[#4D1B28]"
              />
            </div>

            {/* Payment Method */}
            <div>
              <div className="text-xs font-semibold text-[#9B5065] uppercase tracking-wider mb-2">
                03. 결제 수단 선택
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`min-h-[44px] py-2.5 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-[#4D1B28] bg-[#FDF0F4] text-[#34141D] font-semibold'
                      : 'border-[#F1CCD5] text-[#6B3241] hover:border-[#E2A6B7]'
                  }`}
                >
                  신용/체크카드
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bank')}
                  className={`min-h-[44px] py-2.5 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    paymentMethod === 'bank'
                      ? 'border-[#4D1B28] bg-[#FDF0F4] text-[#34141D] font-semibold'
                      : 'border-[#F1CCD5] text-[#6B3241] hover:border-[#E2A6B7]'
                  }`}
                >
                  무통장 입금
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('naver')}
                  className={`min-h-[44px] py-2.5 px-3 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                    paymentMethod === 'naver'
                      ? 'border-[#4D1B28] bg-[#FDF0F4] text-[#34141D] font-semibold'
                      : 'border-[#F1CCD5] text-[#6B3241] hover:border-[#E2A6B7]'
                  }`}
                >
                  네이버페이
                </button>
              </div>

              {paymentMethod === 'bank' && (
                <div className="mt-3 p-3 bg-[#FDF2F5] rounded-lg border border-[#F1CCD5] text-xs text-[#634C53]">
                  <div>공방 계좌: <strong className="text-[#34141D]">카카오뱅크 3333-08-9821415 봉봉(홍예린)</strong></div>
                  <div className="text-[11px] text-[#9B5065] mt-0.5">주문 후 24시간 내 입금 시 작업이 개시됩니다.</div>
                </div>
              )}
            </div>

            {/* Totals & Submit Button */}
            <div className="pt-4 border-t border-[#F1CCD5] space-y-3">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-[#34141D]">최종 결제 금액</span>
                <span className="text-2xl font-bold text-[#34141D] tabular-nums font-serif-kr">
                  ₩{total.toLocaleString('ko-KR')}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-[#4D1B28] hover:bg-[#38111C] disabled:bg-[#B39DA3] text-white text-sm font-semibold rounded-lg transition-all shadow-sm cursor-pointer"
              >
                {isSubmitting ? '주문서 접수 중...' : `₩${total.toLocaleString('ko-KR')} 결제 및 주문 완료`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
