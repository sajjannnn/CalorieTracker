import { useSelector } from "react-redux";

const GptCard = () => {
  const gptValue = useSelector((store) => store.gpt.gptResult);
  const image_Url = useSelector((store) => store.image.image_Url);

  return (
    <div className="p-32 flex justify-evenly">
      <div>
        <img className="h-[600px] w-[600px] object-cover " src={image_Url} alt="uploaded-image" />
      </div>
      <div className="my-16 w-[600px]">
        <h1 className="text-3xl font-bold">Your Meal</h1>
        {gptValue.map((value) => {
          return <h2 key={value}>{value}</h2>;
        })}
      </div>
    </div>
  );
};

export default GptCard;
