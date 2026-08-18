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

  // YENİ EKLENEN KONTROL MEKANİZMASI:
  // Gelen endpoint 'http' ile başlıyorsa zaten tam bir linktir, olduğu gibi kullan.
  // Başlamıyorsa (örneğin sadece '/api/users/register' ise) API_BASE_URL ile birleştir.
  const isFullUrl = endpoint.startsWith('http');
  const finalUrl = isFullUrl ? endpoint : `${API_BASE_URL}${endpoint}`;

  // İsteği artık hatalı birleşen URL ile değil, akıllı 'finalUrl' ile atıyoruz
  const response = await fetch(finalUrl, {
    ...options,
    headers
  });

  return response;
};