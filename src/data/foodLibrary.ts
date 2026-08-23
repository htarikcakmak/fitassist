// src/data/foodLibrary.ts

export type FoodItem = {
  id: string;
  name: string;
  cal: number;
  p: number; // Protein (g)
  c: number; // Carbohydrates (g) -> NET CARB value (fiber deducted) is used
  f: number; // Fat (g)
  unit: 'piece' | 'gram'; 
  baseAmount: number; 
  info?: string; 
};

export const FOOD_LIBRARY: FoodItem[] = [
  // ==========================================
  // BREAKFAST, EGGS & DAIRY
  // ==========================================
  { id: '1', name: 'Boiled Egg', cal: 78, p: 6.3, c: 0.6, f: 5.3, unit: 'piece', baseAmount: 1, info: '1 medium-sized (50g) egg.' },
  { id: '2', name: 'Egg White', cal: 17, p: 3.6, c: 0.2, f: 0.1, unit: 'piece', baseAmount: 1, info: 'Zero fat, pure protein source.' },
  { id: '3', name: 'Omelette (Low Fat)', cal: 95, p: 6.5, c: 1, f: 7, unit: 'piece', baseAmount: 1, info: 'Omelette made from 1 egg.' },
  { id: '4', name: 'Kefir (Plain)', cal: 104, p: 8, c: 12, f: 2.5, unit: 'gram', baseAmount: 200, info: '1 standard glass of kefir.' },
  { id: '5', name: 'Probiotic Kefir', cal: 120, p: 9, c: 10, f: 3, unit: 'gram', baseAmount: 200, info: 'Full-fat probiotic kefir.' },
  { id: '6', name: 'Curd Cheese (Fat-Free)', cal: 98, p: 11, c: 3, f: 4.5, unit: 'gram', baseAmount: 100, info: 'High-protein breakfast. 3 tablespoons ~50g.' },
  { id: '7', name: 'Strained Yogurt', cal: 130, p: 10, c: 4, f: 8, unit: 'gram', baseAmount: 100, info: '2 heaped tablespoons.' },
  { id: '8', name: 'Yogurt (Half-Fat)', cal: 60, p: 4.5, c: 5, f: 1.5, unit: 'gram', baseAmount: 100, info: '1 small bowl.' },
  { id: '9', name: 'Milk (Half-Fat)', cal: 102, p: 8.2, c: 12, f: 2.4, unit: 'gram', baseAmount: 200, info: '1 glass of milk.' },
  { id: '10', name: 'Lactose-Free Milk', cal: 110, p: 8, c: 10, f: 3, unit: 'gram', baseAmount: 200, info: '1 glass of lactose-free milk.' },
  { id: '11', name: 'Ezine Cheese (Full Fat)', cal: 93, p: 5, c: 0.5, f: 8, unit: 'gram', baseAmount: 30, info: '1 matchbox-sized piece.' },
  { id: '12', name: 'Ayran (Yogurt Drink)', cal: 70, p: 3.5, c: 6, f: 3.5, unit: 'gram', baseAmount: 200, info: '1 glass.' },
  { id: '13', name: 'Kashar Cheese', cal: 105, p: 8, c: 0.5, f: 8, unit: 'gram', baseAmount: 30, info: '1 thin slice.' },
  { id: '14', name: 'Cottage Cheese', cal: 98, p: 11, c: 3.4, f: 4.3, unit: 'gram', baseAmount: 100, info: 'Low-fat cheese, great for athletes.' },
  { id: '15', name: 'Labneh Cheese', cal: 60, p: 2, c: 1, f: 5.5, unit: 'gram', baseAmount: 30, info: '1 full tablespoon.' },
  { id: '16', name: 'String Cheese', cal: 90, p: 8.5, c: 0.5, f: 6, unit: 'gram', baseAmount: 30, info: 'Fibrous cheese suitable for diets.' },
  { id: '17', name: 'Tulum Cheese', cal: 110, p: 7, c: 1, f: 9, unit: 'gram', baseAmount: 30, info: 'High-fat traditional cheese.' },

  // ==========================================
  // RED MEAT, CHICKEN & SEAFOOD
  // ==========================================
  { id: '18', name: 'Chicken Breast (Grilled/Boiled)', cal: 165, p: 31, c: 0, f: 3.6, unit: 'gram', baseAmount: 100, info: 'Pure protein source. Palm-sized.' },
  { id: '19', name: 'Chicken Breast (Raw)', cal: 120, p: 22, c: 0, f: 2.6, unit: 'gram', baseAmount: 100, info: 'Uncooked kitchen scale weight.' },
  { id: '20', name: 'Chicken Doner Wrap', cal: 450, p: 35, c: 45, f: 15, unit: 'piece', baseAmount: 1, info: '1 standard size, saucy chicken wrap.' },
  { id: '21', name: 'Chicken Doner (Portion)', cal: 320, p: 30, c: 5, f: 18, unit: 'gram', baseAmount: 150, info: 'Meat only with low fat, 1 portion.' },
  { id: '22', name: 'Chicken Thigh (Skinless)', cal: 209, p: 26, c: 0, f: 10.9, unit: 'gram', baseAmount: 100, info: 'Softer, medium-fat chicken meat.' },
  { id: '23', name: 'Turkey Breast (Grilled)', cal: 147, p: 30, c: 0, f: 2.1, unit: 'gram', baseAmount: 100, info: 'Lean protein alternative to chicken.' },
  { id: '24', name: 'Beef Steak (Grilled)', cal: 250, p: 26, c: 0, f: 15, unit: 'gram', baseAmount: 100, info: 'Medium-fat beef.' },
  { id: '25', name: 'Lean Minced Beef', cal: 215, p: 27, c: 0, f: 11, unit: 'gram', baseAmount: 100, info: 'Roasted weight.' },
  { id: '26', name: 'Beef Doner (Plain)', cal: 280, p: 24, c: 2, f: 19, unit: 'gram', baseAmount: 100, info: '1 portion of meat doner.' },
  { id: '27', name: 'Iskender Kebab', cal: 750, p: 40, c: 55, f: 38, unit: 'piece', baseAmount: 1, info: '1 portion with butter and pita.' },
  { id: '28', name: 'Meatballs (Grilled)', cal: 230, p: 18, c: 4, f: 15, unit: 'piece', baseAmount: 3, info: '3 standard butcher meatballs (~100g).' },
  { id: '29', name: 'Tuna Fish (In Water)', cal: 116, p: 25.5, c: 0, f: 0.8, unit: 'gram', baseAmount: 100, info: 'Drained net weight.' },
  { id: '30', name: 'Tuna Fish (In Oil)', cal: 186, p: 26, c: 0, f: 8, unit: 'gram', baseAmount: 100, info: 'Oil drained canned tuna.' },
  { id: '31', name: 'Salmon (Baked)', cal: 206, p: 22.1, c: 0, f: 12.3, unit: 'gram', baseAmount: 100, info: 'Rich in Omega-3.' },
  { id: '32', name: 'Sea Bass / Bream', cal: 124, p: 20, c: 0, f: 4.5, unit: 'gram', baseAmount: 100, info: 'Boneless clean meat.' },
  { id: '33', name: 'Smoked Turkey (Packaged)', cal: 52, p: 9.5, c: 1, f: 1.2, unit: 'gram', baseAmount: 50, info: '1 standard package is usually 50g.' },
  { id: '34', name: 'Beef Entrecote', cal: 291, p: 24, c: 0, f: 21, unit: 'gram', baseAmount: 100, info: 'High-fat, delicious red meat.' },
  { id: '35', name: 'Lamb Chops', cal: 320, p: 22, c: 0, f: 25, unit: 'piece', baseAmount: 2, info: '2 bone-in lamb chops.' },
  { id: '36', name: 'Anchovy (Baked)', cal: 160, p: 18, c: 0, f: 9, unit: 'gram', baseAmount: 100, info: 'Oven-baked lean anchovies.' },
  { id: '37', name: 'Calamari (Grilled)', cal: 90, p: 16, c: 3, f: 1.5, unit: 'gram', baseAmount: 100, info: 'Grilled, not fried.' },
  { id: '38', name: 'Liver (Roasted)', cal: 190, p: 26, c: 4, f: 7, unit: 'gram', baseAmount: 100, info: 'High iron source.' },
  
  // ==========================================
  // COMPLEX CARBS & GRAINS
  // ==========================================
  { id: '39', name: 'Oatmeal', cal: 389, p: 16.9, c: 66.3, f: 6.9, unit: 'gram', baseAmount: 100, info: '1 heaped tablespoon ~10g.' },
  { id: '40', name: 'Basmati Rice (Cooked)', cal: 121, p: 3.5, c: 25.5, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Low glycemic index rice.' },
  { id: '41', name: 'White Rice (Cooked)', cal: 130, p: 2.7, c: 28, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Quick energy. 1 bowl ~200g.' },
  { id: '42', name: 'Bulgur Wheat (Cooked)', cal: 145, p: 4.5, c: 30.8, f: 1.3, unit: 'gram', baseAmount: 100, info: 'Fibrous carbohydrate.' },
  { id: '43', name: 'Brown Rice (Cooked)', cal: 111, p: 2.6, c: 23, f: 0.9, unit: 'gram', baseAmount: 100, info: 'Complex carb source.' },
  { id: '44', name: 'Buckwheat (Cooked)', cal: 92, p: 3.4, c: 20, f: 0.6, unit: 'gram', baseAmount: 100, info: 'Great gluten-free carb.' },
  { id: '45', name: 'Quinoa (Cooked)', cal: 120, p: 4.4, c: 21.3, f: 1.9, unit: 'gram', baseAmount: 100, info: 'High-protein grain.' },
  { id: '46', name: 'Pasta (Cooked)', cal: 157, p: 5.8, c: 30.9, f: 0.9, unit: 'gram', baseAmount: 100, info: 'Plain, sauce-free boiled pasta.' },
  { id: '47', name: 'Whole Wheat Pasta', cal: 124, p: 5.3, c: 26.5, f: 0.8, unit: 'gram', baseAmount: 100, info: 'More filling pasta type.' },
  { id: '48', name: 'Boiled Potato', cal: 87, p: 1.9, c: 20, f: 0.1, unit: 'gram', baseAmount: 100, info: '1 medium potato ~150g.' },
  { id: '49', name: 'Sweet Potato (Baked)', cal: 90, p: 2, c: 21, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Beta-carotene depot.' },
  { id: '50', name: 'Rice Flour', cal: 360, p: 6, c: 80, f: 1.5, unit: 'gram', baseAmount: 100, info: 'For pre-workout cream of rice.' },
  { id: '51', name: 'Oat Flour', cal: 400, p: 14, c: 66, f: 7, unit: 'gram', baseAmount: 100, info: 'For making protein pancakes.' },
  { id: '52', name: 'Whole Wheat Bread', cal: 75, p: 3.5, c: 13.5, f: 1, unit: 'piece', baseAmount: 1, info: '1 standard thin slice (30g).' },
  { id: '53', name: 'Rye Bread', cal: 70, p: 2.6, c: 14, f: 0.8, unit: 'piece', baseAmount: 1, info: '1 standard slice (30g).' },
  { id: '54', name: 'Lavash / Tortilla (Thin)', cal: 150, p: 4, c: 28, f: 2, unit: 'piece', baseAmount: 1, info: '1 wrap tortilla.' },
  { id: '55', name: 'Whole Wheat Tortilla', cal: 130, p: 5, c: 22, f: 1.5, unit: 'piece', baseAmount: 1, info: '1 brown lavash.' },
  { id: '56', name: 'Rice Cake', cal: 25, p: 0.5, c: 5.5, f: 0.1, unit: 'piece', baseAmount: 1, info: '1 round rice cake.' },
  { id: '57', name: 'Breadstick (Wholemeal)', cal: 40, p: 1.2, c: 7.5, f: 0.5, unit: 'piece', baseAmount: 1, info: '1 standard breadstick.' },
  { id: '58', name: 'Corn Flakes (Sugar-Free)', cal: 110, p: 2, c: 24, f: 0.5, unit: 'gram', baseAmount: 30, info: '1 bowl of cereal.' },

  // ==========================================
  // LEGUMES
  // ==========================================
  { id: '59', name: 'Red Lentils (Boiled)', cal: 116, p: 9, c: 20, f: 0.4, unit: 'gram', baseAmount: 100, info: '1 ladle of soup or porridge.' },
  { id: '60', name: 'Green Lentils (Boiled)', cal: 116, p: 9, c: 20, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Great plant protein for salads.' },
  { id: '61', name: 'Chickpeas (Boiled)', cal: 164, p: 8.9, c: 27.4, f: 2.6, unit: 'gram', baseAmount: 100, info: '4-5 tablespoons ~100g.' },
  { id: '62', name: 'White Beans (Cooked)', cal: 127, p: 8.7, c: 22.8, f: 0.5, unit: 'gram', baseAmount: 100, info: 'Drained beans.' },
  { id: '63', name: 'Kidney Beans (Cooked)', cal: 123, p: 8.7, c: 22.5, f: 0.5, unit: 'gram', baseAmount: 100, info: 'Drained weight, no added oil.' },
  { id: '64', name: 'Edamame (Soybeans)', cal: 121, p: 11.9, c: 8.9, f: 5.2, unit: 'gram', baseAmount: 100, info: 'One of the highest protein legumes.' },
  { id: '65', name: 'Black Beans', cal: 132, p: 8.9, c: 23.7, f: 0.5, unit: 'gram', baseAmount: 100, info: 'Very high in fiber.' },
  { id: '66', name: 'Peas (Boiled)', cal: 81, p: 5.4, c: 14.4, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Low-calorie side dish.' },

  // ==========================================
  // VEGETABLES & GREENS (Net Carbs Used)
  // ==========================================
  { id: '67', name: 'Broccoli (Boiled)', cal: 35, p: 2.4, c: 4.2, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Net carbs (fiber deducted).' },
  { id: '68', name: 'Spinach (Raw)', cal: 23, p: 2.9, c: 1.4, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Raw weight, shrinks when cooked.' },
  { id: '69', name: 'Asparagus', cal: 20, p: 2.2, c: 1.8, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Has a diuretic effect.' },
  { id: '70', name: 'Mushrooms (Sautéed)', cal: 22, p: 3.1, c: 2.3, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Provides low-calorie fullness.' },
  { id: '71', name: 'Tomato', cal: 22, p: 1.1, c: 3.3, f: 0.2, unit: 'piece', baseAmount: 1, info: '1 medium tomato.' },
  { id: '72', name: 'Cucumber', cal: 15, p: 0.7, c: 2.1, f: 0.1, unit: 'piece', baseAmount: 1, info: '1 medium cucumber.' },
  { id: '73', name: 'Green Pepper', cal: 20, p: 0.9, c: 3.0, f: 0.2, unit: 'piece', baseAmount: 1, info: '1 standard pepper.' },
  { id: '74', name: 'Red Bell Pepper', cal: 30, p: 1, c: 4.5, f: 0.3, unit: 'piece', baseAmount: 1, info: '1 medium red pepper.' },
  { id: '75', name: 'Zucchini (Grilled/Sautéed)', cal: 20, p: 1.2, c: 2.5, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Savior during diet periods.' },
  { id: '76', name: 'Eggplant (Roasted)', cal: 25, p: 1, c: 3.5, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Without added oil.' },
  { id: '77', name: 'Cauliflower', cal: 25, p: 2, c: 3, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Can be used as a rice alternative.' },
  { id: '78', name: 'Brussels Sprouts', cal: 43, p: 3.4, c: 5.2, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Tough-leaf winter vegetable.' },
  { id: '79', name: 'Carrot', cal: 25, p: 0.6, c: 4.5, f: 0.1, unit: 'piece', baseAmount: 1, info: '1 medium size.' },
  { id: '80', name: 'Iceberg Lettuce', cal: 14, p: 0.9, c: 1.8, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Adds volume, not calories.' },
  { id: '81', name: 'Arugula', cal: 25, p: 2.6, c: 2, f: 0.7, unit: 'gram', baseAmount: 100, info: 'Rich in iron.' },
  { id: '82', name: 'Parsley', cal: 36, p: 3, c: 3, f: 0.8, unit: 'gram', baseAmount: 100, info: 'Helps relieve edema.' },
  { id: '83', name: 'Green Beans (with Olive Oil)', cal: 45, p: 1.5, c: 4, f: 2.5, unit: 'gram', baseAmount: 100, info: 'Low-fat home-cooked format.' },
  { id: '84', name: 'Leek', cal: 61, p: 1.5, c: 10, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Winter vegetable.' },
  { id: '85', name: 'Red Cabbage', cal: 31, p: 1.4, c: 5, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Essential for salads.' },
  { id: '86', name: 'White Cabbage', cal: 25, p: 1.3, c: 3.5, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Fiber source.' },
  { id: '87', name: 'Onion', cal: 40, p: 1.1, c: 7.5, f: 0.1, unit: 'piece', baseAmount: 1, info: '1 medium size.' },
  { id: '88', name: 'Garlic', cal: 15, p: 0.6, c: 3, f: 0.1, unit: 'piece', baseAmount: 3, info: '3 cloves of garlic.' },

  // ==========================================
  // FRUITS
  // ==========================================
  { id: '89', name: 'Banana', cal: 105, p: 1.3, c: 27, f: 0.3, unit: 'piece', baseAmount: 1, info: '1 medium banana (~120g). Great pre-workout.' },
  { id: '90', name: 'Apple', cal: 78, p: 0.4, c: 21, f: 0.2, unit: 'piece', baseAmount: 1, info: '1 medium size.' },
  { id: '91', name: 'Green Apple', cal: 70, p: 0.3, c: 18, f: 0.2, unit: 'piece', baseAmount: 1, info: 'Low sugar sour apple.' },
  { id: '92', name: 'Strawberry', cal: 32, p: 0.7, c: 7.7, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Low calorie, 7-8 pieces.' },
  { id: '93', name: 'Blueberry', cal: 57, p: 0.7, c: 14.5, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Antioxidant for oatmeal.' },
  { id: '94', name: 'Kiwi', cal: 42, p: 0.8, c: 10, f: 0.4, unit: 'piece', baseAmount: 1, info: '1 kiwi. Vitamin C.' },
  { id: '95', name: 'Tangerine', cal: 45, p: 0.8, c: 11, f: 0.2, unit: 'piece', baseAmount: 1, info: '1 medium size.' },
  { id: '96', name: 'Orange', cal: 62, p: 1.2, c: 15.4, f: 0.2, unit: 'piece', baseAmount: 1, info: '1 medium size.' },
  { id: '97', name: 'Melon', cal: 34, p: 0.8, c: 8.2, f: 0.2, unit: 'gram', baseAmount: 100, info: '1 thin slice.' },
  { id: '98', name: 'Watermelon', cal: 30, p: 0.6, c: 7.6, f: 0.2, unit: 'gram', baseAmount: 100, info: '1 thin slice.' },
  { id: '99', name: 'Pineapple', cal: 50, p: 0.5, c: 13, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Aids digestion.' },
  { id: '100', name: 'Date', cal: 84, p: 0.6, c: 22.5, f: 0.1, unit: 'piece', baseAmount: 3, info: '3 pieces (30g) perfect for sweet cravings.' },
  { id: '101', name: 'Dried Fig', cal: 100, p: 1.5, c: 24, f: 0.4, unit: 'piece', baseAmount: 2, info: '2 dried figs.' },
  { id: '102', name: 'Dried Apricot', cal: 85, p: 1.4, c: 22, f: 0.2, unit: 'piece', baseAmount: 4, info: '4 dried apricots.' },
  { id: '103', name: 'Raisins', cal: 90, p: 1, c: 23, f: 0.1, unit: 'gram', baseAmount: 30, info: '1 small handful.' },
  { id: '104', name: 'Pear', cal: 85, p: 0.5, c: 22, f: 0.2, unit: 'piece', baseAmount: 1, info: '1 medium size.' },
  { id: '105', name: 'Peach', cal: 50, p: 1, c: 12, f: 0.2, unit: 'piece', baseAmount: 1, info: '1 medium size.' },
  { id: '106', name: 'Cherry', cal: 50, p: 1, c: 12, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Summer fruit.' },
  { id: '107', name: 'Plum', cal: 40, p: 0.6, c: 9, f: 0.2, unit: 'piece', baseAmount: 3, info: '3 medium plums.' },
  { id: '108', name: 'Pomegranate', cal: 70, p: 1.2, c: 16, f: 0.8, unit: 'gram', baseAmount: 100, info: 'Peeled pomegranate seeds.' },

  // ==========================================
  // HEALTHY FATS, SEEDS & NUTS 
  // (Net carbs used to prevent filter errors)
  // ==========================================
  { id: '109', name: 'Avocado', cal: 160, p: 2, c: 2, f: 15, unit: 'piece', baseAmount: 0.5, info: 'HALF (1/2) avocado. (Net carbs)' },
  { id: '110', name: 'Olive Oil', cal: 88, p: 0, c: 0, f: 10, unit: 'gram', baseAmount: 10, info: '1 tablespoon (10ml).' },
  { id: '111', name: 'Coconut Oil', cal: 86, p: 0, c: 0, f: 10, unit: 'gram', baseAmount: 10, info: '1 tablespoon.' },
  { id: '112', name: 'Butter', cal: 74, p: 0.1, c: 0, f: 8.4, unit: 'gram', baseAmount: 10, info: '1 dessert spoon.' },
  { id: '113', name: 'Black Olives', cal: 50, p: 0.4, c: 0.5, f: 5.2, unit: 'piece', baseAmount: 5, info: '5 standard black olives.' },
  { id: '114', name: 'Green Olives', cal: 40, p: 0.3, c: 0.4, f: 4.1, unit: 'piece', baseAmount: 5, info: '5 standard green olives.' },
  { id: '115', name: 'Raw Almonds', cal: 173, p: 6, c: 2.5, f: 15, unit: 'gram', baseAmount: 30, info: '1 handful. (Net carbs)' },
  { id: '116', name: 'Raw Walnuts', cal: 196, p: 4.3, c: 2, f: 19.5, unit: 'gram', baseAmount: 30, info: '3-4 whole walnuts. (Net carbs)' },
  { id: '117', name: 'Raw Hazelnuts', cal: 188, p: 4.5, c: 2, f: 18.2, unit: 'gram', baseAmount: 30, info: '1 small handful. (Net carbs)' },
  { id: '118', name: 'Raw Cashews', cal: 165, p: 5.1, c: 8, f: 13.8, unit: 'gram', baseAmount: 30, info: '1 small handful. (Net carbs)' },
  { id: '119', name: 'Peanuts', cal: 161, p: 7.3, c: 2, f: 14, unit: 'gram', baseAmount: 30, info: 'Unsalted, unroasted. (Net carbs)' },
  { id: '120', name: 'Peanut Butter (Sugar-Free)', cal: 94, p: 4, c: 1.5, f: 8, unit: 'gram', baseAmount: 15, info: '1 heaped dessert spoon. (Net carbs)' },
  { id: '121', name: 'Almond Butter (Sugar-Free)', cal: 98, p: 3.4, c: 1.5, f: 9, unit: 'gram', baseAmount: 15, info: '1 heaped dessert spoon. (Net carbs)' },
  { id: '122', name: 'Chia Seeds', cal: 49, p: 1.7, c: 0.5, f: 3.1, unit: 'gram', baseAmount: 10, info: '1 tablespoon. (Excellent fat/fiber source)' },
  { id: '123', name: 'Flaxseed', cal: 53, p: 1.8, c: 0.5, f: 4.2, unit: 'gram', baseAmount: 10, info: '1 tablespoon.' },
  { id: '124', name: 'Pumpkin Seeds', cal: 112, p: 6, c: 1.5, f: 9.2, unit: 'gram', baseAmount: 20, info: 'Zinc source, 1 handful.' },
  { id: '125', name: 'Sunflower Seeds', cal: 116, p: 4.2, c: 2, f: 10, unit: 'gram', baseAmount: 20, info: '1 small handful.' },
  { id: '126', name: 'Tahini', cal: 89, p: 2.5, c: 1.5, f: 8, unit: 'gram', baseAmount: 15, info: '1 tablespoon plain tahini.' },
  { id: '127', name: 'Sesame Seeds', cal: 57, p: 1.7, c: 1, f: 5, unit: 'gram', baseAmount: 10, info: 'For sprinkling on meals.' },
  { id: '128', name: 'Dark Chocolate (80%+)', cal: 120, p: 1.6, c: 4, f: 8.5, unit: 'gram', baseAmount: 20, info: '2 squares. (Net carbs)' },
  { id: '129', name: 'Macadamia Nuts', cal: 215, p: 2.2, c: 1.5, f: 22.5, unit: 'gram', baseAmount: 30, info: 'Nut with the highest fat content.' },
  { id: '130', name: 'Pistachios', cal: 168, p: 6, c: 5, f: 13, unit: 'gram', baseAmount: 30, info: 'Shelled net weight.' },

  // ==========================================
  // SUPPLEMENTS, DRINKS & EXTRAS
  // ==========================================
  { id: '131', name: 'Whey Protein Powder', cal: 120, p: 24, c: 3, f: 1.5, unit: 'piece', baseAmount: 1, info: '1 scoop is ~30 grams.' },
  { id: '132', name: 'Isolate Whey Protein', cal: 110, p: 27, c: 0.5, f: 0.5, unit: 'piece', baseAmount: 1, info: 'Near-zero carbs and fat.' },
  { id: '133', name: 'Casein Protein', cal: 110, p: 22, c: 2, f: 1, unit: 'piece', baseAmount: 1, info: '1 scoop slow-release protein.' },
  { id: '134', name: 'Maltodextrin / Carb Powder', cal: 115, p: 0, c: 28, f: 0, unit: 'gram', baseAmount: 30, info: 'Intra-workout fast carbs.' },
  { id: '135', name: 'Mass Gainer', cal: 380, p: 15, c: 75, f: 2, unit: 'gram', baseAmount: 100, info: 'Standard gainer profile.' },
  { id: '136', name: 'Protein Bar (Low Sugar)', cal: 190, p: 20, c: 15, f: 6, unit: 'piece', baseAmount: 1, info: 'Average 50-gram bar.' },
  { id: '137', name: 'Creatine Monohydrate', cal: 0, p: 0, c: 0, f: 0, unit: 'gram', baseAmount: 5, info: '1 dessert spoon. Zero calories.' },
  { id: '138', name: 'BCAA / EAA Powder', cal: 10, p: 2.5, c: 0, f: 0, unit: 'gram', baseAmount: 10, info: 'Free-form aminos.' },
  { id: '139', name: 'Pre-Workout', cal: 5, p: 0, c: 1, f: 0, unit: 'gram', baseAmount: 10, info: '1 scoop energy powder.' },
  { id: '140', name: 'Filter Coffee / Americano', cal: 5, p: 0.3, c: 0, f: 0, unit: 'piece', baseAmount: 1, info: '1 mug, sugar-free.' },
  { id: '141', name: 'Mineral Water (Plain)', cal: 0, p: 0, c: 0, f: 0, unit: 'piece', baseAmount: 1, info: '1 bottle (200ml).' },
  { id: '142', name: 'Green Tea', cal: 2, p: 0, c: 0, f: 0, unit: 'piece', baseAmount: 1, info: '1 brewed mug.' },
  { id: '143', name: 'Zero Calorie Energy Drink', cal: 10, p: 0, c: 1, f: 0, unit: 'piece', baseAmount: 1, info: '1 can of sugar-free energy drink.' },
  { id: '144', name: 'Diet Cola', cal: 0, p: 0, c: 0, f: 0, unit: 'piece', baseAmount: 1, info: '1 can (330ml).' },
  
  // ==========================================
  // ATHLETE MEALS & MIXES
  // ==========================================
  { id: '145', name: 'Light Tuna Salad', cal: 180, p: 28, c: 5, f: 4, unit: 'piece', baseAmount: 1, info: 'With greens, 1 standard portion.' },
  { id: '146', name: 'Protein Pancakes', cal: 250, p: 25, c: 28, f: 4, unit: 'piece', baseAmount: 1, info: '1 portion (oats + protein powder).' },
  { id: '147', name: 'Chicken and Rice', cal: 350, p: 30, c: 45, f: 4, unit: 'piece', baseAmount: 1, info: 'Classic bodybuilder meal plate.' },
  { id: '148', name: 'Oatmeal Porridge (With Milk)', cal: 280, p: 12, c: 45, f: 5, unit: 'piece', baseAmount: 1, info: '1 bowl standard porridge.' },
  { id: '149', name: 'Smoothie (Banana+Protein+Milk)', cal: 290, p: 30, c: 35, f: 3, unit: 'piece', baseAmount: 1, info: '1 large glass athlete mix.' },
  { id: '150', name: 'Chicken Caesar Salad (No Croutons)', cal: 220, p: 32, c: 6, f: 8, unit: 'piece', baseAmount: 1, info: 'Light dressing, pure grilled chicken.' },
  
  // ==========================================
  // SEAFOOD & ALTERNATIVE PROTEINS
  // ==========================================
  { id: '151', name: 'Shrimp (Boiled)', cal: 99, p: 24, c: 0.2, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Low-calorie, pure protein.' },
  { id: '152', name: 'Calamari (Boiled/Grilled)', cal: 90, p: 16, c: 3, f: 1.5, unit: 'gram', baseAmount: 100, info: 'Unfried net weight.' },
  { id: '153', name: 'Mussels (Plain)', cal: 86, p: 12, c: 3.5, f: 2, unit: 'gram', baseAmount: 100, info: 'Inner meat only.' },
  { id: '154', name: 'Octopus (Grilled)', cal: 164, p: 30, c: 4, f: 2, unit: 'gram', baseAmount: 100, info: 'High-protein seafood.' },
  { id: '155', name: 'Minced Turkey (Lean)', cal: 135, p: 22, c: 0, f: 5, unit: 'gram', baseAmount: 100, info: 'Alternative to minced chicken.' },
  { id: '156', name: 'Lamb Cubes (Lean)', cal: 200, p: 28, c: 0, f: 9, unit: 'gram', baseAmount: 100, info: 'Red meat alternative.' },
  { id: '157', name: 'Duck Breast (Skinless)', cal: 201, p: 28, c: 0, f: 9, unit: 'gram', baseAmount: 100, info: 'Gourmet protein source.' },
  { id: '158', name: 'Tofu (Firm)', cal: 144, p: 15, c: 2.8, f: 8.7, unit: 'gram', baseAmount: 100, info: 'Vegan protein source.' },
  { id: '159', name: 'Soy Mince', cal: 350, p: 52, c: 15, f: 1, unit: 'gram', baseAmount: 100, info: 'Plant-based protein depot.' },
  { id: '160', name: 'Tempeh', cal: 192, p: 20, c: 7.6, f: 10.8, unit: 'gram', baseAmount: 100, info: 'Fermented soy product.' },
  { id: '161', name: 'Seitan', cal: 370, p: 75, c: 14, f: 1.8, unit: 'gram', baseAmount: 100, info: 'Wheat gluten (High protein).' },

  // ==========================================
  // CHEESES & DAIRY (CONT.)
  // ==========================================
  { id: '162', name: 'Parmesan Cheese', cal: 431, p: 38, c: 4, f: 29, unit: 'gram', baseAmount: 100, info: 'For topping pasta/salads.' },
  { id: '163', name: 'Mozzarella (In Water)', cal: 280, p: 22, c: 2.2, f: 20, unit: 'gram', baseAmount: 100, info: 'Ideal for diet pizzas.' },
  { id: '164', name: 'Cheddar Cheese', cal: 402, p: 25, c: 1.3, f: 33, unit: 'gram', baseAmount: 100, info: 'High-fat cheese.' },
  { id: '165', name: 'Ricotta Cheese', cal: 174, p: 11, c: 3, f: 13, unit: 'gram', baseAmount: 100, info: 'Italian whey cheese.' },
  { id: '166', name: 'Gouda Cheese', cal: 356, p: 25, c: 2.2, f: 27, unit: 'gram', baseAmount: 100, info: 'Flavorful sandwich cheese.' },
  { id: '167', name: 'Halloumi Cheese (Grilled)', cal: 320, p: 22, c: 2, f: 25, unit: 'gram', baseAmount: 100, info: 'Breakfast grill.' },
  { id: '168', name: 'Cream Cheese', cal: 342, p: 6, c: 4, f: 34, unit: 'gram', baseAmount: 100, info: 'Spread (Net carbs used).' },

  // ==========================================
  // ALTERNATIVE CARBS & GRAINS
  // ==========================================
  { id: '169', name: 'Couscous (Cooked)', cal: 112, p: 3.8, c: 23, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Light pasta alternative.' },
  { id: '170', name: 'Semolina', cal: 360, p: 12, c: 72, f: 1, unit: 'gram', baseAmount: 100, info: 'Used for making porridge.' },
  { id: '171', name: 'Cornmeal', cal: 362, p: 8, c: 76, f: 3, unit: 'gram', baseAmount: 100, info: 'Gluten-free flour alternative.' },
  { id: '172', name: 'Breadcrumbs', cal: 395, p: 13, c: 76, f: 3, unit: 'gram', baseAmount: 100, info: 'For coating and meatball mix.' },
  { id: '173', name: 'Amaranth (Cooked)', cal: 102, p: 3.8, c: 18, f: 1.6, unit: 'gram', baseAmount: 100, info: 'Quinoa-like protein grain.' },
  { id: '174', name: 'Chestnuts (Roasted)', cal: 245, p: 3, c: 53, f: 2, unit: 'gram', baseAmount: 100, info: 'Very low-fat nut/carb.' },
  { id: '175', name: 'Noodles (Plain/Boiled)', cal: 138, p: 4.5, c: 27, f: 1.2, unit: 'gram', baseAmount: 100, info: 'Egg noodles without sauce.' },
  { id: '176', name: 'Gnocchi (Potato Pasta)', cal: 133, p: 3, c: 29, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Potato-based carbohydrate.' },
  { id: '177', name: 'Egg Pasta (Homemade, Cooked)', cal: 150, p: 5, c: 30, f: 1, unit: 'gram', baseAmount: 100, info: 'Traditional pasta.' },
  { id: '178', name: 'Black Rice (Cooked)', cal: 105, p: 4, c: 21, f: 1.5, unit: 'gram', baseAmount: 100, info: 'Antioxidant-rich rice.' },
  { id: '179', name: 'Phyllo Dough (Yufka)', cal: 275, p: 8, c: 55, f: 1.5, unit: 'piece', baseAmount: 1, info: '1 whole phyllo dough (Approx 160g).' },

  // ==========================================
  // VEGETABLES & SIDE DISHES (NET CARBS)
  // ==========================================
  { id: '180', name: 'Artichoke (Boiled)', cal: 47, p: 3.3, c: 5.1, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Liver friendly (Net carbs).' },
  { id: '181', name: 'Celery', cal: 16, p: 0.7, c: 1.4, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Very low calorie.' },
  { id: '182', name: 'Okra (Boiled)', cal: 33, p: 1.9, c: 4.5, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Digestion friendly.' },
  { id: '183', name: 'Radish', cal: 16, p: 0.7, c: 1.8, f: 0.1, unit: 'gram', baseAmount: 100, info: 'For salads.' },
  { id: '184', name: 'Beetroot (Boiled)', cal: 44, p: 1.7, c: 7.8, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Pre-workout pump effect (Nitric oxide).' },
  { id: '185', name: 'Sweet Corn (Boiled)', cal: 86, p: 3.3, c: 16, f: 1.3, unit: 'gram', baseAmount: 100, info: 'Starchy vegetable.' },
  { id: '186', name: 'Green Peas', cal: 81, p: 5.4, c: 10, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Protein-rich green vegetable (Net carbs).' },
  { id: '187', name: 'Purslane', cal: 20, p: 2, c: 3.4, f: 0.4, unit: 'gram', baseAmount: 100, info: 'Contains plant-based Omega-3.' },
  { id: '188', name: 'Pumpkin', cal: 26, p: 1, c: 6, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Low-calorie dessert alternative.' },
  { id: '189', name: 'Bell Pepper', cal: 20, p: 0.9, c: 3.5, f: 0.2, unit: 'piece', baseAmount: 1, info: '1 medium bell pepper.' },

  // ==========================================
  // FRUITS (BERRIES & EXOTIC)
  // ==========================================
  { id: '190', name: 'Raspberry', cal: 52, p: 1.2, c: 5.4, f: 0.6, unit: 'gram', baseAmount: 100, info: 'High fiber, low net carbs.' },
  { id: '191', name: 'Blackberry', cal: 43, p: 1.4, c: 4.3, f: 0.5, unit: 'gram', baseAmount: 100, info: 'Antioxidant depot.' },
  { id: '192', name: 'Cranberry', cal: 46, p: 0.4, c: 8, f: 0.1, unit: 'gram', baseAmount: 100, info: 'Good for the urinary tract.' },
  { id: '193', name: 'Quince', cal: 57, p: 0.4, c: 13, f: 0.1, unit: 'piece', baseAmount: 1, info: '1 medium size (approx 150g).' },
  { id: '194', name: 'Grapefruit', cal: 52, p: 0.9, c: 13, f: 0.2, unit: 'piece', baseAmount: 0.5, info: 'HALF (1/2) grapefruit.' },
  { id: '195', name: 'Papaya', cal: 43, p: 0.5, c: 11, f: 0.3, unit: 'gram', baseAmount: 100, info: 'Contains digestive enzymes.' },
  { id: '196', name: 'Mango', cal: 60, p: 0.8, c: 15, f: 0.4, unit: 'gram', baseAmount: 100, info: 'High-sugar pre-workout fruit.' },
  { id: '197', name: 'Persimmon', cal: 70, p: 0.6, c: 18, f: 0.2, unit: 'piece', baseAmount: 1, info: '1 piece.' },
  { id: '198', name: 'Dried Mulberries', cal: 330, p: 10, c: 70, f: 1.5, unit: 'gram', baseAmount: 30, info: '1 small handful.' },
  { id: '199', name: 'Fresh Fig', cal: 74, p: 0.8, c: 19, f: 0.3, unit: 'piece', baseAmount: 1, info: '1 medium size.' },
  { id: '200', name: 'Grapes (Fresh)', cal: 69, p: 0.7, c: 18, f: 0.2, unit: 'gram', baseAmount: 100, info: 'Approximately 1 bunch.' },

  // ==========================================
  // FATS, SEEDS & SAUCES (NET CARBS)
  // ==========================================
  { id: '201', name: 'Brazil Nut', cal: 659, p: 14, c: 4.5, f: 67, unit: 'piece', baseAmount: 2, info: '2 nuts (Selenium depot).' },
  { id: '202', name: 'Pine Nuts', cal: 673, p: 14, c: 9, f: 68, unit: 'gram', baseAmount: 15, info: '1 tablespoon.' },
  { id: '203', name: 'Hemp Seeds', cal: 553, p: 31, c: 4, f: 49, unit: 'gram', baseAmount: 10, info: 'Plant protein and fat (1 tbsp).' },
  { id: '204', name: 'Poppy Seeds', cal: 525, p: 18, c: 8, f: 41, unit: 'gram', baseAmount: 10, info: '1 tablespoon.' },
  { id: '205', name: 'Avocado Oil', cal: 120, p: 0, c: 0, f: 14, unit: 'gram', baseAmount: 14, info: '1 tablespoon (Great for cooking).' },
  { id: '206', name: 'Canola Oil', cal: 120, p: 0, c: 0, f: 14, unit: 'gram', baseAmount: 14, info: '1 tablespoon.' },
  { id: '207', name: 'Flaxseed Oil', cal: 120, p: 0, c: 0, f: 14, unit: 'gram', baseAmount: 14, info: '1 tablespoon (Do not heat, use in salads).' },
  { id: '208', name: 'Coconut (Fruit)', cal: 354, p: 3.3, c: 6, f: 33, unit: 'gram', baseAmount: 50, info: 'Fresh fruit meat.' },
  { id: '209', name: 'Coconut Milk (Canned)', cal: 230, p: 2.3, c: 3.2, f: 24, unit: 'gram', baseAmount: 100, info: 'Fatty milk for cooking.' },
  { id: '210', name: 'Soy Sauce', cal: 9, p: 1.3, c: 1, f: 0, unit: 'gram', baseAmount: 15, info: '1 tablespoon.' },
  { id: '211', name: 'Mustard (Sugar-Free)', cal: 9, p: 0.6, c: 0.8, f: 0.5, unit: 'gram', baseAmount: 15, info: '1 tablespoon.' },
  { id: '212', name: 'Ketchup (Sugar-Free)', cal: 15, p: 0.2, c: 3, f: 0, unit: 'gram', baseAmount: 15, info: '1 tablespoon.' },
  { id: '213', name: 'Homemade Mayonnaise', cal: 100, p: 0.2, c: 0.1, f: 11, unit: 'gram', baseAmount: 15, info: '1 tablespoon.' },
  { id: '214', name: 'Apple Cider Vinegar', cal: 3, p: 0, c: 0.1, f: 0, unit: 'gram', baseAmount: 15, info: '1 tablespoon.' },
  { id: '215', name: 'Lemon Juice', cal: 4, p: 0.1, c: 1.3, f: 0, unit: 'gram', baseAmount: 15, info: '1 tablespoon.' },

  // ==========================================
  // SPORTS SUPPLEMENTS & DRINKS (CONT.)
  // ==========================================
  { id: '216', name: 'Protein Water (Bottle)', cal: 60, p: 15, c: 0, f: 0, unit: 'piece', baseAmount: 1, info: '1 small bottle of clear protein drink.' },
  { id: '217', name: 'Electrolyte Powder', cal: 5, p: 0, c: 1, f: 0, unit: 'gram', baseAmount: 5, info: 'For minerals lost through sweat (1 scoop).' },
  { id: '218', name: 'Glutamine', cal: 20, p: 5, c: 0, f: 0, unit: 'gram', baseAmount: 5, info: '1 dessert spoon (For recovery).' },
  { id: '219', name: 'Collagen Peptides', cal: 35, p: 9, c: 0, f: 0, unit: 'gram', baseAmount: 10, info: '1 scoop (For joints).' },
  { id: '220', name: 'Fruit / Nut Bar', cal: 140, p: 3, c: 20, f: 5, unit: 'piece', baseAmount: 1, info: 'Average 40g natural date bar.' },
  { id: '221', name: 'Iced Tea (Sugar-Free)', cal: 2, p: 0, c: 0, f: 0, unit: 'piece', baseAmount: 1, info: '1 can or mug.' },
  { id: '222', name: 'Kombucha', cal: 30, p: 0, c: 7, f: 0, unit: 'gram', baseAmount: 200, info: 'Probiotic tea (1 glass).' },
  { id: '223', name: 'Turnip Juice (Spicy)', cal: 10, p: 0.5, c: 2, f: 0, unit: 'gram', baseAmount: 200, info: '1 glass (High sodium).' },
  { id: '224', name: 'Almond Milk (Unsweetened)', cal: 15, p: 0.5, c: 0.2, f: 1.2, unit: 'gram', baseAmount: 200, info: '1 glass (Very low calorie).' },
  { id: '225', name: 'Soy Milk (Unsweetened)', cal: 66, p: 7, c: 3, f: 4, unit: 'gram', baseAmount: 200, info: '1 glass (Protein-rich plant milk).' },
  { id: '226', name: 'Oat Milk (Unsweetened)', cal: 90, p: 2, c: 14, f: 3, unit: 'gram', baseAmount: 200, info: '1 glass (Carb-rich milk).' },

  // ==========================================
  // FAST FOOD & CHEAT MEALS
  // (Important to include in calculations)
  // ==========================================
  { id: '227', name: 'Hamburger (Standard)', cal: 250, p: 13, c: 31, f: 9, unit: 'piece', baseAmount: 1, info: '1 plain single patty hamburger.' },
  { id: '228', name: 'Cheeseburger', cal: 300, p: 15, c: 33, f: 12, unit: 'piece', baseAmount: 1, info: '1 standard size cheeseburger.' },
  { id: '229', name: 'French Fries (Small)', cal: 230, p: 3, c: 30, f: 11, unit: 'piece', baseAmount: 1, info: '1 small pack of fast-food fries.' },
  { id: '230', name: 'Pizza (Mixed, 1 Slice)', cal: 250, p: 10, c: 28, f: 11, unit: 'piece', baseAmount: 1, info: '1 slice from a medium pizza.' },
  { id: '231', name: 'Lahmacun', cal: 220, p: 10, c: 31, f: 6, unit: 'piece', baseAmount: 1, info: '1 standard size lahmacun.' },
  { id: '232', name: 'Pita (With Minced Meat)', cal: 550, p: 25, c: 65, f: 20, unit: 'piece', baseAmount: 1, info: '1 standard size pita (pide).' },
  { id: '233', name: 'Milk Chocolate', cal: 535, p: 7, c: 59, f: 30, unit: 'gram', baseAmount: 100, info: '1 square pack of chocolate.' },
  { id: '234', name: 'Wafer / Chocolate Bar', cal: 250, p: 3, c: 33, f: 12, unit: 'piece', baseAmount: 1, info: '1 pack (Snickers, Metro, etc.).' },
  { id: '235', name: 'Jelly Beans', cal: 340, p: 6, c: 78, f: 0, unit: 'gram', baseAmount: 100, info: 'Pure sugar (Sometimes used for insulin spike right after sports).' },
  { id: '236', name: 'Baklava', cal: 420, p: 5, c: 50, f: 22, unit: 'piece', baseAmount: 2, info: '2 slices of standard baklava.' },
  { id: '237', name: 'Rice Pudding (Sütlaç)', cal: 260, p: 6, c: 45, f: 5, unit: 'piece', baseAmount: 1, info: '1 portion/bowl of baked rice pudding.' },
  { id: '238', name: 'Ice Cream (Vanilla)', cal: 207, p: 3.5, c: 24, f: 11, unit: 'gram', baseAmount: 100, info: 'Standard dairy ice cream (2 scoops).' },
  { id: '239', name: 'Chips (Potato)', cal: 536, p: 7, c: 53, f: 35, unit: 'gram', baseAmount: 100, info: '1 large bowl or pack.' },
  { id: '240', name: 'Croissant (Plain)', cal: 406, p: 8, c: 45, f: 21, unit: 'piece', baseAmount: 1, info: '1 standard bakery croissant.' },
  { id: '241', name: 'Simit (Turkish Bagel)', cal: 275, p: 8, c: 52, f: 4, unit: 'piece', baseAmount: 1, info: '1 standard street simit.' },
  { id: '242', name: 'Pogaca (With Cheese)', cal: 320, p: 9, c: 35, f: 16, unit: 'piece', baseAmount: 1, info: '1 bakery pastry.' },

  // ==========================================
  // EXTRA HEALTHY MEALS
  // ==========================================
  { id: '243', name: 'Quinoa Salad', cal: 250, p: 8, c: 35, f: 9, unit: 'piece', baseAmount: 1, info: '1 portion of green salad with quinoa.' },
  { id: '244', name: 'Chicken Noodles (With Veggies)', cal: 380, p: 25, c: 50, f: 10, unit: 'piece', baseAmount: 1, info: '1 portion of Asian style noodles.' },
  { id: '245', name: 'Chicken Broth Soup', cal: 150, p: 12, c: 15, f: 5, unit: 'piece', baseAmount: 1, info: '1 bowl of soup with vermicelli and chicken.' },
  { id: '246', name: 'Yayla Soup (Yogurt Soup)', cal: 120, p: 4, c: 15, f: 5, unit: 'piece', baseAmount: 1, info: '1 bowl.' },
  { id: '247', name: 'Ezogelin Soup', cal: 130, p: 5, c: 18, f: 4, unit: 'piece', baseAmount: 1, info: '1 bowl.' },
  { id: '248', name: 'Menemen (With Eggs, Low Fat)', cal: 200, p: 12, c: 10, f: 13, unit: 'piece', baseAmount: 1, info: '1 portion of low-fat menemen.' },
  { id: '249', name: 'Mixed Nuts (Raw/Unroasted)', cal: 180, p: 5, c: 3, f: 16, unit: 'gram', baseAmount: 30, info: '1 handful raw mix.' },
  { id: '250', name: 'Protein Oatmeal (With Banana)', cal: 450, p: 35, c: 60, f: 8, unit: 'piece', baseAmount: 1, info: 'Complete athlete meal (Oats+Protein Powder+Banana).' }
];