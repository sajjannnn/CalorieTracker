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
    <div className="md:pt-[150px] flex justify-center px-4 bg-[#f8f7f3] h-screen">
      <div className="w-7xl h-full">
        <div className="text-4xl ">Welcome {displayName}</div>
        <div className="text-gray-600">Track your nutrition and stay healthy today.</div>
        <div className="md:grid grid-cols-12 ">
          <div className="col-span-8 border-2 border-gray-200 rounded-3xl p-6 m-4 md:ml-0 bg-white">
            <div className="flex">
              <div className="md:mx-4 mr-4">
                <CalorieRing consumed={data.consumed} goal={data.dailyGoal} />
              </div>
              <div className=" w-full ">
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
         <QuickActions/>
        </div>
        <MacroNutrients />
        <History />
      </div>
    </div>
  );
};

export default Home;
