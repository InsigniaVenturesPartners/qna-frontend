import _ from 'lodash';
import {USER_LOGIN_SUCCESS} from '../actions/types';

export default function (state = { isLoggedIn: false }, action) {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            return _.extend({}, state, { isLoggedIn: true, currentUser: action.payload.data });
        default:
            return state;
    }
}