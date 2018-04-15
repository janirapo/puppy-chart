import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import user from './userReducer';
import notify from './notifyReducer';

const rootReducer = combineReducers({
    user,
    notify,
    form: formReducer,
});

export default rootReducer;
