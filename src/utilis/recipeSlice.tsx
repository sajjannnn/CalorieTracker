import { createSlice } from "@reduxjs/toolkit";

const recipeSlice = createSlice({
    name: "recipe",
    initialState: {
        recipeItems : null,
        recipeResult : []
    },
    reducers : {
        setRecipeItems(state, actions){
            state.recipeItems = actions.payload;     
        },
        setRecipeResult(state, actions){
            state.recipeResult = actions.payload;
        }        
    },
});
export const { setRecipeItems, setRecipeResult } = recipeSlice.actions;
export default recipeSlice.reducer;