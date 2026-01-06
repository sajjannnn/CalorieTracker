import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { MdOutlineCamera } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { LuChefHat } from "react-icons/lu";
import History from "./History";
import MacroNutrients from "./MacroNutrients";
import { useNavigate } from "react-router-dom";
import { setActivePage } from "../utilis/activePage";
import { getNutriData } from "../utilis/localStorage.tsx/localStorageFunctions";

const Home = () => {
  const displayName = useSelector((store: RootState) => store?.user?.displayName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navToRecipe = () => {
    navigate("/recipe");
    dispatch(setActivePage("/recipe"));
  };
  const navToScan = () => {
    navigate("/calorie-check");
    dispatch(setActivePage("/calorie-check"));
  };

  return (
    <div className="pt-[8%] flex justify-center">
      <div className="w-7xl h-full">
        <div className="text-4xl ">Welcome {displayName}</div>
        <div className="text-gray-600">Track your nutrition and stay healthy today.</div>
        <div className="grid grid-cols-12">
          <div className="col-span-8 border-2 shadow-2xl rounded-lg p-6 m-4">
            <div className="flex">
              <div>chart</div>
              <div className=" w-full ">
                <div className="border-b border-gray-500 text-2xl mb-4 ">
                  <p className="text-sm text-gray-500">Daily Goal</p> {getNutriData().dailyGoal} kcal
                </div>
                <div className="border-b border-gray-500 text-2xl mb-4">
                  {" "}
                  <p className="text-sm text-gray-500">Remaining</p>{getNutriData().dailyGoal - getNutriData().consumed} kcal
                </div>
                <div className="border-b border-gray-500 text-2xl ">
                  {" "}
                  <p className="text-sm text-gray-500">Progress</p>{ Math.floor(getNutriData().consumed / getNutriData().dailyGoal *100)}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4 border-2 shadow-2xl rounded-3xl p-2">
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
            <div className="flex items-center text-4xl border rounded-2xl m-2 p-1 gap-2">
              <GoPlus />
              <div>
                <div className="text-lg"> Log Manually</div>
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
