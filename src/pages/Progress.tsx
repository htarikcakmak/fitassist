import { useState, useContext } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ThemeContext } from '../context/ThemeContext';

export default function Progress() {
  const metrics = ['Kilo', 'Yağ Oranı', 'Kas Oranı'];
  const [activeMetric, setActiveMetric] = useState('Kilo');
  const [inputValue, setInputValue] = useState('');
  const [metricData, setMetricData] = useState<Record<string, {date: string, value: number}[]>>({});
  const { themeBg, themePrimary } = useContext(ThemeContext);

  const handleSave = () => {
    if (!inputValue) return;
    const today = new Date();
    const dateStr = today.getDate() + ' ' + today.toLocaleString('tr-TR', { month: 'short' });
    setMetricData(prev => ({
      ...prev,
      [activeMetric]: [...(prev[activeMetric] || []), { date: dateStr, value: parseFloat(inputValue) }]
    }));
    setInputValue('');
  };

  const currentData = metricData[activeMetric] || [];

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Gelişim</h1>
          <p className="font-medium opacity-80 mt-1">Ölçümlerini gir, grafiği oluştur.</p>
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
              {metric}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
          <h2 className="text-lg font-extrabold mb-6 flex items-center justify-between">
            <span>{activeMetric} Geçmişi</span>
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
              <p className="opacity-60 font-bold text-center">Henüz veri yok.<br/>İlk ölçümünü aşağıdan ekle!</p>
            )}
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 h-fit space-y-4">
          <h3 className="font-extrabold">Yeni {activeMetric} Kaydı</h3>
          <div className="flex gap-4">
            <input 
              type="number" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
              placeholder="Değer girin..." 
              className="flex-1 bg-white/60 border border-white/80 rounded-xl px-4 py-3 text-sm font-extrabold focus:outline-none transition-all placeholder-current opacity-70" 
            />
            <button onClick={handleSave} className="bg-white hover:bg-white/80 border border-white/60 px-6 py-3 rounded-xl active:scale-95 transition-all font-extrabold shadow-sm">
              Kaydet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}