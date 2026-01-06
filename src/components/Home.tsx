import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { MdOutlineCamera } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { LuChefHat } from "react-icons/lu";
import History from "./History";
import MacroNutrients from "./MacroNutrients";
import { useNavigate } from "react-router-dom";
import { setActivePage } from "../utilis/activePage";
import { CalorieRing } from "./PieCharts";

const Home = () => {
  const displayName = useSelector((store: RootState) => store?.user?.displayName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((store: RootState) => store.meal.data);

  const navToRecipe = () => {
    navigate("/recipe");
    dispatch(setActivePage("/recipe"));
  };
  const navToScan = () => {
    navigate("/calorie-check");
    dispatch(setActivePage("/calorie-check"));
  };
  const navToaddMeal = () => {
    navigate("/add-meal");
    dispatch(setActivePage("/add-meal"));
  };

  return (
    <div className="md:pt-[150px] flex justify-center px-4">
      <div className="w-7xl h-full">
        <div className="text-4xl ">Welcome {displayName}</div>
        <div className="text-gray-600">Track your nutrition and stay healthy today.</div>
        <div className="md:grid grid-cols-12 ">
          <div className="col-span-8 border-2 rounded-3xl p-6 m-4">
            <div className="flex">
              <div className="md:mx-4">
                <CalorieRing consumed={data.consumed} goal={data.dailyGoal} />
              </div>
              <div className=" w-full ">
                <div className="border-b border-gray-500 text-2xl mb-4 ">
                  <p className="text-sm text-gray-500">Daily Goal</p> {data.dailyGoal} kcal
                </div>
                <div className="border-b border-gray-500 text-2xl mb-4">
                  {" "}
                  <p className="text-sm text-gray-500">Remaining</p>
                  {data.dailyGoal - data.consumed} kcal
                </div>
                <div className="border-b border-gray-500 text-2xl ">
                  {" "}
                  <p className="text-sm text-gray-500">Progress</p>
                  {Math.floor((data.consumed / data.dailyGoal) * 100)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 flex flex-col justify-evenly border-2 rounded-3xl p-2">
            <div className="flex items-center text-4xl border rounded-2xl m-2 p-1 gap-2 cursor-pointer" onClick={navToScan}>
              <MdOutlineCamera />
              <div>
                <div className="text-lg"> Scan Food</div>
                <p className=" text-xs text-gray-600">Take a photo</p>
              </div>
            </div>
            <div className="flex items-center text-4xl border rounded-2xl m-2 p-1 gap-2 cursor-pointer" onClick={navToRecipe}>
              <LuChefHat />
              <div>
                <div className="text-lg"> Get Recipe</div>
                <p className=" text-xs text-gray-600">From ingredients</p>
              </div>
            </div>
            <div className="flex items-center text-4xl border rounded-2xl m-2 p-1 gap-2 cursor-pointer" onClick={navToaddMeal}>
              <GoPlus />
              <div>
                <div className="text-lg " >
                  {" "}
                  Log Manually
                </div>
                <p className=" text-xs text-gray-600">Add meal entry</p>
              </div>
            </div>
          </div>
        </div>
        <MacroNutrients />
        <History />
      </div>
    </div>
  );
};

export default Home;
