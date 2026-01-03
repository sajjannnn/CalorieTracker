import GptContent from "./GptContent";
import GptSearchBar from "./GptSearchBar";

const AskGpt = () => {
  return (
    <div className="pt-[200px] w-screen flex justify-center">
      <div className="w-7xl">
        <div>
        <GptSearchBar />
      </div>
      <div className="">
        <GptContent />
      </div>
        </div>

    </div>
  );
};

export default AskGpt;
