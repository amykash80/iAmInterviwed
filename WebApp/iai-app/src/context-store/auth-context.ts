import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AuthState from "../models/authentication/AuthState";
import AuthResponse from "../models/authentication/AuthResponse";
import User from "../models/User";

const initialAuthState: AuthState = {
    authenticated: false,
    loggedInUser: null,
    userLoaded: false
};

const authContext = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
        login(state, action: PayloadAction<AuthResponse>) {
            state.userLoaded = true;
            if (action.payload.user) {
                state.authenticated = true;
                state.loggedInUser = action.payload.user;
            } else {
                state.authenticated = false;
                state.loggedInUser = null;
            }
        },
        fetchUser(state, action: PayloadAction<User>) {
            state.loggedInUser = action.payload;
            state.userLoaded = true;
            state.authenticated = true;
        },
        changeLoadStatus(state, action: PayloadAction<boolean>) {
            state.userLoaded = action.payload;
        },

        logout(state) {
            state.authenticated = false;
            state.loggedInUser = null;
        },
    },
});
export const authActions = authContext.actions;
export default authContext;