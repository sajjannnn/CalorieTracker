export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

export interface Meal {
  name: string;
  type: MealType;
  calories: number;
  protein?: number;
  carbs?: number;
  fats?: number;
}

export interface Macros {
  protein: number;
  carbs: number;
  fats: number;
}

export interface NutriTrackData {
  dailyGoal: number;
  consumed: number;
  macros: Macros;
  meals: Meal[];
}


export const initialNutriData: NutriTrackData = {
  dailyGoal: 2500,
  consumed: 1255,
  macros: {
    protein: 35,
    carbs: 130,
    fats: 12,
  },
  meals: [
    { name: "Chicken Salad", type: "Lunch", calories: 450 },
    { name: "Oatmeal", type: "Breakfast", calories: 300 },
    { name: "Apple Snack", type: "Snack", calories: 150 },
  ],
};
