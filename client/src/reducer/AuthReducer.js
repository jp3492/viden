import { FETCH_USER, LOGOUT } from '../actions/types';

export default function ( state = false, action ){
  switch (action.type) {
    case FETCH_USER:
      if (action.payload === false) {
        return false;
      }
      return { _id: action.payload._id, firstName: action.payload.firstName, lastName: action.payload.lastName, email: action.payload.email, approved: action.payload.approved } || false;
    case LOGOUT: return false;
    default:
      return state;
  }
}
