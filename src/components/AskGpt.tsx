import GptContent from "./GptContent";
import GptSearchBar from "./GptSearchBar";

const AskGpt = () => {
  return (
    <div className="">
      <div className="">
        <GptSearchBar />
      </div>
      <div className="">
        <GptContent />
      </div>
    </div>
  );
};

export default AskGpt;
