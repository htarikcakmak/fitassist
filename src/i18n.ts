import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  tr: {
    translation: {
      // 1. ALT MENÜ VE GENEL KELİMELER
      Anasayfa: "Anasayfa",
      Antrenman: "Antrenman",
      Beslenme: "Beslenme",
      Su: "Su",
      Gelişim: "Gelişim",
      Uyku: "Uyku",
      Ayarlar: "Ayarlar",
      saveBtn: "Kaydet",
      cancelBtn: "İptal",
      addBtn: "Ekle",

      // 2. UYKU SAYFASI
      sleepTitle: "Uyku Takibi",
      sleepDesc: "Yağ yakımı ve toparlanma için uyku düzenini analiz et.",
      addSleepRecord: "Uyku Kaydı Ekle",
      howManyHours: "Kaç saat uyudun?",
      hours: "Saat",
      pastDay: "Geçmiş bir gün mü gireceksin?",
      weeklyAnalysis: "Haftalık Uyku Analizi",
      noData: "Henüz veri girmedin. İlk kaydını oluştur.",
      ideal: "İdeal",
      average: "Ortalama",
      insufficient: "Yetersiz",

      // 3. GELİŞİM (KİLO) SAYFASI
      progressTitle: "Gelişim Takibi",
      weightHistory: "Kilo Geçmişi",
      newWeightRecord: "Yeni Kilo Kaydı",
      enterValue: "Değer girin...",
      currentWeight: "Mevcut Kilo",
      goalWeight: "Hedef Kilo",
      // Gelişim sayfası için yeni eklenenler:
      progressDesc: "Ölçümlerini gir, grafiği oluştur.",
      weight: "Kilo",
      bodyFat: "Yağ Oranı",
      muscleMass: "Kas Oranı",
      history: "Geçmişi",
      noDataLine1: "Henüz veri yok.",
      noDataLine2: "İlk ölçümünü aşağıdan ekle!",

      // 4. ANTRENMAN SAYFASI
      workoutTitle: "Antrenman Programı",
      startWorkoutBtn: "Antrenmana Başla",
      exercises: "Egzersizler",
      sets: "Set",
      reps: "Tekrar",

      // 5. BESLENME SAYFASI
      nutritionTitle: "Beslenme Takibi",
      calories: "Kalori",
      protein: "Protein",
      carbs: "Karbonhidrat",
      fat: "Yağ",
      addMeal: "Öğün Ekle",

      // 6. SU SAYFASI
      waterTitle: "Su Takibi",
      dailyGoal: "Günlük Hedef",
      glasses: "Bardak",
      addWater: "Su Ekle",

      // 7. AYARLAR SAYFASI
      settingsTitle: "Genel Ayarlar",
      language: "Dil",
      theme: "Tema",
      profile: "Profil"
    }
  },
  en: {
    translation: {
      Anasayfa: "Home",
      Antrenman: "Workout",
      Beslenme: "Nutrition",
      Su: "Water",
      Gelişim: "Progress",
      Uyku: "Sleep",
      Ayarlar: "Settings",
      saveBtn: "Save",
      cancelBtn: "Cancel",
      addBtn: "Add",

      sleepTitle: "Sleep Tracking",
      sleepDesc: "Analyze your sleep patterns for fat loss and recovery.",
      addSleepRecord: "Add Sleep Record",
      howManyHours: "How many hours did you sleep?",
      hours: "Hours",
      pastDay: "Are you entering a past date?",
      weeklyAnalysis: "Weekly Sleep Analysis",
      noData: "No data yet. Create your first record.",
      ideal: "Ideal",
      average: "Average",
      insufficient: "Insufficient",

      progressTitle: "Progress Tracking",
      weightHistory: "Weight History",
      newWeightRecord: "New Weight Record",
      enterValue: "Enter value...",
      currentWeight: "Current Weight",
      goalWeight: "Goal Weight",
      // Gelişim sayfası için yeni eklenenler:
      progressDesc: "Enter your measurements, generate the chart.",
      weight: "Weight",
      bodyFat: "Body Fat",
      muscleMass: "Muscle Mass",
      history: "History",
      noDataLine1: "No data yet.",
      noDataLine2: "Add your first measurement below!",

      workoutTitle: "Workout Routine",
      startWorkoutBtn: "Start Workout",
      exercises: "Exercises",
      sets: "Sets",
      reps: "Reps",

      nutritionTitle: "Nutrition Tracking",
      calories: "Calories",
      protein: "Protein",
      carbs: "Carbs",
      fat: "Fat",
      addMeal: "Add Meal",

      waterTitle: "Water Tracking",
      dailyGoal: "Daily Goal",
      glasses: "Glasses",
      addWater: "Add Water",

      settingsTitle: "General Settings",
      language: "Language",
      theme: "Theme",
      profile: "Profile"
    }
  },
  es: {
    translation: {
      Anasayfa: "Inicio",
      Antrenman: "Entrenamiento",
      Beslenme: "Nutrición",
      Su: "Agua",
      Gelişim: "Progreso",
      Uyku: "Sueño",
      Ayarlar: "Ajustes",
      saveBtn: "Guardar",
      cancelBtn: "Cancelar",
      addBtn: "Añadir",

      sleepTitle: "Seguimiento del Sueño",
      sleepDesc: "Analiza tus patrones de sueño para perder grasa y recuperarte.",
      addSleepRecord: "Añadir Registro",
      howManyHours: "¿Cuántas horas dormiste?",
      hours: "Horas",
      pastDay: "¿Vas a introducir una fecha pasada?",
      weeklyAnalysis: "Análisis Semanal",
      noData: "Aún no hay datos. Crea tu primer registro.",
      ideal: "Ideal",
      average: "Promedio",
      insufficient: "Insuficiente",

      progressTitle: "Seguimiento del Progreso",
      weightHistory: "Historial de Peso",
      newWeightRecord: "Nuevo Registro de Peso",
      enterValue: "Introducir valor...",
      currentWeight: "Peso Actual",
      goalWeight: "Peso Objetivo",
      // Gelişim sayfası için yeni eklenenler:
      progressDesc: "Introduce tus medidas, genera el gráfico.",
      weight: "Peso",
      bodyFat: "Grasa Corporal",
      muscleMass: "Masa Muscular",
      history: "Historial",
      noDataLine1: "Aún no hay datos.",
      noDataLine2: "¡Añade tu primera medida abajo!",

      workoutTitle: "Rutina de Entrenamiento",
      startWorkoutBtn: "Iniciar Entrenamiento",
      exercises: "Ejercicios",
      sets: "Series",
      reps: "Repeticiones",

      nutritionTitle: "Seguimiento de Nutrición",
      calories: "Calorías",
      protein: "Proteínas",
      carbs: "Carbohidratos",
      fat: "Grasas",
      addMeal: "Añadir Comida",

      waterTitle: "Seguimiento de Agua",
      dailyGoal: "Meta Diaria",
      glasses: "Vasos",
      addWater: "Añadir Agua",

      settingsTitle: "Ajustes Generales",
      language: "Idioma",
      theme: "Tema",
      profile: "Perfil"
    }
  },
  fr: {
    translation: {
      Anasayfa: "Accueil",
      Antrenman: "Entraînement",
      Beslenme: "Nutrition",
      Su: "Eau",
      Gelişim: "Progrès",
      Uyku: "Sommeil",
      Ayarlar: "Paramètres",
      saveBtn: "Enregistrer",
      cancelBtn: "Annuler",
      addBtn: "Ajouter",

      sleepTitle: "Suivi du Sommeil",
      sleepDesc: "Analysez votre sommeil pour la perte de graisse et la récupération.",
      addSleepRecord: "Ajouter un Enregistrement",
      howManyHours: "Combien d'heures avez-vous dormi ?",
      hours: "Heures",
      pastDay: "Saisissez-vous une date passée ?",
      weeklyAnalysis: "Analyse Hebdomadaire",
      noData: "Pas encore de données. Créez votre premier enregistrement.",
      ideal: "Idéal",
      average: "Moyen",
      insufficient: "Insuffisant",

      progressTitle: "Suivi des Progrès",
      weightHistory: "Historique de Poids",
      newWeightRecord: "Nouvel Enregistrement de Poids",
      enterValue: "Entrer la valeur...",
      currentWeight: "Poids Actuel",
      goalWeight: "Poids Cible",
      // Gelişim sayfası için yeni eklenenler:
      progressDesc: "Entrez vos mesures, générez le graphique.",
      weight: "Poids",
      bodyFat: "Graisse Corporelle",
      muscleMass: "Masse Musculaire",
      history: "Historique",
      noDataLine1: "Pas encore de données.",
      noDataLine2: "Ajoutez votre première mesure ci-dessous !",

      workoutTitle: "Programme d'Entraînement",
      startWorkoutBtn: "Commencer l'Entraînement",
      exercises: "Exercices",
      sets: "Séries",
      reps: "Répétitions",

      nutritionTitle: "Suivi de la Nutrition",
      calories: "Calories",
      protein: "Protéines",
      carbs: "Glucides",
      fat: "Lipides",
      addMeal: "Ajouter un Repas",

      waterTitle: "Suivi de l'Eau",
      dailyGoal: "Objectif Quotidien",
      glasses: "Verres",
      addWater: "Ajouter de l'Eau",

      settingsTitle: "Paramètres Généraux",
      language: "Langue",
      theme: "Thème",
      profile: "Profil"
    }
  },
  it: {
    translation: {
      Anasayfa: "Home",
      Antrenman: "Allenamento",
      Beslenme: "Nutrizione",
      Su: "Acqua",
      Gelişim: "Progresso",
      Uyku: "Sonno",
      Ayarlar: "Impostazioni",
      saveBtn: "Salva",
      cancelBtn: "Annulla",
      addBtn: "Aggiungi",

      sleepTitle: "Monitoraggio Sonno",
      sleepDesc: "Analizza il tuo sonno per il recupero e la perdita di grasso.",
      addSleepRecord: "Aggiungi Registro",
      howManyHours: "Quante ore hai dormito?",
      hours: "Ore",
      pastDay: "Stai inserendo una data passata?",
      weeklyAnalysis: "Analisi Settimanale",
      noData: "Nessun dato ancora. Crea il tuo primo registro.",
      ideal: "Ideale",
      average: "Media",
      insufficient: "Insufficiente",

      progressTitle: "Monitoraggio Progressi",
      weightHistory: "Cronologia del Peso",
      newWeightRecord: "Nuovo Registro del Peso",
      enterValue: "Inserisci valore...",
      currentWeight: "Peso Attuale",
      goalWeight: "Peso Obiettivo",
      // Gelişim sayfası için yeni eklenenler:
      progressDesc: "Inserisci le tue misurazioni, genera il grafico.",
      weight: "Peso",
      bodyFat: "Grasso Corporeo",
      muscleMass: "Massa Muscolare",
      history: "Cronologia",
      noDataLine1: "Nessun dato ancora.",
      noDataLine2: "Aggiungi la tua prima misurazione qui sotto!",

      workoutTitle: "Scheda di Allenamento",
      startWorkoutBtn: "Inizia Allenamento",
      exercises: "Esercizi",
      sets: "Serie",
      reps: "Ripetizioni",

      nutritionTitle: "Monitoraggio Nutrizione",
      calories: "Calorie",
      protein: "Proteine",
      carbs: "Carboidrati",
      fat: "Grassi",
      addMeal: "Aggiungi Pasto",

      waterTitle: "Monitoraggio Acqua",
      dailyGoal: "Obiettivo Giornaliero",
      glasses: "Bicchieri",
      addWater: "Aggiungi Acqua",

      settingsTitle: "Impostazioni Generali",
      language: "Lingua",
      theme: "Tema",
      profile: "Profilo"
    }
  },
  de: {
    translation: {
      Anasayfa: "Startseite",
      Antrenman: "Training",
      Beslenme: "Ernährung",
      Su: "Wasser",
      Gelişim: "Fortschritt",
      Uyku: "Schlaf",
      Ayarlar: "Einstellungen",
      saveBtn: "Speichern",
      cancelBtn: "Abbrechen",
      addBtn: "Hinzufügen",

      sleepTitle: "Schlaf-Tracking",
      sleepDesc: "Analysiere deinen Schlaf für Fettabbau und Erholung.",
      addSleepRecord: "Schlafprotokoll hinzufügen",
      howManyHours: "Wie viele Stunden hast du geschlafen?",
      hours: "Stunden",
      pastDay: "Gibst du ein vergangenes Datum ein?",
      weeklyAnalysis: "Wöchentliche Schlafanalyse",
      noData: "Noch keine Daten. Erstelle deinen ersten Eintrag.",
      ideal: "Ideal",
      average: "Durchschnitt",
      insufficient: "Unzureichend",

      progressTitle: "Fortschrittsverfolgung",
      weightHistory: "Gewichtsverlauf",
      newWeightRecord: "Neuer Gewichtseintrag",
      enterValue: "Wert eingeben...",
      currentWeight: "Aktuelles Gewicht",
      goalWeight: "Zielgewicht",
      // Gelişim sayfası için yeni eklenenler:
      progressDesc: "Gib deine Messwerte ein, erstelle das Diagramm.",
      weight: "Gewicht",
      bodyFat: "Körperfett",
      muscleMass: "Muskelmasse",
      history: "Verlauf",
      noDataLine1: "Noch keine Daten.",
      noDataLine2: "Füge unten deine erste Messung hinzu!",

      workoutTitle: "Trainingsplan",
      startWorkoutBtn: "Training starten",
      exercises: "Übungen",
      sets: "Sätze",
      reps: "Wiederholungen",

      nutritionTitle: "Ernährungs-Tracking",
      calories: "Kalorien",
      protein: "Protein",
      carbs: "Kohlenhydrate",
      fat: "Fett",
      addMeal: "Mahlzeit hinzufügen",

      waterTitle: "Wasser-Tracking",
      dailyGoal: "Tagesziel",
      glasses: "Gläser",
      addWater: "Wasser hinzufügen",

      settingsTitle: "Allgemeine Einstellungen",
      language: "Sprache",
      theme: "Design",
      profile: "Profil"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "tr", 
    fallbackLng: "en", 
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;