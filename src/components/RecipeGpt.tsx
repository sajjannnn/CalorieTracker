import RecipeContent from "./RecipeContent";
import RecipeInputBar from "./RecipeInputBar";

const RecipeGpt = () => {
  return (
    <div className="w-screen flex justify-center">
      <div className="w-screen lg:w-7xl">
        <h1 className="pt-[150px] md:pt-[200px] text-2xl md:text-4xl font-bold">Get Your Next Delicious Recipe</h1>
        <div className="h-screen flex flex-col items-center m-2 md:m-25 ">
          {/* <img  className="absolute -z-10 object-cover object-center" src={LOGIN_BG_URL} alt="" /> */}

          <RecipeInputBar />
          <RecipeContent />
        </div>
      </div>
    </div>
  );
};

export default RecipeGpt;
