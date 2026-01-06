import { useRef, useState } from "react";
import ai from "../utilis/openai";
import { useDispatch } from "react-redux";
import { setRecipeResult } from "../utilis/recipeSlice";


const RecipeInputBar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchText = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch()

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
    if (isLoading) return;

    setIsLoading(true);
    const result = await getGeminChatCompletion()
    const finalOutput = result?.candidates?.[0]?.content?.parts?.[0]?.text?.split("\n") || "Request Failed,try again";

    dispatch(setRecipeResult(finalOutput))

    console.log(finalOutput);
    setIsLoading(false);
    searchText!.current!.value = "";

  };
  return (
    <div className="text-white mb-15 ">
      <div className=" rounded-4xl p-4 py-8 border-2  border-black">

        <div>
          <div className="text-black text-3xl font-bold py-6">Your Ingredients</div>
        <input type="text" className="p-2 md:p-4 bg-gray-700 w-full py-6 rounded-3xl" placeholder="Add ingredients..." ref={searchText} />
       
        <div className="text-gray-600 py-3 mb-8"> Start adding ingredients to generate a recipe...</div>
        </div>

      </div>
       <button className="p-2 md:py-4 md:px-6 bg-black rounded-3xl text-2xl my-6 w-full " onClick={handleReuslt} disabled={isLoading}>
            {isLoading ? "Analyzing" : "Generate Healthy Recipe"}
        </button>
    </div>
  );
};

export default RecipeInputBar;
