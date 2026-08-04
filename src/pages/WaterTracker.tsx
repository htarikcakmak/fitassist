import { useState, useContext } from 'react';
import { Droplets, Plus, GlassWater, Check, Pencil } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

export default function WaterTracker() {
  const [water, setWater] = useState(0);
  const [target, setTarget] = useState(3000);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState(target.toString());
  const { themePrimary } = useContext(ThemeContext);

  const waterOptions = [
    { amount: 250, label: '1 Bardak', glasses: 1 },
    { amount: 500, label: '2 Bardak', glasses: 2 },
    { amount: 750, label: '3 Bardak', glasses: 3 },
    { amount: 1000, label: '1 Şişe', glasses: 0 }
  ];

  const handleTargetSave = () => {
    const newTarget = parseInt(tempTarget);
    if (!isNaN(newTarget) && newTarget > 0) setTarget(newTarget);
    setIsEditing(false);
  };

  return (
    <div className="p-6 md:p-10 space-y-10 pb-32 md:pb-10 max-w-3xl mx-auto animate-in fade-in duration-500 flex flex-col items-center">
      <div className="w-full text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">Su Takibi</h1>
      </div>
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-white/40 backdrop-blur-xl border border-white/60 flex flex-col items-center justify-center overflow-hidden shadow-lg">
        <div className="relative z-10 flex flex-col items-center">
          <Droplets size={56} className="mb-2 opacity-80" strokeWidth={1.5} color={themePrimary} />
          <span className="text-5xl md:text-6xl font-black tracking-tighter">{water}</span>
          <div className="mt-2 flex items-center justify-center h-8">
            <span className="text-sm md:text-lg font-bold opacity-70 mr-2">/</span>
            {isEditing ? (
              <div className="flex items-center gap-2">
                <input type="number" value={tempTarget} onChange={(e) => setTempTarget(e.target.value)} className="w-20 bg-white/60 border rounded-lg px-2 py-1 text-center text-sm font-bold focus:outline-none" style={{borderColor: themePrimary}} autoFocus />
                <button onClick={handleTargetSave} className="p-1.5 bg-white rounded-lg shadow-sm"><Check size={16} strokeWidth={3} color={themePrimary}/></button>
              </div>
            ) : (
              <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditing(true)}>
                <span className="text-sm md:text-lg font-bold opacity-70">{target} ml</span>
                <button className="opacity-50 group-hover:opacity-100 transition-opacity"><Pencil size={14} color={themePrimary}/></button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full bg-white/40 backdrop-blur-xl rounded-[2.5rem] p-6 md:p-8 shadow-sm border border-white/60">
        <div className="grid grid-cols-2 gap-4">
          {waterOptions.map(option => (
            <button key={option.amount} onClick={() => setWater(prev => prev + option.amount)} className="bg-white/60 hover:bg-white border border-white/80 py-4 px-2 rounded-2xl active:scale-95 transition-all flex flex-col items-center justify-center shadow-sm">
              <div className="flex items-center space-x-1 mb-1"><Plus size={16} strokeWidth={3} /><span className="text-lg font-extrabold">{option.amount} ml</span></div>
              <div className="flex items-center gap-1 opacity-70"><span className="text-xs font-bold mr-1">{option.label}</span>
                <div className="flex gap-0.5">{option.glasses > 0 ? Array.from({ length: option.glasses }).map((_, i) => <GlassWater key={i} size={14} strokeWidth={2.5} />) : <Droplets size={14} strokeWidth={2.5} />}</div>
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setWater(0)} className="w-full mt-6 py-4 rounded-2xl bg-white/30 hover:bg-white/50 font-extrabold active:scale-95 transition-all border border-white/40 shadow-sm">Sıfırla</button>
      </div>
    </div>
  );
}