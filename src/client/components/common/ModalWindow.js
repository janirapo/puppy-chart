import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { DEFAULT_MODAL_STYLE } from 'constants/appConstants';

import './ModalWindow.scss';

const ModalWindow = ({ handleAccept, handleClose, title, body, closeText, acceptText }) => {
    const showFooter = handleAccept || handleClose || closeText || acceptText;

    return (
        <div className="modal">
            <ReactModal isOpen={true} style={DEFAULT_MODAL_STYLE} contentLabel={title}>
                {title && (
                    <div className="modal__header">
                        <div className="header__title">{title}</div>
                    </div>
                )}

                <div className="modal__body">{body}</div>

                {showFooter && (
                    <div className="modal__footer">
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
                )}
            </ReactModal>
        </div>
    );
};

ModalWindow.propTypes = {
    handleClose: PropTypes.func,
    handleAccept: PropTypes.func,
    acceptText: PropTypes.string,
    closeText: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
};

export default ModalWindow;
