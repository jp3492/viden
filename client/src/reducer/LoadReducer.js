import { ADD_VIDEO_LINK, ADD_VIDEO_ID, POSTING_HIGHLIGHTS, POST_HIGHLIGHTS, SELECTING_HIGHLIGHT, SELECT_HIGHLIGHTS, PLAYER_LOADED,
REFRESH_PLAYER } from '../actions/types';

const initialState = {
  addLink: false,
  create: false,
  select: false,
  player: 0
}

export default function ( state = initialState, action ){
  switch (action.type) {
    case REFRESH_PLAYER:                      return { ...state, player: action.payload };
    case PLAYER_LOADED:                       let players = state.player - 1;
                                              return { ...state, player: players };
    case SELECT_HIGHLIGHTS:                   return { ...state, select: false, player: action.payload.videos.length };
    case SELECTING_HIGHLIGHT:                 return { ...state, select: true };
    case POSTING_HIGHLIGHTS:                  return { ...state, create: true };
    case POST_HIGHLIGHTS:                     return { ...state, create: false };
    case ADD_VIDEO_LINK:                      return { ...state, addLink: true };
    case ADD_VIDEO_ID:                        return { ...state, addLink: false };
    default:                                  return state;
  }
}
