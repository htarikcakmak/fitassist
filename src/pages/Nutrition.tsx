import { useState, useEffect, useContext } from 'react';
import { Plus, X, Search, ChevronLeft, Minus, Beef, Wheat, Droplet, Utensils, BarChart3, Trash2 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { FOOD_LIBRARY } from '../data/foodLibrary';
import type { FoodItem } from '../data/foodLibrary';
import { useTranslation } from 'react-i18next'; 

type MealsState = { [key: string]: FoodItem[] };

export default function Nutrition() {
  const [meals, setMeals] = useState<MealsState>({ 'Kahvaltı': [], 'Öğle': [], 'Akşam': [] });
  const [modalData, setModalData] = useState<{ isOpen: boolean; mealType: string }>({ isOpen: false, mealType: '' });
  const [searchTerm, setSearchTerm] = useState('');
  
  const [activeMacroFilter, setActiveMacroFilter] = useState<string | null>(null);
  
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState<number>(0);

  const { themeBg, themePrimary } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  // --- DİNAMİK GRAFİK HESAPLAMALARI ---
  const todayMacros = { p: 0, c: 0, f: 0 };
  Object.values(meals).forEach(mealFoods => {
    mealFoods.forEach(food => {
      todayMacros.p += food.p;
      todayMacros.c += food.c;
      todayMacros.f += food.f;
    });
  });

  const totalP = Number(todayMacros.p.toFixed(1));
  const totalC = Number(todayMacros.c.toFixed(1));
  const totalF = Number(todayMacros.f.toFixed(1));
  const totalCalories = Math.round((totalP * 4) + (totalC * 4) + (totalF * 9));

  const pPercent = totalCalories > 0 ? ((totalP * 4) / totalCalories) * 100 : 0;
  const cPercent = totalCalories > 0 ? ((totalC * 4) / totalCalories) * 100 : 0;
  const fPercent = totalCalories > 0 ? ((totalF * 9) / totalCalories) * 100 : 0;


  // 1. VERİLERİ ÇEKME (READ)
  useEffect(() => {
    fetch('http://localhost:8080/api/nutrition/today')
      .then(res => res.json())
      .then(data => {
        const loadedMeals: MealsState = { 'Kahvaltı': [], 'Öğle': [], 'Akşam': [] };
        
        const cleanedData = data.filter((item: any) => {
          if (item.date) return /^\d{4}-\d{2}-\d{2}/.test(item.date);
          return true; 
        });

        cleanedData.forEach((item: any) => {
          if (loadedMeals[item.mealName]) {
            loadedMeals[item.mealName].push({
              id: item.id?.toString() || Math.random().toString(),
              name: item.foodName,
              cal: item.calories,
              p: item.protein,
              c: item.carbs,
              f: item.fats,
              unit: 'adet',
              baseAmount: 1
            });
          }
        });
        setMeals(loadedMeals);
      })
      .catch(err => console.error("Besinleri çekme hatası:", err));
  }, []);

  const handleFoodSelect = (food: FoodItem) => {
    setSelectedFood(food);
    setQuantity(food.unit === 'gram' ? 100 : 1);
  };

  // 2. YENİ BESİN EKLEME (CREATE)
  const confirmAndAddFood = () => {
    if (!selectedFood || !modalData.mealType) return;

    const ratio = quantity / selectedFood.baseAmount;
    const calculatedFood = {
      ...selectedFood,
      name: `${selectedFood.name} (${quantity} ${selectedFood.unit})`,
      cal: Math.round(selectedFood.cal * ratio),
      p: Number((selectedFood.p * ratio).toFixed(1)),
      c: Number((selectedFood.c * ratio).toFixed(1)),
      f: Number((selectedFood.f * ratio).toFixed(1))
    };

    const payload = {
      mealName: modalData.mealType,
      foodName: calculatedFood.name,
      calories: calculatedFood.cal,
      protein: calculatedFood.p,
      carbs: calculatedFood.c,
      fats: calculatedFood.f
    };

    fetch('http://localhost:8080/api/nutrition/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept-Language': i18n.language || 'tr' },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      const responsePayload = await res.json();
      if (!res.ok) throw new Error(responsePayload.message || 'Sunucu hatası');
      return { payload: responsePayload, addedFoodId: responsePayload.data?.id };
    })
    .then(({ payload, addedFoodId }) => {
      const foodWithRealId = { ...calculatedFood, id: addedFoodId?.toString() || calculatedFood.id };
      setMeals(prev => ({ ...prev, [modalData.mealType]: [...prev[modalData.mealType], foodWithRealId] }));
      closeModal();
    })
    .catch(err => {
      console.error("Besin ekleme hatası:", err);
      alert(err.message);
    });
  };

  // 3. YENİ EKLENEN SİLME İŞLEMİ (DELETE)
  const handleDeleteFood = async (mealName: string, foodId: string) => {
    if (!window.confirm("Bu besini silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/nutrition/delete/${foodId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setMeals(prev => ({
          ...prev,
          [mealName]: prev[mealName].filter(food => food.id !== foodId)
        }));
      } else {
        alert("Besin silinemedi. Lütfen tekrar deneyin.");
      }
    } catch (err) {
      console.error("Besin silinirken hata:", err);
    }
  };

  const closeModal = () => {
    setModalData({ isOpen: false, mealType: '' });
    setSearchTerm('');
    setActiveMacroFilter(null);
    setSelectedFood(null);
  };

  const getDominantMacro = (food: FoodItem) => {
    const max = Math.max(food.p, food.c, food.f);
    if (max === food.p) return { label: t('highProtein', 'Yüksek Protein'), color: 'bg-red-100 text-red-700' };
    if (max === food.c) return { label: t('highCarbs', 'Yüksek Karb'), color: 'bg-blue-100 text-blue-700' };
    return { label: t('highFat', 'Yüksek Yağ'), color: 'bg-yellow-100 text-yellow-700' };
  };

  const filteredFoods = FOOD_LIBRARY.filter(food => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (!activeMacroFilter) return true;

    const maxMacro = Math.max(food.p, food.c, food.f);
    if (activeMacroFilter === 'Protein' && maxMacro === food.p) return true;
    if (activeMacroFilter === 'Karb' && maxMacro === food.c) return true;
    if (activeMacroFilter === 'Yağ' && maxMacro === food.f) return true;
    
    return false;
  });

  return (
    <div className="p-6 md:p-10 space-y-6 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      {/* BAŞLIK */}
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">{t('nutritionTitle', 'Beslenme')}</h1>
        <p className="font-extrabold opacity-80">{t('nutritionDesc', 'Hedefine ulaşmak için ana öğünlerini takip et.')}</p>
      </div>

      {/* ÖĞÜN KARTLARI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(meals).map(([mealName, foods]) => {
          const mealCals = foods.reduce((acc, curr) => acc + curr.cal, 0);
          return (
            <div key={mealName} className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold">{t(mealName, mealName)}</h3>
                <span className="text-sm font-extrabold bg-white/60 px-3 py-1 rounded-lg" style={{ color: themePrimary }}>{mealCals} kcal</span>
              </div>

              {foods.length > 0 ? (
                <div className="space-y-4 mb-5">
                  {foods.map((food, i) => (
                    <div key={i} className="flex flex-col gap-2 bg-white/60 border border-white/80 p-4 rounded-xl shadow-sm">
                      
                      {/* DÜZELTME: SİLME BUTONU VE BAŞLIK TASARIMI */}
                      <div className="flex justify-between items-start border-b border-white/50 pb-2 mb-1 gap-2">
                        {/* Soldaki görünmez boşluk: Metnin sağdaki butona rağmen tam ortalanmasını sağlar */}
                        <div className="w-8 shrink-0"></div>
                        
                        {/* Yiyecek İsmi: Satır atladığında ezilmemesi için leading-snug eklendi */}
                        <span className="text-sm font-extrabold text-center flex-1 leading-snug self-center">
                          {food.name}
                        </span>
                        
                        {/* Silme Butonu: absolute kaldırıldı, shrink-0 ile küçülerek ezilmesi engellendi */}
                        <button 
                          onClick={() => handleDeleteFood(mealName, food.id)}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 hover:text-red-600 rounded-lg transition-all shrink-0 self-center"
                          title="Besini Sil"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center text-xs font-extrabold w-full opacity-80">
                        <span className="bg-white/40 px-2 py-1 rounded-md w-1/3 text-center mx-1">{t('proteinShort', 'P')}: {food.p}g</span>
                        <span className="bg-white/40 px-2 py-1 rounded-md w-1/3 text-center mx-1">{t('carbsShort', 'K')}: {food.c}g</span>
                        <span className="bg-white/40 px-2 py-1 rounded-md w-1/3 text-center mx-1">{t('fatShort', 'Y')}: {food.f}g</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm mb-5 font-bold opacity-60">{t('noFoodAdded', 'Henüz besin eklenmedi.')}</p>
              )}

              <button onClick={() => setModalData({ isOpen: true, mealType: mealName })} className="w-full py-3 rounded-xl bg-white/60 hover:bg-white border border-white/80 font-extrabold active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-sm">
                <Plus size={18} strokeWidth={3} /> <span>{t('addFoodBtn', 'Besin Ekle')}</span>
              </button>
            </div>
          );
        })}
      </div>

      {/* DİNAMİK MAKRO GRAFİĞİ */}
      <div className="w-full bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/50 p-2 rounded-xl">
              <Utensils size={24} strokeWidth={2.5} color={themePrimary} />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">{t('macroDistribution', 'Makro Dağılımı')}</h2>
          </div>
          
          <div className="flex gap-4 text-xs font-bold opacity-80">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div> {t('protein', 'Protein')}</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> {t('fat', 'Yağ')}</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-700"></div> {t('carbsLong', 'Karb')}</div>
          </div>
        </div>

        {totalCalories > 0 ? (
          <div className="flex justify-center items-end h-64 md:h-72 gap-4 pb-2">
            <div className="flex flex-col items-center animate-in slide-in-from-bottom-4 duration-500">
              <span className="text-xs font-extrabold opacity-60 mb-2">{totalCalories} kcal</span>
              
              <div className="w-16 md:w-20 h-48 flex flex-col justify-end rounded-t-xl overflow-hidden bg-white/20 border-x border-t border-white/50 shadow-inner">
                <div style={{ height: `${pPercent}%` }} className="bg-blue-500 w-full transition-all duration-700 ease-out" title={`Protein: ${totalP * 4} kcal`}></div>
                <div style={{ height: `${fPercent}%` }} className="bg-yellow-400 w-full transition-all duration-700 ease-out" title={`Yağ: ${totalF * 9} kcal`}></div>
                <div style={{ height: `${cPercent}%` }} className="bg-amber-700 w-full transition-all duration-700 ease-out" title={`Karb: ${totalC * 4} kcal`}></div>
              </div>

              <span className="mt-3 font-black text-base border-b-2" style={{ borderColor: themePrimary }}>
                {t('todayText', 'Bugün')}
              </span>

              <div className="flex flex-col items-center mt-2 text-xs md:text-sm font-bold opacity-80 gap-0.5">
                <span className="text-blue-600 dark:text-blue-500">{totalP}g {t('proteinShort', 'P')}</span>
                <span className="text-amber-800 dark:text-amber-700">{totalC}g {t('carbsShort', 'C')}</span>
                <span className="text-yellow-600 dark:text-yellow-500">{totalF}g {t('fatShort', 'Y')}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 opacity-60 text-center animate-in fade-in">
            <BarChart3 size={48} className="mb-4" />
            <p className="font-extrabold text-lg">{t('noGraphData', 'Grafik oluşturmak için öğünlerine besin ekle.')}</p>
          </div>
        )}

      </div>

      {/* MODAL KISMI */}
      {modalData.isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="rounded-t-[2.5rem] h-[90vh] flex flex-col shadow-2xl border-t border-white/50 animate-in slide-in-from-bottom-full duration-400 max-w-2xl mx-auto w-full" style={{ backgroundColor: themeBg }}>
            
            {selectedFood ? (
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center mb-8 gap-4">
                  <button onClick={() => setSelectedFood(null)} className="p-2 bg-white/50 rounded-full active:scale-90 transition-all">
                    <ChevronLeft size={20} color={themePrimary} />
                  </button>
                  <h2 className="text-2xl font-extrabold flex-1 text-center pr-10">{t('setAmount', 'Miktar Belirle')}</h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-black mb-2">{selectedFood.name}</h3>
                    {selectedFood.info && (
                      <p className="text-sm font-bold opacity-70 bg-white/40 p-3 rounded-xl border border-white/50">
                        💡 {selectedFood.info}
                      </p>
                    )}
                  </div>

                  <div className="bg-white/60 border border-white/80 p-6 rounded-[2rem] shadow-sm flex flex-col items-center w-full max-w-xs">
                    {selectedFood.unit === 'adet' ? (
                      <div className="flex items-center gap-6">
                        <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 bg-white rounded-full shadow-sm active:scale-90"><Minus size={24} color={themePrimary} /></button>
                        <span className="text-5xl font-black">{quantity}</span>
                        <button onClick={() => setQuantity(quantity + 1)} className="p-3 bg-white rounded-full shadow-sm active:scale-90"><Plus size={24} color={themePrimary} /></button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <input 
                          type="number" 
                          value={quantity} 
                          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                          className="w-32 bg-white text-center text-4xl font-black border-2 rounded-2xl py-2 focus:outline-none"
                          style={{ borderColor: themePrimary }}
                        />
                        <span className="text-2xl font-bold opacity-70">{t('gram', 'gram')}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between w-full max-w-xs bg-white/40 p-4 rounded-2xl border border-white/60">
                    <div className="text-center"><p className="text-xs font-bold opacity-70">{t('calories', 'Kalori')}</p><p className="font-black">{Math.round(selectedFood.cal * (quantity / selectedFood.baseAmount))} kcal</p></div>
                    <div className="text-center"><p className="text-xs font-bold opacity-70">{t('protein', 'Protein')}</p><p className="font-black">{Number((selectedFood.p * (quantity / selectedFood.baseAmount)).toFixed(1))}g</p></div>
                    <div className="text-center"><p className="text-xs font-bold opacity-70">{t('carbs', 'Karb')}</p><p className="font-black">{Number((selectedFood.c * (quantity / selectedFood.baseAmount)).toFixed(1))}g</p></div>
                    <div className="text-center"><p className="text-xs font-bold opacity-70">{t('fat', 'Yağ')}</p><p className="font-black">{Number((selectedFood.f * (quantity / selectedFood.baseAmount)).toFixed(1))}g</p></div>
                  </div>
                </div>

                <button onClick={confirmAndAddFood} className="w-full py-4 rounded-2xl bg-white/60 hover:bg-white border border-white/80 font-black text-lg active:scale-95 transition-all shadow-sm">
                  {t('addToMealBtn', 'Öğüne Ekle')}
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col p-6 border-b border-white/20 gap-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-extrabold">{t(modalData.mealType, modalData.mealType)} - {t('selectFood', 'Besin Seç')}</h2>
                    <button onClick={closeModal} className="p-2 bg-white/50 rounded-full active:scale-90 transition-all"><X size={20} color={themePrimary} /></button>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search size={18} color={themePrimary} className="opacity-70" />
                    </div>
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={t('searchFoodPlaceholder', 'Besin ara... (Örn: Tavuk, Yulaf)')} 
                      className="w-full bg-white/60 border border-white/80 rounded-xl pl-11 pr-4 py-3 text-sm font-extrabold focus:outline-none transition-all placeholder-current opacity-80"
                    />
                  </div>

                  <div className="flex gap-2 mt-1">
                    <button 
                      onClick={() => setActiveMacroFilter(activeMacroFilter === 'Protein' ? null : 'Protein')}
                      className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-extrabold transition-all border ${activeMacroFilter === 'Protein' ? 'bg-red-500 text-white border-red-600 shadow-md' : 'bg-white/50 border-white/50 opacity-70 hover:opacity-100'}`}
                    >
                      <Beef size={14} /> {t('protein', 'Protein')}
                    </button>
                    <button 
                      onClick={() => setActiveMacroFilter(activeMacroFilter === 'Karb' ? null : 'Karb')}
                      className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-[10px] sm:text-xs font-extrabold transition-all border ${activeMacroFilter === 'Karb' ? 'bg-blue-500 text-white border-blue-600 shadow-md' : 'bg-white/50 border-white/50 opacity-70 hover:opacity-100'}`}
                    >
                      <Wheat size={14} /> {t('carbsLong', 'Karbonhidrat')}
                    </button>
                    <button 
                      onClick={() => setActiveMacroFilter(activeMacroFilter === 'Yağ' ? null : 'Yağ')}
                      className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-extrabold transition-all border ${activeMacroFilter === 'Yağ' ? 'bg-yellow-500 text-white border-yellow-600 shadow-md' : 'bg-white/50 border-white/50 opacity-70 hover:opacity-100'}`}
                    >
                      <Droplet size={14} /> {t('fat', 'Yağ')}
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                  {filteredFoods.length > 0 ? (
                    filteredFoods.map((food) => {
                      const macroBadge = getDominantMacro(food);
                      return (
                        <button key={food.id} onClick={() => handleFoodSelect(food)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 active:scale-95 transition-all text-left shadow-sm">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <p className="font-bold">{food.name}</p>
                              <span className={`text-[10px] font-black px-2 py-1 rounded-md ${macroBadge.color}`}>
                                {macroBadge.label}
                              </span>
                            </div>
                            <p className="text-xs font-bold opacity-70">
                              {food.baseAmount} {t(food.unit, food.unit)} : {food.cal} kcal | P: {food.p}g | K: {food.c}g | Y: {food.f}g
                            </p>
                          </div>
                          <div className="bg-white/50 p-2 rounded-full ml-2"><Plus size={20} strokeWidth={3} color={themePrimary} /></div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="text-center py-10 opacity-60 font-bold">
                      {t('noFoodFound', 'Bu kritere uygun besin bulunamadı.')}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}