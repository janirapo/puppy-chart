import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import user from './userReducer';
import notify from './notifyReducer';
import petModal from './petModalReducer';
import { LOG_OUT } from "actions/userActions";

const appReducer = combineReducers({
    user,
    petModal,
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
