import { useRef, useState } from "react";
import ai from "../utilis/openai";
import { useDispatch, useSelector } from "react-redux";
import { addGptResult } from "../utilis/gptSlice";
import { setImage } from "../utilis/imageSlice";
import type { RootState } from "../utilis/appStore";
import { FaCameraRetro } from "react-icons/fa";

const GptSearchBar = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const searchText = useRef<HTMLInputElement>(null);
  const uploadedImageBase64 = useSelector((store: RootState) => store.image.image_Base64);
  const username = useSelector((store: RootState) => store.user?.displayName)

  const getGroqChatCompletion = async () => {
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
`;

    try {
      if (!uploadedImageBase64) {
        // Text-only request
        const result = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: gptQuery,
        });
        return result;
      }

      // Image + text request
      // Extract base64 data (remove data:image/...;base64, prefix if present)
      const base64Data = uploadedImageBase64.includes(",") ? uploadedImageBase64.split(",")[1] : uploadedImageBase64;

      // Determine MIME type from the base64 string
      let mimeType: "image/jpeg" | "image/png" = "image/jpeg";
      if (uploadedImageBase64.includes("data:image/png")) {
        mimeType = "image/png";
      } else if (uploadedImageBase64.includes("data:image/jpeg") || uploadedImageBase64.includes("data:image/jpg")) {
        mimeType = "image/jpeg";
      }

      const result = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { text: gptQuery },
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
        ],
      });

      return result;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      throw error;
    }
  };

  const handleGptSearchCLick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const chatCompletion = await getGroqChatCompletion();
      const responseText = chatCompletion.text || "Request Failed";
      const gptResult = responseText.split(",").map((m: string) => m.trim());

      dispatch(addGptResult(gptResult));
    } catch (error) {
      console.error("Error processing request:", error);
      dispatch(addGptResult(["Error: Failed to analyze. Please try again."]));
    } finally {
      setIsLoading(false);
    }
  };

  const moreOptions = () => {
    setOpen(!open);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create preview URL for display
    const previewUrl = URL.createObjectURL(file);

    // Convert file to base64 for API
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      dispatch(
        setImage({
          previewUrl: previewUrl,
          base64: base64String,
        })
      );
    };
    reader.onerror = () => {
      console.error("Error reading file");
    };
    reader.readAsDataURL(file);

    setOpen(false);
  };

  return (
    <div className="flex flex-col font-bold items-center text-2xl  ">
      <h1 className="md:mb-[20px] font-bold text-2xl w-full md:text-5xl">Welcome {username}!</h1>
      <p className="flex text-3xl justify-center"><FaCameraRetro />Analyze Food</p>
      <form className="max-w-5xl flex justify-between px-4 m-8 text-sm border border-gray-300 rounded-3xl py-4 bg-white" onSubmit={(e) => e.preventDefault()}>
       
        <button className="text-gray-400 bg-[#f7f7ec] text-center px-4 rounded-2xl text-2xl" onClick={moreOptions}>
          +
        </button>
         {open && (
          <div  className="absolute mt-10 -ml-3 border-gray-300 border-2 rounded bg-black z-50">
            <input className="text-gray-500 bg-[#f8f7f3]" type="file" accept="image/png,image/jpeg" onChange={handleFile} />
          </div>
        )}
        <input type="text" className="p-4 bg-[#f8f7f3] border-gray-300 lg:w-[600px] mx-2 rounded-2xl " placeholder="Check Food Nutritions" ref={searchText} />
        <button className="py-2 px-4 bg-green-500 hover:bg-green-400 text-white rounded-2xl md:text-2xl" onClick={handleGptSearchCLick} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Check Nutrition"}
        </button>
      </form>
      
    </div>
  );
};

export default GptSearchBar;
