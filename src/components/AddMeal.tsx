import { useRef } from "react";
import { saveNutriData } from "../utilis/localStorage.tsx/localStorageFunctions";
import type { Meal } from "../utilis/localStorage.tsx/types";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { setMeal } from "../utilis/mealSlice";
import { useNavigate } from "react-router-dom";

const AddMeal = () => {
  const fromRef = useRef<HTMLFormElement>(null);
  const data = useSelector((store: RootState) => store.meal.data);
  const dispatch = useDispatch()
  const navigate = useNavigate();

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
    navigate("/");
  };
  return (
    <div className="m-header flex justify-center bg-[#f8f7f3] h-screen">
      <div className="lg:w-7xl flex flex-col items-center ">
        <h1>Add Meal</h1>
        <p className="m-down ">Log your meal manually to track your daily intake</p>
        <div className="w-2/3 border border-gray-300 rounded-2xl p-6 bg-white">
          <form className="space-y-6" ref={fromRef} onSubmit={addMeal}>
            <div className="flex flex-col">
              <label htmlFor="mealName"> Food Name </label>
              <input type="text" name="mealName" id="mealName" required placeholder="e.g., Grilled Chicken" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="calories"> Calories </label>
              <input type="number" name="calories" id="calories" required placeholder="e.g., 350" />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mealType"> Meal Type </label>
              <input type="text" name="mealType" id="mealType" required placeholder="e.g., Breakfast, Lunch, Dinner" />
            </div>
            <div className="flex justify-between flex-wrap">
              <div className="flex flex-col">
                <label htmlFor="protein"> Protein </label>
                <input type="number" name="protein" id="protein" required placeholder="0" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="carbs"> Carbs(g) </label>
                <input type="number" name="carbs" id="carbs" required placeholder="0" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="fats"> Fats(g) </label>
                <input type="number" name="fats" id="fats" required placeholder="0" />
              </div>
            </div>
            <button className="w-full" type="submit">
              Add Meal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMeal;
