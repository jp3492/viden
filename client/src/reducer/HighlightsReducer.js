import { FETCH_HIGHLIGHTS, SELECT_HIGHLIGHTS, SUBMIT_HIGHLIGHT, CHANGE_SEARCH } from '../actions/types';

const initialState = {
  list: [],
  selectedHighlights: null,
  selectedHighlight: null,
  filteredHighlights: null
}

export default function ( state = initialState, action ){
  switch (action.type) {
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
