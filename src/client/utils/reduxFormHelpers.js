import React from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
// Include the locale utils designed for moment
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import i18n, { t } from 'utils/i18n';

// Make sure moment.js has the required locale data
import 'moment/locale/fi';
import 'react-day-picker/lib/style.css';

/****** Form validators *******/
export const required = value => (value ? undefined : t('required'));
export const maxLength = max => value =>
    value && value.length > max ? t('max_characters', { max: max}) : undefined;
export const maxLength15 = maxLength(15);
export const minLength = min => value =>
    value && value.length < min ? t('min_characters', { min: min}) : undefined;
export const minLength2 = minLength(2);
export const number = value => (value && isNaN(Number(value)) ? t('validate_number') : undefined);
export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? t('invalid_email') : undefined;
export const alphaNumeric = value =>
    value && /[^a-zA-Z0-9 ]/i.test(value) ? t('validate_alphanumeric') : undefined;
/**
 * Component for form input
 * @param input
 * @param label
 * @param type
 * @param required
 * @param touched
 * @param error
 * @param warning
 * @returns {*}
 * @constructor
 */
export const renderField = ({ input, label, type, required, meta: { touched, error, warning } }) => (
    <div>
        <label>
            {required && <span className="required-field">*</span>}
            {label}
        </label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);

export const renderDateTimePicker = ({
    input: { onChange },
    label,
    type,
    required,
    meta: { touched, error, warning },
}) => (
    <div>
        <label>
            {required && <span className="required-field">*</span>}
            {label}
        </label>
        <div>
            <DayPickerInput
                onDayChange={onChange}
                format="l"
                formatDate={formatDate}
                parseDate={parseDate}
                placeholder={`${formatDate(new Date(), 'l', i18n.language)}`}
                dayPickerProps={{
                    locale: i18n.language,
                    localeUtils: MomentLocaleUtils,
                }}
            />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div>
);
