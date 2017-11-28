import { FETCH_SCOUTS } from '../actions/types';

export default function ( state = null, action ){
  switch (action.type) {
    case FETCH_SCOUTS:
      return action.payload;
    default:
      return state;
  }
}
