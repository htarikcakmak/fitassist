import React from 'react';

// Dışarıdan gelecek mesajın tipini belirliyoruz
interface LoaderProps {
  message?: string;
}

// message gelmezse varsayılan olarak "Yükleniyor, lütfen bekleyin..." yazacak
export const Loader = ({ message = "Yükleniyor, lütfen bekleyin..." }: LoaderProps) => {
  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      width: '100vw',    
      height: '100vh',   
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: 'var(--fitassist-background)', 
      zIndex: 9999,      
      cursor: 'wait'     
    }}>
      <div style={{ 
        border: '4px solid rgba(94, 126, 57, 0.2)', 
        borderTop: '4px solid var(--fitassist-primary)', 
        borderRadius: '50%', 
        width: '40px', 
        height: '40px', 
        animation: 'spin 1s linear infinite' 
      }}></div>
      {/* Sabit yazı yerine dışarıdan gelen message değişkenini ekrana basıyoruz */}
      <p style={{ marginTop: '15px', color: 'var(--fitassist-text-dark)', fontWeight: 'bold' }}>
        {message}
      </p>
    </div>
  );
};