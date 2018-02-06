import { SELECT_HIGHLIGHTS } from '../actions/types';

export default function ( state = null, action ){
  switch (action.type) {
    case SELECT_HIGHLIGHTS:
      return action.payload;
    default:
      return state;
  }
}
