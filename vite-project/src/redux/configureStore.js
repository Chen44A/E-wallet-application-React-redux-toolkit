import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "./cardSlice"
import themeSlice from "./themeSlice"

const store = configureStore({
    reducer: {
        cardReducer: cardSlice,
        themeReducer: themeSlice
    }
})

export default store;