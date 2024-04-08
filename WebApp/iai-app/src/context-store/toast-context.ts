import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Toast from "../models/toast-types";

const initialState: { toasts: Toast[] } = {
    toasts: []
}

const toastContext = createSlice({
    name: "toastContext",
    initialState: initialState,
    reducers: {
        notify(state, action: PayloadAction<Toast>) {
            state.toasts.push(action.payload);
        },

        close(state, action: PayloadAction<string>) {
            state.toasts = state.toasts.filter(toast => toast.id != action.payload);
        }
    }
});

export default toastContext;
export const toastActions = toastContext.actions;