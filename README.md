<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/dumbbell.svg" width="80" alt="FitAssist Logo"/>
  <h1>FitAssist 🏋️‍♂️</h1>
  <p>Modern, kapsamlı ve çok dilli Full-Stack Fitness ve Sağlık Takip Uygulaması</p>

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Spring_Boot-F2F4F9?style=for-the-badge&logo=spring-boot" alt="Spring Boot" />
    <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
    <img src="https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=Capacitor&logoColor=white" alt="Capacitor" />
  </p>
</div>

---

## 📖 Proje Hakkında

**FitAssist**, antrenmanlarınızı, beslenmenizi, vücut gelişiminizi, su tüketiminizi ve uykunuzu tek bir yerden profesyonelce yönetmenizi sağlayan modern bir fitness uygulamasıdır. Hem web tarayıcılarında çalışacak şekilde hem de **Android (APK)** olarak kullanılmak üzere (Capacitor ile) tasarlanmıştır.

## 🚀 Özellikler

* **🍽️ Gelişmiş Beslenme ve Makro Takibi:** Zengin besin kütüphanesi (500'den fazla kayıtlı yiyecek) ve akıllı arama.
* **🎯 Otomatik Kalori & Makro Hedefi Hesaplayıcı:** Kullanıcının boy, kilo, yaş, cinsiyet ve hedefine (Kilo verme, bulk, koruma) göre Mifflin-St Jeor formülü kullanılarak otomatik günlük hedef belirleme.
* **🏋️‍♂️ Antrenman (Workout) Kaydı:** Set, tekrar ve ağırlık takibi ile detaylı antrenman günlüğü.
* **📈 Gelişim ve Analiz (Progress):** Kilo, yağ oranı değişimlerini ve haftalık istatistikleri Recharts ile dinamik grafiklerde görüntüleme.
* **💧 Su Takibi:** Günlük su tüketim hedefini belirleme ve animasyonlu arayüz ile takip.
* **😴 Uyku Takibi:** Günlük uyku saatlerini kayıt altına alma ve uyku kalitesi analizi.
* **🌍 Çoklu Dil Desteği (i18n):** 6 farklı dil seçeneği (Türkçe, İngilizce, Almanca, İspanyolca, Fransızca, İtalyanca).
* **🎨 Dinamik Tema Motoru:** Uygulamanın renk paletini zevkinize göre kişiselleştirme.
* **📱 Cross-Platform:** Web (PWA) ve Android (Capacitor) uyumluluğu.

## 🛠️ Teknolojiler (Tech Stack)

### Frontend (İstemci)
* **Framework:** React 18 (TypeScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router v6
* **Çeviri:** `react-i18next`
* **Grafikler:** Recharts
* **Mobil Çıktı:** Ionic Capacitor

### Backend (Sunucu)
* **Framework:** Java Spring Boot
* **ORM:** Spring Data JPA / Hibernate
* **Veritabanı:** PostgreSQL (Render üzerinde barındırılıyor)
* **Güvenlik & Auth:** JWT tabanlı kimlik doğrulama, CORS yapılandırması
* **Cloud Hosting:** Render (Web Service & Managed PostgreSQL)

## 📸 Ekran Görüntüleri


| Dashboard | Beslenme | Profil |
| :---: | :---: | :---: |
| <img src="https://via.placeholder.com/250x500.png?text=Dashboard" width="200"/> | <img src="https://via.placeholder.com/250x500.png?text=Nutrition" width="200"/> | <img src="https://via.placeholder.com/250x500.png?text=Profile" width="200"/> |

## 💻 Kurulum ve Çalıştırma

Projeyi yerel makinenizde (lokal) çalıştırmak için aşağıdaki adımları izleyin:

### 1. Frontend (React)
```bash
# Projeyi klonlayın
git clone https://github.com/htarikcakmak/fitness.git

# Klasöre girin
cd fitness

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

### 2. Backend (Spring Boot)
Backend projenizi çalıştırmak için sisteminizde Java 17+ ve Maven kurulu olmalıdır.
```bash
# Backend klasörüne geçin
cd demo

# Uygulamayı çalıştırın
mvn spring-boot:run
```
> **Not:** Backend'in bağlanacağı veritabanı ayarlarını `application.properties` dosyasından yapılandırmanız veya ortam değişkenleri (Environment Variables) olarak sağlamanız gerekmektedir. Canlı sürüm şu anda Render PostgreSQL kullanmaktadır.

## 📱 Android (APK) Build Alma

Uygulamayı telefonunuzda test etmek için Capacitor ile APK oluşturabilirsiniz:

```bash
# Projeyi build alın
npm run build

# Android platformunu güncelleyin
npx cap sync android

# Android Studio ile projeyi açıp APK çıktısı alın
npx cap open android
```

## 🤝 Katkıda Bulunma

Pull Request'ler kabul edilmektedir. Büyük değişiklikler için lütfen önce neyi değiştirmek istediğinizi tartışmak için bir konu (issue) açın.

---
**Geliştirici:** [@htarikcakmak](https://github.com/htarikcakmak)  
**Lisans:** MIT