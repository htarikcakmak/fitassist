import { useState, useContext } from 'react';
import { Plus, X } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const FOOD_LIBRARY = [
  { id: '1', name: 'Yumurta (1 adet)', cal: 78, p: 6, c: 0.6, f: 5 },
  { id: '2', name: 'Avokado (Yarım)', cal: 160, p: 2, c: 9, f: 15 },
  { id: '3', name: 'Kefir (1 Bardak)', cal: 104, p: 8, c: 12, f: 2.5 },
  { id: '4', name: 'Tavuk Döner Dürüm', cal: 450, p: 35, c: 45, f: 15 },
  { id: '5', name: 'Yulaf (100g)', cal: 389, p: 16.9, c: 66.3, f: 6.9 }
];

type FoodItem = { name: string; cal: number; p: number; c: number; f: number };
type MealsState = { [key: string]: FoodItem[] };

export default function Nutrition() {
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