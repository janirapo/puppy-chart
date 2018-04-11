import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'
import user from './userReducer';

const rootReducer = combineReducers({
    user,
    form: formReducer,
});

export default rootReducer;
