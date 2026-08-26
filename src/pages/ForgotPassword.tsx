import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../context/ToastContext';
import { ThemeContext } from '../context/ThemeContext';
import { NavLink } from 'react-router-dom';
// YENİ: Yükleme ekranı içe aktarıldı
import { Loader } from '../components/Loader';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { themePrimary } = useContext(ThemeContext);

  // YENİ: Yükleme ekranı durumları
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  // GÜNCELLENDİ: Link gönderme işlemine akıllı zamanlayıcı eklendi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setLoadingMessage(t('sending', { defaultValue: 'Gönderiliyor...' }));

    const wakeUpTimeout = setTimeout(() => {
      setLoadingMessage(t('serverWakingUp', { defaultValue: 'Sunucu uykudan uyanıyor, bu işlem 30-40 saniye sürebilir. Lütfen bekleyin...' }));
    }, 3000);

    try {
      const response = await fetch('https://fitassist-backend.onrender.com/api/users/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        showToast(data.message, 'success');
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {
      showToast(t('serverError', 'Sunucu hatası!'), 'error');
    } finally {
      clearTimeout(wakeUpTimeout);
      setIsLoading(false);
    }
  };

  // EĞER İŞLEM SÜRÜYORSA LOADER BİLEŞENİNİ GÖSTER
  if (isLoading) {
    return <Loader message={loadingMessage} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in duration-500">
      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-white/60 w-full max-w-md">
        <h2 className="text-2xl font-black mb-2 text-center">{t('forgotPasswordTitle', 'Şifremi Unuttum')}</h2>
        <p className="font-bold opacity-70 mb-6 text-center text-sm">
          {t('forgotPasswordDesc', 'E-posta adresinizi girin, size bir sıfırlama bağlantısı gönderelim.')}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('emailPlaceholder', 'E-posta adresiniz')}
              className="w-full p-4 rounded-xl bg-white/60 border border-white/80 font-bold outline-none focus:ring-2 transition-all shadow-inner"
              style={{ '--tw-ring-color': themePrimary } as React.CSSProperties}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white font-black transition-all active:scale-95 hover:opacity-90 shadow-sm"
            style={{ backgroundColor: themePrimary }}
          >
            {t('sendResetLink', 'Bağlantı Gönder')}
          </button>
        </form>
        <div className="mt-6 text-center">
          <NavLink to="/profile" className="font-bold text-sm opacity-80 hover:opacity-100 transition-opacity" style={{ color: themePrimary }}>
            {t('backToLogin', 'Giriş sayfasına dön')}
          </NavLink>
        </div>
      </div>
    </div>
  );
}