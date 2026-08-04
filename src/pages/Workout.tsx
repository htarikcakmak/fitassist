import { useState, useEffect, useContext } from 'react';
import { Plus, Check } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

type WorkoutLog = {
  id?: number;
  programType: string;
  exerciseName: string;
  setNumber: number;
  weight: number;
  reps: number;
};

export default function Workout() {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [program, setProgram] = useState('Push');
  const [exercise, setExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const { themeBg, themePrimary } = useContext(ThemeContext);

  const programs = ['Push', 'Pull', 'Leg'];

  // Sayfa açıldığında verileri çeker
  useEffect(() => {
    fetch('http://localhost:8080/api/workout/today')
      .then(res => {
        if (!res.ok) throw new Error("Bağlantı hatası");
        return res.json();
      })
      .then(data => setLogs(data))
      .catch(err => console.error("Antrenman verisi çekilemedi (Arka plan kapalı olabilir):", err));
  }, []);

  // Seti veritabanına kaydeder
  const handleSaveSet = () => {
    // 1. KONTROL: Alanlar boş mu?
    if (!exercise || !weight || !reps) {
      alert("Kayıt yapılamadı: Lütfen Hareket Adı, Ağırlık ve Tekrar alanlarının hepsini doldur!");
      return;
    }

    const currentSets = logs.filter(log => log.exerciseName === exercise).length;
    
    const newLog = {
      programType: program,
      exerciseName: exercise,
      setNumber: currentSets + 1,
      weight: parseFloat(weight),
      reps: parseInt(reps)
    };

    fetch('http://localhost:8080/api/workout/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLog)
    })
    .then(res => {
      // 2. KONTROL: Sunucu isteği başarılı şekilde aldı mı?
      if (!res.ok) {
        throw new Error("Sunucu kayıt işlemini reddetti.");
      }
      return res.json();
    })
    .then(savedLog => {
      setLogs([...logs, savedLog]);
      // Pratiklik için hareket adı (exercise) silinmez, sadece ağırlık ve tekrar sıfırlanır
      setWeight('');
      setReps('');
    })
    .catch(err => {
      console.error("Set kaydedilemedi:", err);
      // 3. KONTROL: En yaygın hata olan sunucu kapalı durumunda kullanıcıyı uyar.
      alert("Kayıt başarısız! Lütfen Java (Spring Boot) arka plan uygulamasının çalıştığından emin ol.");
    });
  };

  return (
    <div className="p-6 md:p-10 space-y-8 pb-32 md:pb-10 max-w-5xl mx-auto animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Antrenman</h1>
        <p className="font-medium opacity-80 mt-1">Bugünkü programını seç ve setlerini kaydet.</p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 no-scrollbar">
        {programs.map((p) => (
          <button 
            key={p} 
            onClick={() => setProgram(p)} 
            style={{
              backgroundColor: program === p ? themePrimary : 'rgba(255,255,255,0.4)',
              color: program === p ? themeBg : themePrimary,
              borderColor: program === p ? 'transparent' : 'rgba(255,255,255,0.6)'
            }}
            className="px-8 py-3 rounded-xl text-sm font-extrabold transition-all duration-300 active:scale-95 border backdrop-blur-md"
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 space-y-4 h-fit w-full">
          <h2 className="text-lg font-extrabold mb-4">Yeni Set Ekle</h2>
          
          <input 
            type="text" value={exercise} onChange={(e) => setExercise(e.target.value)}
            placeholder="Hareket Adı (Örn: Bench Press)" 
            className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 text-sm font-extrabold focus:outline-none transition-all placeholder-current opacity-70" 
          />
          
          {/* GÖRSEL HATA BURADA ÇÖZÜLDÜ: grid-cols-2 yapısı ve min-w-0 eklendi */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <input 
              type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
              placeholder="Ağırlık (kg)" 
              className="w-full min-w-0 bg-white/60 border border-white/80 rounded-xl px-4 py-3 text-sm font-extrabold focus:outline-none transition-all placeholder-current opacity-70" 
            />
            <input 
              type="number" value={reps} onChange={(e) => setReps(e.target.value)}
              placeholder="Tekrar" 
              className="w-full min-w-0 bg-white/60 border border-white/80 rounded-xl px-4 py-3 text-sm font-extrabold focus:outline-none transition-all placeholder-current opacity-70" 
            />
          </div>

          <button onClick={handleSaveSet} className="w-full mt-2 py-3 rounded-xl bg-white/60 hover:bg-white border border-white/80 font-extrabold active:scale-95 transition-all flex items-center justify-center space-x-2 shadow-sm">
            <Plus size={18} strokeWidth={3} /> <span>Seti Kaydet</span>
          </button>
        </div>

        <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60 w-full overflow-hidden">
          <h2 className="text-lg font-extrabold mb-4">Bugünkü {program} Kayıtların</h2>
          
          <div className="space-y-4">
            {logs.filter(log => log.programType === program).length > 0 ? (
              Array.from(new Set(logs.filter(l => l.programType === program).map(l => l.exerciseName))).map(exName => (
                <div key={exName} className="bg-white/60 border border-white/80 p-4 rounded-xl shadow-sm w-full">
                  <h3 className="font-extrabold border-b border-white/50 pb-2 mb-3">{exName}</h3>
                  <div className="space-y-2">
                    {logs.filter(l => l.exerciseName === exName).map((setLog, idx) => (
                      <div key={idx} className="grid grid-cols-4 gap-2 items-center text-sm font-bold opacity-80 border-b border-white/20 pb-2 last:border-0 last:pb-0">
                        <span className="text-left whitespace-nowrap">Set {setLog.setNumber}</span>
                        <span className="text-center whitespace-nowrap">{setLog.weight} kg</span>
                        <span className="text-center whitespace-nowrap">{setLog.reps} Tkr</span>
                        <div className="flex justify-end">
                          <Check size={16} color={themePrimary} strokeWidth={3} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="opacity-60 font-bold text-center py-10">Bugün henüz bu program için<br/>bir set girmedin.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}