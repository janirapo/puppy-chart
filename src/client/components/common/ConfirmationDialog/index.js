import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';
import { DEFAULT_MODAL_STYLE } from 'constants/appConstants';

import './ConfirmationDialog.scss';

const ConfirmationDialog = props => {
    const { title, text, hideReject, acceptText, rejectText, onAccept, onReject, handleClose } = props;

    const handleAccept = () => {
        onAccept && onAccept();
        handleClose && handleClose();
    };
    const handleReject = () => {
        onReject && onReject();
        handleClose && handleClose();
    };

    return (
        <div className="ConfirmationDialog">
            <ReactModal isOpen={true} style={DEFAULT_MODAL_STYLE} contentLabel={title}>
                <div className="ConfirmationDialog__title">{title}</div>
                <div className="ConfirmationDialog__text">{text}</div>
                <div className="ConfirmationDialog__actions">
                    {!hideReject && (
                        <button type="button" className="button button--danger" onClick={handleReject}>
                            {rejectText}
                        </button>
                    )}
                    <button type="button" className="button button--success" onClick={handleAccept}>
                        {acceptText}
                    </button>
                </div>
            </ReactModal>
        </div>
    );
};

ConfirmationDialog.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    hideReject: PropTypes.bool,
    acceptText: PropTypes.string.isRequired,
    rejectText: PropTypes.string,
    onAccept: PropTypes.func.isRequired,
    onReject: PropTypes.func,
    handleClose: PropTypes.func.isRequired,
};

export default ConfirmationDialog;
