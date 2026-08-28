import { useState, useContext, useEffect } from 'react';
import { Palette, Check, Save } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { ToastContext } from '../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { fetchWithAuth } from '../utils/api';
import { Loader } from '../components/Loader';

const PREMIUM_BG_COLORS = [
  '#d8c97f', '#1a1a1a', '#e0fbfc', '#ffdab9', 
  '#f3f4f6', '#0f172a', '#fdfbf7', '#2d3748'
];

const PREMIUM_PRIMARY_COLORS = [
  '#6a9433', '#e63946', '#1d3557', '#4a0e4e', 
  '#8b5cf6', '#3b82f6', '#f97316', '#10b981'
];

const isDarkColor = (color: string) => 
  ['#1a1a1a', '#0f172a', '#2d3748', '#e63946', '#1d3557', '#4a0e4e', '#8b5cf6', '#3b82f6', '#6a9433', '#10b981', '#f97316'].includes(color);

export default function Settings() {
  const { themeBg, themePrimary, setTheme } = useContext(ThemeContext);
  const { showToast } = useContext(ToastContext);
  const { t, i18n } = useTranslation();

  const [userId, setUserId] = useState<number | null>(null);
  
  const [selectedBg, setSelectedBg] = useState(themeBg);
  const [selectedPrimary, setSelectedPrimary] = useState(themePrimary);

  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('fitassist_user') || sessionStorage.getItem('fitassist_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      setSelectedBg(user.themeBg || '#d8c97f');
      setSelectedPrimary(user.themePrimary || '#6a9433');
    }
  }, []);

  const palettes = [
    { id: 'classic', bg: '#d8c97f', primary: '#6a9433', label: t('paletteClassic', 'Krem / Yeşil (Klasik)') },
    { id: 'night', bg: '#1a1a1a', primary: '#e63946', label: t('paletteNight', 'Siyah / Kırmızı (Gece)') },
    { id: 'ice', bg: '#e0fbfc', primary: '#1d3557', label: t('paletteIce', 'Buz Mavisi / Lacivert') },
    { id: 'peach', bg: '#ffdab9', primary: '#4a0e4e', label: t('palettePeach', 'Şeftali / Koyu Mor') },
  ];

  const handlePreviewTheme = (bg: string, primary: string) => {
    setSelectedBg(bg);
    setSelectedPrimary(primary);
    setTheme(bg, primary); 
  };

  const saveSettingsToDatabase = async () => {
    if (!userId) {
      showToast("Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.", "error");
      return;
    }

    setIsLoading(true);
    setLoadingMessage(t('saving', { defaultValue: 'Kaydediliyor...' }));

    const wakeUpTimeout = setTimeout(() => {
      setLoadingMessage(t('serverWakingUp', { defaultValue: 'Sunucu uykudan uyanıyor, bu işlem 30-40 saniye sürebilir. Lütfen bekleyin...' }));
    }, 3000);

    const storage = localStorage.getItem('fitassist_user') ? localStorage : sessionStorage;
    const currentUserData = JSON.parse(storage.getItem('fitassist_user') || '{}');

    const payload = {
      ...currentUserData,
      language: i18n.language,
      themeBg: selectedBg,
      themePrimary: selectedPrimary
    };

    try {
      // DÜZELTİLDİ: Adres canlı sunucuya (Render) çevrildi. Artık APK olarak çalışmaya hazır!
      const res = await fetchWithAuth(`https://fitassist-backend.onrender.com/api/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updatedUserFromDb = await res.json();
        
        const newStorageData = {
          ...currentUserData,
          language: updatedUserFromDb.language,
          themeBg: updatedUserFromDb.themeBg,
          themePrimary: updatedUserFromDb.themePrimary
        };
        
        storage.setItem('fitassist_user', JSON.stringify(newStorageData));
        showToast(t('successSaved', 'Başarıyla kaydedildi!'), 'success');
      } else {
        showToast(t('dbSaveError', 'Kaydedilemedi! Lütfen tekrar deneyin.'), 'error');
      }
    } catch (err) {
      console.error("Ayar kaydetme hatası:", err);
      showToast(t('serverError', 'Sunucu hatası!'), 'error');
    } finally {
      clearTimeout(wakeUpTimeout);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader message={loadingMessage} />;
  }

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-2xl mx-auto animate-in fade-in duration-500">
      
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">{t('settingsTitle', 'Genel Ayarlar')}</h1>
        <p className="font-extrabold opacity-80">{t('settingsDesc', 'Uygulamanın görünümünü özelleştir.')}</p>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
        <div className="flex items-center gap-3 mb-6">
          <Palette size={24} strokeWidth={2.5} style={{ color: themePrimary }} />
          <h2 className="text-xl font-extrabold">{t('appearanceAndTheme', 'Görünüm ve Tema')}</h2>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-extrabold opacity-70">{t('presetPalettes', 'Hazır Paletler')}</p>
          <div className="space-y-3">
            {palettes.map((palette) => (
              <button
                key={palette.id}
                onClick={() => handlePreviewTheme(palette.bg, palette.primary)}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all border ${
                  selectedBg === palette.bg && selectedPrimary === palette.primary
                    ? 'bg-white shadow-sm border-white/80 scale-[1.02]'
                    : 'bg-white/40 border-transparent opacity-70 hover:opacity-100 hover:bg-white/60'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: palette.bg }}></div>
                    <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: palette.primary }}></div>
                  </div>
                  <span className="font-extrabold text-sm md:text-base" style={{ color: selectedBg === palette.bg && selectedPrimary === palette.primary ? themePrimary : 'inherit' }}>
                    {palette.label}
                  </span>
                </div>
                {selectedBg === palette.bg && selectedPrimary === palette.primary && <Check size={20} strokeWidth={3} style={{ color: themePrimary }} />}
              </button>
            ))}
          </div>
          
          <div className="pt-6 mt-4 border-t border-white/40">
            <p className="text-sm font-extrabold opacity-70 mb-4">{t('customColors', 'Özel Renk Belirle')}</p>
            
            <div className="space-y-6">
              
              <div className="bg-white/30 p-4 rounded-xl border border-white/50">
                <span className="font-bold text-sm mb-3 block opacity-80">Arka Plan Rengi</span>
                <div className="flex flex-wrap gap-3">
                  {PREMIUM_BG_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => handlePreviewTheme(color, selectedPrimary)}
                      className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border-2
                        ${selectedBg === color 
                          ? 'border-white scale-110 ring-2 ring-white/60' 
                          : 'border-white/20 hover:scale-105 active:scale-95'
                        }
                      `}
                      style={{ backgroundColor: color }}
                    >
                      {selectedBg === color && (
                        <Check size={20} color={isDarkColor(color) ? '#ffffff' : '#1f2937'} strokeWidth={3} className="animate-in zoom-in duration-200" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-white/30 p-4 rounded-xl border border-white/50">
                <span className="font-bold text-sm mb-3 block opacity-80">Vurgu Rengi</span>
                <div className="flex flex-wrap gap-3">
                  {PREMIUM_PRIMARY_COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => handlePreviewTheme(selectedBg, color)}
                      className={`relative w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-sm border-2
                        ${selectedPrimary === color 
                          ? 'border-white scale-110 ring-2 ring-white/60' 
                          : 'border-white/20 hover:scale-105 active:scale-95'
                        }
                      `}
                      style={{ backgroundColor: color }}
                    >
                      {selectedPrimary === color && (
                        <Check size={20} color={isDarkColor(color) ? '#ffffff' : '#1f2937'} strokeWidth={3} className="animate-in zoom-in duration-200" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
          
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button 
          onClick={saveSettingsToDatabase}
          className="w-full md:w-auto py-4 px-10 rounded-2xl bg-white hover:bg-white/90 border border-white/80 font-black text-lg active:scale-95 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center gap-2"
          style={{ color: themePrimary }}
        >
          <Save size={20} strokeWidth={2.5} /> {t('saveBtn', 'Kaydet')}
        </button>
      </div>

    </div>
  );
}