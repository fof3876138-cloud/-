import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#2B1B20] text-[#E0CFD4] py-12 sm:py-16 border-t border-[#3F2B32]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 sm:gap-10 pb-10 sm:pb-12 border-b border-[#432E35]">
          {/* Brand & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-2xl font-serif-kr font-bold text-[#FDF2F4] tracking-tight">
              봉봉
            </h3>
            <p className="text-xs sm:text-sm text-[#BBA5AC] leading-relaxed max-w-sm break-keep">
              손으로 엮은 온기, 자연을 닮은 홈메이드 패브릭.
              천연 염색 스카프, 오가닉 코튼 손수건, 메리노울 담요를 통해
              사계절의 일상에 작은 쉼을 전합니다.
            </p>
            <div className="text-xs text-[#9B8289]">
              Slow Handmade Textile Studio · Daegu, Korea
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D1B1B9] font-semibold">
              Category
            </h4>
            <ul className="text-xs space-y-2 text-[#AA9198]">
              <li>스카프 &amp; 천연염색 머플러</li>
              <li>유기농 코튼 3중직 자수 손수건</li>
              <li>와플 메리노울 &amp; 린넨 누비담요</li>
              <li>보자기 선물 패키지</li>
              <li>단체 및 기업 맞춤 답례품 제작</li>
            </ul>
          </div>

          {/* Studio Contact */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D1B1B9] font-semibold">
              Atelier Info
            </h4>
            <div className="text-xs text-[#AA9198] space-y-1.5 leading-relaxed break-keep">
              <p><strong className="text-[#E8D4D9]">쇼룸 &amp; 작업실:</strong> 대구광역시 북구 학남로10 봉봉</p>
              <p><strong className="text-[#E8D4D9]">운영시간:</strong> 월~금 09:00 - 19:00 (주말, 공휴일 휴무)</p>
              <p><strong className="text-[#E8D4D9]">대표 번호:</strong> 010 8558 4337 (연중무휴 24시간)</p>
              <p><strong className="text-[#E8D4D9]">이메일 문의:</strong> <a href="mailto:arcna12@naver.com" className="hover:text-[#FDF2F4] transition-colors">arcna12@naver.com</a></p>
            </div>
          </div>
        </div>

        {/* Bottom copyright (Quiet, no ornamental engines) */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#8F747B] gap-4 text-center sm:text-left">
          <p>© 2026 봉봉 (BONBON). All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <a href="#" className="hover:text-[#FDF2F4] transition-colors py-1.5 inline-block">이용약관</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-[#FDF2F4] transition-colors py-1.5 inline-block">개인정보처리방침</a>
            <span aria-hidden="true">·</span>
            <a href="#" className="hover:text-[#FDF2F4] transition-colors py-1.5 inline-block">핸드메이드 케어 안내</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
