import { useState, useContext, useEffect } from 'react';
import { Globe, Palette, Check, Save } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { ToastContext } from '../context/ToastContext';
import { useTranslation } from 'react-i18next';
// Güvenli veri gönderimi için yazdığımız aracımızı içe aktarıyoruz
import { fetchWithAuth } from '../utils/api';

export default function Settings() {
  const { themeBg, themePrimary, setTheme } = useContext(ThemeContext);
  const { showToast } = useContext(ToastContext);
  const { t, i18n } = useTranslation();

  const [userId, setUserId] = useState<number | null>(null);
  
  // Ekranda anlık değişecek ama henüz kaydedilmemiş (Taslak) ayarlar
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'tr');
  const [selectedBg, setSelectedBg] = useState(themeBg);
  const [selectedPrimary, setSelectedPrimary] = useState(themePrimary);

  // Sayfa yüklendiğinde kullanıcının ID'sini hafızadan alıyoruz
  useEffect(() => {
    const storedUser = localStorage.getItem('fitassist_user') || sessionStorage.getItem('fitassist_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      setSelectedLang(user.language || 'tr');
      setSelectedBg(user.themeBg || '#d8c97f');
      setSelectedPrimary(user.themePrimary || '#6a9433');
    }
  }, []);

  const languages = [
    { code: 'tr', label: 'Türkçe' },
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'it', label: 'Italiano' },
    { code: 'de', label: 'Deutsch' },
  ];

  const palettes = [
    { id: 'classic', bg: '#d8c97f', primary: '#6a9433', label: t('paletteClassic', 'Krem / Yeşil (Klasik)') },
    { id: 'night', bg: '#1a1a1a', primary: '#e63946', label: t('paletteNight', 'Siyah / Kırmızı (Gece)') },
    { id: 'ice', bg: '#e0fbfc', primary: '#1d3557', label: t('paletteIce', 'Buz Mavisi / Lacivert') },
    { id: 'peach', bg: '#ffdab9', primary: '#4a0e4e', label: t('palettePeach', 'Şeftali / Koyu Mor') },
  ];

  // Kullanıcı herhangi bir ayara tıkladığında ekranı anında güncelleyen fonksiyon
  const handlePreviewTheme = (bg: string, primary: string) => {
    setSelectedBg(bg);
    setSelectedPrimary(primary);
    setTheme(bg, primary); // Context üzerinden tüm uygulamanın rengini anında değiştirir
  };

  const handlePreviewLanguage = (code: string) => {
    setSelectedLang(code);
    i18n.changeLanguage(code); // Uygulamanın dilini anında değiştirir
  };

  // Ayarları veritabanına ve yerel hafızaya kalıcı olarak kaydeden fonksiyon
  const saveSettingsToDatabase = async () => {
    if (!userId) return;

    // Güncellenecek sadece ayar verilerimiz var
    const payload = {
      language: selectedLang,
      themeBg: selectedBg,
      themePrimary: selectedPrimary
    };

    try {
      // Arka plana güvenli (Token'lı) şekilde PUT isteği atıyoruz
      const res = await fetchWithAuth(`http://localhost:8080/api/users/update/${userId}`, {
        method: 'PUT',
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
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-4xl mx-auto animate-in fade-in duration-500">
      
      {/* BAŞLIK */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">{t('settingsTitle', 'Genel Ayarlar')}</h1>
        <p className="font-extrabold opacity-80">{t('settingsDesc', 'Uygulamanın görünümünü özelleştir.')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* DİL SEÇİM PANELİ */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
          <div className="flex items-center gap-3 mb-6">
            <Globe size={24} strokeWidth={2.5} style={{ color: themePrimary }} />
            <h2 className="text-xl font-extrabold">{t('language', 'Dil')}</h2>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handlePreviewLanguage(lang.code)}
                className={`flex items-center justify-between p-4 rounded-xl font-bold transition-all border ${
                  selectedLang === lang.code 
                    ? 'bg-white shadow-sm border-white/80 scale-[1.02]' 
                    : 'bg-white/40 border-transparent opacity-70 hover:opacity-100 hover:bg-white/60'
                }`}
                style={{ color: selectedLang === lang.code ? themePrimary : 'inherit' }}
              >
                <span>{lang.label}</span>
                {selectedLang === lang.code && <Check size={18} strokeWidth={3} />}
              </button>
            ))}
          </div>
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
                  className={`w-full flex items-center justify-between p-3 rounded-xl transition-all border ${
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
                    <span className="font-extrabold text-sm" style={{ color: selectedBg === palette.bg && selectedPrimary === palette.primary ? themePrimary : 'inherit' }}>
                      {palette.label}
                    </span>
                  </div>
                  {selectedBg === palette.bg && selectedPrimary === palette.primary && <Check size={18} strokeWidth={3} style={{ color: themePrimary }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KALICI KAYDETME BUTONU */}
      <div className="flex justify-end pt-4">
        <button 
          onClick={saveSettingsToDatabase}
          className="py-4 px-10 rounded-2xl bg-white hover:bg-white/90 border border-white/80 font-black text-lg active:scale-95 transition-all shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center gap-2"
          style={{ color: themePrimary }}
        >
          <Save size={20} strokeWidth={2.5} /> {t('saveBtn', 'Kaydet')}
        </button>
      </div>

    </div>
  );
}