import { PP, MUTE, SU, SD, VU, VD, CV, HP, HN, SET_PLAYER, SET_TIME, MARK, SUBMIT_HIGHLIGHT, CHANGE_COMMENT, SELECT_HIGHLIGHT, EDIT, UPDATE_HIGHLIGHT, LOGOUT,
PROGRESS, CHANGE_TIME, DELETE_HIGHLIGHT, PLAY_LIST, INITIATE } from '../actions/types';
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
  edit: false
}

export default function ( state = initialState, action ){
  let volume, speed, players, highlight, initiated, playing;
  switch (action.type) {
    case PLAY_LIST: return { ...state, playList: !state.playList };
    case DELETE_HIGHLIGHT:
      highlight = (state.highlight === 0) ? 0: state.highlight-1;
      return { ...state, start: null, stop: null, comment: "", changing: null, edit: false, highlight };
    case CHANGE_TIME:   return { ...state, changing: action.payload };
    case PROGRESS:
      if (state.changing === null) { return { ...state, progress: action.payload.played * 100 } }
      else { return { ...state, progress: action.payload.played * 100, [state.changing]: action.payload.playedSeconds.toFixed(1) } }
    case UPDATE_HIGHLIGHT: return { ...state, counter: state.counter + 1, edit: false, changing: null, start: null, stop: null, comment: "" };
    case EDIT:  return { ...state, edit: true, comment: action.payload.comment, start: action.payload.start, stop: action.payload.stop };
    case HP:    return { ...state, highlight: action.payload.h, video: action.payload.v, counter: state.counter + 1 };
    case HN:    return { ...state, highlight: action.payload.h, video: action.payload.v, counter: state.counter + 1 };
    case SELECT_HIGHLIGHT: return { ...state, playing: true, highlight: action.payload.highlight, video: action.payload.video, counter: state.counter + 1, start: null, stop: null, comment: "", edit: false };
    case CHANGE_COMMENT:  return { ...state, comment: action.payload };
    case "persist/REHYDRATE": return { ...state, rehydrate: false };
    case SUBMIT_HIGHLIGHT:  return { ...state, start: null, stop: null, comment: "" };
    case MARK:  return { ...state, [action.payload.what]: action.payload.time.toFixed(1) };
    case INITIATE:
      initiated = (state.initiated === 1) ? true: state.initiated - 1;
      playing = (state.initiated === 1) ? false: true;
      if (initiated === true) {
        document.getElementById("playerLoad").style.display = "none";
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
    default:    return initialState;
  }
}
