import { CHANGE_TITLE, CHANGE_LINK, ADD_VIDEO_ID, POST_HIGHLIGHTS, REMOVE_LINK, NAV_NEW, CREATE, SELECT_HIGHLIGHTS, FETCH_HIGHLIGHTS,
POSTING_HIGHLIGHTS, EDIT } from '../actions/types';

const initialState = { title: "", link: "", videos: [], creating: false, editing: false }

export default function ( state = initialState, action ){
  let videos;
  switch (action.type) {
    case EDIT:                      const { editing, infos } = action.payload;
                                    return { ...initialState, editing, videos: infos.videos, title: infos.title };
    case POSTING_HIGHLIGHTS:        return initialState;
    case FETCH_HIGHLIGHTS:          return initialState;
    case SELECT_HIGHLIGHTS:         return initialState;
    case CREATE:                    return { ...initialState, creating: action.payload, videos: [] };
    case NAV_NEW:                   return initialState;
    case REMOVE_LINK:               videos = state.videos.filter( v => { return v.videoId !== action.payload });
                                    return { ...state, videos };
    case POST_HIGHLIGHTS:           return initialState;
    case CHANGE_TITLE:              return { ...state, title: action.payload }
    case CHANGE_LINK:               return { ...state, link: action.payload }
    case ADD_VIDEO_ID:              videos = state.videos;
                                    videos.push(action.payload);
                                    return { ...state, videos, link: "" };
    default:                        return state;
  }
}
