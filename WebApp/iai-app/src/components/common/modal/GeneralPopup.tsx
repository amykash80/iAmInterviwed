import React from "react";
import { GeneralPoupConfig } from "../../../models/modal-types";
import { Modal } from "react-bootstrap";
import modalUtil from "../../../utils/modal-utils";
import { ModalSize } from "../../../models/modal-types";

const GeneralPopup = (props: GeneralPoupConfig) => {
    const modalCss: {
        size: any
        className: any
    } = {
        size: props.size ? props.size : '',
        className: props.className
    };

    return (
        <Modal  {...modalCss} show={true} backdrop="static" onHide={modalUtil.closeModal}>
            <Modal.Header className="modalHeader" closeButton>
                {props.title && <Modal.Title>{props.title}</Modal.Title>}
            </Modal.Header>
            <Modal.Body>{props.content}</Modal.Body>
        </Modal>
    );
};
export default GeneralPopup;