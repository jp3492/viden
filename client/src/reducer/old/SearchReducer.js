import { SEARCH_PROJECT, MY_LIST, SET_SEARCH, FETCH_HIGHLIGHTS, FETCH_USER, FILTER_FOLDER } from '../actions/types';

const initialState = { term: "", active: false, list: [] }

export default function ( state = initialState, action ){
  switch (action.type) {
    case FILTER_FOLDER:           const newList = action.payload.list.filter( p => {
                                    return p.folder === action.payload._id;
                                  });
                                  return { ...state, list: newList, active: true };
    case FETCH_USER:              return initialState;
    case FETCH_HIGHLIGHTS:        return { ...initialState, list: action.payload };
    case SET_SEARCH:              if (action.payload === "") { return initialState }
                                  return { ...state, term: action.payload, active: true };
    case MY_LIST:                 return { ...state, active: false, term: "" };
    case SEARCH_PROJECT:          return { ...state, list: action.payload, active: true };
    default:                      return state;
  }
}
