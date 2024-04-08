import { ConfirmationModalConfig, GeneralPoupConfig } from "../models/modal-types";
import store, { AppDispatch, RootState } from "../context-store";
import { modalActions } from "../context-store/modal-context";

class ModalUtils {
    constructor() {
    }

    async showConfirmation(config: ConfirmationModalConfig, onConfirm: (response: string) => void) {
        const response: string = await store.dispatch(showConfirmationThunkAction(config));
        onConfirm(response);
    }

    showLoader(message?: string) {
        if (message) {
            store.dispatch(modalActions.showLoader(message));
        } else {
            store.dispatch(modalActions.showLoader());
        }
    }

    showPopup(config: GeneralPoupConfig) {
        store.dispatch(modalActions.showPopup(config));
    }

    closeModal() {
        store.dispatch(modalActions.closePopup());
    }
}

const showConfirmationThunkAction = (config: ConfirmationModalConfig) => {
    return async (dispatch: AppDispatch) => {
        dispatch(modalActions.showConfirmation(config));
        return new Promise<string>(resolve => {
            const unsubscribe = store.subscribe(() => {
                const state: RootState = store.getState();
                if (state.modalState.response) {
                    unsubscribe();
                    dispatch(modalActions.closePopup());
                    resolve(state.modalState.response);
                }
            });
        });
    };
};
const modalUtils = new ModalUtils();
export default modalUtils;