import { combineReducers } from 'redux';
import user from './userReducer';
import pets from './petReducer';

const rootReducer = combineReducers({
    user,
    pets,
});

export default rootReducer;
