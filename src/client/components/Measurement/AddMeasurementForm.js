import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, required, number, renderDateTimePicker, date } from 'utils/reduxFormHelpers';
import { t } from 'utils/i18n';

let AddMeasurementForm = props => {
    const { handleSubmit, formError, onCancel, unit } = props;
    return (
        <form className="input-form" onSubmit={handleSubmit}>
            {formError && <span className="alert">{formError}</span>}
            <div className="input-form__inputs">
                <Field
                    name="value"
                    type="number"
                    placeholder={t('value')}
                    label={`${t('value')} (${unit})`}
                    component={renderField}
                    validate={[required, number]}
                    required
                />
                <Field
                    name="measurementDate"
                    label={t('date')}
                    placeholder={t('date')}
                    defaultValue={new Date()}
                    component={renderDateTimePicker}
                    validate={[required, date]}
                    warn={date}
                    required
                />
            </div>
            <div className="input-form__actions">
                <button type="button" className="button button--danger" onClick={onCancel}>
                    {t('cancel')}
                </button>
                <button type="submit" className="button button--success">
                    {t('save')}
                </button>
            </div>
        </form>
    );
};

AddMeasurementForm.propTypes = {
    formError: PropTypes.string,
    onCancel: PropTypes.func.isRequired,
    unit: PropTypes.string.isRequired,
};

AddMeasurementForm = reduxForm({
    // a unique name for the form
    form: 'add-measurement',
    initialValues: { measurementDate: new Date() },
    enableReinitialize: true,
})(AddMeasurementForm);

export default AddMeasurementForm;
