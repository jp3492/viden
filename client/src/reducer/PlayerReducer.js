import { PP, MUTE, SU, SD, VU, VD, CV, HP, HN, SET_PLAYER, SET_TIME, MARK, SUBMIT_HIGHLIGHT, CHANGE_COMMENT, SELECT_HIGHLIGHT, EDIT, UPDATE_HIGHLIGHT, LOGOUT,
PROGRESS, CHANGE_TIME, DELETE_HIGHLIGHT, PLAY_LIST, INITIATE, CHANGE_SEARCH_TERM, COPY, COPY_ADD, COPY_CREATE, SELECT_PROJECT, CHANGE_PAGE, CREATE_POST,
DELETE_HIGHLIGHTS, COPY_SELECT_FOLDER, COPY_ADD_TARGET, COPY_ADDED, DISSMISS_HIGHLIGHT } from '../actions/types';
const initialState = {
  playing: true,
  playList: true,
  muted: false,
  volume: 0.8,
  speed: 1,
  video: 0,
  progress: 0,
  players: {},
  start: null,
  stop: null,
  changing: null,
  comment: "",
  highlight: 0,
  initiated: false,
  counter: 0,
  edit: false,
  copy: false
}

export default function ( state = initialState, action ){
  let volume, speed, players, highlight, initiated, playing, copy, start, stop;
  switch (action.type) {
    case DISSMISS_HIGHLIGHT:
      return { ...state, start: null, stop: null, comment: "" };
    case COPY_ADDED:
      return { ...state, copy: false }
    case COPY_ADD_TARGET:
      if (state.copy.targets.indexOf(action.payload) === -1) {
        return { ...state, copy: { ...state.copy, targets: [ ...state.copy.targets, action.payload ] } }
      } else {
        return { ...state, copy: { ...state.copy, targets: state.copy.targets.filter( t => { return t !== action.payload } ) } }
      }
    case COPY_SELECT_FOLDER:
      const folder = (action.payload === state.copy.folder) ? null: action.payload;
      return { ...state, copy: { ...state.copy, folder } };
    case DELETE_HIGHLIGHTS: return { ...state, copy: false };
    case CREATE_POST: return { ...state, copy: false };
    case CHANGE_SEARCH_TERM: return { ...state, highlight: 0 };
    case CHANGE_PAGE:
      if (action.payload === "home") {
        return { ...initialState, players: {}};
      }
      return state;
    case SELECT_PROJECT: return { ...initialState, players: {}};
    case COPY_CREATE: return { ...state, playing: false };
    case COPY_ADD:
      const inCopy = state.copy.highlights.filter( h => { return h._id === action.payload._id });
      if (inCopy.length === 1) {
        return { ...state, copy: { ...state.copy, highlights: state.copy.highlights.filter( h => { return h._id !== action.payload._id })}}
      }
      return { ...state, copy: { ...state.copy, highlights: [ ...state.copy.highlights, action.payload ] } };
    case COPY:
      copy = (state.copy === false) ? { title: "", description: "", parent: null, highlights: [], videos: [], invites: [], targets: [], folder: null } : false;
      return { ...state, copy };
    case PLAY_LIST: return { ...state, playList: !state.playList };
    case DELETE_HIGHLIGHT:
      highlight = (state.highlight === 0) ? 0: state.highlight-1;
      return { ...state, start: null, stop: null, comment: "", changing: null, edit: false, highlight };
    case CHANGE_TIME:   return { ...state, [action.payload]: null, changing: action.payload };
    case PROGRESS:
      if (state.changing === null) { return { ...state, progress: action.payload.played * 100 } }
      else { return { ...state, progress: action.payload.played * 100, [state.changing]: action.payload.playedSeconds.toFixed(1) } }
    case UPDATE_HIGHLIGHT: return { ...state, counter: state.counter + 1, edit: false, changing: null, start: null, stop: null, comment: "" };
    case EDIT:  return { ...state, edit: true, comment: action.payload.comment, start: action.payload.start, stop: action.payload.stop };
    case HP:    return { ...state, highlight: action.payload.h, video: action.payload.v, counter: state.counter + 1 };
    case HN:    return { ...state, highlight: action.payload.h, video: action.payload.v, counter: state.counter + 1 };
    case SELECT_HIGHLIGHT: return { ...state, playing: true, highlight: action.payload.highlight, video: action.payload.video, counter: state.counter + 1, start: null, stop: null, comment: "", edit: false };
    case CHANGE_COMMENT:  return { ...state, comment: action.payload };
    case SUBMIT_HIGHLIGHT:  return { ...state, start: null, stop: null, comment: "" };
    case MARK:  return { ...state, [action.payload.what]: action.payload.time.toFixed(1) };
    case INITIATE:
      initiated = (state.initiated === 1) ? true: state.initiated - 1;
      playing = (state.initiated === 1) ? false: true;
      if (initiated === true) {
        document.getElementById("playerInitiate").style.display = "none";
      }
      return { ...state, initiated, playing };
    case SET_PLAYER:
      const { i, p } = action.payload;
      players = state.players;
      players[i] = p;
      initiated = (state.initiated === false) ? 1: state.initiated + 1;
      return { ...state, players, initiated };
    case PP:    return { ...state, playing: !state.playing };
    case MUTE:  return { ...state, muted: !state.muted };
    case VU:
      volume = (state.volume === 1) ? 1: state.volume + 0.1;
      return { ...state, volume };
    case VD:
      volume = (state.volume === 0) ? 0: state.volume - 0.1;
      return { ...state, volume };
    case SU:    return { ...state, speed: state.speed + 0.1 };
    case SD:    return { ...state, speed: state.speed - 0.1 };
    case CV:    return { ...state, video: action.payload };
    case LOGOUT: return initialState;
    default:    return state;
  }
}
