import { useState, useEffect, useContext } from 'react';
import { Droplet, Plus, Trash2, BarChart3, Edit3 } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../context/ToastContext';
// YENİ: Yaptığımız şık pencereyi içe aktarıyoruz
import ConfirmModal from '../components/ConfirmModal';

interface WaterRecord {
  id: number;
  amount: number;
  date: string;
}

export default function Water() {
  const { themePrimary } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const { showToast } = useContext(ToastContext);

  const [waterData, setWaterData] = useState<WaterRecord[]>([]);
  const [amount, setAmount] = useState<number | ''>('');
  
  // YENİ: Silinmek üzere seçilen kaydın ID'sini tutacak State
  const [deleteId, setDeleteId] = useState<number | null>(null);
  
  const [dailyGoal, setDailyGoal] = useState<number>(() => {
    const saved = localStorage.getItem('dailyWaterGoal');
    return saved ? Number(saved) : 2500;
  });

  useEffect(() => {
    fetchWaterData();
  }, []);

  const fetchWaterData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/water/all');
      if (res.ok) {
        const data = await res.json();
        const sortedData = data.sort((a: WaterRecord, b: WaterRecord) => b.id - a.id);
        setWaterData(sortedData);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleSave = async (quickAmount?: number) => {
    const valueToAdd = quickAmount || Number(amount);
    if (!valueToAdd || valueToAdd <= 0) {
      showToast(t('alertEnterValidAmount', 'Lütfen geçerli bir miktar girin!'), 'error');
      return;
    }
    const today = new Date().toISOString().split('T')[0];
    try {
      const res = await fetch('http://localhost:8080/api/water/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: valueToAdd, date: today })
      });
      if (res.ok) {
        setAmount(''); 
        fetchWaterData(); 
        showToast(t('successSaved', 'Başarıyla eklendi!'), 'success');
      } else {
        showToast(t('serverError', 'Kayıt işlemi başarısız oldu.'), 'error');
      }
    } catch (err) {
      showToast(t('serverError', 'Sunucuya bağlanılamadı!'), 'error');
    }
  };

  // YENİ: Çöp kutusuna basınca doğrudan silmek yerine Modal'ı açmak için ID'yi kaydediyoruz
  const handleDeleteRequest = (id: number) => {
    setDeleteId(id);
  };

  // YENİ: Modal'da "Tamam" butonuna basınca asıl silme işlemini yapacak fonksiyon
  const confirmDelete = async () => {
    if (deleteId === null) return;

    try {
      const res = await fetch(`http://localhost:8080/api/water/delete/${deleteId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setWaterData(prevData => prevData.filter(record => record.id !== deleteId));
        showToast(t('successSaved', 'Başarıyla silindi!'), 'success');
      } else {
        showToast(t('serverError', 'Silme işlemi başarısız oldu.'), 'error');
      }
    } catch (err) {
      showToast(t('serverError', 'Sunucuya bağlanılamadı!'), 'error');
    } finally {
      setDeleteId(null); // İşlem bitince Modal'ı kapat
    }
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setDailyGoal(val);
    localStorage.setItem('dailyWaterGoal', val.toString());
  };

  const todayString = new Date().toISOString().split('T')[0];
  const todaysRecords = waterData.filter(r => r.date === todayString);
  const totalWaterToday = todaysRecords.reduce((sum, record) => sum + record.amount, 0);
  const progressPercent = dailyGoal > 0 ? Math.min((totalWaterToday / dailyGoal) * 100, 100) : 0;

  const last7Days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  const weeklyChartData = last7Days.map(dateStr => {
    const dailyTotal = waterData
      .filter(r => r.date === dateStr)
      .reduce((sum, r) => sum + r.amount, 0);
    const dateObj = new Date(dateStr);
    const dayName = dateObj.toLocaleDateString(i18n.language || 'tr', { weekday: 'short' });
    return { date: dateStr, dayName, total: dailyTotal };
  });

  return (
    <div className="p-6 md:p-10 space-y-6 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500 relative">
      
      {/* YENİ: Modal Bileşenimizi ekliyoruz */}
      <ConfirmModal 
        isOpen={deleteId !== null} 
        message={t('confirmDeleteWater', 'Bu su kaydını silmek istediğinize emin misiniz?')} 
        onConfirm={confirmDelete} 
        onCancel={() => setDeleteId(null)} 
      />

      <div className="flex items-center gap-3 mb-8">
        <Droplet size={36} strokeWidth={2.5} style={{ color: themePrimary }} />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1" style={{ color: themePrimary }}>
            {t('waterTitle', 'Su Takibi')}
          </h1>
          <p className="font-extrabold opacity-80">{t('waterDesc', 'Günlük su tüketimini takip et.')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-4 gap-4">
              <h3 className="text-xl font-extrabold" style={{ color: themePrimary }}>{t('dailyGoal', 'Günlük Hedef')}</h3>
              
              <div className="flex items-center justify-between w-full sm:w-fit gap-1.5 bg-white/60 px-4 py-2 rounded-xl border border-white/80 focus-within:border-blue-400 transition-all">
                <span className="font-black text-2xl whitespace-nowrap">{totalWaterToday} /</span>
                <input 
                  type="number" 
                  value={dailyGoal || ''}
                  onChange={handleGoalChange}
                  className="w-full max-w-[5rem] font-black text-2xl bg-transparent focus:outline-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  style={{ color: themePrimary }}
                />
                <span className="font-bold opacity-60 text-sm whitespace-nowrap ml-1">ml</span>
                <Edit3 size={16} className="opacity-40 shrink-0 ml-1" />
              </div>
            </div>
            
            <div className="w-full h-10 bg-white/50 rounded-2xl overflow-hidden shadow-inner border border-white/80 relative">
              <div 
                className="h-full transition-all duration-1000 ease-out flex items-center justify-end pr-4"
                style={{ width: `${progressPercent}%`, backgroundColor: themePrimary }}
              >
                {progressPercent >= 20 && <span className="text-white font-black text-xs drop-shadow-md">%{Math.round(progressPercent)}</span>}
              </div>
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
            <h3 className="text-lg font-extrabold mb-5" style={{ color: themePrimary }}>{t('addWater', 'Su Ekle')}</h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <button onClick={() => handleSave(250)} className="py-4 bg-white/60 hover:bg-white rounded-2xl border border-white/80 active:scale-95 transition-all shadow-sm flex flex-col items-center gap-2 group">
                <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors"><Droplet size={20} className="text-blue-500" fill="currentColor" /></div>
                <div className="flex flex-col items-center"><span className="text-sm font-black">{t('customAmount', '1 Bardak')}</span><span className="text-[10px] font-bold opacity-60">250 ml</span></div>
              </button>
              
              <button onClick={() => handleSave(500)} className="py-4 bg-white/60 hover:bg-white rounded-2xl border border-white/80 active:scale-95 transition-all shadow-sm flex flex-col items-center gap-2 group">
                <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors"><Droplet size={24} className="text-blue-500" fill="currentColor" /></div>
                <div className="flex flex-col items-center"><span className="text-sm font-black">{t('customAmount', '2 Bardak')}</span><span className="text-[10px] font-bold opacity-60">500 ml</span></div>
              </button>

              <button onClick={() => handleSave(750)} className="py-4 bg-white/60 hover:bg-white rounded-2xl border border-white/80 active:scale-95 transition-all shadow-sm flex flex-col items-center gap-2 group">
                <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors"><Droplet size={28} className="text-blue-500" fill="currentColor" /></div>
                <div className="flex flex-col items-center"><span className="text-sm font-black">{t('customAmount', '3 Bardak')}</span><span className="text-[10px] font-bold opacity-60">750 ml</span></div>
              </button>

              <button onClick={() => handleSave(1000)} className="py-4 bg-white/60 hover:bg-white rounded-2xl border border-white/80 active:scale-95 transition-all shadow-sm flex flex-col items-center gap-2 group">
                <div className="p-3 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors"><Droplet size={32} className="text-blue-500" fill="currentColor" /></div>
                <div className="flex flex-col items-center"><span className="text-sm font-black">{t('customAmount', '1 Şişe')}</span><span className="text-[10px] font-bold opacity-60">1000 ml</span></div>
              </button>
            </div>

            <div className="flex gap-2">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value) || '')}
                placeholder="Özel miktar (Örn: 300)"
                className="w-full bg-white border border-white/80 rounded-xl px-4 py-3 font-black focus:outline-none transition-all shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <button 
                onClick={() => handleSave()}
                className="px-6 rounded-xl bg-white hover:bg-white/90 border border-white/80 font-black active:scale-95 transition-all shadow-sm flex items-center justify-center"
                style={{ color: themePrimary }}
              >
                <Plus size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 size={20} style={{ color: themePrimary }} />
              <h3 className="text-lg font-extrabold" style={{ color: themePrimary }}>{t('weeklyAnalysis', 'Haftalık Analiz')}</h3>
            </div>
            
            <div className="flex items-end justify-between h-40 gap-2 border-b border-black/10 pb-2">
              {weeklyChartData.map((day, idx) => {
                const heightPercent = dailyGoal > 0 ? Math.min((day.total / dailyGoal) * 100, 100) : 0;
                const isToday = day.date === todayString;
                
                return (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <span className="text-[10px] font-bold opacity-60 mb-1" title={`${day.total} ml`}>
                      {day.total > 0 ? `${(day.total/1000).toFixed(1)}L` : ''}
                    </span>
                    <div className="w-full max-w-[2rem] h-28 flex flex-col justify-end">
                      <div 
                        className={`w-full rounded-md transition-all duration-700 ease-out ${isToday ? 'bg-blue-500 shadow-md' : 'bg-blue-300 opacity-70'}`}
                        style={{ height: `${heightPercent}%`, minHeight: day.total > 0 ? '10%' : '0%' }}
                      ></div>
                    </div>
                    <span className={`mt-2 text-[10px] uppercase font-black ${isToday ? 'text-blue-600' : 'opacity-50'}`}>
                      {day.dayName}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
            <h4 className="font-extrabold opacity-80 mb-4">{t('todayRecords', 'Bugünkü Kayıtlar')}</h4>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2 no-scrollbar">
              {todaysRecords.length > 0 ? (
                todaysRecords.map((record) => (
                  <div key={record.id} className="flex items-center justify-between bg-white/60 p-4 rounded-2xl border border-white/80 shadow-sm transition-all hover:bg-white/80">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full shadow-sm">
                        <Droplet size={18} className="text-blue-500" fill="currentColor" />
                      </div>
                      <p className="font-extrabold text-lg">{record.amount} ml</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteRequest(record.id)} // DÜZELTME: Doğrudan silmek yerine Modal'ı tetikliyor
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-600 active:scale-90 transition-all shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 opacity-60">
                  <p className="font-bold">{t('noWaterData', 'Bugün hiç su kaydı eklemedin.')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}