import GptContent from "./GptContent";
import GptSearchBar from "./GptSearchBar";

const AskGpt = () => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-6 border">
        <GptSearchBar />
      </div>
      <div className="col-span-6">
        <GptContent />
      </div>
    </div>
  );
};

export default AskGpt;
