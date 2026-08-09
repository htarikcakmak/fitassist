import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Utensils, Droplets, LineChart as LineChartIcon, Settings as SettingsIcon, Moon, ChevronRight } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next'; 

export default function Dashboard() {
  const navigate = useNavigate();
  const { themePrimary, themeBg } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const [nutrition, setNutrition] = useState({ cal: 0, p: 0, c: 0, f: 0 });
  const [water, setWater] = useState({ consumed: 0, target: 3000 });
  const [sleepHours, setSleepHours] = useState<number | null>(null);
  const [workoutSets, setWorkoutSets] = useState(0);

  const todayString = new Date().toISOString().split('T')[0];
  const todayFormatted = new Date().toLocaleDateString(i18n.language || 'tr', {
    weekday: 'long', day: 'numeric', month: 'long'
  });

  useEffect(() => {
    // Beslenme
    fetch('http://localhost:8080/api/nutrition/today')
      .then(res => res.json())
      .then(data => {
        let cal = 0, p = 0, c = 0, f = 0;
        data.forEach((item: any) => {
          cal += item.calories || 0;
          p += item.protein || 0;
          c += item.carbs || 0;
          f += item.fats || 0;
        });
        setNutrition({ cal, p: Number(p.toFixed(1)), c: Number(c.toFixed(1)), f: Number(f.toFixed(1)) });
      }).catch(err => console.log("Beslenme çekilemedi", err));

    // Su
    fetch('http://localhost:8080/api/water/today')
      .then(res => res.json())
      .then(data => {
        if (data.date && !data.date.startsWith(todayString)) return; 
        setWater({ consumed: data.consumedAmount || 0, target: data.targetAmount || 3000 });
      }).catch(err => console.log("Su çekilemedi", err));

    // Antrenman
    fetch('http://localhost:8080/api/workout/today')
      .then(res => res.json())
      .then((data: any[]) => {
        const todayLogs = data.filter(log => log.date && log.date.startsWith(todayString));
        setWorkoutSets(todayLogs.length);
      }).catch(err => console.log("Antrenman çekilemedi", err));

    // Uyku
    fetch('http://localhost:8080/api/sleep/all')
      .then(res => res.json())
      .then((data: any[]) => {
        const todayLog = data.find(log => log.date && log.date.startsWith(todayString));
        if (todayLog) setSleepHours(todayLog.hours);
      }).catch(err => console.log("Uyku çekilemedi", err));
  }, []);

  return (
    <div className="px-6 md:p-10 mt-2 md:mt-6 space-y-4 md:space-y-6 animate-in fade-in duration-500 max-w-5xl mx-auto flex flex-col justify-start pb-32">
      
      {/* KARŞILAMA VE TARİH */}
      <div className="flex flex-col items-start px-2 mb-2">
        <span className="text-sm md:text-base font-extrabold opacity-60 uppercase tracking-wider mb-1">
          {todayFormatted}
        </span>
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          {t('welcomeGreeting', 'Merhaba! 👋')}
        </h2>
      </div>

      {/* 1. BESLENME WIDGET'I */}
      <div 
        onClick={() => navigate('/nutrition')}
        className="relative w-full bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 md:p-6 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
      >
        <ChevronRight size={20} className="absolute top-6 right-5 opacity-40" color={themePrimary} />
        <div className="flex items-center gap-4 mb-4">
          <div className="bg-white/50 p-3 rounded-2xl shrink-0"><Utensils size={24} strokeWidth={2.5} color={themePrimary} /></div>
          <div>
            <h2 className="text-lg font-extrabold tracking-tight">{t('dashboardNutritionTitle', 'Beslenme Özetin')}</h2>
            <p className="text-xs font-bold opacity-70">{nutrition.cal} kcal {t('consumed', 'alındı')}</p>
          </div>
        </div>
        <div className="flex justify-between items-center bg-white/40 p-4 rounded-2xl border border-white/50">
          {/* DÜZELTME: Protein, Karb ve Yağ kelimeleri çeviri sistemine (t) bağlandı */}
          <div className="text-center w-1/3 border-r border-white/40">
            <p className="text-[10px] font-bold opacity-70 uppercase mb-1">{t('protein', 'Protein')}</p>
            <p className="font-black">{nutrition.p}g</p>
          </div>
          <div className="text-center w-1/3 border-r border-white/40">
            <p className="text-[10px] font-bold opacity-70 uppercase mb-1">{t('carbs', 'Karb')}</p>
            <p className="font-black">{nutrition.c}g</p>
          </div>
          <div className="text-center w-1/3">
            <p className="text-[10px] font-bold opacity-70 uppercase mb-1">{t('fat', 'Yağ')}</p>
            <p className="font-black">{nutrition.f}g</p>
          </div>
        </div>
      </div>

      {/* 2. SATIR: SU VE ANTRENMAN */}
      <div className="grid grid-cols-2 gap-4">
        {/* SU WIDGET */}
        <div 
          onClick={() => navigate('/water')}
          className="relative bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
        >
          <ChevronRight size={18} className="absolute top-5 right-4 opacity-40" color={themePrimary} />
          <Droplets size={24} strokeWidth={2.5} color={themePrimary} className="mb-3" />
          <h2 className="text-sm font-extrabold tracking-tight mb-1">{t('dashboardWaterTitle', 'Su Tüketimi')}</h2>
          <p className="text-xl font-black">{water.consumed} <span className="text-xs font-bold opacity-60">/ {water.target} ml</span></p>
        </div>

        {/* ANTRENMAN WIDGET */}
        <div 
          onClick={() => navigate('/workout')}
          className="relative bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
        >
          <ChevronRight size={18} className="absolute top-5 right-4 opacity-40" color={themePrimary} />
          <Dumbbell size={24} strokeWidth={2.5} color={themePrimary} className="mb-3" />
          <h2 className="text-sm font-extrabold tracking-tight mb-1">{t('dashboardWorkoutTitle', 'Günün İdmanı')}</h2>
          <p className="text-xl font-black">
            {workoutSets > 0 ? `${workoutSets} ${t('setsCompleted', 'Set Yapıldı')}` : <span className="text-sm opacity-60">{t('noWorkoutYet', 'Henüz Yok')}</span>}
          </p>
        </div>
      </div>

      {/* 3. SATIR: UYKU VE GELİŞİM */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* UYKU WIDGET */}
        <div 
          onClick={() => navigate('/sleep')}
          className="relative bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
        >
          <ChevronRight size={18} className="absolute top-5 right-4 opacity-40" color={themePrimary} />
          <Moon size={24} strokeWidth={2.5} color={themePrimary} className="mb-3" />
          <h2 className="text-sm font-extrabold tracking-tight mb-1">{t('dashboardSleepTitle', 'Son Uyku')}</h2>
          <p className="text-xl font-black">
            {sleepHours !== null ? `${sleepHours} ${t('hoursShort', 'saat')}` : <span className="text-sm opacity-60">{t('noData', 'Veri Yok')}</span>}
          </p>
        </div>

        {/* GELİŞİM WIDGET */}
        <div 
          onClick={() => navigate('/progress')}
          className="relative bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
        >
          <ChevronRight size={18} className="absolute top-5 right-4 opacity-40" color={themePrimary} />
          <LineChartIcon size={24} strokeWidth={2.5} color={themePrimary} className="mb-3" />
          <h2 className="text-sm font-extrabold tracking-tight mb-1">{t('dashboardProgressTitle', 'Gelişim')}</h2>
          <p className="text-sm font-bold opacity-80 mt-1">{t('dashboardProgressDesc', 'İstatistiklerini gör')}</p>
        </div>
      </div>

      {/* 4. AYARLAR KARTI */}
      <div 
        onClick={() => navigate('/settings')}
        className="w-full bg-white/40 backdrop-blur-xl rounded-[2rem] p-5 border border-white/60 flex items-center gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
      >
        <div className="bg-white/50 p-3 rounded-2xl shrink-0">
          <SettingsIcon size={20} strokeWidth={2.5} color={themePrimary} />
        </div>
        <h2 className="text-base font-extrabold tracking-tight">{t('settingsTitle', 'Genel Ayarlar')}</h2>
      </div>

    </div>
  );
}