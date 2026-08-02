import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, Droplets, LineChart as LineChartIcon, Settings as SettingsIcon, Plus, Check, X, Target, Scale, Sun } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// ==========================================
// ORTAK STİLLER VE RENK TANIMLAMALARI
// ==========================================
const GlobalStyles = () => (
  <style>{`
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    
    body { 
      background-color: #d8c97f !important; 
      color: #6a9433 !important; 
      margin: 0;
      padding: 0;
    } 

    input, button, p, h1, h2, h3, span {
      color: #6a9433 !important;
    }
  `}</style>
);

// ==========================================
// 1. DASHBOARD BİLEŞENİ
// ==========================================
function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10 space-y-6 md:space-y-8 pb-32 md:pb-10 animate-in fade-in duration-500 max-w-5xl mx-auto h-full flex flex-col justify-center">
      
      {/* Üst Kart */}
      <div 
        onClick={() => navigate('/workout')}
        className="w-full bg-[#d8c97f] rounded-[2rem] p-8 md:p-12 border-4 border-[#6a9433] flex flex-col items-center justify-center text-center shadow-lg cursor-pointer active:scale-95 transition-transform"
      >
        <h2 className="text-xl md:text-3xl font-extrabold uppercase tracking-wider text-[#6a9433]">Antrenman Takibi<br/>Hareketleri</h2>
      </div>

      {/* Orta Kartlar: Mobilde yan yana, Desktop'ta daha geniş */}
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        <div 
          onClick={() => navigate('/nutrition')}
          className="bg-[#d8c97f] rounded-[2rem] p-6 md:p-10 border-4 border-[#6a9433] flex items-center justify-center text-center shadow-lg cursor-pointer active:scale-95 transition-transform"
        >
          <h2 className="text-sm md:text-xl font-extrabold uppercase tracking-wider text-[#6a9433]">Beslenme<br/>/ Su Takibi</h2>
        </div>
        
        <div 
          onClick={() => navigate('/progress')}
          className="bg-[#d8c97f] rounded-[2rem] p-6 md:p-10 border-4 border-[#6a9433] flex items-center justify-center text-center shadow-lg cursor-pointer active:scale-95 transition-transform"
        >
          <h2 className="text-base md:text-xl font-extrabold uppercase tracking-wider text-[#6a9433]">Gelişim</h2>
        </div>
      </div>

      {/* Alt Kart */}
      <div 
        onClick={() => navigate('/settings')}
        className="w-full bg-[#d8c97f] rounded-[2rem] p-8 md:p-10 border-4 border-[#6a9433] flex items-center justify-center text-center shadow-lg cursor-pointer active:scale-95 transition-transform"
      >
        <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-wider text-[#6a9433]">Ayarlar</h2>
      </div>
      
    </div>
  );
}

// ==========================================
// 2. WORKOUT BİLEŞENİ
// ==========================================
const EXERCISE_LIBRARY = {
  Göğüs: ['Bench Press', 'Incline Bench Press', 'Dumbbell Bench Press', 'Pec Deck', 'Push Up'],
  Sırt: ['Pull Up', 'Lat Pulldown', 'Barbell Row', 'Machine Row', 'Deadlift'],
  Omuz: ['Overhead Press', 'Lateral Raise', 'Front Raise', 'Face Pull'],
  Bacak: ['Squat', 'Leg Press', 'Romanian Deadlift', 'Leg Extension', 'Calf Raise'],
  Kol: ['Barbell Curl', 'Hammer Curl', 'Pushdown', 'Skull Crusher'],
  Karın: ['Crunch', 'Cable Crunch', 'Hanging Leg Raise', 'Plank']
};

type SetData = { weight: string; reps: string };
type Exercise = { id: string; name: string; sets: SetData[] };

function Workout() {
  const programOptions = ['Push', 'Pull', 'Leg', 'Upper', 'Lower', 'Full Body'];
  const [activeProgram, setActiveProgram] = useState<string>('Push');
  const [routine, setRoutine] = useState<Exercise[]>([]);
  const [showLibrary, setShowLibrary] = useState(false);

  const addExercise = (name: string) => {
    const newExercise: Exercise = { id: Math.random().toString(36).substr(2, 9), name: name, sets: [{ weight: '', reps: '' }] };
    setRoutine([...routine, newExercise]);
    setShowLibrary(false);
  };

  const addSetToExercise = (exerciseId: string) => {
    setRoutine(routine.map(ex => ex.id === exerciseId ? { ...ex, sets: [...ex.sets, { weight: '', reps: '' }] } : ex));
  };

  const updateSet = (exerciseId: string, setIndex: number, field: 'weight' | 'reps', value: string) => {
    setRoutine(routine.map(ex => {
      if (ex.id === exerciseId) {
        const newSets = [...ex.sets];
        newSets[setIndex] = { ...newSets[setIndex], [field]: value };
        return { ...ex, sets: newSets };
      }
      return ex;
    }));
  };

  return (
    <div className="p-6 md:p-10 space-y-6 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#6a9433]">Antrenman</h1>
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
          {programOptions.map((prog) => (
            <button 
              key={prog} 
              onClick={() => setActiveProgram(prog)} 
              className={`flex-shrink-0 px-8 py-3 rounded-2xl font-extrabold transition-all duration-300 active:scale-95 border-2 ${
                activeProgram === prog ? 'bg-[#6a9433] text-white border-[#6a9433]' : 'bg-[#d8c97f] border-[#6a9433] text-[#6a9433]'
              }`}
            >
              {prog}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routine.map((exercise, index) => (
          <div key={exercise.id} className="bg-[#d8c97f] rounded-[2rem] p-5 shadow-lg border-2 border-[#6a9433]">
            <h3 className="text-lg font-extrabold mb-4 flex items-center justify-between text-[#6a9433]">
              <span>{index + 1}. {exercise.name}</span>
            </h3>
            <div className="grid grid-cols-4 gap-2 mb-2 px-2 text-xs font-extrabold uppercase tracking-wider text-center text-[#6a9433]">
              <div>Set</div><div className="col-span-1">kg</div><div className="col-span-1">Tekrar</div><div>Durum</div>
            </div>
            <div className="space-y-3">
              {exercise.sets.map((set, sIndex) => (
                <div key={sIndex} className="grid grid-cols-4 gap-3 items-center bg-white/50 p-2.5 rounded-xl border border-[#6a9433]/30">
                  <div className="text-center text-sm font-extrabold text-[#6a9433]">{sIndex + 1}</div>
                  <input type="number" placeholder="-" value={set.weight} onChange={(e) => updateSet(exercise.id, sIndex, 'weight', e.target.value)} className="w-full bg-white border border-[#6a9433] rounded-lg p-2 text-center text-sm font-extrabold text-[#6a9433] focus:outline-none transition-all" />
                  <input type="number" placeholder="-" value={set.reps} onChange={(e) => updateSet(exercise.id, sIndex, 'reps', e.target.value)} className="w-full bg-white border border-[#6a9433] rounded-lg p-2 text-center text-sm font-extrabold text-[#6a9433] focus:outline-none transition-all" />
                  <div className="flex justify-center"><button className="p-2 rounded-lg bg-white border border-[#6a9433] text-[#6a9433] active:scale-90 transition-all shadow-sm"><Check size={18} strokeWidth={3} /></button></div>
                </div>
              ))}
            </div>
            <button onClick={() => addSetToExercise(exercise.id)} className="mt-4 w-full py-3 rounded-xl bg-white border-2 border-[#6a9433] font-extrabold text-[#6a9433] active:scale-95 transition-all flex items-center justify-center space-x-2">
              <Plus size={18} /> <span>Set Ekle</span>
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setShowLibrary(!showLibrary)} className="w-full md:w-1/2 mx-auto py-4 rounded-[2rem] bg-[#d8c97f] border-4 border-[#6a9433] font-extrabold text-lg text-[#6a9433] shadow-xl active:scale-95 transition-all flex items-center justify-center space-x-2">
        <Plus size={24} /> <span>Hareket Ekle</span>
      </button>

      {showLibrary && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="mt-auto md:m-auto md:rounded-[2rem] bg-[#d8c97f] rounded-t-[2rem] h-[85vh] md:h-[70vh] md:w-full md:max-w-2xl flex flex-col shadow-2xl border-t-4 md:border-4 border-[#6a9433]">
            <div className="flex items-center justify-between p-6 border-b border-[#6a9433]/30">
              <h2 className="text-xl font-extrabold text-[#6a9433]">Hareket Kütüphanesi</h2>
              <button onClick={() => setShowLibrary(false)} className="p-2 bg-white text-[#6a9433] rounded-full active:scale-90 transition-all"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              {Object.entries(EXERCISE_LIBRARY).map(([category, exercises]) => (
                <div key={category}>
                  <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3 pl-2 text-[#6a9433]">{category}</h3>
                  <div className="space-y-3">
                    {exercises.map(ex => (
                      <button key={ex} onClick={() => addExercise(ex)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-[#6a9433] active:scale-95 transition-all text-left shadow-sm">
                        <span className="font-extrabold text-[#6a9433]">{ex}</span>
                        <div className="bg-[#d8c97f] p-1.5 rounded-lg shadow-sm text-[#6a9433]"><Plus size={18} strokeWidth={3} /></div>
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
// 3. PROGRESS BİLEŞENİ
// ==========================================
function Progress() {
  const metrics = ['Kilo', 'Yağ Oranı', 'Kas Oranı', 'Göğüs', 'Bel', 'Kol', 'Omuz', 'Uyluk', 'Baldır'];
  const [activeMetric, setActiveMetric] = useState('Kilo');

  const mockChartData = [
    { date: '1 Tem', value: 82.5 }, { date: '8 Tem', value: 81.8 },
    { date: '15 Tem', value: 81.0 }, { date: '22 Tem', value: 80.4 },
    { date: '29 Tem', value: 79.8 },
  ];

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#6a9433]">Gelişim</h1>
        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar">
          {metrics.map((metric) => (
            <button 
              key={metric} 
              onClick={() => setActiveMetric(metric)} 
              className={`flex-shrink-0 px-6 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 active:scale-95 border-2 border-[#6a9433] ${
                activeMetric === metric ? 'bg-[#6a9433] text-white' : 'bg-[#d8c97f] text-[#6a9433]'
              }`}
            >
              {metric}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#d8c97f] rounded-[2rem] p-6 shadow-lg border-4 border-[#6a9433]">
          <h2 className="text-lg font-extrabold mb-6 flex items-center justify-between text-[#6a9433]">
            <span>{activeMetric} Geçmişi</span>
            <span className="bg-white/60 px-3 py-1 rounded-lg text-xs font-extrabold text-[#6a9433]">Son 1 Ay</span>
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#6a9433" vertical={false} opacity={0.3} />
                <XAxis dataKey="date" stroke="#6a9433" fontSize={12} tickLine={false} axisLine={false} fontWeight={700} />
                <YAxis stroke="#6a9433" fontSize={12} tickLine={false} axisLine={false} fontWeight={700} />
                <Tooltip contentStyle={{ backgroundColor: '#d8c97f', borderRadius: '16px', border: '2px solid #6a9433', fontWeight: 'bold', color: '#6a9433' }} />
                <Line type="monotone" dataKey="value" name={activeMetric} stroke="#6a9433" strokeWidth={4} dot={{ r: 6, fill: '#fff', stroke: '#6a9433', strokeWidth: 3 }} activeDot={{ r: 8, fill: '#6a9433', stroke: '#fff', strokeWidth: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#d8c97f] rounded-[2rem] p-6 shadow-lg border-4 border-[#6a9433] h-fit space-y-4">
          <h3 className="font-extrabold text-[#6a9433]">Yeni {activeMetric} Kaydı</h3>
          <div className="flex gap-4">
            <input type="number" placeholder="Değer girin..." className="flex-1 bg-white border-2 border-[#6a9433] rounded-xl px-4 py-3 text-sm font-extrabold text-[#6a9433] focus:outline-none transition-all" />
            <button className="bg-white border-2 border-[#6a9433] text-[#6a9433] px-6 py-3 rounded-xl active:scale-95 transition-all font-extrabold shadow-md">Kaydet</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. NUTRITION BİLEŞENİ
// ==========================================
const FOOD_LIBRARY = [
  { id: '1', name: 'Tavuk Göğsü (100g)', cal: 165, p: 31, c: 0, f: 3.6 },
  { id: '2', name: 'Pirinç (100g)', cal: 130, p: 2.7, c: 28, f: 0.3 },
  { id: '3', name: 'Yumurta (1 adet)', cal: 78, p: 6, c: 0.6, f: 5 },
  { id: '4', name: 'Yulaf (100g)', cal: 389, p: 16.9, c: 66.3, f: 6.9 }
];

type FoodItem = { name: string; cal: number; p: number; c: number; f: number };
type MealsState = { [key: string]: FoodItem[] };

function Nutrition() {
  const [meals, setMeals] = useState<MealsState>({ 'Kahvaltı': [], 'Öğle': [], 'Akşam': [], 'Ara Öğün': [] });
  const [modalData, setModalData] = useState<{ isOpen: boolean; mealType: string }>({ isOpen: false, mealType: '' });
  
  const addFoodToMeal = (food: FoodItem) => {
    if (modalData.mealType) {
      setMeals(prev => ({ ...prev, [modalData.mealType]: [...prev[modalData.mealType], food] }));
    }
    setModalData({ isOpen: false, mealType: '' });
  };

  return (
    <div className="p-6 md:p-10 space-y-6 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1 text-[#6a9433]">Beslenme</h1>
        <p className="font-extrabold text-[#6a9433]">Öğünlerini takip et.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(meals).map(([mealName, foods]) => {
          const mealCals = foods.reduce((acc, curr) => acc + curr.cal, 0);
          return (
            <div key={mealName} className="bg-[#d8c97f] rounded-[2rem] p-6 shadow-lg border-4 border-[#6a9433]">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold text-[#6a9433]">{mealName}</h3>
                <span className="text-sm font-extrabold bg-white/60 text-[#6a9433] px-3 py-1 rounded-lg">{mealCals} kcal</span>
              </div>
              
              {foods.length > 0 ? (
                <div className="space-y-4 mb-5">
                  {foods.map((food, i) => (
                    <div key={i} className="flex flex-col gap-2 bg-white/60 border border-[#6a9433] p-4 rounded-xl">
                      <span className="text-sm font-extrabold text-center border-b border-[#6a9433]/20 pb-2 mb-1 text-[#6a9433]">{food.name}</span>
                      <div className="flex justify-between items-center text-xs font-extrabold w-full text-[#6a9433]">
                        <span className="bg-[#d8c97f] px-2 py-1 rounded-md border border-[#6a9433] w-1/3 text-center mx-1">Protein: {food.p}g</span>
                        <span className="bg-[#d8c97f] px-2 py-1 rounded-md border border-[#6a9433] w-1/3 text-center mx-1">Karb: {food.c}g</span>
                        <span className="bg-[#d8c97f] px-2 py-1 rounded-md border border-[#6a9433] w-1/3 text-center mx-1">Yağ: {food.f}g</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm mb-5 font-extrabold opacity-80 text-[#6a9433]">Henüz besin eklenmedi.</p>
              )}

              <button onClick={() => setModalData({ isOpen: true, mealType: mealName })} className="w-full py-3 rounded-xl bg-white border-2 border-[#6a9433] font-extrabold text-[#6a9433] active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-sm">
                <Plus size={18} strokeWidth={3} /> <span>Besin Ekle</span>
              </button>
            </div>
          );
        })}
      </div>

      {modalData.isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="mt-auto md:m-auto md:rounded-[2rem] bg-[#d8c97f] rounded-t-[2rem] h-[85vh] md:h-[70vh] md:w-full md:max-w-2xl flex flex-col shadow-2xl border-t-4 md:border-4 border-[#6a9433]">
            <div className="flex items-center justify-between p-6 border-b border-[#6a9433]/30">
              <h2 className="text-xl font-extrabold text-[#6a9433]">{modalData.mealType} - Besin Ekle</h2>
              <button onClick={() => setModalData({ isOpen: false, mealType: '' })} className="bg-white text-[#6a9433] p-2 rounded-full active:scale-90 transition-all"><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {FOOD_LIBRARY.map((food) => (
                <button key={food.id} onClick={() => addFoodToMeal(food)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border-2 border-[#6a9433] active:scale-95 transition-all text-left shadow-sm">
                  <div>
                    <p className="font-extrabold text-[#6a9433]">{food.name}</p>
                    <p className="text-xs font-extrabold mt-2 text-[#6a9433]">
                      Kalori: {food.cal} | Protein: {food.p}g | Karb: {food.c}g | Yağ: {food.f}g
                    </p>
                  </div>
                  <div className="bg-[#d8c97f] p-2 rounded-lg shadow-sm text-[#6a9433]"><Plus size={20} strokeWidth={3} /></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. WATER TRACKER BİLEŞENİ
// ==========================================
function WaterTracker() {
  const [water, setWater] = useState(0);
  const target = 3000;
  
  return (
    <div className="p-6 md:p-10 space-y-10 pb-32 md:pb-10 max-w-3xl mx-auto animate-in fade-in duration-500 flex flex-col items-center">
      <div className="w-full text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1 text-[#6a9433]">Su Takibi</h1>
        <p className="font-extrabold text-[#6a9433]">Günlük hedefine ulaşmak için su içmeyi unutma.</p>
      </div>

      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#d8c97f] border-8 border-[#6a9433] flex flex-col items-center justify-center overflow-hidden shadow-xl">
        <div className="relative z-10 flex flex-col items-center">
          <Droplets size={48} className="text-[#6a9433]" />
          <span className="text-4xl md:text-5xl font-black mt-2 text-[#6a9433]">{water}</span>
          <span className="text-sm md:text-lg font-extrabold mt-1 text-[#6a9433]">/ {target} ml</span>
        </div>
      </div>

      <div className="w-full bg-[#d8c97f] rounded-[2rem] p-6 shadow-lg border-4 border-[#6a9433]">
        <div className="grid grid-cols-2 gap-4">
          {[250, 500, 750, 1000].map(amount => (
            <button 
              key={amount} 
              onClick={() => setWater(prev => prev + amount)} 
              className="bg-white border-2 border-[#6a9433] text-[#6a9433] py-4 rounded-2xl text-lg font-extrabold active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-sm"
            >
              <Plus size={20} strokeWidth={3} /><span>{amount} ml</span>
            </button>
          ))}
        </div>
        <button onClick={() => setWater(0)} className="w-full mt-6 py-3 rounded-xl bg-white text-[#6a9433] font-extrabold active:scale-95 transition-all border-2 border-[#6a9433] shadow-sm">
          Sıfırla
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 6. SETTINGS BİLEŞENİ
// ==========================================
function Settings() {
  const [goals, setGoals] = useState({ calories: 2500, protein: 150, carbs: 300, fat: 80, water: 3000 });
  const [unit, setUnit] = useState('kg');

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-4xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1 text-[#6a9433]">Ayarlar</h1>
        <p className="font-extrabold text-[#6a9433]">Hedeflerini ve tercihlerini özelleştir.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#d8c97f] rounded-[2rem] p-6 shadow-lg border-4 border-[#6a9433] space-y-6 h-fit">
          <div className="flex items-center space-x-3 mb-2 text-[#6a9433]">
            <div className="bg-white/60 p-2 rounded-xl"><SettingsIcon size={20} /></div>
            <h2 className="text-lg font-extrabold">Genel Tercihler</h2>
          </div>
          
          <div className="flex items-center justify-between border-b border-[#6a9433]/30 pb-5">
            <div className="flex items-center space-x-3 font-extrabold text-[#6a9433]">
              <Sun size={18} /><span>Tema</span>
            </div>
            <span className="text-sm bg-white/60 text-[#6a9433] px-4 py-1.5 rounded-lg font-extrabold">Özel Renkler</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 font-extrabold text-[#6a9433]">
              <Scale size={18} /><span>Ağırlık Birimi</span>
            </div>
            <div className="flex bg-white/60 rounded-xl p-1.5 border border-[#6a9433]">
              <button onClick={() => setUnit('kg')} className={`px-5 py-1.5 text-sm font-extrabold rounded-lg transition-all ${unit === 'kg' ? 'bg-[#6a9433] text-white' : 'text-[#6a9433]'}`}>kg</button>
              <button onClick={() => setUnit('lbs')} className={`px-5 py-1.5 text-sm font-extrabold rounded-lg transition-all ${unit === 'lbs' ? 'bg-[#6a9433] text-white' : 'text-[#6a9433]'}`}>lbs</button>
            </div>
          </div>
        </div>

        <div className="bg-[#d8c97f] rounded-[2rem] p-6 shadow-lg border-4 border-[#6a9433] space-y-6">
          <div className="flex items-center space-x-3 mb-4 text-[#6a9433]">
            <div className="bg-white/60 p-2 rounded-xl"><Target size={20} /></div>
            <h2 className="text-lg font-extrabold">Günlük Hedefler</h2>
          </div>

          <div className="space-y-4">
            {[
              { label: 'Kalori (kcal)', key: 'calories' },
              { label: 'Protein (g)', key: 'protein' },
              { label: 'Karbonhidrat (g)', key: 'carbs' },
              { label: 'Yağ (g)', key: 'fat' },
              { label: 'Su (ml)', key: 'water' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between bg-white/60 p-3 rounded-2xl border border-[#6a9433]">
                <span className="text-sm font-extrabold pl-2 text-[#6a9433]">{item.label}</span>
                <input 
                  type="number" 
                  value={goals[item.key as keyof typeof goals]} 
                  onChange={(e) => setGoals({ ...goals, [item.key]: Number(e.target.value) })}
                  className="w-24 bg-white border border-[#6a9433] rounded-xl px-3 py-2 text-center text-sm font-extrabold text-[#6a9433] focus:outline-none transition-all shadow-sm"
                />
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-4 rounded-2xl bg-white border-2 border-[#6a9433] text-[#6a9433] font-extrabold text-base shadow-lg active:scale-95 transition-all">
            Ayarları Kaydet
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. ANA ÇERÇEVE (RESPONSIVE LAYOUT)
// ==========================================
function Layout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', icon: Home, label: 'Özet' },
    { path: '/workout', icon: Dumbbell, label: 'Antrenman' },
    { path: '/nutrition', icon: Utensils, label: 'Beslenme' },
    { path: '/water', icon: Droplets, label: 'Su' },
    { path: '/progress', icon: LineChartIcon, label: 'Gelişim' },
    { path: '/settings', icon: SettingsIcon, label: 'Ayarlar' },
  ];

  return (
    <div className="fixed inset-0 flex font-sans bg-[#d8c97f]">
      <GlobalStyles />
      
      {/* DESKTOP SIDEBAR (Mobilde gizli) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r-4 border-[#6a9433] bg-[#d8c97f] p-6 shadow-2xl z-10">
        <div className="mb-10 pl-2 mt-4 text-[#6a9433]">
          <h1 className="text-3xl font-black tracking-tighter">FIT<span className="opacity-70">ASSIST</span></h1>
        </div>
        
        <nav className="flex flex-col space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
            
            return (
              <NavLink 
                key={item.path} 
                to={item.path} 
                className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                  isActive ? 'bg-white shadow-md border-2 border-[#6a9433] font-extrabold text-[#6a9433]' : 'hover:bg-white/50 font-bold opacity-80 hover:opacity-100 text-[#6a9433]'
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-base tracking-wide">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* ANA İÇERİK */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-white/30">
        <div className="flex-1 overflow-y-auto w-full no-scrollbar relative z-0">
          <Outlet />
        </div>
        
        {/* MOBILE BOTTOM NAV (Desktop'ta gizli) */}
        <nav className="md:hidden absolute bottom-0 w-full bg-[#d8c97f] border-t-4 border-[#6a9433] pb-safe z-40 shadow-[0_-8px_30px_rgba(0,0,0,0.1)]">
          <div className="flex justify-between items-center px-4 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
              
              return (
                <NavLink 
                  key={item.path} 
                  to={item.path} 
                  className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 text-[#6a9433] ${
                    isActive ? 'scale-110 bg-white shadow-sm border-2 border-[#6a9433]' : 'opacity-70 active:scale-95'
                  }`}
                >
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && <span className="text-[10px] mt-1 font-extrabold tracking-wide">{item.label}</span>}
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
  return (
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
  );
}