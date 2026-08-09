import { useState, useContext } from 'react';
import { User, Ruler, Weight, Target, Save } from 'lucide-react';
import { ThemeContext } from '../context/ThemeContext';
import { useTranslation } from 'react-i18next';

export default function Profile() {
  const { themePrimary } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Arka plandan (Spring Boot) gelecek varsayılan veriler için state'lerimiz
  const [name, setName] = useState('Tarık');
  const [height, setHeight] = useState('185');
  const [weight, setWeight] = useState('92');
  const [goal, setGoal] = useState('Vücut Kompozisyonu');

  const handleSave = () => {
    // İleride bu bilgileri Spring Boot backend'imize göndereceğiz
    console.log("Kaydedilecek Veriler:", { name, height, weight, goal });
    alert(t('saveSuccess', 'Profil başarıyla güncellendi!'));
  };

  return (
    <div className="px-6 md:p-10 mt-2 md:mt-6 space-y-6 animate-in fade-in duration-500 max-w-2xl mx-auto flex flex-col justify-start pb-32">
      
      <div className="flex flex-col items-start px-2 mb-2">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          {t('profileTitle', 'Profilim')}
        </h2>
        <p className="font-medium opacity-80 mt-1">
          {t('profileDesc', 'Kişisel metriklerini güncel tut.')}
        </p>
      </div>

      <div className="w-full bg-white/40 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
        
        {/* İsim Alanı */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-extrabold opacity-80">
            <User size={16} color={themePrimary} /> {t('nameLabel', 'Ad Soyad')}
          </label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 font-bold focus:outline-none transition-all shadow-inner"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Boy Alanı */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-extrabold opacity-80">
              <Ruler size={16} color={themePrimary} /> {t('heightLabel', 'Boy (cm)')}
            </label>
            <input 
              type="number" 
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 font-bold focus:outline-none transition-all shadow-inner"
            />
          </div>

          {/* Kilo Alanı */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-extrabold opacity-80">
              <Weight size={16} color={themePrimary} /> {t('weightLabel', 'Kilo (kg)')}
            </label>
            <input 
              type="number" 
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 font-bold focus:outline-none transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Hedef Alanı */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-extrabold opacity-80">
            <Target size={16} color={themePrimary} /> {t('goalLabel', 'Ana Hedef')}
          </label>
          <select 
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 font-bold focus:outline-none transition-all shadow-inner appearance-none"
          >
            <option value="Kilo Verme">{t('goalLoseWeight', 'Kilo Verme (Definisyon)')}</option>
            <option value="Kas Kazanımı">{t('goalGainMuscle', 'Kas Kazanımı (Bulk)')}</option>
            <option value="Vücut Kompozisyonu">{t('goalRecomposition', 'Vücut Kompozisyonu')}</option>
          </select>
        </div>

        {/* Kaydet Butonu */}
        <button 
          onClick={handleSave}
          className="w-full mt-4 py-4 rounded-xl bg-white hover:bg-white/90 font-extrabold active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm border border-white/80"
          style={{ color: themePrimary }}
        >
          <Save size={20} strokeWidth={2.5} /> {t('saveProfileBtn', 'Profili Güncelle')}
        </button>

      </div>
    </div>
  );
}