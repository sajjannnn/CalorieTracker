// export type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack";

export interface Meal {
  name: string;
  type: string;
  calories: number;
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
  consumed: 0,
  macros: {
    protein: 0,
    carbs: 0,
    fats: 0,
  },
  meals: [],
};
