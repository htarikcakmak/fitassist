import { useContext } from 'react';
import { Palette } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

export default function Settings() {
  const { themeBg, themePrimary, setTheme } = useContext(ThemeContext);

  const palettes = [
    { name: 'Krem / Yeşil (Klasik)', bg: '#d8c97f', primary: '#6a9433' },
    { name: 'Siyah / Kırmızı (Gece)', bg: '#1a1a1a', primary: '#e63946' },
    { name: 'Buz Mavisi / Lacivert', bg: '#e0fbfc', primary: '#293241' },
    { name: 'Şeftali / Koyu Mor', bg: '#ffdab9', primary: '#4a235a' }
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Ayarlar</h1>
        <p className="font-extrabold opacity-80">Uygulamanın görünümünü özelleştir.</p>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 space-y-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-white/60 p-2 rounded-xl"><Palette size={20} color={themePrimary} /></div>
          <h2 className="text-xl font-extrabold">Görünüm ve Tema</h2>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Hazır Paletler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {palettes.map((palette) => (
              <button
                key={palette.name}
                onClick={() => setTheme(palette.bg, palette.primary)}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-white/80 hover:bg-white transition-all active:scale-95 shadow-sm"
              >
                <span className="font-bold text-sm" style={{ color: palette.primary }}>{palette.name}</span>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 rounded-full shadow-sm border border-white" style={{ backgroundColor: palette.bg }}></div>
                  <div className="w-6 h-6 rounded-full shadow-sm border border-white" style={{ backgroundColor: palette.primary }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/30 space-y-4">
          <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Özel Renk Seç</h3>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center justify-between bg-white/60 p-3 rounded-2xl border border-white/80 flex-1 shadow-sm">
              <span className="font-bold pl-2">Arka Plan Rengi</span>
              <input 
                type="color" 
                value={themeBg} 
                onChange={(e) => setTheme(e.target.value, themePrimary)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none outline-none bg-transparent"
              />
            </div>
            
            <div className="flex items-center justify-between bg-white/60 p-3 rounded-2xl border border-white/80 flex-1 shadow-sm">
              <span className="font-bold pl-2">Vurgu Rengi (Yazılar)</span>
              <input 
                type="color" 
                value={themePrimary} 
                onChange={(e) => setTheme(themeBg, e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}