import { useState, useEffect, useContext } from 'react';
import { Plus, X, Search } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { FOOD_LIBRARY } from '../data/foodLibrary';
import type { FoodItem } from '../data/foodLibrary';

type MealsState = { [key: string]: FoodItem[] };

export default function Nutrition() {
  const [meals, setMeals] = useState<MealsState>({ 'Kahvaltı': [], 'Öğle': [], 'Akşam': [] });
  const [modalData, setModalData] = useState<{ isOpen: boolean; mealType: string }>({ isOpen: false, mealType: '' });
  // ARAMA ÇUBUĞU İÇİN STATE EKLENDİ
  const [searchTerm, setSearchTerm] = useState('');
  const { themeBg, themePrimary } = useContext(ThemeContext);

  useEffect(() => {
    fetch('http://localhost:8080/api/nutrition/today')
      .then(res => res.json())
      .then(data => {
        const loadedMeals: MealsState = { 'Kahvaltı': [], 'Öğle': [], 'Akşam': [] };
        data.forEach((item: any) => {
          if (loadedMeals[item.mealName]) {
            loadedMeals[item.mealName].push({
              id: item.id?.toString() || Math.random().toString(),
              name: item.foodName,
              cal: item.calories,
              p: item.protein,
              c: item.carbs,
              f: item.fats
            });
          }
        });
        setMeals(loadedMeals);
      })
      .catch(err => console.error("Besinleri çekme hatası:", err));
  }, []);

  const addFoodToMeal = (food: FoodItem) => {
    if (!modalData.mealType) return;

    const payload = {
      mealName: modalData.mealType,
      foodName: food.name,
      calories: food.cal,
      protein: food.p,
      carbs: food.c,
      fats: food.f
    };

    fetch('http://localhost:8080/api/nutrition/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(() => {
      setMeals(prev => ({ ...prev, [modalData.mealType]: [...prev[modalData.mealType], food] }));
      setModalData({ isOpen: false, mealType: '' });
      setSearchTerm(''); // Ekleme sonrası aramayı sıfırla
    })
    .catch(err => console.error("Besin ekleme hatası:", err));
  };

  // MAKRO SINIFLANDIRMA FONKSİYONU
  const getDominantMacro = (food: FoodItem) => {
    const max = Math.max(food.p, food.c, food.f);
    if (max === food.p) return { label: 'Yüksek Protein', color: 'bg-red-100 text-red-700' };
    if (max === food.c) return { label: 'Yüksek Karb', color: 'bg-blue-100 text-blue-700' };
    return { label: 'Yüksek Yağ', color: 'bg-yellow-100 text-yellow-700' };
  };

  // ARAMA FİLTRESİ
  const filteredFoods = FOOD_LIBRARY.filter(food => 
    food.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-10 space-y-6 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Beslenme</h1>
        <p className="font-extrabold opacity-80">Hedefine ulaşmak için ana öğünlerini takip et.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      {/* BESİN EKLEME PENCERESİ */}
      {modalData.isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="rounded-t-[2.5rem] h-[90vh] flex flex-col shadow-2xl border-t border-white/50 animate-in slide-in-from-bottom-full duration-400 max-w-2xl mx-auto w-full" style={{ backgroundColor: themeBg }}>
            
            <div className="flex flex-col p-6 border-b border-white/20 gap-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-extrabold">{modalData.mealType} - Besin Seç</h2>
                <button onClick={() => { setModalData({ isOpen: false, mealType: '' }); setSearchTerm(''); }} className="p-2 bg-white/50 rounded-full active:scale-90 transition-all"><X size={20} color={themePrimary} /></button>
              </div>
              
              {/* ARAMA ÇUBUĞU */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search size={18} color={themePrimary} className="opacity-70" />
                </div>
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Besin ara... (Örn: Tavuk, Yulaf)" 
                  className="w-full bg-white/60 border border-white/80 rounded-xl pl-11 pr-4 py-3 text-sm font-extrabold focus:outline-none transition-all placeholder-current opacity-80"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
              {filteredFoods.length > 0 ? (
                filteredFoods.map((food) => {
                  const macroBadge = getDominantMacro(food);
                  return (
                    <button key={food.id} onClick={() => addFoodToMeal(food)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 active:scale-95 transition-all text-left shadow-sm">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <p className="font-bold">{food.name}</p>
                          <span className={`text-[10px] font-black px-2 py-1 rounded-md ${macroBadge.color}`}>
                            {macroBadge.label}
                          </span>
                        </div>
                        <p className="text-xs font-bold opacity-70">
                          Kalori: {food.cal} | Protein: {food.p}g | Karb: {food.c}g | Yağ: {food.f}g
                        </p>
                      </div>
                      <div className="bg-white/50 p-2 rounded-full ml-2"><Plus size={20} strokeWidth={3} color={themePrimary} /></div>
                    </button>
                  );
                })
              ) : (
                <div className="text-center py-10 opacity-60 font-bold">
                  Aradığınız besin bulunamadı.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}