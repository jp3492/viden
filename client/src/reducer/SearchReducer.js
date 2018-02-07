import { SEARCH_PROJECT, MY_LIST, SET_SEARCH } from '../actions/types';

const initialState = {
  term: "",
  active: false,
  list: []
}

export default function ( state = initialState, action ){
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, term: action.payload };
    case MY_LIST:
      return { ...state, active: false, term: "" };
    case SEARCH_PROJECT:
      return { list: action.payload, active: true };
    default:
      return state;
  }
}
