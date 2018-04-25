import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './userReducer';
import notify from './notifyReducer';
import { LOG_OUT } from "actions/actionTypes";
import initialState from "./initialState";

const appReducer = combineReducers({
    user,
    notify,
    form: formReducer,
});

const rootReducer = (state, action) => {

    // on logout return undefined, which forces redux to set initial state to all reducers
    if (action.type === LOG_OUT) {
        state = undefined;
    }

    return appReducer(state, action);
};

export default rootReducer;
