import { useState, useContext, useEffect } from 'react';
import { Palette, Check, Save } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { ToastContext } from '../context/ToastContext';
import { useTranslation } from 'react-i18next';
import { fetchWithAuth } from '../utils/api';

export default function Settings() {
  const { themeBg, themePrimary, setTheme } = useContext(ThemeContext);
  const { showToast } = useContext(ToastContext);
  const { t, i18n } = useTranslation();

  const [userId, setUserId] = useState<number | null>(null);
  
  // Ekranda anlık değişecek ama henüz kaydedilmemiş (Taslak) tema ayarları
  const [selectedBg, setSelectedBg] = useState(themeBg);
  const [selectedPrimary, setSelectedPrimary] = useState(themePrimary);

  // Sayfa yüklendiğinde kullanıcının ID'sini hafızadan alıyoruz
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

  // Kullanıcı herhangi bir temaya veya özel renge tıkladığında ekranı anında güncelleyen fonksiyon
  const handlePreviewTheme = (bg: string, primary: string) => {
    setSelectedBg(bg);
    setSelectedPrimary(primary);
    setTheme(bg, primary); 
  };

  // Ayarları veritabanına ve yerel hafızaya kalıcı olarak kaydeden fonksiyon
  const saveSettingsToDatabase = async () => {
    if (!userId) {
      showToast("Oturum bilgisi bulunamadı. Lütfen tekrar giriş yapın.", "error");
      return;
    }

    // Dil bilgisini doğrudan üst menünün kontrol ettiği ana sistemden (i18n) çekiyoruz
    const payload = {
      language: i18n.language,
      themeBg: selectedBg,
      themePrimary: selectedPrimary
    };

    try {
      const res = await fetchWithAuth(`http://localhost:8080/api/users/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const updatedUserFromDb = await res.json();
        
        // Başarılı olduğunda, yerel hafızadaki (Storage) kullanıcı bilgilerini de güncelliyoruz
        const storage = localStorage.getItem('fitassist_user') ? localStorage : sessionStorage;
        const currentUserData = JSON.parse(storage.getItem('fitassist_user') || '{}');
        
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
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-2xl mx-auto animate-in fade-in duration-500">
      
      {/* BAŞLIK */}
      <div className="text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">{t('settingsTitle', 'Genel Ayarlar')}</h1>
        <p className="font-extrabold opacity-80">{t('settingsDesc', 'Uygulamanın görünümünü özelleştir.')}</p>
      </div>

      {/* TEMA SEÇİM PANELİ */}
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
                  {/* Renk Önizleme Topları */}
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
          
          {/* ÖZEL RENK SEÇİMİ */}
          <div className="pt-6 mt-4 border-t border-white/40">
            <p className="text-sm font-extrabold opacity-70 mb-4">{t('customColors', 'Özel Renk Belirle')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Arka Plan Rengi Seçici (Tüm Kutu Tıklanabilir) */}
              <div className="relative flex-1 bg-white/30 p-4 rounded-xl border border-white/50 flex items-center justify-between transition-all hover:bg-white/50 cursor-pointer active:scale-95 overflow-hidden group">
                <span className="font-bold text-sm pointer-events-none">Arka Plan Rengi</span>
                
                {/* Sadece Rengi Gösteren Görsel Yuvarlak */}
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm pointer-events-none group-hover:scale-105 transition-transform" 
                  style={{ backgroundColor: selectedBg }}
                ></div>
                
                {/* Görünmez ama Tıklanabilir Gerçek Renk Seçici */}
                <input
                  type="color"
                  value={selectedBg}
                  onChange={(e) => handlePreviewTheme(e.target.value, selectedPrimary)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              {/* Vurgu Rengi Seçici (Tüm Kutu Tıklanabilir) */}
              <div className="relative flex-1 bg-white/30 p-4 rounded-xl border border-white/50 flex items-center justify-between transition-all hover:bg-white/50 cursor-pointer active:scale-95 overflow-hidden group">
                <span className="font-bold text-sm pointer-events-none">Vurgu Rengi</span>
                
                {/* Sadece Rengi Gösteren Görsel Yuvarlak */}
                <div 
                  className="w-10 h-10 rounded-full border-2 border-white shadow-sm pointer-events-none group-hover:scale-105 transition-transform" 
                  style={{ backgroundColor: selectedPrimary }}
                ></div>
                
                {/* Görünmez ama Tıklanabilir Gerçek Renk Seçici */}
                <input
                  type="color"
                  value={selectedPrimary}
                  onChange={(e) => handlePreviewTheme(selectedBg, e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

            </div>
          </div>
          
        </div>
      </div>

      {/* KALICI KAYDETME BUTONU */}
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