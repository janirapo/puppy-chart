import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { DEFAULT_MODAL_STYLE } from "constants/appConstants";

const ModalWindow = ({ handleAccept, handleClose, title, body, closeText, acceptText }) => {
    return (
        <div className="modal-container">
            <ReactModal isOpen={true} style={DEFAULT_MODAL_STYLE} contentLabel={title}>
                {title && (
                    <div className="modal-header">
                        <div className="modal-title">{title}</div>
                    </div>
                )}

                <div className="modal-body">{body}</div>

                <div className="modal-footer">
                    <button onClick={handleClose}>{closeText}</button>
                    <button
                        type="button"
                        onClick={() => {
                            handleAccept();
                            handleClose();
                        }}
                    >
                        {acceptText}
                    </button>
                </div>
            </ReactModal>
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
