import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConfirmationModalConfig, GeneralPoupConfig, ModalState, ModalType } from "../models/modal-types";

const initialState: ModalState = {
    showModal: false,
    modalType: null,
    confirmationModalConfig: null,
    response: null,
    generalPopupConfig: null,
    loadingMessage: null
};

const clearState = function (state: ModalState) {
    state.showModal = false;
    state.modalType = null;
    state.confirmationModalConfig = null;
    state.response = null;
    state.generalPopupConfig = null;
    state.loadingMessage = null;
};

const modalContext = createSlice({
    name: "modalContext",
    initialState: initialState,
    reducers: {
        showConfirmation(state: ModalState, action: PayloadAction<ConfirmationModalConfig>) {
            clearState(state);
            state.confirmationModalConfig = action.payload;
            state.modalType = ModalType.CONFIRMATION;
            state.showModal = true;
        },

        respondToConfirmation(state: ModalState, action: PayloadAction<string>) {
            state.response = action.payload;
        },

        showLoader(state, action: PayloadAction<string | undefined>) {
            clearState(state);
            state.modalType = ModalType.SPINNER;
            if (action.payload) {
                state.loadingMessage = action.payload;
            }
            state.showModal = true;
        },

        showPopup(state, action: PayloadAction<GeneralPoupConfig>) {
            clearState(state);
            state.generalPopupConfig = action.payload;
            state.modalType = ModalType.GENERAL;
            state.showModal = true;
        },

        closePopup(state) {
            clearState(state);
        }
    },
});

export default modalContext;
export const modalActions = modalContext.actions;