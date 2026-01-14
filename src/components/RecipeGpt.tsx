import RecipeContent from "./RecipeContent";
import RecipeInputBar from "./RecipeInputBar";
import { SiCodechef } from "react-icons/si";

const RecipeGpt = () => {
  return (
    <div className="w-screen flex justify-center bg-[#f8f7f3] m-header ">
      <div className="flex flex-col justify-center items-center">
        <div className="text-2xl text-4xl  flex ">
          <SiCodechef />
          <h1>Recipe Generator </h1>
        </div>
        <p className="m-down ">Tell us what ingredients you have, and we'll suggest healthy recipes.</p>
        <div className="h-screen md:grid grid-cols-2">
          <div className="col-span-1">
            <RecipeInputBar />
          </div>{" "}
          <div className="col-span-1">
            <RecipeContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeGpt;
