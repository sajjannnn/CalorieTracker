import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../utilis/appStore";
import { FaBowlFood } from "react-icons/fa6";
import { useRef, useState } from "react";
import { setRecipeResult } from "../utilis/recipeSlice";
import ai from "../utilis/openai";

const RecipeContent = () => {
  const content = useSelector((store: RootState) => store.recipe.recipeResult);
  const [isLoading, setIsLoading] = useState(false);
  const searchText = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const getGeminChatCompletion = async () => {
    const recipeQuery = `
Act as an Indian home cooking assistant.

Assume I have all basic ingredients commonly found in an Indian household, such as:
spices (haldi, mirch, dhania, jeera, garam masala, etc.), oil, ghee, atta, rice, dal, salt, sugar, onions, tomatoes, ginger, garlic, basic vegetables, and herbs.

Based on the food item or dish name I provide, suggest ONE suitable dish that can be made using these ingredients.

Give the cooking instructions strictly in the following format:
- Only numbered steps
- No headings, no extra explanations, no ingredients list
- Each step should be one clear action only

Output format example:
1. Heat oil in a pan.
2. Add chopped onions and sauté until golden.
3. Add spices and mix well.
4. Add vegetables and cook for 10 minutes.
5. Serve hot.

If the dish cannot be made with common Indian household ingredients, respond only with:
Cannot prepare with available ingredients.

User input: ${searchText.current?.value || ""}
`;
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: recipeQuery,
    });
    return result;
  };

  const handleReuslt = async () => {
    // if (isLoading) return;
     dispatch(setRecipeResult(""));

    setIsLoading(true);
    const result = await getGeminChatCompletion();
    const finalOutput = result?.candidates?.[0]?.content?.parts?.[0]?.text?.split("\n") || "Request Failed,try again";

    dispatch(setRecipeResult(finalOutput));

    console.log(finalOutput);
    setIsLoading(false);
    searchText!.current!.value = "";
  };
  return (
    <div className=" md:grid grid-cols-2 gap-4 ">
      <div className="text-white col-span-1">
        <div className="border-round w-card p-4 py-4 bg-white">
          <div className="text-black text-3xl font-bold py-6">Your Ingredients</div>
          <input type="text" className="w-full " placeholder="Add ingredients..." ref={searchText} />

          <div className="text-gray-600 py-3 mb-8"> Type available ingredients to generate a recipe...</div>
        </div>
        <button className="mt-4 w-full w-card disabled:opacity-40" onClick={handleReuslt} disabled={isLoading}>
          {isLoading ? "Analyzing..." : "Generate Healthy Recipe"}
        </button>
      </div>
      <div className="border-round bg-white w-card col-span-1">
        <div className="flex flex-col h-full p-4 justify-center  items-center text-center ">
          <p className="text-8xl flex justify-center">
            <FaBowlFood className="text-gray-900" />
          </p>
          {!content && !isLoading && (
            <div>
              <div className="font-bold ">Your Recipe Will Appear Here</div>
              <p className="text-gray-600">Add at least one ingredient and click generate</p>
            </div>
          )}
          {isLoading && (
            <div className="animate-pulse">
              <div className="space-y-4">
                {[1, 2, 3, 4].map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 w-[300px] bg-gray-200 rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {content && 
            content.map((step: string, index: number) => {
              return (
                <p key={index} className="ml-4 w-full text-start text-sm">
                  {step}
                </p>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default RecipeContent;
