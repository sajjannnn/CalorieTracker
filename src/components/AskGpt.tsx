import GptCard from "./GptCard";
import GptSearchBar from "./GptSearchBar";

const AskGpt = () => {
  return (
    <div className="pt-[50px] md:pt-[200px] w-screen flex justify-center">
      <div className="w-screen lg:w-7xl">
        <div>
        <GptSearchBar />
      </div>
      <div className="">
      <GptCard />
      </div>
        </div>

    </div>
  );
};

export default AskGpt;
