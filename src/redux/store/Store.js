import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../slices/userSlice.js";
import menuReducer from "../slices/menuSlice.js"

const store = configureStore({
    reducer: {
        user: userReducer,
        menu : menuReducer
    }
});

export default store;

