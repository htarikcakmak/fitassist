import { useState, useEffect, useContext } from 'react';
import { Dumbbell, Plus, Trash2, History, CalendarCheck } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../context/ToastContext';
// 1. ADIM: Özel pencere bileşenimizi (modal) içe aktarıyoruz
import ConfirmModal from '../components/ConfirmModal';
import { fetchWithAuth } from '../utils/api';

interface WorkoutRecord {
  id: number;
  exerciseName: string;
  category: string; 
  weight: number;
  sets: number;
  reps: number;
  date: string;
}

export default function Workout() {
  const { themePrimary } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  
  const { showToast } = useContext(ToastContext);

  const [workouts, setWorkouts] = useState<WorkoutRecord[]>([]);
  const [exerciseName, setExerciseName] = useState('');
  const [weight, setWeight] = useState<number | ''>('');
  const [sets, setSets] = useState<number | ''>('');
  const [reps, setReps] = useState<number | ''>('');
  
  const [category, setCategory] = useState<string>('Push');
  const [activeTab, setActiveTab] = useState<'today' | 'history'>('today');

  // 2. ADIM: Silinmek istenen kaydın ID'sini tutacak State
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    fetchWithAuthWorkouts();
  }, []);

  const fetchWithAuthWorkouts = async () => {
    try {
      const res = await fetchWithAuth('http://localhost:8080/api/workout/all');
      if (res.ok) {
        const data = await res.json();
        const sortedData = data.sort((a: WorkoutRecord, b: WorkoutRecord) => b.id - a.id);
        setWorkouts(sortedData);
      }
    } catch (err) {
      console.error("fetchWithAuth error:", err);
    }
  };

  const handleSave = async () => {
    if (!exerciseName || weight === '' || sets === '' || reps === '' || !category) {
      showToast(t('alertFillAll', 'Lütfen tüm alanları doldurun ve bir kategori seçin!'), 'error'); 
      return;
    }

    const payload = {
      exerciseName,
      category, 
      weight: Number(weight),
      sets: Number(sets),
      reps: Number(reps),
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const res = await fetchWithAuth('http://localhost:8080/api/workout/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok || res.status === 200 || res.status === 201) {
        setExerciseName('');
        setWeight('');
        setSets('');
        setReps('');
        fetchWithAuthWorkouts();
        setActiveTab('today');
        showToast(t('successSaved', 'Başarıyla kaydedildi!'), 'success');
      } else {
        fetchWithAuthWorkouts();
        showToast(t('alertServerError', 'Kayıt sırasında bir uyarı oluştu.'), 'info');
      }
    } catch (err) {
      console.error("Add error:", err);
      showToast(t('serverError', 'Sunucuya bağlanılamadı!'), 'error');
    }
  };

  // 3. ADIM: Çöp kutusuna basıldığında doğrudan silmek yerine Modal'ı açmak için ID'yi kaydet
  const handleDeleteRequest = (id: number) => {
    setDeleteId(id);
  };

  // 4. ADIM: Modal'da "Tamam" butonuna basılınca çalışacak asıl silme fonksiyonu
  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      const res = await fetch(`http://localhost:8080/api/workout/delete/${deleteId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setWorkouts(prev => prev.filter(w => w.id !== deleteId));
        showToast(t('successSaved', 'Başarıyla silindi!'), 'success');
      } else {
        showToast(t('serverError', 'Silme işlemi başarısız oldu.'), 'error');
      }
    } catch (err) {
      console.error("Delete error:", err);
      showToast(t('serverError', 'Sunucu hatası!'), 'error');
    } finally {
      // İşlem bitince Modal'ı kapat
      setDeleteId(null);
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Push': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Pull': return 'bg-red-100 text-red-700 border-red-200';
      case 'Leg': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const todayString = new Date().toISOString().split('T')[0];
  const todaysWorkouts = workouts.filter(w => w.date === todayString);
  const historyWorkouts = workouts.filter(w => w.date !== todayString);

  const groupedHistory = historyWorkouts.reduce((acc, curr) => {
    if (!acc[curr.date]) acc[curr.date] = [];
    acc[curr.date].push(curr);
    return acc;
  }, {} as Record<string, WorkoutRecord[]>);

  const sortedHistoryDates = Object.keys(groupedHistory).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  return (
    <div className="p-6 md:p-10 space-y-6 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500 relative">
      
      {/* YENİ: Uyarı Penceremiz. deleteId doluysa ekranda belirir */}
      <ConfirmModal 
        isOpen={deleteId !== null} 
        message={t('confirmDeleteWorkout', 'Bu antrenmanı silmek istediğinize emin misiniz?')} 
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteId(null)} 
      />

      <div className="flex items-center gap-3 mb-8">
        <Dumbbell size={36} strokeWidth={2.5} style={{ color: themePrimary }} />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1" style={{ color: themePrimary }}>
            {t('workoutTitle', 'Antrenman')}
          </h1>
          <p className="font-extrabold opacity-80">{t('workoutDesc', 'Bugünkü programını seç ve setlerini kaydet.')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* SOL PANEL */}
        <div className="lg:col-span-5 bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 h-fit space-y-4">
          <h3 className="text-xl font-extrabold mb-4" style={{ color: themePrimary }}>{t('addWorkout', 'Hareket Ekle')}</h3>
          
          <div className="flex gap-2 bg-white/50 p-1.5 rounded-2xl border border-white/60 mb-4">
            {['Push', 'Pull', 'Leg'].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-1 py-2 rounded-xl text-sm font-black transition-all ${category === cat ? 'bg-white shadow-sm scale-[1.02]' : 'opacity-60 hover:opacity-100'}`}
                style={{ color: category === cat ? themePrimary : 'inherit' }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-extrabold opacity-80">{t('exerciseName', 'Hareket Adı')}</label>
            <input 
              type="text" 
              value={exerciseName}
              onChange={(e) => setExerciseName(e.target.value)}
              placeholder={t('exerciseNamePlaceholder', 'Örn: Bench Press')}
              className="w-full bg-white border border-white/80 rounded-xl px-4 py-3 font-bold focus:outline-none transition-all shadow-inner"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-extrabold opacity-80">{t('weightKg', 'Ağırlık (kg)')}</label>
              <input 
                type="number" 
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value) || '')}
                placeholder="60"
                className="w-full bg-white border border-white/80 rounded-xl px-4 py-3 font-bold focus:outline-none transition-all shadow-inner text-center"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-extrabold opacity-80">{t('sets', 'Set')}</label>
              <input 
                type="number" 
                value={sets}
                onChange={(e) => setSets(Number(e.target.value) || '')}
                placeholder="3"
                className="w-full bg-white border border-white/80 rounded-xl px-4 py-3 font-bold focus:outline-none transition-all shadow-inner text-center"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-extrabold opacity-80">{t('reps', 'Tekrar')}</label>
            <input 
              type="number" 
              value={reps}
              onChange={(e) => setReps(Number(e.target.value) || '')}
              placeholder="10"
              className="w-full bg-white border border-white/80 rounded-xl px-4 py-3 font-bold focus:outline-none transition-all shadow-inner text-center"
            />
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-4 mt-2 rounded-xl bg-white hover:bg-white/90 border border-white/80 font-black text-lg active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
            style={{ color: themePrimary }}
          >
            <Plus size={20} strokeWidth={3} /> {t('saveBtn', 'Kaydet')}
          </button>
        </div>

        {/* SAĞ PANEL */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex bg-white/40 p-1.5 rounded-2xl border border-white/60 shadow-sm">
            <button
              onClick={() => setActiveTab('today')}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-extrabold transition-all duration-300 ${activeTab === 'today' ? 'bg-white shadow-sm scale-[1.02]' : 'opacity-60 hover:opacity-100'}`}
              style={{ color: activeTab === 'today' ? themePrimary : 'inherit' }}
            >
              <CalendarCheck size={20} /> {t('todaysWorkouts', 'Bugünkü Antrenmanlar')}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-extrabold transition-all duration-300 ${activeTab === 'history' ? 'bg-white shadow-sm scale-[1.02]' : 'opacity-60 hover:opacity-100'}`}
              style={{ color: activeTab === 'history' ? themePrimary : 'inherit' }}
            >
              <History size={20} /> {t('history', 'Geçmişi')}
            </button>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 min-h-[400px]">
            {activeTab === 'today' && (
              <div className="space-y-3 animate-in fade-in slide-in-from-right-4 duration-500">
                {todaysWorkouts.length > 0 ? (
                  todaysWorkouts.map((workout) => (
                    <div key={workout.id} className="flex items-center justify-between bg-white/60 p-4 rounded-2xl border border-white/80 shadow-sm transition-all hover:bg-white/80">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="font-extrabold text-lg">{workout.exerciseName}</p>
                          <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${getCategoryColor(workout.category)}`}>
                            {workout.category}
                          </span>
                        </div>
                        <div className="flex gap-2 text-sm font-black opacity-80">
                          <span className="bg-white/50 px-3 py-1 rounded-lg border border-white/40">{workout.weight} kg</span>
                          <span className="bg-white/50 px-3 py-1 rounded-lg border border-white/40">{workout.sets} {t('sets', 'Set')}</span>
                          <span className="bg-white/50 px-3 py-1 rounded-lg border border-white/40">{workout.reps} {t('repsShort', 'Tkr')}</span>
                        </div>
                      </div>
                      
                      {/* DÜZELTME: Doğrudan silmek yerine pencereyi tetikliyor */}
                      <button onClick={() => handleDeleteRequest(workout.id)} className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-600 active:scale-90 transition-all shrink-0 ml-4">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-16 opacity-60">
                    <p className="font-bold">{t('noWorkoutData', 'Bugün henüz hareket eklemedin.')}</p>
                    <p className="text-sm mt-1">{t('addWorkoutPrompt', 'Hemen yandaki formdan ilk hareketini gir!')}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'history' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-500 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
                {sortedHistoryDates.length > 0 ? (
                  sortedHistoryDates.map(date => {
                    const dateObj = new Date(date);
                    const formattedDate = dateObj.toLocaleDateString(i18n.language || 'tr', { weekday: 'long', day: 'numeric', month: 'long' });
                    
                    return (
                      <div key={date} className="space-y-3">
                        <div className="flex items-center gap-2 border-b border-black/10 pb-2 mb-3">
                          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: themePrimary }}></div>
                          <h4 className="font-black text-sm uppercase opacity-70 tracking-wider">{formattedDate}</h4>
                        </div>
                        
                        {groupedHistory[date].map(workout => (
                          <div key={workout.id} className="flex items-center justify-between bg-white/40 p-4 rounded-2xl border border-white/60 shadow-sm">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1.5">
                                <p className="font-extrabold text-base opacity-90">{workout.exerciseName}</p>
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${getCategoryColor(workout.category)}`}>
                                  {workout.category}
                                </span>
                              </div>
                              <div className="flex gap-2 text-xs font-bold opacity-70">
                                <span className="bg-white/40 px-2 py-1 rounded-md">{workout.weight} kg</span>
                                <span className="bg-white/40 px-2 py-1 rounded-md">{workout.sets} {t('sets', 'Set')}</span>
                                <span className="bg-white/40 px-2 py-1 rounded-md">{workout.reps} {t('repsShort', 'Tkr')}</span>
                              </div>
                            </div>
                            
                            {/* DÜZELTME: Doğrudan silmek yerine pencereyi tetikliyor */}
                            <button onClick={() => handleDeleteRequest(workout.id)} className="p-2.5 bg-red-500/5 hover:bg-red-500/10 rounded-lg text-red-500 active:scale-90 transition-all shrink-0 ml-4">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-16 opacity-60">
                    <p className="font-bold">Geçmişe ait hiçbir antrenman kaydı bulunamadı.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}