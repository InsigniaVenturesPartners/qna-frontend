import _ from 'lodash';
import { APP_INIT_SUCCESS } from '../actions/types';

export default function (state = {}, action) {
    switch (action.type) {
    	case APP_INIT_SUCCESS:
      	return _.extend({}, state);

        default:
            return state;
    }
}