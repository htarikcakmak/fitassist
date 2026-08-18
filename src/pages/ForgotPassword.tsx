import { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../context/ToastContext';
import { ThemeContext } from '../context/ThemeContext';
import { NavLink } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { themePrimary } = useContext(ThemeContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in duration-500">
      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-white/60 w-full max-w-md">
        <h2 className="text-2xl font-black mb-2 text-center">Şifremi Unuttum</h2>
        <p className="font-bold opacity-70 mb-6 text-center text-sm">
          E-posta adresinizi girin, size bir sıfırlama bağlantısı gönderelim.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="w-full p-4 rounded-xl bg-white/60 border border-white/80 font-bold outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white font-black transition-all hover:opacity-90"
            style={{ backgroundColor: themePrimary }}
          >
            Bağlantı Gönder
          </button>
        </form>
        <div className="mt-6 text-center">
          <NavLink to="/profile" className="font-bold text-sm opacity-80 hover:opacity-100" style={{ color: themePrimary }}>
            Giriş sayfasına dön
          </NavLink>
        </div>
      </div>
    </div>
  );
}