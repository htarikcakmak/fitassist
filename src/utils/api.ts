const API_BASE_URL = 'https://fitassist-backend.onrender.com';

// Uygulama genelinde kullanılacak güvenli veri çekme aracı
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const userStr = localStorage.getItem('fitassist_user') || sessionStorage.getItem('fitassist_user');
  let token = '';
  
  if (userStr) {
    const user = JSON.parse(userStr);
    token = user.token || ''; 
  }

  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${token}`
  };

  // API_BASE_URL ile gelen uç noktayı (endpoint) birleştiriyoruz
  // Örnek: http://123.123.1.23:8080 + /api/users/login
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  return response;
};