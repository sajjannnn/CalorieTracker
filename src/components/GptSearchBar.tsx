import { useRef, useState } from "react";
import  ai from "../utilis/openai";
import { useDispatch, useSelector } from "react-redux";
import { addGptResult } from "../utilis/gptSlice";
import { setImage } from "../utilis/imageSlice";

const GptSearchBar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const searchText = useRef<HTMLInputElement>(null);
  const uploadedImage = useSelector((store) => store.image.image_Url);
  const user = useSelector((store) => store.user);

  


  const getGroqChatCompletion = () => {
    const gptQuery = `
You are a nutrition analysis system.

TASK:
1. If an image is provided, analyze ONLY the food visible in the image.
2. Identify the meal name first.
3. Then provide estimated nutrition values.

RULES:
- Use the image as the primary source if present.
- If image is NOT provided, ignore image analysis and use text input only.
- If neither image nor text gives enough information, reply EXACTLY:
  "please provide some info"
- Do NOT add explanations, assumptions, or extra text.
- Follow the format strictly.

OUTPUT FORMAT (single line, comma separated):
<meal_name>, Protein: <value>gm, Fats: <value>gm, Carbohydrates: <value>gm, Fibre: <value>gm

INPUT:
Text: ${searchText?.current?.value || "none"}
Image: ${uploadedImage || "not_present"}
`;

       if (!uploadedImage) {
      return ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: gptQuery,
      });
    }

    /* vision */
    return ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { type: "text", text: gptQuery },
        {
          type: "image",
          imageBytes: uploadedImage.split(",")[1], // remove base64 header
        },
      ],
    });
  };

  const handleGptSearchCLick = async () => {
    const chatCompletion = await getGroqChatCompletion();
    //  console.log(chatCompletion.choices[0]?.message?.content || "");
    const gptResult = chatCompletion.response.text().split(",").map((m) => m.trim());

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
    <div className="pt-[10%] flex flex-col text-white font-bold text-2xl">
      <h1 className="text-black font-bold text-7xl">Welcome {user?.displayName}!</h1>
      <form className="flex justify-center m-8" onSubmit={(e) => e.preventDefault()}>
        {" "}
        <button className="text-white bg-gray-800 text-center p-4" onClick={moreOptions}>
          +
        </button>
        <input type="text" className="p-4 bg-gray-700 w-[600px]" placeholder="Check Food Nutritions" ref={searchText} />
        <button className="py-2 px-4 bg-black" onClick={handleGptSearchCLick}>
          Check Nutrition
        </button>
        {open && (
          <div
            className="absolute flex flex-col mt-32
                         rounded-xl bg-black
                         p-2 z-50"
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
