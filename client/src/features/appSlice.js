import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    serverURL: "http://localhost:8000",
    user: null,
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setServerURL: (state, action) => {
            state.serverURL = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { 
    setServerURL,
    setUser 
} = appSlice.actions;

export default appSlice.reducer;