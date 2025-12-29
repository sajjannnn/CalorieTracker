import { useRef, useState } from "react";
import groq from "../utilis/openai";
import { useDispatch, useSelector } from "react-redux";
import { addGptResult } from "../utilis/gptSlice";
import { setImage } from "../utilis/imageSlice";

const GptSearchBar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const searchText = useRef<HTMLInputElement>(null);
  const uploadedImage = useSelector((store) => store.image.image_Url);

  const getGroqChatCompletion = () => {
    const gptQuery =
      "Act as a fixed value of nutrition value giver system and tell me the meal name at first then nutritions value of protien , carbohydrates, fats , fibre" +
      searchText?.current?.value +
      uploadedImage +
      ". separated by commas like the example resut ahead> Examole result :burger , Protein: 6gm, fats: 2 gm, carbohydrates:3gm,fibre:4gm. strictly give in this format only or only say please provide some info";

    return groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: gptQuery,
        },
      ],
      model: "openai/gpt-oss-20b",
    });
  };

  const handleGptSearchCLick = async () => {
    const chatCompletion = await getGroqChatCompletion();
    //  console.log(chatCompletion.choices[0]?.message?.content || "");
    const gptResult = chatCompletion.choices[0]?.message?.content?.split(",").map((m) => m.trim());

    console.log(gptResult);
    dispatch(addGptResult(gptResult));
  };
  const moreOptions = () => {
    setOpen(!open);
  };
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    dispatch(setImage(previewUrl));

    setOpen(false);
  };

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center">
      <form className="w-full md:w-1/2 bg-green-600 grid grid-cols-12 rounded-3xl p-4 sm:p-6" onSubmit={(e) => e.preventDefault()}>
        <input type="text" className="p-1 sm:p-4 sm:m-4 col-span-9 bg-gray-600 text-white" placeholder="track" ref={searchText} />
        <button className="col-span-3  sm:m-4 py-2 px-4 bg-green-950 text-white sm:rounded-lg" onClick={handleGptSearchCLick}>
          Check Nutrition
        </button>
        <button className="text-white bg-green-950 rounded-2xl text-center" onClick={moreOptions}>
          {" "}
          +{" "}
        </button>

        {open && (
          <div
            className="absolute flex flex-col mt-32
                         rounded-xl bg-green-950
                         p-2 text-white z-50"
          >
            <button>📎 Add photos & files</button>
            <input type="file" accept="image/png,image/jpeg" onChange={handleFile} />
          </div>
        )}
      </form>
    </div>
  );
};

export default GptSearchBar;
