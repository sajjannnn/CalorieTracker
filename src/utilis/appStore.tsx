import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"
import gptReducer from "./gptSlice"
import imageReducer from "./imageSlice"


const appStore = configureStore({
    reducer : {
        user : userReducer,
        gpt : gptReducer,
        image : imageReducer,

    },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

export default appStore;