import React from 'react';
import { ARTISAN_STORIES } from '../data/products';

export const CraftStory: React.FC = () => {
  return (
    <section id="craft-story" className="relative py-12 sm:py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Top 2-Column Split: Sewing Hand Photo Left & Editorial Headline Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center">
          {/* Left Column: Workshop Image with half-thickness #FFD6D6 frame */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden p-1 sm:p-1.5 bg-[#FFD6D6] shadow-md group">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[3/4] bg-white">
                <img
                  src="/assets/aistudio/image_2581b86a.png"
                  alt="햇살 드는 작업실에서 린넨 원단을 재봉틀로 정성스레 마감하는 모습"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Main Craft Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <h2
              aria-label="느림을 견딘 패브릭만이 가장 다정한 결을 품습니다."
              className="text-[clamp(1.375rem,5.4vw,2.65rem)] font-serif-kr font-bold text-black tracking-tight mb-5 sm:mb-6 leading-[1.32] sm:leading-[1.28] break-keep"
            >
              <span className="block sm:whitespace-nowrap text-black font-extrabold">
                {'느림을 견딘 패브릭만이'.split('').map((char, i) => (
                  <span
                    key={`craft-line1-${i}`}
                    className="inline-block fabric-wave-char text-black font-extrabold"
                    style={{ animationDelay: `${i * 0.11}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
              <span className="block sm:whitespace-nowrap mt-1.5 sm:mt-2 text-black font-extrabold">
                {'가장 다정한 결을 품습니다.'.split('').map((char, i) => (
                  <span
                    key={`craft-line2-${i}`}
                    className="inline-block fabric-wave-char text-black font-extrabold"
                    style={{ animationDelay: `${(i + 4) * 0.11}s` }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h2>

            <p className="text-[clamp(0.875rem,3.3vw,1rem)] text-[#4E1B28] leading-[1.85] font-normal break-keep max-w-2xl">
              빠르게 대량 생산되는 공장제품들 사이에서, 봉봉은 원단선별부터 패키징까지
              <br className="hidden sm:inline" /> 느리지만 모든 과정에 사람손이 거치도록 홈 패브릭을 짓습니다
            </p>
          </div>
        </div>

        {/* Bottom 3-Column Horizontal Philosophy Grid (Without Numbers) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 mt-10 sm:mt-12 lg:mt-16">
          {ARTISAN_STORIES.map((story) => (
            <div
              key={story.step}
              className="flex flex-col p-5 sm:p-6 lg:p-7 rounded-2xl bg-white border border-[#FFD6D6] shadow-2xs hover:shadow-sm transition-shadow"
            >
              <h3 className="text-[clamp(1rem,3.6vw,1.125rem)] font-serif-kr font-semibold text-[#240C14] break-keep leading-snug">
                {story.title}
              </h3>
              <div className="text-xs sm:text-[13px] text-[#8C3A4D] font-semibold break-keep mt-1.5">
                {story.subtitle}
              </div>
              <div className="mt-4 pt-4 border-t border-[#FFD6D6]/70 text-xs sm:text-[13px] text-[#4E1B28] leading-[1.8] break-keep space-y-2">
                {story.description.split('\n').map((paragraph, pIdx) => (
                  <p key={pIdx}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
