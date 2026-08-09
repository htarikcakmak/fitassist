import { useState, useEffect, useContext } from 'react';
import { Plus, Moon, CalendarDays, ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';
import { useTranslation } from 'react-i18next';

type SleepLog = {
  id?: number;
  date: string; 
  hours: number;
};

export default function Sleep() {
  const [logs, setLogs] = useState<SleepLog[]>([]);
  
  const todayString = new Date().toISOString().split('T')[0];
  
  const [date, setDate] = useState(todayString); 
  const [hours, setHours] = useState('');
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const { themeBg, themePrimary } = useContext(ThemeContext);
  
  // Çeviri fonksiyonunu ve mevcut dili aktifleştiriyoruz
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:8080/api/sleep/all')
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) setLogs(data);
      })
      .catch(err => console.log("Arka plan kapalı, yerel veriler kullanılıyor."));
  }, []);

  const handleSaveSleep = () => {
    if (!date || !hours) {
      alert(t('alertEnterSleepTime', 'Lütfen uyku süresini gir!'));
      return;
    }

    const formattedDate = new Date(date).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' });

    const newLog = {
      date: formattedDate,
      hours: parseFloat(hours)
    };

    fetch('http://localhost:8080/api/sleep/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // YENİ: Arka plana seçili dili gönderiyoruz
        'Accept-Language': i18n.language || 'tr'
      },
      body: JSON.stringify(newLog)
    })
    .then(async (res) => {
      // YENİ: Hata durumlarını ve yeni paket yapısını JSON olarak okuyoruz
      const responsePayload = await res.json();
      
      if (!res.ok) {
        throw new Error(responsePayload.message || 'Sunucu hatası');
      }
      return responsePayload;
    })
    .then(responsePayload => {
      // YENİ: Arka plandan gelen başarı mesajını ekranda gösteriyoruz
      alert(responsePayload.message);

      // Veritabanına kaydedilen veriyi ekrana yansıtıyoruz
      setLogs([...logs, newLog]);
      setHours('');
      setDate(todayString);
      setShowDatePicker(false);
    })
    .catch(err => {
      console.error("Uyku ekleme hatası:", err);
      // Hata mesajını ekranda gösteriyoruz
      alert(err.message);
    });
  };

  const getBarColor = (hours: number) => {
    if (hours >= 7) return '#10b981'; 
    if (hours >= 6) return '#f59e0b'; 
    return '#ef4444'; 
  };

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight flex items-center gap-3">
          <Moon size={32} color={themePrimary} /> {t('sleepTitle', 'Uyku Takibi')}
        </h1>
        <p className="font-medium opacity-80 mt-1">{t('sleepDesc', 'Uyku düzenini takip et ve analiz et.')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div className="lg:col-span-1 bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 flex flex-col h-fit">
          <h2 className="text-lg font-extrabold mb-6">{t('addSleepRecord', 'Uyku Kaydı Ekle')}</h2>
          
          <div className="space-y-6">
            
            <div>
              <label className="text-sm font-extrabold opacity-80 ml-2 mb-2 block">{t('howManyHours', 'Kaç Saat Uyudun?')}</label>
              <div className="relative">
                <input 
                  type="number" step="0.5" value={hours} onChange={(e) => setHours(e.target.value)}
                  className="w-full bg-white text-3xl font-black rounded-2xl px-6 py-4 focus:outline-none transition-all shadow-inner [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" 
                  style={{ color: themePrimary }}
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-lg font-bold opacity-50 text-gray-500 pointer-events-none">
                  {t('hours', 'Saat')}
                </span>
              </div>
            </div>

            <div className="bg-white/30 p-4 rounded-xl border border-white/50 transition-all">
              <button 
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full flex items-center justify-between text-xs font-bold opacity-80 hover:opacity-100 transition-opacity"
              >
                <div className="flex items-center gap-2">
                  <CalendarDays size={16} />
                  <span>
                    {date === todayString 
                      ? `${t('dateText', 'Tarih:')} ${t('todayText', 'Bugün')}` 
                      : `${t('dateText', 'Tarih:')} ${new Date(date).toLocaleDateString('tr-TR')}`}
                  </span>
                </div>
                {showDatePicker ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showDatePicker && (
                <div className="mt-4 pt-4 border-t border-white/30 animate-in slide-in-from-top-2 duration-300">
                  <label className="text-[10px] font-bold opacity-60 mb-1 block uppercase tracking-wider">
                    {t('pastDay', 'Geçmiş bir gün seç')}
                  </label>
                  <input 
                    type="date" 
                    value={date} 
                    max={todayString}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/60 border border-white/80 rounded-lg px-3 py-2 text-sm font-extrabold focus:outline-none transition-all opacity-80" 
                  />
                </div>
              )}
            </div>

          </div>

          <button onClick={handleSaveSleep} className="w-full mt-6 py-4 rounded-2xl bg-white/60 hover:bg-white border border-white/80 font-black text-lg active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-sm">
            <Plus size={20} strokeWidth={3} /> <span>{t('saveBtn', 'Kaydet')}</span>
          </button>
        </div>

        <div className="lg:col-span-2 bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 flex flex-col min-h-[400px]">
          <h2 className="text-lg font-extrabold mb-6">{t('weeklyAnalysis', 'Haftalık Analiz')}</h2>
          
          <div className="flex-1 w-full flex items-center justify-center">
            {logs.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={logs} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.5)" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 'bold', fill: 'rgba(0,0,0,0.6)' }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fontWeight: 'bold', fill: 'rgba(0,0,0,0.6)' }} 
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.4)' }}
                    contentStyle={{ borderRadius: '16px', border: 'none', backgroundColor: 'rgba(255,255,255,0.9)', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="hours" radius={[8, 8, 8, 8]}>
                    {logs.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getBarColor(entry.hours)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-sm font-bold opacity-50 text-center">
                {t('noSleepDataLine1', 'Henüz uyku verisi girmedin.')}<br/>{t('noSleepDataLine2', 'Yukarıdaki formdan ilk kaydını oluştur.')}
              </p>
            )}
          </div>
          
          <div className="flex justify-center gap-4 mt-6 text-xs font-bold opacity-70">
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#10b981]"></div> 7+ {t('hours', 'Saat')} ({t('ideal', 'İdeal')})</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#f59e0b]"></div> 6-7 {t('hours', 'Saat')} ({t('average', 'Ortalama')})</div>
            <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-[#ef4444]"></div> &lt;6 {t('hours', 'Saat')} ({t('insufficient', 'Yetersiz')})</div>
          </div>

        </div>
      </div>
    </div>
  );
}