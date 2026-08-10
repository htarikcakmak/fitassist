import { useState, useEffect, useContext } from 'react';
import { LineChart as LineChartIcon, Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

// Gelen verinin yapısı
interface ProgressRecord {
  id: number;
  date: string;
  weight: number;
}

export default function Progress() {
  const { themePrimary } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const [progressData, setProgressData] = useState<ProgressRecord[]>([]);
  const [weight, setWeight] = useState<number | ''>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/progress/all');
      if (res.ok) {
        const data = await res.json();
        // LİSTE İÇİN: Yeniden -> Eskiye. (Aynı günse son eklenen üstte kalsın)
        const sortedData = data.sort((a: ProgressRecord, b: ProgressRecord) => {
          const timeDiff = new Date(b.date).getTime() - new Date(a.date).getTime();
          if (timeDiff !== 0) return timeDiff;
          return b.id - a.id; 
        });
        setProgressData(sortedData);
      }
    } catch (err) {
      console.error("Kilo verileri çekilemedi:", err);
    }
  };

  const handleSave = async () => {
    if (!weight || weight <= 0) {
      alert(t('enterValue', 'Değer girin...'));
      return;
    }

    try {
      const res = await fetch('http://localhost:8080/api/progress/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ weight: Number(weight), date: date })
      });

      if (res.ok) {
        setWeight(''); 
        fetchProgressData(); 
      }
    } catch (err) {
      console.error("Kilo eklenirken hata:", err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Bu ölçüm kaydını silmek istediğinize emin misiniz?")) return;

    try {
      const res = await fetch(`http://localhost:8080/api/progress/delete/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        setProgressData(prevData => prevData.filter(record => record.id !== id));
      } else {
        alert("Silme işlemi başarısız oldu.");
      }
    } catch (err) {
      console.error("Kilo kaydı silinirken hata:", err);
    }
  };

  // --- GRAFİK HESAPLAMALARI ---
  
  // 1. ZAMAN TÜNELİ: Eskiden -> Yeniye. (Aynı günse ilk eklenen solda kalsın)
  const chartData = [...progressData].sort((a, b) => {
    const timeDiff = new Date(a.date).getTime() - new Date(b.date).getTime();
    if (timeDiff !== 0) return timeDiff;
    return a.id - b.id;
  });
  
  // 2. NEFES PAYI VE ORAN
  const weights = chartData.map(d => d.weight);
  const maxWeight = weights.length > 0 ? Math.max(...weights) : 100;
  const minWeight = weights.length > 0 ? Math.min(...weights) : 0;
  const rawRange = maxWeight - minWeight;
  
  const buffer = rawRange === 0 ? 5 : rawRange * 0.2; 
  const displayMin = minWeight - buffer;
  const displayMax = maxWeight + buffer;
  const displayRange = displayMax - displayMin;

  const paddingX = 10; // Kenar boşluğu (Yüzde olarak)

  return (
    <div className="p-6 md:p-10 space-y-6 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      
      <div className="flex items-center gap-3 mb-8">
        <LineChartIcon size={36} strokeWidth={2.5} style={{ color: themePrimary }} />
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1" style={{ color: themePrimary }}>
            {t('progressTitle', 'Gelişim Takibi')}
          </h1>
          <p className="font-extrabold opacity-80">{t('progressDesc', 'Ölçümlerini gir, grafiği oluştur.')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* SOL PANEL */}
        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 h-fit">
          <h3 className="text-xl font-extrabold mb-6" style={{ color: themePrimary }}>{t('newWeightRecord', 'Yeni Kilo Kaydı')}</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-extrabold opacity-80">{t('weight', 'Kilo')} (kg)</label>
              <div className="relative">
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value) || '')}
                  placeholder={t('enterValue', 'Değer girin...')}
                  className="w-full bg-white border border-white/80 rounded-xl px-4 py-4 text-xl font-black focus:outline-none transition-all shadow-inner text-center"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-extrabold opacity-80">{t('dateText', 'Tarih:')}</label>
              <div className="relative">
                <CalendarIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" color={themePrimary} />
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/60 border border-white/80 rounded-xl pl-12 pr-4 py-3 font-bold focus:outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <button 
              onClick={handleSave}
              className="w-full py-4 mt-2 rounded-xl bg-white hover:bg-white/90 border border-white/80 font-black text-lg active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2"
              style={{ color: themePrimary }}
            >
              <Plus size={20} strokeWidth={3} /> {t('saveBtn', 'Kaydet')}
            </button>
          </div>
        </div>

        {/* SAĞ PANEL */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 flex flex-col h-full">
            <h3 className="text-xl font-extrabold mb-6" style={{ color: themePrimary }}>{t('weightHistory', 'Kilo Geçmişi')}</h3>
            
            {chartData.length > 0 ? (
              <div className="w-full h-48 md:h-56 mb-8 relative border-b border-black/10 pb-4 pt-4">
                
                {/* viewBox TAMAMEN KALDIRILDI. Koordinatlar yüzdelik (%) olarak işleniyor */}
                <svg className="w-full h-full overflow-visible">
                  
                  {/* Arka plan referans çizgileri */}
                  <line x1="0%" y1="20%" x2="100%" y2="20%" stroke="currentColor" strokeWidth="1" className="opacity-20" strokeDasharray="4" />
                  <line x1="0%" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="1" className="opacity-20" strokeDasharray="4" />
                  <line x1="0%" y1="80%" x2="100%" y2="80%" stroke="currentColor" strokeWidth="1" className="opacity-20" strokeDasharray="4" />
                  
                  {/* Dinamik Çizgi Grafiği (Segmentler halinde çiziliyor) */}
                  {chartData.map((d, i) => {
                    if (i === chartData.length - 1) return null; // Son nokta ise çizgi çizilmez
                    
                    const nextD = chartData[i + 1];
                    
                    const x1 = chartData.length > 1 ? paddingX + (i / (chartData.length - 1)) * (100 - 2 * paddingX) : 50;
                    const y1 = 80 - (((d.weight - displayMin) / displayRange) * 60);
                    
                    const x2 = paddingX + ((i + 1) / (chartData.length - 1)) * (100 - 2 * paddingX);
                    const y2 = 80 - (((nextD.weight - displayMin) / displayRange) * 60);

                    return (
                      <line 
                        key={`line-${i}`}
                        x1={`${x1}%`} y1={`${y1}%`} 
                        x2={`${x2}%`} y2={`${y2}%`} 
                        stroke={themePrimary} 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                        className="transition-all duration-700 ease-in-out"
                      />
                    );
                  })}
                  
                  {/* Kusursuz Geometrik Noktalar (Circles) ve Metinler */}
                  {chartData.map((d, i) => {
                    const x = chartData.length > 1 ? paddingX + (i / (chartData.length - 1)) * (100 - 2 * paddingX) : 50;
                    const y = 80 - (((d.weight - displayMin) / displayRange) * 60);
                    return (
                      <g key={`point-${i}`}>
                        {/* r="6" tam olarak 6 piksel yarıçap demektir. Asla bozulmaz/esnemez. */}
                        <circle 
                          cx={`${x}%`} cy={`${y}%`} 
                          r="6" 
                          fill="white" 
                          stroke={themePrimary} 
                          strokeWidth="3.5" 
                          className="transition-all duration-700 ease-in-out cursor-pointer hover:opacity-80" 
                        />
                        <text 
                          x={`${x}%`} y={`calc(${y}% - 14px)`} 
                          fontSize="13" 
                          fill="currentColor" 
                          fontWeight="bold" 
                          textAnchor="middle" 
                          className="opacity-80"
                        >
                          {d.weight}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            ) : (
              <div className="h-48 md:h-56 mb-8 flex items-center justify-center border-b border-black/10">
                <div className="text-center opacity-60">
                  <p className="font-bold">{t('noDataLine1', 'Henüz veri yok.')}</p>
                  <p className="text-sm">{t('noDataLine2', 'İlk ölçümünü yandaki formdan ekle!')}</p>
                </div>
              </div>
            )}

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2 no-scrollbar">
              {progressData.length > 0 && progressData.map((record) => {
                const dateObj = new Date(record.date);
                const formattedDate = dateObj.toLocaleDateString(i18n.language || 'tr', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
                
                return (
                  <div key={record.id} className="flex items-center justify-between bg-white/60 p-4 rounded-2xl border border-white/80 shadow-sm transition-all hover:bg-white/80">
                    <div>
                      <p className="font-extrabold text-lg">{record.weight} kg</p>
                      <p className="text-xs font-bold opacity-60">{formattedDate}</p>
                    </div>
                    
                    <button 
                      onClick={() => handleDelete(record.id)}
                      className="p-3 bg-red-500/10 hover:bg-red-500/20 rounded-xl text-red-600 active:scale-90 transition-all"
                      title="Kaydı Sil"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}