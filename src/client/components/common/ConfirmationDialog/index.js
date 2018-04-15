import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { DEFAULT_MODAL_STYLE } from 'constants/appConstants';

import './ConfirmationDialog.scss';

const ConfirmationDialog = props => {
    const { title, text, hideReject, acceptText, rejectText, onAccept, onReject } = props;

    return (
        <div className="ConfirmationDialog">
            <Modal isOpen={true} style={DEFAULT_MODAL_STYLE} contentLabel={title}>
                <h2>{title}</h2>
                <div>{text}</div>
                {!hideReject && (
                    <button className="btn btn-default btn-danger" onClick={onReject}>
                        {rejectText}
                    </button>
                )}
                <button className="btn btn-default" onClick={onAccept}>
                    {acceptText}
                </button>
            </Modal>
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
};

export default ConfirmationDialog;
