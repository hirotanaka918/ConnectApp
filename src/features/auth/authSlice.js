import { createSlice } from "@reduxjs/toolkit";
import { signInHandler, signUpHandler } from "./helpers";
import { toast } from 'react-toastify';

const persistedAuth = JSON.parse(localStorage.getItem("Connect_User") || "null");
const initialState = {
    token: persistedAuth?.token || "",
    userData: persistedAuth?.userData || {},
    isLoading: false,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signOutHandler: (state) => {
            localStorage.removeItem("Connect_User");
            state.token = "";
            state.userData = {};
        },
    },

    extraReducers: {
        [signInHandler.pending]: (state) => {
            state.isLoading = true;
        },
        [signInHandler.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.token = payload.encodedToken;
            state.userData = payload.foundUser;
        },
        [signInHandler.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error("Password does not match!", { position: toast.POSITION.BOTTOM_RIGHT, autoClose: 1000 });
        },

        [signUpHandler.pending]: (state) => {
            state.isLoading = true;
        },
        [signUpHandler.fulfilled]: (state, { payload }) => {
            state.isLoading = false;
            state.token = payload.encodedToken;
            state.userData = payload.createdUser;
        },
        [signUpHandler.rejected]: state => {
            state.isLoading = false;
        },
    },
});

export const { signOutHandler } = authSlice.actions;

export default authSlice.reducer;