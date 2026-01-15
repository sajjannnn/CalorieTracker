import RecipeContent from "./RecipeContent";
import { SiCodechef } from "react-icons/si";

const RecipeGpt = () => {
  return (
    <div className="w-screen h-screen flex justify-center bg-[#f8f7f3] m-header ">
      <div className="flex flex-col items-center ">
        <div className="text-4xl flex ">
          <SiCodechef />
          <h1>Recipe Generator </h1>
        </div>
        <p className="m-down ">Tell us what ingredients you have, and we'll suggest healthy recipes.</p>
            <RecipeContent />
      </div>
    </div>
  );
};

export default RecipeGpt;
