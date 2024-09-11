import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userData: null
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.userData = action.payload;
        },
        clearUser: (state) => {
            state.userData = null;
        }
    }
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;