import { useRef } from "react";
import { saveNutriData } from "../utilis/localStorage.tsx/localStorageFunctions";
import type { Meal } from "../utilis/localStorage.tsx/types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { setMeal } from "../utilis/mealSlice";

const AddMeal = () => {
  const fromRef = useRef<HTMLFormElement>(null);
  const data = useSelector((store: RootState) => store.meal.data);
  const dispatch = useDispatch()

  const addMeal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(fromRef.current!);
    const mealName: Meal = {
      name: formData.get("mealName") as string,
      type: formData.get("mealType") as string,
      calories: Number(formData.get("calories")),
    };

    const calories = Number(formData.get("calories"));
    const protein = Number(formData.get("protein"));
    const carbs = Number(formData.get("carbs"));
    const fats = Number(formData.get("fats"));
    const updatedData = {
      ...data,
      consumed: data.consumed + calories,
      meals: [...data.meals, mealName],
      macros: {
        protein: data.macros.protein + protein,
        carbs: data.macros.carbs + carbs,
        fats: data.macros.fats + fats,
      },
    };

    saveNutriData(updatedData);
    dispatch(setMeal(updatedData));
  };
  return (
    <div className="md:pt-[150px] flex justify-center">
      <div className="lg:w-7xl flex flex-col items-center ">
        <div className="text-bold text-4xl my-3">Add Meal</div>
        <p className="text-gray-500">Log your meal manually to track your daily intake</p>
        <div className="w-2/3 border rounded-2xl p-6 mt-6">
          <form className="space-y-6" ref={fromRef} onSubmit={addMeal}>
            <div className="flex flex-col">
              <label htmlFor="mealName"> Food Name </label>
              <input className="border rounded-2xl border-gray-600 py-2 px-4" type="text" name="mealName" id="mealName" required placeholder="e.g., Grilled Chicken" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="calories"> Calories </label>
              <input className="border rounded-2xl border-gray-600 py-2 px-4" type="number" name="calories" id="calories" required placeholder="e.g., 350" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mealType"> Meal Type </label>
              <input className="border rounded-2xl border-gray-600 py-2 px-4" type="text" name="mealType" id="mealType" required placeholder="e.g., Breakfast, Lunch, Dinner" />
            </div>
            <div className="flex justify-between flex-wrap">
              <div className="flex flex-col">
                <label htmlFor="protein"> Protein </label>
                <input className="border rounded-2xl border-gray-600 py-2 px-2" type="number" name="protein" id="protein" required placeholder="0" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="carbs"> Carbs(g) </label>
                <input className="border rounded-2xl border-gray-600 py-2 px-2" type="number" name="carbs" id="carbs" required placeholder="0" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="fats"> Fats(g) </label>
                <input className="border rounded-2xl border-gray-600 py-2 px-2" type="number" name="fats" id="fats" required placeholder="0" />
              </div>
            </div>
            <button className="bg-gray-600 text-white rounded-2xl p-3 w-full" type="submit">
              Add Meal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
