import { SELECT_GAME } from '../actions/types';

export default function ( state = null, action ){
  switch (action.type) {
    case SELECT_GAME:
      return action.payload;
    default:
      return state;
  }
}
