import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Utensils, LineChart as LineChartIcon, Settings as SettingsIcon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { themePrimary } = useContext(ThemeContext);

  return (
    <div className="p-6 md:p-10 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto h-full flex flex-col justify-center">
      <div 
        onClick={() => navigate('/workout')}
        className="w-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/60 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
      >
        <Dumbbell size={40} className="mb-4 opacity-80" strokeWidth={1.5} color={themePrimary} />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Antrenman Takibi</h2>
        <p className="font-medium opacity-80 mt-2">Hareketlerini ve setlerini yönet</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8">
        <div 
          onClick={() => navigate('/nutrition')}
          className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 border border-white/60 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
        >
          <Utensils size={32} className="mb-3 opacity-80" strokeWidth={1.5} color={themePrimary} />
          <h2 className="text-sm md:text-xl font-bold tracking-wide">Beslenme<br/>& Su</h2>
        </div>
        
        <div 
          onClick={() => navigate('/progress')}
          className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 border border-white/60 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
        >
          <LineChartIcon size={32} className="mb-3 opacity-80" strokeWidth={1.5} color={themePrimary} />
          <h2 className="text-sm md:text-xl font-bold tracking-wide">Gelişim<br/>Raporu</h2>
        </div>
      </div>

      <div 
        onClick={() => navigate('/settings')}
        className="w-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
      >
        <div className="flex items-center space-x-4">
          <SettingsIcon size={28} opacity={0.8} color={themePrimary} />
          <h2 className="text-xl font-bold tracking-wide">Ayarlar</h2>
        </div>
      </div>
    </div>
  );
}