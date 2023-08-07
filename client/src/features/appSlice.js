import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    serverURL: "http://localhost:5000",
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setServerURL: (state, action) => {
            state.serverURL = action.payload;
        }
    }
});

export const { setServerURL } = appSlice.actions;

export default appSlice.reducer;