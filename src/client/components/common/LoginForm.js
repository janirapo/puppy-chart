import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, required, minLength2, email } from 'utils/reduxFormHelpers';
import { t } from 'utils/i18n';

class LoginForm extends Component {
    render() {
        const { handleSubmit, submitting, pristine, reset, loginError } = this.props;

        return (
            <form className="input-form" onSubmit={handleSubmit}>
                <h3>{t('log_in')}</h3>
                {loginError && <div className="alert-box">{loginError}</div>}
                <Field
                    name="email"
                    type="text"
                    component={renderField}
                    label={t('username')}
                    validate={[required, minLength2, email]}
                />
                <Field
                    name="password"
                    type="password"
                    component={renderField}
                    label={t('password')}
                    validate={[required]}
                />
                <div className="flx flx--column">
                    <button type="submit" className="button button--success" disabled={submitting}>
                        {t('log_in')}
                    </button>
                    <button
                        type="button"
                        className="button button--danger"
                        disabled={pristine || submitting}
                        onClick={reset}
                    >
                        {t('clear_values')}
                    </button>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    loginError: PropTypes.string,
};

LoginForm = reduxForm({
    // a unique name for the form
    form: 'login-form',
})(LoginForm);

export default LoginForm;
