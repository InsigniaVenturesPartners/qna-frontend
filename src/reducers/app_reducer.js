import _ from 'lodash';
import { APP_INIT_SUCCESS } from '../actions/types';

export default function (state = { users: [] }, action) {
    switch (action.type) {
        case APP_INIT_SUCCESS:
            return _.extend({}, state, { users: action.payload.data });

        default:
            return state;
    }

}