// src/data/foodLibrary.ts

export type FoodItem = {
  id: string;
  name: string;
  cal: number;
  p: number; // Protein (g)
  c: number; // Karbonhidrat (g)
  f: number; // Yağ (g)
};

export const FOOD_LIBRARY: FoodItem[] = [
  // --- KAHVALTILIK & PROTEİN KAYNAKLARI ---
  { id: '1', name: 'Yumurta (1 adet, Haşlanmış)', cal: 78, p: 6.3, c: 0.6, f: 5.3 },
  { id: '2', name: 'Yumurta Beyazı (1 adet)', cal: 17, p: 3.6, c: 0.2, f: 0.1 },
  { id: '3', name: 'Lor Peyniri (100g)', cal: 98, p: 11, c: 3, f: 4.5 },
  { id: '4', name: 'Ezine Peyniri / Tam Yağlı (30g)', cal: 100, p: 6, c: 0.5, f: 8.5 },
  { id: '5', name: 'Labne Peyniri (30g)', cal: 60, p: 2, c: 1, f: 5.5 },
  { id: '6', name: 'Yulaf Ezmesi (100g)', cal: 389, p: 16.9, c: 66.3, f: 6.9 },
  { id: '7', name: 'Kefir (1 Su Bardağı / 200ml)', cal: 104, p: 8, c: 12, f: 2.5 },
  { id: '8', name: 'Süt / Yarım Yağlı (1 Su Bardağı)', cal: 102, p: 8.2, c: 12, f: 2.4 },
  { id: '9', name: 'Süzme Yoğurt (100g)', cal: 130, p: 10, c: 4, f: 8 },
  { id: '10', name: 'Ev Yoğurdu (100g)', cal: 65, p: 4.5, c: 4.7, f: 3.5 },

  // --- ET, TAVUK, BALIK & ANA YEMEKLER ---
  { id: '11', name: 'Tavuk Göğsü (100g, Izgara/Haşlama)', cal: 165, p: 31, c: 0, f: 3.6 },
  { id: '12', name: 'Tavuk But (100g, Derisiz)', cal: 209, p: 26, c: 0, f: 10.9 },
  { id: '13', name: 'Hindi Füme (50g / 1 paket)', cal: 52, p: 9.5, c: 1, f: 1.2 },
  { id: '14', name: 'Dana Biftek (100g, Izgara)', cal: 250, p: 26, c: 0, f: 15 },
  { id: '15', name: 'Yağsız Dana Kıyması (100g)', cal: 215, p: 27, c: 0, f: 11 },
  { id: '16', name: 'Ton Balığı (100g, Suda)', cal: 116, p: 25.5, c: 0, f: 0.8 },
  { id: '17', name: 'Somon Balığı (100g, Izgara)', cal: 206, p: 22.1, c: 0, f: 12.3 },
  { id: '18', name: 'Levrek / Çipura (100g)', cal: 124, p: 20, c: 0, f: 4.5 },
  { id: '19', name: 'Tavuk Döner Dürüm (Hatay Usulü)', cal: 450, p: 35, c: 45, f: 15 },
  { id: '20', name: 'Et Döner (100g)', cal: 280, p: 24, c: 2, f: 19 },

  // --- KARBONHİDRAT KAYNAKLARI (PİRİNÇ, MAKARNA, PATATES) ---
  { id: '21', name: 'Beyaz Pirinç (100g, Pişmiş)', cal: 130, p: 2.7, c: 28, f: 0.3 },
  { id: '22', name: 'Basmati Pirinç (100g, Pişmiş)', cal: 121, p: 3.5, c: 25.5, f: 0.4 },
  { id: '23', name: 'Bulgur Pilavı (100g, Pişmiş)', cal: 145, p: 4.5, c: 30.8, f: 1.3 },
  { id: '24', name: 'Kepekli Makarna (100g, Pişmiş)', cal: 124, p: 5.3, c: 26.5, f: 0.8 },
  { id: '25', name: 'Normal Makarna (100g, Pişmiş)', cal: 157, p: 5.8, c: 30.9, f: 0.9 },
  { id: '26', name: 'Haşlanmış Patates (100g)', cal: 87, p: 1.9, c: 20, f: 0.1 },
  { id: '27', name: 'Fırın Patates (100g)', cal: 149, p: 2.5, c: 34, f: 0.4 },
  { id: '28', name: 'Tatlı Patates (100g, Fırın)', cal: 90, p: 2, c: 21, f: 0.2 },
  { id: '29', name: 'Kinoa (100g, Pişmiş)', cal: 120, p: 4.4, c: 21.3, f: 1.9 },
  { id: '30', name: 'Esmer Pirinç (100g, Pişmiş)', cal: 111, p: 2.6, c: 23, f: 0.9 },

  // --- BAKLAGİLLER & SEBZELER ---
  { id: '31', name: 'Mercimek Çorbası (1 Kepçe)', cal: 75, p: 4, c: 11, f: 2 },
  { id: '32', name: 'Haşlanmış Kırmızı Mercimek (100g)', cal: 116, p: 9, c: 20, f: 0.4 },
  { id: '33', name: 'Nohut (100g, Haşlanmış)', cal: 164, p: 8.9, c: 27.4, f: 2.6 },
  { id: '34', name: 'Kuru Fasulye (100g, Pişmiş)', cal: 127, p: 8.7, c: 22.8, f: 0.5 },
  { id: '35', name: 'Brokoli (100g, Haşlanmış)', cal: 35, p: 2.4, c: 7.2, f: 0.4 },
  { id: '36', name: 'Ispanak (100g, Çiğ)', cal: 23, p: 2.9, c: 3.6, f: 0.4 },
  { id: '37', name: 'Domates (1 adet, Orta)', cal: 22, p: 1.1, c: 4.8, f: 0.2 },
  { id: '38', name: 'Salatalık (1 adet, Orta)', cal: 15, p: 0.7, c: 3.6, f: 0.1 },
  { id: '39', name: 'Biber / Sivri veya Dolmalık (100g)', cal: 20, p: 0.9, c: 4.6, f: 0.2 },
  { id: '40', name: 'Yeşillik / Marul / Roka (1 porsiyon)', cal: 15, p: 1.2, c: 2.5, f: 0.2 },

  // --- SAĞLIKLI YAĞLAR & KURUYEMİŞLER ---
  { id: '41', name: 'Avokado (Yarım, Orta Boy)', cal: 160, p: 2, c: 9, f: 15 },
  { id: '42', name: 'Zeytinyağı (1 Yemek Kaşığı / 10ml)', cal: 88, p: 0, c: 0, f: 10 },
  { id: '43', name: 'Tereyağı (1 Tatlı Kaşığı / 10g)', cal: 74, p: 0.1, c: 0, f: 8.4 },
  { id: '44', name: 'Çiğ Badem (30g / Bir avuç)', cal: 173, p: 6, c: 6, f: 15 },
  { id: '45', name: 'Çiğ Ceviz İçi (30g / Bir avuç)', cal: 196, p: 4.3, c: 3.9, f: 19.5 },
  { id: '46', name: 'Çiğ Fındık (30g)', cal: 188, p: 4.5, c: 4.8, f: 18.2 },
  { id: '47', name: 'Fıstık Ezmesi (1 Yemek Kaşığı / 15g)', cal: 94, p: 4, c: 3, f: 8 },
  { id: '48', name: 'Badem Ezmesi (1 Yemek Kaşığı)', cal: 98, p: 3.4, c: 3, f: 9 },
  { id: '49', name: 'Siyah Zeytin (5 adet)', cal: 50, p: 0.4, c: 0.5, f: 5.2 },
  { id: '50', name: 'Yeşil Zeytin (5 adet)', cal: 40, p: 0.3, c: 0.4, f: 4.1 },

  // --- MEYVELER & ENERJİ KAYNAKLARI ---
  { id: '51', name: 'Muz (Orta Boy / 120g)', cal: 105, p: 1.3, c: 27, f: 0.3 },
  { id: '52', name: 'Elma (Orta Boy / 150g)', cal: 78, p: 0.4, c: 21, f: 0.2 },
  { id: '53', name: 'Yaban Mersini (100g)', cal: 57, p: 0.7, c: 14.5, f: 0.3 },
  { id: '54', name: 'Çilek (100g)', cal: 32, p: 0.7, c: 7.7, f: 0.3 },
  { id: '55', name: 'Ananas (100g)', cal: 50, p: 0.5, c: 13.1, f: 0.1 },
  { id: '56', name: 'Kuru Üzüm (30g)', cal: 89, p: 0.9, c: 23, f: 0.1 },
  { id: '57', name: 'Hurma (3 adet / 30g)', cal: 84, p: 0.6, c: 22.5, f: 0.1 },
  { id: '58', name: 'Mandarin / Portakal (1 adet)', cal: 60, p: 1.2, c: 15, f: 0.2 },
  { id: '59', name: 'Kivi (1 adet)', cal: 42, p: 0.8, c: 10, f: 0.4 },
  { id: '60', name: 'Greyfurt (Yarım boy)', cal: 52, p: 0.9, c: 13, f: 0.2 },

  // --- EK GIDALAR & SPORCU SUPLEMENTLERİ ---
  { id: '61', name: 'Whey Protein Tozu (1 ölçek / 30g)', cal: 120, p: 24, c: 3, f: 1.5 },
  { id: '62', name: 'Kazein Protein Tozu (1 ölçek / 30g)', cal: 110, p: 22, c: 2, f: 1 },
  { id: '63', name: 'Protein Bar (Standart 50g)', cal: 190, p: 20, c: 18, f: 6 },
  { id: '64', name: 'Pirinç Unu (50g / Mama veya Lapa)', cal: 180, p: 3.5, c: 40, f: 0.5 },
  { id: '65', name: 'Maltodekstrin / Karbonhidrat Tozu (30g)', cal: 115, p: 0, c: 28, f: 0 },

  // --- EKMEK & UNLU MAMULLER (TAM BUĞDAY / ÇAVDAR) ---
  { id: '66', name: 'Tam Buğday Ekmeği (1 dilim / 30g)', cal: 75, p: 3.5, c: 13.5, f: 1 },
  { id: '67', name: 'Çavdar Ekmeği (1 dilim / 30g)', cal: 70, p: 2.6, c: 14, f: 0.8 },
  { id: '68', name: 'Eksşik Maya Ekşi Mayalı Ekmek (1 dilim)', cal: 85, p: 3, c: 16, f: 0.5 },
  { id: '69', name: 'Yulaflı Diyet Kraker (1 paket)', cal: 140, p: 3, c: 20, f: 5 },
  { id: '70', name: 'Pirinç Patlağı (3 adet)', cal: 75, p: 1.5, c: 16, f: 0.3 },

  // --- ALTERNATİF PROTEİN VE İÇECEKLER ---
  { id: '71', name: 'Süzme Peynir / Light (100g)', cal: 75, p: 13, c: 2, f: 1.5 },
  { id: '72', name: 'Ayran (1 Su Bardağı / 200ml)', cal: 70, p: 3.5, c: 6, f: 3.5 },
  { id: '73', name: 'Maden Suyu / Soda (Sade)', cal: 0, p: 0, c: 0, f: 0 },
  { id: '74', name: 'Şekersiz Kahve / Americano (1 fincan)', cal: 5, p: 0.3, c: 0, f: 0 },
  { id: '75', name: 'Yeşil Çay (1 fincan)', cal: 2, p: 0, c: 0, f: 0 },

  // --- EKSTRA ÖĞÜN SEÇENEKLERİ & ALTERNATİFLER ---
  { id: '76', name: 'Hindi Eti (100g, Izgara)', cal: 150, p: 30, c: 0, f: 3 },
  { id: '77', name: 'Kırmızı Et Köfte (3 adet / 100g)', cal: 230, p: 18, c: 4, f: 15 },
  { id: '78', name: 'Fırınlanmış Tavuk Pirzola (100g)', cal: 232, p: 24, c: 0, f: 14 },
  { id: '79', name: 'Erişte / Kesme Makarna (100g, Pişmiş)', cal: 140, p: 4.5, c: 26, f: 1.5 },
  { id: '80', name: 'Bulgur ve Mercimek Karışımı (Mücendra / 100g)', cal: 135, p: 5, c: 25, f: 1.2 },

  // --- ÇEŞİTLİ SEBZELER VE SALATA MALZEMELERİ ---
  { id: '81', name: 'Kabak (100g, Sote/Haşlama)', cal: 20, p: 1.2, c: 3.6, f: 0.2 },
  { id: '82', name: 'Patlıcan (100g, Fırın/Közleme)', cal: 25, p: 1, c: 6, f: 0.2 },
  { id: '83', name: 'Mantar (100g, Sote)', cal: 22, p: 3.1, c: 3.3, f: 0.3 },
  { id: '84', name: 'Kırmızı Lahana (100g)', cal: 31, p: 1.4, c: 7.4, f: 0.2 },
  { id: '85', name: 'Hvuç (1 adet, Orta Boy)', cal: 25, p: 0.6, c: 6, f: 0.1 },
  { id: '86', name: 'Sarımsak (1 diş)', cal: 4, p: 0.2, c: 1, f: 0 },
  { id: '87', name: 'Soğan (1 küçük boy)', cal: 30, p: 0.8, c: 7, f: 0.1 },
  { id: '88', name: 'Limon Suyu (1 yemek kaşığı)', cal: 4, p: 0.1, c: 1.3, f: 0 },
  { id: '89', name: 'Sirke / Elma Sirkesi (1 tatlı kaşığı)', cal: 3, p: 0, c: 0.1, f: 0 },
  { id: '90', name: 'Chia Tohumu (1 yemek kaşığı / 10g)', cal: 49, p: 1.7, c: 4.2, f: 3.1 },

  // --- TOHUMLAR, ATIŞTIRMALIKLAR VE EK DETAYLAR ---
  { id: '91', name: 'Keten Tohumu (1 yemek kaşığı / 10g)', cal: 53, p: 1.8, c: 2.9, f: 4.2 },
  { id: '92', name: 'Kabak Çekirdeği İçi (20g)', cal: 112, p: 6, c: 2.5, f: 9.2 },
  { id: '93', name: 'Ayçiçeği Çekirdeği İçi (20g)', cal: 116, p: 4.2, c: 4, f: 10 },
  { id: '94', name: 'Bitter Çikolata %70+ (20g / 2 kare)', cal: 120, p: 1.6, c: 9.5, f: 8.5 },
  { id: '95', name: 'Porsiyonluk Lorlu Omlet (2 yumurta + 50g lor)', cal: 200, p: 24, c: 2, f: 10.5 },
  { id: '96', name: 'Ton Balıklı Salata Kasesi (Standart)', cal: 280, p: 30, c: 10, f: 12 },
  { id: '97', name: 'Yulaflı Protein Pankeki (1 porsiyon)', cal: 250, p: 25, c: 28, f: 4 },
  { id: '98', name: 'Haşlanmış Yumurta Beyazı Salatası', cal: 120, p: 20, c: 2, f: 3 },
  { id: '99', name: 'Ev Yapımı Tavuklu Pilav (1 tabak / 250g)', cal: 380, p: 32, c: 42, f: 8 },
  { id: '100', name: 'Light Yoğurt ve Yulaf Karışımı (Atıştırmalık)', cal: 220, p: 14, c: 35, f: 3 }
];