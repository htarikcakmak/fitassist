import { Check } from 'lucide-react';

// Uygulamana en uygun premium renkleri buradan ayarlayabilirsin
export const PREMIUM_COLORS = [
  '#6a9433', // FitAssist Yeşil (Ana Tema)
  '#10b981', // Zümrüt Yeşili
  '#3b82f6', // Okyanus Mavisi
  '#8b5cf6', // Ametist Moru
  '#f43f5e', // Mercan Kırmızısı
  '#f97316', // Gün Batımı Turuncusu
  '#14b8a6', // Turkuaz
  '#0f172a'  // Gece Siyahı
];

interface PremiumColorPickerProps {
  title: string;
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export function PremiumColorPicker({ title, selectedColor, onColorSelect }: PremiumColorPickerProps) {
  return (
    <div className="w-full bg-white/40 backdrop-blur-xl p-5 md:p-6 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all">
      <h3 className="text-sm font-extrabold opacity-60 uppercase tracking-wider mb-4">
        {title}
      </h3>
      
      <div className="flex flex-wrap gap-3 md:gap-4">
        {PREMIUM_COLORS.map((color) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            aria-label={`${color} rengini seç`}
            className={`relative w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm
              ${selectedColor === color 
                ? 'scale-110 ring-4 ring-white/90 ring-offset-2' 
                : 'hover:scale-105 active:scale-95'
              }
            `}
            style={{ backgroundColor: color }}
          >
            {selectedColor === color && (
              <Check 
                size={22} 
                color="#ffffff" 
                strokeWidth={3} 
                className="animate-in zoom-in duration-200 drop-shadow-md" 
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}