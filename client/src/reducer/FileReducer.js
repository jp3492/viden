import { UPLOAD_FILE, PROCESS_FILE } from '../actions/types';

export default function ( state = null, action ){
  switch (action.type) {
    case PROCESS_FILE:
      return action.payload;
    case UPLOAD_FILE:
      return action.payload;
    default:
      return state;
  }
}
