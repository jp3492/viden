import { SEARCH_PROJECT, MY_LIST, SET_SEARCH, FETCH_HIGHLIGHTS, FETCH_USER } from '../actions/types';

const initialState = { term: "", active: false, list: [] }

export default function ( state = initialState, action ){
  switch (action.type) {
    case FETCH_USER:              return initialState;
    case FETCH_HIGHLIGHTS:        return initialState;
    case SET_SEARCH:              if (action.payload === "") { return initialState }
                                  return { ...state, term: action.payload, active: true };
    case MY_LIST:                 return { ...state, active: false, term: "" };
    case SEARCH_PROJECT:          return { list: action.payload, active: true };
    default:                      return state;
  }
}
