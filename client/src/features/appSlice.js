import { createSlice } from "@reduxjs/toolkit";

 
const initialState = {
    user: null,
    loggedOut: true,
    token: localStorage.getItem("token"),
};

// const token = localStorage.getItem("token");

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setServerURL: (state, action) => {
            state.serverURL = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            if (state.user !== null) {
                state.loggedOut = false;
            }
        },
        setLoggedOut: (state, action) => {
            state.loggedOut = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }

    },
    // extraReducers: {
        // get token form local storage

});

export const { 
    setServerURL,
    setUser,
    setLoggedOut,
    setToken
} = appSlice.actions;

export default appSlice.reducer;