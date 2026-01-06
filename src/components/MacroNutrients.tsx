import { getNutriData } from "../utilis/localStorage.tsx/localStorageFunctions";

const MacroNutrients = () => {
  return (
    <div>
      {" "}
      <div>Macronutrients</div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-4 border border-gray-500 rounded-2xl p-2">
          <div className="flex mb-2 justify-between items-center">
            <p className="text-gray-600">Protein</p>
            <p className="w-3 h-3 rounded-full bg-pink-600"></p>
          </div>
          <div className="text-2xl font-semibold">{getNutriData().macros.protein}</div>
          <div>Progess bar</div>
        </div>
        <div className="col-span-4 border border-gray-500 rounded-2xl p-2">
          <div className="flex mb-2 justify-between items-center">
            <p className="text-gray-600">Carbs</p>
            <p className="w-3 h-3 rounded-full bg-pink-600"></p>
          </div>
          <div className="text-2xl font-semibold">{getNutriData().macros.carbs}</div>
          <div>Progess bar</div>
        </div>{" "}
        <div className="col-span-4 border border-gray-500 rounded-2xl p-2">
          <div className="flex mb-2 justify-between items-center">
            <p className="text-gray-600">Fats</p>
            <p className="w-3 h-3 rounded-full bg-pink-600"></p>
          </div>
          <div className="text-2xl font-semibold">{getNutriData().macros.fats}</div>
          <div>Progess bar</div>
        </div>
      </div>
    </div>
  );
};

export default MacroNutrients;
