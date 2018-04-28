import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, required, minLength2, alphaNumeric, renderDateTimePicker } from 'utils/reduxFormHelpers';
import { t } from 'utils/i18n';

let AddPetForm = props => {
    const { handleSubmit, formError } = props;
    return (
        <form onSubmit={handleSubmit}>
            {formError && <span className="alert">{formError}</span>}
            <div>
                <Field
                    name="name"
                    type="text"
                    label={t('pet_name')}
                    component={renderField}
                    validate={[required, minLength2]}
                    warn={alphaNumeric}
                    required
                />
                <Field
                    name="dateOfBirth"
                    label={t('dob')}
                    component={renderDateTimePicker}
                    validate={[required]}
                    required
                />
            </div>
            <button type="submit" className="btn btn-default">
                {t('save')}
            </button>
        </form>
    );
};

AddPetForm.propTypes = {
    formError: PropTypes.string,
};

AddPetForm = reduxForm({
    // a unique name for the form
    form: 'add-pet',
})(AddPetForm);

export default AddPetForm;
