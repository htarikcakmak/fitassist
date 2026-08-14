import { useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, Droplets, LineChart as LineChartIcon, Settings as SettingsIcon, Moon, Globe, ChevronDown, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Profile from './pages/Profile'; 
import { ToastProvider } from './context/ToastContext';
import { ThemeContext } from './context/ThemeContext';

import Sleep from './pages/Sleep';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import Progress from './pages/Progress';
import Nutrition from './pages/Nutrition';
import WaterTracker from './pages/WaterTracker';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Güvenlik kalkanı ve API aracımızı içe aktarıyoruz
import ProtectedRoute from './components/ProtectedRoute';
import { fetchWithAuth } from './utils/api';

const GlobalStyles = () => {
  const { themeBg, themePrimary } = useContext(ThemeContext);
  
  return (
    <style>{`
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      
      :root {
        --theme-bg: ${themeBg};
        --theme-primary: ${themePrimary};
      }
      
      body { 
        background-color: var(--theme-bg) !important; 
        color: var(--theme-primary) !important; 
        margin: 0;
        padding: 0;
        overflow: hidden; 
        transition: background-color 0.5s ease, color 0.5s ease;
      } 

      input, button, p, h1, h2, h3, span {
        color: var(--theme-primary);
      }
    `}</style>
  );
};

function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { themeBg, themePrimary } = useContext(ThemeContext);
  
  const { t, i18n } = useTranslation();

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'tr', label: 'Türkçe (TR)' },
    { code: 'en', label: 'English (EN)' },
    { code: 'es', label: 'Español (ES)' },
    { code: 'fr', label: 'Français (FR)' },
    { code: 'it', label: 'Italiano (IT)' },
    { code: 'de', label: 'Deutsch (DE)' },
  ];

  const navItems = [
    { path: '/', icon: Home, label: t('Anasayfa') },
    { path: '/workout', icon: Dumbbell, label: t('Antrenman') },
    { path: '/nutrition', icon: Utensils, label: t('Beslenme') },
    { path: '/water', icon: Droplets, label: t('Su') },
    { path: '/progress', icon: LineChartIcon, label: t('Gelişim') },
    { path: '/sleep', icon: Moon, label: t('Uyku') },
    { path: '/profile', icon: User, label: t('profile', 'Profil') },
    { path: '/settings', icon: SettingsIcon, label: t('Ayarlar') },
  ];

  // YENİ: Dili değiştiren ve veritabanına anında kaydeden fonksiyon
  const handleLanguageChange = async (code: string) => {
    // 1. Arayüz dilini anında değiştir ve menüyü kapat
    i18n.changeLanguage(code);
    setIsLangMenuOpen(false);

    // 2. Kullanıcı verisini yerel hafızadan bul
    const storage = localStorage.getItem('fitassist_user') ? localStorage : sessionStorage;
    const storedUser = storage.getItem('fitassist_user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      
      // 3. Yerel hafızadaki dil ayarını güncelle
      user.language = code;
      storage.setItem('fitassist_user', JSON.stringify(user));

      // 4. Arka plana (Veritabanına) yeni dili kaydetmek için istek at
      try {
        await fetchWithAuth(`http://localhost:8080/api/users/update/${user.id}`, {
          method: 'PUT',
          body: JSON.stringify({
            language: code,
            themeBg: user.themeBg,
            themePrimary: user.themePrimary
          })
        });
      } catch (error) {
        console.error("Dil değişikliği veritabanına kaydedilemedi:", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex font-sans" style={{ backgroundColor: themeBg }}>
      <GlobalStyles />
      
      {/* PROFESYONEL VE MODERN DİL SEÇİCİ */}
      <div className="absolute top-6 right-6 z-50">
        <button 
          onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
          className="flex items-center gap-2 bg-white/30 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/40 shadow-sm transition-all duration-300 hover:bg-white/40 active:scale-95"
        >
          <Globe size={18} color={themePrimary} />
          <span className="font-extrabold text-sm uppercase" style={{ color: themePrimary }}>
            {/* Uzun dil kodlarını (tr-TR) sadece 2 harfe (tr) kısaltarak gösteriyoruz */}
            {i18n.language ? i18n.language.substring(0, 2) : 'TR'}
          </span>
          <ChevronDown 
            size={16} 
            color={themePrimary} 
            className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isLangMenuOpen && (
          <div className="absolute top-full right-0 mt-3 w-40 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/50 overflow-hidden flex flex-col animate-in slide-in-from-top-2 fade-in duration-200">
            {languages.map((lang) => {
              // Dil kodunun doğru eşleştiğinden emin olmak için startsWith kullanıyoruz
              const isSelected = i18n.language && i18n.language.startsWith(lang.code);
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`px-4 py-3 text-left font-bold text-sm transition-colors hover:bg-black/5 ${
                    isSelected ? 'text-black bg-white shadow-inner' : 'text-gray-600'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
      
      {/* MASAÜSTÜ YAN MENÜ */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-white/30 bg-white/20 backdrop-blur-2xl p-6 shadow-[8px_0_30px_rgb(0,0,0,0.02)] z-10">
        <div className="mb-10 pl-2 mt-4">
          <h1 className="text-3xl font-black tracking-tighter">FIT<span className="opacity-70">ASSIST</span></h1>
        </div>
        <nav className="flex flex-col space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
            return (
              <NavLink key={item.path} to={item.path} 
                className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white shadow-sm border border-white/80 font-extrabold' : 'hover:bg-white/50 font-bold opacity-80 hover:opacity-100'}`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} color={themePrimary} />
                <span className="text-base tracking-wide" style={{ color: themePrimary }}>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* ANA İÇERİK ALANI */}
      <main className="flex-1 flex flex-col overflow-hidden bg-transparent relative">
        
        {/* MOBİL İÇİN ÜST BAŞLIK */}
        <div className="md:hidden flex items-center justify-between pt-8 px-6 pb-2 z-10 shrink-0">
          <h1 className="text-3xl font-black tracking-tighter">FIT<span className="opacity-70">ASSIST</span></h1>
        </div>

        {/* YUMUŞAK SAYFA GEÇİŞ EFEKTİ */}
        <div key={location.pathname} className="flex-1 overflow-y-auto w-full no-scrollbar pb-28 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          <Outlet />
        </div>
        
        {/* YÜZEN, YUMUŞAK GEÇİŞLİ PREMIUM ALT MENÜ */}
        <nav className="md:hidden absolute bottom-4 left-3 right-3 bg-white/60 backdrop-blur-3xl border border-white/60 rounded-[2rem] z-40 shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-x-auto no-scrollbar">
          <div className="flex justify-between items-center px-1.5 py-1.5 min-w-max">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className={`relative flex items-center justify-center shrink-0 rounded-2xl transition-all duration-500 ease-out overflow-hidden mx-0.5 ${isActive ? 'bg-white shadow-sm border border-white/80 p-2 px-3' : 'p-2 opacity-60 hover:opacity-100 active:scale-90'}`}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} color={themePrimary} className={`shrink-0 transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} />
                  
                  {/* Animasyonlu Metin Genişleme Efekti */}
                  <div className={`transition-all duration-500 ease-out flex items-center shrink-0 ${isActive ? 'max-w-[100px] ml-1.5 opacity-100' : 'max-w-0 opacity-0 ml-0'}`}>
                    <span className="text-[11px] font-extrabold tracking-wide whitespace-nowrap" style={{ color: themePrimary }}>{item.label}</span>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </nav>
      </main>
    </div>
  );
}

export default function App() {
  const [themeBg, setThemeBg] = useState('#d8c97f');
  const [themePrimary, setThemePrimary] = useState('#6a9433');
  
  // Dil değişimi için aracı çağırıyoruz
  const { i18n } = useTranslation();

  const updateTheme = (bg: string, primary: string) => {
    setThemeBg(bg);
    setThemePrimary(primary);
  };

  // Uygulama açıldığında ayarları hafızadan çekip uygulayan mantık
  useEffect(() => {
    const storedUser = localStorage.getItem('fitassist_user') || sessionStorage.getItem('fitassist_user');
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      
      // Kullanıcının kayıtlı teması varsa sistemi güncelle
      if (user.themeBg && user.themePrimary) {
        updateTheme(user.themeBg, user.themePrimary);
      }
      
      // Kullanıcının kayıtlı dili varsa çeviri sistemini güncelle
      if (user.language) {
        i18n.changeLanguage(user.language);
      }
    }
  }, [i18n]);

  return (
    <ThemeContext.Provider value={{ themeBg, themePrimary, setTheme: updateTheme }}>
     <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            
            {/* HERKESE AÇIK OLAN ROTALAR */}
            <Route path="profile" element={<Profile />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />

            {/* GÜVENLİK KALKANI EKLENEN ROTALAR */}
            <Route index element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="workout" element={<ProtectedRoute><Workout /></ProtectedRoute>} />
            <Route path="sleep" element={<ProtectedRoute><Sleep /></ProtectedRoute>} />
            <Route path="nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
            <Route path="water" element={<ProtectedRoute><WaterTracker /></ProtectedRoute>} />
            <Route path="progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            
          </Route>
        </Routes>
      </BrowserRouter>
     </ToastProvider>
    </ThemeContext.Provider>
  );
}