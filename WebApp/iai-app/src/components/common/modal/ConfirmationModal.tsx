import { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { ConfirmationModalConfig } from "../../../models/modal-types";
import "./ConfirmationModal.css";
import { useAppDispatch } from "../../../context-store";
import { modalActions } from "../../../context-store/modal-context";

const ConfirmationModal = function (props: ConfirmationModalConfig) {
    const dispatch = useAppDispatch();
    const buttons = props.buttons ? props.buttons : ["Yes", "No"];
    const [show, setShow] = useState(true);
    const handleClose = () => {
        setShow(false);
        dispatch(modalActions.respondToConfirmation("No"));
    }

    const actionHandler = (response: string) => {
        dispatch(modalActions.respondToConfirmation(response));
    };

    useEffect(() => {
        setShow(true);
    }, [props]);
       
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header className="modalHeader" closeButton >
                    {props.title && <Modal.Title>{props.title}</Modal.Title>}
                </Modal.Header>
                <Modal.Body>{props.message}</Modal.Body>
                <Modal.Footer>
                    {buttons.map((btnLabel) => (
                        <Button key={btnLabel}
                            onClick={() => {
                                actionHandler(btnLabel);
                            }}
                        >
                            {btnLabel}
                        </Button>
                    ))}
                </Modal.Footer>
            </Modal>
        </div>
    );
};
export default ConfirmationModal;