import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', contact: '', message: '' });
    }, 4500);
  };

  return (
    <section id="contact-section" className="py-14 sm:py-20 lg:py-28 bg-white border-t border-[#FFD6D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="max-w-2xl mx-auto text-center mb-10 sm:mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#7A283C] font-semibold mb-2">
            Inquiry &amp; Showroom
          </div>
          <h2 className="text-[clamp(1.5rem,5.5vw,2.25rem)] font-serif-kr font-bold text-[#240C14] tracking-tight mb-3 break-keep">
            봉봉 아틀리에 문의 &amp; 상담
          </h2>
          <p className="text-[clamp(0.8125rem,3.2vw,0.875rem)] text-[#5A2332] leading-relaxed break-keep">
            <span className="block font-semibold text-[#240C14] mb-1">
              마음을 전하는 가장 정갈한 방식, 봉봉 기프트
            </span>
            기업 및 단체의 브랜드 로고 각인과 세심하게 묶어낸 선물포장으로
            <br className="hidden sm:inline" /> 주는 이의 안목과 받는 이의 감동이 오래 머무는 선물을 선보입니다
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-start">
          {/* Left Column: Atelier Info & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-5 sm:p-7 rounded-2xl border border-[#FFD6D6] shadow-xs space-y-5">
              <h3 className="font-serif-kr text-lg font-bold text-[#240C14] pb-3 border-b border-[#FFD6D6]">
                아틀리에 안내
              </h3>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                <div className="p-2 rounded-lg bg-[#FFD6D6] text-[#240C14] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#240C14]">쇼룸 &amp; 작업실</div>
                  <div className="text-[#5A2332] mt-0.5 leading-relaxed break-keep">
                    대구광역시 북구 학남로10 봉봉
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                <div className="p-2 rounded-lg bg-[#FFD6D6] text-[#240C14] shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#240C14]">운영 시간</div>
                  <div className="text-[#5A2332] mt-0.5 leading-relaxed break-keep">
                    월요일 – 금요일 09:00 ~ 19:00 (주말,공휴일 휴무)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                <div className="p-2 rounded-lg bg-[#FFD6D6] text-[#240C14] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#240C14]">대표 번호 (연중무휴 24시간)</div>
                  <a href="tel:01085584337" className="text-[#5A2332] hover:text-[#240C14] transition-colors mt-0.5 inline-flex items-center min-h-[36px] font-medium">
                    010 8558 4337
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3.5 text-xs sm:text-sm">
                <div className="p-2 rounded-lg bg-[#FFD6D6] text-[#240C14] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-semibold text-[#240C14]">이메일 문의</div>
                  <a href="mailto:arcna12@naver.com" className="text-[#5A2332] hover:text-[#240C14] transition-colors mt-0.5 inline-flex items-center min-h-[36px] font-medium">
                    arcna12@naver.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-5 sm:p-9 rounded-2xl border border-[#FFD6D6] shadow-sm">
              <h3 className="font-serif-kr text-lg sm:text-xl font-bold text-[#240C14] mb-5">
                온라인 문의 접수
              </h3>

              {isSubmitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-kr text-lg font-bold text-[#240C14]">
                    문의가 정갈하게 접수되었습니다
                  </h4>
                  <p className="text-xs text-[#5A2332] max-w-sm mx-auto leading-relaxed">
                    작가가 내용 확인 후 영업일 기준 24시간 이내에 남겨주신 연락처로 정성껏 회신드리겠습니다.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#240C14] mb-1.5">
                        성함 또는 기업/단체명 <span className="text-[#C23354]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="예: 김민지 / (주)아틀리에"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm sm:text-xs bg-white border border-[#FFD6D6] rounded-lg focus:outline-none focus:border-[#240C14] focus:ring-1 focus:ring-[#240C14]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#240C14] mb-1.5">
                        연락처 (휴대폰 또는 이메일) <span className="text-[#C23354]">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="010-0000-0000 / email@domain.com"
                        value={formData.contact}
                        onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                        className="w-full min-h-[44px] px-3.5 py-2.5 text-sm sm:text-xs bg-white border border-[#FFD6D6] rounded-lg focus:outline-none focus:border-[#240C14] focus:ring-1 focus:ring-[#240C14]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#240C14] mb-1.5">
                      문의 내용
                    </label>
                    <textarea
                      rows={5}
                      placeholder={
                        '기업, 관공서, 동호회, 선물세트 등 단체주문 건 페이지 입니다.\n\n제품구성, 수량, 납기일 등 간단한 정보와 함께 문의 남겨주시면\n영업일기준 1일 이내 담당 디자이너가 직접 연락드립니다.'
                      }
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm sm:text-xs bg-white border border-[#FFD6D6] rounded-lg focus:outline-none focus:border-[#240C14] focus:ring-1 focus:ring-[#240C14] leading-relaxed resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] py-3 bg-[#FFD6D6] hover:bg-[#FFC2C2] border border-[#F2B8B8] text-[#240C14] text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>문의 접수하기</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
