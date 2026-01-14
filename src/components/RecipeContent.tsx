import { useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { FaBowlFood } from "react-icons/fa6";

const RecipeContent = () => {
  const content = useSelector((store: RootState) => store.recipe.recipeResult);
  return (
    <div className="border-2 border-gray-300 rounded-3xl mx-4 bg-white ">
      <div className="flex flex-col h-full p-4 justify-center min-h-[380px] items-center text-center ">
        <p className="text-8xl flex justify-center">
              <FaBowlFood  className="text-gray-900"/>
            </p>
        {!content && (
          <div>
            
            <div className="font-bold ">Your Recipe Will Appear Here</div>
            <p className="text-gray-600">Add at least one ingredient and click generate</p>
          </div>
        )}
        {content && content.map((step: string, index: number) => {
          return (
            <p key={index} className="ml-4 w-full text-start text-sm md:text-2xl">
              {step}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default RecipeContent;
