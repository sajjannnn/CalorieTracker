import { SlEnergy } from "react-icons/sl";
import { GiMeal } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { clearMeal } from "../utilis/mealSlice";
const History = () => {
 const data = useSelector((store:RootState) => store.meal.data)
const dispatch = useDispatch();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="font-bold text-2xl my-5">Today's Meal</div>
        <button
          className="p-2 bg-gray-600 rounded-2xl text-white"
          onClick={() => dispatch(clearMeal())}
        >
          Reset Day
        </button>
      </div>

      {data.meals.length === 0 && <div className="">No meals logged yet!</div>}
      {data.meals.map((meal, index) => (
        <div key={index} className="flex justify-between border rounded-2xl p-4 mb-4">
          <div className="flex items-center text-4xl gap-2">
            {" "}
            <GiMeal />
            <div className="text-lg">
              {meal.name}
              <p className="text-gray-600 text-sm">{meal.type}</p>
            </div>
          </div>
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
