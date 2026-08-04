import { useState, useContext } from 'react';
import { Plus, Check, X } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';

const EXERCISE_LIBRARY = {
  Göğüs: ['Bench Press', 'Incline Bench Press', 'Dumbbell Bench Press'],
  Sırt: ['Pull Up', 'Lat Pulldown', 'Barbell Row'],
  Omuz: ['Overhead Press', 'Lateral Raise', 'Front Raise'],
  Bacak: ['Squat', 'Leg Press', 'Romanian Deadlift'],
  Kol: ['Barbell Curl', 'Hammer Curl', 'Pushdown'],
  Karın: ['Crunch', 'Cable Crunch', 'Plank']
};

type SetData = { weight: string; reps: string };
type Exercise = { id: string; name: string; sets: SetData[] };

export default function Workout() {
  const programOptions = ['Push', 'Pull', 'Leg', 'Upper', 'Lower', 'Full Body'];
  const [activeProgram, setActiveProgram] = useState<string>('Push');
  const [routine, setRoutine] = useState<Exercise[]>([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const { themeBg, themePrimary } = useContext(ThemeContext); 

  const addExercise = (name: string) => {
    const newExercise = { id: Math.random().toString(36).substr(2, 9), name: name, sets: [{ weight: '', reps: '' }] };
    setRoutine([...routine, newExercise]);
    setShowLibrary(false);
  };

  const addSetToExercise = (exerciseId: string) => {
    setRoutine(routine.map(ex => ex.id === exerciseId ? { ...ex, sets: [...ex.sets, { weight: '', reps: '' }] } : ex));
  };

  return (
    <div className="p-6 md:p-10 space-y-6 max-w-4xl mx-auto animate-in fade-in duration-500 pb-32 md:pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Antrenman</h1>
          <p className="font-medium opacity-80 mt-1">Günün programını seç ve başla.</p>
        </div>
        
        <div className="flex overflow-x-auto gap-3 pb-2 no-scrollbar">
          {programOptions.map((prog) => (
            <button 
              key={prog} 
              onClick={() => setActiveProgram(prog)} 
              style={{
                backgroundColor: activeProgram === prog ? themePrimary : 'transparent',
                color: activeProgram === prog ? themeBg : themePrimary,
                borderColor: activeProgram === prog ? 'transparent' : 'rgba(255,255,255,0.6)'
              }}
              className={`flex-shrink-0 px-6 py-2.5 rounded-full font-bold transition-all duration-300 active:scale-95 border bg-white/40 backdrop-blur-md`}
            >
              {prog}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {routine.map((exercise, index) => (
          <div key={exercise.id} className="bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 shadow-sm border border-white/60">
            <h3 className="text-lg font-extrabold mb-4">{index + 1}. {exercise.name}</h3>
            
            <div className="space-y-3">
              {exercise.sets.map((set, sIndex) => (
                <div key={sIndex} className="grid grid-cols-4 gap-3 items-center bg-white/50 p-2 rounded-xl border border-white/40">
                  <div className="text-center text-sm font-bold opacity-70">Set {sIndex + 1}</div>
                  <input type="number" placeholder="kg" className="w-full bg-white/60 rounded-lg p-2 text-center text-sm font-bold focus:outline-none transition-all placeholder-current opacity-70" />
                  <input type="number" placeholder="Tekrar" className="w-full bg-white/60 rounded-lg p-2 text-center text-sm font-bold focus:outline-none transition-all placeholder-current opacity-70" />
                  <button className="p-2 mx-auto rounded-lg bg-white/80 hover:bg-white active:scale-90 transition-all shadow-sm"><Check size={18} strokeWidth={2.5} color={themePrimary} /></button>
                </div>
              ))}
            </div>
            
            <button onClick={() => addSetToExercise(exercise.id)} className="mt-5 w-full py-3 rounded-xl bg-white/30 hover:bg-white/50 border border-white/60 font-bold active:scale-95 transition-all flex items-center justify-center space-x-2">
              <Plus size={18} /> <span>Set Ekle</span>
            </button>
          </div>
        ))}
      </div>

      <button onClick={() => setShowLibrary(true)} className="w-full md:w-auto md:px-12 py-4 rounded-2xl bg-white/60 backdrop-blur-xl hover:bg-white/80 border border-white/60 font-extrabold text-lg shadow-sm active:scale-95 transition-all flex items-center justify-center space-x-2 mx-auto">
        <Plus size={24} /> <span>Hareket Ekle</span>
      </button>

      {showLibrary && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/20 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="rounded-t-[2.5rem] h-[85vh] flex flex-col shadow-2xl border-t border-white/50 animate-in slide-in-from-bottom-full duration-400 max-w-2xl mx-auto w-full" style={{ backgroundColor: themeBg }}>
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <h2 className="text-2xl font-extrabold">Hareket Kütüphanesi</h2>
              <button onClick={() => setShowLibrary(false)} className="p-2 bg-white/50 rounded-full active:scale-90 transition-all"><X size={20} color={themePrimary} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">
              {Object.entries(EXERCISE_LIBRARY).map(([category, exercises]) => (
                <div key={category}>
                  <h3 className="text-sm font-extrabold uppercase tracking-widest mb-3 pl-2 opacity-70">{category}</h3>
                  <div className="space-y-3">
                    {exercises.map(ex => (
                      <button key={ex} onClick={() => addExercise(ex)} className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/40 border border-white/60 hover:bg-white/60 active:scale-95 transition-all text-left shadow-sm">
                        <span className="font-bold">{ex}</span>
                        <div className="bg-white/50 p-2 rounded-full"><Plus size={16} strokeWidth={3} color={themePrimary} /></div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}