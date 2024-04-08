export default interface Toast {
    id: string;
    message: string;
    type: ToastType;
    autoClose?: number | boolean;
}

export enum ToastType {
    SUCCESS = 'Success',
    WARNING = 'Warning',
    ERROR = 'Error',
    INFO = 'Notification'
}