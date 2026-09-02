<div align="center">
  <img width="153" height="157" alt="ChatGPT Image Sep 2, 2026, 08_19_34 PM" src="https://github.com/user-attachments/assets/ca85f43f-c1a5-43d2-b98a-931e3862674b" />
  <h1>FitAssist</h1>
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


| Dashboard | Beslenme | Antrenman |
| :---: | :---: | :---: |
| <img width="100" height="205" alt="WhatsApp Image 2026-09-02 at 12 04 03 (6)" src="https://github.com/user-attachments/assets/2ea9a267-5556-46ec-8c2d-fba5e6847d74" /> | <img width="100" height="205" alt="WhatsApp Image 2026-09-02 at 12 04 03 (3)" src="https://github.com/user-attachments/assets/435244da-38e1-4da1-92a1-25c8c134997b" /> | <img width="100" height="205" alt="WhatsApp Image 2026-09-02 at 12 04 03 (4)" src="https://github.com/user-attachments/assets/f53525d9-b3a5-4f80-accd-4a1241d08242" />|

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
