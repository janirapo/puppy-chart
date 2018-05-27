import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, required, minLength2, alphaNumeric, renderDateTimePicker, date } from 'utils/reduxFormHelpers';
import { t } from 'utils/i18n';

let AddPetForm = props => {
    const { handleSubmit, formError, handleCloseModal } = props;
    return (
        <form className="input-form" onSubmit={handleSubmit}>
            {formError && <span className="alert">{formError}</span>}
            <div className="input-form__inputs">
                <Field
                    name="name"
                    type="text"
                    placeholder={t('pet_name')}
                    label={t('pet_name')}
                    component={renderField}
                    validate={[required, minLength2]}
                    warn={alphaNumeric}
                    required
                />
                <Field
                    name="dateOfBirth"
                    label={t('dob')}
                    placeholder={t('dob')}
                    component={renderDateTimePicker}
                    validate={[required, date]}
                    warn={date}
                    required
                />
            </div>
            <div className="input-form__actions">
                <button type="button" className="button button--danger" onClick={handleCloseModal}>
                    {t('cancel')}
                </button>
                <button type="submit" className="button button--success">
                    {t('save')}
                </button>
            </div>
        </form>
    );
};

AddPetForm.propTypes = {
    formError: PropTypes.string,
    handleCloseModal: PropTypes.func.isRequired,
};

AddPetForm = reduxForm({
    // a unique name for the form
    form: 'add-pet',
})(AddPetForm);

export default AddPetForm;
