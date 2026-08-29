import { Navigate } from 'react-router-dom';

// Korumalı rota bileşenimiz, içine sardığımız sayfaları (children) temsil eder
interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const storedUser = localStorage.getItem('fitassist_user') || sessionStorage.getItem('fitassist_user');

  let isValid = false;
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      // Eski hatalı kayıt loglarını temizlemek için token ve id kontrolü
      if (user.token && user.id) {
        isValid = true;
      }
    } catch (e) {}
  }

  if (!isValid) {
    localStorage.removeItem('fitassist_user');
    sessionStorage.removeItem('fitassist_user');
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
}