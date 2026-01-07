import { getNutriData } from "../utilis/localStorage.tsx/localStorageFunctions";

const MacroNutrients = () => {
  return (
    <div>
      {" "}
      <div>Macronutrients</div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 bg-white border border-gray-200 rounded-2xl p-2">
          <div className="flex mb-1 justify-between items-center">
            <p className="text-gray-600">Protein</p>
            <p className="w-3 h-3 rounded-full bg-pink-600"></p>
          </div>
          <div className="text-2xl font-semibold">{getNutriData().macros.protein}g</div>
        </div>
        <div className="col-span-4 bg-white border border-gray-200 rounded-2xl p-2">
          <div className="flex mb-1 justify-between items-center">
            <p className="text-gray-600">Carbs</p>
            <p className="w-3 h-3 rounded-full bg-yellow-400"></p>
          </div>
          <div className="text-2xl font-semibold">{getNutriData().macros.carbs}g</div>
        </div>{" "}
        <div className="col-span-4 bg-white border border-gray-200 rounded-2xl p-2">
          <div className="flex mb-1 justify-between items-center">
            <p className="text-gray-600">Fats</p>
            <p className="w-3 h-3 rounded-full bg-green-600"></p>
          </div>
          <div className="text-2xl font-semibold">{getNutriData().macros.fats}g</div>
        </div>
      </div>
    </div>
  );
};

export default MacroNutrients;
