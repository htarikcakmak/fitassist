import { useState, useEffect, useContext } from 'react';
import { Plus, X, Search, ChevronLeft, Minus, Beef, Wheat, Droplet, Utensils, BarChart3, Trash2, Edit3 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { FOOD_LIBRARY } from '../data/foodLibrary';
import type { FoodItem } from '../data/foodLibrary';
import { useTranslation } from 'react-i18next'; 
import { ToastContext } from '../context/ToastContext';
import { fetchWithAuth } from '../utils/api';
import { Loader } from '../components/Loader';

type MealsState = { [key: string]: FoodItem[] };

export default function Nutrition() {
  const [meals, setMeals] = useState<MealsState>({ 'Kahvaltı': [], 'Öğle': [], 'Akşam': [] });
  const [modalData, setModalData] = useState<{ isOpen: boolean; mealType: string }>({ isOpen: false, mealType: '' });
  const [searchTerm, setSearchTerm] = useState('');
  
  const [activeMacroFilter, setActiveMacroFilter] = useState<string | null>(null);
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [quantity, setQuantity] = useState<number>(0);
  
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const [modalTab, setModalTab] = useState<'library' | 'custom'>('library');
  const [customFood, setCustomFood] = useState({ name: '', cal: '', p: '', c: '', f: '' });

  const { themeBg, themePrimary } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const { showToast } = useContext(ToastContext);

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

  useEffect(() => {
    fetchWithAuth('https://fitassist-backend.onrender.com/api/nutrition/today')
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
              unit: 'piece',
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

  // GÜNCELLENMİŞ: Akıllı Zamanlayıcı (Smart Timeout) İçeren Kaydetme Fonksiyonu
  const saveFoodToBackend = (calculatedFood: any) => {
    setIsLoading(true);
    setLoadingMessage(t('saving', { defaultValue: 'Kaydediliyor...' }));

    // Sunucu uykudaysa (cevap 3 saniyeden uzun sürerse) kullanıcıyı bilgilendir
    const wakeUpTimeout = setTimeout(() => {
      setLoadingMessage(t('serverWakingUp', { defaultValue: 'Sunucu uykudan uyanıyor, bu işlem 30-40 saniye sürebilir. Lütfen bekleyin...' }));
    }, 3000);

    const payload = {
      mealName: modalData.mealType,
      foodName: calculatedFood.name,
      calories: calculatedFood.cal,
      protein: calculatedFood.p,
      carbs: calculatedFood.c,
      fats: calculatedFood.f
    };

    fetchWithAuth('https://fitassist-backend.onrender.com/api/nutrition/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept-Language': i18n.language || 'tr' },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      const responsePayload = await res.json();
      if (!res.ok) throw new Error(responsePayload.message || 'Sunucu hatası');
      return { payload: responsePayload, addedFoodId: responsePayload.data?.id };
    })
    .then(({ addedFoodId }) => {
      const foodWithRealId = { ...calculatedFood, id: addedFoodId?.toString() || calculatedFood.id };
      setMeals(prev => ({ ...prev, [modalData.mealType]: [...prev[modalData.mealType], foodWithRealId] }));
      closeModal();
      showToast(t('successSaved', { defaultValue: 'Başarıyla eklendi!' }), 'success');
    })
    .catch(err => {
      console.error("Besin ekleme hatası:", err);
      showToast(t('serverError', { defaultValue: 'Sunucuya bağlanılamadı!' }), 'error');
    })
    .finally(() => {
      clearTimeout(wakeUpTimeout); // İşlem bittiğinde kronometreyi iptal et
      setIsLoading(false); // Yükleme ekranını kapat
    });
  };

  const confirmAndAddFood = () => {
    if (!selectedFood || !modalData.mealType) return;

    const ratio = quantity / selectedFood.baseAmount;
    const translatedName = t(`food_${selectedFood.id}`, { defaultValue: selectedFood.name });
    const translatedUnit = t(selectedFood.unit, { defaultValue: selectedFood.unit });

    const calculatedFood = {
      ...selectedFood,
      name: `${translatedName} (${quantity} ${translatedUnit})`,
      cal: Math.round(selectedFood.cal * ratio),
      p: Number((selectedFood.p * ratio).toFixed(1)),
      c: Number((selectedFood.c * ratio).toFixed(1)),
      f: Number((selectedFood.f * ratio).toFixed(1))
    };

    saveFoodToBackend(calculatedFood);
  };

  const handleAddCustomFood = () => {
    if (!customFood.name || !customFood.cal) {
      showToast(t('fillRequiredFields', { defaultValue: 'Lütfen isim ve kalori alanlarını doldurun!' }), 'error');
      return;
    }

    const calculatedFood = {
      id: Math.random().toString(),
      name: customFood.name,
      cal: parseInt(customFood.cal) || 0,
      p: parseFloat(customFood.p) || 0,
      c: parseFloat(customFood.c) || 0,
      f: parseFloat(customFood.f) || 0,
      unit: 'piece',
      baseAmount: 1
    };

    saveFoodToBackend(calculatedFood);
  };

  const handleDeleteFood = async (mealName: string, foodId: string) => {
    if (!window.confirm("Bu besini silmek istediğinize emin misiniz?")) return;

    // Silme işlemi için de Loader'ı aktif edelim
    setIsLoading(true);
    setLoadingMessage(t('deleting', { defaultValue: 'Siliniyor...' }));

    const wakeUpTimeout = setTimeout(() => {
      setLoadingMessage(t('serverWakingUp', { defaultValue: 'Sunucu uykudan uyanıyor, bu işlem 30-40 saniye sürebilir. Lütfen bekleyin...' }));
    }, 3000);

    try {
      const res = await fetchWithAuth(`https://fitassist-backend.onrender.com/api/nutrition/delete/${foodId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setMeals(prev => ({
          ...prev,
          [mealName]: prev[mealName].filter(food => food.id !== foodId)
        }));
        showToast(t('successSaved', { defaultValue: 'Başarıyla silindi!' }), 'success');
      } else {
        showToast(t('serverError', { defaultValue: 'Besin silinemedi. Lütfen tekrar deneyin.' }), 'error');
      }
    } catch (err) {
      console.error("Besin silinirken hata:", err);
      showToast(t('serverError', { defaultValue: 'Sunucu hatası!' }), 'error');
    } finally {
      clearTimeout(wakeUpTimeout);
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setModalData({ isOpen: false, mealType: '' });
    setSearchTerm('');
    setActiveMacroFilter(null);
    setSelectedFood(null);
    setModalTab('library');
    setCustomFood({ name: '', cal: '', p: '', c: '', f: '' });
  };

  const getDominantMacro = (food: FoodItem) => {
    const max = Math.max(food.p, food.c, food.f);
    if (max === food.p) return { label: t('highProtein', { defaultValue: 'Yüksek Protein' }), color: 'bg-red-100 text-red-700' };
    if (max === food.c) return { label: t('highCarbs', { defaultValue: 'Yüksek Karb' }), color: 'bg-blue-100 text-blue-700' };
    return { label: t('highFat', { defaultValue: 'Yüksek Yağ' }), color: 'bg-yellow-100 text-yellow-700' };
  };

  const filteredFoods = FOOD_LIBRARY.filter(food => {
    const translatedName = t(`food_${food.id}`, { defaultValue: food.name });
    const matchesSearch = translatedName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (!activeMacroFilter) return true;

    const maxMacro = Math.max(food.p, food.c, food.f);
    if (activeMacroFilter === 'Protein' && maxMacro === food.p) return true;
    if (activeMacroFilter === 'Karb' && maxMacro === food.c) return true;
    if (activeMacroFilter === 'Yağ' && maxMacro === food.f) return true;
    
    return false;
  });

  // EĞER İŞLEM SÜRÜYORSA LOADER BİLEŞENİNİ GÖSTER
  if (isLoading) {
    return <Loader message={loadingMessage} />;
  }

  return (
    <div className="p-6 md:p-10 space-y-6 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">{t('nutritionTitle', { defaultValue: 'Beslenme' })}</h1>
        <p className="font-extrabold opacity-80">{t('nutritionDesc', { defaultValue: 'Hedefine ulaşmak için ana öğünlerini takip et.' })}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(meals).map(([mealName, foods]) => {
          const mealCals = foods.reduce((acc, curr) => acc + curr.cal, 0);
          return (
            <div key={mealName} className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-extrabold">{t(mealName, { defaultValue: mealName })}</h3>
                <span className="text-sm font-extrabold bg-white/60 px-3 py-1 rounded-lg" style={{ color: themePrimary }}>{mealCals} kcal</span>
              </div>

              {foods.length > 0 ? (
                <div className="space-y-4 mb-5">
                  {foods.map((food, i) => (
                    <div key={i} className="flex flex-col gap-2 bg-white/60 border border-white/80 p-4 rounded-xl shadow-sm">
                      
                      <div className="flex justify-between items-start border-b border-white/50 pb-2 mb-1 gap-2">
                        <div className="w-8 shrink-0"></div>
                        
                        <span className="text-sm font-extrabold text-center flex-1 leading-snug self-center">
                          {food.name}
                        </span>
                        
                        <button 
                          onClick={() => handleDeleteFood(mealName, food.id)}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 hover:text-red-600 rounded-lg transition-all shrink-0 self-center"
                          title="Besini Sil"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="flex justify-between items-center text-xs font-extrabold w-full opacity-80">
                        <span className="bg-white/40 px-2 py-1 rounded-md w-1/3 text-center mx-1">{t('proteinShort', { defaultValue: 'P' })}: {food.p}g</span>
                        <span className="bg-white/40 px-2 py-1 rounded-md w-1/3 text-center mx-1">{t('carbsShort', { defaultValue: 'K' })}: {food.c}g</span>
                        <span className="bg-white/40 px-2 py-1 rounded-md w-1/3 text-center mx-1">{t('fatShort', { defaultValue: 'Y' })}: {food.f}g</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm mb-5 font-bold opacity-60">{t('noFoodAdded', { defaultValue: 'Henüz besin eklenmedi.' })}</p>
              )}

              <button onClick={() => setModalData({ isOpen: true, mealType: mealName })} className="w-full py-3 rounded-xl bg-white/60 hover:bg-white border border-white/80 font-extrabold active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-sm">
                <Plus size={18} strokeWidth={3} /> <span>{t('addFoodBtn', { defaultValue: 'Besin Ekle' })}</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="w-full bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/50 p-2 rounded-xl">
              <Utensils size={24} strokeWidth={2.5} color={themePrimary} />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">{t('macroDistribution', { defaultValue: 'Makro Dağılımı' })}</h2>
          </div>
          
          <div className="flex flex-wrap gap-3 md:gap-4 text-xs font-bold opacity-80">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 shrink-0 rounded-full bg-blue-500"></div> {t('protein', { defaultValue: 'Protein' })}</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 shrink-0 rounded-full bg-yellow-400"></div> {t('fat', { defaultValue: 'Yağ' })}</div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 shrink-0 rounded-full bg-amber-700"></div> {t('carbsLong', { defaultValue: 'Karb' })}</div>
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
                {t('todayText', { defaultValue: 'Bugün' })}
              </span>

              <div className="flex flex-col items-center mt-2 text-xs md:text-sm font-bold opacity-80 gap-0.5">
                <span className="text-blue-600 dark:text-blue-500">{totalP}g {t('proteinShort', { defaultValue: 'P' })}</span>
                <span className="text-amber-800 dark:text-amber-700">{totalC}g {t('carbsShort', { defaultValue: 'C' })}</span>
                <span className="text-yellow-600 dark:text-yellow-500">{totalF}g {t('fatShort', { defaultValue: 'Y' })}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 opacity-60 text-center animate-in fade-in">
            <BarChart3 size={48} className="mb-4" />
            <p className="font-extrabold text-lg">{t('noGraphData', { defaultValue: 'Grafik oluşturmak için öğünlerine besin ekle.' })}</p>
          </div>
        )}

      </div>

      {modalData.isOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="rounded-t-[2.5rem] h-[90vh] flex flex-col shadow-2xl border-t border-white/50 animate-in slide-in-from-bottom-full duration-400 max-w-2xl mx-auto w-full" style={{ backgroundColor: themeBg }}>
            
            {!selectedFood && (
              <div className="flex flex-col p-6 border-b border-white/20 gap-4">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-extrabold">{t(modalData.mealType, { defaultValue: modalData.mealType })}</h2>
                  <button onClick={closeModal} className="p-2 bg-white/50 rounded-full active:scale-90 transition-all"><X size={20} color={themePrimary} /></button>
                </div>
                
                <div className="flex bg-white/40 p-1.5 rounded-2xl">
                  <button 
                    onClick={() => setModalTab('library')} 
                    className={`flex-1 py-2.5 rounded-xl text-sm font-extrabold transition-all ${modalTab === 'library' ? 'bg-white shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                  >
                    {t('libraryTab', { defaultValue: 'Kütüphane' })}
                  </button>
                  <button 
                    onClick={() => setModalTab('custom')} 
                    className={`flex-1 py-2.5 rounded-xl text-sm font-extrabold transition-all flex items-center justify-center gap-1 ${modalTab === 'custom' ? 'bg-white shadow-sm' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <Edit3 size={16} /> {t('customTab', { defaultValue: 'Kendin Ekle' })}
                  </button>
                </div>
              </div>
            )}

            {selectedFood ? (
              <div className="flex flex-col h-full p-6">
                <div className="flex items-center mb-8 gap-4">
                  <button onClick={() => setSelectedFood(null)} className="p-2 bg-white/50 rounded-full active:scale-90 transition-all">
                    <ChevronLeft size={20} color={themePrimary} />
                  </button>
                  <h2 className="text-2xl font-extrabold flex-1 text-center pr-10">{t('setAmount', { defaultValue: 'Miktar Belirle' })}</h2>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-black mb-2">{t(`food_${selectedFood.id}`, { defaultValue: selectedFood.name })}</h3>
                    {selectedFood.info && (
                      <p className="text-sm font-bold opacity-70 bg-white/40 p-3 rounded-xl border border-white/50">
                        💡 {t(`info_${selectedFood.id}`, { defaultValue: selectedFood.info })}
                      </p>
                    )}
                  </div>

                  <div className="bg-white/60 border border-white/80 p-6 rounded-[2rem] shadow-sm flex flex-col items-center w-full max-w-xs">
                    {selectedFood.unit === 'piece' ? ( 
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
                        <span className="text-2xl font-bold opacity-70">{t('gram', { defaultValue: 'gram' })}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between w-full max-w-xs bg-white/40 p-4 rounded-2xl border border-white/60">
                    <div className="text-center"><p className="text-xs font-bold opacity-70">{t('calories', { defaultValue: 'Kalori' })}</p><p className="font-black">{Math.round(selectedFood.cal * (quantity / selectedFood.baseAmount))} kcal</p></div>
                    <div className="text-center"><p className="text-xs font-bold opacity-70">{t('protein', { defaultValue: 'Protein' })}</p><p className="font-black">{Number((selectedFood.p * (quantity / selectedFood.baseAmount)).toFixed(1))}g</p></div>
                    <div className="text-center"><p className="text-xs font-bold opacity-70">{t('carbs', { defaultValue: 'Karb' })}</p><p className="font-black">{Number((selectedFood.c * (quantity / selectedFood.baseAmount)).toFixed(1))}g</p></div>
                    <div className="text-center"><p className="text-xs font-bold opacity-70">{t('fat', { defaultValue: 'Yağ' })}</p><p className="font-black">{Number((selectedFood.f * (quantity / selectedFood.baseAmount)).toFixed(1))}g</p></div>
                  </div>
                </div>

                <button onClick={confirmAndAddFood} className="w-full py-4 rounded-2xl bg-white/60 hover:bg-white border border-white/80 font-black text-lg active:scale-95 transition-all shadow-sm">
                  {t('addToMealBtn', { defaultValue: 'Öğüne Ekle' })}
                </button>
              </div>

            ) : modalTab === 'library' ? (
              <>
                <div className="px-6 pb-4 border-b border-white/20">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search size={18} color={themePrimary} className="opacity-70" />
                    </div>
                    <input 
                      type="text" 
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={t('searchFoodPlaceholder', { defaultValue: 'Besin ara... (Örn: Tavuk, Yulaf)' })} 
                      className="w-full bg-white/60 border border-white/80 rounded-xl pl-11 pr-4 py-3 text-sm font-extrabold focus:outline-none transition-all placeholder-current opacity-80"
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button onClick={() => setActiveMacroFilter(activeMacroFilter === 'Protein' ? null : 'Protein')} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-extrabold transition-all border ${activeMacroFilter === 'Protein' ? 'bg-red-500 text-white border-red-600 shadow-md' : 'bg-white/50 border-white/50 opacity-70'}`}><Beef size={14} /> {t('protein', { defaultValue: 'Protein' })}</button>
                    <button onClick={() => setActiveMacroFilter(activeMacroFilter === 'Karb' ? null : 'Karb')} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-extrabold transition-all border ${activeMacroFilter === 'Karb' ? 'bg-blue-500 text-white border-blue-600 shadow-md' : 'bg-white/50 border-white/50 opacity-70'}`}><Wheat size={14} /> {t('carbsLong', { defaultValue: 'Karb' })}</button>
                    <button onClick={() => setActiveMacroFilter(activeMacroFilter === 'Yağ' ? null : 'Yağ')} className={`flex-1 flex items-center justify-center gap-1 py-2 rounded-lg text-xs font-extrabold transition-all border ${activeMacroFilter === 'Yağ' ? 'bg-yellow-500 text-white border-yellow-600 shadow-md' : 'bg-white/50 border-white/50 opacity-70'}`}><Droplet size={14} /> {t('fat', { defaultValue: 'Yağ' })}</button>
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
                              <p className="font-bold">{t(`food_${food.id}`, { defaultValue: food.name })}</p>
                              <span className={`text-[10px] font-black px-2 py-1 rounded-md ${macroBadge.color}`}>{macroBadge.label}</span>
                            </div>
                            <p className="text-xs font-bold opacity-70">{food.baseAmount} {t(food.unit, { defaultValue: food.unit })} : {food.cal} kcal | P: {food.p}g | K: {food.c}g | Y: {food.f}g</p>
                          </div>
                          <div className="bg-white/50 p-2 rounded-full ml-2"><Plus size={20} strokeWidth={3} color={themePrimary} /></div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="text-center py-10 opacity-60 font-bold">{t('noFoodFound', { defaultValue: 'Besin bulunamadı.' })}</div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col h-full p-6 animate-in fade-in duration-300">
                <div className="flex-1 flex flex-col space-y-4">
                  <div className="text-center mb-2">
                    <h3 className="text-xl font-extrabold">{t('addCustomFoodTitle', { defaultValue: 'Kendi Besinini Oluştur' })}</h3>
                    <p className="text-xs font-bold opacity-70">{t('addCustomFoodDesc', { defaultValue: 'Yediğin yemeğin değerlerini manuel gir.' })}</p>
                  </div>

                  <div className="space-y-4 bg-white/40 p-6 rounded-2xl border border-white/60">
                    <div>
                      <label className="text-xs font-black opacity-70 ml-1">{t('customFoodName', { defaultValue: 'Yemek Adı (*)' })}</label>
                      <input type="text" value={customFood.name} onChange={e => setCustomFood({...customFood, name: e.target.value})} placeholder={t('customFoodPlaceholder', { defaultValue: 'Örn: Ev Yapımı Kek' })} className="w-full mt-1 bg-white border border-white/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2" style={{ borderColor: themePrimary }} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-black opacity-70 ml-1">{t('calories', { defaultValue: 'Kalori (*)' })}</label>
                        <input type="number" value={customFood.cal} onChange={e => setCustomFood({...customFood, cal: e.target.value})} placeholder="0" className="w-full mt-1 bg-white border border-white/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none text-center" />
                      </div>
                      <div>
                        <label className="text-xs font-black opacity-70 ml-1">{t('protein', { defaultValue: 'Protein (g)' })}</label>
                        <input type="number" value={customFood.p} onChange={e => setCustomFood({...customFood, p: e.target.value})} placeholder="0" className="w-full mt-1 bg-white border border-white/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none text-center" />
                      </div>
                      <div>
                        <label className="text-xs font-black opacity-70 ml-1">{t('carbs', { defaultValue: 'Karb (g)' })}</label>
                        <input type="number" value={customFood.c} onChange={e => setCustomFood({...customFood, c: e.target.value})} placeholder="0" className="w-full mt-1 bg-white border border-white/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none text-center" />
                      </div>
                      <div>
                        <label className="text-xs font-black opacity-70 ml-1">{t('fat', { defaultValue: 'Yağ (g)' })}</label>
                        <input type="number" value={customFood.f} onChange={e => setCustomFood({...customFood, f: e.target.value})} placeholder="0" className="w-full mt-1 bg-white border border-white/80 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none text-center" />
                      </div>
                    </div>
                  </div>
                </div>

                <button onClick={handleAddCustomFood} className="w-full py-4 mt-4 rounded-2xl bg-white/60 hover:bg-white border border-white/80 font-black text-lg active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2">
                  <Plus size={20} /> {t('addToMealBtn', { defaultValue: 'Öğüne Ekle' })}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}