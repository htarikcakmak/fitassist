import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ConfirmModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmModal({ isOpen, message, onConfirm, onCancel }: ConfirmModalProps) {
  const { themePrimary } = useContext(ThemeContext);
  const { t } = useTranslation();

  // Eğer modal açık değilse hiçbir şey çizdirme (gizle)
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300 px-4">
      <div className="bg-white/80 backdrop-blur-2xl border border-white/60 p-6 rounded-[2rem] shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95 duration-300">
        
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 rounded-full shadow-inner">
            <AlertCircle size={36} className="text-red-500" strokeWidth={2.5} />
          </div>
        </div>
        
        <h3 className="text-2xl font-black mb-2 tracking-tight text-gray-800">
          {t('areYouSure', 'Emin misin?')}
        </h3>
        
        <p className="font-bold opacity-70 mb-8 text-gray-600">
          {message}
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={onCancel} 
            className="flex-1 py-3 rounded-xl bg-gray-200/60 hover:bg-gray-200 font-extrabold text-gray-700 active:scale-95 transition-all"
          >
            {t('cancel', 'İptal')}
          </button>
          <button 
            onClick={onConfirm} 
            className="flex-1 py-3 rounded-xl text-white font-extrabold shadow-md hover:opacity-90 active:scale-95 transition-all" 
            style={{ backgroundColor: themePrimary }}
          >
            {t('confirm', 'Tamam')}
          </button>
        </div>
      </div>
    </div>
  );
}