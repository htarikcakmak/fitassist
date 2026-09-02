export function calculateMacros(weight: number, height: number, age: number, gender: string, goal: string) {
  if (!weight || !height || !age) {
    return {
      targetCalories: 2000,
      targetProtein: 150,
      targetCarbs: 200,
      targetFat: 65,
    };
  }

  // Mifflin-St Jeor Equation for BMR
  let bmr = 10 * weight + 6.25 * height - 5 * age;
  
  if (gender === 'female' || gender === 'Kadın') {
    bmr -= 161;
  } else {
    bmr += 5;
  }

  // Multiply by activity factor (assuming moderately active: 1.55)
  let tdee = bmr * 1.55;

  // Adjust for goals
  // Kilo Verme, Kas Kazanımı, Vücut Kompozisyonu
  if (goal === 'Kilo Verme' || goal === 'Weight Loss' || goal.includes('Definisyon') || goal.includes('Loss')) {
    tdee -= 500;
  } else if (goal === 'Kas Kazanımı' || goal === 'Muscle Gain' || goal.includes('Bulk') || goal.includes('Gain')) {
    tdee += 300;
  }

  const targetCalories = Math.round(tdee);
  
  // Macros
  // Protein: 2.2g per kg
  const targetProtein = Math.round(weight * 2.2);
  
  // Fat: 0.8g per kg
  const targetFat = Math.round(weight * 0.8);

  // Remaining calories for Carbs
  const pCals = targetProtein * 4;
  const fCals = targetFat * 9;
  const remainingCals = targetCalories - pCals - fCals;
  const targetCarbs = remainingCals > 0 ? Math.round(remainingCals / 4) : 0;

  return {
    targetCalories,
    targetProtein,
    targetCarbs,
    targetFat
  };
}
