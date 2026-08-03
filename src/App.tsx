import { useState, createContext, useContext } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, Droplets, LineChart as LineChartIcon, Settings as SettingsIcon, Plus, Check, X, Target, Scale, Palette, GlassWater, Pencil } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ==========================================
// 1. TEMA YÖNETİMİ (CONTEXT)
// ==========================================
// Tüm uygulamanın renklerini tutacak ve değiştirecek global yapımız
const ThemeContext = createContext({
  themeBg: '#d8c97f',
  themePrimary: '#6a9433',
  setTheme: (bg: string, primary: string) => {}
});

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
// DASHBOARD BİLEŞENİ
// ==========================================
function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10 space-y-6 md:space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto h-full flex flex-col justify-center">
      <div 
        onClick={() => navigate('/workout')}
        className="w-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white/60 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
      >
        <Dumbbell size={40} className="mb-4 opacity-80" strokeWidth={1.5} color="var(--theme-primary)" />
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Antrenman Takibi</h2>
        <p className="font-medium opacity-80 mt-2">Hareketlerini ve setlerini yönet</p>
      </div>

      <div className="grid grid-cols-2 gap-4 md:gap-8">
        <div 
          onClick={() => navigate('/nutrition')}
          className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 border border-white/60 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
        >
          <Utensils size={32} className="mb-3 opacity-80" strokeWidth={1.5} color="var(--theme-primary)" />
          <h2 className="text-sm md:text-xl font-bold tracking-wide">Beslenme<br/>& Su</h2>
        </div>
        
        <div 
          onClick={() => navigate('/progress')}
          className="bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-10 border border-white/60 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
        >
          <LineChartIcon size={32} className="mb-3 opacity-80" strokeWidth={1.5} color="var(--theme-primary)" />
          <h2 className="text-sm md:text-xl font-bold tracking-wide">Gelişim<br/>Raporu</h2>
        </div>
      </div>

      <div 
        onClick={() => navigate('/settings')}
        className="w-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white/60 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] cursor-pointer hover:bg-white/50 active:scale-[0.98] transition-all duration-300"
      >
        <div className="flex items-center space-x-4">
          <SettingsIcon size={28} opacity={0.8} color="var(--theme-primary)" />
          <h2 className="text-xl font-bold tracking-wide">Ayarlar</h2>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// WORKOUT BİLEŞENİ
// ==========================================
const EXERCISE_LIBRARY = {
  Göğüs: ['Bench Press', 'Incline Bench Press', 'Dumbbell Bench Press'],
  Sırt: ['Pull Up', 'Lat Pulldown', 'Barbell Row'],
  Omuz: ['Overhead Press', 'Lateral Raise', 'Front Raise'],
  Bacak: ['Squat', 'Leg Press', 'Romanian Deadlift'],
  Kol: ['Barbell Curl', 'Hammer Curl', 'Pushdown'],
  Karın: ['Crunch', 'Cable Crunch', 'Plank']
};

type SetData = { weight: string; reps: string };
type Exercise = { id: string; name: string; sets: SetData[] };

function Workout() {
  const programOptions = ['Push', 'Pull', 'Leg', 'Upper', 'Lower', 'Full Body'];
  const [activeProgram, setActiveProgram] = useState<string>('Push');
  const [routine, setRoutine] = useState<Exercise[]>([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const { themeBg, themePrimary } = useContext(ThemeContext); // Tema renklerini al

  const addExercise = (name: string) => {
    const newExercise = { id: Math.random().toString(36).substr(2, 9), name: name, sets: [{ weight: '', reps: '' }] };
    setRoutine([...routine, newExercise]);
    setShowLibrary(false);
  };

  const addSetToExercise = (exerciseId: string) => {
    setRoutine(routine.map(ex => ex.id === exerciseId ? { ...ex, sets: [...ex.sets, { weight: '', reps: '' }] } : ex));
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500 pb-32 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Antrenman</h1>
          <p className="font-medium opacity-80 mt-1">Günün programını seç ve başla.</p>
        </div>
        
        <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
          {programOptions.map((prog) => (
            <button 
              key={prog} 
              onClick={() => setActiveProgram(prog)} 
              style={{
                backgroundColor: activeProgram === prog ? themePrimary : 'transparent',
                color: activeProgram === prog ? themeBg : themePrimary,
                borderColor: activeProgram === prog ? 'transparent' : 'rgba(255,255,255,0.6)'
              }}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full font-bold transition-all duration-300 active:scale-95 border bg-white/40 backdrop-blur-md`}
            >
              {prog}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routine.map((exercise, index) => (
          <div key={exercise.id} className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
            <h3 className="text-lg font-extrabold mb-4">{index + 1}. {exercise.name}</h3>
            
            <div className="space-y-3">
              {exercise.sets.map((set, sIndex) => (
                <div key={sIndex} className="grid grid-cols-4 gap-3 items-center bg-white/50 p-2 rounded-xl border border-white/40">
                  <div className="text-center text-sm font-bold opacity-70">Set {sIndex + 1}</div>
                  <input type="number" placeholder="kg" className="w-full bg-white/60 rounded-lg p-2 text-center text-sm font-bold focus:outline-none transition-all placeholder-current opacity-70" />
                  <input type="number" placeholder="Tekrar" className="w-full bg-white/60 rounded-lg p-2 text-center text-sm font-bold focus:outline-none transition-all placeholder-current opacity-70" />
                  <button className="p-2 mx-auto rounded-lg bg-white/80 hover:bg-white active:scale-90 transition-all shadow-sm"><Check size={18} strokeWidth={2.5} color={themePrimary} /></button>
                </div>
              ))}
            </div>
            
            <button onClick={() => addSetToExercise(exercise.id)} className="mt-5 w-full py-3 rounded-xl bg-white/30 hover:bg-white/50 border border-white/60 font-bold active:scale-95 transition-all flex items-center justify-center space-x-2">
              <Plus size={18} /> <span>Set Ekle</span>
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setShowLibrary(true)} className="w-full md:w-auto md:px-12 py-4 rounded-2xl bg-white/60 backdrop-blur-xl hover:bg-white/80 border border-white/60 font-extrabold text-lg shadow-sm active:scale-95 transition-all flex items-center justify-center space-x-2 mx-auto">
        <Plus size={24} /> <span>Hareket Ekle</span>
      </button>

      {showLibrary && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="rounded-t-[2.5rem] h-[85vh] flex flex-col shadow-2xl border-t border-white/50 animate-in slide-in-from-bottom-full duration-400 max-w-2xl mx-auto w-full" style={{ backgroundColor: themeBg }}>
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-2xl font-extrabold">Hareket Kütüphanesi</h2>
              <button onClick={() => setShowLibrary(false)} className="p-2 bg-white/50 rounded-full active:scale-90 transition-all"><X size={20} color={themePrimary} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              {Object.entries(EXERCISE_LIBRARY).map(([category, exercises]) => (
                <div key={category}>
                  <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3 pl-2 opacity-70">{category}</h3>
                  <div className="space-y-3">
                    {exercises.map(ex => (
                      <button key={ex} onClick={() => addExercise(ex)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 active:scale-95 transition-all text-left shadow-sm">
                        <span className="font-bold">{ex}</span>
                        <div className="bg-white/50 p-2 rounded-full"><Plus size={16} strokeWidth={3} color={themePrimary} /></div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// PROGRESS BİLEŞENİ
// ==========================================
function Progress() {
  const metrics = ['Kilo', 'Yağ Oranı', 'Kas Oranı'];
  const [activeMetric, setActiveMetric] = useState('Kilo');
  const [inputValue, setInputValue] = useState('');
  const [metricData, setMetricData] = useState<Record<string, {date: string, value: number}[]>>({});
  const { themeBg, themePrimary } = useContext(ThemeContext);

  const handleSave = () => {
    if (!inputValue) return;
    const today = new Date();
    const dateStr = today.getDate() + ' ' + today.toLocaleString('tr-TR', { month: 'short' });
    setMetricData(prev => ({
      ...prev,
      [activeMetric]: [...(prev[activeMetric] || []), { date: dateStr, value: parseFloat(inputValue) }]
    }));
    setInputValue('');
  };

  const currentData = metricData[activeMetric] || [];

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Gelişim</h1>
          <p className="font-medium opacity-80 mt-1">Ölçümlerini gir, grafiği oluştur.</p>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
          {metrics.map((metric) => (
            <button 
              key={metric} 
              onClick={() => setActiveMetric(metric)} 
              style={{
                backgroundColor: activeMetric === metric ? themePrimary : 'rgba(255,255,255,0.4)',
                color: activeMetric === metric ? themeBg : themePrimary,
                borderColor: activeMetric === metric ? 'transparent' : 'rgba(255,255,255,0.6)'
              }}
              className="flex-shrink-0 px-6 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 active:scale-95 border backdrop-blur-md"
            >
              {metric}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
          <h2 className="text-lg font-extrabold mb-6 flex items-center justify-between">
            <span>{activeMetric} Geçmişi</span>
          </h2>
          <div className="h-64 w-full flex items-center justify-center">
            {currentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={themePrimary} vertical={false} opacity={0.3} />
                  <XAxis dataKey="date" stroke={themePrimary} fontSize={12} tickLine={false} axisLine={false} fontWeight={700} />
                  <YAxis stroke={themePrimary} fontSize={12} tickLine={false} axisLine={false} fontWeight={700} />
                  <Tooltip contentStyle={{ backgroundColor: themeBg, borderRadius: '16px', border: '1px solid white', fontWeight: 'bold', color: themePrimary }} />
                  <Line type="monotone" dataKey="value" stroke={themePrimary} strokeWidth={4} dot={{ r: 6, fill: '#fff', stroke: themePrimary, strokeWidth: 3 }} activeDot={{ r: 8, fill: themePrimary, stroke: '#fff', strokeWidth: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p className="opacity-60 font-bold text-center">Henüz veri yok.<br/>İlk ölçümünü aşağıdan ekle!</p>
            )}
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 h-fit space-y-4">
          <h3 className="font-extrabold">Yeni {activeMetric} Kaydı</h3>
          <div className="flex gap-4">
            <input 
              type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
              placeholder="Değer girin..." 
              className="flex-1 bg-white/60 border border-white/80 rounded-xl px-4 py-3 text-sm font-extrabold focus:outline-none transition-all placeholder-current opacity-70" 
            />
            <button onClick={handleSave} className="bg-white hover:bg-white/80 border border-white/60 px-6 py-3 rounded-xl active:scale-95 transition-all font-extrabold shadow-sm">
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// NUTRITION & WATER BİLEŞENLERİ (Kısaltıldı)
// ==========================================
// ==========================================
// 4. NUTRITION BİLEŞENİ
// ==========================================
const FOOD_LIBRARY = [
  { id: '1', name: 'Yumurta (1 adet)', cal: 78, p: 6, c: 0.6, f: 5 },
  { id: '2', name: 'Avokado (Yarım)', cal: 160, p: 2, c: 9, f: 15 },
  { id: '3', name: 'Kefir (1 Bardak)', cal: 104, p: 8, c: 12, f: 2.5 },
  { id: '4', name: 'Tavuk Döner Dürüm', cal: 450, p: 35, c: 45, f: 15 },
  { id: '5', name: 'Yulaf (100g)', cal: 389, p: 16.9, c: 66.3, f: 6.9 }
];

type FoodItem = { name: string; cal: number; p: number; c: number; f: number };
type MealsState = { [key: string]: FoodItem[] };

function Nutrition() {
  const [meals, setMeals] = useState<MealsState>({ 'Kahvaltı': [], 'Öğle': [], 'Akşam': [], 'Ara Öğün': [] });
  const [modalData, setModalData] = useState<{ isOpen: boolean; mealType: string }>({ isOpen: false, mealType: '' });
  const { themeBg, themePrimary } = useContext(ThemeContext);

  const addFoodToMeal = (food: FoodItem) => {
    if (modalData.mealType) {
      setMeals(prev => ({ ...prev, [modalData.mealType]: [...prev[modalData.mealType], food] }));
    }
    setModalData({ isOpen: false, mealType: '' });
  };

  return (
    <div className="p-6 md:p-10 space-y-6 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Beslenme</h1>
        <p className="font-extrabold opacity-80">Eylül başına kadar olan hedefine ulaşmak için öğünlerini takip et.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(meals).map(([mealName, foods]) => {
          const mealCals = foods.reduce((acc, curr) => acc + curr.cal, 0);
          return (
            <div key={mealName} className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold">{mealName}</h3>
                <span className="text-sm font-extrabold bg-white/60 px-3 py-1 rounded-lg" style={{ color: themePrimary }}>{mealCals} kcal</span>
              </div>

              {foods.length > 0 ? (
                <div className="space-y-4 mb-5">
                  {foods.map((food, i) => (
                    <div key={i} className="flex flex-col gap-2 bg-white/60 border border-white/80 p-4 rounded-xl shadow-sm">
                      <span className="text-sm font-extrabold text-center border-b border-white/50 pb-2 mb-1">{food.name}</span>
                      <div className="flex justify-between items-center text-xs font-extrabold w-full opacity-80">
                        <span className="bg-white/40 px-2 py-1 rounded-md w-1/3 text-center mx-1">P: {food.p}g</span>
                        <span className="bg-white/40 px-2 py-1 rounded-md w-1/3 text-center mx-1">K: {food.c}g</span>
                        <span className="bg-white/40 px-2 py-1 rounded-md w-1/3 text-center mx-1">Y: {food.f}g</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm mb-5 font-bold opacity-60">Henüz besin eklenmedi.</p>
              )}

              <button onClick={() => setModalData({ isOpen: true, mealType: mealName })} className="w-full py-3 rounded-xl bg-white/60 hover:bg-white border border-white/80 font-extrabold active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-sm">
                <Plus size={18} strokeWidth={3} /> <span>Besin Ekle</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* iOS Style Modal - Z-index 100 olarak güncellendi */}
      {modalData.isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="rounded-t-[2.5rem] h-[85vh] flex flex-col shadow-2xl border-t border-white/50 animate-in slide-in-from-bottom-full duration-400 max-w-2xl mx-auto w-full" style={{ backgroundColor: themeBg }}>
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-2xl font-extrabold">{modalData.mealType} - Besin Ekle</h2>
              <button onClick={() => setModalData({ isOpen: false, mealType: '' })} className="p-2 bg-white/50 rounded-full active:scale-90 transition-all"><X size={20} color={themePrimary} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {FOOD_LIBRARY.map((food) => (
                <button key={food.id} onClick={() => addFoodToMeal(food)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 active:scale-95 transition-all text-left shadow-sm">
                  <div>
                    <p className="font-bold">{food.name}</p>
                    <p className="text-xs font-bold mt-2 opacity-70">
                      Kalori: {food.cal} | Protein: {food.p}g | Karb: {food.c}g | Yağ: {food.f}g
                    </p>
                  </div>
                  <div className="bg-white/50 p-2 rounded-full"><Plus size={20} strokeWidth={3} color={themePrimary} /></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function WaterTracker() {
  const [water, setWater] = useState(0);
  const [target, setTarget] = useState(3000);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState(target.toString());
  const { themePrimary } = useContext(ThemeContext);

  const waterOptions = [
    { amount: 250, label: '1 Bardak', glasses: 1 },
    { amount: 500, label: '2 Bardak', glasses: 2 },
    { amount: 750, label: '3 Bardak', glasses: 3 },
    { amount: 1000, label: '1 Şişe', glasses: 0 }
  ];

  const handleTargetSave = () => {
    const newTarget = parseInt(tempTarget);
    if (!isNaN(newTarget) && newTarget > 0) setTarget(newTarget);
    setIsEditing(false);
  };

  return (
    <div className="p-6 md:p-10 space-y-10 pb-32 md:pb-10 max-w-3xl mx-auto animate-in fade-in duration-500 flex flex-col items-center">
      <div className="w-full text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Su Takibi</h1>
      </div>
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 flex flex-col items-center justify-center overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col items-center">
          <Droplets size={56} className="mb-2 opacity-80" strokeWidth={1.5} color={themePrimary} />
          <span className="text-5xl md:text-6xl font-black tracking-tighter">{water}</span>
          <div className="mt-2 flex items-center justify-center h-8">
            <span className="text-sm md:text-lg font-bold opacity-70 mr-2">/</span>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input type="number" value={tempTarget} onChange={(e) => setTempTarget(e.target.value)} className="w-20 bg-white/60 border rounded-lg px-2 py-1 text-center text-sm font-bold focus:outline-none" style={{borderColor: themePrimary}} autoFocus />
                <button onClick={handleTargetSave} className="p-1.5 bg-white rounded-lg shadow-sm"><Check size={16} strokeWidth={3} color={themePrimary}/></button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
                <span className="text-sm md:text-lg font-bold opacity-70">{target} ml</span>
                <button className="opacity-50 group-hover:opacity-100 transition-opacity"><Pencil size={14} color={themePrimary}/></button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-white/60">
        <div className="grid grid-cols-2 gap-4">
          {waterOptions.map(option => (
            <button key={option.amount} onClick={() => setWater(prev => prev + option.amount)} className="bg-white/60 hover:bg-white border border-white/80 py-4 px-2 rounded-2xl active:scale-95 transition-all flex flex-col items-center justify-center shadow-sm">
              <div className="flex items-center space-x-1 mb-1"><Plus size={16} strokeWidth={3} /><span className="text-lg font-extrabold">{option.amount} ml</span></div>
              <div className="flex items-center gap-1 opacity-70"><span className="text-xs font-bold mr-1">{option.label}</span>
                <div className="flex gap-0.5">{option.glasses > 0 ? Array.from({ length: option.glasses }).map((_, i) => <GlassWater key={i} size={14} strokeWidth={2.5} />) : <Droplets size={14} strokeWidth={2.5} />}</div>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setWater(0)} className="w-full mt-6 py-4 rounded-2xl bg-white/30 hover:bg-white/50 font-extrabold active:scale-95 transition-all border border-white/40 shadow-sm">Sıfırla</button>
      </div>
    </div>
  );
}

// ==========================================
// 6. AYARLAR (TEMA VE RENK SEÇİCİ EKLENDİ)
// ==========================================
function Settings() {
  const { themeBg, themePrimary, setTheme } = useContext(ThemeContext);

  // Hazır Tema Paletleri
  const palettes = [
    { name: 'Çöl Sarısı / Avakado Yeşili (Klasik)', bg: '#d8c97f', primary: '#6a9433' },
    { name: 'Panter Siyahı / Vişne Kırmızısı', bg: '#1a1a1a', primary: '#e63946' },
    { name: 'Buz Mavisi / Gece Laciverti', bg: '#e0fbfc', primary: '#293241' },
    { name: 'Şeftali Pembesi / İncir Moru', bg: '#ffdab9', primary: '#4a235a' }
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Ayarlar</h1>
        <p className="font-extrabold opacity-80">Uygulamanın görünümünü özelleştir.</p>
      </div>

      <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 space-y-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-white/60 p-2 rounded-xl"><Palette size={20} color={themePrimary} /></div>
          <h2 className="text-xl font-extrabold">Görünüm ve Tema</h2>
        </div>
        
        {/* Hazır Paletler */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Hazır Paletler</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {palettes.map((palette) => (
              <button
                key={palette.name}
                onClick={() => setTheme(palette.bg, palette.primary)}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/60 border border-white/80 hover:bg-white transition-all active:scale-95 shadow-sm"
              >
                <span className="font-bold text-sm" style={{ color: palette.primary }}>{palette.name}</span>
                <div className="flex space-x-2">
                  <div className="w-6 h-6 rounded-full shadow-sm border border-white" style={{ backgroundColor: palette.bg }}></div>
                  <div className="w-6 h-6 rounded-full shadow-sm border border-white" style={{ backgroundColor: palette.primary }}></div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Özel Renk Seçici */}
        <div className="pt-4 border-t border-white/30 space-y-4">
          <h3 className="text-sm font-bold opacity-80 uppercase tracking-wider">Özel Renk Seç</h3>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center justify-between bg-white/60 p-3 rounded-2xl border border-white/80 flex-1 shadow-sm">
              <span className="font-bold pl-2">Arka Plan Rengi</span>
              <input 
                type="color" 
                value={themeBg} 
                onChange={(e) => setTheme(e.target.value, themePrimary)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none outline-none bg-transparent"
              />
            </div>
            
            <div className="flex items-center justify-between bg-white/60 p-3 rounded-2xl border border-white/80 flex-1 shadow-sm">
              <span className="font-bold pl-2">Vurgu Rengi (Yazılar)</span>
              <input 
                type="color" 
                value={themePrimary} 
                onChange={(e) => setTheme(themeBg, e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-none outline-none bg-transparent"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

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
      
      {/* DESKTOP SIDEBAR */}
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

      {/* ANA İÇERİK - CSS Katman Hatası Düzeltildi (relative ve z-0 silindi) */}
      <main className="flex-1 flex flex-col overflow-hidden bg-transparent">
        <div className="flex-1 overflow-y-auto w-full no-scrollbar">
          <Outlet />
        </div>
        
        {/* MOBILE BOTTOM NAV */}
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
  // Tema state'lerini en tepede tanımlıyoruz
  const [themeBg, setThemeBg] = useState('#d8c97f');
  const [themePrimary, setThemePrimary] = useState('#6a9433');

  const updateTheme = (bg: string, primary: string) => {
    setThemeBg(bg);
    setThemePrimary(primary);
  };

  return (
    // State'leri Context üzerinden tüm uygulamaya dağıtıyoruz
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