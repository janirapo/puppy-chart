import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { renderField, required, minLength2, email } from 'utils/reduxFormHelpers';

class LoginForm extends Component {
    render() {
        const { handleSubmit, submitting, pristine, reset, loginError } = this.props;

        return (
            <form onSubmit={handleSubmit}>
                {loginError && <span className="alert">{loginError}</span>}
                <Field
                    name="email"
                    type="text"
                    component={renderField}
                    label="Username"
                    validate={[required, minLength2, email]}
                />
                <Field name="password" type="password" component={renderField} label="Password" validate={[required]} />
                <div>
                    <button type="submit" disabled={submitting}>
                        Log in
                    </button>
                    <button type="button" disabled={pristine || submitting} onClick={reset}>
                        Clear Values
                    </button>
                </div>
            </form>
        );
    }
}

LoginForm.propTypes = {
    loginError: PropTypes.string,
};

LoginForm = reduxForm({
    // a unique name for the form
    form: 'login-form',
})(LoginForm);

export default LoginForm;
