import { NAME_CHANGE } from '../actions/types';

export default function ( state = "", action ){
  switch (action.type) {
    case NAME_CHANGE:
      return action.payload;
    default:
      return state;
  }
}
