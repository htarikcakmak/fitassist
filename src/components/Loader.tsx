interface LoaderProps {
  message?: string;
}

export const Loader = ({ message = "Yükleniyor, lütfen bekleyin..." }: LoaderProps) => {
  return (
    <>
      {/* Animasyonu doğrudan bileşenin içine gömüyoruz, böylece hiçbir CSS onu ezemez */}
      <style>
        {`
          @keyframes spin-custom {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={{ 
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        backgroundColor: 'var(--fitassist-background)', zIndex: 9999, cursor: 'wait',
        padding: '0 20px' /* Uzun metinlerin telefon kenarlarına yapışmasını engeller */
      }}>
        <div style={{ 
          border: '4px solid rgba(94, 126, 57, 0.2)', 
          borderTop: '4px solid var(--fitassist-primary)', 
          borderRadius: '50%', width: '40px', height: '40px', 
          animation: 'spin-custom 1s linear infinite' /* Kendi yazdığımız animasyonu çağırıyoruz */
        }}></div>
        <p style={{ 
          marginTop: '15px', 
          color: 'var(--fitassist-text-dark)', 
          fontWeight: 'bold',
          textAlign: 'center' /* Yazıyı tam ortalayan özellik */
        }}>
          {message}
        </p>
      </div>
    </>
  );
};