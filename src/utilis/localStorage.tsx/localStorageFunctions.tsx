import type { NutriTrackData, Meal} from "./types";
import { initialNutriData } from "./types";

const STORAGE_KEY = "nutriTrackData";

/** Get stored data */
export const getNutriData = (): NutriTrackData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : initialNutriData;
};

/** Save data */
const saveNutriData = (data: NutriTrackData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

/** Add meal */
export const addMeal = (meal: Meal): void => {
  const data = getNutriData();

  data.meals.push(meal);
  data.consumed += meal.calories;
  data.macros.protein += meal.protein ?? 0;
  data.macros.carbs += meal.carbs ?? 0;
  data.macros.fats += meal.fats ?? 0;

  saveNutriData(data);
};
