import axios from 'axios';
import { FETCH_USER, POST_HIGHLIGHTS, POST_HIGHLIGHT, CHANGE_LINK, CHANGE_TITLE, FETCH_HIGHLIGHTS,
CHANGE_COMMENT, SUBMIT_HIGHLIGHT, SELECT_HIGHLIGHTS, PLAY_VIDEO, JUMP_TO, SET_ACTION, SET_STATE, SET_TIME, SELECT_HIGHLIGHT,
CHANGE_SEARCH, SEARCH_PROJECT, MY_LIST, SET_SEARCH } from './types';

export const setSearch = search => dispatch => {
  dispatch({ type: SET_SEARCH, payload: search });
}

export const selectMyList = callback => dispatch => {
  dispatch({ type: MY_LIST });
  callback;
}

export const searchProject = (search, history) => async dispatch => {
  const res = await axios.get(`/api/search/${search}`);
  if (res.data.length !== 0 && search.length > 2) {
    dispatch({ type: SEARCH_PROJECT, payload: res.data });
    history.push('/list');
  }
}

export const changeSearch = search => dispatch => {
  dispatch({ type: CHANGE_SEARCH, payload: search });
}

export const selectHighlight = (highlight, i) => dispatch => {
  console.log(i);
  dispatch({ type: SELECT_HIGHLIGHT, payload: { highlight, i } });
}

export const setTime = (key, time) => dispatch => {
  dispatch({ type: SET_TIME, payload: { key, time } });
}

export const setState = () => dispatch => {
  dispatch({ type: SET_STATE });
}

export const setAction = action => dispatch => {
  dispatch({ type: SET_ACTION, payload: action });
};

export const jumpTo = (start, stop) => dispatch => {
  dispatch({ type: JUMP_TO, payload: {start, stop} });
}

export const changePlay = () => dispatch => {
  dispatch({ type: PLAY_VIDEO });
}

export const submitHighlight = ( id, highlight, search ) => async dispatch => {
  const res = await axios.post(`/api/highlights/${id}`, highlight);
  dispatch({ type: SUBMIT_HIGHLIGHT, payload: { h: res.data, s: search } });
}

export const changeComment = comment => dispatch => {
  dispatch({ type: CHANGE_COMMENT, payload: comment });
}

export const changeTitle = title => dispatch => {
  dispatch({ type: CHANGE_TITLE, payload: title });
}

export const changeLink = link => dispatch => {
  dispatch({ type: CHANGE_LINK, payload: link });
}

export const deleteHighlight = ( _id, id, search ) => async dispatch => {
  const res = await axios.delete(`/api/highlights/highlight/${_id}/${id}`);
  dispatch({ type: SUBMIT_HIGHLIGHT, payload: { h: res.data, s: search } });
}

export const deleteHighlights = _id => async dispatch => {
  const res = await axios.delete(`/api/highlights/${_id}`);
  dispatch({ type: FETCH_HIGHLIGHTS, payload: res.data });
}

export const editHighlight = ( _id, id, start, stop, comment, search ) => async dispatch => {
  const res = await axios.post(`/api/highlights/highlight/${_id}/${id}`, { start, stop, comment});
  dispatch({ type: SUBMIT_HIGHLIGHT, payload: { h: res.data, s: search } });
}

export const postHighlight = ( id, highlight ) => async dispatch => {
  const res = await axios.post(`/api/highlights/${id}`, { highlight });
  dispatch({ type: POST_HIGHLIGHT, payload: res.data });
}

export const selectHighlights = (edit, highlight, history) => async dispatch => {
  const { _id, title, videoId, _uid } = highlight;
  const res = await axios.get(`/api/highlights/${_id}`);
  dispatch({ type: SELECT_HIGHLIGHTS, payload: { _id, title, videoId, highlights: res.data, _uid } });
  if (history !== undefined) {
    history;
  }
}

export const fetchHighlights = (history) => async dispatch => {
  const res = await axios.get('/api/highlights');
  dispatch({ type: FETCH_HIGHLIGHTS, payload: res.data });
  history
}

export const postHighlights = ( title, videoId ) => async dispatch => {
  const res = await axios.post(`/api/highlights`, { title, videoId });
  dispatch({ type: POST_HIGHLIGHTS, payload: res.data });
}

export const fetchUser = () => async dispatch => {
  const response = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: response.data });
}
