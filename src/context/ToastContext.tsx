import React, { createContext, useState, useContext } from 'react';
import type { ReactNode } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { ThemeContext } from './ThemeContext';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void;
}

export const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const { themePrimary } = useContext(ThemeContext);

  const showToast = (message: string, type: ToastType = 'info') => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // 3 saniye sonra bildirimi otomatik ekrandan kaldır
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      {/* BİLDİRİMLERİN EKRANDA GÖRÜNECEĞİ YER (SAĞ ÜST KÖŞE) */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((toast) => (
          <div 
            key={toast.id} 
            className="pointer-events-auto flex items-center gap-3 bg-white/90 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 rounded-2xl min-w-[250px] max-w-sm animate-in slide-in-from-top-5 fade-in duration-300"
          >
            {/* İkona göre renk ve sembol */}
            {toast.type === 'success' && <CheckCircle2 size={24} className="text-green-500 shrink-0" />}
            {toast.type === 'error' && <AlertCircle size={24} className="text-red-500 shrink-0" />}
            {toast.type === 'info' && <AlertCircle size={24} style={{ color: themePrimary }} className="shrink-0" />}
            
            <p className="font-bold text-sm text-gray-800 flex-1">{toast.message}</p>
            
            <button onClick={() => removeToast(toast.id)} className="p-1 hover:bg-black/5 rounded-lg transition-colors opacity-50 hover:opacity-100 shrink-0">
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};