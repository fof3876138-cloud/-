import React from 'react';
import { Product } from '../types';
import { Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
}) => {
  const categoryLabels: Record<string, string> = {
    scarf: '스카프 · 머플러',
    blanket: '담요·블랭킷',
    apron: '앞치마·키친크로스',
    'eco-handkerchief': '친환경손수건',
    gift: '선물세트·단체주문',
    handkerchief: '친환경손수건',
  };

  return (
    <div className="group h-full flex flex-col p-1 sm:p-1.5 bg-[#FFD6D6] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col flex-1 bg-white rounded-xl overflow-hidden">
        {/* Product Thumbnail Stage */}
        <div 
          className="relative aspect-square bg-[#FFF8FA] overflow-hidden cursor-pointer border-b border-[#FFD6D6]/60"
          onClick={() => onSelect(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Optional single subtle tag */}
          {product.tag && (
            <div className="absolute top-2.5 left-2.5 bg-[#240C14]/90 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded">
              {product.tag}
            </div>
          )}

          {/* Action Overlay */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center p-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
              className="px-4 py-2 bg-white/95 hover:bg-white text-[#240C14] text-xs font-medium rounded-md shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>상세보기</span>
            </button>
          </div>
        </div>

        {/* Product Information (사용자 요청: 글자가 있는 배경부분은 흰색으로 자연스럽게 마감) */}
        <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-white">
          <div className="mb-3.5">
            {/* Category */}
            <div className="flex items-center gap-2 text-xs text-[#8C4658] mb-1.5">
              <span className="font-normal">{categoryLabels[product.category]}</span>
            </div>

            {/* Title (2줄까지 온전히 표시) */}
            <h3 
              onClick={() => onSelect(product)}
              className="text-[14px] sm:text-[15px] font-serif-kr font-medium text-[#240C14] hover:text-[#80243B] transition-colors cursor-pointer line-clamp-2 leading-snug mb-1.5"
            >
              {product.name}
            </h3>

            {/* Short description */}
            {product.shortDesc && (
              <p className="text-xs text-[#5A2332] line-clamp-2 leading-relaxed font-normal">
                {product.shortDesc}
              </p>
            )}
          </div>

          {/* Card Footer: Materials & Price (가늘고 정갈한 서체 및 마감) */}
          <div className="pt-3 border-t border-[#FFD6D6] flex items-center justify-between gap-2">
            <div className="text-[11px] text-[#8C4658] truncate flex-1 min-w-0 font-normal" title={product.materials}>
              {product.materials.split(',')[0]}
            </div>

            <div className="text-right shrink-0 whitespace-nowrap">
              {product.originalPrice && (
                <span className="text-xs text-[#8C4658] line-through mr-1.5 tabular-nums font-normal">
                  ₩{product.originalPrice.toLocaleString('ko-KR')}
                </span>
              )}
              <span className="text-sm font-medium text-[#240C14] tabular-nums">
                ₩{product.price.toLocaleString('ko-KR')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
