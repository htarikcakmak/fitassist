<div align="center">
  <img width="153" height="157" alt="ChatGPT Image Sep 2, 2026, 08_19_34 PM" src="https://github.com/user-attachments/assets/ca85f43f-c1a5-43d2-b98a-931e3862674b" />
  <h1>FitAssist</h1>
  <p>Modern, comprehensive, and multilingual Full-Stack Fitness and Health Tracking Application</p>

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

## 📖 About the Project

**FitAssist** is a modern fitness application that allows you to professionally manage your workouts, nutrition, body progress, water consumption, and sleep all in one place. It is designed to work seamlessly on web browsers and as a native **Android (APK)** application (using Capacitor).

## 🚀 Features

* **🍽️ Advanced Nutrition and Macro Tracking:** Rich food library (500+ registered foods) and smart search.
* **🎯 Automated Calorie & Macro Goal Calculator:** Automatic daily goal setting based on the user's height, weight, age, gender, and goal (Weight loss, bulk, maintenance) using the Mifflin-St Jeor equation.
* **🏋️‍♂️ Workout Logging:** Detailed workout diary with set, rep, and weight tracking.
* **📈 Progress and Analysis:** Dynamic charts visualization for weight, body fat percentage changes, and weekly statistics using Recharts.
* **💧 Water Tracking:** Set daily water intake goals and track them with an animated interface.
* **😴 Sleep Tracking:** Log daily sleep hours and analyze sleep quality.
* **🌍 Multi-Language Support (i18n):** 6 different language options (Turkish, English, German, Spanish, French, Italian).
* **🎨 Dynamic Theme Engine:** Customize the application's color palette to your taste.
* **📱 Cross-Platform:** Web (PWA) and Android (Capacitor) compatibility.

## 🛠️ Tech Stack

### Frontend (Client)
* **Framework:** React 18 (TypeScript)
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Routing:** React Router v6
* **Translation:** `react-i18next`
* **Charts:** Recharts
* **Mobile Build:** Ionic Capacitor

### Backend (Server)
* **Framework:** Java Spring Boot
* **ORM:** Spring Data JPA / Hibernate
* **Database:** PostgreSQL (Hosted on Render)
* **Security & Auth:** JWT-based authentication, CORS configuration
* **Cloud Hosting:** Render (Web Service & Managed PostgreSQL)

## 📸 Screenshots

| Dashboard | Nutrition | Workout |
| :---: | :---: | :---: |
| <img width="100" height="205" alt="WhatsApp Image 2026-09-02 at 12 04 03 (6)" src="https://github.com/user-attachments/assets/2ea9a267-5556-46ec-8c2d-fba5e6847d74" /> | <img width="100" height="205" alt="WhatsApp Image 2026-09-02 at 12 04 03 (3)" src="https://github.com/user-attachments/assets/435244da-38e1-4da1-92a1-25c8c134997b" /> | <img width="100" height="205" alt="WhatsApp Image 2026-09-02 at 12 04 03 (4)" src="https://github.com/user-attachments/assets/f53525d9-b3a5-4f80-accd-4a1241d08242" />|

## 💻 Installation and Setup

Follow the steps below to run the project on your local machine:

### 1. Frontend (React)
```bash
# Clone the repository
git clone [https://github.com/htarikcakmak/fitness.git](https://github.com/htarikcakmak/fitness.git)

# Navigate to the directory
cd fitness

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 2. Backend (Spring Boot)
```bash
You must have Java 17+ and Maven installed on your system to run the backend project.

# Navigate to the backend directory
cd demo

# Run the application
mvn spring-boot:run
Note: You need to configure the database settings for the backend connection in the application.properties file or provide them as Environment Variables. The live version currently uses Render PostgreSQL.
```

### 📱 Building Android (APK)
You can generate an APK using Capacitor to test the application on your phone:
```bash
# Build the project
npm run build

# Sync the Android platform
npx cap sync android

# Open the project with Android Studio and generate the APK
npx cap open android
```
## 🤝 Contributing
Pull Requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

**Developer**: @htarikcakmak

**License**: MIT
