import { useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";

const GptCard = () => {
  const gptValue = useSelector((store: RootState) => store.gpt.gptResult);
  const image_Url = useSelector((store: RootState) => store.image.image_Url);

  return (
    <div className="mt-10 flex justify-between">
      <div>
        <img className="hidden md:block h-[600px] w-[600px] object-cover " src={image_Url} alt="uploaded-image" />
      </div>
      <div className="my-16 w-[600px]">
        <h1 className="text-3xl font-bold">Your Meal</h1>
        {gptValue.map((value) => {
          return <h2 key={value} className="text-2xl pt-4">{value}</h2>;
        })}
      </div>
    </div>
  );
};

export default GptCard;
