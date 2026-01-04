import { useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { FaBowlFood } from "react-icons/fa6";

const RecipeContent = () => {
  const content = useSelector((store: RootState) => store.recipe.recipeResult);
  return (
    <div className="border-2 border-black rounded-3xl mx-4 h-3/5">
      <div className="flex flex-col h-full justify-center items-center text-center">
        <p className="text-8xl flex justify-center">
              <FaBowlFood />
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
