import { Fragment } from "react";
import Toast from "react-bootstrap/Toast";
import { ToastType } from "../../../models/toast-types";
import { JsxElement } from "typescript";
import { useAppSelector, useAppDispatch } from "../../../context-store";
import { toastActions } from "../../../context-store/toast-context";
import styles from "./ToastContainer.module.css";
import './Toast.custom.css';

const ToastContainer = () => {
    const toasts = useAppSelector((state) => state.toastState.toasts);
    let titleCustom = 'titleNotification';
    const dispatch = useAppDispatch();
    const closingHandler = (id: string) => {
        dispatch(toastActions.close(id));
    };

    const attributes: {
        autohide: boolean;
        delay: number;
        className: string;
    } = {
        autohide: false,
        delay: 3000,
        className: 'toastBox',
    };

    const headercss: {
        className: string
    } = {
        className: 'toastHeader toastNotification'
    };

    const bodycss: {
        className: string
    } = {
        className: 'toastBody'
    };

    let content = <Fragment></Fragment>;
    if (toasts && toasts.length > 0) {
        content =
            <div className={styles.toastContainer} >
                {toasts.map((toast) => {
                    if (toast.autoClose) {
                        attributes.autohide = true;
                        if (typeof toast.autoClose === "number") {
                            attributes.delay = toast.autoClose;
                        }
                    }
                    if (toast.type === ToastType.SUCCESS) {
                        headercss.className = 'toastHeader toastSucess';
                        titleCustom = 'titleSucess';
                    }
                    if (toast.type === ToastType.WARNING) {
                        headercss.className = 'toastHeader toastWarning';
                        titleCustom = 'titleWarning';
                    }
                    if (toast.type === ToastType.ERROR) {
                        headercss.className = 'toastHeader toastError';
                        titleCustom = 'titleError';
                    }
                    if (toast.type === ToastType.INFO) {
                        headercss.className = 'toastHeader toastNotification'
                        titleCustom = 'titleNotification';
                    }

                    return (
                        <Toast
                            key={toast.id}
                            onClose={() => closingHandler(toast.id)}
                            animation={false}
                            show={true}
                            {...attributes}
                        >
                            <Toast.Header {...headercss}>
                                <strong className={`mr-auto toastTitle ${titleCustom}`}>{toast.type}</strong>
                            </Toast.Header>
                            <Toast.Body {...bodycss}>{toast.message}</Toast.Body>
                        </Toast>
                    );
                })}
            </div>
    }
    return content;
};
export default ToastContainer;