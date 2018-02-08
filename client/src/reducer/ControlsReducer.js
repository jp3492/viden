import { SET_ACTION, SELECT_HIGHLIGHTS, SELECT_HIGHLIGHT, SET_TIME, CHANGE_COMMENT, SUBMIT_HIGHLIGHT, CHANGE_SEARCH } from '../actions/types';

const initialState = {
  highlight: {
    number: null,
    id: null
  },
  comment: "",
  start: "",
  stop: "",
  action: null,
  edit: null,
  searchKey: ""
}

export default function ( state = initialState, action ){
  switch (action.type) {
    case CHANGE_SEARCH:
      return { ...state, searchKey: action.payload };
    case SUBMIT_HIGHLIGHT:
      const s = state.searchKey;
      return { ...initialState, searchKey:s };
    case CHANGE_COMMENT:
      return { ...state, comment: action.payload };
    case SET_TIME:
      return { ...state, [action.payload.key]: action.payload.time };
    case SELECT_HIGHLIGHT:
      console.log(action.payload);
      const { i, highlight: { start, stop, comment, _id } } = action.payload;
      return { ...state, start, stop, comment, highlight: { number: i, _id }, action: "jump", edit: "selected" };
    case SELECT_HIGHLIGHTS:
      return initialState;
    case SET_ACTION:
      if (action.payload === "enter") {
        switch (state.edit) {
          case null:
            return { ...state, action: action.payload, edit: "start" };
          case "submit":
            return { ...state, action: action.payload, edit: "start" };
          case "start":
            return { ...state, action: action.payload, edit: "stop" };
          case "stop":
            return { ...state, action: action.payload, edit: "submit" };
          case "selected":
            return { ...state, action: action.payload, edit: null, comment: "", start: "", stop: "" };
          default:
        }
      }
      switch (action.payload) {
        case "editStart":
          return { ...state, action: action.payload, edit: "editStart" };
        case "editStop":
          return { ...state, action: action.payload, edit: "editStop" };
        case "save":
          return { ...state, action: action.payload, edit: null };
        default:
          return  { ...state, action: action.payload };
      }
    default:
      return state;
  }
}
