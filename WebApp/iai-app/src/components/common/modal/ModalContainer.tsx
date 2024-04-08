import { useAppSelector } from "../../../context-store";
import { ModalType } from "../../../models/modal-types";
import ConfirmationModal from "./ConfirmationModal";
import GeneralPopup from "./GeneralPopup";
import Loader from "./Loader";

const ModalContainer = () => {
    const modalState = useAppSelector((state) => state.modalState);
    if (!modalState.showModal) {
        return null;
    }

    if (modalState.modalType === ModalType.CONFIRMATION && modalState.confirmationModalConfig) {
        return <ConfirmationModal {...modalState.confirmationModalConfig} />
    }

    if (modalState.modalType === ModalType.GENERAL && modalState.generalPopupConfig) {
        return <GeneralPopup {...modalState.generalPopupConfig} />
    }

    if (modalState.modalType === ModalType.SPINNER) {
        if (modalState.loadingMessage) {
            return <Loader message={modalState.loadingMessage} />
        }
        return <Loader />;
    }
    return null;
};
export default ModalContainer;