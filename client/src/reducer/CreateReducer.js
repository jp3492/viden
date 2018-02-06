import { CHANGE_TITLE, CHANGE_LINK } from '../actions/types';

const initialState = {
  title: null,
  videId: null
}

export default function ( state = initialState, action ){
  switch (action.type) {
    case CHANGE_TITLE:
      return { ...state, title: action.payload };
    case CHANGE_LINK:
      const videoId = action.payload.split("v=")[1].split("&")[0];
      return { ...state, videoId };
    default:
      return state;
  }
}
