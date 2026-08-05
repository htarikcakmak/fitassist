// src/data/foodLibrary.ts

export type FoodItem = {
  id: string;
  name: string;
  cal: number;
  p: number; // Protein (g)
  c: number; // Karbonhidrat (g) -> Lif düşülmüş NET KARB değeri kullanılmıştır
  f: number; // Yağ (g)
  unit: 'adet' | 'gram'; 
  baseAmount: number; 
  info?: string; 
};

export const FOOD_LIBRARY: FoodItem[] = [
  // ==========================================
  // KAHVALTILIK, YUMURTA & SÜT ÜRÜNLERİ
  // ==========================================
  { id: '1', name: 'Yumurta (Haşlanmış)', cal: 78, p: 6.3, c: 0.6, f: 5.3, unit: 'adet', baseAmount: 1, info: '1 adet orta boy (50g) yumurta.' },
  { id: '2', name: 'Yumurta Beyazı', cal: 17, p: 3.6, c: 0.2, f: 0.1, unit: 'adet', baseAmount: 1, info: 'Sıfır yağ, saf protein kaynağı.' },
  { id: '3', name: 'Yumurta (Omlet, Az Yağlı)', cal: 95, p: 6.5, c: 1, f: 7, unit: 'adet', baseAmount: 1, info: '1 yumurtadan yapılmış omlet.' },
  { id: '4', name: 'Kefir (Sade)', cal: 104, p: 8, c: 12, f: 2.5, unit: 'gram', baseAmount: 200, info: '1 standart su bardağı kefir.' },
  { id: '5', name: 'Kefir (Altınbaşak/Probiyotik)', cal: 120, p: 9, c: 10, f: 3, unit: 'gram', baseAmount: 200, info: 'Tam yağlı probiyotik kefir.' },
  { id: '6', name: 'Lor Peyniri (Yağsız)', cal: 98, p: 11, c: 3, f: 4.5, unit: 'gram', baseAmount: 100, info: 'Yüksek proteinli kahvaltılık. 3 yemek kaşığı ~50g.' },
  { id: '7', name: 'Süzme Yoğurt', cal: 130, p: 10, c: 4, f: 8, unit: 'gram', baseAmount: 100, info: '2 tepeleme yemek kaşığı.' },
  { id: '8', name: 'Yoğurt (Yarım Yağlı)', cal: 60, p: 4.5, c: 5, f: 1.5, unit: 'gram', baseAmount: 100, info: '1 küçük kase.' },
  { id: '9', name: 'Süt (Yarım Yağlı)', cal: 102, p: 8.2, c: 12, f: 2.4, unit: 'gram', baseAmount: 200, info: '1 su bardağı süt.' },
  { id: '10', name: 'Süt (Laktozsuz)', cal: 110, p: 8, c: 10, f: 3, unit: 'gram', baseAmount: 200, info: '1 su bardağı laktozsuz süt.' },
  { id: '11', name: 'Ezine Peyniri (Tam Yağlı)', cal: 93, p: 5, c: 0.5, f: 8, unit: 'gram', baseAmount: 30, info: '1 kibrit kutusu büyüklüğünde.' },
  { id: '12', name: 'Ayran', cal: 70, p: 3.5, c: 6, f: 3.5, unit: 'gram', baseAmount: 200, info: '1 su bardağı.' },
  { id: '13', name: 'Kaşar Peyniri', cal: 105, p: 8, c: 0.5, f: 8, unit: 'gram', baseAmount: 30, info: '1 ince dilim.' },
  { id: '14', name: 'Cottage Peyniri', cal: 98, p: 11, c: 3.4, f: 4.3, unit: 'gram', baseAmount: 100, info: 'Düşük yağlı sporcu peyniri.' },
  { id: '15', name: 'Labne Peyniri', cal: 60, p: 2, c: 1, f: 5.5, unit: 'gram', baseAmount: 30, info: '1 yemek kaşığı dolusu.' },
  { id: '16', name: 'Çeçil Peyniri', cal: 90, p: 8.5, c: 0.5, f: 6, unit: 'gram', baseAmount: 30, info: 'Sporcular için lifli peynir.' },
  { id: '17', name: 'Tulum Peyniri', cal: 110, p: 7, c: 1, f: 9, unit: 'gram', baseAmount: 30, info: 'Yağ oranı yüksek peynir.' },

  // ==========================================
  // KIRMIZI ET, TAVUK & DENİZ ÜRÜNLERİ
  // ==========================================
  { id: '18', name: 'Tavuk Göğsü (Izgara/Haşlama)', cal: 165, p: 31, c: 0, f: 3.6, unit: 'gram', baseAmount: 100, info: 'Saf protein deposu. Avuç içi kadar.' },
  { id: '19', name: 'Tavuk Göğsü (Çiğ)', cal: 120, p: 22, c: 0, f: 2.6, unit: 'gram', baseAmount: 100, info: 'Pişmemiş mutfak tartısı ağırlığı.' },
  { id: '20', name: 'Tavuk Döner Dürüm (Hatay Usulü)', cal: 450, p: 35, c: 45, f: 15, unit: 'adet', baseAmount: 1, info: '1 standart boy, soslu bol tavuklu Antakya/Hatay dürüm.' },
  { id: '21', name: 'Tavuk Döner (Porsiyon)', cal: 320, p: 30, c: 5, f: 18, unit: 'gram', baseAmount: 150, info: 'Sadece et ve az yağ, porsiyon.' },
  { id: '22', name: 'Tavuk But (Derisiz)', cal: 209, p: 26, c: 0, f: 10.9, unit: 'gram', baseAmount: 100, info: 'Daha yumuşak, orta yağlı tavuk eti.' },
  { id: '23', name: 'Hindi Göğsü (Izgara)', cal: 147, p: 30, c: 0, f: 2.1, unit: 'gram', baseAmount: 100, info: 'Tavuğa alternatif yağsız protein.' },
  { id: '24', name: 'Dana Biftek (Izgara)', cal: 250, p: 26, c: 0, f: 15, unit: 'gram', baseAmount: 100, info: 'Orta yağlı dana eti.' },
  { id: '25', name: 'Yağsız Dana Kıyma', cal: 215, p: 27, c: 0, f: 11, unit: 'gram', baseAmount: 100, info: 'Kavrulmuş ağırlık.' },
  { id: '26', name: 'Et Döner (Sade)', cal: 280, p: 24, c: 2, f: 19, unit: 'gram', baseAmount: 100, info: '1 porsiyon döner.' },
  { id: '27', name: 'İskender Döner', cal: 750, p: 40, c: 55, f: 38, unit: 'adet', baseAmount: 1, info: '1 porsiyon tereyağlı İskender kebap.' },
  { id: '28', name: 'Köfte (Izgara)', cal: 230, p: 18, c: 4, f: 15, unit: 'adet', baseAmount: 3, info: '3 adet standart kasap köfte (~100g).' },
  { id: '29', name: 'Ton Balığı (Suda)', cal: 116, p: 25.5, c: 0, f: 0.8, unit: 'gram', baseAmount: 100, info: 'Suyu süzülmüş net ağırlık.' },
  { id: '30', name: 'Ton Balığı (Yağda)', cal: 186, p: 26, c: 0, f: 8, unit: 'gram', baseAmount: 100, info: 'Yağı süzülmüş konserve.' },
  { id: '31', name: 'Somon Balığı (Fırın)', cal: 206, p: 22.1, c: 0, f: 12.3, unit: 'gram', baseAmount: 100, info: 'Omega-3 zengini.' },
  { id: '32', name: 'Levrek / Çipura', cal: 124, p: 20, c: 0, f: 4.5, unit: 'gram', baseAmount: 100, info: 'Kılçıksız temiz et.' },
  { id: '33', name: 'Hindi Füme (Paket)', cal: 52, p: 9.5, c: 1, f: 1.2, unit: 'gram', baseAmount: 50, info: '1 paket genelde 50 gramdır.' },
  { id: '34', name: 'Dana Antrikot', cal: 291, p: 24, c: 0, f: 21, unit: 'gram', baseAmount: 100, info: 'Yüksek yağlı, lezzetli kırmızı et.' },
  { id: '35', name: 'Kuzu Pirzola', cal: 320, p: 22, c: 0, f: 25, unit: 'adet', baseAmount: 2, info: '2 adet kemikli kuzu pirzola.' },
  { id: '36', name: 'Hamsi (Fırın)', cal: 160, p: 18, c: 0, f: 9, unit: 'gram', baseAmount: 100, info: 'Yağsız fırınlanmış hamsi.' },
  { id: '37', name: 'Kalamar (Izgara)', cal: 90, p: 16, c: 3, f: 1.5, unit: 'gram', baseAmount: 100, info: 'Kızartma değil, ızgara kalamar.' },
  { id: '38', name: 'Ciğer (Kavurma)', cal: 190, p: 26, c: 4, f: 7, unit: 'gram', baseAmount: 100, info: 'Yüksek demir kaynağı.' },
  
  // ==========================================
  // KOMPLEKS KARBONHİDRATLAR & TAHILLAR
  // ==========================================
  { id: '39', name: 'Yulaf Ezmesi', cal: 389, p: 16.9, c: 66.3, f: 6.9, unit: 'gram', baseAmount: 100, info: '1 tepeleme yemek kaşığı ~10g.' },
  { id: '40', name: 'Basmati Pirinç (Pişmiş)', cal: 121, p: 3.5, c: 25.5, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Düşük glisemik indeksli pirinç.' },
  { id: '41', name: 'Beyaz Pirinç (Pişmiş)', cal: 130, p: 2.7, c: 28, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Hızlı enerji. 1 kase ~200g.' },
  { id: '42', name: 'Bulgur Pilavı (Pişmiş)', cal: 145, p: 4.5, c: 30.8, f: 1.3, unit: 'gram', baseAmount: 100, info: 'Lifli karbonhidrat.' },
  { id: '43', name: 'Esmer Pirinç (Pişmiş)', cal: 111, p: 2.6, c: 23, f: 0.9, unit: 'gram', baseAmount: 100, info: 'Kompleks karb kaynağı.' },
  { id: '44', name: 'Karabuğday / Greçka (Pişmiş)', cal: 92, p: 3.4, c: 20, f: 0.6, unit: 'gram', baseAmount: 100, info: 'Glütensiz harika bir karb.' },
  { id: '45', name: 'Kinoa (Pişmiş)', cal: 120, p: 4.4, c: 21.3, f: 1.9, unit: 'gram', baseAmount: 100, info: 'Protein oranı yüksek tahıl.' },
  { id: '46', name: 'Makarna (Pişmiş)', cal: 157, p: 5.8, c: 30.9, f: 0.9, unit: 'gram', baseAmount: 100, info: 'Sade, sossuz haşlanmış makarna.' },
  { id: '47', name: 'Tam Buğday Makarna', cal: 124, p: 5.3, c: 26.5, f: 0.8, unit: 'gram', baseAmount: 100, info: 'Daha tok tutan makarna türü.' },
  { id: '48', name: 'Haşlanmış Patates', cal: 87, p: 1.9, c: 20, f: 0.1, unit: 'gram', baseAmount: 100, info: '1 orta boy patates ~150g.' },
  { id: '49', name: 'Tatlı Patates (Fırın)', cal: 90, p: 2, c: 21, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Beta-karoten deposu.' },
  { id: '50', name: 'Pirinç Unu', cal: 360, p: 6, c: 80, f: 1.5, unit: 'gram', baseAmount: 100, info: 'Antrenman öncesi lapa/krem pirinç için.' },
  { id: '51', name: 'Yulaf Unu', cal: 400, p: 14, c: 66, f: 7, unit: 'gram', baseAmount: 100, info: 'Pankek yapımı için yulaf unu.' },
  { id: '52', name: 'Tam Buğday Ekmeği', cal: 75, p: 3.5, c: 13.5, f: 1, unit: 'adet', baseAmount: 1, info: '1 standart ince dilim (30g).' },
  { id: '53', name: 'Çavdar Ekmeği', cal: 70, p: 2.6, c: 14, f: 0.8, unit: 'adet', baseAmount: 1, info: '1 standart dilim (30g).' },
  { id: '54', name: 'Lavaş (İnce)', cal: 150, p: 4, c: 28, f: 2, unit: 'adet', baseAmount: 1, info: '1 adet dürüm lavaşı.' },
  { id: '55', name: 'Lavaş (Tam Buğday)', cal: 130, p: 5, c: 22, f: 1.5, unit: 'adet', baseAmount: 1, info: '1 adet esmer lavaş.' },
  { id: '56', name: 'Pirinç Patlağı (Rice Cake)', cal: 25, p: 0.5, c: 5.5, f: 0.1, unit: 'adet', baseAmount: 1, info: '1 adet yuvarlak patlak.' },
  { id: '57', name: 'Galeta (Kepekli)', cal: 40, p: 1.2, c: 7.5, f: 0.5, unit: 'adet', baseAmount: 1, info: '1 adet standart galeta.' },
  { id: '58', name: 'Mısır Gevreği (Şekersiz)', cal: 110, p: 2, c: 24, f: 0.5, unit: 'gram', baseAmount: 30, info: '1 kase gevrek.' },

  // ==========================================
  // BAKLAGİLLER
  // ==========================================
  { id: '59', name: 'Kırmızı Mercimek (Haşlanmış)', cal: 116, p: 9, c: 20, f: 0.4, unit: 'gram', baseAmount: 100, info: '1 kepçe çorba veya lapa.' },
  { id: '60', name: 'Yeşil Mercimek (Haşlanmış)', cal: 116, p: 9, c: 20, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Salatalar için harika bir bitkisel protein.' },
  { id: '61', name: 'Nohut (Haşlanmış)', cal: 164, p: 8.9, c: 27.4, f: 2.6, unit: 'gram', baseAmount: 100, info: '4-5 yemek kaşığı ~100g.' },
  { id: '62', name: 'Kuru Fasulye (Pişmiş)', cal: 127, p: 8.7, c: 22.8, f: 0.5, unit: 'gram', baseAmount: 100, info: 'Suyu süzülmüş taneler.' },
  { id: '63', name: 'Barbunya (Pişmiş)', cal: 123, p: 8.7, c: 22.5, f: 0.5, unit: 'gram', baseAmount: 100, info: 'Zeytinyağsız süzme ağırlık.' },
  { id: '64', name: 'Edamame (Soya Fasulyesi)', cal: 121, p: 11.9, c: 8.9, f: 5.2, unit: 'gram', baseAmount: 100, info: 'En yüksek proteinli baklagillerden.' },
  { id: '65', name: 'Siyah Fasulye', cal: 132, p: 8.9, c: 23.7, f: 0.5, unit: 'gram', baseAmount: 100, info: 'Lif oranı çok yüksektir.' },
  { id: '66', name: 'Bezelye (Haşlanmış)', cal: 81, p: 5.4, c: 14.4, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Düşük kalorili garnitür.' },

  // ==========================================
  // SEBZELER & YEŞİLLİKLER (Net Karb Kullanıldı)
  // ==========================================
  { id: '67', name: 'Brokoli (Haşlanmış)', cal: 35, p: 2.4, c: 4.2, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Lif düşülmüş net karb.' },
  { id: '68', name: 'Ispanak (Çiğ)', cal: 23, p: 2.9, c: 1.4, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Çiğ ağırlığıdır, piştiğinde küçülür.' },
  { id: '69', name: 'Kuşkonmaz', cal: 20, p: 2.2, c: 1.8, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Su atıcı (diüretik) etkisi vardır.' },
  { id: '70', name: 'Mantar (Sote)', cal: 22, p: 3.1, c: 2.3, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Düşük kalorili tokluk sağlar.' },
  { id: '71', name: 'Domates', cal: 22, p: 1.1, c: 3.3, f: 0.2, unit: 'adet', baseAmount: 1, info: '1 adet orta boy domates.' },
  { id: '72', name: 'Salatalık', cal: 15, p: 0.7, c: 2.1, f: 0.1, unit: 'adet', baseAmount: 1, info: '1 adet orta boy salatalık.' },
  { id: '73', name: 'Yeşil Biber', cal: 20, p: 0.9, c: 3.0, f: 0.2, unit: 'adet', baseAmount: 1, info: '1 adet standart biber.' },
  { id: '74', name: 'Kapya Biber (Kırmızı)', cal: 30, p: 1, c: 4.5, f: 0.3, unit: 'adet', baseAmount: 1, info: '1 adet orta boy kapya.' },
  { id: '75', name: 'Kabak (Izgara/Sote)', cal: 20, p: 1.2, c: 2.5, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Diyet döneminin kurtarıcısı.' },
  { id: '76', name: 'Patlıcan (Közlenmiş)', cal: 25, p: 1, c: 3.5, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Yağ eklenmemiş hali.' },
  { id: '77', name: 'Karnabahar', cal: 25, p: 2, c: 3, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Pirinç alternatifi yapılabilir.' },
  { id: '78', name: 'Brüksel Lahanası', cal: 43, p: 3.4, c: 5.2, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Sert yapraklı kış sebzesi.' },
  { id: '79', name: 'Havuç', cal: 25, p: 0.6, c: 4.5, f: 0.1, unit: 'adet', baseAmount: 1, info: '1 adet orta boy.' },
  { id: '80', name: 'Göbek Marul', cal: 14, p: 0.9, c: 1.8, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Hacim verir, kalori eklemez.' },
  { id: '81', name: 'Roka', cal: 25, p: 2.6, c: 2, f: 0.7, unit: 'gram', baseAmount: 100, info: 'Demir açısından zengindir.' },
  { id: '82', name: 'Maydanoz', cal: 36, p: 3, c: 3, f: 0.8, unit: 'gram', baseAmount: 100, info: 'Ödem atmaya yardımcıdır.' },
  { id: '83', name: 'Taze Fasulye (Zeytinyağlı)', cal: 45, p: 1.5, c: 4, f: 2.5, unit: 'gram', baseAmount: 100, info: 'Az yağlı ev yemeği formatı.' },
  { id: '84', name: 'Pırasa', cal: 61, p: 1.5, c: 10, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Kış sebzesi.' },
  { id: '85', name: 'Kırmızı Lahana', cal: 31, p: 1.4, c: 5, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Salataların vazgeçilmezi.' },
  { id: '86', name: 'Beyaz Lahana', cal: 25, p: 1.3, c: 3.5, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Lif kaynağı.' },
  { id: '87', name: 'Soğan (Kuru)', cal: 40, p: 1.1, c: 7.5, f: 0.1, unit: 'adet', baseAmount: 1, info: '1 adet orta boy.' },
  { id: '88', name: 'Sarımsak', cal: 15, p: 0.6, c: 3, f: 0.1, unit: 'adet', baseAmount: 3, info: '3 diş sarımsak.' },

  // ==========================================
  // MEYVELER
  // ==========================================
  { id: '89', name: 'Muz', cal: 105, p: 1.3, c: 27, f: 0.3, unit: 'adet', baseAmount: 1, info: '1 orta boy muz (~120g). Antrenman öncesi mükemmel.' },
  { id: '90', name: 'Elma', cal: 78, p: 0.4, c: 21, f: 0.2, unit: 'adet', baseAmount: 1, info: '1 adet orta boy.' },
  { id: '91', name: 'Yeşil Elma', cal: 70, p: 0.3, c: 18, f: 0.2, unit: 'adet', baseAmount: 1, info: 'Düşük şekerli ekşi elma.' },
  { id: '92', name: 'Çilek', cal: 32, p: 0.7, c: 7.7, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Düşük kalorili, 7-8 adet.' },
  { id: '93', name: 'Yaban Mersini', cal: 57, p: 0.7, c: 14.5, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Yulaf üstü antioksidan.' },
  { id: '94', name: 'Kivi', cal: 42, p: 0.8, c: 10, f: 0.4, unit: 'adet', baseAmount: 1, info: '1 adet kivi. C vitamini.' },
  { id: '95', name: 'Mandalina', cal: 45, p: 0.8, c: 11, f: 0.2, unit: 'adet', baseAmount: 1, info: '1 adet orta boy.' },
  { id: '96', name: 'Portakal', cal: 62, p: 1.2, c: 15.4, f: 0.2, unit: 'adet', baseAmount: 1, info: '1 adet orta boy.' },
  { id: '97', name: 'Kavun', cal: 34, p: 0.8, c: 8.2, f: 0.2, unit: 'gram', baseAmount: 100, info: '1 ince dilim.' },
  { id: '98', name: 'Karpuz', cal: 30, p: 0.6, c: 7.6, f: 0.2, unit: 'gram', baseAmount: 100, info: '1 ince dilim.' },
  { id: '99', name: 'Ananas', cal: 50, p: 0.5, c: 13, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Sindirimi kolaylaştırır.' },
  { id: '100', name: 'Hurma', cal: 84, p: 0.6, c: 22.5, f: 0.1, unit: 'adet', baseAmount: 3, info: '3 adet (30g) tatlı krizine birebir.' },
  { id: '101', name: 'Kuru İncir', cal: 100, p: 1.5, c: 24, f: 0.4, unit: 'adet', baseAmount: 2, info: '2 adet kuru incir.' },
  { id: '102', name: 'Kuru Kayısı', cal: 85, p: 1.4, c: 22, f: 0.2, unit: 'adet', baseAmount: 4, info: '4 adet kuru kayısı.' },
  { id: '103', name: 'Kuru Üzüm', cal: 90, p: 1, c: 23, f: 0.1, unit: 'gram', baseAmount: 30, info: '1 küçük avuç.' },
  { id: '104', name: 'Armut', cal: 85, p: 0.5, c: 22, f: 0.2, unit: 'adet', baseAmount: 1, info: '1 adet orta boy.' },
  { id: '105', name: 'Şeftali', cal: 50, p: 1, c: 12, f: 0.2, unit: 'adet', baseAmount: 1, info: '1 adet orta boy.' },
  { id: '106', name: 'Kiraz', cal: 50, p: 1, c: 12, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Yaz meyvesi.' },
  { id: '107', name: 'Erik', cal: 40, p: 0.6, c: 9, f: 0.2, unit: 'adet', baseAmount: 3, info: '3 adet orta boy erik.' },
  { id: '108', name: 'Nar', cal: 70, p: 1.2, c: 16, f: 0.8, unit: 'gram', baseAmount: 100, info: 'Ayıklanmış nar taneleri.' },

  // ==========================================
  // SAĞLIKLI YAĞLAR, TOHUMLAR & KURUYEMİŞLER 
  // (Filtre Hatasını Önlemek İçin Net Karb Uygulandı)
  // ==========================================
  { id: '109', name: 'Avokado', cal: 160, p: 2, c: 2, f: 15, unit: 'adet', baseAmount: 0.5, info: 'YARIM (1/2) avokado. (Net karb kullanıldı)' },
  { id: '110', name: 'Zeytinyağı', cal: 88, p: 0, c: 0, f: 10, unit: 'gram', baseAmount: 10, info: '1 yemek kaşığı (10ml).' },
  { id: '111', name: 'Hindistan Cevizi Yağı', cal: 86, p: 0, c: 0, f: 10, unit: 'gram', baseAmount: 10, info: '1 yemek kaşığı.' },
  { id: '112', name: 'Tereyağı', cal: 74, p: 0.1, c: 0, f: 8.4, unit: 'gram', baseAmount: 10, info: '1 tatlı kaşığı.' },
  { id: '113', name: 'Zeytin (Siyah)', cal: 50, p: 0.4, c: 0.5, f: 5.2, unit: 'adet', baseAmount: 5, info: '5 adet standart siyah zeytin.' },
  { id: '114', name: 'Zeytin (Yeşil)', cal: 40, p: 0.3, c: 0.4, f: 4.1, unit: 'adet', baseAmount: 5, info: '5 adet standart yeşil zeytin.' },
  { id: '115', name: 'Çiğ Badem', cal: 173, p: 6, c: 2.5, f: 15, unit: 'gram', baseAmount: 30, info: '1 avuç. (Net karb kullanıldı)' },
  { id: '116', name: 'Çiğ Ceviz', cal: 196, p: 4.3, c: 2, f: 19.5, unit: 'gram', baseAmount: 30, info: '3-4 tam ceviz içi. (Net karb kullanıldı)' },
  { id: '117', name: 'Çiğ Fındık', cal: 188, p: 4.5, c: 2, f: 18.2, unit: 'gram', baseAmount: 30, info: '1 küçük avuç. (Net karb kullanıldı)' },
  { id: '118', name: 'Çiğ Kaju', cal: 165, p: 5.1, c: 8, f: 13.8, unit: 'gram', baseAmount: 30, info: '1 küçük avuç. (Net karb kullanıldı)' },
  { id: '119', name: 'Yer Fıstığı', cal: 161, p: 7.3, c: 2, f: 14, unit: 'gram', baseAmount: 30, info: 'Tuzsuz, kavrulmamış. (Net karb kullanıldı)' },
  { id: '120', name: 'Fıstık Ezmesi (Şekersiz)', cal: 94, p: 4, c: 1.5, f: 8, unit: 'gram', baseAmount: 15, info: '1 tepeleme tatlı kaşığı. (Net karb kullanıldı)' },
  { id: '121', name: 'Badem Ezmesi (Şekersiz)', cal: 98, p: 3.4, c: 1.5, f: 9, unit: 'gram', baseAmount: 15, info: '1 tepeleme tatlı kaşığı. (Net karb kullanıldı)' },
  { id: '122', name: 'Chia Tohumu', cal: 49, p: 1.7, c: 0.5, f: 3.1, unit: 'gram', baseAmount: 10, info: '1 yemek kaşığı. (Mükemmel yağ/lif kaynağı)' },
  { id: '123', name: 'Keten Tohumu', cal: 53, p: 1.8, c: 0.5, f: 4.2, unit: 'gram', baseAmount: 10, info: '1 yemek kaşığı.' },
  { id: '124', name: 'Kabak Çekirdeği İçi', cal: 112, p: 6, c: 1.5, f: 9.2, unit: 'gram', baseAmount: 20, info: 'Çinko kaynağı, 1 avuç.' },
  { id: '125', name: 'Ayçekirdeği İçi', cal: 116, p: 4.2, c: 2, f: 10, unit: 'gram', baseAmount: 20, info: '1 küçük avuç.' },
  { id: '126', name: 'Tahin', cal: 89, p: 2.5, c: 1.5, f: 8, unit: 'gram', baseAmount: 15, info: '1 yemek kaşığı sade tahin.' },
  { id: '127', name: 'Susam', cal: 57, p: 1.7, c: 1, f: 5, unit: 'gram', baseAmount: 10, info: 'Yemeklerin üzerine serpmek için.' },
  { id: '128', name: 'Bitter Çikolata (%80+)', cal: 120, p: 1.6, c: 4, f: 8.5, unit: 'gram', baseAmount: 20, info: '2 kare. (Net karb kullanıldı)' },
  { id: '129', name: 'Macadamia Cevizi', cal: 215, p: 2.2, c: 1.5, f: 22.5, unit: 'gram', baseAmount: 30, info: 'En yüksek yağ oranına sahip kuruyemiş.' },
  { id: '130', name: 'Antep Fıstığı', cal: 168, p: 6, c: 5, f: 13, unit: 'gram', baseAmount: 30, info: 'Kabuksuz net ağırlık.' },

  // ==========================================
  // TAKVİYELER, İÇECEKLER & EKSTRALAR
  // ==========================================
  { id: '131', name: 'Whey Protein Tozu', cal: 120, p: 24, c: 3, f: 1.5, unit: 'adet', baseAmount: 1, info: '1 ölçek (scoop) 30 gramdır.' },
  { id: '132', name: 'İzole Whey Protein', cal: 110, p: 27, c: 0.5, f: 0.5, unit: 'adet', baseAmount: 1, info: 'Sıfıra yakın karbonhidrat ve yağ.' },
  { id: '133', name: 'Kazein Proteini', cal: 110, p: 22, c: 2, f: 1, unit: 'adet', baseAmount: 1, info: '1 ölçek yavaş salınımlı protein.' },
  { id: '134', name: 'Maltodekstrin / Karb Tozu', cal: 115, p: 0, c: 28, f: 0, unit: 'gram', baseAmount: 30, info: 'Antrenman içi hızlı karbonhidrat.' },
  { id: '135', name: 'Gainer (Kütle Arttırıcı)', cal: 380, p: 15, c: 75, f: 2, unit: 'gram', baseAmount: 100, info: 'Standart bir gainer profili.' },
  { id: '136', name: 'Protein Bar (Düşük Şeker)', cal: 190, p: 20, c: 15, f: 6, unit: 'adet', baseAmount: 1, info: 'Ortalama 50 gramlık bar.' },
  { id: '137', name: 'Kreatin Monohidrat', cal: 0, p: 0, c: 0, f: 0, unit: 'gram', baseAmount: 5, info: '1 tatlı kaşığı. Kalori içermez.' },
  { id: '138', name: 'BCAA / EAA Tozu', cal: 10, p: 2.5, c: 0, f: 0, unit: 'gram', baseAmount: 10, info: 'Serbest form aminolar.' },
  { id: '139', name: 'Pre-Workout (Antrenman Öncesi)', cal: 5, p: 0, c: 1, f: 0, unit: 'gram', baseAmount: 10, info: '1 ölçek enerji tozu.' },
  { id: '140', name: 'Filtre Kahve / Americano', cal: 5, p: 0.3, c: 0, f: 0, unit: 'adet', baseAmount: 1, info: '1 kupa, şekersiz.' },
  { id: '141', name: 'Maden Suyu (Sade)', cal: 0, p: 0, c: 0, f: 0, unit: 'adet', baseAmount: 1, info: '1 şişe (200ml).' },
  { id: '142', name: 'Yeşil Çay', cal: 2, p: 0, c: 0, f: 0, unit: 'adet', baseAmount: 1, info: '1 kupa demleme.' },
  { id: '143', name: 'Sıfır Kalori Enerji İçeceği', cal: 10, p: 0, c: 1, f: 0, unit: 'adet', baseAmount: 1, info: '1 kutu şekersiz enerji içeceği.' },
  { id: '144', name: 'Şekersiz Kola', cal: 0, p: 0, c: 0, f: 0, unit: 'adet', baseAmount: 1, info: '1 kutu (330ml).' },
  
  // ==========================================
  // SPORCU ÖĞÜNLERİ & KARIŞIMLAR
  // ==========================================
  { id: '145', name: 'Light Ton Balıklı Salata', cal: 180, p: 28, c: 5, f: 4, unit: 'adet', baseAmount: 1, info: 'Yeşillikli, 1 standart porsiyon.' },
  { id: '146', name: 'Protein Pankek', cal: 250, p: 25, c: 28, f: 4, unit: 'adet', baseAmount: 1, info: '1 porsiyon (yulaf + protein tozu yapımı).' },
  { id: '147', name: 'Tavuklu Pirinç Pilavı', cal: 350, p: 30, c: 45, f: 4, unit: 'adet', baseAmount: 1, info: 'Klasik sporcu yemeği tabağı.' },
  { id: '148', name: 'Yulaf Lapası (Sütlü)', cal: 280, p: 12, c: 45, f: 5, unit: 'adet', baseAmount: 1, info: '1 kase standart lapa.' },
  { id: '149', name: 'Smoothie (Muz+Protein+Süt)', cal: 290, p: 30, c: 35, f: 3, unit: 'adet', baseAmount: 1, info: '1 büyük bardak sporcu karışımı.' },
  { id: '150', name: 'Tavuklu Sezar Salata (Krutonsuz)', cal: 220, p: 32, c: 6, f: 8, unit: 'adet', baseAmount: 1, info: 'Az soslu, saf ızgara tavuklu.' },
  
  // ==========================================
  // DENİZ ÜRÜNLERİ & FARKLI PROTEİNLER
  // ==========================================
  { id: '151', name: 'Karides (Haşlanmış)', cal: 99, p: 24, c: 0.2, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Düşük kalorili, saf protein.' },
  { id: '152', name: 'Kalamar (Haşlama/Izgara)', cal: 90, p: 16, c: 3, f: 1.5, unit: 'gram', baseAmount: 100, info: 'Kızartılmamış net ağırlık.' },
  { id: '153', name: 'Midye (Dolmasız/Sade)', cal: 86, p: 12, c: 3.5, f: 2, unit: 'gram', baseAmount: 100, info: 'Sadece iç eti.' },
  { id: '154', name: 'Ahtapot (Izgara)', cal: 164, p: 30, c: 4, f: 2, unit: 'gram', baseAmount: 100, info: 'Yüksek proteinli deniz ürünü.' },
  { id: '155', name: 'Hindi Kıyma (Yağsız)', cal: 135, p: 22, c: 0, f: 5, unit: 'gram', baseAmount: 100, info: 'Tavuk kıymasına alternatif.' },
  { id: '156', name: 'Kuzu Kuşbaşı (Yağsız)', cal: 200, p: 28, c: 0, f: 9, unit: 'gram', baseAmount: 100, info: 'Kırmızı et alternatifi.' },
  { id: '157', name: 'Ördek Göğsü (Derisiz)', cal: 201, p: 28, c: 0, f: 9, unit: 'gram', baseAmount: 100, info: 'Gurme bir protein kaynağı.' },
  { id: '158', name: 'Tofu (Sert)', cal: 144, p: 15, c: 2.8, f: 8.7, unit: 'gram', baseAmount: 100, info: 'Vegan protein kaynağı.' },
  { id: '159', name: 'Soya Kıyması', cal: 350, p: 52, c: 15, f: 1, unit: 'gram', baseAmount: 100, info: 'Bitkisel protein deposu.' },
  { id: '160', name: 'Tempeh', cal: 192, p: 20, c: 7.6, f: 10.8, unit: 'gram', baseAmount: 100, info: 'Fermente soya ürünü.' },
  { id: '161', name: 'Seitan', cal: 370, p: 75, c: 14, f: 1.8, unit: 'gram', baseAmount: 100, info: 'Buğday glüteni (Yüksek protein).' },

  // ==========================================
  // PEYNİRLER & SÜT ÜRÜNLERİ (DEVAMI)
  // ==========================================
  { id: '162', name: 'Parmesan Peyniri', cal: 431, p: 38, c: 4, f: 29, unit: 'gram', baseAmount: 100, info: 'Makarana/salata üstü için.' },
  { id: '163', name: 'Mozzarella (Suda)', cal: 280, p: 22, c: 2.2, f: 20, unit: 'gram', baseAmount: 100, info: 'Diyet pizzalar için ideal.' },
  { id: '164', name: 'Cheddar Peyniri', cal: 402, p: 25, c: 1.3, f: 33, unit: 'gram', baseAmount: 100, info: 'Yüksek yağlı peynir.' },
  { id: '165', name: 'Ricotta Peyniri', cal: 174, p: 11, c: 3, f: 13, unit: 'gram', baseAmount: 100, info: 'İtalyan lor peyniri.' },
  { id: '166', name: 'Gouda Peyniri', cal: 356, p: 25, c: 2.2, f: 27, unit: 'gram', baseAmount: 100, info: 'Aromalı sandviç peyniri.' },
  { id: '167', name: 'Hellim Peyniri (Izgara)', cal: 320, p: 22, c: 2, f: 25, unit: 'gram', baseAmount: 100, info: 'Kahvaltılık ızgara.' },
  { id: '168', name: 'Krem Peynir', cal: 342, p: 6, c: 4, f: 34, unit: 'gram', baseAmount: 100, info: 'Ekmek üstü (Net karb kullanıldı).' },

  // ==========================================
  // ALTERNATİF KARBONHİDRATLAR & TAHILLAR
  // ==========================================
  { id: '169', name: 'Kuskus (Pişmiş)', cal: 112, p: 3.8, c: 23, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Hafif bir makarna alternatifi.' },
  { id: '170', name: 'İrmik', cal: 360, p: 12, c: 72, f: 1, unit: 'gram', baseAmount: 100, info: 'Lapa yapımında kullanılır.' },
  { id: '171', name: 'Mısır Unu', cal: 362, p: 8, c: 76, f: 3, unit: 'gram', baseAmount: 100, info: 'Glütensiz un alternatifi.' },
  { id: '172', name: 'Galeta Unu', cal: 395, p: 13, c: 76, f: 3, unit: 'gram', baseAmount: 100, info: 'Kaplama ve köfte harcı için.' },
  { id: '173', name: 'Amarant (Pişmiş)', cal: 102, p: 3.8, c: 18, f: 1.6, unit: 'gram', baseAmount: 100, info: 'Kinoa benzeri proteinli tahıl.' },
  { id: '174', name: 'Kestane (Kavrulmuş)', cal: 245, p: 3, c: 53, f: 2, unit: 'gram', baseAmount: 100, info: 'Yağı çok düşük bir kuruyemiş/karb.' },
  { id: '175', name: 'Noodle (Sade/Haşlanmış)', cal: 138, p: 4.5, c: 27, f: 1.2, unit: 'gram', baseAmount: 100, info: 'Baharat sossuz yumurtalı erişte.' },
  { id: '176', name: 'Gnocchi (Patates Makarnası)', cal: 133, p: 3, c: 29, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Patates bazlı karbonhidrat.' },
  { id: '177', name: 'Erişte (Ev Yapımı, Pişmiş)', cal: 150, p: 5, c: 30, f: 1, unit: 'gram', baseAmount: 100, info: 'Geleneksel makarna.' },
  { id: '178', name: 'Siyah Pirinç (Pişmiş)', cal: 105, p: 4, c: 21, f: 1.5, unit: 'gram', baseAmount: 100, info: 'Antioksidan zengini pirinç.' },
  { id: '179', name: 'Yufka', cal: 275, p: 8, c: 55, f: 1.5, unit: 'adet', baseAmount: 1, info: '1 adet bütün yufka (Yaklaşık 160g).' },

  // ==========================================
  // SEBZELER & YAN ÜRÜNLER (NET KARB)
  // ==========================================
  { id: '180', name: 'Enginar (Haşlanmış)', cal: 47, p: 3.3, c: 5.1, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Karaciğer dostu (Net karb).' },
  { id: '181', name: 'Kereviz', cal: 16, p: 0.7, c: 1.4, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Çok düşük kalorili.' },
  { id: '182', name: 'Bamya (Haşlanmış)', cal: 33, p: 1.9, c: 4.5, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Sindirim dostu.' },
  { id: '183', name: 'Turp', cal: 16, p: 0.7, c: 1.8, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Salatalar için.' },
  { id: '184', name: 'Pancar (Haşlanmış)', cal: 44, p: 1.7, c: 7.8, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Antrenman öncesi pump etkisi (Nitrik oksit).' },
  { id: '185', name: 'Tatlı Mısır (Haşlanmış)', cal: 86, p: 3.3, c: 16, f: 1.3, unit: 'gram', baseAmount: 100, info: 'Nişastalı sebze.' },
  { id: '186', name: 'Bezelye', cal: 81, p: 5.4, c: 10, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Proteinli yeşil sebze (Net karb).' },
  { id: '187', name: 'Semizotu', cal: 20, p: 2, c: 3.4, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Bitkisel Omega-3 içerir.' },
  { id: '188', name: 'Bal Kabağı', cal: 26, p: 1, c: 6, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Düşük kalorili tatlı alternatifi.' },
  { id: '189', name: 'Dolmalık Biber', cal: 20, p: 0.9, c: 3.5, f: 0.2, unit: 'adet', baseAmount: 1, info: '1 adet orta boy dolmalık biber.' },

  // ==========================================
  // MEYVELER (ORMAN MEYVELERİ & EGZOTİK)
  // ==========================================
  { id: '190', name: 'Ahududu', cal: 52, p: 1.2, c: 5.4, f: 0.6, unit: 'gram', baseAmount: 100, info: 'Yüksek lif, düşük net karb.' },
  { id: '191', name: 'Böğürtlen', cal: 43, p: 1.4, c: 4.3, f: 0.5, unit: 'gram', baseAmount: 100, info: 'Antioksidan deposu.' },
  { id: '192', name: 'Kızılcık', cal: 46, p: 0.4, c: 8, f: 0.1, unit: 'gram', baseAmount: 100, info: 'İdrar yolları için faydalı.' },
  { id: '193', name: 'Ayva', cal: 57, p: 0.4, c: 13, f: 0.1, unit: 'adet', baseAmount: 1, info: '1 adet orta boy (yaklaşık 150g).' },
  { id: '194', name: 'Greyfurt', cal: 52, p: 0.9, c: 13, f: 0.2, unit: 'adet', baseAmount: 0.5, info: 'Yarım (1/2) greyfurt.' },
  { id: '195', name: 'Papaya', cal: 43, p: 0.5, c: 11, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Sindirim enzimleri içerir.' },
  { id: '196', name: 'Mango', cal: 60, p: 0.8, c: 15, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Yüksek şekerli antrenman öncesi meyvesi.' },
  { id: '197', name: 'Trabzon Hurması', cal: 70, p: 0.6, c: 18, f: 0.2, unit: 'adet', baseAmount: 1, info: '1 adet (Cennet Hurması).' },
  { id: '198', name: 'Kuru Dut', cal: 330, p: 10, c: 70, f: 1.5, unit: 'gram', baseAmount: 30, info: '1 küçük avuç.' },
  { id: '199', name: 'Taze İncir', cal: 74, p: 0.8, c: 19, f: 0.3, unit: 'adet', baseAmount: 1, info: '1 adet orta boy.' },
  { id: '200', name: 'Üzüm (Taze)', cal: 69, p: 0.7, c: 18, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Yaklaşık 1 salkım.' },

  // ==========================================
  // YAĞLAR, TOHUMLAR & SOSLAR (NET KARB)
  // ==========================================
  { id: '201', name: 'Brezilya Cevizi', cal: 659, p: 14, c: 4.5, f: 67, unit: 'adet', baseAmount: 2, info: '2 adet (Selenyum deposu).' },
  { id: '202', name: 'Çam Fıstığı', cal: 673, p: 14, c: 9, f: 68, unit: 'gram', baseAmount: 15, info: '1 yemek kaşığı.' },
  { id: '203', name: 'Kenevir Tohumu', cal: 553, p: 31, c: 4, f: 49, unit: 'gram', baseAmount: 10, info: 'Bitkisel protein ve yağ (1 Y.K).' },
  { id: '204', name: 'Haşhaş Tohumu', cal: 525, p: 18, c: 8, f: 41, unit: 'gram', baseAmount: 10, info: '1 yemek kaşığı.' },
  { id: '205', name: 'Avokado Yağı', cal: 120, p: 0, c: 0, f: 14, unit: 'gram', baseAmount: 14, info: '1 yemek kaşığı (Pişirmeye çok uygun).' },
  { id: '206', name: 'Kanola Yağı', cal: 120, p: 0, c: 0, f: 14, unit: 'gram', baseAmount: 14, info: '1 yemek kaşığı.' },
  { id: '207', name: 'Keten Tohumu Yağı', cal: 120, p: 0, c: 0, f: 14, unit: 'gram', baseAmount: 14, info: '1 yemek kaşığı (Isıtılmaz, salataya).' },
  { id: '208', name: 'Hindistan Cevizi (Meyve)', cal: 354, p: 3.3, c: 6, f: 33, unit: 'gram', baseAmount: 50, info: 'Taze meyve eti.' },
  { id: '209', name: 'Hindistan Cevizi Sütü (Konserve)', cal: 230, p: 2.3, c: 3.2, f: 24, unit: 'gram', baseAmount: 100, info: 'Yemeklik yağlı süt.' },
  { id: '210', name: 'Soya Sosu', cal: 9, p: 1.3, c: 1, f: 0, unit: 'gram', baseAmount: 15, info: '1 yemek kaşığı.' },
  { id: '211', name: 'Hardal (Şekersiz)', cal: 9, p: 0.6, c: 0.8, f: 0.5, unit: 'gram', baseAmount: 15, info: '1 yemek kaşığı.' },
  { id: '212', name: 'Ketçap (Şekersiz)', cal: 15, p: 0.2, c: 3, f: 0, unit: 'gram', baseAmount: 15, info: '1 yemek kaşığı.' },
  { id: '213', name: 'Ev Yapımı Mayonez', cal: 100, p: 0.2, c: 0.1, f: 11, unit: 'gram', baseAmount: 15, info: '1 yemek kaşığı.' },
  { id: '214', name: 'Elma Sirkesi', cal: 3, p: 0, c: 0.1, f: 0, unit: 'gram', baseAmount: 15, info: '1 yemek kaşığı.' },
  { id: '215', name: 'Limon Suyu', cal: 4, p: 0.1, c: 1.3, f: 0, unit: 'gram', baseAmount: 15, info: '1 yemek kaşığı.' },

  // ==========================================
  // SPORCU TAKVİYELERİ & İÇECEKLER (DEVAMI)
  // ==========================================
  { id: '216', name: 'Protein Suyu (Şişe)', cal: 60, p: 15, c: 0, f: 0, unit: 'adet', baseAmount: 1, info: '1 küçük şişe berrak protein içeceği.' },
  { id: '217', name: 'Elektrolit Tozu', cal: 5, p: 0, c: 1, f: 0, unit: 'gram', baseAmount: 5, info: 'Terle atılan mineraller için (1 ölçek).' },
  { id: '218', name: 'Glutamin', cal: 20, p: 5, c: 0, f: 0, unit: 'gram', baseAmount: 5, info: '1 tatlı kaşığı (Toparlanma için).' },
  { id: '219', name: 'Kollajen Peptit', cal: 35, p: 9, c: 0, f: 0, unit: 'gram', baseAmount: 10, info: '1 ölçek (Eklemler için).' },
  { id: '220', name: 'Züber / Meyve Barı', cal: 140, p: 3, c: 20, f: 5, unit: 'adet', baseAmount: 1, info: 'Ortalama 40g katkısız hurma barı.' },
  { id: '221', name: 'Buzlu Çay (Şekersiz)', cal: 2, p: 0, c: 0, f: 0, unit: 'adet', baseAmount: 1, info: '1 kutu veya kupa.' },
  { id: '222', name: 'Kombuça (Kombucha)', cal: 30, p: 0, c: 7, f: 0, unit: 'gram', baseAmount: 200, info: 'Probiyotik çay (1 bardak).' },
  { id: '223', name: 'Şalgam Suyu (Acılı)', cal: 10, p: 0.5, c: 2, f: 0, unit: 'gram', baseAmount: 200, info: '1 su bardağı (Yüksek sodyum).' },
  { id: '224', name: 'Badem Sütü (Şekersiz)', cal: 15, p: 0.5, c: 0.2, f: 1.2, unit: 'gram', baseAmount: 200, info: '1 su bardağı (Çok düşük kalori).' },
  { id: '225', name: 'Soya Sütü (Şekersiz)', cal: 66, p: 7, c: 3, f: 4, unit: 'gram', baseAmount: 200, info: '1 su bardağı (Proteinli bitkisel süt).' },
  { id: '226', name: 'Yulaf Sütü (Şekersiz)', cal: 90, p: 2, c: 14, f: 3, unit: 'gram', baseAmount: 200, info: '1 su bardağı (Karbonhidratlı süt).' },

  // ==========================================
  // FAST FOOD & KAÇAMAKLAR (CHEAT MEAL)
  // (Hesaplamalara dahil edilmesi önemlidir)
  // ==========================================
  { id: '227', name: 'Hamburger (Standart)', cal: 250, p: 13, c: 31, f: 9, unit: 'adet', baseAmount: 1, info: '1 adet sade tek köfteli hamburger.' },
  { id: '228', name: 'Cheeseburger', cal: 300, p: 15, c: 33, f: 12, unit: 'adet', baseAmount: 1, info: '1 adet standart boy cheeseburger.' },
  { id: '229', name: 'Patates Kızartması (Küçük)', cal: 230, p: 3, c: 30, f: 11, unit: 'adet', baseAmount: 1, info: '1 küçük paket fast-food patates.' },
  { id: '230', name: 'Pizza (Karışık, 1 Dilim)', cal: 250, p: 10, c: 28, f: 11, unit: 'adet', baseAmount: 1, info: 'Orta boy pizzadan 1 dilim.' },
  { id: '231', name: 'Lahmacun', cal: 220, p: 10, c: 31, f: 6, unit: 'adet', baseAmount: 1, info: '1 adet standart boy lahmacun.' },
  { id: '232', name: 'Pide (Kıymalı, 1 Porsiyon)', cal: 550, p: 25, c: 65, f: 20, unit: 'adet', baseAmount: 1, info: '1 standart boy pide.' },
  { id: '233', name: 'Sütlü Çikolata', cal: 535, p: 7, c: 59, f: 30, unit: 'gram', baseAmount: 100, info: '1 kare paket çikolata.' },
  { id: '234', name: 'Gofret / Çikolatalı Bar', cal: 250, p: 3, c: 33, f: 12, unit: 'adet', baseAmount: 1, info: '1 paket (Snickers, Metro vb. muadili).' },
  { id: '235', name: 'Jelibon', cal: 340, p: 6, c: 78, f: 0, unit: 'gram', baseAmount: 100, info: 'Saf şeker (Bazen spordan hemen sonra insülin sıçraması için kullanılır).' },
  { id: '236', name: 'Baklava', cal: 420, p: 5, c: 50, f: 22, unit: 'adet', baseAmount: 2, info: '2 dilim standart baklava.' },
  { id: '237', name: 'Sütlaç', cal: 260, p: 6, c: 45, f: 5, unit: 'adet', baseAmount: 1, info: '1 porsiyon/kase fırın sütlaç.' },
  { id: '238', name: 'Dondurma (Vanilyalı)', cal: 207, p: 3.5, c: 24, f: 11, unit: 'gram', baseAmount: 100, info: 'Standart sütlü dondurma (2 top).' },
  { id: '239', name: 'Cips (Patates)', cal: 536, p: 7, c: 53, f: 35, unit: 'gram', baseAmount: 100, info: '1 büyük kase veya paket.' },
  { id: '240', name: 'Kruvasan (Sade)', cal: 406, p: 8, c: 45, f: 21, unit: 'adet', baseAmount: 1, info: '1 adet standart pastane kruvasanı.' },
  { id: '241', name: 'Simit', cal: 275, p: 8, c: 52, f: 4, unit: 'adet', baseAmount: 1, info: '1 adet standart sokak simidi.' },
  { id: '242', name: 'Poğaça (Peynirli)', cal: 320, p: 9, c: 35, f: 16, unit: 'adet', baseAmount: 1, info: '1 adet pastane poğaçası.' },

  // ==========================================
  // EKSTRA SAĞLIKLI ÖĞÜNLER
  // ==========================================
  { id: '243', name: 'Kinoa Salatası', cal: 250, p: 8, c: 35, f: 9, unit: 'adet', baseAmount: 1, info: '1 porsiyon kinoalı yeşil salata.' },
  { id: '244', name: 'Tavuklu Noodle (Sebzeli)', cal: 380, p: 25, c: 50, f: 10, unit: 'adet', baseAmount: 1, info: '1 porsiyon Asya usulü noodle.' },
  { id: '245', name: 'Tavuk Suyu Çorbası', cal: 150, p: 12, c: 15, f: 5, unit: 'adet', baseAmount: 1, info: 'Şehriyeli, tavuklu 1 kase çorba.' },
  { id: '246', name: 'Yayla Çorbası', cal: 120, p: 4, c: 15, f: 5, unit: 'adet', baseAmount: 1, info: '1 kase.' },
  { id: '247', name: 'Ezogelin Çorbası', cal: 130, p: 5, c: 18, f: 4, unit: 'adet', baseAmount: 1, info: '1 kase.' },
  { id: '248', name: 'Menemen (Yumurtalı, Az Yağlı)', cal: 200, p: 12, c: 10, f: 13, unit: 'adet', baseAmount: 1, info: '1 porsiyon az yağlı menemen.' },
  { id: '249', name: 'Karışık Kuruyemiş (Kavrulmamış)', cal: 180, p: 5, c: 3, f: 16, unit: 'gram', baseAmount: 30, info: '1 avuç çiğ karışım.' },
  { id: '250', name: 'Proteinli Yulaf Lapası (Muzlu)', cal: 450, p: 35, c: 60, f: 8, unit: 'adet', baseAmount: 1, info: 'Komple sporcu öğünü (Yulaf+Protein Tozu+Muz).' }
];