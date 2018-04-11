import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ModalWindow = ({ handleAccept, handleClose, title, body, closeText, acceptText }) => {
    return (
        <div className="modal-backdrop">
            <Modal show={true} onHide={handleClose} backdrop={false}>
                {title && (
                    <Modal.Header>
                        <Modal.Title>{title}</Modal.Title>
                    </Modal.Header>
                )}

                <Modal.Body>{body}</Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleClose}>{closeText}</Button>
                    <Button
                        onClick={() => {
                            handleAccept();
                            handleClose();
                        }}
                        bsStyle="primary"
                    >
                        {acceptText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

ModalWindow.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleAccept: PropTypes.func.isRequired,
    acceptText: PropTypes.string.isRequired,
    closeText: PropTypes.string.isRequired,
    title: PropTypes.string,
    body: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export default ModalWindow;
