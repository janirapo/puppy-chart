import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, required, minLength2, email } from 'utils/reduxFormHelpers';
import { t } from 'utils/i18n';

class RegisterForm extends Component {
    render() {
        const { handleSubmit, submitting, onCancel, formError } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                {formError && <div className="alert-box">{formError}</div>}
                <Field
                    name="email"
                    type="text"
                    component={renderField}
                    label={t('username')}
                    validate={[required, minLength2, email]}
                    autocomplete="off"
                />
                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label={t('password')}
                    validate={[required]}
                    autocomplete="off"
                />
                <Field
                    name="confirmPassword"
                    type="password"
                    component={renderField}
                    label={t('re_type_password')}
                    validate={[required]}
                    autocomplete="off"
                />
                <div className="flx flx--row flx--space-between">
                    <button
                        type="button"
                        className="button button--danger"
                        onClick={onCancel}
                    >
                        {t('clear_values')}
                    </button>
                    <button type="submit" className="button button--success" disabled={submitting}>
                        {t('register')}
                    </button>

                </div>
            </form>
        );
    }
}

RegisterForm.propTypes = {
    formError: PropTypes.string,
};

RegisterForm = reduxForm({
    // a unique name for the form
    form: 'register-form',
})(RegisterForm);

export default RegisterForm;
