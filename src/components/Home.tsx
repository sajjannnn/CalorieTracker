import { useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";

import History from "./History";
import MacroNutrients from "./MacroNutrients";
import { CalorieRing } from "./PieCharts";
import QuickActions from "./QuickActions";

const Home = () => {
  const displayName = useSelector((store: RootState) => store?.user?.displayName);

  const data = useSelector((store: RootState) => store.meal.data);

  return (
    <div className="m-header flex justify-center px-4 bg-[#f8f7f3] h-screen">
      <div className="w-7xl h-full">
        <h1 className=" ">Welcome {displayName}</h1>
        <p className="text-center m-down ">Track your nutrition and stay healthy today.</p>
        <div className="md:grid grid-cols-12 gap-4">
          <div className="col-span-8 border-2 h-full border-gray-200 rounded-3xl  md:ml-0 bg-white">
            <div className="flex h-full">
              <div className="flex justify-center items-center m-4">
                <CalorieRing consumed={data.consumed} goal={data.dailyGoal} />
              </div>
              <div className="m-4 w-full flex flex-col justify-evenly">
                <div className="border-b font-bold border-gray-300 text-2xl mb-4">
                  <p className="text-sm text-gray-500 font-normal">Daily Goal</p> {data.dailyGoal} kcal
                </div>
                <div className="border-b border-gray-300 text-2xl mb-4 font-bold text-green-500">
                  {" "}
                  <p className="text-sm text-gray-500 font-normal">Remaining</p>
                  {data.dailyGoal - data.consumed} kcal
                </div>
                <div className="border-b border-gray-300 text-2xl text-orange-400 font-bold">
                  {" "}
                  <p className="text-sm text-gray-500">Progress</p>
                  {Math.floor((data.consumed / data.dailyGoal) * 100)}%
                </div>
              </div>
            </div>
          </div>
          <QuickActions />
        </div>
        <MacroNutrients />
        <History />
      </div>
    </div>
  );
};

export default Home;
