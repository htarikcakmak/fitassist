import { useState, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function Progress() {
  // DÜZELTME 1: Ekrana basılacak kelimeleri değil, çeviri anahtarlarını state'te tutuyoruz.
  const metrics = ['weight', 'bodyFat', 'muscleMass'];
  const [activeMetric, setActiveMetric] = useState('weight');
  const [inputValue, setInputValue] = useState('');
  const [metricData, setMetricData] = useState<Record<string, {date: string, value: number}[]>>({});
  
  const { themeBg, themePrimary } = useContext(ThemeContext);
  const { t } = useTranslation();

  // 1. Veritabanından tüm gelişim kayıtlarını çek
  useEffect(() => {
    fetch('http://localhost:8080/api/progress/all')
      .then(res => res.json())
      .then((data: any[]) => {
        // Anahtarları İngilizce isimleriyle güncelledik
        const formattedData: Record<string, {date: string, value: number}[]> = {
          'weight': [], 'bodyFat': [], 'muscleMass': []
        };
        
        data.forEach(item => {
          const d = new Date(item.date);
          const dateStr = d.getDate() + ' ' + d.toLocaleString('tr-TR', { month: 'short' });
          
          if (item.weight) formattedData['weight'].push({ date: dateStr, value: item.weight });
          if (item.bodyFatPercentage) formattedData['bodyFat'].push({ date: dateStr, value: item.bodyFatPercentage });
          if (item.muscleMass) formattedData['muscleMass'].push({ date: dateStr, value: item.muscleMass });
        });
        
        setMetricData(formattedData);
      })
      .catch(err => console.error("Veri çekme hatası:", err));
  }, []);

  // 2. Yeni ölçümü veritabanına kaydet
  // 2. Yeni ölçümü veritabanına kaydet
  const handleSave = () => {
    if (!inputValue) return;
    
    const payload: any = {};
    // Dil ne olursa olsun arka plan mantığı bozulmadan çalışacak.
    if (activeMetric === 'weight') payload.weight = parseFloat(inputValue);
    if (activeMetric === 'bodyFat') payload.bodyFatPercentage = parseFloat(inputValue);
    if (activeMetric === 'muscleMass') payload.muscleMass = parseFloat(inputValue);

    fetch('http://localhost:8080/api/progress/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        // YENİ: Arka plana seçili dili gönderiyoruz
        'Accept-Language': i18n.language || 'tr'
      },
      body: JSON.stringify(payload)
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

      // YENİ: Veritabanına kaydedilen asıl veriyi 'responsePayload.data' içinden alıyoruz
      const savedItem = responsePayload.data;
      const d = new Date(savedItem.date);
      const dateStr = d.getDate() + ' ' + d.toLocaleString('tr-TR', { month: 'short' });
      
      setMetricData(prev => ({
        ...prev,
        [activeMetric]: [...(prev[activeMetric] || []), { date: dateStr, value: parseFloat(inputValue) }]
      }));
      setInputValue('');
    })
    .catch(err => {
      console.error("Kaydetme hatası:", err);
      // Hata mesajını ekranda gösteriyoruz
      alert(err.message);
    });
  };

  const currentData = metricData[activeMetric] || [];

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          {/* Başlık ve açıklama çevirileri eklendi */}
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{t('progressTitle')}</h1>
          <p className="font-medium opacity-80 mt-1">{t('progressDesc')}</p>
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
              {/* DÜZELTME 3: Buton metni burada dinamik olarak çevriliyor */}
              {t(metric)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
          <h2 className="text-lg font-extrabold mb-6 flex items-center justify-between">
            {/* Geçmiş başlığı dinamik yapıldı (Örn: "Kilo Geçmişi" veya "Weight History") */}
            <span>{t(activeMetric)} {t('history')}</span>
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
              // Veri yok ekranı çevirildi
              <p className="opacity-60 font-bold text-center">
                {t('noDataLine1')}<br/>{t('noDataLine2')}
              </p>
            )}
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
          <h2 className="text-lg font-extrabold mb-6">{t('newWeightRecord')}</h2>
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
            <input 
              type="number" 
              placeholder={t('enterValue')} 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 font-bold focus:outline-none focus:bg-white transition-all shadow-inner"
            />
            <button 
              onClick={handleSave}
              className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-white/90 rounded-xl font-extrabold shadow-sm active:scale-95 transition-all"
            >
              {/* Kaydet butonu çevirildi */}
              {t('saveBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}