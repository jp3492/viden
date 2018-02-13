import { SET_ACTION, SELECT_HIGHLIGHTS, SELECT_HIGHLIGHT, SET_TIME, CHANGE_COMMENT, SUBMIT_HIGHLIGHT, CHANGE_SEARCH, NAV_VIDEO, SET_VIDEO,
EDIT_HIGHLIGHT } from '../actions/types';

const initialState = { highlight: { number: null, id: null }, comment: "", start: "", stop: "", action: null, edit: null, searchKey: "", video: 0 };

export default function ( state = initialState, action ){
  switch (action.type) {
    case SET_VIDEO:                   console.log(action.payload);return { ...state, video: action.payload };
    case NAV_VIDEO:                   if (action.payload.next === false) {
                                        if (state.video === 0) {          return { ...state, video: action.payload.length - 1 } }
                                        else {                            return { ...state, video: state.video - 1 } } }
                                      else {
                                        if (state.video === action.payload.length - 1) {
                                                                          return { ...state, video: 0 } }
                                        else {                            return { ...state, video: state.video + 1 } } }
    case CHANGE_SEARCH:               return { ...state, searchKey: action.payload };
    case EDIT_HIGHLIGHT:              return { ...initialState, highlight: state.highlight, searchKey:state.searchKey, video: state.video };
    case SUBMIT_HIGHLIGHT:            return { ...initialState, searchKey:state.searchKey, video: state.video };
    case CHANGE_COMMENT:              return { ...state, comment: action.payload };
    case SET_TIME:                    return { ...state, [action.payload.key]: action.payload.time };
    case SELECT_HIGHLIGHT:            const { i, highlight: { start, stop, comment, _id, videoId }, video } = action.payload;
                                      return { ...state, start, stop, comment, highlight: { number: i, id:_id, videoId }, action: "jump", edit: "selected", video };
    case SELECT_HIGHLIGHTS:           return initialState;
    case SET_ACTION:                  if (action.payload === "enter") {
                                        switch (state.edit) {
                                          case null:                      return { ...state, action: action.payload, edit: "start" };
                                          case "submit":                  return { ...state, action: action.payload, edit: "start" };
                                          case "start":                   return { ...state, action: action.payload, edit: "stop" };
                                          case "stop":                    return { ...state, action: action.payload, edit: "submit" };
                                          case "selected":                return { ...state, action: action.payload, edit: null, comment: "", start: "", stop: "" };
                                          default:                        return state;
                                        }
                                      }
                                      switch (action.payload) {
                                        case "editStart":                 return { ...state, action: action.payload, edit: "editStart" };
                                        case "editStop":                  return { ...state, action: action.payload, edit: "editStop" };
                                        case "save":                      return { ...state, action: action.payload, edit: null };
                                        default:                          return  { ...state, action: action.payload };
                                      }
    default:                          return state;
  }
}
