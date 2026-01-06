import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import gptReducer from "./gptSlice"
import imageReducer from "./imageSlice"
import activePageReducer from "./activePage"
import recipeReducer from "./recipeSlice"
import mealReducer from "./mealSlice"

const appStore = configureStore({
    reducer : {
        user : userReducer,
        gpt : gptReducer,
        image : imageReducer,
        activePage : activePageReducer,
        recipe : recipeReducer,
        meal : mealReducer,


    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;