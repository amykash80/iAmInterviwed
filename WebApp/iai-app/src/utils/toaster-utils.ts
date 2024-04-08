import Toast, { ToastType } from "../models/toast-types";
import store from "../context-store";
import { toastActions } from "../context-store/toast-context";


class ToasterUtils {
    showSuccess(message: string, autoClose?: number | boolean) {
        const toast: Toast = this.prepareToast(message, ToastType.SUCCESS, autoClose);
        store.dispatch(toastActions.notify(toast));
    }

    showError(message: string, autoClose?: number | boolean) {
        const toast: Toast = this.prepareToast(message, ToastType.ERROR, autoClose);
        store.dispatch(toastActions.notify(toast));
    }

    showWarning(message: string, autoClose?: number | boolean) {
        const toast: Toast = this.prepareToast(message, ToastType.WARNING, autoClose);
        store.dispatch(toastActions.notify(toast));
    }

    private prepareToast(message: string, toastType: ToastType, autoClose: number | boolean | undefined): Toast {
        return {
            id: this.generateUUID(),
            message: message,
            type: toastType,
            autoClose: autoClose ? autoClose : true,
        };
    }

    private generateUUID(): string {
        const array = new Uint32Array(10);
        window.crypto.getRandomValues(array);
        return array[0] + '';
    }
}
const toasterUtils = new ToasterUtils();
export default toasterUtils;