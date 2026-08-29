const API_BASE_URL = 'https://fitassist-backend.onrender.com';

// Uygulama genelinde kullanılacak güvenli veri çekme aracı
export const fetchWithAuth = async (endpoint: string, options: RequestInit = {}) => {
  const userStr = localStorage.getItem('fitassist_user') || sessionStorage.getItem('fitassist_user');
  let token = '';
  
  if (userStr) {
    const user = JSON.parse(userStr);
    token = user.token || ''; 
  }

  // 415 ve 400 hatalarını önlemek için Content-Type eklendi.
  const headers = {
    'Content-Type': 'application/json', // Sunucuya verinin JSON olduğunu söyler
    'Authorization': 'Bearer ' + token,
    ...options.headers // Eğer dışarıdan ekstra header gelirse eskisini ezmesin diye alta koyduk
  };

  const isFullUrl = endpoint.startsWith('http');
  const finalUrl = isFullUrl ? endpoint : API_BASE_URL + endpoint;

  const response = await fetch(finalUrl, {
    ...options,
    headers
  });

  return response;
};