import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { FaMagic } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { GoUpload } from "react-icons/go";
import { setImage } from "../utilis/imageSlice";
import { useRef, useState } from "react";
import AiAnalysisShimmer from "./Shimmer";
import { addGptResult } from "../utilis/gptSlice";
import ai from "../utilis/openai";

const GptCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchText = useRef<HTMLInputElement>(null);
  const uploadedImageBase64 = useSelector((store: RootState) => store.image.image_Base64);

  const gptValue = useSelector((store: RootState) => store.gpt.gptResult);
  const image_Url = useSelector((store: RootState) => store.image.image_Url);
  const dispatch = useDispatch();
  const fileRef = useRef<HTMLInputElement | null>(null);

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
  };

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
<meal_name>, Calories: <value>kcal,Protein: <value>gm, Fats: <value>gm, Carbohydrates: <value>gm, Fibre: <value>gm

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
    
    console.log("clicked")
     dispatch(addGptResult(""));

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

  return (
    <div className="mt-10 flex gap-4 ">
      <div>
        <div onClick={() => fileRef.current?.click()} className={image_Url ? "hidden" : "h-[330px] w-[330px] flex flex-col justify-center items-center border-round border-dotted hover:border-green-400"}>
          <GoUpload className="text-6xl text-green-400 rounded-3xl p-2 bg-green-100 " />
          <h2>Drop your food photo here</h2>
          <p>or click to browse from your device</p>
        </div>
        <img className={image_Url ? "  h-[330px] w-[330px] object-cover " : "hidden"} src={image_Url} alt="uploaded-image" />
        <input className="text-gray-500 bg-[#f8f7f3] hidden" ref={fileRef} type="file" accept="image/png,image/jpeg" onChange={handleFile} />
        <div className="mt-4 ">
          <form className="border-none w-[330px] flex flex-col mx-auto gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Additional Details" ref={searchText} />
            <button onClick={handleGptSearchCLick} disabled={isLoading} className="disabled:opacity-25 hover:bg-green-500">
              {isLoading ? "Analyzing..." : "Analyze"}
            </button>
          </form>
        </div>
      </div>
      <div className="border-2 border-gray-200 rounded-3xl colour">
        <div className="h-full flex flex-col items-center justify-center p-2 w-[330px]">
          {gptValue && (
            <div className="text-8xl">
              <FaBowlFood />
            </div>
          )}
          {gptValue &&
            gptValue.map((value) => {
              return (
                <p key={value} className=" pt-4">
                  {value}
                </p>
              );
            })}
          {!gptValue && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-sm md:text-xl w-[330px]">
              <div className="md:text-6xl text-4xl">
                <FaMagic className="bg-[#e5e5e5] p-2 rounded-2xl" />
              </div>
              AI Analysis Results
              <p className="text-gray-600 text-lg text-center">Upload a photo and click analyze to see nutrition details</p>
            </div>
          )}
          {!gptValue && isLoading && <AiAnalysisShimmer />}
        </div>
      </div>
    </div>
  );
};

export default GptCard;
