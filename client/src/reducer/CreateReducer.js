import { CHANGE_TITLE, CHANGE_LINK, ADD_VIDEO_ID, NAV_NEW } from '../actions/types';

const initialState = { title: "", link: "", videos: [] }

export default function ( state = initialState, action ){
  switch (action.type) {
    case NAV_NEW:                   return initialState;
    case CHANGE_TITLE:              return { ...state, title: action.payload }
    case CHANGE_LINK:               return { ...state, link: action.payload }
    case ADD_VIDEO_ID:              let videos = state.videos;
                                    videos.push(action.payload);
                                    return { ...state, videos, link: "" };
    default:                        return state;
  }
}
