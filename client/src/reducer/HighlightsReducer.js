import { FETCH_HIGHLIGHTS, SELECT_HIGHLIGHTS, SUBMIT_HIGHLIGHT, CHANGE_SEARCH, POST_HIGHLIGHTS, SUBMITTING_HIGHLIGHT, EDIT_HIGHLIGHT,
DELETING_HIGHLIGHT, DELETE_HIGHLIGHT, UPDATE_HIGHLIGHTS } from '../actions/types';

const initialState = { list: [], selectedHighlights: null, selectedHighlight: null, filteredHighlights: null }

export default function ( state = initialState, action ){
  let highlights, selectedHighlights, filteredHighlights, selectedHighlight;
  switch (action.type) {
    case UPDATE_HIGHLIGHTS:               const nwLi = state.list.map( li => {
                                            if (li._id === action.payload._id) {
                                              return action.payload;
                                            }
                                            return li;
                                          });
                                          return { ...state, list: nwLi, selectedHighlights: action.payload };
    case DELETE_HIGHLIGHT:                highlights = state.selectedHighlights.highlights.filter( h => {
                                            return h._id !== action.payload;
                                          });
                                          filteredHighlights = state.filteredHighlights.filter( h => {
                                            return h._id !== action.payload;
                                          });
                                          selectedHighlights = { ...state.selectedHighlights, highlights };
                                          return { ...state, selectedHighlights, filteredHighlights };
    case DELETING_HIGHLIGHT:              console.log(action.type, action.payload);highlights = state.selectedHighlights.highlights.map( h => {
                                            if (h._id === action.payload) { return { ...h, deleting: true } }
                                            return h;
                                          });
                                          filteredHighlights = state.filteredHighlights.map( h => {
                                            if (h._id === action.payload) { return { ...h, deleting: true } }
                                            return h;
                                          });
                                          selectedHighlights = { ...state.selectedHighlights, highlights };
                                          return { ...state, selectedHighlights, filteredHighlights };
    case POST_HIGHLIGHTS:                 console.log(action.type, action.payload);let newList = state.list;
                                          newList.push(action.payload);
                                          return { ...state, list: newList, selectedHighlights: action.payload };
    case SUBMITTING_HIGHLIGHT:            console.log(action.type, action.payload);selectedHighlights = state.selectedHighlights;
                                          selectedHighlights.highlights.push(action.payload.h);
                                          return { ...state, selectedHighlights };
    case EDIT_HIGHLIGHT:                  console.log(action.type, action.payload);const { start, stop, comment, _id, videoId } = action.payload.h;
                                          const edited = state.selectedHighlights.highlights.map( h => {
                                            if (h._id === _id) {
                                              return { ...h, start, stop, comment, videoId };
                                            }
                                            return h;
                                          });
                                          let selectedHighlights = state.selectedHighlights;
                                          filteredHighlights = edited.filter( h => {
                                            if (h.comment.includes(action.payload.s)) { return true }
                                            return false;
                                          });
                                          selectedHighlights.highlights = edited;
                                          return { ...state, selectedHighlights, filteredHighlights };
    case SUBMIT_HIGHLIGHT:                console.log(action.type, action.payload);highlights = state.selectedHighlights.highlights;
                                          highlights = highlights.filter( h => {
                                            if (h._id === undefined) { return false }
                                            return true;
                                          });
                                          highlights.push(action.payload.h);
                                          filteredHighlights = highlights.filter( h => {
                                            if (h.comment.includes(action.payload.s)) { return true }
                                            return false;
                                          });
                                          selectedHighlights = { ...state.selectedHighlights, highlights };
                                          return { ...state, selectedHighlights, filteredHighlights };
    case FETCH_HIGHLIGHTS:                console.log(action.type, action.payload);return { ...state, list: action.payload, selectedHighlights: null };
    case SELECT_HIGHLIGHTS:               console.log(action.type, action.payload);return { ...state, selectedHighlights: action.payload, filteredHighlights: action.payload.highlights };
    case CHANGE_SEARCH:                   console.log(action.type, action.payload);filteredHighlights = state.selectedHighlights.highlights.filter( h => {
                                            if (h.comment.includes(action.payload)) { return true }
                                            return false;
                                          });
                                          return { ...state, filteredHighlights };
    default:                              console.log("highlights nothing changed");return state;
  }
}
