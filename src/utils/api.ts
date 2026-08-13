// src/utils/api.ts

/**
 * Bu fonksiyon, standart fetch işlemini sarmalayarak (wrap) 
 * her isteğin başlığına otomatik olarak JWT Token'ı ekler.
 */
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  // 1. Kullanıcı bilgisini kalıcı veya oturum hafızasından alıyoruz
  const storedUser = localStorage.getItem('fitassist_user') || sessionStorage.getItem('fitassist_user');
  let token = '';

  // 2. Eğer kullanıcı giriş yapmışsa, içinden token'ı çekiyoruz
  if (storedUser) {
    const user = JSON.parse(storedUser);
    token = user.token; // UserController'da ürettiğimiz "token"
  }

  // 3. İstek başlıklarını (headers) hazırlıyoruz
  const headers: HeadersInit = {
    // Varsayılan olarak JSON formatında veri gönderdiğimizi belirtiyoruz
    'Content-Type': 'application/json',
    
    // Eğer önceden gönderilmiş özel başlıklar varsa onları koruyoruz (örn: Accept-Language)
    ...options.headers,
    
    // Eğer Token varsa, Güvenlik Filtremizin beklediği "Bearer" formatında ekliyoruz
    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
  };

  // 4. İsteği güncellenmiş başlıklar ile gerçekleştiriyoruz
  return fetch(url, {
    ...options,
    headers
  });
};