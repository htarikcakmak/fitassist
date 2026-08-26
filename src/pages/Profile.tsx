import { useState, useContext, useRef, useEffect } from 'react';
import { User, Mail, Lock, Camera, LogOut, ArrowRight, Ruler, Weight, Target, Save, Edit3, Calendar } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../context/ToastContext';
import { fetchWithAuth } from '../utils/api';
import { NavLink } from 'react-router-dom';
import { Loader } from '../components/Loader';

export default function Profile() {
  const { themePrimary } = useContext(ThemeContext);
  const { t } = useTranslation();
  const { showToast } = useContext(ToastContext);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgotPassword'>('login');
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [rememberMe, setRememberMe] = useState(false);

  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [age, setAge] = useState(''); 
  const [goal, setGoal] = useState('Vücut Kompozisyonu');
  const [profilePic, setProfilePic] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=User&backgroundColor=transparent');

  const [tempEmail, setTempEmail] = useState('');
  const [tempName, setTempName] = useState('');
  const [tempPassword, setTempPassword] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('fitassist_user') || sessionStorage.getItem('fitassist_user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserId(user.id);
      setName(user.name || '');
      setEmail(user.email || '');
      setHeight(user.height || '');
      setWeight(user.weight || '');
      setAge(user.age || ''); 
      setGoal(user.goal || 'Vücut Kompozisyonu');
      if (user.imageUrl) setProfilePic(user.imageUrl);
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();

    if (authMode === 'login' && (!tempEmail || !tempPassword)) {
      showToast(t('fillAllFields', 'Lütfen tüm alanları doldurun!'), 'error');
      return;
    }
    if (authMode === 'register' && (!tempName || !tempEmail || !tempPassword)) {
      showToast(t('fillAllFields', 'Lütfen tüm alanları doldurun!'), 'error');
      return;
    }

    setIsLoading(true);
    setLoadingMessage(authMode === 'register' ? 'Kayıt oluşturuluyor...' : 'Giriş yapılıyor...');

    // GÜNCELLENDİ: Akıllı Zamanlayıcı (Smart Timeout)
    const wakeUpTimeout = setTimeout(() => {
      setLoadingMessage(t('serverWakingUp', { defaultValue: 'Sunucu uykudan uyanıyor, bu işlem 30-40 saniye sürebilir. Lütfen bekleyin...' }));
    }, 3000);

    const endpoint = authMode === 'register' ? '/register' : '/login';
    const url = `https://fitassist-backend.onrender.com/api/users${endpoint}`;
    const payload = authMode === 'register' 
      ? { name: tempName, email: tempEmail, password: tempPassword } 
      : { email: tempEmail, password: tempPassword };

    try {
      const response = await fetchWithAuth(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        showToast(t('loginError', 'Hata! Lütfen bilgilerinizi kontrol edin.'), 'error');
        return;
      }

      const userData = await response.json(); 
      setUserId(userData.id);
      setName(userData.name || '');
      setEmail(userData.email || '');
      setHeight(userData.height || '');
      setWeight(userData.weight || '');
      setAge(userData.age || '');
      setGoal(userData.goal || 'Vücut Kompozisyonu');
      if (userData.imageUrl) setProfilePic(userData.imageUrl);

      setIsLoggedIn(true);

      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('fitassist_user', JSON.stringify(userData));
      
      setTempPassword('');
      showToast(t('loginSuccess', 'Başarıyla giriş yapıldı!'), 'success');

    } catch (error) {
      console.error("fetchWithAuth error:", error);
      showToast(t('serverError', 'Sunucuya bağlanılamadı!'), 'error');
    } finally {
      clearTimeout(wakeUpTimeout);
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAuthMode('login');
    setIsEditing(false);
    localStorage.removeItem('fitassist_user');
    sessionStorage.removeItem('fitassist_user');
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setLoadingMessage('Profil bilgileri kaydediliyor...');
    
    // GÜNCELLENDİ: Akıllı Zamanlayıcı (Smart Timeout)
    const wakeUpTimeout = setTimeout(() => {
      setLoadingMessage(t('serverWakingUp', { defaultValue: 'Sunucu uykudan uyanıyor, bu işlem 30-40 saniye sürebilir. Lütfen bekleyin...' }));
    }, 3000);
    
    const updatedUser = { 
      id: userId, 
      name: name, 
      email: email, 
      height: height ? Number(height) : null, 
      weight: weight ? Number(weight) : null, 
      age: age ? Number(age) : null, 
      goal: goal, 
      imageUrl: profilePic 
    };

    try {
      const response = await fetchWithAuth(`https://fitassist-backend.onrender.com/api/users/update/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser)
      });

      if (!response.ok) {
        showToast("Veritabanına kaydedilemedi! Lütfen tekrar deneyin.", "error");
        return; 
      }

      const savedData = await response.json();

      const storage = localStorage.getItem('fitassist_user') ? localStorage : sessionStorage;
      const currentUserData = JSON.parse(storage.getItem('fitassist_user') || '{}');
      
      const newStorageData = {
        ...currentUserData,
        ...savedData
      };

      storage.setItem('fitassist_user', JSON.stringify(newStorageData));

      setIsEditing(false);
      showToast(t('successSaved', 'Başarıyla kaydedildi!'), 'success');

    } catch (err) {
      console.error("Arka plan güncelleme hatası:", err);
      showToast("Sunucu ile bağlantı koptu!", "error");
    } finally {
      clearTimeout(wakeUpTimeout);
      setIsLoading(false);
    }
  };

  const handleImageClick = () => fileInputRef.current?.click();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePic(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isLoading) {
    return <Loader message={loadingMessage} />;
  }

  return (
    <div className="px-6 md:p-10 mt-2 md:mt-6 animate-in fade-in duration-500 max-w-lg mx-auto flex flex-col justify-center h-full pb-32">
      
      {!isLoggedIn ? (
        <div className="w-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black tracking-tight mb-2">
              {authMode === 'login' && t('loginTitle', 'Giriş Yap')}
              {authMode === 'register' && t('registerTitle', 'Hesap Oluştur')}
            </h2>
            <p className="text-sm font-bold opacity-70">
              {authMode === 'login' && t('loginDesc', 'Verilerine ulaşmak için giriş yap.')}
              {authMode === 'register' && t('registerDesc', 'FitAssist ile hedeflerine ulaşmaya başla.')}
            </p>
          </div>

          <form onSubmit={handleAuth} noValidate className="space-y-4">
            {authMode === 'register' && (
              <div className="relative">
                <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" color={themePrimary} />
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)} 
                  placeholder={t('fullNamePlaceholder', 'Ad Soyad')} 
                  className="w-full bg-white/60 border border-white/80 rounded-2xl pl-12 pr-4 py-4 font-bold focus:outline-none focus:ring-2 transition-all shadow-inner" 
                  style={{ '--tw-ring-color': themePrimary } as React.CSSProperties} 
                />
              </div>
            )}

            <div className="relative">
              <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" color={themePrimary} />
              <input 
                type="email" 
                value={tempEmail} 
                onChange={(e) => setTempEmail(e.target.value)} 
                placeholder={t('emailPlaceholder', 'E-posta Adresi')} 
                className="w-full bg-white/60 border border-white/80 rounded-2xl pl-12 pr-4 py-4 font-bold focus:outline-none focus:ring-2 transition-all shadow-inner" 
                style={{ '--tw-ring-color': themePrimary } as React.CSSProperties} 
              />
            </div>

            <div className="relative">
              <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" color={themePrimary} />
              <input 
                type="password" 
                value={tempPassword} 
                onChange={(e) => setTempPassword(e.target.value)} 
                placeholder={t('passwordPlaceholder', 'Şifre')} 
                className="w-full bg-white/60 border border-white/80 rounded-2xl pl-12 pr-4 py-4 font-bold focus:outline-none focus:ring-2 transition-all shadow-inner" 
                style={{ '--tw-ring-color': themePrimary } as React.CSSProperties} 
              />
            </div>

            {authMode === 'login' && (
              <div className="flex items-center justify-between mt-2 px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center w-5 h-5 rounded border-2 border-gray-400 group-hover:border-gray-500 transition-colors">
                    <input 
                      type="checkbox" 
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="absolute opacity-0 w-0 h-0"
                    />
                    {rememberMe && (
                      <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: themePrimary }}></div>
                    )}
                  </div>
                  <span className="text-sm font-bold opacity-70 group-hover:opacity-100 transition-opacity select-none">
                    {t('rememberMe', 'Beni Hatırla')}
                  </span>
                </label>

                <NavLink 
                  to="/forgot-password" 
                  className="text-sm font-extrabold opacity-70 hover:opacity-100 transition-opacity"
                  style={{ color: themePrimary }}
                >
                  {t('forgotPassword', 'Şifremi Unuttum')}
                </NavLink>
              </div>
            )}

            <button type="submit" className="w-full mt-4 py-4 rounded-2xl bg-white hover:bg-white/90 border border-white/80 font-black active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm" style={{ color: themePrimary }}>
              {authMode === 'login' && t('loginBtn', 'Giriş Yap')}
              {authMode === 'register' && t('registerBtn', 'Kayıt Ol')}
              <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </form>

          <div className="mt-6 text-center">
            <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-sm font-extrabold opacity-80 hover:opacity-100 transition-opacity" style={{ color: themePrimary }}>
              {authMode === 'login' ? t('noAccount', 'Hesabın yok mu? Kayıt Ol') : t('alreadyHaveAccount', 'Zaten hesabın var mı? Giriş Yap')}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col items-center">
          <div className="relative mb-6 group cursor-pointer" onClick={handleImageClick}>
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white/50 relative">
              <img src={profilePic} alt="Profil" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <Camera size={28} color="white" />
              </div>
            </div>
            <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageChange} className="hidden" />
          </div>

          {!isEditing ? (
            <div className="w-full flex flex-col items-center text-center animate-in fade-in">
              <h2 className="text-2xl font-black tracking-tight mb-1">{name}</h2>
              <p className="text-sm font-bold opacity-70 mb-6">{email}</p>

              <div className="flex gap-4 mb-8 bg-white/30 px-6 py-4 rounded-2xl border border-white/40 justify-center w-full">
                <div className="text-center w-1/3">
                  <p className="text-xs font-bold opacity-60">{t('height', 'BOY')}</p>
                  <p className="font-black text-lg">{height || '-'}</p>
                </div>
                <div className="text-center border-l border-white/40 w-1/3">
                  <p className="text-xs font-bold opacity-60">{t('weight', 'KİLO')}</p>
                  <p className="font-black text-lg">{weight || '-'}</p>
                </div>
                <div className="text-center border-l border-white/40 w-1/3">
                  <p className="text-xs font-bold opacity-60">{t('age', 'YAŞ')}</p>
                  <p className="font-black text-lg">{age || '-'}</p>
                </div>
              </div>

              <div className="w-full space-y-3">
                <button onClick={() => setIsEditing(true)} className="w-full bg-white/60 hover:bg-white p-4 rounded-2xl font-extrabold text-sm transition-all border border-white/80 shadow-sm flex items-center justify-between" style={{ color: themePrimary }}>
                  <span>{t('editProfile', 'Profili Düzenle')}</span>
                  <Edit3 size={18} />
                </button>
                <button onClick={handleLogout} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-600 p-4 rounded-2xl font-extrabold text-sm transition-all border border-red-500/20 shadow-sm flex items-center justify-between">
                  <span>{t('logout', 'Çıkış Yap')}</span>
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4 animate-in slide-in-from-bottom-2 fade-in">
              <div className="space-y-1 text-left">
                <label className="text-xs font-extrabold opacity-70 ml-1">{t('fullNamePlaceholder', 'Ad Soyad')}</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" color={themePrimary} />
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-2xl pl-11 pr-4 py-3 font-bold focus:outline-none focus:ring-2 transition-all shadow-inner" style={{ '--tw-ring-color': themePrimary } as React.CSSProperties} />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-left">
                <div className="space-y-1">
                  <label className="text-xs font-extrabold opacity-70 ml-1">{t('heightLabel', 'Boy')}</label>
                  <div className="relative">
                    <Ruler size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" color={themePrimary} />
                    <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-2xl pl-9 pr-2 py-3 font-bold focus:outline-none focus:ring-2 transition-all shadow-inner" style={{ '--tw-ring-color': themePrimary } as React.CSSProperties} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold opacity-70 ml-1">{t('weightLabel', 'Kilo')}</label>
                  <div className="relative">
                    <Weight size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" color={themePrimary} />
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-2xl pl-9 pr-2 py-3 font-bold focus:outline-none focus:ring-2 transition-all shadow-inner" style={{ '--tw-ring-color': themePrimary } as React.CSSProperties} />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-extrabold opacity-70 ml-1">{t('ageLabel', 'Yaş')}</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-50" color={themePrimary} />
                    <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-2xl pl-9 pr-2 py-3 font-bold focus:outline-none focus:ring-2 transition-all shadow-inner" style={{ '--tw-ring-color': themePrimary } as React.CSSProperties} />
                  </div>
                </div>
              </div>

              <div className="space-y-1 text-left">
                <label className="text-xs font-extrabold opacity-70 ml-1">{t('goalLabel', 'Ana Hedef')}</label>
                <div className="relative">
                  <Target size={18} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" color={themePrimary} />
                  <select value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-2xl pl-11 pr-4 py-3 font-bold focus:outline-none focus:ring-2 transition-all shadow-inner appearance-none">
                    <option value="Kilo Verme">{t('goalLoseWeight', 'Kilo Verme (Definisyon)')}</option>
                    <option value="Kas Kazanımı">{t('goalGainMuscle', 'Kas Kazanımı (Bulk)')}</option>
                    <option value="Vücut Kompozisyonu">{t('goalRecomposition', 'Vücut Kompozisyonu')}</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSaveProfile} className="w-full mt-2 py-4 rounded-2xl bg-white hover:bg-white/90 font-black active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm border border-white/80" style={{ color: themePrimary }}>
                <Save size={20} strokeWidth={2.5} /> {t('saveProfileBtn', 'Profili Güncelle')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}