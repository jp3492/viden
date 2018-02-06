import { FETCH_HIGHLIGHTS, SELECT_HIGHLIGHTS, SUBMIT_HIGHLIGHT, DELETE_HIGHLIGHT, RESET_SELECTED, CHANGE_SEARCH } from '../actions/types';

const initialState = {
  list: [],
  selectedHighlights: null,
  selectedHighlight: null,
  filteredHighlights: null
}

export default function ( state = initialState, action ){
  switch (action.type) {
    case RESET_SELECTED:
      return { ...state, selectedHighlights: null };
    case SUBMIT_HIGHLIGHT:
      console.log(action.payload);
      const { _id, videoId, title } = state.selectedHighlights;
      const filteredHigh = action.payload.h.filter( h => {
        if (h.comment.includes(action.payload.s)) { return true }
        return false;
      });
      console.log(filteredHigh);
      const selectedHighlights = { _id, videoId, title, highlights: action.payload.h };
      return { ...state, selectedHighlights, filteredHighlights: filteredHigh };
    case FETCH_HIGHLIGHTS:
      return { ...state, list: action.payload };
    case SELECT_HIGHLIGHTS:
      console.log(action.payload);
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
