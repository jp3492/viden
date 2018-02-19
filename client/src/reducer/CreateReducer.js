import { CHANGE_TITLE, CHANGE_LINK, ADD_VIDEO_ID, POST_HIGHLIGHTS, REMOVE_LINK, NAV_NEW, CREATE, SELECT_HIGHLIGHTS, FETCH_HIGHLIGHTS,
POSTING_HIGHLIGHTS, EDIT, EDIT_ADD_LINK, EDIT_REMOVE_LINK, REMOVE_VIDEO, ADD_VIDEO, UPDATE_HIGHLIGHTS,CHANGE_DESCRIPTION } from '../actions/types';

const initialState = { title: "", description: "", link: "", videos: [], editedVideos: [], creating: false, editing: false };

export default function ( state = initialState, action ){
  switch (action.type) {
    case CHANGE_DESCRIPTION:        return { ...state, description: action.payload };
    case UPDATE_HIGHLIGHTS:         return { title: "", link: "", videos: [], editedVideos: [], creating: false, editing: false };
    case ADD_VIDEO:                 let plus = state.editedVideos;
                                    plus.push(action.payload);
                                    const newEdit = plus;
                                    return { ...state, editedVideos: newEdit, fuckOff: true };
    case REMOVE_VIDEO:              const minus = state.editedVideos.filter( vio => { return vio.videoId !== action.payload} );
                                    return { ...state, editedVideos: minus };
    case EDIT:                      const { editing, infos } = action.payload;
                                    if (!editing) { return initialState }
                                    return { ...initialState, editing, videos: infos.videos, editedVideos: infos.videos, title: infos.title };
    case POSTING_HIGHLIGHTS:        return initialState;
    case FETCH_HIGHLIGHTS:          return initialState;
    case SELECT_HIGHLIGHTS:         return { title: "", link: "", videos: [], editedVideos: [], creating: false, editing: false };
    case CREATE:                    return { ...initialState, creating: action.payload, videos: [] };
    case NAV_NEW:                   return initialState;
    case REMOVE_LINK:               let vide = state.videos.filter( v => { return v.videoId !== action.payload });
                                    return { ...state, videos: vide };
    case POST_HIGHLIGHTS:           return initialState;
    case CHANGE_TITLE:              return { ...state, title: action.payload }
    case CHANGE_LINK:               return { ...state, link: action.payload }
    case ADD_VIDEO_ID:              let addVids = state.videos;
                                    addVids.push(action.payload);
                                    return { ...state, videos: addVids, link: "" };
    default:                        console.log("nothing changed in create");return state;
  }
}
