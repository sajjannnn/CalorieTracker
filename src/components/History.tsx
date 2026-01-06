import { SlEnergy } from "react-icons/sl";
import { GiMeal } from "react-icons/gi";
import { getNutriData } from "../utilis/localStorage.tsx/localStorageFunctions";
const History = () => {
  return (
    <div>
      <div className="font-bold text-2xl my-5">Today's Meal</div>
      {getNutriData().meals.length === 0 && <div className="">No meals logged yet!</div>}
      {getNutriData().meals.map((meal, index) => (
        <div key={index} className="flex justify-between border rounded-2xl p-4 mb-4">
          <p className="flex items-center text-4xl gap-2">
            {" "}
            <GiMeal />
            <div className="text-lg">
            {meal.name}
            <p className="text-gray-600 text-sm">{meal.type}</p>
            </div>

          </p>
          <p className="flex items-center">
            <SlEnergy />
            {meal.calories}
          </p>
        </div>
      ))}
    </div>
  );
};

export default History;
