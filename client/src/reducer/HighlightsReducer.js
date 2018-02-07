import { FETCH_HIGHLIGHTS, SELECT_HIGHLIGHTS, SUBMIT_HIGHLIGHT, DELETE_HIGHLIGHT, RESET_SELECTED, CHANGE_SEARCH, MY_LIST } from '../actions/types';

const initialState = {
  list: [],
  selectedHighlights: null,
  selectedHighlight: null,
  filteredHighlights: null
}

export default function ( state = initialState, action ){
  switch (action.type) {
    case MY_LIST:
      return { ...state, selectedHighlights: null };
    case RESET_SELECTED:
      return { ...state, selectedHighlights: null };
    case SUBMIT_HIGHLIGHT:
      const { _id, videoId, title, _uid } = state.selectedHighlights;
      const filteredHigh = action.payload.h.filter( h => {
        if (h.comment.includes(action.payload.s)) { return true }
        return false;
      });
      const selectedHighlights = { _uid, _id, videoId, title, highlights: action.payload.h };
      return { ...state, selectedHighlights, filteredHighlights: filteredHigh };
    case FETCH_HIGHLIGHTS:
      return { ...state, list: action.payload };
    case SELECT_HIGHLIGHTS:
      return { ...state, selectedHighlights: action.payload };
    case CHANGE_SEARCH:
      const filteredHighlights = state.selectedHighlights.highlights.filter( h => {
        if (h.comment.includes(action.payload)) { return true }
        return false;
      });
      return { ...state, filteredHighlights };
    default:
      return state;
  }
}
