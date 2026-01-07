import RecipeContent from "./RecipeContent";
import RecipeInputBar from "./RecipeInputBar";
import { SiCodechef } from "react-icons/si";

const RecipeGpt = () => {
  return (
    <div className="w-screen flex justify-center bg-[#f8f7f3]">
      <div className="w-screen lg:w-7xl">
        <div className=" pt-[50px] md:pt-[200px] text-2xl text-4xl md:text-6xl flex font-bold">
          <SiCodechef />
          <h1>Recipe Generator </h1>
        </div>
        <p className="m-3 text-gray-600 text-sm md:text-xl">Tell us what ingredients you have, and we'll suggest healthy recipes.</p>
        <div className="h-screen md:grid grid-cols-2 m-2 md:mt-15 ">
          {/* <img  className="absolute -z-10 object-cover object-center" src={LOGIN_BG_URL} alt="" /> */}
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
