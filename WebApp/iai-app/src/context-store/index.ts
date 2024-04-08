import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import authContext from "./auth-context";
import menuContext from "./menu-context";
import modalContext from "./modal-context";
import toastContext from "./toast-context";
/**
 * The main store to maintain the following application states.
 * 1. Loggged User Details
 * 2. Project Selection
 * 3. Theme Selection
 */
const store = configureStore({
    reducer: {
        authState: authContext.reducer,
        menuState: menuContext.reducer,
        modalState: modalContext.reducer,
        toastState: toastContext.reducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector = <T>(fn: (state: RootState) => T) =>
    useSelector(fn);
export default store;