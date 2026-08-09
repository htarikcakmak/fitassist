import { useState, useEffect, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

export default function Progress() {
  const metrics = ['weight', 'bodyFat', 'muscleMass'];
  const [activeMetric, setActiveMetric] = useState('weight');
  const [inputValue, setInputValue] = useState('');
  
  // YENİ: Veri yapımıza 'uniqueKey' adında benzersiz bir kimlik ekledik
  const [metricData, setMetricData] = useState<Record<string, {uniqueKey: string, date: string, value: number}[]>>({});
  
  const { themeBg, themePrimary } = useContext(ThemeContext);
  const { t } = useTranslation();

  useEffect(() => {
    fetch('http://localhost:8080/api/progress/all')
      .then(res => res.json())
      .then((data: any[]) => {
        const formattedData: Record<string, {uniqueKey: string, date: string, value: number}[]> = {
          'weight': [], 'bodyFat': [], 'muscleMass': []
        };
        
        // Eski bozuk verileri filtreleme kuralımız (YYYY-MM-DD) aynen duruyor
        const validData = data.filter(item => {
          if (!item.date) return false;
          return /^\d{4}-\d{2}-\d{2}/.test(item.date);
        });
        
        // YENİ: Her veriye sırasına (index) göre benzersiz bir kimlik veriyoruz.
        // Böylece aynı gün girilmiş olsalar bile grafikte üst üste binmek yerine yan yana dizilecekler.
        validData.forEach((item, index) => {
          const dateStr = item.date.split('T')[0];
          const uniqueKey = `${index}_${dateStr}`; 
          
          if (item.weight) formattedData['weight'].push({ uniqueKey, date: dateStr, value: item.weight });
          if (item.bodyFatPercentage) formattedData['bodyFat'].push({ uniqueKey, date: dateStr, value: item.bodyFatPercentage });
          if (item.muscleMass) formattedData['muscleMass'].push({ uniqueKey, date: dateStr, value: item.muscleMass });
        });
        
        setMetricData(formattedData);
      })
      .catch(err => console.error("Veri çekme hatası:", err));
  }, []);

  const handleSave = () => {
    if (!inputValue) return;
    
    const payload: any = {};
    if (activeMetric === 'weight') payload.weight = parseFloat(inputValue);
    if (activeMetric === 'bodyFat') payload.bodyFatPercentage = parseFloat(inputValue);
    if (activeMetric === 'muscleMass') payload.muscleMass = parseFloat(inputValue);

    fetch('http://localhost:8080/api/progress/add', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept-Language': i18n.language || 'tr'
      },
      body: JSON.stringify(payload)
    })
    .then(async (res) => {
      const responsePayload = await res.json();
      if (!res.ok) throw new Error(responsePayload.message || 'Sunucu hatası');
      return responsePayload;
    })
    .then(responsePayload => {
      alert(responsePayload.message);

      const savedItem = responsePayload.data;
      const dateStr = savedItem.date.split('T')[0];
      
      // Anlık girilen veriye de o anki milisaniye (Date.now) ile benzersiz bir kimlik veriyoruz
      const uniqueKey = `${Date.now()}_${dateStr}`;
      
      setMetricData(prev => {
        const currentList = prev[activeMetric] || [];
        // Yeni girilen değeri tekilleştirmeden, doğrudan listenin sonuna yeni bir nokta olarak ekliyoruz
        return { 
          ...prev, 
          [activeMetric]: [...currentList, { uniqueKey, date: dateStr, value: parseFloat(inputValue) }] 
        };
      });
      setInputValue('');
    })
    .catch(err => {
      console.error("Kaydetme hatası:", err);
      alert(err.message);
    });
  };

  const currentData = metricData[activeMetric] || [];

  // YENİ: Grafiğin altındaki yazıları (tick) formatlarken benzersiz kimlikteki numarayı atıp sadece tarihi gösteriyoruz
  const formatChartDate = (keyString: string) => {
    if (!keyString) return '';
    // "1_2026-08-09" gibi gelen string'den alt tireyi bulup sağındaki tarihi alıyoruz
    const parts = keyString.split('_');
    const rawDate = parts.length > 1 ? parts[1] : keyString;

    const d = new Date(rawDate);
    if (isNaN(d.getTime())) return rawDate; 
    return d.toLocaleDateString(i18n.language || 'tr', { day: '2-digit', month: 'short' });
  };

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
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
              {t(metric)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
          <h2 className="text-lg font-extrabold mb-6 flex items-center justify-between">
            <span>{t(activeMetric)} {t('history')}</span>
          </h2>
          <div className="h-64 w-full flex items-center justify-center">
            {currentData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={currentData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke={themePrimary} vertical={false} opacity={0.3} />
                  
                  {/* dataKey artık "date" değil, "uniqueKey". Böylece her nokta bağımsız çiziliyor. */}
                  <XAxis dataKey="uniqueKey" stroke={themePrimary} fontSize={12} tickLine={false} axisLine={false} fontWeight={700} tickFormatter={formatChartDate} />
                  
                  <YAxis stroke={themePrimary} fontSize={12} tickLine={false} axisLine={false} fontWeight={700} />
                  <Tooltip contentStyle={{ backgroundColor: themeBg, borderRadius: '16px', border: '1px solid white', fontWeight: 'bold', color: themePrimary }} labelFormatter={(label) => typeof label === 'string' ? formatChartDate(label) : label} />
                  <Line type="monotone" dataKey="value" stroke={themePrimary} strokeWidth={4} dot={{ r: 6, fill: '#fff', stroke: themePrimary, strokeWidth: 3 }} activeDot={{ r: 8, fill: themePrimary, stroke: '#fff', strokeWidth: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
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
              {t('saveBtn')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}