import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, required, minLength2, alphaNumeric, renderDateTimePicker } from 'utils/reduxFormHelpers';

let AddPetForm = props => {
    const { handleSubmit, formError } = props;
    return (
        <form onSubmit={handleSubmit}>
            {formError && <span className="alert">{formError}</span>}
            <div>
                <Field
                    name="name"
                    type="text"
                    label="Pet name"
                    component={renderField}
                    validate={[required, minLength2]}
                    warn={alphaNumeric}
                />
                <Field
                    name="dateOfBirth"
                    label="Date of birth"
                    component={renderDateTimePicker}
                    validate={[required]}
                    showTime={false}
                />
            </div>
            <button type="submit" className="btn btn-default">
                Submit
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
