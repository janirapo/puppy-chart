import { combineReducers } from 'redux';
import user from './userReducer';
import pet from './petReducer';

const rootReducer = combineReducers({
    user,
    pet,
});

export default rootReducer;
