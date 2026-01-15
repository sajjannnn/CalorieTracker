import GptCard from "./GptCard";
import { FaCameraRetro } from "react-icons/fa";

const AskGpt = () => {
  return (
    <div className="m-header w-screen flex justify-center bg-[#f8f7f3] h-screen">
      <div className="">
        <h1>
          <FaCameraRetro />
          Analyze Food
        </h1>
        <p className="m-down text-center">Upload a photo of your meal to instantly get calorie and nutrition info.</p>
        <div>
          <GptCard />
        </div>
      </div>
    </div>
  );
};

export default AskGpt;
