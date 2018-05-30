import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, required, minLength2, email, minLength5 } from 'utils/reduxFormHelpers';
import { t } from 'utils/i18n';

class RegisterForm extends Component {
    render() {
        const { handleSubmit, submitting, onCancel, error, formError } = this.props;

        return (
            <form className="input-form" onSubmit={handleSubmit} autoComplete="off">
                <h3>{t('register_new_user')}</h3>
                {(error || formError) && <div className="alert-box">{error || formError}</div>}
                <Field
                    name="name"
                    type="text"
                    component={renderField}
                    label={t('name')}
                    validate={[required, minLength2]}
                    autoComplete="off"
                />
                <Field
                    name="email"
                    type="text"
                    component={renderField}
                    label={t('username')}
                    validate={[required, minLength2, email]}
                    autoComplete="off"
                />
                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label={t('password')}
                    validate={[required, minLength5]}
                    autoComplete="off"
                />
                <Field
                    name="confirmPassword"
                    type="password"
                    component={renderField}
                    label={t('re_type_password')}
                    validate={[required, minLength5]}
                    autoComplete="off"
                />
                <div className="input-form__actions">
                    <button type="button" className="button button--danger" onClick={onCancel}>
                        {t('cancel')}
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
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    formError: PropTypes.string,
};

RegisterForm = reduxForm({
    // a unique name for the form
    form: 'register-form',
})(RegisterForm);

export default RegisterForm;
