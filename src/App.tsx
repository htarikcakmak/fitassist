import { useState, useContext } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, Droplets, LineChart as LineChartIcon, Settings as SettingsIcon } from 'lucide-react';

// Dış dosyaları içeri aktarıyoruz
import { ThemeContext } from './context/ThemeContext';
import Dashboard from './pages/Dashboard';
import Workout from './pages/Workout';
import Progress from './pages/Progress';
import Nutrition from './pages/Nutrition';
import WaterTracker from './pages/WaterTracker';
import Settings from './pages/Settings';

// ==========================================
// ORTAK STİLLER VE DİNAMİK CSS DEĞİŞKENLERİ
// ==========================================
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

// ==========================================
// 7. ANA ÇERÇEVE (LAYOUT) VE APP (PROVIDER)
// ==========================================
function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { themeBg, themePrimary } = useContext(ThemeContext);

  const navItems = [
    { path: '/', icon: Home, label: 'Özet' },
    { path: '/workout', icon: Dumbbell, label: 'Antrenman' },
    { path: '/nutrition', icon: Utensils, label: 'Beslenme' },
    { path: '/water', icon: Droplets, label: 'Su' },
    { path: '/progress', icon: LineChartIcon, label: 'Gelişim' },
    { path: '/settings', icon: SettingsIcon, label: 'Ayarlar' },
  ];

  return (
    <div className="fixed inset-0 flex font-sans" style={{ backgroundColor: themeBg }}>
      <GlobalStyles />
      
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

      <main className="flex-1 flex flex-col overflow-hidden bg-transparent">
        <div className="flex-1 overflow-y-auto w-full no-scrollbar">
          <Outlet />
        </div>
        
        <nav className="md:hidden absolute bottom-0 w-full bg-white/30 backdrop-blur-2xl border-t border-white/40 pb-safe z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center px-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              return (
                <NavLink key={item.path} to={item.path} className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${isActive ? 'scale-110 bg-white shadow-sm border border-white/80' : 'opacity-70 active:scale-95'}`}>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} color={themePrimary} />
                  {isActive && <span className="text-[10px] mt-1 font-extrabold tracking-wide" style={{ color: themePrimary }}>{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </main>
    </div>
  );
}

// ==========================================
// ANA UYGULAMA (APP) BİLEŞENİ
// ==========================================
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
            <Route path="nutrition" element={<Nutrition />} />
            <Route path="water" element={<WaterTracker />} />
            <Route path="progress" element={<Progress />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}