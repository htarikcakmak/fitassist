import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, Droplets, LineChart as LineChartIcon, Settings as SettingsIcon, Moon, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { User } from 'lucide-react'; // User ikonunu lucide-react listesine ekleme
import Profile from './pages/Profile'; // Profil sayfasını import etme

import { ThemeContext } from './context/ThemeContext';
import Sleep from './pages/Sleep';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import Progress from './pages/Progress';
import Nutrition from './pages/Nutrition';
import WaterTracker from './pages/WaterTracker';
import Settings from './pages/Settings';

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
    { path: '/profile', icon: User, label: t('profile', 'Profil') }, // BİRİNCİ EKLEME BURAYA
    { path: '/settings', icon: SettingsIcon, label: t('Ayarlar') },
  ];

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
            {i18n.language}
          </span>
          <ChevronDown 
            size={16} 
            color={themePrimary} 
            className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} 
          />
        </button>

        {isLangMenuOpen && (
          <div className="absolute top-full right-0 mt-3 w-40 bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl border border-white/50 overflow-hidden flex flex-col animate-in slide-in-from-top-2 fade-in duration-200">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  i18n.changeLanguage(lang.code);
                  setIsLangMenuOpen(false);
                }}
                className={`px-4 py-3 text-left font-bold text-sm transition-colors hover:bg-black/5 ${
                  i18n.language === lang.code ? 'text-black bg-white shadow-inner' : 'text-gray-600'
                }`}
              >
                {lang.label}
              </button>
            ))}
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
        
        {/* YENİ: MOBİL İÇİN ÜST BAŞLIK (FitAssist) */}
        <div className="md:hidden flex items-center justify-between pt-8 px-6 pb-2 z-10 shrink-0">
          <h1 className="text-3xl font-black tracking-tighter">FIT<span className="opacity-70">ASSIST</span></h1>
        </div>

        {/* YENİ: YUMUŞAK SAYFA GEÇİŞ EFEKTİ (key=location.pathname sayesinde her geçişte tetiklenir) */}
        <div key={location.pathname} className="flex-1 overflow-y-auto w-full no-scrollbar pb-28 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          <Outlet />
        </div>
        
        {/* YENİ: YÜZEN, YUMUŞAK GEÇİŞLİ PREMIUM ALT MENÜ */}
        <nav className="md:hidden absolute bottom-4 left-4 right-4 bg-white/60 backdrop-blur-3xl border border-white/60 rounded-[2rem] z-40 shadow-[0_10px_40px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center px-2 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className={`relative flex items-center justify-center rounded-2xl transition-all duration-500 ease-out overflow-hidden ${isActive ? 'bg-white shadow-sm border border-white/80 p-2.5 px-4' : 'p-2.5 opacity-50 hover:opacity-100 active:scale-90'}`}
                >
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} color={themePrimary} className={`transition-transform duration-500 ${isActive ? 'scale-110' : ''}`} />
                  
                  {/* Animasyonlu Metin Genişleme Efekti (Accordion tarzı) */}
                  <div className={`transition-all duration-500 ease-out flex items-center ${isActive ? 'max-w-[80px] ml-1.5 opacity-100' : 'max-w-0 opacity-0 ml-0'}`}>
                    <span className="text-[10px] font-extrabold tracking-wide whitespace-nowrap" style={{ color: themePrimary }}>{item.label}</span>
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

  const updateTheme = (bg: string, primary: string) => {
    setThemeBg(bg);
    setThemePrimary(primary);
  };

  return (
    <ThemeContext.Provider value={{ themeBg, themePrimary, setTheme: updateTheme }}>
      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Layout />}>
         <Route index element={<Dashboard />} />
         <Route path="workout" element={<Workout />} />
         <Route path="sleep" element={<Sleep />} />
         <Route path="nutrition" element={<Nutrition />} />
         <Route path="water" element={<WaterTracker />} />
         <Route path="progress" element={<Progress />} />
         <Route path="profile" element={<Profile />} /> {/* İKİNCİ EKLEME BURAYA */}
         <Route path="settings" element={<Settings />} />
         </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}