import { SlEnergy } from "react-icons/sl";
import { GiMeal } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { clearMeal } from "../utilis/mealSlice";
const History = () => {
 const data = useSelector((store:RootState) => store.meal.data)
const dispatch = useDispatch();
  return (
    <div className="m-between-components">
      <div className="flex justify-between items-center">
        <h2>Today's Meal</h2>
        <button
          className="mb-2 bg-green-500 hover:shadow-2xl font-bold text-xl rounded-2xl text-white"
          onClick={() => dispatch(clearMeal())}
        >
          Reset Day
        </button>
      </div>

      {data.meals.length === 0 && <div className="">No meals logged yet!</div>}
      {data.meals.map((meal, index) => (
        <div key={index} className="flex justify-between border hover:shadow-2xl border-gray-200 rounded-2xl p-4 mb-4 bg-white">
          <div className="flex items-center text-4xl gap-2">
            {" "}
            <GiMeal className=" text-gray-800 bg-[#fbfcf0] m-2"/>
            <div className="text-lg">
              {meal.name}
              <p className="text-gray-600 text-sm">{meal.type}</p>
            </div>
          </div>
          <p className="flex items-center">
            <SlEnergy className="text-orange-500 text-2xl"/>
            {meal.calories}
          </p>
        </div>
      ))}
    </div>
  );
};

export default History;
