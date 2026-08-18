import { useState, useContext } from 'react';
import { ToastContext } from '../context/ToastContext';
import { ThemeContext } from '../context/ThemeContext';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState('');
  // const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  const { themePrimary } = useContext(ThemeContext);
  
  // URL'deki token değerini okumak için gerekli kanca
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token) {
      showToast('Geçersiz veya eksik bağlantı.', 'error');
      return;
    }

    try {
    const response = await fetch('https://fitassist-backend.onrender.com/api/users/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: newPassword })
    });

      const data = await response.json();
      if (response.ok) {
        showToast(data.message, 'success');
        navigate('/profile'); 
      } else {
        showToast(data.message, 'error');
      }
    } catch (error) {

      const errorMessage = error instanceof Error ? error.message : String(error);
      alert("GERÇEK HATA: " + errorMessage + " \nDetay: " + JSON.stringify(error));
    }

    console.log("sunucuya bağlanamadı");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-in fade-in duration-500">
      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-white/60 w-full max-w-md">
        <h2 className="text-2xl font-black mb-2 text-center">Yeni Şifre Belirle</h2>
        <p className="font-bold opacity-70 mb-6 text-center text-sm">
          Lütfen yeni şifrenizi girin.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Yeni şifreniz"
              className="w-full p-4 rounded-xl bg-white/60 border border-white/80 font-bold outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-4 rounded-xl text-white font-black transition-all hover:opacity-90"
            style={{ backgroundColor: themePrimary }}
          >
            Şifreyi Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}