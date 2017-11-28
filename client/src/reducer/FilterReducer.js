import { SET_FILTER } from '../actions/types';

export default function ( state = null, action ){
  switch (action.type) {
    case SET_FILTER:
    console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
