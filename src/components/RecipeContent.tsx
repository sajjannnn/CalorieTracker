import { useSelector } from "react-redux"
import type { RootState } from "../utilis/appStore"

const RecipeContent = () => {
  const content = useSelector((store : RootState) => store.recipe.recipeResult)
  return (
    <div className="">
      {content.map((step:string, index : number) => {
        return <p key={index} className="text-2xl">{step}</p>
      })}
    </div>
  )
}

export default RecipeContent