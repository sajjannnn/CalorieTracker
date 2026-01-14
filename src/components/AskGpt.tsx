import GptCard from "./GptCard";
import GptSearchBar from "./GptSearchBar";

const AskGpt = () => {
  return (
    <div className="m-header w-screen flex justify-center bg-[#f8f7f3] h-screen">
      <div className="w-screen lg:w-7xl">
        <div>
        <GptSearchBar />
      </div>
      <div className="mx-16 ">
      <GptCard />
      </div>
        </div>

    </div>
  );
};

export default AskGpt;
