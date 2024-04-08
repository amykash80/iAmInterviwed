import { Modal } from "react-bootstrap";

const Loader = ({ message }: { message?: string }) => {
    const content = message ? message : "Loading...";
    return (
        <Modal show={true} size="sm" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Body>
                <h4>{content}</h4>
            </Modal.Body>
        </Modal>
    );
};
export default Loader;