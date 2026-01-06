import type { NutriTrackData } from "./types";
import { initialNutriData } from "./types";

export const STORAGE_KEY = "nutriTrackData";

/** Get stored data */
export const getNutriData = (): NutriTrackData => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : initialNutriData;
};

/** Save data */
export const saveNutriData = (data: NutriTrackData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const clearData = () => {
  localStorage.clear();
};
