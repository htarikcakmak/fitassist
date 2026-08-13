import { Navigate } from 'react-router-dom';

// Korumalı rota bileşenimiz, içine sardığımız sayfaları (children) temsil eder
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  // Kullanıcının sistemde kayıtlı olup olmadığını (Token'ı var mı) kontrol ediyoruz
  // Hem kalıcı hafızaya hem de oturum hafızasına ("Beni Hatırla" seçeneği için) bakıyoruz
  const storedUser = localStorage.getItem('fitassist_user') || sessionStorage.getItem('fitassist_user');

  // Eğer kullanıcı bilgisi (Token) yoksa, onu doğrudan profil/giriş sayfasına yönlendir (Navigate)
  if (!storedUser) {
    return <Navigate to="/profile" replace />;
  }

  // Eğer token varsa, gitmek istediği sayfayı (children) ekranda göster
  return <>{children}</>;
}