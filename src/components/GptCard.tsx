import { useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { FaMagic } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";

const GptCard = () => {
  const gptValue = useSelector((store: RootState) => store.gpt.gptResult);
  const image_Url = useSelector((store: RootState) => store.image.image_Url);

  return (
    <div className="mt-10 flex justify-between">
      <div>
        <img className="hidden md:block h-[600px] w-[600px] object-cover " src={image_Url} alt="uploaded-image" />
      </div>
      <div className="border-2 rounded-3xl">
        <div className="h-full flex flex-col items-center justify-center p-2">
          {gptValue && (
            <div className="text-8xl">
              <FaBowlFood />
            </div>
          )}
          {gptValue &&
            gptValue.map((value) => {
              return (
                <h2 key={value} className="text-2xl pt-4">
                  {value}
                </h2>
              );
            })}
          {!gptValue && (
            <div className="flex flex-col items-center justify-center h-full text-sm md:text-xl">
              <div className="md:text-6xl text-4xl">
                <FaMagic />
              </div>
              AI Analysis Results
              <p className="text-gray-600">Upload a photo and click analyze to see nutrition details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GptCard;
