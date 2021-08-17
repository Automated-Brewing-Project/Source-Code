import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';
import { Button } from "react-bootstrap";



const ModalPOP = ({ updateProfile }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const update = (e) => {
        e.preventDefault();
        updateProfile(e);
        handleShow();
    }


    return (
        <>
            <Button className="btn-fill pull-right"
                type="submit"
                variant="info" onClick={(e) => { update(e) }}>
                Update Profile
            </Button>

            <Modal
                show={show}
                onHide={handleClose}
            >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter" >Profile Update Log</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your profile is updated!!
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose}>Close</Button>
                </Modal.Footer>

            </Modal>
        </>
    );
}

export default ModalPOP