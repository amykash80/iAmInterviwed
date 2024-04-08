import { ReactNode } from "react";

export enum ModalType {
    CONFIRMATION,
    SPINNER,
    GENERAL,
}

export enum ModalSize {
    XL = "xl",
    SM = "sm",
    LG = "lg",
    MD = "md",
}

export interface ModalState {
    showModal: boolean;
    modalType: ModalType | null;
    confirmationModalConfig: ConfirmationModalConfig | null;
    response: string | null;
    generalPopupConfig: GeneralPoupConfig | null;
    loadingMessage: string | null;
}

export interface ConfirmationModalConfig {
    title?: string;
    message: string;
    buttons?: string[];
}

export interface GeneralPoupConfig {
    content: ReactNode;
    title?: string;
    size?: string;
    className?: string;
}