import { CHANGE_SITE, CHANGE_VIEW, FILTER_FOLDER, SELECT_PROJECT } from '../actions/types';

const initialState = {
  //home and player
  site: "home",
  //home, newFolder, allFolder, selectedFolder, editFolder, newProject, selectedProject, editProject, profile, editProfile
  view: "home",
  //on selectedFolder/Project... need to know this to toggle from SearchView back to last Directory
  folder: null,
  project: null
}

export default function ( state = initialState, action ){
  switch (action.type) {
    case CHANGE_SITE:         return { ...state, site: action.payload };
    case CHANGE_VIEW:         switch (action.payload) {
                                case "allFolders":
                                  return { ...state, view: action.payload, folder: null, project: null };
                                default: return state;
                              }
                              return { ...state, view: action.payload };
    case FILTER_FOLDER:       return { ...state, folder: action.payload._id };
    case SELECT_PROJECT:      return { ...state, project: action.payload };
    default:                  return state;
  }
}
