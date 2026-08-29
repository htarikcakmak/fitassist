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

  // Eğer token gerçekten sunucu tarafından reddedildiyse (Eski token vs.), oturumu temizleyip logine yollamalıyız.
  // Önceden sürekli logine atma sebebi backend'in anahtar unutmasıydı, artık düzeldiği için bu sadece GERÇEK hatalarda çalışacak.
  if (response.status === 401) {
    localStorage.removeItem('fitassist_user');
    sessionStorage.removeItem('fitassist_user');
    
    // Kullanıcıya bilgi ver ki neden atıldığını anlasın
    alert('Oturum süreniz doldu veya eski bir token tespit edildi. Lütfen tekrar giriş yapın.');
    window.location.href = '/profile';
    
    throw new Error('Yetkisiz işlem: Token geçersiz veya süresi dolmuş.');
  }

  return response;
};